import { SITE } from "@/lib/site";

export const siteConfig = {
  name: SITE.name,
  tagline: SITE.tagline,
  description: SITE.descriptor,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://houseofkani.com",
  email: SITE.email,
  atelier: SITE.atelier,
  ogImage: "/images/victorian-kani-hero.webp",
} as const;
