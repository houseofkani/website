import type { Metadata } from "next";
import Link from "next/link";
import { draftMode } from "next/headers";
import { Suspense } from "react";

import { Eyebrow } from "@/components/Editorial";
import { JournalGrid } from "@/components/JournalGrid";
import { JournalPagination, journalPageHref } from "@/components/JournalPagination";
import { MediaSkeleton } from "@/components/MediaSkeleton";
import { OrnamentRule } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";
import { JournalListingSkeleton } from "@/components/Skeleton";
import { getJournalPage } from "@/lib/cms";
import { images } from "@/lib/images";
import { itemListLd, jsonLdScript, seoBundle } from "@/lib/seo";

/** Stories per page — three rows of the three-column grid. */
const PAGE_SIZE = 9;

type PageProps = {
  searchParams: Promise<{ page?: string | string[] }>;
};

function parsePage(raw: string | string[] | undefined): number {
  const value = Array.isArray(raw) ? raw[0] : raw;
  const page = Number.parseInt(value ?? "1", 10);
  return Number.isFinite(page) && page > 0 ? page : 1;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const page = parsePage((await searchParams).page);
  const totalPages = await getJournalPage({ page, limit: PAGE_SIZE })
    .then((result) => result.totalPages)
    .catch(() => 1);
  const outOfRange = page > totalPages;

  return seoBundle({
    title: page > 1 && !outOfRange ? `Journal — Page ${page}` : "Journal",
    description: "Stories of Kani, Pashmina, craftsmanship, heritage, Kashmir and its people.",
    canonical: outOfRange ? "/journal" : journalPageHref(page),
    robots: outOfRange ? "noindex" : undefined,
    image: images.heritageArchive,
  });
}

async function JournalListing({ page }: { page: number }) {
  const { isEnabled: draft } = await draftMode();
  const result = await getJournalPage({ page, limit: PAGE_SIZE, draft }).catch((error) => {
    // Keep the page usable, but make CMS outages visible in the deployment logs.
    console.error("[journal] Failed to load posts from the CMS:", error);
    return null;
  });

  if (!result) {
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

  const { articles, totalPages } = result;

  // A hand-typed page past the end renders a quiet way back instead of a 404
  // (the route is streamed, so a redirect would only fire after paint).
  if (articles.length === 0 && page > 1) {
    return (
      <section className="bg-ivory px-5 py-24 text-center sm:px-8 sm:py-32">
        <Reveal className="mx-auto max-w-2xl">
          <OrnamentRule className="mx-auto" />
          <p className="body-editorial mt-8 text-charcoal/70">There are no stories on this page.</p>
          <Link
            href="/journal"
            className="nav-label mt-8 inline-block py-2 text-charcoal transition-colors duration-500 hover:text-gold-ink"
          >
            ← Back to the Journal
          </Link>
        </Reveal>
      </section>
    );
  }

  const featured = page === 1 ? articles[0] : undefined;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            itemListLd({
              name: page > 1 ? `House of Kani Journal — Page ${page}` : "House of Kani Journal",
              path: journalPageHref(page),
              items: articles.map((a) => ({
                name: a.title,
                path: `/journal/${a.slug}`,
              })),
            }),
          ),
        }}
      />
      {featured ? (
        <section className="bg-forest text-ivory">
          <Link
            href={`/journal/${featured.slug}`}
            className="group mx-auto grid max-w-[1560px] lg:grid-cols-[1.35fr_0.65fr]"
          >
            <div className="relative min-h-[52svh] overflow-hidden">
              <MediaSkeleton
                src={featured.image}
                alt={featured.imageAlt}
                priority
                quality={85}
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="duration-[1600ms] group-hover:scale-[1.02]"
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
      ) : null}
      <JournalGrid articles={articles} />
      <JournalPagination page={page} totalPages={totalPages} />
    </>
  );
}

export default async function JournalPage({ searchParams }: PageProps) {
  const page = parsePage((await searchParams).page);

  return (
    <>
      <section className="bg-ivory px-5 pt-36 pb-16 text-center sm:px-8 sm:pt-44 sm:pb-24">
        <Eyebrow tone="ink">House of Kani</Eyebrow>
        <h1 className="display-1 mt-4">The Journal</h1>
        <p className="body-editorial mx-auto mt-5 max-w-xl text-charcoal/70">
          Essays from the loom, the archive and the valley.
        </p>
        <OrnamentRule className="mt-8" />
      </section>
      <Suspense key={page} fallback={<JournalListingSkeleton />}>
        <JournalListing page={page} />
      </Suspense>
    </>
  );
}
