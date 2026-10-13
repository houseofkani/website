import { createHmac } from "node:crypto";

import { expect, test } from "@playwright/test";

const CMS = "http://localhost:3000";
const PREVIEW_SECRET = process.env.PREVIEW_SECRET ?? "";
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET ?? "";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";

const hasAdmin = Boolean(ADMIN_EMAIL && ADMIN_PASSWORD);

test.describe("Slugs, redirects and drafts", () => {
  test.skip(!hasAdmin, "ADMIN_EMAIL / ADMIN_PASSWORD not available (see cms/.env)");

  const draftSlug = "e2e-draft-preview-target";
  let token = "";
  let draftId: number | undefined;

  test.beforeAll(async ({ request }) => {
    const login = await request.post(`${CMS}/api/users/login`, {
      data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
    });
    expect(login.ok()).toBe(true);
    token = ((await login.json()) as { token: string }).token;
  });

  test.afterAll(async ({ request }) => {
    if (draftId === undefined) return;
    await request.delete(`${CMS}/api/posts/${draftId}`, {
      headers: { Authorization: `JWT ${token}` },
    });
  });

  test("renamed slugs serve a 308 to the canonical article", async ({ page, request }) => {
    const first = await request.get(`${CMS}/api/posts?limit=1&depth=0`, {
      headers: { Authorization: `JWT ${token}` },
    });
    const { docs } = (await first.json()) as {
      docs: Array<{ id: number; slug: string }>;
    };
    const target = docs[0]!;

    const legacy = `e2e-legacy-slug-${target.id}`;
    const create = await request.post(`${CMS}/api/redirects`, {
      headers: { Authorization: `JWT ${token}` },
      data: {
        from: `/journal/${legacy}`,
        to: { type: "reference", reference: { relationTo: "posts", value: target.id } },
      },
    });
    expect(create.status()).toBe(201);

    // Follows no redirects so we see the raw 308.
    const response = await request.get(`/journal/${legacy}`, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toContain(`/journal/${target.slug}`);

    // The browser lands on the canonical article.
    await page.goto(`/journal/${legacy}`);
    await expect(page).toHaveURL(`/journal/${target.slug}`);

    // Clean the test redirect up.
    const list = await request.get(
      `${CMS}/api/redirects?limit=10&where[from][equals]=/journal/${legacy}`,
      { headers: { Authorization: `JWT ${token}` } },
    );
    const redirects = (await list.json()) as { docs: Array<{ id: number }> };
    for (const redirect of redirects.docs) {
      await request.delete(`${CMS}/api/redirects/${redirect.id}`, {
        headers: { Authorization: `JWT ${token}` },
      });
    }
  });

  test("draft articles are only visible through preview mode", async ({ page, request }) => {
    // Base the draft on an existing article so relationships resolve.
    const first = await request.get(`${CMS}/api/posts?limit=1&depth=0`, {
      headers: { Authorization: `JWT ${token}` },
    });
    const source = (((await first.json()) as { docs: Array<Record<string, unknown>> }).docs[0]!) as {
      featuredImage: number;
      author: number;
      categories: number[];
    };

    const created = await request.post(`${CMS}/api/posts`, {
      headers: { Authorization: `JWT ${token}` },
      data: {
        title: "E2E Draft Preview",
        slug: draftSlug,
        excerpt: "A draft used by the Playwright preview test.",
        featuredImage: source.featuredImage,
        author: source.author,
        categories: source.categories,
        _status: "draft",
      },
    });
    expect(created.status()).toBe(201);
    draftId = ((await created.json()) as { doc: { id: number } }).doc.id;

    // Public site: 404.
    const anonymous = await page.goto(`/journal/${draftSlug}`);
    expect(anonymous?.status()).toBe(404);

    // Enable preview via the CMS-signed URL, then the draft renders.
    await page.goto(`/api/preview?secret=${encodeURIComponent(PREVIEW_SECRET)}&slug=${draftSlug}`);
    await expect(page).toHaveURL(`/journal/${draftSlug}`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("E2E Draft Preview");

    // Exiting preview hides it again.
    await page.goto("/api/preview/disable");
    const afterDisable = await page.goto(`/journal/${draftSlug}`);
    expect(afterDisable?.status()).toBe(404);
  });
});

test.describe("Revalidation webhook", () => {
  const sign = (body: string) => createHmac("sha256", REVALIDATE_SECRET).update(body).digest("hex");

  test("accepts correctly signed tag payloads", async ({ request }) => {
    const body = JSON.stringify({ tags: ["journal", "post:the-art-of-kani-weaving"] });
    const response = await request.post("/api/revalidate", {
      headers: { "content-type": "application/json", "x-revalidate-signature": sign(body) },
      data: body,
    });
    expect(response.status()).toBe(200);
  });

  test("rejects unsigned or tampered payloads", async ({ request }) => {
    const bad = await request.post("/api/revalidate", {
      data: { tags: ["journal"] },
    });
    expect(bad.status()).toBe(401);

    const signed = JSON.stringify({ tags: ["journal"] });
    const tampered = JSON.stringify({ tags: ["journal", "injected"] });
    const response = await request.post("/api/revalidate", {
      headers: { "content-type": "application/json", "x-revalidate-signature": sign(signed) },
      data: tampered,
    });
    expect(response.status()).toBe(401);
  });
});
