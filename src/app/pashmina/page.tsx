import type { Metadata } from "next";

import { MovementList, SplitSection, TextLink } from "@/components/Editorial";
import { OrnamentRule } from "@/components/Ornament";
import { JournalRail } from "@/components/JournalRail";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { images } from "@/lib/images";
import { breadcrumbLd, definedTermsLd, jsonLdScript, seoBundle, webPageLd } from "@/lib/seo";

export const metadata: Metadata = seoBundle({
  title: "What Is Pashmina? A Plain Guide",
  description:
    "What Pashmina is, where it comes from, how it differs from cashmere, how to recognise pure Pashmina, and how Kani, Sozni and solids are made.",
  pathname: "/pashmina",
  image: images.pashminaMaterialHero,
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

export default async function PashminaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            webPageLd({
              path: "/pashmina",
              name: "What Is Pashmina? A Plain Guide",
              description:
                "What Pashmina is, where it comes from, how it differs from cashmere, how to recognise pure Pashmina, and how Kani, Sozni and solids are made.",
              image: images.pashminaMaterialHero,
            }),
            definedTermsLd("/pashmina", [
              {
                name: "Pashmina",
                description:
                  "The fine undercoat of the Changthangi goat, hand-spun and handwoven in Kashmir.",
              },
              {
                name: "Kani",
                description:
                  "A handwoven Kashmiri technique using small wooden bobbins and a coded talim.",
              },
              {
                name: "Sozni",
                description: "Fine hand embroidery worked onto woven Pashmina.",
              },
              {
                name: "GI",
                description:
                  "Geographical Indication, the legal certification that protects Kashmir Pashmina, Kani and Sozni.",
              },
            ]),
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Pashmina", path: "/pashmina" },
            ]),
          ]),
        }}
      />
      <PageHero
        image={images.pashminaMaterialHero}
        imageAlt="A pearl-grey Pashmina shawl in soft folds on a green upholstered settee"
        eyebrow="A Plain Guide"
        title="What Pashmina Is."
        subtitle="One fibre, from one animal, finished by hand in one valley — and the three ways we make it into a shawl."
        height="full"
        position="center"
        action={<TextLink to="/where-to-buy" tone="light">Enquire About a Piece</TextLink>}
      />
      <section className="bg-ivory px-5 py-20 sm:px-8 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-gold-ink">The Material</p>
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
          <p className="body-editorial mx-auto mt-12 max-w-3xl text-center text-charcoal/70">
            Prices are confirmed on enquiry and reflect the fibre, technique, size and time a piece
            takes to make. Sizes vary by piece; we confirm dimensions before dispatch. We deliver
            worldwide and accept returns within 14 days.{" "}
            <TextLink to="/where-to-buy">How to acquire a piece</TextLink>.
          </p>
        </div>
      </section>

      <section className="bg-forest px-5 py-16 text-center text-ivory sm:px-8 sm:py-20">
        <Reveal className="mx-auto max-w-3xl">
          <p className="eyebrow text-gold-ink">The Making</p>
          <h2 className="display-2 mt-4">One fibre. Three ways of making.</h2>
          <p className="body-editorial mx-auto mt-5 max-w-2xl text-ivory/78">
            Our name honours Kani, the most demanding of Kashmir’s weaves. Our collection also
            includes hand-embroidered Sozni and fine solids, all in 100% pure Pashmina.
          </p>
        </Reveal>
      </section>
      <SplitSection
        id="kani"
        image={images.pashminaKaniDetail}
        imageAlt="A pastel garden-lattice Kani shawl folded on stone, showing its woven motifs and striped border"
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
        image={images.pashminaSozniNeedle}
        imageAlt="An embroiderer's hands working delicate pink Sozni stitches on black Pashmina"
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
        action={<TextLink to="/sozni">More About Sozni</TextLink>}
        reverse
        tone="cream"
      />
      <SplitSection
        id="solids"
        image={images.pashminaSolidFolds}
        imageAlt="Unpatterned petrol-teal and dove-grey Pashmina shawls resting on a stone windowsill"
        eyebrow="03 · Solids"
        title="Plain, Unpatterned Pashmina."
        body={
          <>
            <p>
              A solid has no woven pattern or embroidery. With nothing to distract the eye, the
              fineness of the fibre, the evenness of the weave and the depth of the colour are what
              you see and feel.
            </p>
            <p>Our solids include single colours, reversible two-tone pieces and quiet checks.</p>
          </>
        }
        action={<TextLink to="/shade-card">View the Shade Card</TextLink>}
        imageRatio="portrait"
      />

      <section
        id="authenticity"
        className="scroll-mt-24 bg-ivory px-5 py-20 sm:px-8 sm:py-28 lg:py-36"
      >
        <div className="mx-auto max-w-5xl">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold-ink">Authenticity and GI</p>
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
          <div className="mt-12">
            <TextLink to="/journal/how-to-tell-if-a-pashmina-is-real">
              Read the Nine Checks in Full
            </TextLink>
          </div>
        </div>
      </section>

      <section id="care" className="scroll-mt-24 bg-cream px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold-ink">Care</p>
            <h2 className="display-2 mt-4">Looking After a Pashmina.</h2>
            <p className="body-editorial mt-6 text-charcoal/75">
              Cared for properly, a pure Pashmina lasts for decades.
            </p>
          </Reveal>
          <div className="mt-12">
            <MovementList items={care} tone="cream" />
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <TextLink to="/journal/how-to-wash-a-pashmina-shawl">
              Read the Full Care Guide
            </TextLink>
            <TextLink to="/where-to-buy">Where to Buy</TextLink>
          </div>
        </div>
      </section>

      <section className="bg-ivory px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-4xl">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold-ink">Common Questions</p>
            <h2 className="display-2 mt-4">Buying Pashmina, Plainly.</h2>
          </Reveal>
          <div className="mt-12 divide-y divide-charcoal/10 border-y border-charcoal/10">
            {[
              {
                q: "How much should a Pashmina cost?",
                a: "There is no single price. Fibre, fineness, technique, size and the time a piece takes all matter. A plain solid may take weeks; a Sozni piece can take months. We confirm the price of a specific piece on enquiry rather than publishing a misleading starting figure.",
              },
              {
                q: "What size should I choose?",
                a: "Sizes vary by piece and weave. A stole, a shawl and a grand shawl sit differently on the body. We confirm the exact dimensions and weight before dispatch, and we are happy to advise on proportion for the way you intend to wear it.",
              },
              {
                q: "Is Pashmina the same as cashmere?",
                a: "Pashmina is a type of cashmere: both are goat undercoat. Kashmir Pashmina is the finest grade, from the Changthangi goat, and the GI requires 100% pashm, hand-spun yarn and handweaving in Jammu & Kashmir. Most cashmere sold worldwide is coarser and machine-made.",
              },
              {
                q: "How do I check the GI?",
                a: "The GI label is issued after testing in Srinagar and carries a unique code. The Craft Development Institute publishes the registered specification; a seller should be able to explain the fibre, the maker and the technique. We arrange GI certification on request.",
              },
              {
                q: "How should I care for it?",
                a: "Dry clean only, with a cleaner who handles fine wool. Store it folded in a cotton or muslin cover, away from direct sun, and air it between wears. Do not hang it for long periods.",
              },
            ].map((item) => (
              <details key={item.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                  <h3 className="font-display text-[1.35rem] leading-snug font-light">{item.q}</h3>
                  <span
                    aria-hidden="true"
                    className="mt-1 text-gold-ink transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="body-editorial mt-4 max-w-2xl text-charcoal/75">{item.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-12 overflow-x-auto">
            <table className="w-full border-collapse text-left text-[0.95rem] text-charcoal/80">
              <caption className="mb-3 text-left font-display text-[1.15rem] font-light text-charcoal">
                Pashmina, cashmere and blends at a glance
              </caption>
              <thead>
                <tr className="border-b border-charcoal/25">
                  <th scope="col" className="py-3 pr-6 font-normal"> </th>
                  <th scope="col" className="py-3 pr-6 font-normal">Pashmina</th>
                  <th scope="col" className="py-3 pr-6 font-normal">Ordinary cashmere</th>
                  <th scope="col" className="py-3 font-normal">Blend</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-charcoal/10">
                  <th scope="row" className="py-3 pr-6 font-normal">Fibre</th>
                  <td className="py-3 pr-6">Changthangi undercoat</td>
                  <td className="py-3 pr-6">Other cashmere goats</td>
                  <td className="py-3">Cashmere with wool, silk or synthetic</td>
                </tr>
                <tr className="border-b border-charcoal/10">
                  <th scope="row" className="py-3 pr-6 font-normal">Fineness</th>
                  <td className="py-3 pr-6">GI maximum 16 microns</td>
                  <td className="py-3 pr-6">Varies</td>
                  <td className="py-3">Varies</td>
                </tr>
                <tr className="border-b border-charcoal/10">
                  <th scope="row" className="py-3 pr-6 font-normal">Spinning</th>
                  <td className="py-3 pr-6">Hand-spun for the GI</td>
                  <td className="py-3 pr-6">Often machine-spun</td>
                  <td className="py-3">Usually machine</td>
                </tr>
                <tr>
                  <th scope="row" className="py-3 pr-6 font-normal">GI</th>
                  <td className="py-3 pr-6">Kashmir Pashmina GI No. 46</td>
                  <td className="py-3 pr-6">No equivalent</td>
                  <td className="py-3">No</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-8 text-[0.9rem] leading-relaxed text-charcoal/60">
            Sources:{" "}
            <a
              href="https://cdiptqccgi.com/gi-crafts"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-gold/50"
            >
              Craft Development Institute GI specifications
            </a>
            ,{" "}
            <a
              href="https://search.ipindia.gov.in/GIRPublicSearch/Application/Details/46"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-gold/50"
            >
              IP India Kashmir Pashmina GI record
            </a>
            , and{" "}
            <a
              href="https://www.outlooktraveller.com/responsible-tourism/seven-handicrafts-of-jammu-and-kashmir-every-traveller-should-know"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-gold/50"
            >
              Outlook Traveller’s craft guide
            </a>
            .
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <TextLink to="/sozni">Read about Sozni embroidery</TextLink>
            <TextLink to="/journal/what-a-real-pashmina-costs">What a Pashmina Costs</TextLink>
            <TextLink to="/where-to-buy">Enquire About a Piece</TextLink>
          </div>
        </div>
      </section>
      <JournalRail category="Pashmina" categorySlug="pashmina" />
    </>
  );
}
