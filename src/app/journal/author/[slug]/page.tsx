import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Eyebrow } from "@/components/Editorial";
import { JournalGrid } from "@/components/JournalGrid";
import { JournalPagination } from "@/components/JournalPagination";
import { OrnamentRule } from "@/components/Ornament";
import { getJournalPosts } from "@/lib/cms";
import { breadcrumbLd, itemListLd, jsonLdScript, seoBundle } from "@/lib/seo";
import { SITE } from "@/lib/site";

const PAGE_SIZE = 9;
const AUTHOR_SLUG = "timothy-v-manley";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export const revalidate = 300;

export function generateStaticParams() {
  return [{ slug: AUTHOR_SLUG }];
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = Number.parseInt(pageParam ?? "1", 10);
  if (slug !== AUTHOR_SLUG) {
    return seoBundle({ title: "Author Not Found", pathname: "/journal", robots: "noindex" });
  }
  const posts = await getJournalPosts({ limit: 100 }).catch(() => []);
  const author = posts.find((post) => post.author.slug === slug)?.author;
  const path = `/journal/author/${slug}`;
  return seoBundle({
    title: "Timothy V. Manley",
    description:
      author?.bio ||
      "Timothy V. Manley writes the House of Kani Journal on Pashmina, Kani, Sozni and Kashmir.",
    canonical: Number.isFinite(page) && page > 1 ? `${path}?page=${page}` : path,
  });
}

export default async function JournalAuthorPage({ params, searchParams }: Props) {
  const { slug } = await params;
  if (slug !== AUTHOR_SLUG) notFound();

  const { page: pageParam } = await searchParams;
  const parsed = Number.parseInt(pageParam ?? "1", 10);
  const page = Number.isFinite(parsed) && parsed > 0 ? parsed : 1;

  const all = await getJournalPosts({ limit: 100 }).catch(() => []);
  const articles = all.filter((article) => article.author.slug === slug);
  if (articles.length === 0) notFound();

  const author = articles[0]!.author;
  const totalPages = Math.max(1, Math.ceil(articles.length / PAGE_SIZE));
  const visible = articles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            {
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              mainEntity: {
                "@type": "Person",
                name: author.name,
                jobTitle: author.designation || "Writer",
                description: author.bio || undefined,
                worksFor: { "@type": "Organization", name: SITE.name },
              },
            },
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Journal", path: "/journal" },
              { name: author.name, path: `/journal/author/${slug}` },
            ]),
            itemListLd({
              name: `${author.name} — Journal`,
              path: `/journal/author/${slug}`,
              items: articles.map((article) => ({
                name: article.title,
                path: `/journal/${article.slug}`,
              })),
            }),
          ]),
        }}
      />
      <section className="bg-ivory px-5 pt-36 pb-14 text-center sm:px-8 sm:pt-44 sm:pb-20">
        <Eyebrow tone="ink">Journal</Eyebrow>
        <h1 className="display-1 mt-4">{author.name}</h1>
        <p className="body-editorial mx-auto mt-5 max-w-xl text-charcoal/70">
          {author.bio ||
            "Writing on Pashmina, Kani, Sozni and the Kashmir shawl trade for House of Kani."}
        </p>
        <OrnamentRule className="mt-8" />
        <p className="eyebrow mt-8 text-charcoal/60">
          {articles.length} {articles.length === 1 ? "story" : "stories"} ·{" "}
          <Link href="/journal" className="border-b border-gold/50 hover:text-gold-ink">
            All journal stories
          </Link>
        </p>
      </section>
      <JournalGrid articles={visible} />
      <JournalPagination
        page={page}
        totalPages={totalPages}
        basePath={`/journal/author/${slug}`}
      />
    </>
  );
}
