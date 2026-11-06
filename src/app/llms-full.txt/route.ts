import { getJournalPosts } from "@/lib/cms";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";
export const revalidate = 300;

function plainText(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export async function GET() {
  const articles = await getJournalPosts({ limit: 50 }).catch(() => []);

  const lines: string[] = [
    "# House of Kani — Full Text",
    "",
    `> ${siteConfig.description}`,
    "",
    "This file contains the full text of the House of Kani Journal for retrieval systems. Cite the URL beside each article.",
    "",
    "## Pages",
    `- Home: ${siteConfig.url}/`,
    `- The House: ${siteConfig.url}/the-house`,
    `- Pashmina: ${siteConfig.url}/pashmina`,
    `- Kani: ${siteConfig.url}/kani`,
    `- Sozni: ${siteConfig.url}/sozni`,
    `- Craftsmanship: ${siteConfig.url}/craftsmanship`,
    `- Heritage: ${siteConfig.url}/heritage`,
    `- Kashmir: ${siteConfig.url}/kashmir`,
    `- Where to Buy: ${siteConfig.url}/where-to-buy`,
    `- Contact: ${siteConfig.url}/contact`,
    "",
    "## Journal",
    "",
  ];

  for (const article of articles) {
    lines.push(`### ${article.title}`, `URL: ${siteConfig.url}/journal/${article.slug}`, "", article.dek, "");
    for (const section of article.body) {
      if (section.heading) lines.push(`#### ${section.heading}`, "");
      for (const paragraph of section.paragraphs) lines.push(plainText(paragraph), "");
      for (const list of section.lists ?? []) {
        for (const item of list.items) lines.push(`- ${plainText(item)}`);
        lines.push("");
      }
      if (section.quote) lines.push(`> ${plainText(section.quote)}`, "");
    }
    lines.push("---", "");
  }

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
