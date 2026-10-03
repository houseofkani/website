/** Editorial image paths — JPG masters; next/image encodes AVIF/WebP once at request time. */
export const images = {
  victorianKaniHero: "/images/victorian-kani-hero-wide.jpg",
  heroHome: "/images/hero-home.jpg",
  closingDrape: "/images/closing-atelier-wide.jpg",
  privateClient: "/images/private-client.jpg",
  kaniPattern: "/images/kani-pattern.jpg",
  craftsmanshipHall: "/images/craftsmanship-hall.jpg",
  kaniLoom: "/images/kani-loom.jpg",
  originalSozni: "/images/original-sozni-editorial.jpg",
  originalSolid: "/images/original-solid-pashmina.jpg",
  pashminaFibre: "/images/pashmina-fibre.jpg",
  journalArtisan: "/images/journal-artisan.jpg",
  journalWorkshop: "/images/journal-workshop.jpg",
  journalGardens: "/images/journal-gardens.jpg",
  heritageArchive: "/images/heritage-archive.jpg",
  kashmirLake: "/images/kashmir-lake.jpg",
  kashmirDusk: "/images/kashmir-dusk.jpg",
  threads: "/images/threads.jpg",
  ornament: "/images/ornament-flourish.webp",
} as const;

export type ImageKey = keyof typeof images;
