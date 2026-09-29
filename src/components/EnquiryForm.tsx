"use client";

import { useState, type FormEvent } from "react";

import { Ornament } from "@/components/Ornament";

type Kind = "general" | "private";

export function EnquiryForm({ kind = "general" }: { kind?: Kind }) {
  const [sent, setSent] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div role="status" className="border-y border-gold/35 py-16 text-center">
        <Ornament size="sm" className="mx-auto" />
        <h2 className="display-3 mt-5">Your note has been received.</h2>
        <p className="mt-4 text-charcoal/70">The House will be in touch with you personally.</p>
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
            defaultValue={kind === "private" ? "Private viewing" : "General enquiry"}
            className="mt-3 w-full border-0 border-b border-charcoal/25 bg-transparent py-3 font-body text-[1.05rem] outline-none focus:border-gold"
          >
            <option>General enquiry</option>
            <option>Private viewing</option>
            <option>Bespoke piece</option>
            <option>Collection enquiry</option>
            <option>Gifting</option>
            <option>Hospitality</option>
            <option>Interior project</option>
            <option>Press</option>
            <option>Partnership</option>
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
          placeholder="How may we assist you?"
        />
      </label>
      <label className="flex items-start gap-3 text-[0.9rem] text-charcoal/60">
        <input required type="checkbox" className="mt-1 accent-[var(--color-forest)]" />
        <span>I agree that House of Kani may use these details to respond to my enquiry.</span>
      </label>
      <button
        type="submit"
        className="nav-label inline-flex min-h-12 items-center justify-center border border-forest bg-forest px-8 text-ivory transition-colors duration-500 hover:bg-burgundy"
      >
        Send Enquiry
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
