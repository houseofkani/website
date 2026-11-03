import { cache } from "react";

/**
 * Payload CMS REST client for the Journal.
 *
 * Server-only: every helper reads secret env vars (CMS_URL, CMS_API_KEY) and
 * must not be imported from client components — pass data down as props.
 */

export type JournalArticle = {
  slug: string;
  category: "Kani" | "Pashmina" | "Craft" | "Heritage" | "Kashmir" | "People";
  title: string;
  dek: string;
  image: string;
  imageAlt: string;
  readTime: string;
  date: string;
  /** ISO 8601 publication date for structured data. */
  publishedAt: string;
  /** Editor-controlled SEO overrides from the CMS (empty = use article fields). */
  seo: {
    title?: string;
    description?: string;
    image?: string;
    canonicalUrl?: string;
    noindex?: boolean;
  };
  body: { heading?: string; paragraphs: string[]; quote?: string }[];
};

export type JournalRedirect =
  { type: "internal"; path: string } | { type: "external"; url: string };

/**
 * Stable public origin for the Payload CMS: exe.dev HTTPS proxy -> Caddy -> CMS.
 *
 * Cloudflare quick tunnels (`*.trycloudflare.com`) are ephemeral — they stop
 * resolving as soon as cloudflared restarts — so a leftover tunnel URL in the
 * environment must never be treated as a durable CMS origin.
 */
const STABLE_CMS_URL = "https://house-of-kani-cms.exe.xyz";
const CONFIGURED_CMS_URL = (process.env.CMS_URL ?? "").replace(/\/$/, "");

function resolveCmsUrl(): string {
  if (!CONFIGURED_CMS_URL) return STABLE_CMS_URL;
  try {
    const { hostname } = new URL(CONFIGURED_CMS_URL);
    if (hostname === "trycloudflare.com" || hostname.endsWith(".trycloudflare.com")) {
      console.warn(
        "[cms] CMS_URL points at an ephemeral trycloudflare tunnel; using the stable CMS origin instead.",
      );
      return STABLE_CMS_URL;
    }
  } catch {
    console.warn("[cms] CMS_URL is not a valid URL; using the stable CMS origin instead.");
    return STABLE_CMS_URL;
  }
  return CONFIGURED_CMS_URL;
}

const CMS_URL = resolveCmsUrl();
const CMS_API_KEY = process.env.CMS_API_KEY;
const WORDS_PER_MINUTE = 200;

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export class CmsError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "CmsError";
  }
}

type CmsMedia = { url?: string | null; alt?: string | null };
type CmsCategory = { name?: string | null };
type LexicalNode = {
  type?: string;
  text?: string;
  children?: LexicalNode[];
  tag?: string;
};
type CmsPost = {
  slug?: string | null;
  title?: string | null;
  excerpt?: string | null;
  content?: { root?: LexicalNode } | null;
  featuredImage?: CmsMedia | number | null;
  imageAlt?: string | null;
  categories?: CmsCategory[] | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: CmsMedia | number | null;
    canonicalUrl?: string | null;
    metaRobots?: string | null;
  } | null;
};

/** Serve media through the public CMS origin (dev: :3000, prod: Caddy domain). */
function mediaUrl(media: CmsMedia | number | null | undefined): string {
  if (!media || typeof media === "number" || !media.url) return "";
  try {
    const url = new URL(media.url, CMS_URL);
    return `${CMS_URL}${url.pathname}`;
  } catch {
    return media.url;
  }
}

function lexicalText(node: LexicalNode | undefined): string {
  if (!node) return "";
  if (node.type === "text") return node.text ?? "";
  return (node.children ?? []).map(lexicalText).join("");
}

function lexicalToSections(root: LexicalNode | undefined): JournalArticle["body"] {
  const sections: JournalArticle["body"] = [];
  let current: JournalArticle["body"][number] | undefined;

  const pushParagraph = (text: string) => {
    if (!current) {
      current = { paragraphs: [] };
      sections.push(current);
    }
    current.paragraphs.push(text);
  };

  for (const node of root?.children ?? []) {
    if (node.type === "heading") {
      current = { heading: lexicalText(node).trim(), paragraphs: [] };
      sections.push(current);
    } else if (node.type === "quote") {
      const text = lexicalText(node).trim();
      if (!text) continue;
      if (!current) {
        current = { paragraphs: [] };
        sections.push(current);
      }
      current.quote = text;
    } else if (node.type === "paragraph") {
      const text = lexicalText(node).trim();
      if (text) pushParagraph(text);
    } else if (node.type === "list") {
      for (const item of node.children ?? []) {
        const text = lexicalText(item).trim();
        if (text) pushParagraph(text);
      }
    }
  }

  return sections.filter((s) => s.heading || s.quote || s.paragraphs.length > 0);
}

