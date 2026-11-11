import Link from "next/link";

/** `/journal` for the first page, `?page=N` after that. */
export function journalPageHref(page: number, basePath = "/journal"): string {
  return page <= 1 ? basePath : `${basePath}?page=${page}`;
}

/**
 * Prev/next pager for the journal index. Kept deliberately plain: the feed and
 * sitemap cover the archive, so this only has to move between recent pages.
 */
export function JournalPagination({
  page,
  totalPages,
  basePath = "/journal",
}: {
  page: number;
  totalPages: number;
  basePath?: string;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Journal pagination" className="bg-ivory px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12">
      <div className="mx-auto flex max-w-[1560px] items-center justify-between border-t border-border pt-8">
        {page > 1 ? (
          <Link
            href={journalPageHref(page - 1, basePath)}
            rel="prev"
            className="nav-label inline-block py-2 text-charcoal transition-colors duration-500 hover:text-gold-ink"
          >
            ← Newer
          </Link>
        ) : (
          <span aria-hidden="true" />
        )}

        <p className="eyebrow text-stone-ink">
          Page {page} of {totalPages}
        </p>

        {page < totalPages ? (
          <Link
            href={journalPageHref(page + 1, basePath)}
            rel="next"
            className="nav-label inline-block py-2 text-charcoal transition-colors duration-500 hover:text-gold-ink"
          >
            Older →
          </Link>
        ) : (
          <span aria-hidden="true" />
        )}
      </div>
    </nav>
  );
}
