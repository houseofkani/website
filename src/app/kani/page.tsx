import type { Metadata } from "next";

import { MovementList, PullQuote, SplitSection, TextLink } from "@/components/Editorial";
import { OptimizedImage } from "@/components/OptimizedImage";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { images } from "@/lib/images";
import { breadcrumbLd, definedTermsLd, jsonLdScript, seoBundle, webPageLd } from "@/lib/seo";

export const metadata: Metadata = seoBundle({
  title: "Kani Weaving: How a Kani Shawl Is Made",
  description:
    "What Kani weaving is, how a Kani shawl is woven with bobbins and a talim, how long it takes, and how to tell hand-woven Kani from machine imitations.",
  pathname: "/kani",
  image: images.kaniWeaverHero,
  type: "article",
});

const movements = [
  {
    index: "I",
    title: "Origins",
    body: "Kani weaving grew in Kashmir from the 15th century and reached its height in the Mughal period, when garden imagery from Persian art met the skill of the valley’s weavers.",
  },
  {
    index: "II",
    title: "The Talim",
    body: "A talim is a written colour code that turns the designer’s drawing into instructions for the weaver, line by line across the width of the cloth.",
  },
  {
    index: "III",
    title: "The Kani",
    body: "Small wooden bobbins, each carrying its own colour, move through selected warp threads. Their name came to describe the entire tradition.",
  },
  {
    index: "IV",
    title: "The Pattern",
    body: "The best-known Kani motif is the boteh — the teardrop shape known abroad as paisley — set among cypress, iris and climbing vines.",
  },
  {
    index: "V",
    title: "The Time",
    body: "A weaver may complete only a few centimetres of a dense pattern in a day. A large, fully patterned shawl can take many months, sometimes more than a year.",
  },
];

const recognise = [
  {
    index: "01",
    title: "The reverse",
    body: "On hand-woven Kani, the back shows where each coloured weft thread turns back at the edge of its motif. Machine jacquard looks evenly mechanical, often with long floating threads.",
  },
  {
    index: "02",
    title: "Small irregularities",
    body: "A motif repeated across a hand-woven shawl varies very slightly each time. Perfect sameness suggests a machine.",
  },
  {
    index: "03",
    title: "Weight and price",
    body: "Genuine Kani is woven in pure Pashmina and takes months. A large, densely patterned shawl offered cheaply is not hand-woven Kani.",
  },
  {
    index: "04",
    title: "GI certification",
    body: "Kani shawls are a registered Geographical Indication. We arrange GI certification for our Kani pieces on request.",
  },
];

