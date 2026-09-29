export const SITE = {
  name: "House of Kani",
  tagline: "The Art of Pashmina. The Soul of Kashmir.",
  // Placeholder details — replace with the maison's real particulars.
  email: "enquiries@houseofkani.com",
  privateEmail: "privateclient@houseofkani.com",
  pressEmail: "press@houseofkani.com",
  phone: "+91 000 000 0000",
  atelier: "The Atelier, Zaina Kadal, Srinagar, Kashmir",
  studio: "By appointment — London · Srinagar",
  social: [
    { label: "Instagram", href: "#" },
    { label: "Pinterest", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
} as const;

export const NAV = [
  { label: "The House", to: "/the-house" },
  { label: "Kani", to: "/kani" },
  { label: "Craftsmanship", to: "/craftsmanship" },
  { label: "Heritage", to: "/heritage" },
  { label: "Journal", to: "/journal" },
  { label: "Kashmir", to: "/kashmir" },
  { label: "Contact", to: "/contact" },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: "House",
    links: [
      { label: "The House", to: "/the-house" },
      { label: "Kani", to: "/kani" },
      { label: "Craftsmanship", to: "/craftsmanship" },
      { label: "Heritage", to: "/heritage" },
    ],
  },
  {
    title: "Discover",
    links: [
      { label: "Kashmir", to: "/kashmir" },
      { label: "Journal", to: "/journal" },
      { label: "Press", to: "/press" },
      { label: "Stockists", to: "/stockists" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Contact", to: "/contact" },
      { label: "Private Client", to: "/private-client" },
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
