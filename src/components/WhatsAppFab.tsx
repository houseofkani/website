"use client";

import Link from "next/link";

import { ANALYTICS_EVENTS, PLACEMENT, hostOf, trackEvent } from "@/lib/analytics";
import { WHATSAPP_HREF, WHATSAPP_IS_LIVE } from "@/lib/site";

/** The official WhatsApp glyph, reported in the brand's own colour. */
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

/**
 * Floating WhatsApp button — official green, two staggered pulse rings.
 * With no confirmed number the link falls back to the contact page.
 */
export function WhatsAppFab() {
  const label = WHATSAPP_IS_LIVE ? "Chat with House of Kani on WhatsApp" : "Write to House of Kani";

  return (
    <div className="pointer-events-none fixed right-5 bottom-5 z-[45] print:hidden sm:right-7 sm:bottom-7">
      <div
        className="whatsapp-arrive pointer-events-auto relative"
        style={{ animationDelay: "700ms" }}
      >
        <span className="whatsapp-ring" aria-hidden="true" />
        <span className="whatsapp-ring" aria-hidden="true" style={{ animationDelay: "1.4s" }} />
        <Link
          href={WHATSAPP_HREF}
          aria-label={label}
          onClick={
            WHATSAPP_IS_LIVE
              ? () =>
                  trackEvent(ANALYTICS_EVENTS.whatsappClick, {
                    placement: PLACEMENT.whatsappFab,
                    destination_host: hostOf(WHATSAPP_HREF),
                    is_live: true,
                  })
              : undefined
          }
          data-analytics-event={WHATSAPP_IS_LIVE ? ANALYTICS_EVENTS.whatsappClick : undefined}
          {...(WHATSAPP_IS_LIVE ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-ivory shadow-[0_12px_32px_-8px_oklch(0.29_0.09_150/55%)] transition-[background-color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04] hover:bg-whatsapp-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-whatsapp"
        >
          <WhatsAppGlyph className="h-7 w-7" />
          <span className="nav-label pointer-events-none absolute top-1/2 right-[calc(100%+0.85rem)] -translate-y-1/2 rounded-full bg-forest px-4 py-2 text-ivory whitespace-nowrap opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            {WHATSAPP_IS_LIVE ? "WhatsApp" : "Contact"}
          </span>
        </Link>
      </div>
    </div>
  );
}
