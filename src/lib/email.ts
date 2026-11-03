import { Resend } from "resend";

import {
  enquiryAcknowledgedHtml,
  enquiryHtml,
  enquirySubject,
  enquiryText,
  type EnquiryInput,
} from "@/lib/email-templates";
import { SITE } from "@/lib/site";
import { siteConfig } from "@/lib/site-config";

/**
 * Server-only transactional email.
 *
 * Reads RESEND_API_KEY, so it must never be imported from a client component.
 * Without a key the site still works: the enquiry route answers 503 and the
 * form falls back to the visitor's own mail app.
 */

const API_KEY = process.env.RESEND_API_KEY;

/** Sender. Until a domain is verified in Resend this must stay the test sender. */
const FROM = process.env.EMAIL_FROM || "House of Kani <onboarding@resend.dev>";

/** Where enquiries land. */
export const ENQUIRY_RECIPIENT = process.env.ENQUIRY_TO_EMAIL || SITE.email;

/** Send the visitor a copy? Needs a verified domain, so it is opt-in. */
const SEND_ACKNOWLEDGEMENTS = process.env.EMAIL_ACKNOWLEDGEMENTS === "true";

export const isEmailConfigured = Boolean(API_KEY);

let client: Resend | null = null;

function resend(): Resend {
  if (!API_KEY) {
    throw new EmailNotConfiguredError();
  }
  client ??= new Resend(API_KEY);
  return client;
}

export class EmailNotConfiguredError extends Error {
  constructor() {
    super("RESEND_API_KEY is not set — transactional email is disabled.");
    this.name = "EmailNotConfiguredError";
  }
}

export type SendResult = { id: string; acknowledged: boolean };

export async function sendEnquiry(input: EnquiryInput): Promise<SendResult> {
  const options = { siteUrl: siteConfig.url, toEmail: ENQUIRY_RECIPIENT };
  const subject = enquirySubject(input);

  const { data, error } = await resend().emails.send({
    from: FROM,
    to: ENQUIRY_RECIPIENT,
    replyTo: input.email,
    subject,
    html: enquiryHtml(input, options),
    text: enquiryText(input, options),
    tags: [{ name: "type", value: "enquiry" }],
  });

  if (error) {
    throw new Error(`Resend rejected the enquiry: ${error.message}`);
  }

  let acknowledged = false;
  if (SEND_ACKNOWLEDGEMENTS) {
    // The visitor's copy must never fail the enquiry itself.
    const ack = await resend()
      .emails.send({
        from: FROM,
        to: input.email,
        replyTo: ENQUIRY_RECIPIENT,
        subject: "We have your note — House of Kani",
        html: enquiryAcknowledgedHtml(input, options),
        tags: [{ name: "type", value: "enquiry-acknowledgement" }],
      })
      .catch(() => ({ data: null, error: null as { message: string } | null }));

    if (ack.error) {
      console.error("[email] Acknowledgement failed:", ack.error.message);
    } else {
      acknowledged = true;
    }
  }

  return { id: data?.id ?? "", acknowledged };
}
