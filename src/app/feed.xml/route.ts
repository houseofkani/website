import { getJournalPosts } from "@/lib/cms";
import { FEED_ITEM_LIMIT, renderRss } from "@/lib/feed";

/**
 * RSS 2.0 for the Journal — the canonical feed.
 *
 * Prerendered and tagged `journal` through `getJournalPosts`, so the CMS
 * publish webhook (`POST /api/revalidate`) refreshes it on the next edit;
 * `revalidate` is only a backstop if that webhook is ever missed.
 */
export const dynamic = "force-static";
export const revalidate = 300;

export async function GET() {
  const articles = await getJournalPosts({ limit: FEED_ITEM_LIMIT }).catch((error) => {
    // An empty feed beats a 500: subscribers and pollers retry on schedule.
    console.error("[feed] Failed to load posts from the CMS:", error);
    return [];
  });

  return new Response(renderRss(articles), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
