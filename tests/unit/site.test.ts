import { describe, expect, it } from "vitest";

import { organizationLd } from "@/lib/seo";
import { WHATSAPP_HREF, WHATSAPP_IS_LIVE, SITE } from "@/lib/site";

describe("site contact details", () => {
  it("uses the confirmed general enquiries address", () => {
    expect(SITE.email).toBe("contact.houseofkani@gmail.com");
    expect(SITE.contactConfirmed).toBe(true);
  });

  it("builds a wa.me deep link from the confirmed number", () => {
    expect(SITE.whatsapp).toBe("919802732612");
    expect(WHATSAPP_IS_LIVE).toBe(true);

    const url = new URL(WHATSAPP_HREF);
    expect(`${url.origin}${url.pathname}`).toBe("https://wa.me/919802732612");
    expect(url.searchParams.get("text")).toBe(SITE.whatsappMessage);
  });
});

describe("structured data", () => {
  it("points the organisation logo at the supplied emblem", () => {
    const ld = organizationLd();
    expect(ld.email).toBe("contact.houseofkani@gmail.com");
    expect(ld.logo).toMatchObject({
      "@type": "ImageObject",
      width: 1024,
      height: 1024,
    });
    expect(String(ld.logo.url)).toContain("/images/house-of-kani-emblem-v1.png");
  });
});
