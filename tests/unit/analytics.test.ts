import { afterEach, describe, expect, it, vi } from "vitest";

import { ANALYTICS_EVENTS, PLACEMENT, hostOf, trackEvent } from "@/lib/analytics";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("event taxonomy", () => {
  it("keeps unique, GA4-safe event names", () => {
    const names = Object.values(ANALYTICS_EVENTS);
    expect(new Set(names).size).toBe(names.length);
    for (const name of names) expect(name).toMatch(/^[a-z][a-z0-9_]{0,39}$/);
  });

  it("pins the placements used in reports", () => {
    expect(PLACEMENT).toEqual({
      whatsappFab: "floating_fab",
      whatsappContact: "contact_page",
      googleReviewBand: "review_band",
    });
  });
});

describe("hostOf", () => {
  it("reads the host and drops the WhatsApp query string", () => {
    expect(hostOf("https://wa.me/919802732612?text=Hello%20House%20of%20Kani")).toBe("wa.me");
  });

  it("returns undefined for relative and malformed links", () => {
    expect(hostOf("/contact")).toBeUndefined();
    expect(hostOf("not a url")).toBeUndefined();
  });
});

describe("trackEvent", () => {
  it("is a no-op during server rendering", () => {
    expect(() => trackEvent(ANALYTICS_EVENTS.whatsappClick)).not.toThrow();
  });

  it("pushes a GTM event with page context and drops empty parameters", () => {
    const dataLayer: Record<string, unknown>[] = [];
    vi.stubGlobal("window", { location: { pathname: "/contact" }, dataLayer });
    vi.stubGlobal("document", { title: "Contact — House of Kani" });

    trackEvent(ANALYTICS_EVENTS.whatsappClick, {
      placement: PLACEMENT.whatsappContact,
      destination_host: "wa.me",
      dropped: undefined,
    });

    expect(dataLayer).toHaveLength(1);
    expect(dataLayer[0]).toEqual({
      event: "whatsapp_click",
      page_path: "/contact",
      page_title: "Contact — House of Kani",
      placement: "contact_page",
      destination_host: "wa.me",
    });
  });
});
