import type { Metadata } from "next";

import { MovementList, SplitSection, TextLink } from "@/components/Editorial";
import { OrnamentRule } from "@/components/Ornament";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { images } from "@/lib/images";
import { breadcrumbLd, jsonLdScript, seoBundle } from "@/lib/seo";

export const metadata: Metadata = seoBundle({
  title: "What Is Pashmina? A Plain Guide",
  description:
    "What Pashmina is, where it comes from, how it differs from cashmere, how to recognise pure Pashmina, and how Kani, Sozni and solids are made.",
  pathname: "/pashmina",
  image: images.victorianKaniHero,
  type: "article",
});

const material = [
  {
    index: "01",
    title: "Where it comes from",
    body: "Pashmina is the soft undercoat that the Changthangi goat grows against the winters of the Changthang plateau in Ladakh, more than 4,000 metres above sea level. Herders comb it out by hand in spring, when the goats moult.",
  },
  {
    index: "02",
    title: "How fine it is",
    body: "A Pashmina fibre is roughly 12 to 16 microns across — about a sixth of a human hair. The finer the fibre, the lighter, softer and warmer the cloth.",
  },
  {
    index: "03",
    title: "Pashmina and cashmere",
    body: "Pashmina is a type of cashmere: both are goat undercoat. Pashmina is the finest grade, from one breed in one region, and it is traditionally spun and woven by hand in Kashmir. Most cashmere sold worldwide is coarser and machine-made.",
  },
  {
    index: "04",
    title: "Pure or blended",
    body: "Much of what is sold as “pashmina” is a blend with silk, wool or viscose, and some contains none at all. Everything House of Kani sells is 100% pure Pashmina, and we say so on every piece.",
  },
  {
    index: "05",
    title: "Why prices vary",
    body: "The price of a shawl follows its fibre, its fineness and above all its making. A plain solid may take weeks; a hand-embroidered Sozni, months; a fully woven Kani, many months or longer. A low price for an elaborate piece is a warning sign.",
  },
];

const recognise = [
  {
    index: "I",
    title: "Ask for the composition",
    body: "A genuine seller states the fibre plainly. “Pashmina feel” or “cashmere blend” means it is not pure Pashmina.",
  },
  {
    index: "II",
    title: "Look at the reverse",
    body: "Hand embroidery shows small, slightly uneven stitches on the back. In hand-woven Kani, the reverse shows the colour changes of the weft. Machine work is perfectly regular on both sides.",
  },
  {
    index: "III",
    title: "Feel the weight and warmth",
    body: "Pure Pashmina is very light for its size and warms quickly against the skin. It feels soft and slightly matte, not slippery or shiny.",
  },
  {
    index: "IV",
    title: "Ask about GI certification",
    body: "Kashmir Pashmina, Kani shawls and Sozni embroidery are registered Geographical Indications in India. A GI label is issued in Srinagar after the piece is tested, and carries a unique code.",
  },
];

const care = [
  {
    index: "Clean",
    title: "Dry clean only",
    body: "Use a dry cleaner who handles fine wool. Do not machine-wash or wring a Pashmina.",
  },
  {
    index: "Store",
    title: "Fold, don’t hang",
    body: "Store it folded in a cotton or muslin cover, away from direct sun. Cedar or neem helps keep moths away.",
  },
  {
    index: "Wear",
    title: "Let it rest",
    body: "Air it between wears, and put on perfume before the shawl rather than onto it. Lift small pills away gently by hand.",
  },
];

