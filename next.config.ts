import path from "node:path";

import type { NextConfig } from "next";

// CMS media files are served by Payload (`/api/media/file/*`) and proxied by
// next/image. Always allow the stable CMS origin as well as the configured one:
// a stale/ephemeral CMS_URL must not break image optimisation. Vercel Blob is
// also allowed for any media stored with a direct blob URL.
const STABLE_CMS_ORIGIN = "https://house-of-kani-cms.vercel.app";
function safeUrl(value: string | undefined, fallback: string): URL {
  try {
    return new URL(value || fallback);
  } catch {
    return new URL(fallback);
  }
}
const cmsUrl = safeUrl(process.env.CMS_URL, STABLE_CMS_ORIGIN);
const mediaPattern = (url: URL): { protocol: "http" | "https"; hostname: string; port?: string; pathname: string } => ({
  protocol: url.protocol === "http:" ? "http" : "https",
  hostname: url.hostname,
  ...(url.port ? { port: url.port } : {}),
  pathname: "/api/media/file/**",
});
const cmsOrigins = [cmsUrl, safeUrl(STABLE_CMS_ORIGIN, STABLE_CMS_ORIGIN)];
if (cmsUrl.hostname !== "localhost") {
  cmsOrigins.push(safeUrl("http://localhost:3000", "http://localhost:3000"));
}
const remotePatterns = [
  ...new Map(cmsOrigins.map((url) => [url.origin, mediaPattern(url)])).values(),
  // Direct Vercel Blob URLs, in case media is served without the CMS proxy.
  {
    protocol: "https" as const,
    hostname: "**.public.blob.vercel-storage.com",
    pathname: "/**",
  },
];

const nextConfig: NextConfig = {
  // Lovable's build check expects the build output in dist/.
  // Vercel's Next.js builder looks for `.next`.
  distDir: process.env.VERCEL ? ".next" : "dist",
  // The workspace root is this project — silences the multi-lockfile warning.
  outputFileTracingRoot: path.resolve(),
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  images: {
    // WebP only — AVIF was decoding soft in-browser (naturalWidth << file pixels).
    formats: ["image/webp"],
    remotePatterns,
    // Retina full-bleed up to 2x 1280; 3840 only served 4K and inflated LCP.
    // Next will not invent pixels beyond the file's native width.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [82, 85, 90, 92],
  },
  webpack: (config, { dev }) => {
    // Next's watcher ignores `.next` only. This project writes dev output to
    // `dist/`, so those writes were retriggering a compile on every compile.
    if (dev) {
      // This Webpack build only accepts glob strings here. The defaults match
      // what Next ignores itself (`.git`, `.next`, `node_modules`).
      config.watchOptions = {
        ...config.watchOptions,
        ignored: ["**/.git/**", "**/node_modules/**", "**/.next/**", "**/dist/**"],
      };
    }
    return config;
  },
  async redirects() {
    return [{ source: "/stockists", destination: "/where-to-buy", permanent: true }];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