export default function KaniPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            webPageLd({
              path: "/kani",
              name: "Kani Weaving: How a Kani Shawl Is Made",
              description:
                "What Kani weaving is, how a Kani shawl is woven with bobbins and a talim, how long it takes, and how to tell hand-woven Kani from machine imitations.",
              image: images.kaniWeaverHero,
            }),
            definedTermsLd("/kani", [
              {
                name: "Kani",
                description:
                  "A handwoven Kashmiri shawl technique using small eyeless wooden bobbins.",
              },
              {
                name: "Talim",
                description:
                  "The coded pattern sheet that guides each colour change in Kani weaving.",
              },
              {
                name: "Tujli",
                description: "An alternative Kashmiri name for the small Kani bobbin.",
              },
              {
                name: "GI",
                description:
                  "Geographical Indication; Kani shawls are registered under GI No. 51.",
              },
            ]),
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Kani", path: "/kani" },
            ]),
          ]),
        }}
      />
      <PageHero
        image={images.kaniWeaverHero}
        imageAlt="A Kashmiri weaver guiding small thread-wrapped kanis across a traditional wooden handloom"
        eyebrow="Kani Weaving"
        title="Kani: A Pattern Woven Thread by Thread."
        subtitle="The weave our house is named after, and the most demanding way to make a Pashmina shawl."
        height="full"
        position="65% center"
        action={<TextLink to="/where-to-buy" tone="light">Enquire About a Piece</TextLink>}
      />
      <section className="bg-ivory px-5 py-20 sm:px-8 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-5xl">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold-ink">What Is Kani?</p>
            <h2 className="display-1 mt-4">The Pattern Is the Weave.</h2>
            <p className="body-editorial mt-7 text-charcoal/75">
              Kani is a hand-weaving technique from Kashmir. Unlike embroidery, every motif is
              formed during weaving itself: colour passes through the warp on dozens of small wooden
              bobbins, called kanis, so the pattern and the cloth are made together.
            </p>
          </Reveal>
          <div className="mt-16">
            <MovementList items={movements} />
          </div>
        </div>
      </section>
      <SplitSection
        image={images.kaniColourBobbins}
        imageAlt="Small wooden kanis wrapped with saffron, moss, madder, indigo and ivory yarn in a working tray"
        eyebrow="Colour"
        title="A Garden in Thread."
        body={
          <p>
            Kani colours were once drawn from minerals, flowers, bark and leaves. Fine pieces still
            keep that earthy balance: saffron beside moss green, madder red beside walnut, ivory
            beside indigo.
          </p>
        }
        tone="cream"
        imageRatio="landscape"
      />
      <section className="bg-ivory px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold-ink">Hand or Machine?</p>
            <h2 className="display-2 mt-4">How to Recognise Hand-Woven Kani.</h2>
            <p className="body-editorial mt-6 text-charcoal/75">
              Machine-made “Kani-style” shawls are common. These signs point to the real thing.
            </p>
          </Reveal>
          <div className="mt-12">
            <MovementList items={recognise} />
          </div>
        </div>
      </section>
      <section className="relative min-h-[72svh] overflow-hidden bg-forest text-ivory">
        <OptimizedImage
          src={images.kaniWovenReversePortrait}
          alt="An ivory, indigo and rose Kani shawl with a turned edge revealing its woven reverse"
          fill
          sizes="100vw"
          className="object-cover lg:hidden"
        />
        <OptimizedImage
          src={images.kaniGardenWeaveWide}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="hidden object-cover lg:block"
        />
        <div className="absolute inset-0 bg-forest/55" />
        <div className="relative mx-auto flex min-h-[72svh] max-w-[1560px] items-center px-5 py-24 sm:px-8 lg:px-12">
          <PullQuote cite="The Kani Tradition">
            The design does not rest upon the cloth. It is the cloth.
          </PullQuote>
        </div>
      </section>
      <SplitSection
        image={images.kaniFinishedGarden}
        imageAlt="A graphite Kani garden shawl with colourful woven birds and flowers hanging from a simple walnut rail"
        eyebrow="Our Kani"
        title="Woven on Our Looms and by Weavers We Trust."
        body={
          <>
            <p>
              Our Kani shawls, stoles and wraps are 100% pure Pashmina. For each piece we state its
              size and describe how it was made, and you can see Kani being woven on a visit to our
              looms in Hazratbal, Srinagar.
            </p>
            <p>
              Prices are confirmed on enquiry and reflect the pattern, size and months on the loom.
              Sizes vary by piece; we confirm dimensions before dispatch. We deliver worldwide and
              accept returns within 14 days.
            </p>
          </>
        }
        action={<TextLink to="/where-to-buy">Where to Buy</TextLink>}
        imageRatio="portrait"
      />

      <section className="bg-cream px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-4xl">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold-ink">Provenance and GI</p>
            <h2 className="display-2 mt-4">Kani, Provenance and Time.</h2>
            <p className="body-editorial mt-6 text-charcoal/75">
              Kani shawls are registered as a Geographical Indication (No. 51). The{" "}
              <a
                href="https://cdiptqccgi.com/gi-crafts"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-gold/50"
              >
                Craft Development Institute in Srinagar
              </a>{" "}
              publishes the specification: handwoven with kanis or tujlis, twill tapestry with
              interlocking wefts, and guided by a written talim. The{" "}
              <TextLink to="/journal/the-art-of-kani-weaving">Kani story</TextLink> follows the
              process from the pattern sheet to the finished cloth.
            </p>
          </Reveal>
          <div className="mt-12 divide-y divide-charcoal/10 border-y border-charcoal/10">
            {[
              {
                q: "Is Kani GI protected?",
                a: "Yes. Kani has its own Geographical Indication, No. 51, separate from Kashmir Pashmina and Sozni. The Craft Development Institute publishes the registered specification and the testing process.",
              },
              {
                q: "How long does a Kani shawl take?",
                a: "A relatively simple piece can take months; a densely patterned shawl can occupy a loom for a year or more. The time is one reason a genuine Kani is costly. Prices are confirmed on enquiry.",
              },
              {
                q: "How do I know it is handwoven?",
                a: "Turn the shawl over. On handwoven Kani, the reverse shows where each coloured weft turns back at the edge of its motif. Machine jacquard is mechanically regular and may show long floating threads. A GI label and a named maker are stronger evidence still.",
              },
              {
                q: "How is Kani different from Sozni?",
                a: "Kani is woven: the pattern is formed on the loom with small wooden bobbins and a talim. Sozni is embroidered onto woven cloth with a needle. They are separate crafts with separate GI registrations.",
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
                Kani, Sozni and solids at a glance
              </caption>
              <thead>
                <tr className="border-b border-charcoal/25">
                  <th scope="col" className="py-3 pr-6 font-normal"> </th>
                  <th scope="col" className="py-3 pr-6 font-normal">Kani</th>
                  <th scope="col" className="py-3 pr-6 font-normal">Sozni</th>
                  <th scope="col" className="py-3 font-normal">Solid</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-charcoal/10">
                  <th scope="row" className="py-3 pr-6 font-normal">Pattern</th>
                  <td className="py-3 pr-6">Woven into the cloth</td>
                  <td className="py-3 pr-6">Embroidered on the cloth</td>
                  <td className="py-3">None</td>
                </tr>
                <tr className="border-b border-charcoal/10">
                  <th scope="row" className="py-3 pr-6 font-normal">Tool</th>
                  <td className="py-3 pr-6">Kanis or tujlis and a talim</td>
                  <td className="py-3 pr-6">Needle and fine thread</td>
                  <td className="py-3">Loom only</td>
                </tr>
                <tr className="border-b border-charcoal/10">
                  <th scope="row" className="py-3 pr-6 font-normal">Time</th>
                  <td className="py-3 pr-6">Months to years</td>
                  <td className="py-3 pr-6">Weeks to months</td>
                  <td className="py-3">Weeks</td>
                </tr>
                <tr>
                  <th scope="row" className="py-3 pr-6 font-normal">GI</th>
                  <td className="py-3 pr-6">Kani GI No. 51</td>
                  <td className="py-3 pr-6">Sozni GI No. 48</td>
                  <td className="py-3">Fibre: Pashmina GI No. 46</td>
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
              Craft Development Institute Kani GI specification
            </a>{" "}
            and{" "}
            <a
              href="https://www.outlooktraveller.com/responsible-tourism/seven-handicrafts-of-jammu-and-kashmir-every-traveller-should-know"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-gold/50"
            >
              Outlook Traveller’s Kani guide
            </a>
            .
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <TextLink to="/sozni">Read about Sozni embroidery</TextLink>
            <TextLink to="/pashmina">Read the Pashmina guide</TextLink>
            <TextLink to="/where-to-buy">Enquire About a Kani</TextLink>
          </div>
        </div>
      </section>
    </>
  );
}
