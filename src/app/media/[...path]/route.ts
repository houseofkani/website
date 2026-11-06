import { NextResponse } from "next/server";

/**
 * Public media proxy.
 *
 * The CMS serves media with `X-Robots-Tag: noindex, noimageindex`. Social
 * cards, JSON-LD and feeds must not point at that host, so this route exposes
 * the same files on the public website origin. Only image paths are allowed.
 */
export const revalidate = 604800;

const CMS_ORIGIN = (process.env.CMS_URL ?? "https://cms.houseofkani.com").replace(/\/$/, "");

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;

  if (
    path.length === 0 ||
    path.some((part) => !part || part.includes("..") || part.includes("/") || part.includes("\\"))
  ) {
    return new NextResponse(null, { status: 404 });
  }

  const filename = path.map((part) => encodeURIComponent(part)).join("/");
  const upstream = `${CMS_ORIGIN}/api/media/file/${filename}`;

  let response: Response;
  try {
    response = await fetch(upstream, {
      headers: { Accept: "image/*" },
      next: { revalidate: 604800 },
      signal: AbortSignal.timeout(15_000),
    });
  } catch {
    return new NextResponse(null, { status: 502 });
  }

  if (!response.ok || !response.body) {
    return new NextResponse(null, { status: response.status === 404 ? 404 : 502 });
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.startsWith("image/")) {
    return new NextResponse(null, { status: 404 });
  }

  const headers = new Headers({
    "Content-Type": contentType,
    "Cache-Control": "public, max-age=604800, stale-while-revalidate=86400",
    "X-Content-Type-Options": "nosniff",
  });
  const contentLength = response.headers.get("content-length");
  if (contentLength) headers.set("Content-Length", contentLength);

  return new NextResponse(response.body, { headers });
}
