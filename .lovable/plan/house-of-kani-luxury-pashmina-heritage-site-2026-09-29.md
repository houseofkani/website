# House of Kani — Luxury Pashmina Heritage Site

A complete editorial, non-commercial website for House of Kani: Victorian Kashmir meets contemporary luxury. No shop, no cart, no prices — a digital maison built to create desire and invite private enquiries.

## Look and feel

- Palette from the brief: Deep Forest `#17261F`, Heritage Burgundy `#4A2529`, Warm Ivory `#F4EFE6`, Antique Cream `#E9DFCF`, Aged Gold `#A88A58` (restrained), Charcoal `#242321`, Muted Stone `#8D8578`.
- Typography: high-contrast editorial serif for all display and storytelling (Cormorant Garamond), quiet sans for navigation and labels (uppercase, wide letter spacing). Fluid sizes so headings never break awkwardly on phones.
- The gold HK monogram you uploaded becomes the site mark — used in the header, as section ornaments, and in the footer. Also set as the browser icon.
- Alternating dark and ivory bands, engraved-style dividers, antique oval frames, and botanical line details — sparingly, exactly as the reference homepage shows.
- Motion: slow fades, gentle image reveals, restrained parallax. No bouncing, no scroll-jacking.
- Mobile designed first at 320–430px, then tablet and wide desktop; art-directed crops rather than shrunken desktop images.

## Pages

- `/` Homepage — all 11 sections in order: hero, brand introduction, the art of Kani, craftsmanship, Pashmina, Kani, heritage, Kashmir, journal, private client, closing statement.
- `/the-house` — maison manifesto in eight movements.
- `/kani` — the most detailed page: what Kani is, origins, process, tools, threads, pattern, artisan, finished textile, contemporary Kani.
- `/craftsmanship` — The Fibre, Thread, Loom, Hands, Pattern, Weaving, Finishing, Time, Heirloom.
- `/heritage` — editorial archive timeline: Origins, Tradition, Generations, Contemporary Kashmir, House of Kani.
- `/kashmir` — Land, People, Culture, Craft, Material, Memory. Cultural origin, not tourism.
- `/journal` — featured story plus category-filtered editorial grid.
- `/journal/{slug}` — five full articles written in brand voice, print-magazine typography, pull quotes, related stories.
- `/contact` — elegant enquiry form with general, private client, press and partnership routes.
- `/private-client` — concierge-led enquiry: private viewing, bespoke, collections, gifting, hospitality, interiors.
- `/press` — press statement, brand facts, downloadable-style press notes, media contact.
- `/stockists` — a short list of presentation locations, presented as salons rather than shops.
- `/privacy`, `/terms` — quiet, well-set legal pages.

Shared header (THE HOUSE · KANI · CRAFTSMANSHIP · HERITAGE · JOURNAL · KASHMIR · CONTACT) with an understated mobile menu, and the four-column editorial footer. No cart, wishlist or account anywhere.

## Imagery and words

I generate the full photographic set in the brand's palette: cinematic Kashmir landscapes, Dal Lake, heritage interiors, macro Pashmina fibre and weave, artisan hands at the loom, editorial portraits, plus engraved botanical ornaments. I write every headline and paragraph, and the five journal stories, in the maison's voice.

Contact details, addresses and social links are placeholders for now — tell me the real ones and I'll drop them in.

## Technical notes

- TanStack Start file routes under `src/routes`, one file per page plus a dynamic journal article route backed by a typed local content module (no database needed — nothing here is user data).
- Design tokens added to `src/styles.css` as oklch values in `@theme inline`; all components use semantic tokens, no hardcoded colours.
- Fonts loaded via `<link>` in the root route head.
- Reusable pieces: header, footer, ornament divider, framed image, editorial section, journal card, enquiry form. Forms validate and show a refined confirmation state; submissions are not stored yet (say the word if you want them emailed or saved).
- Every page gets its own title, description and social preview text.
