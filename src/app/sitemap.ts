import type { MetadataRoute } from "next";

import { articles } from "@/lib/journal";
import { siteConfig } from "@/lib/site-config";

const staticRoutes = [
  "",
  "/the-house",
  "/pashmina",
  "/kani",
  "/craftsmanship",
  "/heritage",
  "/kashmir",
  "/journal",
  "/contact",
  "/private-client",
  "/press",
  "/stockists",
  "/privacy",
  "/terms",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const pages: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/journal" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/journal" ? 0.9 : 0.7,
  }));

  const journal: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${base}/journal/${article.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...pages, ...journal];
}
