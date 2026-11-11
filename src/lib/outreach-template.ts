/**
 * B2B wholesale outreach email.
 *
 * Plain, single-CTA, table-based HTML for cold outreach. Every message carries
 * the house's postal address and a working opt-out so it meets CAN-SPAM and
 * GDPR legitimate-interest expectations. No attachments and no prices: the
 * first email only asks whether to send the line sheet.
 */

import { escapeHtml } from "@/lib/email-templates";

export type OutreachRecipient = {
  email: string;
  company: string;
  country: string;
};

const C = {
  ivory: "#faf7f1",
  card: "#fffdf8",
  border: "#e6dcc9",
  forest: "#16241c",
  gold: "#b59a7a",
  goldInk: "#7c5833",
  charcoal: "#33312c",
  muted: "#6a665e",
  stone: "#77716a",
};

const DISPLAY = "Georgia, 'Times New Roman', Times, serif";
const SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif";

function safeLine(value: string, max: number): string {
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, max);
}

export function outreachSubject(recipient: OutreachRecipient): string {
  return safeLine(`Wholesale Pashmina for ${recipient.company}`, 120);
}

export function outreachText(recipient: OutreachRecipient): string {
  const company = safeLine(recipient.company, 80);
  const country = safeLine(recipient.country, 60);

  return [
    `Hello ${company} team,`,
    "",
    "I am writing from House of Kani, a fourth-generation Pashmina family in Srinagar, Kashmir. We weave Kani, Sozni and solid Pashmina on our own looms and work by private enquiry.",
    "",
    `We are opening a small number of wholesale partnerships in ${country}, and ${company} looked like a natural fit.`,
    "",
    "What we can offer:",
    "- 100% pure Pashmina, handwoven and hand-embroidered in Kashmir",
    "- Kani, Sozni and 279 solid shades",
    "- GI certification arranged on request",
    "- Small-batch runs and private-label discussion",
    "- Worldwide delivery from Srinagar",
    "",
    "If you would like our line sheet and wholesale terms, reply to this email and I will send them.",
    "",
    "Best regards,",
    "Timothy V. Manley",
    "House of Kani",
    "Hazratbal, Srinagar, Jammu and Kashmir 190011, India",
    "https://www.houseofkani.com",
    "",
    "You are receiving this because your business is listed publicly in the fashion and lifestyle trade. To stop receiving messages, reply with \"unsubscribe\" or email contact.houseofkani@gmail.com?subject=Unsubscribe.",
  ].join("\n");
}

export function outreachHtml(recipient: OutreachRecipient): string {
  const company = escapeHtml(safeLine(recipient.company, 80));
  const country = escapeHtml(safeLine(recipient.country, 60));
  const site = "https://www.houseofkani.com";

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Wholesale Pashmina — House of Kani</title>
</head>
<body style="margin:0;padding:0;background:${C.ivory};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    Handwoven Pashmina from a fourth-generation Srinagar family. Line sheet on request.
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.ivory};">
    <tr>
      <td align="center" style="padding:28px 14px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:${C.card};border:1px solid ${C.border};">
          <tr>
            <td style="padding:26px 34px 18px;border-bottom:1px solid ${C.border};">
              <a href="${site}" style="text-decoration:none;">
                <img src="${site}/images/house-of-kani-emblem-v1.png" width="54" height="54" alt="House of Kani" style="display:block;border:0;width:54px;height:auto;" />
              </a>
              <p style="margin:14px 0 0;font-family:${DISPLAY};font-size:13px;letter-spacing:0.22em;text-transform:uppercase;color:${C.goldInk};">House of Kani</p>
              <p style="margin:6px 0 0;font-family:${SANS};font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${C.stone};">Srinagar · Four generations</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 34px 10px;">
              <p style="margin:0 0 18px;font-family:${DISPLAY};font-size:22px;line-height:1.35;color:${C.forest};">Wholesale Pashmina, direct from the loom</p>
              <p style="margin:0 0 16px;font-family:${DISPLAY};font-size:16px;line-height:1.7;color:${C.charcoal};">Hello ${company} team,</p>
              <p style="margin:0 0 16px;font-family:${DISPLAY};font-size:16px;line-height:1.7;color:${C.charcoal};">I am writing from House of Kani, a fourth-generation Pashmina family in Srinagar, Kashmir. We weave Kani, Sozni and solid Pashmina on our own looms and work by private enquiry.</p>
              <p style="margin:0 0 22px;font-family:${DISPLAY};font-size:16px;line-height:1.7;color:${C.charcoal};">We are opening a small number of wholesale partnerships in ${country}, and ${company} looked like a natural fit.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 34px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.ivory};border-left:2px solid ${C.gold};">
                <tr>
                  <td style="padding:20px 22px;">
                    <p style="margin:0 0 10px;font-family:${SANS};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${C.stone};">What we can offer</p>
                    <p style="margin:0;font-family:${DISPLAY};font-size:15px;line-height:1.8;color:${C.charcoal};">
                      100% pure Pashmina, handwoven and hand-embroidered in Kashmir<br />
                      Kani, Sozni and 279 solid shades<br />
                      GI certification arranged on request<br />
                      Small-batch runs and private-label discussion<br />
                      Worldwide delivery from Srinagar
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:26px 34px 8px;">
              <p style="margin:0 0 22px;font-family:${DISPLAY};font-size:16px;line-height:1.7;color:${C.charcoal};">If you would like our line sheet and wholesale terms, reply to this email and I will send them.</p>
              <a href="mailto:contact.houseofkani@gmail.com?subject=Wholesale%20Pashmina%20—%20Line%20sheet%20request" style="display:inline-block;background:${C.forest};color:#ffffff;font-family:${SANS};font-size:12px;letter-spacing:0.14em;text-transform:uppercase;text-decoration:none;padding:14px 24px;">Request the line sheet</a>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 34px 0;">
              <p style="margin:0;font-family:${DISPLAY};font-size:16px;line-height:1.7;color:${C.charcoal};">Best regards,<br />Timothy V. Manley<br />House of Kani</p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 34px 30px;">
              <p style="margin:0;font-family:${SANS};font-size:11px;line-height:1.8;color:${C.stone};">
                House of Kani, Hazratbal, Srinagar, Jammu and Kashmir 190011, India<br />
                <a href="${site}" style="color:${C.goldInk};text-decoration:none;">houseofkani.com</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 34px 26px;border-top:1px solid ${C.border};">
              <p style="margin:0;font-family:${SANS};font-size:11px;line-height:1.7;color:${C.muted};">
                You are receiving this because your business is listed publicly in the fashion and lifestyle trade.
                <a href="mailto:contact.houseofkani@gmail.com?subject=Unsubscribe" style="color:${C.goldInk};">Unsubscribe</a> and we will remove you.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