function readTime(sections: JournalArticle["body"]): string {
  const text = sections.flatMap((s) => [s.heading ?? "", ...s.paragraphs, s.quote ?? ""]).join(" ");
  const minutes = Math.max(
    1,
    Math.round(text.split(/\s+/).filter(Boolean).length / WORDS_PER_MINUTE),
  );
  return `${minutes} min read`;
}

function toArticle(post: CmsPost): JournalArticle | null {
  if (!post.slug || !post.title) return null;
  const body = lexicalToSections(post.content?.root);
  const published = post.publishedAt ?? post.updatedAt;
  const media = typeof post.featuredImage === "number" ? null : post.featuredImage;
  const meta = post.meta;
  const metaImage = meta?.image && typeof meta.image !== "number" ? meta.image : null;

  return {
    slug: post.slug,
    category: (post.categories?.[0]?.name ?? "Craft") as JournalArticle["category"],
    title: post.title,
    dek: post.excerpt ?? "",
    image: mediaUrl(post.featuredImage),
    imageAlt: post.imageAlt || media?.alt || post.title,
    readTime: readTime(body),
    date: published ? dateFormatter.format(new Date(published)) : "",
    publishedAt: published ?? "",
    seo: {
      title: meta?.title || undefined,
      description: meta?.description || undefined,
      image: metaImage ? mediaUrl(metaImage) : undefined,
      canonicalUrl: meta?.canonicalUrl || undefined,
      noindex: meta?.metaRobots === "noindex",
    },
    body,
  };
}

type FetchOptions = {
  draft?: boolean;
  tags?: string[];
  revalidate?: number | false;
};

async function cmsFetch(path: string, options: FetchOptions = {}): Promise<unknown> {
  const url = new URL(`/api/${path}`, CMS_URL);
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (options.draft) {
    if (!CMS_API_KEY) {
      throw new CmsError("CMS_API_KEY is not set — draft preview requires a CMS viewer API key.");
    }
    headers.Authorization = `users API-Key ${CMS_API_KEY}`;
  }

  const res = await fetch(url, {
    headers,
    // Never let a dead CMS origin hang a page render or a build forever.
    signal: AbortSignal.timeout(10_000),
    next: { tags: options.tags ?? ["journal"], revalidate: options.revalidate ?? false },
  });
  if (!res.ok) {
    if (res.status === 404) throw new CmsError(`CMS 404 for ${path}`, 404);
    throw new CmsError(`CMS request failed (${res.status}): ${path}`, res.status);
  }
  return res.json();
}

type PostQuery = {
  draft?: boolean;
  limit?: number;
  sort?: string;
};

/** All journal articles (newest first). Pass `draft: true` in preview mode. */
export const getJournalPosts = cache(async (query: PostQuery = {}): Promise<JournalArticle[]> => {
  const params = new URLSearchParams({
    limit: String(query.limit ?? 50),
    depth: "2",
    sort: query.sort ?? "-publishedAt",
  });
  if (query.draft) params.set("draft", "true");
  else params.set("where[_status][equals]", "published");

  const data = (await cmsFetch(`posts?${params}`, {
    draft: query.draft,
    tags: ["journal"],
  })) as { docs?: CmsPost[] };

  return (data.docs ?? []).map(toArticle).filter((a): a is JournalArticle => a !== null);
});

/** One article by slug, or null when unpublished/unknown. */
export const getJournalPost = cache(
  async (slug: string, options: { draft?: boolean } = {}): Promise<JournalArticle | null> => {
    const params = new URLSearchParams({
      limit: "1",
      depth: "2",
      "where[slug][equals]": slug,
    });
    if (options.draft) params.set("draft", "true");
    else params.set("where[_status][equals]", "published");

    try {
      const data = (await cmsFetch(`posts?${params}`, {
        draft: options.draft,
        tags: ["journal", `post:${slug}`],
      })) as { docs?: CmsPost[] };
      const post = data.docs?.[0];
      return post ? toArticle(post) : null;
    } catch (error) {
      if (error instanceof CmsError && error.status === 404) return null;
      throw error;
    }
  },
);

