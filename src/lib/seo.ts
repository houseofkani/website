import type { Metadata } from "next";

import { FEED_ALTERNATES } from "@/lib/feed";
import { SITE } from "@/lib/site";
import { siteConfig } from "@/lib/site-config";

export function canonicalPathname(pathname: string): string {
  const path = pathname.split("?")[0] || "/";
  return path.startsWith("/") ? path : `/${path}`;
}

export function absoluteUrl(pathname: string, storeUrl: string = siteConfig.url): string {
  const path = canonicalPathname(pathname);
  return `${storeUrl.replace(/\/$/, "")}${path === "/" ? "" : path}`;
}

export function absoluteImageUrl(
  image: string | undefined,
  storeUrl: string = siteConfig.url,
): string | undefined {
  if (!image) return undefined;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return absoluteUrl(image.startsWith("/") ? image : `/${image}`, storeUrl);
}

export type SeoBundleOptions = {
  title: string;
  description?: string;
  pathname?: string;
  /** Verbatim canonical (may include a query, e.g. `/journal?page=2`). */
  canonical?: string;
  image?: string;
  images?: Array<string | { url: string; width?: number; height?: number; alt?: string }>;
  type?: "website" | "article";
  robots?: "noindex";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
};

/** Consistent metadata for indexable routes — canonical, Open Graph, and Twitter. */
export function seoBundle(options: SeoBundleOptions): Metadata {
  const metadata: Metadata = {
    title: options.title,
    description: options.description,
  };

  if (options.authors?.length) {
    metadata.authors = options.authors.map((name) => ({ name }));
  }

  const canonical =
    options.canonical ?? (options.pathname ? canonicalPathname(options.pathname) : undefined);
  if (canonical) {
    metadata.alternates = { canonical, types: FEED_ALTERNATES };
  } else {
    metadata.alternates = { types: FEED_ALTERNATES };
  }

  if (options.robots === "noindex") {
    metadata.robots = { index: false, follow: false };
  }

  const ogImages = options.images?.length
    ? options.images.map((img) =>
        typeof img === "string"
          ? { url: absoluteImageUrl(img) ?? img }
          : { ...img, url: absoluteImageUrl(img.url) ?? img.url },
      )
    : options.image
      ? [{ url: absoluteImageUrl(options.image) ?? options.image }]
      : [{ url: absoluteImageUrl(siteConfig.ogImage) ?? siteConfig.ogImage }];

  metadata.openGraph = {
    title: options.title,
    description: options.description,
    url: options.pathname ? absoluteUrl(options.pathname) : undefined,
    siteName: siteConfig.name,
    locale: "en_GB",
    type: options.type ?? "website",
    images: ogImages,
    ...(options.type === "article" && options.publishedTime
      ? { publishedTime: options.publishedTime }
      : {}),
    ...(options.type === "article" && options.modifiedTime
      ? { modifiedTime: options.modifiedTime }
      : {}),
    ...(options.type === "article" && options.authors?.length ? { authors: options.authors } : {}),
  };

  const twitterImage = options.image
    ? absoluteImageUrl(options.image)
    : (ogImages[0]?.url as string | undefined);

  metadata.twitter = {
    card: "summary_large_image",
    title: options.title,
    description: options.description,
    ...(twitterImage ? { images: [twitterImage] } : {}),
  };

  return metadata;
}

export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const BRAND_LOGO = "/images/house-of-kani-emblem-v1.png";

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    ...(siteConfig.contactConfirmed ? { email: siteConfig.email } : {}),
    ...(SITE.social.length ? { sameAs: SITE.social.map((profile) => profile.href) } : {}),
    logo: {
      "@type": "ImageObject",
      url: absoluteImageUrl(BRAND_LOGO),
      width: 1024,
      height: 1024,
    },
    image: absoluteImageUrl(siteConfig.ogImage),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hazratbal",
      addressRegion: "Jammu and Kashmir",
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: siteConfig.email,
        telephone: SITE.phone,
        availableLanguage: ["en", "hi", "ur"],
        areaServed: "Worldwide",
      },
    ],
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: { "@type": "Organization", name: siteConfig.name },
  };
}

export function breadcrumbLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function blogPostingLd(options: {
  title: string;
  description: string;
  path: string;
  image: string;
  datePublished?: string;
  dateModified?: string;
  author?: {
    name: string;
    designation?: string;
    bio?: string;
  };
}) {
  const author = options.author ?? { name: siteConfig.name };
  const isOrganization = author.name === siteConfig.name;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: options.title,
    description: options.description,
    image: absoluteImageUrl(options.image),
    url: absoluteUrl(options.path),
    mainEntityOfPage: absoluteUrl(options.path),
    author: isOrganization
      ? { "@type": "Organization", name: author.name }
      : {
          "@type": "Person",
          name: author.name,
          ...(author.designation ? { jobTitle: author.designation } : {}),
          ...(author.bio ? { description: author.bio } : {}),
          worksFor: { "@type": "Organization", name: siteConfig.name },
        },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteImageUrl(BRAND_LOGO),
        width: 1024,
        height: 1024,
      },
    },
    ...(options.datePublished ? { datePublished: options.datePublished } : {}),
    ...(options.dateModified ? { dateModified: options.dateModified } : {}),
  };
}

export function itemListLd(options: {
  name: string;
  path: string;
  items: Array<{ name: string; path: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: options.name,
    url: absoluteUrl(options.path),
    itemListElement: options.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}
