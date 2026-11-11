import { Resend } from "resend";

import { SITE } from "@/lib/site";
import {
  outreachHtml,
  outreachSubject,
  outreachText,
  type OutreachRecipient,
} from "@/lib/outreach-template";

/**
 * B2B outreach sender: POST /api/outreach
 *
 * Protected by OUTREACH_KEY because it can send mail to arbitrary recipients.
 * The Resend key stays server-side. Batches are capped so a single request
 * cannot accidentally mail an entire list.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BATCH = 40;
const SEND_DELAY_MS = 550;
const EMAIL_PATTERN = /^[^\s@<>()[\]\\,;:]+@[^\s@<>()[\]\\,;:]+\.[a-z]{2,}$/i;
const UNSUBSCRIBE = `mailto:${SITE.email}?subject=Unsubscribe`;

type SendResult = { email: string; id?: string; error?: string };

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const expectedKey = process.env.OUTREACH_KEY;
  if (!expectedKey) {
    return Response.json({ error: "Outreach is not configured." }, { status: 503 });
  }
  if (request.headers.get("x-outreach-key") !== expectedKey) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Resend is not configured." }, { status: 503 });
  }

  const raw = await request.text();
  if (raw.length > 64_000) {
    return Response.json({ error: "Batch too large." }, { status: 413 });
  }

  let body: { recipients?: unknown };
  try {
    body = JSON.parse(raw) as { recipients?: unknown };
  } catch {
    return Response.json({ error: "Malformed request." }, { status: 400 });
  }

  if (!Array.isArray(body.recipients) || body.recipients.length === 0) {
    return Response.json({ error: "No recipients." }, { status: 400 });
  }
  if (body.recipients.length > MAX_BATCH) {
    return Response.json({ error: `Maximum ${MAX_BATCH} recipients per batch.` }, { status: 400 });
  }

  const seen = new Set<string>();
  const recipients: OutreachRecipient[] = [];
  for (const item of body.recipients) {
    if (!item || typeof item !== "object") continue;
    const source = item as Record<string, unknown>;
    const email = clean(source.email, 200).toLowerCase();
    const company = clean(source.company, 80);
    const country = clean(source.country, 60);
    if (!EMAIL_PATTERN.test(email) || seen.has(email)) continue;
    seen.add(email);
    recipients.push({ email, company: company || "there", country: country || "your market" });
  }

  if (recipients.length === 0) {
    return Response.json({ error: "No valid recipients." }, { status: 400 });
  }

  const resend = new Resend(apiKey);
  const from = process.env.EMAIL_FROM || "House of Kani <onboarding@resend.dev>";
  const results: SendResult[] = [];

  for (const recipient of recipients) {
    const { data, error } = await resend.emails.send({
      from,
      to: recipient.email,
      replyTo: SITE.email,
      subject: outreachSubject(recipient),
      html: outreachHtml(recipient),
      text: outreachText(recipient),
      headers: {
        "List-Unsubscribe": `<${UNSUBSCRIBE}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
      tags: [
        { name: "type", value: "b2b-outreach" },
        { name: "market", value: recipient.country.replace(/[^a-z0-9]+/gi, "-").slice(0, 40) },
      ],
    });

    results.push(
      error ? { email: recipient.email, error: error.message } : { email: recipient.email, id: data?.id },
    );

    if (recipients.length > 1) {
      const { promise, resolve } = Promise.withResolvers<void>();
      setTimeout(resolve, SEND_DELAY_MS);
      await promise;
    }
  }

  const sent = results.filter((result) => result.id).length;
  return Response.json({ sent, failed: results.length - sent, results });
}
