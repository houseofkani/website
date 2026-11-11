import { TrackedLink } from "@/components/TrackedLink";
import { ANALYTICS_EVENTS, PLACEMENT } from "@/lib/analytics";
import { SITE } from "@/lib/site";

/**
 * Site-wide review invitation.
 *
 * A quiet editorial band between the page and the footer. Deliberately no
 * stars or rating badge: the house asks for a review, it does not claim a score.
 */
export function ReviewInvitation() {
  return (
    <section
      aria-labelledby="review-invitation-title"
      className="bg-cream px-5 py-14 sm:px-8 sm:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-[1200px] border border-gold/25 bg-forest px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
        <div className="grid items-center gap-8 sm:grid-cols-[1fr_auto] sm:gap-12">
          <div>
            <p className="eyebrow text-gold">A note for the house</p>
            <h2
              id="review-invitation-title"
              className="font-display mt-4 max-w-2xl text-[1.65rem] leading-[1.35] font-light text-ivory sm:text-[2.05rem]"
            >
              If a piece has found its place with you, leave a few words on Google.
            </h2>
            <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed font-light text-ivory/60">
              It helps someone far from Srinagar know what to expect from the weave.
            </p>
          </div>
          <TrackedLink
            href={SITE.googleReview}
            event={ANALYTICS_EVENTS.googleReviewClick}
            params={{ placement: PLACEMENT.googleReviewBand }}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Write a Google review for House of Kani (opens in a new tab)"
            className="inline-flex items-center justify-center gap-3 bg-gold px-6 py-4 text-forest transition-colors duration-500 hover:bg-ivory sm:justify-self-end"
          >
            <span className="eyebrow">Write a Google review</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 12 12"
              className="h-3 w-3 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="square"
            >
              <path d="M3.25 8.75 8.75 3.25M4.5 3.25h4.25v4.25" />
            </svg>
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
