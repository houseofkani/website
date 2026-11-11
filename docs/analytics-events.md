# Analytics events

The public site reports interactions to two places:

1. **Google Tag Manager** (`GTM-MTMJH55J`, mounted in `src/app/layout.tsx`) — the
   system of record. Every event is pushed onto `window.dataLayer`; a GA4 Event
   tag in the container forwards it to GA4.
2. **Vercel Web Analytics** — a cookieless mirror, so a visitor who blocks GTM
   still appears in the Vercel dashboard.

No personally identifiable information is sent. In particular, the WhatsApp
link's prefilled message and phone number never leave the browser; only the
destination host is recorded.

## What is instrumented

| Event                     | Fires when                                  | Parameters                                                    | Source                                |
| ------------------------- | ------------------------------------------- | ------------------------------------------------------------- | ------------------------------------- |
| `whatsapp_click`          | Floating WhatsApp button clicked            | `placement=floating_fab`, `destination_host=wa.me`, `is_live` | `src/components/WhatsAppFab.tsx`      |
| `whatsapp_click`          | WhatsApp link on Contact clicked            | `placement=contact_page`, `destination_host=wa.me`            | `src/app/contact/page.tsx`            |
| `google_review_click`     | "Write a Google review" clicked             | `placement=review_band`, `destination_host=g.page`            | `src/components/ReviewInvitation.tsx` |
| `enquiry_submit`          | Contact / appointment form submitted        | `form_type`, `topic`                                          | `src/components/EnquiryForm.tsx`      |
| `enquiry_success`         | Enquiry API returns 2xx                     | `form_type`, `topic`                                          | `src/components/EnquiryForm.tsx`      |
| `enquiry_fallback_mailto` | Resend not configured, mailto fallback used | `form_type`, `topic`, `error_code`                            | `src/components/EnquiryForm.tsx`      |
| `enquiry_error`           | API or network failure                      | `form_type`, `topic`, `error_code`                            | `src/components/EnquiryForm.tsx`      |

Every event automatically carries `page_path` (pathname only — preview query
strings may contain a secret) and `page_title`.

`form_type` is `contact` or `appointment`. The enquiry email also carries a
`Source:` row (`contact_form` / `appointment_form`), so leads stay attributable
even when analytics is blocked. Only those two values are accepted by
`POST /api/enquiry`.

## How the code emits an event

```ts
import { ANALYTICS_EVENTS, PLACEMENT, trackEvent } from "@/lib/analytics";

trackEvent(ANALYTICS_EVENTS.whatsappClick, {
  placement: PLACEMENT.whatsappFab,
  destination_host: "wa.me",
});
```

This pushes:

```js
window.dataLayer.push({
  event: "whatsapp_click",
  page_path: "/contact",
  page_title: "Contact — House of Kani",
  placement: "contact_page",
  destination_host: "wa.me",
});
```

Outbound CTAs should use `src/components/TrackedLink.tsx`, which adds
`destination_host` and a `data-analytics-event` attribute automatically.

## GTM container setup (one-time, outside this repo)

The code is complete; the container needs one trigger and one tag. The live
container was checked on 11 Nov 2026: it already has the GA4 destination
`G-Q6YRBSSMQF` and enhanced measurement (outbound clicks, form submits, scroll,
page views), but no custom-event trigger.

In [tagmanager.google.com](https://tagmanager.google.com) for `GTM-MTMJH55J`:

### 1. Variables

Create the **Data Layer Variables** (`Variables → New → Data Layer Variable`):

| Variable name            | Data Layer Variable Name |
| ------------------------ | ------------------------ |
| `DLV - placement`        | `placement`              |
| `DLV - page_path`        | `page_path`              |
| `DLV - page_title`       | `page_title`             |
| `DLV - destination_host` | `destination_host`       |
| `DLV - form_type`        | `form_type`              |
| `DLV - topic`            | `topic`                  |
| `DLV - error_code`       | `error_code`             |
| `DLV - is_live`          | `is_live`                |

`{{Event}}` is a built-in variable, so the event name needs no new variable.

### 2. Trigger

Create one **Custom Event** trigger:

| Trigger name       | Event name                        |
| ------------------ | --------------------------------- |
| `CE - site_events` | `.*` (matches regex, ignore case) |

GTM does not pass its own `gtm.*` events to Custom Event triggers, so this only
catches events this site pushes.

### 3. Tag

Create one **GA4 Event** tag:

- **Tag name:** `GA4 - site_events`
- **Measurement ID:** `G-Q6YRBSSMQF`
- **Event name:** `{{Event}}` (the built-in Event variable)
- **Trigger:** `CE - site_events`

Add these parameters:

| Parameter name     | Value                        |
| ------------------ | ---------------------------- |
| `placement`        | `{{DLV - placement}}`        |
| `page_path`        | `{{DLV - page_path}}`        |
| `page_title`       | `{{DLV - page_title}}`       |
| `destination_host` | `{{DLV - destination_host}}` |
| `form_type`        | `{{DLV - form_type}}`        |
| `topic`            | `{{DLV - topic}}`            |
| `error_code`       | `{{DLV - error_code}}`       |
| `is_live`          | `{{DLV - is_live}}`          |

Parameters a given event does not send resolve to undefined and are ignored, so
one tag covers all six events and any future `trackEvent` call. Publish the
container.

### 4. Mark key events

In GA4 → **Admin → Events**, mark `whatsapp_click` and `enquiry_success` as key
events if WhatsApp and enquiries are the conversions that matter.

## Verify

1. **Browser:** open DevTools → Console and run
   `window.dataLayer.filter((e) => e.event)`. Click the button; a new entry
   should appear immediately.
2. **GTM:** Preview mode → connect to the site → click the WhatsApp button.
   `whatsapp_click` should fire the Custom Event trigger and the GA4 Event tag.
3. **GA4:** DebugView (Admin → DebugView) or Realtime should show the event with
   its parameters within a few seconds.
4. **Vercel:** Project → Analytics → Events. Custom events require a Pro plan;
   on Hobby the calls are accepted but not reported.

## Reporting

In GA4 → **Explore**, use:

- Dimension: `Event name`, `placement`, `page_path`
- Metric: `Event count`
- Filter: `Event name` matches `whatsapp_click|google_review_click`

That answers the original question directly: which button, on which page, at
which placement earns the click. A click is not a conversation or a review;
reconcile `whatsapp_click` against the WhatsApp inbox and `google_review_click`
against the Google Business Profile console.

## Consent

GTM loads on every page and GA4 may set cookies. The privacy notice
(`src/app/privacy/page.tsx`) already discloses this. Vercel Analytics is
cookieless and is the fallback signal when a visitor blocks GTM; if consent
gating is added later, keep the dataLayer push unconditional and gate the GA4
tags in the container (Consent Mode v2) so the code does not need to change.
