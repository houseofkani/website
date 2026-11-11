import Link from "next/link";

import { MediaSkeleton } from "@/components/MediaSkeleton";
import { getJournalPage } from "@/lib/cms";

export async function JournalRail({
  category,
  categorySlug,
  heading = "From the Journal",
}: {
  category: string;
  categorySlug: string;
  heading?: string;
}) {
  const result = await getJournalPage({ limit: 3, category: categorySlug }).catch(() => null);
  if (!result || result.articles.length === 0) return null;

  return (
    <section className="bg-cream px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="eyebrow text-gold-ink">{category}</p>
            <h2 className="display-2 mt-2">{heading}</h2>
          </div>
          <Link
            href={`/journal/category/${categorySlug}`}
            className="nav-label border-b border-gold pb-1 text-charcoal"
          >
            All {category} stories
          </Link>
        </div>
        <div className="mt-10 grid gap-x-7 gap-y-12 sm:grid-cols-3">
          {result.articles.map((article) => (
            <Link key={article.slug} href={`/journal/${article.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden">
                <MediaSkeleton
                  src={article.image}
                  alt={article.imageAlt}
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="duration-[1400ms] group-hover:scale-[1.03]"
                />
              </div>
              <p className="eyebrow mt-4 text-gold-ink">{article.readTime}</p>
              <h3 className="display-3 mt-2 group-hover:text-burgundy">{article.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-charcoal/65">{article.dek}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
