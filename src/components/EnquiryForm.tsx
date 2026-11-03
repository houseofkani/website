"use client";

import { useState, type FormEvent } from "react";

import { Ornament } from "@/components/Ornament";
import { SITE } from "@/lib/site";

type Kind = "general" | "appointment";
type Status = "idle" | "sending" | "sent" | "error" | "fallback";

const TOPICS = [
  "General enquiry",
  "Appointment in Srinagar",
  "Online appointment",
  "Loom visit",
  "A specific piece",
  "GI certification",
  "Press",
] as const;

export function EnquiryForm({ kind = "general" }: { kind?: Kind }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const topic = String(data.get("enquiry") ?? "General enquiry");
    setStatus("sending");
    setError(null);

    /** Last resort: hand the note to the visitor's own mail app. */
    const openMailClient = () => {
      const lines = [
        String(data.get("message") ?? ""),
        "",
        `Name: ${data.get("name") ?? ""}`,
        `Email: ${data.get("email") ?? ""}`,
        data.get("telephone") ? `Telephone: ${data.get("telephone")}` : "",
      ].filter((line, i) => i < 2 || line);
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(`${topic} — House of Kani`)}&body=${encodeURIComponent(lines.join("\n"))}`;
    };

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          telephone: String(data.get("telephone") ?? ""),
          topic,
          message: String(data.get("message") ?? ""),
          website: String(data.get("website") ?? ""),
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        error?: string;
        code?: string;
      };

      if (payload.code === "email_not_configured") {
        // No Resend key on this deployment — behave exactly as the site used to.
        openMailClient();
        setStatus("fallback");
        return;
      }

      if (!response.ok) {
        setError(payload.error ?? "We could not send your note. Please write to us directly.");
        setStatus("error");
        return;
      }

      setStatus("sent");
    } catch {
      setError("The connection dropped. Please write to us directly.");
      setStatus("error");
    }
  }

  if (status === "fallback") {
    return (
      <div role="status" className="border-y border-gold/35 py-16 text-center">
        <Ornament size="sm" className="mx-auto" />
        <h2 className="display-3 mt-5">Your email app should now be open.</h2>
        <p className="mx-auto mt-4 max-w-md text-charcoal/70">
          Your note is ready to send from there. If nothing opened, write to us directly at{" "}
          <a href={`mailto:${SITE.email}`} className="border-b border-gold">
            {SITE.email}
          </a>
          .
        </p>
      </div>
    );
  }

  if (status === "sent") {
    return (
      <div role="status" className="border-y border-gold/35 py-16 text-center">
        <Ornament size="sm" className="mx-auto" />
        <h2 className="display-3 mt-5">Your note is with us.</h2>
        <p className="mx-auto mt-4 max-w-md text-charcoal/70">
          Thank you for writing. We will reply to your address within one working day. If it is
          urgent, you are always welcome at{" "}
          <a href={`mailto:${SITE.email}`} className="border-b border-gold">
            {SITE.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-8" noValidate={false}>
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Telephone" name="telephone" type="tel" />
        <label className="block">
          <span className="eyebrow text-stone-ink">Nature of enquiry</span>
          <select
            name="enquiry"
            defaultValue={kind === "appointment" ? "Appointment in Srinagar" : "General enquiry"}
            className="mt-3 w-full border-0 border-b border-charcoal/25 bg-transparent py-3 font-body text-[1.05rem] outline-none focus:border-gold"
          >
            {TOPICS.map((topic) => (
              <option key={topic}>{topic}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="block">
        <span className="eyebrow text-stone-ink">Your note</span>
        <textarea
          name="message"
          required
          rows={5}
          className="mt-3 w-full resize-y border-0 border-b border-charcoal/25 bg-transparent py-3 font-body text-[1.05rem] outline-none focus:border-gold"
          placeholder="Tell us what you are looking for, or when you would like to visit."
        />
      </label>

      {/* Honeypot — people never see it, bots fill it in. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <p className="text-[0.9rem] text-charcoal/70">
        We send this note straight to the House and use it only to reply to you. Nothing is stored
        on this website. See our{" "}
        <a href="/privacy" className="border-b border-gold/60">
          privacy notice
        </a>
        .
      </p>

      {status === "error" && error ? (
        <p
          role="alert"
          className="border-l-2 border-burgundy bg-cream/60 px-4 py-3 text-[0.95rem] text-charcoal"
        >
          {error}{" "}
          <a href={`mailto:${SITE.email}`} className="border-b border-gold">
            Write to {SITE.email}
          </a>
          .
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="nav-label inline-flex min-h-12 items-center justify-center border border-forest bg-forest px-8 text-ivory transition-colors duration-500 hover:bg-burgundy disabled:cursor-wait disabled:opacity-70"
      >
        {status === "sending" ? "Sending…" : "Write to Us"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="eyebrow text-stone-ink">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-3 w-full border-0 border-b border-charcoal/25 bg-transparent py-3 font-body text-[1.05rem] outline-none focus:border-gold"
      />
    </label>
  );
}