/** One page of the journal, with the pagination envelope the index needs. */
export type JournalPage = {
  articles: JournalArticle[];
  page: number;
  totalPages: number;
  totalDocs: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

/** Payload page size when walking the whole archive — small enough to stay fast. */
const CMS_PAGE_LIMIT = 100;
/** Safety stop so a paging bug can never loop forever. */
const CMS_MAX_PAGES = 50;

type PostPage = {
  docs?: CmsPost[];
  page?: number;
  totalPages?: number;
  totalDocs?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
};

function postQuery(params: Record<string, string>): string {
  return `posts?${new URLSearchParams(params)}`;
}

export const getJournalPage = cache(
  async ({
    page = 1,
    limit = 9,
    draft = false,
  }: { page?: number; limit?: number; draft?: boolean } = {}): Promise<JournalPage> => {
    const params: Record<string, string> = {
      limit: String(limit),
      page: String(Math.max(1, Math.floor(page))),
      depth: "2",
      sort: "-publishedAt",
    };
    if (draft) params.draft = "true";
    else params["where[_status][equals]"] = "published";

    const data = (await cmsFetch(postQuery(params), { draft, tags: ["journal"] })) as PostPage;
    const articles = (data.docs ?? [])
      .map(toArticle)
      .filter((a): a is JournalArticle => a !== null);

    return {
      articles,
      page: data.page ?? page,
      totalPages: data.totalPages ?? 1,
      totalDocs: data.totalDocs ?? articles.length,
      hasNextPage: data.hasNextPage ?? false,
      hasPrevPage: data.hasPrevPage ?? false,
    };
  },
);

/** Every published story, slug + date only — sitemaps and static params. */
export type JournalArchiveEntry = { slug: string; publishedAt: string };

export const getJournalArchive = cache(async (): Promise<JournalArchiveEntry[]> => {
  const entries: JournalArchiveEntry[] = [];

  for (let page = 1; page <= CMS_MAX_PAGES; page += 1) {
    const data = (await cmsFetch(
      postQuery({
        limit: String(CMS_PAGE_LIMIT),
        page: String(page),
        depth: "0",
        sort: "-publishedAt",
        "where[_status][equals]": "published",
      }),
      { tags: ["journal"] },
    )) as PostPage;

    for (const doc of data.docs ?? []) {
      if (!doc.slug) continue;
      entries.push({
        slug: doc.slug,
        publishedAt: doc.publishedAt ?? doc.updatedAt ?? "",
      });
    }

    if (!data.hasNextPage) break;
  }

  return entries;
});

/** Canonical slugs for static generation (published only). */
export const getJournalSlugs = cache(async (): Promise<string[]> => {
  const archive = await getJournalArchive();
  return archive.map((entry) => entry.slug);
});

/**
 * Look up a permanent redirect for a journal URL that no longer resolves.
 * Old slugs are rewritten automatically when an editor changes a slug.
 */
export const getJournalRedirect = cache(async (slug: string): Promise<JournalRedirect | null> => {
  try {
    const params = new URLSearchParams({
      limit: "1",
      depth: "2",
      "where[from][equals]": `/journal/${slug}`,
    });
    const data = (await cmsFetch(`redirects?${params}`, { tags: ["journal"] })) as {
      docs?: Array<{
        to?: {
          type?: string;
          url?: string | null;
          reference?: { relationTo?: string; value?: unknown } | null;
        } | null;
      }>;
    };
    const to = data.docs?.[0]?.to;
    if (!to) return null;
    if (to.type === "custom" && to.url) return { type: "external", url: to.url };
    if (to.type === "reference" && to.reference?.relationTo === "posts") {
      const value = to.reference.value;
      const targetSlug = value && typeof value === "object" ? (value as CmsPost).slug : null;
      if (targetSlug) return { type: "internal", path: `/journal/${targetSlug}` };
    }
    return null;
  } catch {
    return null;
  }
});
