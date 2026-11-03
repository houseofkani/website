import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * The enquiry route reads RESEND_API_KEY at import time, so each test resets
 * the module registry before importing it with the env it needs.
 */
async function loadRoute(env: Record<string, string | undefined> = {}) {
  vi.resetModules();
  delete process.env.RESEND_API_KEY;
  delete process.env.EMAIL_FROM;
  delete process.env.ENQUIRY_TO_EMAIL;
  for (const [key, value] of Object.entries(env)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  return import("@/app/api/enquiry/route");
}

function request(body: unknown, headers: Record<string, string> = {}) {
  return new Request("http://localhost:3001/api/enquiry", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.9", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const VALID = {
  name: "Ayesha Khan",
  email: "ayesha@example.com",
  telephone: "+91 98027 32612",
  topic: "Appointment in Srinagar",
  message: "I would like to visit the atelier in April.",
};

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("POST /api/enquiry — validation", () => {
  it("rejects a malformed body", async () => {
    const { POST } = await loadRoute();
    const response = await POST(request("{not json"));
    expect(response.status).toBe(400);
  });

  it("requires a name", async () => {
    const { POST } = await loadRoute();
    const response = await POST(request({ ...VALID, name: "A" }));
    expect(response.status).toBe(400);
    expect((await response.json()).error).toContain("name");
  });

  it("requires a plausible email address", async () => {
    const { POST } = await loadRoute();
    const response = await POST(request({ ...VALID, email: "not-an-email" }));
    expect(response.status).toBe(400);
  });

  it("requires a message of some substance", async () => {
    const { POST } = await loadRoute();
    const response = await POST(request({ ...VALID, message: "hi" }));
    expect(response.status).toBe(400);
    expect((await response.json()).error).toContain("detail");
  });

  it("refuses oversized bodies", async () => {
    const { POST } = await loadRoute();
    const response = await POST(request({ ...VALID, message: "x".repeat(20_000) }));
    expect(response.status).toBe(413);
  });
});

describe("POST /api/enquiry — spam and configuration", () => {
  it("accepts the honeypot silently without sending anything", async () => {
    const { POST } = await loadRoute();
    const response = await POST(request({ ...VALID, website: "http://spam.example" }));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ sent: true });
  });

  it("answers 503 with a machine-readable code when Resend is not configured", async () => {
    const { POST } = await loadRoute({ RESEND_API_KEY: "" });
    const response = await POST(request(VALID));
    const payload = await response.json();

    expect(response.status).toBe(503);
    expect(payload.code).toBe("email_not_configured");
  });

  it("throttles a burst from one address", async () => {
    const { POST } = await loadRoute();
    const statuses: number[] = [];

    for (let i = 0; i < 5; i += 1) {
      const response = await POST(request(VALID));
      statuses.push(response.status);
    }

    expect(statuses.filter((status) => status === 429).length).toBeGreaterThan(0);
    expect(statuses[0]).not.toBe(429);
  });
});
