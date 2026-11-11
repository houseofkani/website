import { describe, expect, it } from "vitest";

import type { JournalArticle } from "@/lib/cms";
import {
  bodyToHtml,
  cdata,
  escapeXml,
  imageMimeType,
  renderJsonFeed,
  renderRss,
  rssDate,
} from "@/lib/feed";

function article(overrides: Partial<JournalArticle> = {}): JournalArticle {
  return {
    slug: "the-art-of-kani-weaving",
    category: "Kani",
    title: "The Art of Kani Weaving",
    dek: "A language of colour, memory and patience.",
    image: "https://cms.test/api/media/file/kani-loom.jpg",
    imageAlt: "Artisan hands weaving",
    readTime: "4 min read",
    date: "20 September 2026",
    publishedAt: "2026-09-20T09:00:00.000Z",
    updatedAt: "2026-09-20T09:00:00.000Z",
    author: { name: "House of Kani" },
    seo: {},
    tags: [],
    body: [
      { paragraphs: ["There is no haste at a Kani loom."] },
      {
        heading: "The talim",
        paragraphs: ["The pattern is written, not drawn."],
        quote: "Patience is the weave.",
      },
    ],
    ...overrides,
  };
}

const SITE = "https://houseofkani.com";

describe("feed escaping", () => {
  it("escapes the five XML entities in text nodes", () => {
    expect(escapeXml(`A & B <c> "d" 'e'`)).toBe("A &amp; B &lt;c&gt; &quot;d&quot; &apos;e&apos;");
  });

  it("strips control characters XML 1.0 forbids", () => {
    expect(escapeXml("loom\u0000\u0007 weave")).toBe("loom weave");
  });

  it("splits ]]> so a CDATA section cannot close early", () => {
    expect(cdata("a ]]> b")).toBe("<![CDATA[a ]]]]><![CDATA[> b]]>");
  });
});

describe("feed dates", () => {
  it("formats as RFC 822", () => {
    expect(rssDate("2026-09-20T09:00:00.000Z")).toBe("Sun, 20 Sep 2026 09:00:00 GMT");
  });

  it("rejects missing and unparseable dates", () => {
    expect(rssDate(undefined)).toBeNull();
    expect(rssDate("")).toBeNull();
    expect(rssDate("not a date")).toBeNull();
  });
});

describe("image enclosure type", () => {
  it("follows the file extension, not the CMS mimeType", () => {
    expect(imageMimeType("https://cms.test/api/media/file/kani-loom.jpg")).toBe("image/jpeg");
    expect(imageMimeType("https://cms.test/api/media/file/hero.webp?w=1")).toBe("image/webp");
    expect(imageMimeType("https://cms.test/api/media/file/hero.png")).toBe("image/png");
    expect(imageMimeType("https://cms.test/api/media/file/hero.avif")).toBe("image/avif");
    expect(imageMimeType("https://cms.test/api/media/file/hero")).toBe("image/jpeg");
  });
});

describe("bodyToHtml", () => {
  it("renders headings, paragraphs and quotes in order", () => {
    expect(bodyToHtml(article())).toBe(
      [
        "<p>There is no haste at a Kani loom.</p>",
        "<h2>The talim</h2>",
        "<p>The pattern is written, not drawn.</p>",
        "<blockquote>Patience is the weave.</blockquote>",
      ].join("\n"),
    );
  });

  it("escapes markup inside the prose", () => {
    expect(bodyToHtml(article({ body: [{ paragraphs: ["Warp & weft <not a tag>"] }] }))).toBe(
      "<p>Warp &amp; weft &lt;not a tag&gt;</p>",
    );
  });

  it("ignores empty paragraphs", () => {
    expect(bodyToHtml(article({ body: [{ paragraphs: ["  ", ""] }] }))).toBe("");
  });
});

