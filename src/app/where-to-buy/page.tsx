import type { Metadata } from "next";

import { TextLink } from "@/components/Editorial";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { images } from "@/lib/images";
import { breadcrumbLd, jsonLdScript, seoBundle } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = seoBundle({
  title: "Acquire a Piece — Private Enquiry",
  description:
    "Acquire House of Kani Pashmina by private enquiry. Worldwide delivery, 14-day returns and a money-back guarantee after inspection.",
  pathname: "/where-to-buy",
  image: images.kaniQuoteWide[3],
});

export default function WhereToBuyPage() {
  const etsyLive = Boolean(SITE.etsyUrl);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Where to Buy", path: "/where-to-buy" },
            ]),
          ),
        }}
      />
      <PageHero
        image={images.kaniQuoteWide[3]}
        imageAlt="An oatmeal floral shawl with blue striped borders on a carved walnut bench"
        eyebrow="Acquire a Piece"
        title="The First Collection, by Private Enquiry."
        subtitle="Worldwide delivery, 14-day returns and a money-back guarantee after inspection."
        height="medium"
      />
      <section className="bg-ivory px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
          <Reveal className="border-t border-gold/45 pt-8">
            <p className="eyebrow text-gold-ink">Online</p>
            <h2 className="display-2 mt-4">{etsyLive ? "Etsy" : "Private Enquiry"}</h2>
            <p className="body-editorial mt-5 text-charcoal/75">
              {etsyLive
                ? "Our Etsy shop carries our current shawls, stoles and wraps, with secure payment and worldwide delivery."
                : "The first collection is available by private enquiry. Write to us about the pieces you would like to see; we will send available pieces, dimensions and prices directly."}
            </p>
            {etsyLive ? (
              <a
                href={SITE.etsyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-label mt-8 inline-flex items-center gap-3 border-b border-charcoal/25 pb-1 hover:border-gold hover:text-gold-ink"
              >
                Visit Our Etsy Shop <span aria-hidden="true">→</span>
              </a>
            ) : (
              <TextLink to="/contact" className="mt-8">
                Write to Us
              </TextLink>
            )}
          </Reveal>
          <Reveal delay={100} className="border-t border-gold/45 pt-8">
            <p className="eyebrow text-gold-ink">In Person or by Video</p>
            <h2 className="display-2 mt-4">Appointments</h2>
            <p className="body-editorial mt-5 text-charcoal/75">
              See pieces at our office in Hazratbal, Srinagar, visit our looms, or meet us on a video
              call. Every appointment is arranged in advance.
            </p>
            <TextLink to="/private-client" className="mt-8">
              Arrange an Appointment
            </TextLink>
          </Reveal>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl gap-8 border-t border-gold/30 pt-10 md:grid-cols-3">
          <div>
            <p className="eyebrow text-gold-ink">Worldwide Delivery</p>
            <p className="body-editorial mt-3 text-charcoal/75">
              We deliver worldwide. Delivery times, duties and taxes are confirmed at the time of
              enquiry.
            </p>
          </div>
          <div>
            <p className="eyebrow text-gold-ink">Sizes</p>
            <p className="body-editorial mt-3 text-charcoal/75">
              Sizes vary by piece and weave. We confirm the exact dimensions, weight and fibre before
              dispatch.
            </p>
          </div>
          <div>
            <p className="eyebrow text-gold-ink">Returns</p>
            <p className="body-editorial mt-3 text-charcoal/75">
              Returns are accepted within 14 days of delivery. The piece must be unworn, in its
              original condition and packaging, and is inspected on return. Return shipping is paid
              by the customer. Once the piece passes inspection, we refund the purchase price.
            </p>
          </div>
        </div>
        <p className="body-editorial mx-auto mt-10 max-w-3xl text-center text-charcoal/70">
          Prices are confirmed on enquiry and depend on the fibre, the technique, the size and the
          time a piece takes to make.{" "}
          <TextLink to="/contact">Ask about a piece</TextLink>.
        </p>
      </section>
    </>
  );
}
