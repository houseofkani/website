import { track as vercelTrack } from "@vercel/analytics";

/**
 * Event tracking for the public site.
 *
 * Google Tag Manager (`GTM-MTMJH55J`, mounted in `app/layout.tsx`) is the
 * system of record: every call pushes a plain `event` onto `window.dataLayer`,
 * where a GA4 Event tag forwards it. The same event is mirrored to Vercel Web
 * Analytics, which is cookieless and keeps counting when a visitor blocks GTM.
 *
 * Never pass names, addresses, message text or the WhatsApp number. The
 * `wa.me` href already contains the number and the prefilled note, so only the
 * destination host ever reaches analytics.
 */

export const ANALYTICS_EVENTS = {
  whatsappClick: "whatsapp_click",
  googleReviewClick: "google_review_click",
  enquirySubmit: "enquiry_submit",
  enquirySuccess: "enquiry_success",
  enquiryFallback: "enquiry_fallback_mailto",
  enquiryError: "enquiry_error",
} as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

/** Where a call to action lives. Kept stable because GA4 reports group by it. */
export const PLACEMENT = {
  whatsappFab: "floating_fab",
  whatsappContact: "contact_page",
  googleReviewBand: "review_band",
} as const;

export type AnalyticsValue = string | number | boolean | null | undefined;

export type AnalyticsParams = Record<string, AnalyticsValue>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Host of an absolute URL; `undefined` for relative or malformed hrefs. */
export function hostOf(href: string): string | undefined {
  try {
    return new URL(href).host || undefined;
  } catch {
    return undefined;
  }
}

/**
 * Record one interaction.
 *
 * Page context is attached here so every caller gets it, and only the
 * pathname is sent: preview URLs carry a secret in the query string.
 */
export function trackEvent(event: AnalyticsEvent, params: AnalyticsParams = {}): void {
  if (typeof window === "undefined") return;

  const pagePath = window.location.pathname;
  const pageTitle = document.title;

  const payload: Record<string, unknown> = { event, page_path: pagePath, page_title: pageTitle };
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) payload[key] = value;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);

  try {
    vercelTrack(event, { ...params, page_path: pagePath, page_title: pageTitle });
  } catch {
    // Vercel Analytics is best-effort; GTM already received the event.
  }
}
