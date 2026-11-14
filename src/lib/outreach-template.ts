/**
 * B2B wholesale outreach email.
 *
 * Plain, single-CTA, table-based HTML for cold outreach. Every message carries
 * the house's postal address and a working opt-out so it meets CAN-SPAM and
 * GDPR legitimate-interest expectations. No attachments and no prices: the
 * first email asks whether to send the line sheet, and points to the brand
 * pages, the GI explainer, WhatsApp and the public profiles.
 */

import { escapeHtml } from "@/lib/email-templates";

export type OutreachRecipient = {
  email: string;
  company: string;
  country: string;
};

const SITE_URL = "https://www.houseofkani.com";
const GI_URL = `${SITE_URL}/journal/pashmina-gi-tag`;
const WHATSAPP = "https://wa.me/919802732612";
const INSTAGRAM = "https://www.instagram.com/houseofkani/";
const PINTEREST = "https://www.pinterest.com/pinterest_houseofkani/";
const FACEBOOK = "https://www.facebook.com/profile.php?id=61595178571861";
const CAMPAIGN = process.env.OUTREACH_CAMPAIGN?.trim() || "wholesale-wave4";

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

function tagged(path: string, country: string): string {
  const url = new URL(path, SITE_URL);
  url.searchParams.set("utm_source", "email");
  url.searchParams.set("utm_medium", "outreach");
  url.searchParams.set("utm_campaign", CAMPAIGN);
  url.searchParams.set(
    "utm_content",
    country
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "global",
  );
  return url.toString();
}

export function outreachSubject(recipient: OutreachRecipient): string {
  return safeLine(`Handwoven Pashmina for ${recipient.company}`, 120);
}

export function outreachText(recipient: OutreachRecipient): string {
  const company = safeLine(recipient.company, 80);
  const country = safeLine(recipient.country, 60);

  return [
    `Hello ${company} team,`,
    "",
    "I am Timothy Manley of House of Kani, a fourth-generation Pashmina family in Srinagar, Kashmir. We weave Kani, Sozni and fine solids on our own looms, and we work directly with the artisans we have known for years.",
    "",
    `Pashmina is the down fibre of the Changthangi goat, hand-spun and handwoven in Kashmir — finer and warmer than cashmere. Our pieces are 100% pure Pashmina, and we provide GI certification on request. The Kashmir Pashmina GI registration certifies pure pashm, hand-spun yarn and handwoven cloth made in Kashmir; what the tag does and does not cover is set out here: ${tagged("/journal/pashmina-gi-tag", country)}`,
    "",
    `We are opening a small number of partnerships in ${country}, and ${company} looked like a natural fit.`,
    "",
    "Three ways we work with shops and brands:",
    "- Wholesale — line sheet, tiered pricing, low minimums, worldwide delivery from Srinagar",
    "- Retail — a curated selection for your floor, with display and care material",
    "- Collaboration — private label, exclusive colourways and small-batch runs",
    "",
    `The house: ${tagged("/the-house", country)}`,
    `Our Pashmina: ${tagged("/pashmina", country)}`,
    `Journal — care, Kani, Sozni and buying guides: ${tagged("/journal", country)}`,
    "",
    `Reply to this email for the line sheet and wholesale terms, or message us on WhatsApp: ${WHATSAPP}`,
    `Instagram: ${INSTAGRAM}`,
    `Pinterest: ${PINTEREST}`,
    `Facebook: ${FACEBOOK}`,
    "",
    "Best regards,",
    "Timothy V. Manley",
    "House of Kani",
    "Hazratbal, Srinagar, Jammu and Kashmir 190011, India",
    SITE_URL,
    "",
    "You are receiving this because your business publishes this address for enquiries. To stop receiving messages, reply with \"unsubscribe\" or email contact.houseofkani@gmail.com.",
  ].join("\n");
}

