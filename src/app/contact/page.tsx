import type { Metadata } from "next";

import { TextLink } from "@/components/Editorial";
import { EnquiryForm } from "@/components/EnquiryForm";
import { PageHero } from "@/components/PageHero";
import { TrackedLink } from "@/components/TrackedLink";
import { ANALYTICS_EVENTS, PLACEMENT } from "@/lib/analytics";
import { images } from "@/lib/images";
import { breadcrumbLd, jsonLdScript, seoBundle, webPageLd } from "@/lib/seo";
import { SITE, WHATSAPP_HREF } from "@/lib/site";

export const metadata: Metadata = seoBundle({
  title: "Contact",
  description:
    "Write to House of Kani about a piece, an appointment in Srinagar or online, a loom visit or GI certification.",
  pathname: "/contact",
  image: images.heritageArchive,
});

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            webPageLd({
              path: "/contact",
              name: "Contact",
              description:
                "Write to House of Kani about a piece, an appointment in Srinagar or online, a loom visit or GI certification.",
              type: "ContactPage",
              image: images.heritageArchive,
            }),
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Contact", path: "/contact" },
            ]),
          ]),
        }}
      />
      <PageHero
        image={images.heritageArchive}
        imageAlt="A paisley Pashmina shawl beside old folios on a carved walnut archive table"
        eyebrow="Contact"
        title="Write to Our Family."
        subtitle="About a piece, an appointment, a loom visit or GI certification."
        height="medium"
      />
      <section className="bg-ivory px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <aside>
            <p className="eyebrow text-gold-ink">House of Kani</p>
            <h2 className="display-3 mt-4">We read every note ourselves.</h2>
            <div className="mt-8 space-y-7 text-charcoal/70">
              <div>
                <p className="eyebrow text-stone-ink">Email</p>
                <a
                  href={`mailto:${SITE.email}`}
                  className="mt-1 inline-block border-b border-gold/50"
                >
                  {SITE.email}
                </a>
              </div>
              <div>
                <p className="eyebrow text-stone-ink">WhatsApp</p>
                <TrackedLink
                  href={WHATSAPP_HREF}
                  event={ANALYTICS_EVENTS.whatsappClick}
                  params={{ placement: PLACEMENT.whatsappContact }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block border-b border-gold/50"
                >
                  {SITE.phone}
                </TrackedLink>
              </div>
              <div>
                <p className="eyebrow text-stone-ink">Where We Are</p>
                <p className="mt-1">{SITE.location}</p>
                <p className="mt-1">{SITE.appointments}</p>
              </div>
              <div>
                <p className="eyebrow text-stone-ink">Buying</p>
                <TextLink to="/where-to-buy" className="mt-2">
                  Where to Buy
                </TextLink>
              </div>
            </div>
          </aside>
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
