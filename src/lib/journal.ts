import { images } from "@/lib/images";

export type JournalArticle = {
  slug: string;
  category: "Kani" | "Pashmina" | "Craft" | "Heritage" | "Kashmir" | "People";
  title: string;
  dek: string;
  image: string;
  imageAlt: string;
  readTime: string;
  date: string;
  body: { heading?: string; paragraphs: string[]; quote?: string }[];
};

export const articles: JournalArticle[] = [
  {
    slug: "the-art-of-kani-weaving",
    category: "Kani",
    title: "The Art of Kani Weaving",
    dek: "A language of colour, memory and patience, spoken one wooden needle at a time.",
    image: images.kaniLoom,
    imageAlt: "Artisan hands weaving a detailed Kani textile on a traditional loom",
    readTime: "8 min read",
    date: "Autumn 2026",
    body: [
      {
        paragraphs: [
          "There is no haste at a Kani loom. The weaver sits before a forest of warp threads, a coded pattern close at hand, and begins the long work of translation. Each small wooden needle carries a single colour. Each movement answers the one before it.",
          "The pattern is not printed upon the cloth. It enters the textile as the textile is made — colour and structure becoming inseparable.",
        ],
      },
      {
        heading: "A vocabulary held in the hand",
        paragraphs: [
          "The word kani names the slender wooden bobbins used to carry coloured weft through the warp. In the hands of a master, they become instruments of astonishing precision. A single shawl may ask for dozens of them, changing places thousands of times as a garden of boteh, cypress and blossom slowly appears.",
          "What looks fluid from a distance is built from decisions measured thread by thread.",
        ],
        quote:
          "A Kani is not decorated after it is woven. Its beauty is the act of weaving itself.",
      },
      {
        heading: "Time made visible",
        paragraphs: [
          "Fine Kani work can occupy a loom for seasons, sometimes years. This duration is not an inconvenience to be overcome; it is the source of the object’s character. The finished textile bears the quiet evidence of sustained attention — the cadence of hands, winter light across the workshop, knowledge passed between generations.",
          "To wear Kani is to carry time without weight.",
        ],
      },
    ],
  },
  {
    slug: "the-story-of-pashmina",
    category: "Pashmina",
    title: "The Story of Pashmina",
    dek: "From the high Himalayan plateau to the valley loom: the journey of an almost weightless fibre.",
    image: images.pashminaFibre,
    imageAlt: "Fine ivory pashmina fibre beside a softly woven textile",
    readTime: "7 min read",
    date: "Autumn 2026",
    body: [
      {
        paragraphs: [
          "Pashmina begins in a landscape of altitude, wind and astonishing cold. The Changthangi goat grows a fine inner down beneath its winter coat; when spring returns, this delicate fibre is gathered by hand.",
          "Its rarity is inseparable from the conditions that create it. Geography is not the backdrop to Pashmina. It is the first artisan.",
        ],
      },
      {
        heading: "The weight of light",
        paragraphs: [
          "Raw fibre travels into the Kashmir Valley, where it is cleaned, spun and woven through practices refined across centuries. The finest yarn is so delicate that the hand must learn a different kind of strength — one based on sensitivity rather than force.",
        ],
        quote: "Pashmina is warmth distilled to its lightest possible form.",
      },
      {
        heading: "A material with memory",
        paragraphs: [
          "A true Pashmina softens with intimacy. It remembers the shoulder, gathers the scent of cedar storage, and moves from one generation to the next without losing its essential grace.",
          "Its luxury lies not in novelty, but in the depth of a relationship that grows over time.",
        ],
      },
    ],
  },
  {
    slug: "inside-a-kashmiri-loom",
    category: "Craft",
    title: "Inside a Kashmiri Loom",
    dek: "In the half-light of the workshop, wood, thread and human rhythm make a world of their own.",
    image: images.journalWorkshop,
    imageAlt: "Traditional wooden looms inside a sunlit Kashmiri weaving workshop",
    readTime: "6 min read",
    date: "Late Summer 2026",
    body: [
      {
        paragraphs: [
          "A loom changes the architecture of a room. Its timber frame holds an ordered tension, a quiet field of possibility. Around it gather skeins, talim notations, worn tools and the habits of a working life.",
          "At first, the workshop seems almost silent. Then its music becomes clear: the shuttle, the beat, the low conversation, the pause to study a line.",
        ],
      },
      {
        heading: "The intelligence of rhythm",
        paragraphs: [
          "Weaving is repetitive only to the untrained eye. Every passage asks for judgment: the pull of a thread, the density of a field, the exact meeting of two colours. The master weaver reads with the fingers as much as the eyes.",
        ],
        quote: "The loom keeps time, but the hand gives it meaning.",
      },
      {
        heading: "A room across generations",
        paragraphs: [
          "Many of these skills are learned beside family, absorbed through watching before they are explained. The workshop is therefore more than a place of production. It is an archive made of gestures.",
        ],
      },
    ],
  },
  {
    slug: "the-gardens-of-kashmir",
    category: "Kashmir",
    title: "The Gardens of Kashmir",
    dek: "Water, mountain, cypress and flower — the landscape that taught Kani its enduring grammar.",
    image: images.journalGardens,
    imageAlt: "An autumn Mughal garden in Kashmir with fountains and mountain views",
    readTime: "5 min read",
    date: "Spring 2026",
    body: [
      {
        paragraphs: [
          "The gardens of Kashmir are compositions in movement. Water descends through stone channels; shadow travels across terraces; cypress and chinar frame glimpses of distant mountain. Their order is formal, but never still.",
          "For generations, these gardens have offered the weaver a living vocabulary.",
        ],
      },
      {
        heading: "Nature translated",
        paragraphs: [
          "A flower in a Kani shawl is rarely a literal copy. It is nature remembered, simplified and set into rhythm. The boteh curves like leaf, flame and cypress at once. Vines find symmetry without surrendering their sense of growth.",
        ],
        quote: "The garden enters the shawl not as illustration, but as memory.",
      },
      {
        heading: "A portable landscape",
        paragraphs: [
          "In the most accomplished textiles, the border becomes a path and the central field becomes open air. A shawl may hold the sensation of a whole garden: enclosure and distance, repetition and surprise, intimacy and grandeur.",
        ],
      },
    ],
  },
  {
    slug: "a-language-woven-in-thread",
    category: "People",
    title: "A Language Woven in Thread",
    dek: "A conversation with a master weaver about inheritance, discipline and the future of Kani.",
    image: images.journalArtisan,
    imageAlt: "Portrait of an elderly Kashmiri master weaver beside his loom",
    readTime: "9 min read",
    date: "Winter 2026",
    body: [
      {
        paragraphs: [
          "He does not remember the first time he entered a weaving room. The loom belonged to the landscape of childhood: timber in the corner, yarn above the stove, his father’s hands moving with a certainty that seemed as natural as speech.",
          "By fourteen, he could follow a simple talim. By twenty, he understood how much there was still to learn.",
        ],
      },
      {
        heading: "Knowledge without noise",
        paragraphs: [
          "Mastery reveals itself in restraint. He speaks of tension, edge and colour in the concise language of someone who has spent a lifetime correcting small things. The hand, he says, must remain alert even when the pattern is familiar.",
        ],
        quote:
          "We do not command the thread. We listen until it tells us what the cloth needs.",
      },
      {
        heading: "The next pair of hands",
        paragraphs: [
          "Tradition survives when it is practiced, not merely admired. His hope is not that young weavers repeat the past exactly, but that they learn it deeply enough to make work that carries its discipline forward.",
          "Every finished Kani is thus both inheritance and proposition: an old language, spoken once more in the present tense.",
        ],
      },
    ],
  },
];

export const getArticle = (slug: string) =>
  articles.find((article) => article.slug === slug);
