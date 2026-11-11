import { getJournalPosts } from "@/lib/cms";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 3600;

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const absolute = (value: string) =>
  /^https?:\/\//i.test(value)
    ? value
    : `${siteConfig.url.replace(/\/$/, "")}${value.startsWith("/") ? value : `/${value}`}`;

export async function GET() {
  const articles = await getJournalPosts({ limit: 100 }).catch(() => []);
  const entries = articles
    .filter((article) => article.image)
    .map((article) => {
      const url = `${siteConfig.url.replace(/\/$/, "")}/journal/${article.slug}`;
      return `<url><loc>${escapeXml(url)}</loc><image:image><image:loc>${escapeXml(absolute(article.image))}</image:loc><image:title>${escapeXml(article.title)}</image:title><image:caption>${escapeXml(article.dek)}</image:caption></image:image></url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${entries}</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
