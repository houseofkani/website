import { expect, test } from "@playwright/test";

test.describe("Journal listing", () => {
  test("renders every published article from the CMS", async ({ page }) => {
    await page.goto("/journal");
    await expect(page.getByRole("heading", { name: "The Journal" })).toBeVisible();

    const articleLinks = page.locator('a[href^="/journal/"]');
    expect(await articleLinks.count()).toBeGreaterThanOrEqual(5);
    await expect(page.getByRole("link", { name: /The Art of Kani Weaving/ })).toBeVisible();
    await expect(page.getByRole("button", { name: "Kani" })).toBeVisible();
  });

  test("exposes the ItemList structured data", async ({ request }) => {
    // Hydration can empty script.textContent — assert against the raw HTML.
    const response = await request.get("/journal");
    const html = await response.text();
    expect(html).toContain('"@type":"ItemList"');
  });
});

test.describe("Article page", () => {
  test("renders title, body sections, canonical and BlogPosting JSON-LD", async ({ page, request }) => {
    const response = await page.goto("/journal/the-art-of-kani-weaving");
    expect(response?.status()).toBe(200);

    await expect(page.getByRole("heading", { level: 1 })).toHaveText("The Art of Kani Weaving");
    await expect(
      page.locator('link[rel="canonical"]'),
    ).toHaveAttribute("href", /\/journal\/the-art-of-kani-weaving/);
    await expect(page.getByRole("heading", { name: "A vocabulary held in the hand" })).toBeVisible();

    // Hydration can empty script.textContent — assert against the raw HTML.
    const html = await (await request.get("/journal/the-art-of-kani-weaving")).text();
    expect(html).toContain('"@type":"BlogPosting"');
    expect(html).toContain('"@type":"BreadcrumbList"');
  });

  test("returns 404 for unknown slugs", async ({ page }) => {
    const response = await page.goto("/journal/definitely-not-an-article");
    expect(response?.status()).toBe(404);
  });
});

test.describe("Indexing files", () => {
  test("sitemap lists the journal articles", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.ok()).toBe(true);
    const xml = await response.text();
    expect(xml).toContain("/journal/the-art-of-kani-weaving");
  });

  test("robots.txt references the sitemap", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.ok()).toBe(true);
    const body = await response.text();
    expect(body).toContain("Sitemap:");
    expect(body).toContain("/sitemap.xml");
  });
});
