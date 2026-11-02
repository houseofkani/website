import { SITE } from "@/lib/site";

const FALLBACK_SITE_URL = "https://houseofkani.com";

/**
 * Canonical origin used by metadata, canonicals, sitemap, robots and JSON-LD.
 *
 * On Vercel, `VERCEL_PROJECT_PRODUCTION_URL` is the authoritative production
 * domain — the built-in `*.vercel.app` domain, or the shortest custom domain
 * once one is attached — so deployments need no hand-maintained URL. Elsewhere
 * `NEXT_PUBLIC_SITE_URL` is the explicit override, and `VERCEL_URL` covers
 * preview deployments.
 */
export function resolveSiteUrl(
  env: Record<string, string | undefined> = process.env,
): string {
  const explicit = env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercelProduction = env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const vercelDeployment = env.VERCEL_URL?.trim();

  const candidate =
    (env.VERCEL && (vercelProduction || vercelDeployment)) ||
    explicit ||
    vercelProduction ||
    vercelDeployment ||
    FALLBACK_SITE_URL;

  const withProtocol = /^https?:\/\//i.test(candidate)
    ? candidate
    : `https://${candidate}`;

  return withProtocol.replace(/\/+$/, "");
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
