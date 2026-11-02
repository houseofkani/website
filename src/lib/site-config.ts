import { SITE } from "@/lib/site";

/**
 * Canonicals, sitemap and JSON-LD must never point at localhost in production.
 * Prefer Vercel's own production hostname when the configured site URL is local.
 */
function resolveSiteUrl(): string {
  const configured = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
  const isLocal =
    !configured || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(configured);
  if (!isLocal) return configured;

  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (process.env.NODE_ENV === "production" && vercelHost) {
    return `https://${vercelHost}`;
  }
  return configured || "https://houseofkani.com";
}

export const siteConfig = {
  name: SITE.name,
  tagline: SITE.tagline,
  description: SITE.descriptor,
  url: resolveSiteUrl(),
  email: SITE.email,
  contactConfirmed: SITE.contactConfirmed,
  ogImage: "/images/og-share-v1.webp",
} as const;
