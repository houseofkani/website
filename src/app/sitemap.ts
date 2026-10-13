import type { MetadataRoute } from "next";

import { getJournalPosts } from "@/lib/cms";
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
  const now = new Date();

  const pages: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/journal" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/journal" ? 0.9 : 0.7,
  }));

  let articles: Awaited<ReturnType<typeof getJournalPosts>> = [];
  try {
    articles = await getJournalPosts({ limit: 100 });
  } catch {
    // CMS unreachable — serve the static routes rather than failing the sitemap.
  }

  const journal: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${base}/journal/${article.slug}`,
    lastModified: article.publishedAt ? new Date(article.publishedAt) : now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...pages, ...journal];
}
