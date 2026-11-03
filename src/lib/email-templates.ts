/**
 * Transactional email templates.
 *
 * Pure string builders — no SDK, no env — so they can be unit-tested and
 * rendered in a dry run. Everything is table-based with inline styles because
 * email clients strip <style> blocks and refuse flex/grid; the <style> block we
 * do ship only carries the mobile media query and progressive niceties.
 */

export type EnquiryInput = {
  name: string;
  email: string;
  telephone?: string;
  topic: string;
  message: string;
};

export type TemplateOptions = {
  siteUrl: string;
  toEmail: string;
  /** Public profiles rendered in the footer. */
  social?: { label: string; href: string }[];
};

/** Palette mirrors globals.css so the email reads as the same house. */
const C = {
  ivory: "#faf7f1",
  cream: "#f3ecdd",
  card: "#fffdf8",
  border: "#e6dcc9",
  forest: "#16241c",
  forestSoft: "#24382d",
  gold: "#b59a7a",
  goldInk: "#7c5833",
  charcoal: "#33312c",
  muted: "#6a665e",
  stone: "#77716a",
};

const DISPLAY = "Georgia, 'Times New Roman', Times, serif";
const SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Subject lines must never carry CR/LF — header injection. */
export function safeSubject(value: string): string {
  return value
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, 180);
}

export function enquirySubject(input: EnquiryInput): string {
  return safeSubject(`New enquiry — ${input.topic} — ${input.name}`);
}

