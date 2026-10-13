export const SITE = {
  name: "House of Kani",
  tagline: "From Kashmir, Woven for the World.",
  descriptor:
    "A fourth-generation Kashmiri family house of 100% pure Pashmina — Kani, Sozni and fine solids, woven on our own looms and chosen from artisans we have known for years.",
  // Placeholder details — replace with the house's confirmed particulars before launch.
  email: "enquiries@houseofkani.com",
  phone: "+91 000 000 0000",
  location: "Srinagar, Kashmir",
  appointments: "By appointment — in person in Srinagar, or online",
  contactConfirmed: false,
  // Empty until the Etsy shop is live; links fall back to the Where to Buy page.
  etsyUrl: "",
  social: [] as { label: string; href: string }[],
} as const;

export const ETSY_HREF = SITE.etsyUrl || "/where-to-buy";

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
      { label: "Craftsmanship", to: "/craftsmanship" },
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
