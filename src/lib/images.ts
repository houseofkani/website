/** Optimized public image paths (AVIF preferred via next/image formats). */
export const images = {
  victorianKaniHero: "/images/victorian-kani-hero.webp",
  heroHome: "/images/hero-home.webp",
  closingDrape: "/images/closing-drape.webp",
  privateClient: "/images/private-client.webp",
  kaniPattern: "/images/kani-pattern.webp",
  craftsmanshipHall: "/images/craftsmanship-hall.webp",
  kaniLoom: "/images/kani-loom.webp",
  originalSozni: "/images/original-sozni-editorial.webp",
  originalSolid: "/images/original-solid-pashmina.webp",
  pashminaFibre: "/images/pashmina-fibre.webp",
  journalArtisan: "/images/journal-artisan.webp",
  journalWorkshop: "/images/journal-workshop.webp",
  journalGardens: "/images/journal-gardens.webp",
  heritageArchive: "/images/heritage-archive.webp",
  kashmirLake: "/images/kashmir-lake.webp",
  kashmirDusk: "/images/kashmir-dusk.webp",
  threads: "/images/threads.webp",
  logo: "/images/house-of-kani-logo.webp",
  ornament: "/images/ornament-flourish.webp",
} as const;

export type ImageKey = keyof typeof images;
