import type { Metadata } from "next";
import { draftMode } from "next/headers";

import { Eyebrow } from "@/components/Editorial";
import { JournalGrid } from "@/components/JournalGrid";
import { OrnamentRule } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";
import { getJournalPosts } from "@/lib/cms";
import { images } from "@/lib/images";
import { itemListLd, jsonLdScript, seoBundle } from "@/lib/seo";

export const metadata: Metadata = seoBundle({
  title: "Journal",
  description:
    "Stories of Kani, Pashmina, craftsmanship, heritage, Kashmir and its people.",
  pathname: "/journal",
  image: images.heritageArchive,
});

export default async function JournalPage() {
  const { isEnabled: draft } = await draftMode();
  // If the CMS is unreachable, the journal still opens with an empty state.
  const articles = await getJournalPosts({ draft }).catch(() => []);
  const featured = articles[0];

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
      {featured ? (
        <JournalGrid featured={featured} articles={articles} />
      ) : (
        <section className="bg-ivory px-5 py-24 text-center sm:px-8 sm:py-32">
          <Reveal className="mx-auto max-w-2xl">
            <OrnamentRule className="mx-auto" />
            <p className="body-editorial mt-8 text-charcoal/70">
              The Journal is being prepared. Stories from the loom, the archive
              and the valley will appear here soon.
            </p>
          </Reveal>
        </section>
      )}
    </>
  );
}
