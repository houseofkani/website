import type { Metadata } from "next";

import { SplitSection } from "@/components/Editorial";
import { PageHero } from "@/components/PageHero";
import { images } from "@/lib/images";
import { seoBundle } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = seoBundle({
  title: "Press",
  description: "Press and media enquiries for House of Kani.",
  pathname: "/press",
  image: images.heritageArchive,
  robots: "noindex",
});

export default function PressPage() {
  return (
    <>
      <PageHero
        image={images.heritageArchive}
        imageAlt="A paisley Pashmina shawl beside old folios on a carved walnut archive table"
        eyebrow="Press"
        title="For Editors and Writers."
        height="medium"
      />
      <SplitSection
        image={images.kaniQuoteWide[4]}
        imageAlt="A lilac shawl with charcoal flowers and leaves on an antique walnut table"
        eyebrow="About the House"
        title="A Kashmiri Pashmina Family in Srinagar."
        body={
          <>
            <p>
              House of Kani is a fourth-generation Kashmiri family selling 100% pure Pashmina —
              handwoven Kani, hand-embroidered Sozni and fine solids — woven on our own looms and
              chosen from artisans we trust.
            </p>
            <p>
              For interviews and information, please write to{" "}
              <a href={`mailto:${SITE.email}`} className="border-b border-gold/50">
                {SITE.email}
              </a>
              .
            </p>
          </>
        }
        imageRatio="landscape"
      />
    </>
  );
}