describe("renderRss", () => {
  it("emits a channel with the self link and one item per article", () => {
    const xml = renderRss([article()], { siteUrl: SITE });

    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain('<rss version="2.0"');
    expect(xml).toContain(`<atom:link href="${SITE}/feed.xml" rel="self"`);
    expect(xml).toContain(`<link>${SITE}/journal</link>`);
    expect(xml.match(/<item>/g)).toHaveLength(1);
    expect(xml).toContain(`<link>${SITE}/journal/the-art-of-kani-weaving</link>`);
    expect(xml).toContain(
      '<guid isPermaLink="true">https://houseofkani.com/journal/the-art-of-kani-weaving</guid>',
    );
    expect(xml).toContain("<pubDate>Sun, 20 Sep 2026 09:00:00 GMT</pubDate>");
    expect(xml).toContain("<category>Kani</category>");
    expect(xml).toContain(
      '<enclosure url="https://cms.test/api/media/file/kani-loom.jpg" type="image/jpeg" length="0"/>',
    );
  });

  it("escapes titles and descriptions instead of breaking the document", () => {
    const xml = renderRss([article({ title: "Kani & Sozni <avoid>", dek: `"Fine" needlework` })], {
      siteUrl: SITE,
    });

    expect(xml).toContain("<title>Kani &amp; Sozni &lt;avoid&gt;</title>");
    expect(xml).toContain("<description>&quot;Fine&quot; needlework</description>");
  });

  it("keeps the article body inside CDATA", () => {
    const xml = renderRss([article()], { siteUrl: SITE });
    expect(xml).toContain("<content:encoded><![CDATA[<p>There is no haste at a Kani loom.</p>");
  });

  it("skips articles without a usable publication date", () => {
    const xml = renderRss(
      [article(), article({ slug: "undated", publishedAt: "", title: "Undated" })],
      { siteUrl: SITE },
    );

    expect(xml.match(/<item>/g)).toHaveLength(1);
    expect(xml).not.toContain("Undated");
  });

  it("orders newest first and honours the limit", () => {
    const older = article({ slug: "older", publishedAt: "2026-01-02T09:00:00.000Z" });
    const newest = article({ slug: "newest", publishedAt: "2026-10-02T09:00:00.000Z" });

    const xml = renderRss([older, newest], { siteUrl: SITE, limit: 1 });
    const items = xml.match(/<item>/g) ?? [];

    expect(items).toHaveLength(1);
    expect(xml).toContain("/journal/newest");
    expect(xml).not.toContain("/journal/older");
  });

  it("omits the enclosure when an article has no image", () => {
    const xml = renderRss([article({ image: "" })], { siteUrl: SITE });
    expect(xml).not.toContain("<enclosure");
  });

  it("renders an empty channel rather than failing", () => {
    const xml = renderRss([], { siteUrl: SITE });
    expect(xml).toContain("<channel>");
    expect(xml).not.toContain("<item>");
  });
});

describe("renderJsonFeed", () => {
  it("matches the JSON Feed 1.1 shape", () => {
    const feed = renderJsonFeed([article()], { siteUrl: SITE });

    expect(feed.version).toBe("https://jsonfeed.org/version/1.1");
    expect(feed.feed_url).toBe(`${SITE}/feed.json`);
    expect(feed.home_page_url).toBe(`${SITE}/journal`);
    expect(feed.items).toHaveLength(1);
    expect(feed.items[0]).toMatchObject({
      id: `${SITE}/journal/the-art-of-kani-weaving`,
      url: `${SITE}/journal/the-art-of-kani-weaving`,
      title: "The Art of Kani Weaving",
      date_published: "2026-09-20T09:00:00.000Z",
      tags: ["Kani"],
    });
    expect(feed.items[0]?.content_html).toContain("<h2>The talim</h2>");
  });

  it("drops undated articles and respects the limit", () => {
    const feed = renderJsonFeed([article(), article({ slug: "undated", publishedAt: "bogus" })], {
      siteUrl: SITE,
      limit: 5,
    });

    expect(feed.items).toHaveLength(1);
  });
});