export default function PashminaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Pashmina", path: "/pashmina" },
            ]),
          ),
        }}
      />
      <PageHero
        image={images.victorianKaniHero}
        imageAlt="A woman wearing a lilac paisley Pashmina shawl in a carved wooden Kashmiri interior"
        eyebrow="A Plain Guide"
        title="What Pashmina Is."
        subtitle="One fibre, from one animal, finished by hand in one valley — and the three ways we make it into a shawl."
        height="full"
        position="center"
      />
      <section className="bg-ivory px-5 py-20 sm:px-8 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-gold">The Material</p>
            <h2 className="display-1 mt-5">Pashmina, Plainly.</h2>
            <p className="body-editorial mt-7 text-charcoal/80">
              Pashmina is the finest grade of cashmere: the winter undercoat of the Changthangi goat
              of Ladakh. In Kashmir it is cleaned, spun, woven and finished by hand into shawls,
              stoles and wraps. The word is widely misused, so it is worth knowing what it really
              means.
            </p>
            <OrnamentRule className="mt-10" />
          </Reveal>
          <div className="mt-16">
            <MovementList items={material} />
          </div>
        </div>
      </section>

      <section className="bg-forest px-5 py-16 text-center text-ivory sm:px-8 sm:py-20">
        <Reveal className="mx-auto max-w-3xl">
          <p className="eyebrow text-gold">The Making</p>
          <h2 className="display-2 mt-4">One fibre. Three ways of making.</h2>
          <p className="body-editorial mx-auto mt-5 max-w-2xl text-ivory/78">
            Our name honours Kani, the most demanding of Kashmir’s weaves. Our collection also
            includes hand-embroidered Sozni and fine solids, all in 100% pure Pashmina.
          </p>
        </Reveal>
      </section>
      <SplitSection
        id="kani"
        image={images.kaniSaffronRod}
        imageAlt="An ivory Pashmina shawl with a pastel floral garden and striped borders on a walnut table"
        eyebrow="01 · Kani"
        title="Pattern Woven Into the Cloth."
        body={
          <>
            <p>
              In Kani, the pattern is made during weaving. The weaver passes small wooden bobbins
              (kanis), each carrying one colour, through the warp, following a coded pattern sheet
              called a talim.
            </p>
            <p>
              Because every motif is built thread by thread, a large Kani shawl can stay on the loom
              for many months.
            </p>
          </>
        }
        action={<TextLink to="/kani">More About Kani</TextLink>}
      />
      <SplitSection
        id="sozni"
        image={images.sozniTaupeWindow}
        imageAlt="A woman by a window wearing a taupe Pashmina shawl with coral Sozni embroidery"
        eyebrow="02 · Sozni"
        title="Embroidered by Needle."
        body={
          <>
            <p>
              Sozni is hand embroidery worked with a fine needle on woven Pashmina. It can be a
              narrow border, scattered motifs or a surface covered edge to edge.
            </p>
            <p>
              The finest needlework, known in Kashmir as maheen kari (“fine work”), uses very thin
              thread and tiny stitches. A densely worked piece can take months to complete.
            </p>
          </>
        }
        reverse
        tone="cream"
      />
      <SplitSection
        id="solids"
        image={images.originalSolid}
        imageAlt="A deep burgundy solid Pashmina shawl draped over a wooden chair"
        eyebrow="03 · Solids"
        title="Plain, Unpatterned Pashmina."
        body={
          <>
            <p>
              A solid has no woven pattern or embroidery. With nothing to distract the eye, the
              fineness of the fibre, the evenness of the weave and the depth of the colour are what
              you see and feel.
            </p>
            <p>
              Our solids include single colours, reversible two-tone pieces and quiet checks.
            </p>
          </>
        }
        action={<TextLink to="/shade-card">View the Shade Card</TextLink>}
        imageRatio="portrait"
      />

      <section id="authenticity" className="scroll-mt-24 bg-ivory px-5 py-20 sm:px-8 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-5xl">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold">Authenticity and GI</p>
            <h2 className="display-1 mt-4">How to Recognise Pure Pashmina.</h2>
            <p className="body-editorial mt-7 text-charcoal/75">
              No single test is perfect, but together these checks will tell you a great deal. With
              every House of Kani piece, we state the technique, the fibre and the size, and we
              arrange GI certification on request.
            </p>
          </Reveal>
          <div className="mt-16">
            <MovementList items={recognise} />
          </div>
        </div>
      </section>

      <section id="care" className="scroll-mt-24 bg-cream px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold">Care</p>
            <h2 className="display-2 mt-4">Looking After a Pashmina.</h2>
            <p className="body-editorial mt-6 text-charcoal/75">
              Cared for properly, a pure Pashmina lasts for decades.
            </p>
          </Reveal>
          <div className="mt-12">
            <MovementList items={care} tone="cream" />
          </div>
          <div className="mt-12">
            <TextLink to="/where-to-buy">Where to Buy</TextLink>
          </div>
        </div>
      </section>
    </>
  );
}
