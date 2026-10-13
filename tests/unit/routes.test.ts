import { createHmac } from "node:crypto";

import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";

const { revalidateTagMock, draftModeMock } = vi.hoisted(() => ({
  revalidateTagMock: vi.fn(),
  draftModeMock: vi.fn(async () => ({ enable: vi.fn(), disable: vi.fn() })),
}));

vi.mock("next/cache", () => ({ revalidateTag: revalidateTagMock }));
vi.mock("next/headers", () => ({ draftMode: draftModeMock }));

const SECRET = "test-revalidate-secret";
const PREVIEW_SECRET = "test-preview-secret";

function sign(body: string): string {
  return createHmac("sha256", SECRET).update(body).digest("hex");
}

async function revalidateModule() {
  vi.resetModules();
  return import("@/app/api/revalidate/route");
}

async function previewModule() {
  vi.resetModules();
  return import("@/app/api/preview/route");
}

beforeAll(() => {
  process.env.REVALIDATE_SECRET = SECRET;
  process.env.PREVIEW_SECRET = PREVIEW_SECRET;
});

afterEach(() => {
  revalidateTagMock.mockClear();
});

afterAll(() => {
  vi.unstubAllEnvs();
});

describe("POST /api/revalidate", () => {
  it("rejects requests without a valid signature", async () => {
    const { POST } = await revalidateModule();
    const body = JSON.stringify({ tags: ["journal"] });
    const res = await POST(
      new Request("http://localhost/api/revalidate", {
        method: "POST",
        body,
        headers: { "x-revalidate-signature": "deadbeef" },
      }),
    );
    expect(res.status).toBe(401);
    expect(revalidateTagMock).not.toHaveBeenCalled();
  });

  it("rejects a body that does not match the signature", async () => {
    const { POST } = await revalidateModule();
    const body = JSON.stringify({ tags: ["journal"] });
    const forged = JSON.stringify({ tags: ["journal", "extra"] });
    const res = await POST(
      new Request("http://localhost/api/revalidate", {
        method: "POST",
        body: forged,
        headers: { "x-revalidate-signature": sign(body) },
      }),
    );
    expect(res.status).toBe(401);
    expect(revalidateTagMock).not.toHaveBeenCalled();
  });

  it("rejects bodies without a tags array", async () => {
    const { POST } = await revalidateModule();
    const body = JSON.stringify({ nope: true });
    const res = await POST(
      new Request("http://localhost/api/revalidate", {
        method: "POST",
        body,
        headers: { "x-revalidate-signature": sign(body) },
      }),
    );
    expect(res.status).toBe(400);
    expect(revalidateTagMock).not.toHaveBeenCalled();
  });

  it("revalidates every tag for a correctly signed payload", async () => {
    const { POST } = await revalidateModule();
    const body = JSON.stringify({ tags: ["journal", "post:the-art-of-kani-weaving"] });
    const res = await POST(
      new Request("http://localhost/api/revalidate", {
        method: "POST",
        body,
        headers: { "x-revalidate-signature": sign(body) },
      }),
    );
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({
      revalidated: true,
      tags: ["journal", "post:the-art-of-kani-weaving"],
    });
    expect(revalidateTagMock).toHaveBeenCalledWith("journal");
    expect(revalidateTagMock).toHaveBeenCalledWith("post:the-art-of-kani-weaving");
  });
});

describe("GET /api/preview", () => {
  it("rejects a wrong secret", async () => {
    const { GET } = await previewModule();
    const res = await GET(
      new Request("http://localhost:3001/api/preview?secret=nope&slug=some-post"),
    );
    expect(res.status).toBe(401);
    expect(draftModeMock).not.toHaveBeenCalled();
  });

  it("rejects an invalid slug", async () => {
    const { GET } = await previewModule();
    const res = await GET(
      new Request(
        `http://localhost:3001/api/preview?secret=${encodeURIComponent(PREVIEW_SECRET)}&slug=../etc`,
      ),
    );
    expect(res.status).toBe(400);
    expect(draftModeMock).not.toHaveBeenCalled();
  });

  it("enables draft mode and redirects to the article", async () => {
    const { GET } = await previewModule();
    const res = await GET(
      new Request(
        `http://localhost:3001/api/preview?secret=${encodeURIComponent(PREVIEW_SECRET)}&slug=the-art-of-kani-weaving`,
      ),
    );
    expect([302, 303, 307]).toContain(res.status);
    expect(res.headers.get("location")).toBe("http://localhost:3001/journal/the-art-of-kani-weaving");
    expect(draftModeMock).toHaveBeenCalledTimes(1);
  });
});
