import type { JournalArticle } from "@/lib/cms";
import { siteConfig } from "@/lib/site-config";

/**
 * Syndication output for the Journal.
 *
 * Pure functions only — no CMS access — so the feed renders from the same
 * published set the site shows, and can be unit-tested without a network.
 * Drafts never reach this module: `getJournalPosts()` filters `_status`.
 */

/** Newest N stories. Readers keep their own archive, so the feed stays small. */
export const FEED_ITEM_LIMIT = 20;

export const RSS_PATH = "/feed.xml";
export const JSON_FEED_PATH = "/feed.json";

/** `<link rel="alternate">` map for `metadata.alternates.types`. */
export const FEED_ALTERNATES = {
  "application/rss+xml": RSS_PATH,
  "application/feed+json": JSON_FEED_PATH,
} as const;

const CHANNEL_TITLE = `${siteConfig.name} — Journal`;
const CHANNEL_DESCRIPTION = "Notes from the valley: Pashmina, the loom, the needle and Kashmir.";
const LANGUAGE = "en-GB";

/** Characters XML 1.0 forbids outright; stray ones arrive with pasted copy. */
const INVALID_XML = /[^\u0009\u000A\u000D\u0020-\uD7FF\uE000-\uFFFD]/g;

function stripInvalid(value: string): string {
  return value.replace(INVALID_XML, "");
}

/** Text-node escaping. Titles contain `&` and quotes often enough to matter. */
export function escapeXml(value: string): string {
  return stripInvalid(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** A CDATA section cannot contain `]]>`, so split it into two sections. */
export function cdata(value: string): string {
  return `<![CDATA[${stripInvalid(value).replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
}

/** RFC 822 timestamp for `<pubDate>`, or null when the date cannot be trusted. */
export function rssDate(value: string | undefined): string | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toUTCString();
}

function absoluteUrl(pathname: string, base: string = siteConfig.url): string {
  if (/^https?:\/\//i.test(pathname)) return pathname;
  const baseUrl = base.replace(/\/$/, "");
  return `${baseUrl}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

/**
 * Enclosure MIME type from the file extension. The CMS reports `image/png`
 * for files served as `.jpg`, and readers drop enclosures with a type that
 * disagrees with the URL.
 */
export function imageMimeType(url: string): string {
  const extension = url.split("?")[0]?.split(".").pop()?.toLowerCase() ?? "";
  switch (extension) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    case "avif":
      return "image/avif";
    case "gif":
      return "image/gif";
    default:
      return "image/jpeg";
  }
}

/** Article body → HTML for `content:encoded` / `content_html`. */
export function bodyToHtml(article: JournalArticle): string {
  const blocks: string[] = [];

  for (const section of article.body) {
    if (section.heading) blocks.push(`<h2>${escapeXml(section.heading)}</h2>`);
    for (const paragraph of section.paragraphs) {
      // Paragraphs are already sanitized inline HTML from `cms.ts` (links,
      // bold/italic, escaped text). Do not escape them a second time.
      if (paragraph.trim()) blocks.push(`<p>${paragraph}</p>`);
    }
    for (const list of section.lists ?? []) {
      const tag = list.ordered ? "ol" : "ul";
      const items = list.items.map((item) => `<li>${item}</li>`).join("");
      if (items) blocks.push(`<${tag}>${items}</${tag}>`);
    }
    // Quotes are sanitized inline HTML too.
    if (section.quote) blocks.push(`<blockquote>${section.quote}</blockquote>`);
  }

  return blocks.join("\n");
}

type FeedItem = { article: JournalArticle; date: Date; path: string };

function selectItems(articles: JournalArticle[], limit: number): FeedItem[] {
  return articles
    .map((article) => {
      const date = new Date(article.publishedAt || "");
      if (Number.isNaN(date.getTime())) return null;
      return { article, date, path: `/journal/${article.slug}` };
    })
    .filter((item): item is FeedItem => item !== null)
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, limit);
}

type RenderOptions = {
  /** Override for tests and previews; defaults to the canonical site origin. */
  siteUrl?: string;
  limit?: number;
};

/** RSS 2.0 with the Dublin Core and content modules readers expect. */
export function renderRss(articles: JournalArticle[], options: RenderOptions = {}): string {
  const siteUrl = (options.siteUrl ?? siteConfig.url).replace(/\/$/, "");
  const items = selectItems(articles, options.limit ?? FEED_ITEM_LIMIT);
  const lastBuild = items[0]?.date ?? new Date();

  const itemXml = items.map(({ article, date, path }) => {
    const link = absoluteUrl(path, siteUrl);
    const enclosure = article.image
      ? `\n      <enclosure url="${escapeXml(absoluteUrl(article.image, siteUrl))}" type="${imageMimeType(article.image)}" length="0"/>`
      : "";
    const category = article.category
      ? `\n      <category>${escapeXml(article.category)}</category>`
      : "";

    return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${date.toUTCString()}</pubDate>${category}
      <dc:creator>${escapeXml(siteConfig.name)}</dc:creator>
      <description>${escapeXml(article.dek)}</description>${enclosure}
      <content:encoded>${cdata(bodyToHtml(article))}</content:encoded>
    </item>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(CHANNEL_TITLE)}</title>
    <link>${escapeXml(absoluteUrl("/journal", siteUrl))}</link>
    <atom:link href="${escapeXml(absoluteUrl(RSS_PATH, siteUrl))}" rel="self" type="application/rss+xml"/>
    <description>${escapeXml(CHANNEL_DESCRIPTION)}</description>
    <language>${LANGUAGE}</language>
    <copyright>© ${lastBuild.getUTCFullYear()} ${escapeXml(siteConfig.name)}</copyright>
    <lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>
    <generator>${escapeXml(siteConfig.name)}</generator>
${itemXml.join("\n")}
  </channel>
</rss>
`;
}

/** JSON Feed 1.1 — the same stories for clients that prefer JSON. */
export function renderJsonFeed(articles: JournalArticle[], options: RenderOptions = {}) {
  const siteUrl = (options.siteUrl ?? siteConfig.url).replace(/\/$/, "");
  const items = selectItems(articles, options.limit ?? FEED_ITEM_LIMIT);

  return {
    version: "https://jsonfeed.org/version/1.1",
    title: CHANNEL_TITLE,
    home_page_url: absoluteUrl("/journal", siteUrl),
    feed_url: absoluteUrl(JSON_FEED_PATH, siteUrl),
    description: CHANNEL_DESCRIPTION,
    language: LANGUAGE,
    authors: [{ name: siteConfig.name }],
    items: items.map(({ article, date, path }) => ({
      id: absoluteUrl(path, siteUrl),
      url: absoluteUrl(path, siteUrl),
      title: article.title,
      summary: article.dek,
      content_html: bodyToHtml(article),
      image: article.image ? absoluteUrl(article.image, siteUrl) : undefined,
      date_published: date.toISOString(),
      tags: article.category ? [article.category] : undefined,
    })),
  };
}
