import type { Metadata } from "next";

import { TextLink } from "@/components/Editorial";
import { EnquiryForm } from "@/components/EnquiryForm";
import { PageHero } from "@/components/PageHero";
import { images } from "@/lib/images";
import { seoBundle } from "@/lib/seo";
import { SITE } from "@/lib/site";

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
            <p className="eyebrow text-gold">House of Kani</p>
            <h2 className="display-3 mt-4">We read every note ourselves.</h2>
            <div className="mt-8 space-y-7 text-charcoal/70">
              <div>
                <p className="eyebrow text-stone">Email</p>
                <a href={`mailto:${SITE.email}`} className="mt-1 inline-block border-b border-gold/50">
                  {SITE.email}
                </a>
              </div>
              <div>
                <p className="eyebrow text-stone">Where We Are</p>
                <p className="mt-1">{SITE.location}</p>
                <p className="mt-1">{SITE.appointments}</p>
              </div>
              <div>
                <p className="eyebrow text-stone">Buying</p>
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
