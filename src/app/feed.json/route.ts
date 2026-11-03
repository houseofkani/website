import { getJournalPosts } from "@/lib/cms";
import { FEED_ITEM_LIMIT, renderJsonFeed } from "@/lib/feed";

/** JSON Feed 1.1 mirror of /feed.xml, for clients that prefer JSON. */
export const dynamic = "force-static";
export const revalidate = 300;

export async function GET() {
  const articles = await getJournalPosts({ limit: FEED_ITEM_LIMIT }).catch((error) => {
    console.error("[feed] Failed to load posts from the CMS:", error);
    return [];
  });

  return new Response(JSON.stringify(renderJsonFeed(articles), null, 2), {
    headers: {
      "Content-Type": "application/feed+json; charset=utf-8",
    },
  });
}
