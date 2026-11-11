import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JournalGrid } from "@/components/JournalGrid";
import { JournalPagination } from "@/components/JournalPagination";
import { OrnamentRule } from "@/components/Ornament";
import { Eyebrow } from "@/components/Editorial";
import { getJournalPage } from "@/lib/cms";
import { breadcrumbLd, itemListLd, jsonLdScript, seoBundle } from "@/lib/seo";

const PAGE_SIZE = 9;

const CATEGORIES = [
  {
    slug: "pashmina",
    name: "Pashmina",
    description:
      "Essays on Pashmina fibre, weaving, authenticity, care and buying, from a fourth-generation Srinagar house.",
  },
  {
    slug: "kani",
    name: "Kani",
    description:
      "Kani shawl essays: talim, bobbins, jamawar, provenance and the Kashmir GI.",
  },
  {
    slug: "craft",
    name: "Craft",
    description:
      "Craft essays on Sozni, Kani and the hands behind a Pashmina shawl.",
  },
  {
    slug: "kashmir",
    name: "Kashmir",
    description:
      "Kashmir notes: Srinagar, the valley, the gardens and the shawl trade.",
  },
  {
    slug: "care",
    name: "Care",
    description:
      "How to wash, store, repair and protect a Pashmina shawl so it lasts for decades.",
  },
  {
    slug: "style",
    name: "Style",
    description:
      "Ways to wear a Pashmina: colour, size, drape and occasion.",
  },
  {
    slug: "people",
    name: "People",
    description:
      "The people behind the cloth: weavers, embroiderers and family stories.",
  },
] as const;

type Category = (typeof CATEGORIES)[number];

function resolveCategory(slug: string): Category | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export const revalidate = 300;

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = Number.parseInt(pageParam ?? "1", 10);
  const category = resolveCategory(slug);
  if (!category) {
    return seoBundle({ title: "Journal Category Not Found", pathname: "/journal", robots: "noindex" });
  }
  const path = `/journal/category/${category.slug}`;
  return seoBundle({
    title: `${category.name} Journal`,
    description: category.description,
    canonical: Number.isFinite(page) && page > 1 ? `${path}?page=${page}` : path,
  });
}

export default async function JournalCategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const category = resolveCategory(slug);
  if (!category) notFound();

  const { page: pageParam } = await searchParams;
  const parsed = Number.parseInt(pageParam ?? "1", 10);
  const page = Number.isFinite(parsed) && parsed > 0 ? parsed : 1;

  const result = await getJournalPage({
    page,
    limit: PAGE_SIZE,
    category: category.slug,
  }).catch(() => null);

  if (!result || (result.articles.length === 0 && page === 1)) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Journal", path: "/journal" },
              { name: category.name, path: `/journal/category/${category.slug}` },
            ]),
            itemListLd({
              name: `${category.name} Journal`,
              path: `/journal/category/${category.slug}`,
              items: result.articles.map((article) => ({
                name: article.title,
                path: `/journal/${article.slug}`,
              })),
            }),
          ]),
        }}
      />
      <section className="bg-ivory px-5 pt-36 pb-14 text-center sm:px-8 sm:pt-44 sm:pb-20">
        <Eyebrow tone="ink">House of Kani</Eyebrow>
        <h1 className="display-1 mt-4">{category.name}</h1>
        <p className="body-editorial mx-auto mt-5 max-w-xl text-charcoal/70">
          {category.description}
        </p>
        <OrnamentRule className="mt-8" />
        <nav aria-label="Journal categories" className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3">
          {CATEGORIES.map((item) => (
            <Link
              key={item.slug}
              href={`/journal/category/${item.slug}`}
              className={`nav-label border-b pb-1 transition-colors ${
                item.slug === category.slug
                  ? "border-gold text-charcoal"
                  : "border-transparent text-stone-ink hover:text-charcoal"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </section>
      <JournalGrid articles={result.articles} />
      <JournalPagination
        page={page}
        totalPages={result.totalPages}
        basePath={`/journal/category/${category.slug}`}
      />
    </>
  );
}
