import { describe, expect, it } from "vitest";

import {
  enquiryAcknowledgedHtml,
  enquiryHtml,
  enquirySubject,
  enquiryText,
  escapeHtml,
  safeSubject,
  type EnquiryInput,
} from "@/lib/email-templates";

const OPTIONS = { siteUrl: "https://houseofkani.com", toEmail: "contact.houseofkani@gmail.com" };

function enquiry(overrides: Partial<EnquiryInput> = {}): EnquiryInput {
  return {
    name: "Ayesha Khan",
    email: "ayesha@example.com",
    telephone: "+91 98027 32612",
    topic: "Appointment in Srinagar",
    message: "I would like to visit the atelier in April.\nIs that possible?",
    ...overrides,
  };
}

describe("escaping", () => {
  it("escapes the html-significant characters", () => {
    expect(escapeHtml(`<script>alert("x")</script> & 'co'`)).toBe(
      "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; &#39;co&#39;",
    );
  });

  it("strips newlines from subject lines", () => {
    expect(safeSubject("Hello\r\nBcc: someone@example.com")).toBe("Hello Bcc: someone@example.com");
  });

  it("caps absurdly long subjects", () => {
    expect(safeSubject("x".repeat(400)).length).toBe(180);
  });
});

describe("enquirySubject", () => {
  it("names the topic and the sender", () => {
    expect(enquirySubject(enquiry())).toBe("New enquiry — Appointment in Srinagar — Ayesha Khan");
  });
});

describe("enquiryHtml", () => {
  const html = enquiryHtml(enquiry(), OPTIONS);

  it("is a complete html document", () => {
    expect(html.startsWith("<!DOCTYPE html")).toBe(true);
    expect(html).toContain('<html xmlns="http://www.w3.org/1999/xhtml" lang="en">');
    expect(html.trimEnd().endsWith("</html>")).toBe(true);
  });

  it("renders the card: masthead, emblem, gold rule, details and note", () => {
    expect(html).toContain("House of Kani");
    expect(html).toContain("https://houseofkani.com/images/house-of-kani-emblem-v1.png");
    expect(html).toContain("bgcolor"); // layout survives without <style>
    expect(html).toContain("New enquiry");
    expect(html).toContain("Appointment in Srinagar");
    expect(html).toContain("Ayesha Khan");
    expect(html).toContain("ayesha@example.com");
    expect(html).toContain("+91 98027 32612");
    expect(html).toContain("Their note");
    expect(html).toContain("Reply to Ayesha");
  });

  it("carries a mobile media query and a preheader", () => {
    expect(html).toContain("@media only screen and (max-width: 620px)");
    expect(html).toContain("display:none;font-size:1px"); // preheader
  });

  it("marks the table up for screen readers", () => {
    expect(html).toContain('role="presentation"');
    expect(html).toContain('alt="House of Kani"');
  });

  it("escapes a hostile message instead of injecting markup", () => {
    const hostile = enquiryHtml(
      enquiry({ name: "<b>Ayesha</b>", message: "<img src=x onerror=alert(1)>" }),
      OPTIONS,
    );

    expect(hostile).toContain("&lt;img src=x onerror=alert(1)&gt;");
    expect(hostile).not.toContain("<img src=x");
    expect(hostile).toContain("&lt;b&gt;Ayesha&lt;/b&gt;");
  });

  it("omits the telephone row when no number was given", () => {
    const withoutPhone = enquiryHtml(enquiry({ telephone: undefined }), OPTIONS);
    expect(withoutPhone).not.toContain("Telephone");
  });
});

describe("enquiryText", () => {
  it("gives a readable plain-text alternative", () => {
    const text = enquiryText(enquiry(), OPTIONS);

    expect(text).toContain("HOUSE OF KANI");
    expect(text).toContain("Name: Ayesha Khan");
    expect(text).toContain("Nature: Appointment in Srinagar");
    expect(text).toContain("I would like to visit the atelier in April.");
    expect(text).not.toContain("<");
  });
});

describe("enquiryAcknowledgedHtml", () => {
  it("thanks the visitor by first name and links the journal", () => {
    const html = enquiryAcknowledgedHtml(enquiry(), OPTIONS);

    expect(html).toContain("We have your note.");
    expect(html).toContain("Thank you for writing, Ayesha.");
    expect(html).toContain("https://houseofkani.com/journal");
  });
});

describe("social links in the email footer", () => {
  const social = [
    { label: "Instagram", href: "https://www.instagram.com/houseofkani/" },
    { label: "Pinterest", href: "https://www.pinterest.com/pinterest_houseofkani/" },
  ];

  it("renders each profile in the enquiry footer", () => {
    const html = enquiryHtml(enquiry(), { ...OPTIONS, social });

    expect(html).toContain('href="https://www.instagram.com/houseofkani/"');
    expect(html).toContain('href="https://www.pinterest.com/pinterest_houseofkani/"');
    expect(html).toContain(">Instagram<");
    expect(html).toContain(">Pinterest<");
  });

  it("renders them in the acknowledgement too", () => {
    const html = enquiryAcknowledgedHtml(enquiry(), { ...OPTIONS, social });
    expect(html).toContain('href="https://www.instagram.com/houseofkani/"');
  });

  it("omits the row entirely when no profiles are configured", () => {
    const html = enquiryHtml(enquiry(), OPTIONS);
    expect(html).not.toContain("instagram.com");
  });
});
