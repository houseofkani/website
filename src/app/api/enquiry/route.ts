import { EmailNotConfiguredError, isEmailConfigured, sendEnquiry } from "@/lib/email";
import type { EnquiryInput } from "@/lib/email-templates";

/**
 * Enquiry intake: POST /api/enquiry
 *
 * Validates, throttles per IP, then forwards the note to the house through
 * Resend. The visitor's address becomes Reply-To, so answering the email
 * answers them. With no RESEND_API_KEY the route answers 503 and the form
 * offers the mailto fallback.
 */

export const runtime = "nodejs";

const MAX_BODY_BYTES = 12_000;
/** A human needs at least this long to fill the form; bots submit instantly. */
const MIN_FILL_MS = 1_500;
/** A form left open for hours is more likely a replayed payload. */
const MAX_FILL_MS = 6 * 60 * 60 * 1000;
/** Notes with more links than this are linkspam, not enquiries. */
const MAX_LINKS = 3;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;

/** Best-effort throttle. Serverless instances each keep their own map. */
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((at) => now - at < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 500) {
    for (const [key, stamps] of hits) {
      if (stamps.every((at) => now - at > WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

const EMAIL_PATTERN = /^[^\s@<>()[\]\\,;:]+@[^\s@<>()[\]\\,;:]+\.[a-z]{2,}$/i;

type Validation = { ok: true; value: EnquiryInput | null } | { ok: false; error: string };

function readString(source: Record<string, unknown>, key: string): string {
  const value = source[key];
  return typeof value === "string" ? value.trim() : "";
}

function validate(body: Record<string, unknown>): Validation {
  // Hidden field: only bots fill it. Accept silently so they move on.
  if (readString(body, "website")) {
    return { ok: true, value: null };
  }

  const startedAt = Number(body.startedAt);
  if (!Number.isFinite(startedAt)) {
    return { ok: false, error: "Malformed request." };
  }
  const elapsed = Date.now() - startedAt;
  // Too fast to be a person: accept silently, exactly like the honeypot.
  if (elapsed < MIN_FILL_MS) return { ok: true, value: null };
  if (elapsed > MAX_FILL_MS)
    return { ok: false, error: "This form has expired. Please reload the page." };

  const name = readString(body, "name");
  const email = readString(body, "email");
  const telephone = readString(body, "telephone");
  const topic = readString(body, "topic") || "General enquiry";
  const message = readString(body, "message");

  if (name.length < 2 || name.length > 120)
    return { ok: false, error: "Please tell us your name." };
  if (!EMAIL_PATTERN.test(email) || email.length > 200) {
    return { ok: false, error: "That email address does not look right." };
  }
  if (telephone.length > 40) return { ok: false, error: "That telephone number is too long." };
  if (message.length < 10) return { ok: false, error: "Please add a little more detail." };
  if (message.length > 5_000) return { ok: false, error: "That note is too long." };
  const links = message.match(/https?:\/\//gi)?.length ?? 0;
  if (links > MAX_LINKS) return { ok: false, error: "Please remove the links and try again." };
  if (topic.length > 120) return { ok: false, error: "Unrecognised enquiry type." };

  return { ok: true, value: { name, email, telephone: telephone || undefined, topic, message } };
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return Response.json(
      { error: "Too many enquiries from this connection. Please try again shortly." },
      { status: 429 },
    );
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return Response.json({ error: "That note is too long." }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Malformed request." }, { status: 400 });
  }

  const validation = validate(body);
  if (!validation.ok) {
    return Response.json({ error: validation.error }, { status: 400 });
  }

  // Honeypot: pretend success, send nothing.
  if (validation.value === null) {
    return Response.json({ sent: true });
  }

  if (!isEmailConfigured) {
    return Response.json(
      { error: "Email is not configured on this deployment.", code: "email_not_configured" },
      { status: 503 },
    );
  }

  try {
    const result = await sendEnquiry(validation.value);
    return Response.json({ sent: true, id: result.id, acknowledged: result.acknowledged });
  } catch (error) {
    if (error instanceof EmailNotConfiguredError) {
      return Response.json(
        { error: "Email is not configured.", code: "email_not_configured" },
        { status: 503 },
      );
    }
    console.error("[enquiry] Send failed:", error);
    return Response.json(
      { error: "We could not send your note. Please write to us directly." },
      { status: 502 },
    );
  }
}
