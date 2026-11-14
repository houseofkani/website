import { readFileSync } from "node:fs";

import { outreachHtml, outreachSubject, outreachText } from "../src/lib/outreach-template";

/**
 * Render the outreach template for a batch of recipients.
 *
 * Reads a JSON array of { email, company, country } on stdin and writes a JSON
 * array of { email, subject, text, html } on stdout, so non-Next senders (the
 * Gmail API path) use the same copy as the Resend route.
 *
 * Usage:
 *   echo '[{"email":"a@b.c","company":"A","country":"France"}]' \
 *     | npx tsx scripts/render-outreach.ts
 */

type Recipient = { email: string; company: string; country: string };

const input = JSON.parse(readFileSync(0, "utf8")) as Recipient[];
const rendered = input.map((recipient) => ({
  email: recipient.email,
  subject: outreachSubject(recipient),
  text: outreachText(recipient),
  html: outreachHtml(recipient),
}));
process.stdout.write(JSON.stringify(rendered));
