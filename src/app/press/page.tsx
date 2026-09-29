import type { Metadata } from "next";

import { SplitSection } from "@/components/Editorial";
import { PageHero } from "@/components/PageHero";
import { images } from "@/lib/images";
import { seoBundle } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = seoBundle({
  title: "Press",
  description: "Press information and media enquiries for House of Kani.",
  pathname: "/press",
  image: images.heritageArchive,
});

export default function PressPage() {
  return (
    <>
      <PageHero
        image={images.heritageArchive}
        imageAlt="House of Kani archival materials"
        eyebrow="Press"
        title="The House in Print."
        subtitle="Background, imagery and conversations for editors, writers and cultural institutions."
        height="medium"
      />
      <SplitSection
        image={images.heroHome}
        imageAlt="House of Kani campaign portrait"
        eyebrow="About the House"
        title="A Digital Maison Rooted in Kashmir."
        body={
          <>
            <p>
              House of Kani presents Pashmina as an art form: inseparable from Kashmir, the hand of
              the artisan and the cultural memory of Kani weaving.
            </p>
            <p>
              For interviews, image requests and editorial information, please write to{" "}
              {SITE.pressEmail}.
            </p>
          </>
        }
        imageRatio="landscape"
      />
      <section className="bg-cream px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-5xl gap-12 sm:grid-cols-3">
          <PressNote title="Brand Notes" body="The House, its philosophy and the language of Kani." />
          <PressNote
            title="Image Library"
            body="Campaign, craft and landscape imagery for approved editorial use."
          />
          <PressNote title="Press Enquiries" body={SITE.pressEmail} />
        </div>
      </section>
    </>
  );
}

function PressNote({ title, body }: { title: string; body: string }) {
  return (
    <div className="border-t border-gold/45 pt-6">
      <p className="eyebrow text-gold">Press Material</p>
      <h2 className="display-3 mt-3">{title}</h2>
      <p className="mt-4 text-charcoal/70">{body}</p>
    </div>
  );
}
