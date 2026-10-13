import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const CMS_URL = "http://cms.test";

/** A depth-2 REST post document, shaped like the Payload response. */
function restPost(overrides: Record<string, unknown> = {}) {
  return {
    id: 5,
    slug: "the-art-of-kani-weaving",
    title: "The Art of Kani Weaving",
    excerpt: "A language of colour, memory and patience.",
    imageAlt: "Artisan hands weaving",
    publishedAt: "2026-09-20T09:00:00.000Z",
    updatedAt: "2026-09-21T09:00:00.000Z",
    categories: [{ id: 1, name: "Kani", slug: "kani" }],
    featuredImage: {
      id: 7,
      alt: "Artisan hands weaving",
      url: "http://localhost:3000/api/media/file/kani-loom.jpg",
    },
    content: {
      root: {
        type: "root",
        direction: null,
        format: "",
        indent: 0,
        version: 1,
        children: [
          {
            type: "paragraph",
            version: 1,
            children: [
              // Lexical keeps boundary spaces inside the text nodes themselves.
              { type: "text", text: "There is no haste at a Kani loom. ", version: 1 },
              { type: "text", text: "The weaver sits before a forest of warp threads.", version: 1 },
            ],
          },
          {
            type: "heading",
            tag: "h2",
            version: 1,
            children: [{ type: "text", text: "A vocabulary held in the hand", version: 1 }],
          },
          {
            type: "paragraph",
            version: 1,
            children: [{ type: "text", text: "The word kani names the slender wooden bobbins.", version: 1 }],
          },
          {
            type: "quote",
            version: 1,
            children: [
              {
                type: "paragraph",
                version: 1,
                children: [{ type: "text", text: "Its beauty is the act of weaving itself.", version: 1 }],
              },
            ],
          },
        ],
      },
    },
    ...overrides,
  };
}

function jsonResponse(data: unknown, status = 200) {
  return { ok: status >= 200 && status < 300, status, json: async () => data } as Response;
}

let fetchMock: ReturnType<typeof vi.fn>;

async function loadCms() {
  vi.resetModules();
  return import("@/lib/cms");
}

beforeEach(() => {
  process.env.CMS_URL = CMS_URL;
  process.env.CMS_API_KEY = "test-api-key";
  fetchMock = vi.fn(async () => jsonResponse({ docs: [restPost()] }));
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("getJournalPosts", () => {
  it("maps a REST document onto the site's JournalArticle shape", async () => {
    const { getJournalPosts } = await loadCms();
    const [article] = await getJournalPosts();

    expect(article).toBeDefined();
    expect(article!.slug).toBe("the-art-of-kani-weaving");
    expect(article!.title).toBe("The Art of Kani Weaving");
    expect(article!.dek).toBe("A language of colour, memory and patience.");
    expect(article!.category).toBe("Kani");
    expect(article!.readTime).toMatch(/^\d+ min read$/);
    expect(article!.date).toBe("20 September 2026");
    expect(article!.publishedAt).toBe("2026-09-20T09:00:00.000Z");
    // Media URLs are rewritten onto the configured CMS origin.
    expect(article!.image).toBe(`${CMS_URL}/api/media/file/kani-loom.jpg`);
    expect(article!.imageAlt).toBe("Artisan hands weaving");
  });

  it("converts lexical content into rendered sections", async () => {
    const { getJournalPosts } = await loadCms();
    const [article] = await getJournalPosts();

    expect(article!.body).toEqual([
      {
        paragraphs: [
          "There is no haste at a Kani loom. The weaver sits before a forest of warp threads.",
        ],
      },
      {
        heading: "A vocabulary held in the hand",
        paragraphs: ["The word kani names the slender wooden bobbins."],
        quote: "Its beauty is the act of weaving itself.",
      },
    ]);
  });

  it("queries published posts without authentication", async () => {
    const { getJournalPosts } = await loadCms();
    await getJournalPosts();

    const [url, init] = fetchMock.mock.calls[0] as [URL, RequestInit | undefined];
    const href = String(url);
    expect(href).toContain("where%5B_status%5D%5Bequals%5D=published");
    const headers = (init?.headers ?? {}) as Record<string, string>;
    expect(headers.Authorization).toBeUndefined();
  });

  it("sends the viewer API key when fetching drafts", async () => {
    const { getJournalPosts } = await loadCms();
    await getJournalPosts({ draft: true });

    const [url, init] = fetchMock.mock.calls[0] as [URL, RequestInit | undefined];
    expect(String(url)).toContain("draft=true");
    const headers = (init?.headers ?? {}) as Record<string, string>;
    expect(headers.Authorization).toBe("users API-Key test-api-key");
  });

  it("exposes editor SEO overrides", async () => {
    fetchMock.mockImplementation(async () =>
      jsonResponse({
        docs: [
          restPost({
            meta: {
              title: "Better Title",
              description: "Better description",
              canonicalUrl: "https://houseofkani.com/journal/canonical-slug",
              metaRobots: "noindex",
              image: null,
            },
          }),
        ],
      }),
    );
    const { getJournalPosts } = await loadCms();
    const [article] = await getJournalPosts();

    expect(article!.seo.title).toBe("Better Title");
    expect(article!.seo.description).toBe("Better description");
    expect(article!.seo.canonicalUrl).toBe("https://houseofkani.com/journal/canonical-slug");
    expect(article!.seo.noindex).toBe(true);
  });
});

describe("getJournalPost", () => {
  it("returns null when the CMS responds 404", async () => {
    fetchMock.mockImplementation(async () => jsonResponse({ errors: [{ message: "Not Found" }] }, 404));
    const { getJournalPost } = await loadCms();
    expect(await getJournalPost("missing")).toBeNull();
  });

  it("returns null when the list comes back empty", async () => {
    fetchMock.mockImplementation(async () => jsonResponse({ docs: [] }));
    const { getJournalPost } = await loadCms();
    expect(await getJournalPost("missing")).toBeNull();
  });
});

describe("getJournalRedirect", () => {
  it("resolves an internal reference to a journal path", async () => {
    fetchMock.mockImplementation(async () =>
      jsonResponse({
        docs: [
          {
            from: "/journal/old-slug",
            to: {
              type: "reference",
              reference: { relationTo: "posts", value: restPost({ slug: "new-slug" }) },
            },
          },
        ],
      }),
    );
    const { getJournalRedirect } = await loadCms();
    expect(await getJournalRedirect("old-slug")).toEqual({
      type: "internal",
      path: "/journal/new-slug",
    });
  });

  it("passes through custom external targets", async () => {
    fetchMock.mockImplementation(async () =>
      jsonResponse({
        docs: [{ from: "/journal/old-slug", to: { type: "custom", url: "https://example.com/x" } }],
      }),
    );
    const { getJournalRedirect } = await loadCms();
    expect(await getJournalRedirect("old-slug")).toEqual({
      type: "external",
      url: "https://example.com/x",
    });
  });

  it("returns null when nothing matches or the CMS fails", async () => {
    fetchMock.mockImplementation(async () => jsonResponse({ docs: [] }));
    const { getJournalRedirect } = await loadCms();
    expect(await getJournalRedirect("old-slug")).toBeNull();

    fetchMock.mockImplementation(async () => {
      throw new Error("network down");
    });
    expect(await getJournalRedirect("old-slug")).toBeNull();
  });
});
