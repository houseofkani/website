import type { Metadata } from "next";
import Link from "next/link";
import { draftMode } from "next/headers";
import { Suspense } from "react";

import { Eyebrow } from "@/components/Editorial";
import { JournalGrid } from "@/components/JournalGrid";
import { OptimizedImage } from "@/components/OptimizedImage";
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

async function JournalListing() {
  const { isEnabled: draft } = await draftMode();
  const articles = await getJournalPosts({ draft }).catch(() => []);
  const featured = articles[0];

  if (!featured) {
    return (
      <section className="bg-ivory px-5 py-24 text-center sm:px-8 sm:py-32">
        <Reveal className="mx-auto max-w-2xl">
          <OrnamentRule className="mx-auto" />
          <p className="body-editorial mt-8 text-charcoal/70">
            The Journal is being prepared. Stories from the loom, the archive and the valley will
            appear here soon.
          </p>
        </Reveal>
      </section>
    );
  }

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
      <section className="bg-forest text-ivory">
        <Link
          href={`/journal/${featured.slug}`}
          className="group mx-auto grid max-w-[1560px] lg:grid-cols-[1.35fr_0.65fr]"
        >
          <div className="relative min-h-[52svh] overflow-hidden">
            <OptimizedImage
              src={featured.image}
              alt={featured.imageAlt}
              fill
              priority
              quality={85}
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-cover transition-transform duration-[1600ms] group-hover:scale-[1.02]"
            />
          </div>
          <div className="flex flex-col justify-center px-7 py-14 sm:px-12 lg:px-16">
            <p className="eyebrow text-gold">Featured · {featured.category}</p>
            <h2 className="display-2 mt-4">{featured.title}</h2>
            <p className="mt-6 text-ivory/70">{featured.dek}</p>
            <span className="nav-label mt-8 text-gold">Read the Story →</span>
          </div>
        </Link>
      </section>
      <JournalGrid articles={articles} />
    </>
  );
}

export default function JournalPage() {
  return (
    <>
      <section className="bg-ivory px-5 pt-36 pb-16 text-center sm:px-8 sm:pt-44 sm:pb-24">
        <Eyebrow>House of Kani</Eyebrow>
        <h1 className="display-1 mt-4">The Journal</h1>
        <p className="body-editorial mx-auto mt-5 max-w-xl text-charcoal/70">
          Essays from the loom, the archive and the valley.
        </p>
        <OrnamentRule className="mt-8" />
      </section>
      <Suspense>
        <JournalListing />
      </Suspense>
    </>
  );
}