export function enquiryText(input: EnquiryInput, options: TemplateOptions): string {
  return [
    "HOUSE OF KANI",
    "New enquiry from the website",
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    input.telephone ? `Telephone: ${input.telephone}` : "",
    `Nature: ${input.topic}`,
    "",
    input.message,
    "",
    "—",
    `Reply directly to this email to answer ${input.name}.`,
    options.siteUrl.replace(/^https?:\/\//, ""),
  ]
    .filter((line) => line !== "")
    .join("\n");
}

function socialRow(options: TemplateOptions): string {
  const profiles = options.social ?? [];
  if (profiles.length === 0) return "";

  const links = profiles
    .map(
      (profile) =>
        `<a href="${escapeHtml(profile.href)}" style="color:${C.goldInk};text-decoration:none;">${escapeHtml(profile.label)}</a>`,
    )
    .join(`&nbsp;&nbsp;·&nbsp;&nbsp;`);

  return `<p style="margin:12px 0 0;font-family:${SANS};font-size:11px;letter-spacing:0.14em;line-height:2;color:${C.stone};">
                      ${links}
                    </p>`;
}

function detailRow(label: string, value: string, href?: string): string {
  const content = href
    ? `<a href="${escapeHtml(href)}" style="color:${C.goldInk};text-decoration:none;border-bottom:1px solid ${C.border};">${escapeHtml(value)}</a>`
    : escapeHtml(value);

  return `<tr>
            <td style="padding:10px 0;border-bottom:1px solid ${C.border};font-family:${SANS};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${C.stone};width:140px;vertical-align:top;">${escapeHtml(label)}</td>
            <td style="padding:10px 0;border-bottom:1px solid ${C.border};font-family:${DISPLAY};font-size:16px;line-height:1.5;color:${C.charcoal};">${content}</td>
          </tr>`;
}

/** The enquiry notification, in the house's ivory-and-forest card style. */
export function enquiryHtml(input: EnquiryInput, options: TemplateOptions): string {
  const site = options.siteUrl.replace(/\/$/, "");
  const emblem = `${site}/images/house-of-kani-emblem-v1.png`;
  const firstName = escapeHtml(input.name.split(/\s+/)[0] || "them");

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="format-detection" content="telephone=no,address=no,email=no" />
  <title>${escapeHtml(enquirySubject(input))}</title>
  <style type="text/css">
    @media only screen and (max-width: 620px) {
      .shell { width: 100% !important; }
      .pad { padding-left: 22px !important; padding-right: 22px !important; }
      .stack { display: block !important; width: 100% !important; text-align: center !important; }
      .stack + .stack { padding-top: 10px !important; }
      .label-cell { width: auto !important; }
    }
    a { text-decoration: none; }
  </style>
</head>
<body style="margin:0;padding:0;background-color:${C.cream};-webkit-font-smoothing:antialiased;">
  <!-- Preheader: shown in the inbox list, hidden in the body. -->
  <div style="display:none;font-size:1px;color:${C.cream};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    ${escapeHtml(input.topic)} from ${escapeHtml(input.name)} — ${escapeHtml(input.message.slice(0, 90))}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.cream}" style="background-color:${C.cream};padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" class="shell" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.card}" style="width:600px;max-width:600px;background-color:${C.card};border:1px solid ${C.border};border-radius:2px;overflow:hidden;">

          <!-- Masthead -->
          <tr>
            <td class="pad" align="center" bgcolor="${C.forest}" style="background-color:${C.forest};padding:34px 40px 30px;">
              <img src="${emblem}" width="52" height="52" alt="House of Kani" style="display:block;border:0;outline:none;width:52px;height:52px;" />
              <div style="margin-top:16px;font-family:${DISPLAY};font-size:15px;letter-spacing:0.34em;text-transform:uppercase;color:${C.ivory};">
                House of Kani
              </div>
              <div style="margin-top:10px;font-family:${SANS};font-size:10px;letter-spacing:0.28em;text-transform:uppercase;color:${C.gold};">
                New enquiry
              </div>
            </td>
          </tr>

          <!-- Gold hairline -->
          <tr>
            <td bgcolor="${C.gold}" style="background-color:${C.gold};height:1px;line-height:1px;font-size:0;">&nbsp;</td>
          </tr>

          <!-- Card body -->
          <tr>
            <td class="pad" style="padding:36px 40px 8px;">
              <h1 style="margin:0;font-family:${DISPLAY};font-weight:normal;font-size:26px;line-height:1.3;color:${C.forest};">
                ${escapeHtml(input.topic)}
              </h1>
              <p style="margin:12px 0 0;font-family:${SANS};font-size:13px;line-height:1.7;color:${C.muted};">
                Sent from the website enquiry form.
              </p>
            </td>
          </tr>

          <!-- Details -->
          <tr>
            <td class="pad" style="padding:22px 40px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                ${detailRow("Name", input.name)}
                ${detailRow("Email", input.email, `mailto:${input.email}`)}
                ${input.telephone ? detailRow("Telephone", input.telephone, `tel:${input.telephone.replace(/[^\d+]/g, "")}`) : ""}
                ${detailRow("Nature", input.topic)}
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td class="pad" style="padding:28px 40px 0;">
              <div style="font-family:${SANS};font-size:10px;letter-spacing:0.24em;text-transform:uppercase;color:${C.stone};">
                Their note
              </div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.ivory}" style="margin-top:12px;background-color:${C.ivory};border-left:2px solid ${C.gold};">
                <tr>
                  <td style="padding:20px 22px;font-family:${DISPLAY};font-size:17px;line-height:1.7;color:${C.charcoal};white-space:pre-wrap;">${escapeHtml(input.message)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Reply -->
          <tr>
            <td class="pad" align="center" style="padding:32px 40px 8px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" bgcolor="${C.forest}" style="background-color:${C.forest};border-radius:2px;">
                    <a href="mailto:${escapeHtml(input.email)}?subject=${encodeURIComponent(`Re: ${input.topic} — House of Kani`)}"
                       style="display:inline-block;padding:14px 30px;font-family:${SANS};font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:${C.ivory};">
                      Reply to ${firstName}
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:14px 0 0;font-family:${SANS};font-size:12px;line-height:1.6;color:${C.stone};">
                Replying to this email also answers them directly.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:26px 0 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${C.border};">
                <tr>
                  <td class="pad" align="center" style="padding:22px 40px 30px;">
                    <p style="margin:0;font-family:${SANS};font-size:11px;letter-spacing:0.14em;line-height:2;color:${C.stone};">
                      <a href="${site}/journal" style="color:${C.goldInk};">Journal</a>
                      &nbsp;·&nbsp;
                      <a href="${site}/the-house" style="color:${C.goldInk};">The House</a>
                      &nbsp;·&nbsp;
                      <a href="${site}/contact" style="color:${C.goldInk};">Contact</a>
                    </p>
                    ${socialRow(options)}
                    <p style="margin:8px 0 0;font-family:${SANS};font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:${C.stone};">
                      House of Kani · Srinagar, Kashmir
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

        <p style="margin:16px 0 0;font-family:${SANS};font-size:10px;line-height:1.6;color:${C.stone};">
          Sent to ${escapeHtml(options.toEmail)} from ${site.replace(/^https?:\/\//, "")}
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Confirmation shown to the visitor after a successful send. */
export function enquiryAcknowledgedHtml(input: EnquiryInput, options: TemplateOptions): string {
  const site = options.siteUrl.replace(/\/$/, "");
  const emblem = `${site}/images/house-of-kani-emblem-v1.png`;

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>We have your note — House of Kani</title>
  <style type="text/css">
    @media only screen and (max-width: 620px) {
      .shell { width: 100% !important; }
      .pad { padding-left: 22px !important; padding-right: 22px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:${C.cream};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.cream}" style="background-color:${C.cream};padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" class="shell" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.card}" style="width:600px;max-width:600px;background-color:${C.card};border:1px solid ${C.border};">
          <tr>
            <td class="pad" align="center" bgcolor="${C.forest}" style="background-color:${C.forest};padding:34px 40px 30px;">
              <img src="${emblem}" width="52" height="52" alt="House of Kani" style="display:block;border:0;width:52px;height:52px;" />
              <div style="margin-top:16px;font-family:${DISPLAY};font-size:15px;letter-spacing:0.34em;text-transform:uppercase;color:${C.ivory};">
                House of Kani
              </div>
            </td>
          </tr>
          <tr>
            <td bgcolor="${C.gold}" style="background-color:${C.gold};height:1px;line-height:1px;font-size:0;">&nbsp;</td>
          </tr>
          <tr>
            <td class="pad" style="padding:38px 40px 10px;">
              <h1 style="margin:0;font-family:${DISPLAY};font-weight:normal;font-size:26px;line-height:1.3;color:${C.forest};">
                We have your note.
              </h1>
              <p style="margin:16px 0 0;font-family:${DISPLAY};font-size:17px;line-height:1.75;color:${C.charcoal};">
                Thank you for writing, ${firstName(input)}. Your enquiry about
                <em>${escapeHtml(input.topic.toLowerCase())}</em> has reached our family in Srinagar,
                and we will reply to this address within one working day.
              </p>
              <p style="margin:16px 0 0;font-family:${DISPLAY};font-size:16px;line-height:1.75;color:${C.muted};">
                If it is urgent, you are welcome to write again at
                <a href="mailto:${escapeHtml(options.toEmail)}" style="color:${C.goldInk};">${escapeHtml(options.toEmail)}</a>.
              </p>
            </td>
          </tr>
          <tr>
            <td class="pad" align="center" style="padding:30px 40px 8px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td bgcolor="${C.forest}" style="background-color:${C.forest};border-radius:2px;">
                    <a href="${site}/journal" style="display:inline-block;padding:14px 30px;font-family:${SANS};font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:${C.ivory};">
                      Read the Journal
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="pad" align="center" style="padding:6px 40px 30px;">
              ${socialRow(options)}
              <p style="margin:10px 0 0;font-family:${SANS};font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:${C.stone};">
                House of Kani · Srinagar, Kashmir
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

function firstName(input: EnquiryInput): string {
  return escapeHtml(input.name.split(/\s+/)[0] || "there");
}
