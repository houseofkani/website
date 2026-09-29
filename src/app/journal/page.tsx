import type { Metadata } from "next";

import { Eyebrow } from "@/components/Editorial";
import { JournalGrid } from "@/components/JournalGrid";
import { OrnamentRule } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";
import { articles } from "@/lib/journal";
import { images } from "@/lib/images";
import { itemListLd, jsonLdScript, seoBundle } from "@/lib/seo";

export const metadata: Metadata = seoBundle({
  title: "Journal",
  description:
    "Stories of Kani, Pashmina, craftsmanship, heritage, Kashmir and its people.",
  pathname: "/journal",
  image: images.heritageArchive,
});

export default function JournalPage() {
  const featured = articles[0];
  if (!featured) return null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            itemListLd({
              name: "House of Kani Journal",
              path: "/journal",
              items: articles.map((a) => ({
                name: a.title,
                path: `/journal/${a.slug}`,
              })),
            }),
          ),
        }}
      />
      <section className="bg-ivory px-5 pt-36 pb-16 text-center sm:px-8 sm:pt-44 sm:pb-24">
        <Reveal>
          <Eyebrow>House of Kani</Eyebrow>
          <h1 className="display-1 mt-4">The Journal</h1>
          <p className="body-editorial mx-auto mt-5 max-w-xl text-charcoal/70">
            Essays from the loom, the archive and the valley.
          </p>
          <OrnamentRule className="mt-8" />
        </Reveal>
      </section>
      <JournalGrid featured={featured} />
    </>
  );
}
