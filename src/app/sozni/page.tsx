import type { Metadata } from "next";

import { MovementList, PullQuote, SplitSection, TextLink } from "@/components/Editorial";
import { OrnamentRule } from "@/components/Ornament";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { images } from "@/lib/images";
import {
  breadcrumbLd,
  definedTermsLd,
  jsonLdScript,
  seoBundle,
  webPageLd,
} from "@/lib/seo";

export const metadata: Metadata = seoBundle({
  title: "Sozni Embroidery: The Needlework of Kashmir",
  description:
    "Sozni is the fine hand embroidery of Kashmir, worked on woven Pashmina. Learn how it is made, what maheen kari means, how to recognise handwork and why it has its own GI.",
  pathname: "/sozni",
  image: images.typeSozniGold,
  type: "article",
});

const stages = [
  {
    index: "I",
    title: "The design",
    body: "A naqash draws the motif — a border, a scattered buti, a field of vines or an all-over composition. The drawing is the architecture the embroiderer will follow.",
  },
  {
    index: "II",
    title: "The tracing",
    body: "The design is transferred onto the woven Pashmina. On a fine piece the lines must be faint enough to disappear under the needle and precise enough to keep the repeat true.",
  },
  {
    index: "III",
    title: "The stitching",
    body: "The sozankar works the motif by hand with silk or viscose thread. The sozni stitch, darn stitch and stem stitch do most of the work; buttonhole, herringbone, chain, satin and knot stitches appear in smaller proportions.",
  },
  {
    index: "IV",
    title: "The finishing",
    body: "The embroidered cloth is cleaned, pressed and checked. The reverse is inspected as closely as the front: it shows whether the work is hand-done and how carefully the threads have been carried.",
  },
];

const recognise = [
  {
    index: "01",
    title: "Look at the reverse",
    body: "Hand embroidery shows small, slightly uneven stitches on the back. Machine work is regular to the point of monotony, and may show long floating threads.",
  },
  {
    index: "02",
    title: "Read the stitch",
    body: "Fine Sozni is worked with very thin thread and tiny stitches. The motif should have a slight living variation, not the dead uniformity of a printed or machine-embroidered pattern.",
  },
  {
    index: "03",
    title: "Ask about the GI",
    body: "Kashmir Sozni is a registered Geographical Indication (GI No. 48). A GI label is issued after testing in Srinagar, and carries a unique code. We arrange GI certification on request.",
  },
  {
    index: "04",
    title: "Know the motifs",
    body: "The established vocabulary includes the chinar leaf, cypress, almond, vine and flower. A good piece uses them with rhythm and space, not as a repeating wallpaper.",
  },
];

const questions = [
  {
    q: "Is Sozni the same as Kani?",
    a: "No. Kani is woven: the pattern is formed on the loom with small wooden bobbins and a coded talim. Sozni is embroidered after the cloth is woven, with a needle and fine thread. They are separate crafts with separate GI registrations.",
  },
  {
    q: "What is maheen kari?",
    a: "Maheen kari means “fine work” in Kashmir. It describes the finest grade of Sozni, worked with very thin thread and tiny stitches. A densely worked maheen kari piece can take months to complete.",
  },
  {
    q: "How long does Sozni take?",
    a: "A narrow border can be worked in weeks. A scattered motif takes longer. An all-over composition, especially in fine maheen kari, can occupy an embroiderer for months. The time is part of what the piece costs.",
  },
  {
    q: "How should I care for a Sozni shawl?",
    a: "Dry clean only, with a cleaner who handles fine wool and embroidery. Store it folded in a cotton or muslin cover, away from direct sun, and air it between wears. Do not hang it for long periods; the weight can distort the cloth.",
  },
  {
    q: "Does Sozni have GI protection?",
    a: "Yes. Kashmir Sozni has its own Geographical Indication, No. 48, separate from Kashmir Pashmina and Kani. The Craft Development Institute in Srinagar publishes the registered specification and the testing process.",
  },
];

