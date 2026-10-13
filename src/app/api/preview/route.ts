import { timingSafeEqual } from "node:crypto";

import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isValidSecret(provided: string | null): boolean {
  const expected = process.env.PREVIEW_SECRET;
  if (!expected || !provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * Draft preview entry point.
 * GET /api/preview?secret=…&slug=… — enables draft mode and opens the article.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug") ?? "";

  if (!isValidSecret(secret)) {
    return new Response("Invalid preview token", { status: 401 });
  }
  if (!SLUG_PATTERN.test(slug)) {
    return new Response("Invalid slug", { status: 400 });
  }

  (await draftMode()).enable();
  return NextResponse.redirect(new URL(`/journal/${slug}`, request.url));
}
