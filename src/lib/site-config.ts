import { SITE } from "@/lib/site";

export const siteConfig = {
  name: SITE.name,
  tagline: SITE.tagline,
  description: SITE.descriptor,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://houseofkani.com",
  email: SITE.email,
  contactConfirmed: SITE.contactConfirmed,
  ogImage: "/images/og-share-v1.webp",
} as const;
