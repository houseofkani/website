import { createHmac, timingSafeEqual } from "node:crypto";

import { revalidateTag } from "next/cache";

function isValidSignature(body: string, signature: string | null): boolean {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || !signature) return false;
  const expected = createHmac("sha256", secret).update(body).digest("hex");
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * On-demand revalidation webhook, called by the CMS after content changes.
 *
 * POST /api/revalidate
 * Body: {"tags":["journal","post:<slug>"]}
 * Header: x-revalidate-signature: hex(HMAC_SHA256(rawBody, REVALIDATE_SECRET))
 */
export async function POST(request: Request) {
  const body = await request.text();

  if (!isValidSignature(body, request.headers.get("x-revalidate-signature"))) {
    return new Response("Invalid signature", { status: 401 });
  }

  let tags: unknown;
  try {
    tags = JSON.parse(body)?.tags;
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }
  if (!Array.isArray(tags) || !tags.every((t) => typeof t === "string")) {
    return new Response('Body must be {"tags":["…"]}', { status: 400 });
  }

  for (const tag of tags) revalidateTag(tag);
  return Response.json({ revalidated: true, tags });
}
