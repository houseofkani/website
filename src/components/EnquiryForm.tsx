"use client";

import { useState, type FormEvent } from "react";

import { Ornament } from "@/components/Ornament";
import { SITE } from "@/lib/site";

type Kind = "general" | "appointment";

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
  const [opened, setOpened] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const topic = String(data.get("enquiry") ?? "");
    const lines = [
      String(data.get("message") ?? ""),
      "",
      `Name: ${data.get("name") ?? ""}`,
      `Email: ${data.get("email") ?? ""}`,
      data.get("telephone") ? `Telephone: ${data.get("telephone")}` : "",
    ].filter((line, i) => i < 2 || line);
    const href = `mailto:${SITE.email}?subject=${encodeURIComponent(`${topic} — House of Kani`)}&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = href;
    setOpened(true);
  }

  if (opened) {
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

  return (
    <form onSubmit={submit} className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Telephone" name="telephone" type="tel" />
        <label className="block">
          <span className="eyebrow text-stone">Nature of enquiry</span>
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
        <span className="eyebrow text-stone">Your note</span>
        <textarea
          name="message"
          required
          rows={5}
          className="mt-3 w-full resize-y border-0 border-b border-charcoal/25 bg-transparent py-3 font-body text-[1.05rem] outline-none focus:border-gold"
          placeholder="Tell us what you are looking for, or when you would like to visit."
        />
      </label>
      <p className="text-[0.9rem] text-charcoal/60">
        Sending opens your own email app with this note addressed to {SITE.email}. Nothing is
        stored on this website.
      </p>
      <button
        type="submit"
        className="nav-label inline-flex min-h-12 items-center justify-center border border-forest bg-forest px-8 text-ivory transition-colors duration-500 hover:bg-burgundy"
      >
        Write to Us
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
      <span className="eyebrow text-stone">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-3 w-full border-0 border-b border-charcoal/25 bg-transparent py-3 font-body text-[1.05rem] outline-none focus:border-gold"
      />
    </label>
  );
}
