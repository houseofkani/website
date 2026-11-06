import type { MetadataRoute } from "next";

import { getJournalArchive } from "@/lib/cms";
import { siteConfig } from "@/lib/site-config";

const staticRoutes = [
  "",
  "/the-house",
  "/pashmina",
  "/shade-card",
  "/kani",
  "/craftsmanship",
  "/heritage",
  "/kashmir",
  "/journal",
  "/where-to-buy",
  "/contact",
  "/private-client",
  "/privacy",
  "/terms",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");

  const pages: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: path ? `${base}${path}` : base,
  }));

  let articles: Awaited<ReturnType<typeof getJournalArchive>> = [];
  try {
    // Every published story, not just the first page of them.
    articles = await getJournalArchive();
  } catch {
    // CMS unreachable — serve the static routes rather than failing the sitemap.
  }

  const journal: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${base}/journal/${article.slug}`,
    lastModified: article.updatedAt ? new Date(article.updatedAt) : undefined,
  }));

  return [...pages, ...journal];
}