export function outreachHtml(recipient: OutreachRecipient): string {
  const company = escapeHtml(safeLine(recipient.company, 80));
  const country = escapeHtml(safeLine(recipient.country, 60));
  const house = tagged("/the-house", recipient.country);
  const pashmina = tagged("/pashmina", recipient.country);
  const journal = tagged("/journal", recipient.country);
  const gi = tagged("/journal/pashmina-gi-tag", recipient.country);

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Handwoven Pashmina — House of Kani</title>
</head>
<body style="margin:0;padding:0;background:${C.ivory};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    Handwoven Pashmina from a fourth-generation Srinagar family. Wholesale, retail and collaboration.
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.ivory};">
    <tr>
      <td align="center" style="padding:28px 14px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:${C.card};border:1px solid ${C.border};">
          <tr>
            <td style="padding:26px 34px 18px;border-bottom:1px solid ${C.border};">
              <a href="${SITE_URL}" style="text-decoration:none;">
                <img src="${SITE_URL}/images/house-of-kani-emblem-v1.png" width="54" height="54" alt="House of Kani" style="display:block;border:0;width:54px;height:auto;" />
              </a>
              <p style="margin:14px 0 0;font-family:${DISPLAY};font-size:13px;letter-spacing:0.22em;text-transform:uppercase;color:${C.goldInk};">House of Kani</p>
              <p style="margin:6px 0 0;font-family:${SANS};font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${C.stone};">Srinagar · Four generations</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 34px 10px;">
              <p style="margin:0 0 18px;font-family:${DISPLAY};font-size:22px;line-height:1.35;color:${C.forest};">Handwoven Pashmina, direct from the loom</p>
              <p style="margin:0 0 16px;font-family:${DISPLAY};font-size:16px;line-height:1.7;color:${C.charcoal};">Hello ${company} team,</p>
              <p style="margin:0 0 16px;font-family:${DISPLAY};font-size:16px;line-height:1.7;color:${C.charcoal};">I am Timothy Manley of House of Kani, a fourth-generation Pashmina family in Srinagar, Kashmir. We weave Kani, Sozni and fine solids on our own looms, and we work directly with the artisans we have known for years.</p>
              <p style="margin:0 0 16px;font-family:${DISPLAY};font-size:16px;line-height:1.7;color:${C.charcoal};">Pashmina is the down fibre of the Changthangi goat, hand-spun and handwoven in Kashmir — finer and warmer than cashmere. Our pieces are 100% pure Pashmina, and we provide GI certification on request. <a href="${gi}" style="color:${C.goldInk};">What the Kashmir Pashmina GI tag certifies</a>.</p>
              <p style="margin:0 0 22px;font-family:${DISPLAY};font-size:16px;line-height:1.7;color:${C.charcoal};">We are opening a small number of partnerships in ${country}, and ${company} looked like a natural fit.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 34px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.ivory};border-left:2px solid ${C.gold};">
                <tr>
                  <td style="padding:20px 22px;">
                    <p style="margin:0 0 12px;font-family:${SANS};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${C.stone};">Three ways we work together</p>
                    <p style="margin:0 0 10px;font-family:${DISPLAY};font-size:15px;line-height:1.7;color:${C.charcoal};"><strong style="color:${C.forest};">Wholesale</strong> — line sheet, tiered pricing, low minimums, worldwide delivery from Srinagar.</p>
                    <p style="margin:0 0 10px;font-family:${DISPLAY};font-size:15px;line-height:1.7;color:${C.charcoal};"><strong style="color:${C.forest};">Retail</strong> — a curated selection for your floor, with display and care material.</p>
                    <p style="margin:0;font-family:${DISPLAY};font-size:15px;line-height:1.7;color:${C.charcoal};"><strong style="color:${C.forest};">Collaboration</strong> — private label, exclusive colourways and small-batch runs.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:26px 34px 8px;">
              <p style="margin:0 0 18px;font-family:${DISPLAY};font-size:16px;line-height:1.7;color:${C.charcoal};">Reply to this email for the line sheet and wholesale terms, or message us on WhatsApp.</p>
              <a href="mailto:contact.houseofkani@gmail.com?subject=Wholesale%20Pashmina%20—%20Line%20sheet%20request" style="display:inline-block;background:${C.forest};color:#ffffff;font-family:${SANS};font-size:12px;letter-spacing:0.14em;text-transform:uppercase;text-decoration:none;padding:14px 24px;">Request the line sheet</a>
              <a href="${WHATSAPP}" style="display:inline-block;margin-left:8px;color:${C.goldInk};font-family:${SANS};font-size:12px;letter-spacing:0.14em;text-transform:uppercase;text-decoration:none;padding:14px 4px;">WhatsApp</a>
            </td>
          </tr>
          <tr>
            <td style="padding:22px 34px 0;">
              <p style="margin:0;font-family:${SANS};font-size:12px;line-height:1.9;color:${C.muted};">
                <a href="${house}" style="color:${C.goldInk};">The house</a> ·
                <a href="${pashmina}" style="color:${C.goldInk};">Our Pashmina</a> ·
                <a href="${journal}" style="color:${C.goldInk};">Journal</a> ·
                <a href="${INSTAGRAM}" style="color:${C.goldInk};">Instagram</a> ·
                <a href="${PINTEREST}" style="color:${C.goldInk};">Pinterest</a> ·
                <a href="${FACEBOOK}" style="color:${C.goldInk};">Facebook</a>
              </p>
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
                <a href="${SITE_URL}" style="color:${C.goldInk};text-decoration:none;">houseofkani.com</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 34px 26px;border-top:1px solid ${C.border};">
              <p style="margin:0;font-family:${SANS};font-size:11px;line-height:1.7;color:${C.muted};">
                You are receiving this because your business publishes this address for enquiries.
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