export default function SozniPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            webPageLd({
              path: "/sozni",
              name: "Sozni Embroidery: The Needlework of Kashmir",
              description:
                "Sozni is the fine hand embroidery of Kashmir, worked on woven Pashmina. Learn how it is made, what maheen kari means, how to recognise handwork and why it has its own GI.",
              image: images.typeSozniGold,
            }),
            definedTermsLd("/sozni", [
              {
                name: "Sozni",
                description:
                  "Fine hand embroidery worked on woven Pashmina in Kashmir, with its own GI registration.",
              },
              {
                name: "Maheen kari",
                description:
                  "The finest grade of Kashmiri Sozni, worked with very thin thread and tiny stitches.",
              },
              {
                name: "Sozankar",
                description: "A Kashmiri embroiderer who works Sozni by hand.",
              },
              {
                name: "GI",
                description:
                  "Geographical Indication; Kashmir Sozni is registered under GI No. 48.",
              },
            ]),
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Sozni", path: "/sozni" },
            ]),
          ]),
        }}
      />
      <PageHero
        image={images.typeSozniGold}
        imageAlt="A gold Pashmina shawl with a hand-worked paisley border, laid beside a brass vessel"
        eyebrow="Sozni Embroidery"
        title="The Needle Remembers the Garden."
        subtitle="Fine hand embroidery on woven Pashmina — a separate craft from Kani, with its own grammar, its own time and its own GI."
        height="full"
        action={<TextLink to="/where-to-buy" tone="light">Enquire About a Sozni Piece</TextLink>}
      />

      <section className="bg-ivory px-5 py-20 sm:px-8 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-5xl">
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-gold-ink">What Is Sozni?</p>
            <h2 className="display-1 mt-4">Embroidery, Not Weaving.</h2>
            <p className="body-editorial mt-7 text-charcoal/80">
              Sozni is the fine hand embroidery of Kashmir. It is worked on a woven Pashmina ground,
              after the cloth has left the loom. A sozankar draws the motif with a needle and fine
              silk or viscose thread: a border, a scattered buti, a field of vines or a surface
              covered edge to edge. The pattern sits on the cloth rather than inside it.
            </p>
            <p className="body-editorial mt-5 text-charcoal/75">
              That distinction matters. Kani is woven; Sozni is embroidered. The two are often
              confused in the market, but they demand different skills and are protected by separate
              Geographical Indications. The{" "}
              <a
                href="https://cdiptqccgi.com/gi-crafts"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-gold/50"
              >
                Craft Development Institute in Srinagar
              </a>{" "}
              records Kashmir Sozni as GI No. 48.
            </p>
            <OrnamentRule className="mt-10" />
          </Reveal>
          <div className="mt-16">
            <MovementList items={stages} />
          </div>
        </div>
      </section>

      <SplitSection
        image={images.pashminaSozniNeedle}
        imageAlt="An embroiderer's hands working delicate pink Sozni stitches on black Pashmina"
        eyebrow="The Hand"
        title="A Stitch Small Enough to Disappear."
        body={
          <>
            <p>
              The finest Sozni is known as maheen kari — “fine work”. The thread is very thin, the
              stitches are tiny, and the motif is built slowly. At a distance the embroidery reads as
              a change in the surface of the cloth; close up, it resolves into thousands of decisions.
            </p>
            <p>
              The sozni stitch, darn stitch and stem stitch do most of the work. Buttonhole,
              herringbone, chain, satin and knot stitches appear in smaller proportions, chosen for a
              particular line, leaf or flower.
            </p>
          </>
        }
        tone="cream"
        imageRatio="landscape"
      />

      <section className="bg-ivory px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold-ink">Hand or Machine?</p>
            <h2 className="display-2 mt-4">How to Recognise Hand-Worked Sozni.</h2>
            <p className="body-editorial mt-6 text-charcoal/75">
              Machine embroidery has made “Sozni-style” work common. These signs point to the real
              thing.
            </p>
          </Reveal>
          <div className="mt-12">
            <MovementList items={recognise} />
          </div>
        </div>
      </section>

      <SplitSection
        image={images.sozniTaupeWindow}
        imageAlt="A taupe Pashmina shawl with fine Sozni embroidery worn at a window"
        eyebrow="The Motif"
        title="The Garden, Worked in Thread."
        body={
          <>
            <p>
              Sozni draws on the same visual world as Kani: the chinar leaf, the cypress, the almond,
              the vine and the flower. The difference is the hand. A woven motif is built into the
              structure of the cloth; an embroidered motif sits on its surface, catching the light
              differently as the shawl moves.
            </p>
            <p>
              The best pieces leave space around the motif. Embroidery is not a wallpaper; it is a
              composition, and the ground is part of the design.
            </p>
          </>
        }
        reverse
        imageRatio="portrait"
      />

      <section className="bg-cream px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-4xl">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold-ink">Common Questions</p>
            <h2 className="display-2 mt-4">Sozni, Plainly.</h2>
          </Reveal>
          <div className="mt-12 divide-y divide-charcoal/10 border-y border-charcoal/10">
            {questions.map((item) => (
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
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <TextLink to="/where-to-buy">Enquire About a Sozni Piece</TextLink>
            <TextLink to="/pashmina">Read the Pashmina Guide</TextLink>
            <TextLink to="/kani">See How Kani Is Woven</TextLink>
          </div>
        </div>
      </section>

      <section className="bg-burgundy px-5 py-20 text-ivory sm:px-8 sm:py-28">
        <PullQuote cite="House of Kani">
          A woven pattern is built into the cloth. An embroidered pattern is a conversation between
          the cloth and the hand.
        </PullQuote>
      </section>
    </>
  );
}
