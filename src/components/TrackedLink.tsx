"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

import { hostOf, trackEvent, type AnalyticsEvent, type AnalyticsParams } from "@/lib/analytics";

type TrackedLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "onClick"> & {
  event: AnalyticsEvent;
  params?: AnalyticsParams;
  children: ReactNode;
};

/**
 * An outbound link that reports its click to GTM and Vercel Web Analytics.
 *
 * The navigation is never prevented: both current destinations (`wa.me` and
 * the Google review page) open in a new tab, so the event lands first.
 */
export function TrackedLink({ event, params, href, children, ...rest }: TrackedLinkProps) {
  function handleClick() {
    const destination = typeof href === "string" ? hostOf(href) : undefined;

    trackEvent(event, {
      ...params,
      ...(destination ? { destination_host: destination } : {}),
    });
  }

  return (
    <a href={href} {...rest} onClick={handleClick} data-analytics-event={event}>
      {children}
    </a>
  );
}
