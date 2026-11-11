export const SITE = {
  name: "House of Kani",
  tagline: "From Kashmir, Woven for the World.",
  descriptor:
    "A fourth-generation Kashmiri family house of 100% pure Pashmina — Kani, Sozni and fine solids, woven on our own looms and chosen from artisans we have known for years.",
  email: "contact.houseofkani@gmail.com",
  /** Digits only, E.164 without punctuation — used to build the wa.me link. */
  whatsapp: "919802732612",
  whatsappMessage: "Hello House of Kani, I would like to ask about a piece.",
  phone: "+91 98027 32612",
  location: "Hazratbal, Srinagar, Kashmir",
  appointments: "By appointment — in person in Hazratbal, Srinagar, or online",
  contactConfirmed: true,
  // The shop is not live yet; CTAs fall back to the Where to Buy page.
  etsyUrl: "",
  /**
   * Public profiles. Also emitted as `sameAs` in the Organization JSON-LD,
   * which is how search engines tie the site to the accounts.
   */
  social: [
    { label: "Instagram", href: "https://www.instagram.com/houseofkani/" },
    { label: "Pinterest", href: "https://www.pinterest.com/pinterest_houseofkani/" },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61595178571861" },
  ] as { label: string; href: string }[],
  /** Google Business Profile review link shown in the footer. */
  googleReview: "https://g.page/r/CarR_SPtpaNXEBM/review",
} as const;

export const ETSY_HREF = SITE.etsyUrl || "/where-to-buy";

/**
 * WhatsApp deep link. With no confirmed number the link falls back to the
 * contact page, the way an unlaunched Etsy shop falls back to Where to Buy.
 */
export const WHATSAPP_HREF = SITE.whatsapp
  ? `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappMessage)}`
  : "/contact";

/** True when the floating button can start a real WhatsApp conversation. */
export const WHATSAPP_IS_LIVE = WHATSAPP_HREF.startsWith("https://wa.me/");

export const NAV = [
  { label: "The House", to: "/the-house" },
  { label: "Pashmina", to: "/pashmina" },
  { label: "Kani", to: "/kani" },
  { label: "Craftsmanship", to: "/craftsmanship" },
  { label: "Journal", to: "/journal" },
  { label: "Where to Buy", to: "/where-to-buy" },
  { label: "Contact", to: "/contact" },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: "House",
    links: [
      { label: "The House", to: "/the-house" },
      { label: "Pashmina", to: "/pashmina" },
      { label: "Shade Card", to: "/shade-card" },
      { label: "Kani", to: "/kani" },
      { label: "Sozni", to: "/sozni" },
      { label: "Craftsmanship", to: "/craftsmanship" },
      { label: "Press", to: "/press" },
    ],
  },
  {
    title: "Discover",
    links: [
      { label: "Heritage", to: "/heritage" },
      { label: "Kashmir", to: "/kashmir" },
      { label: "Journal", to: "/journal" },
    ],
  },
  {
    title: "Visit & Buy",
    links: [
      { label: "Where to Buy", to: "/where-to-buy" },
      { label: "Appointments", to: "/private-client" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
    ],
  },
] as const;
