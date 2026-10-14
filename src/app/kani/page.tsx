import type { Metadata } from "next";

import { MovementList, PullQuote, SplitSection, TextLink } from "@/components/Editorial";
import { OptimizedImage } from "@/components/OptimizedImage";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { images } from "@/lib/images";
import { breadcrumbLd, jsonLdScript, seoBundle } from "@/lib/seo";

export const metadata: Metadata = seoBundle({
  title: "Kani",
  description:
    "What Kani weaving is, how a Kani shawl is woven with bobbins and a talim, how long it takes, and how to tell hand-woven Kani from machine imitations.",
  pathname: "/kani",
  image: images.kaniLoom,
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
          __html: jsonLdScript(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Kani", path: "/kani" },
            ]),
          ),
        }}
      />
      <PageHero
        image={images.kaniLoom}
        imageAlt="A weaver working a colourful Kani shawl on a wooden loom"
        eyebrow="Kani Weaving"
        title="Kani: A Pattern Woven Thread by Thread."
        subtitle="The weave our house is named after, and the most demanding way to make a Pashmina shawl."
        height="full"
        position="65% center"
      />
      <section className="bg-ivory px-5 py-20 sm:px-8 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-5xl">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold">What Is Kani?</p>
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
        image={images.threads}
        imageAlt="A folded floral Pashmina shawl beside spools of coloured thread"
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
            <p className="eyebrow text-gold">Hand or Machine?</p>
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
          src={images.kaniQuote[0]}
          alt="A walnut and rust paisley medallion shawl displayed on carved walnut"
          fill
          sizes="100vw"
          className="object-cover lg:hidden"
        />
        <OptimizedImage
          src={images.kaniQuoteWide[0]}
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
        image={images.kaniSaffronDark}
        imageAlt="An oatmeal floral Pashmina shawl with blue striped borders draped over a carved walnut bench"
        eyebrow="Our Kani"
        title="Woven on Our Looms and by Weavers We Trust."
        body={
          <p>
            Our Kani shawls, stoles and wraps are 100% pure Pashmina. For each piece we state its
            size and describe how it was made, and you can see Kani being woven on a visit to our
            looms in Srinagar.
          </p>
        }
        action={<TextLink to="/where-to-buy">Where to Buy</TextLink>}
        imageRatio="portrait"
      />
    </>
  );
}
