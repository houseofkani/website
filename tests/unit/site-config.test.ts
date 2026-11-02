import { describe, expect, it } from "vitest";

import { resolveSiteUrl } from "@/lib/site-config";

describe("resolveSiteUrl", () => {
  it("uses the built-in Vercel production domain over an explicit override", () => {
    expect(
      resolveSiteUrl({
        NEXT_PUBLIC_SITE_URL: "https://houseofkani.com/",
        VERCEL: "1",
        VERCEL_PROJECT_PRODUCTION_URL: "website-abc.vercel.app",
      }),
    ).toBe("https://website-abc.vercel.app");
  });

  it("uses the explicit override outside Vercel", () => {
    expect(
      resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: "https://houseofkani.com/" }),
    ).toBe("https://houseofkani.com");
  });

  it("uses the built-in Vercel production domain when no override is set", () => {
    expect(
      resolveSiteUrl({
        VERCEL: "1",
        VERCEL_PROJECT_PRODUCTION_URL: "website-abc.vercel.app",
        VERCEL_URL: "website-123.vercel.app",
      }),
    ).toBe("https://website-abc.vercel.app");
  });

  it("falls back to the deployment URL on Vercel previews", () => {
    expect(
      resolveSiteUrl({
        VERCEL: "1",
        VERCEL_URL: "website-git-branch-abc.vercel.app",
      }),
    ).toBe("https://website-git-branch-abc.vercel.app");
  });

  it("keeps a protocol-less Vercel domain valid", () => {
    expect(
      resolveSiteUrl({
        VERCEL_PROJECT_PRODUCTION_URL: "website-abc.vercel.app/",
      }),
    ).toBe("https://website-abc.vercel.app");
  });

  it("falls back to the house URL outside Vercel", () => {
    expect(resolveSiteUrl({})).toBe("https://houseofkani.com");
  });
});
