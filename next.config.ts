import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  images: {
    // WebP only — AVIF was decoding soft in-browser (naturalWidth << file pixels).
    formats: ["image/webp"],
    // Include retina full-bleed widths so heroes can use full source (e.g. 2528px).
    // Next will not invent pixels beyond the file's native width.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Prefer near-source fidelity; size wins come from responsive widths + WebP.
    qualities: [85, 90, 92, 100],
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
