import type { Metadata } from "next";
import Link from "next/link";

import { Eyebrow, ImmersiveSection, SplitSection, TextLink } from "@/components/Editorial";
import { Monogram } from "@/components/Monogram";
import { OptimizedImage } from "@/components/OptimizedImage";
import { OrnamentRule } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";
import { images } from "@/lib/images";
import { articles } from "@/lib/journal";
import { seoBundle } from "@/lib/seo";
import { ETSY_HREF } from "@/lib/site";

export const metadata: Metadata = {
  ...seoBundle({
    title: "House of Kani — Pure Pashmina from a Kashmiri Weaving Family",
    description:
      "100% pure Pashmina shawls, stoles and wraps — handwoven Kani, hand-embroidered Sozni and fine solids from a fourth-generation family in Srinagar, Kashmir.",
    pathname: "/",
    image: images.victorianKaniHero,
  }),
  title: { absolute: "House of Kani — Pure Pashmina from a Kashmiri Weaving Family" },
};

const pashminaFacts = [
  {
    title: "The fibre",
    body: "Pashmina is the fine winter undercoat of the Changthangi goat, which lives on the high Changthang plateau of Ladakh. It is combed out by hand each spring.",
  },
  {
    title: "The fineness",
    body: "Each fibre measures roughly 12 to 16 microns — finer than most cashmere. That is why a pure Pashmina shawl is so light yet so warm.",
  },
  {
    title: "The making",
    body: "In Kashmir the fibre is cleaned, spun, woven and finished by hand. A shawl may then be patterned on the loom (Kani) or embroidered by needle (Sozni).",
  },
] as const;

const traditions = [
  {
    number: "01",
    name: "Kani",
    line: "The pattern is woven into the cloth on the loom, colour by colour.",
    image: images.kaniJamawarPaisleyFlat,
    alt: "A Kani Pashmina shawl laid flat, woven with interlocking paisleys around a central medallion in violet, indigo and saffron",
    to: "/kani",
  },
  {
    number: "02",
    name: "Sozni",
    line: "Fine embroidery worked by hand with a needle on finished Pashmina.",
    image: images.sozniBlackLatticeArches,
    alt: "A woman in stone arches wearing a black Sozni shawl embroidered with a gold lattice",
    to: "/pashmina#sozni",
  },
  {
    number: "03",
    name: "Solids",
    line: "Plain, unpatterned Pashmina, where the fibre, colour and drape speak.",
    image: images.originalSolid,
    alt: "A deep burgundy solid Pashmina shawl draped over a wooden chair",
    to: "/pashmina#solids",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="relative isolate flex min-h-svh items-center overflow-hidden text-ivory">
        <OptimizedImage
          src={images.victorianKaniHero}
          alt="A woman wearing a lilac paisley Pashmina shawl in a carved wooden Kashmiri interior"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="-z-20 object-cover object-[62%_center] sm:object-center"
        />
        <div className="hero-shade absolute inset-0 -z-10" />
        <div className="mx-auto w-full max-w-[1560px] px-5 pt-28 pb-12 sm:px-8 lg:px-12">
          <Reveal className="image-copy max-w-[42rem] text-left">
            <Monogram className="mb-8 w-14 text-gold sm:w-16" />
            <p className="eyebrow text-gold">100% Pure Pashmina · Srinagar, Kashmir</p>
            <h1 className="display-hero mt-5 text-balance">House of Kani</h1>
            <p className="font-display mt-6 max-w-lg text-[1.3rem] leading-relaxed font-light italic text-ivory sm:text-[1.6rem]">
              Handwoven Kani, hand-embroidered Sozni and fine solids — from a fourth-generation
              Kashmiri family of weavers.
            </p>
            <TextLink to="/pashmina" tone="light" className="mt-10">
              Discover Pashmina
            </TextLink>
            <p className="eyebrow mt-12 text-ivory/70 sm:hidden">From Kashmir, woven for the world</p>
          </Reveal>
        </div>
        <p className="eyebrow absolute right-5 bottom-6 hidden text-ivory/70 sm:block lg:right-12">
          From Kashmir, woven for the world
        </p>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto grid max-w-[1420px] items-center gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-12 lg:gap-16 lg:px-12 lg:py-40">
          <Reveal className="lg:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden">
              <OptimizedImage
                src={images.pashminaFibre}
                alt="A folded floral Pashmina shawl beside spools of coloured thread"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120} className="max-w-xl lg:col-span-5 lg:col-start-8">
            <Eyebrow>Who We Are</Eyebrow>
            <h2 className="display-1 mt-6 text-balance italic">Four generations of Pashmina in Srinagar.</h2>
            <p className="body-editorial mt-8 text-charcoal/80">
              Our great-grandparents began this work in Kashmir. Today our family weaves on our own
              looms and chooses pieces from artisans we have worked with for years — and House of
              Kani is how we now bring that work to the world.
            </p>
            <p className="body-editorial mt-5 text-charcoal/80">
              We sell shawls, stoles and wraps in 100% pure Pashmina, and we explain how each one was
              made, so that you know exactly what you are buying.
            </p>
            <TextLink to="/the-house" className="mt-10">
              Read Our Story
            </TextLink>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-gold/25 bg-cream px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="mx-auto max-w-[1420px]">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow>What Pashmina Is</Eyebrow>
            <h2 className="display-1 mt-5 text-balance">A rare fibre, finished by hand in Kashmir.</h2>
            <p className="body-editorial mx-auto mt-7 max-w-2xl text-charcoal/75">
              The word is printed on many scarves that contain little or none of it. Genuine Pashmina
              is one specific fibre, from one animal, made into cloth in one valley.
            </p>
          </Reveal>
          <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
            {pashminaFacts.map((fact, index) => (
              <Reveal key={fact.title} delay={index * 100} className="border-t border-gold/45 pt-6">
                <h3 className="display-3">{fact.title}</h3>
                <p className="body-editorial mt-4 text-charcoal/75">{fact.body}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-14 text-center">
            <TextLink to="/pashmina">How to Recognise Pure Pashmina</TextLink>
          </div>
        </div>
      </section>

      <section className="bg-forest px-5 py-24 text-ivory sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1420px]">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow>What We Offer</Eyebrow>
            <h2 className="display-1 mt-5">One fibre. Three ways of making.</h2>
            <p className="body-editorial mx-auto mt-7 max-w-2xl text-ivory/78">
              Every piece is 100% pure Pashmina. What differs is how it is made — and that is what
              gives each shawl, stole or wrap its character.
            </p>
            <OrnamentRule className="mt-10" />
          </Reveal>
          <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-6">
            {traditions.map((tradition, index) => (
              <Reveal key={tradition.name} delay={index * 100}>
                <Link href={tradition.to} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-forest-deep">
                    <OptimizedImage
                      src={tradition.image}
                      alt={tradition.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.025]"
                    />
                  </div>
                  <div className="mt-6 flex items-start gap-5 border-t border-ivory/18 pt-5">
                    <span className="eyebrow text-gold">{tradition.number}</span>
                    <div>
                      <h3 className="display-3">{tradition.name}</h3>
                      <p className="mt-2 text-[0.95rem] text-ivory/65">{tradition.line}</p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ImmersiveSection
        image={images.kaniLoom}
        imageAlt="A weaver working a colourful Kani shawl on a wooden loom"
        eyebrow="Craftsmanship"
        title={<>Made by Hand,<br />at Every Stage.</>}
        body={<p>Fibre is sorted and spun, the loom is set, and the cloth is woven, washed and finished. A Kani weaver follows a talim — a coded pattern sheet — and a fine piece can take many months. That time is the reason a genuine Kani cannot be cheap.</p>}
        action={<TextLink to="/craftsmanship" tone="light">See How It Is Made</TextLink>}
        position="60% center"
      />

      <SplitSection
        image={images.heritageArchive}
        imageAlt="Botanical drawings, old books and a paisley shawl on a study table"
        eyebrow="Our Promise"
        title={<>What We Tell You<br />About Every Piece.</>}
        body={
          <>
            <p>For every shawl, stole and wrap we state the technique, the fibre and the size, and we describe how it was made.</p>
            <p>Kashmir Pashmina, Kani shawls and Sozni embroidery are registered Geographical Indications (GI) in India. Our pieces are GI-eligible, and we arrange GI certification on request.</p>
          </>
        }
        action={<TextLink to="/pashmina#authenticity">Authenticity and GI</TextLink>}
        imageRatio="landscape"
      />

      <section className="bg-ivory px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1420px]">
          <Reveal className="flex flex-col items-center text-center">
            <Eyebrow>The Journal</Eyebrow>
            <h2 className="display-1 mt-4">Notes from the Valley</h2>
            <p className="body-editorial mt-6 max-w-2xl text-charcoal/70">Short guides and essays on Pashmina, the loom, the needle and Kashmir.</p>
          </Reveal>
          <div className="mt-16 grid gap-x-7 gap-y-12 md:grid-cols-3">
            {articles.slice(0, 3).map((article, index) => (
              <Reveal key={article.slug} delay={index * 100}>
                <Link href={`/journal/${article.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <OptimizedImage src={article.image} alt={article.imageAlt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.025]" />
                  </div>
                  <p className="eyebrow mt-6 text-gold">{article.category}</p>
                  <h3 className="display-3 mt-2 transition-colors duration-500 group-hover:text-burgundy">{article.title}</h3>
                  <p className="mt-3 text-[1rem] leading-relaxed text-charcoal/65">{article.dek}</p>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-14 text-center"><TextLink to="/journal">Read the Journal</TextLink></div>
        </div>
      </section>

      <section className="border-y border-gold/25 bg-cream px-5 py-16 text-center sm:px-8 sm:py-20">
        <Reveal className="mx-auto max-w-3xl">
          <Eyebrow>Where to Buy</Eyebrow>
          <h2 className="display-2 mt-4">Our first collection opens on Etsy.</h2>
          <p className="body-editorial mx-auto mt-5 max-w-2xl text-charcoal/70">Each listing names the technique, the fibre and the size. To see pieces in person or on a video call, arrange an appointment with our family in Srinagar.</p>
          <TextLink to={ETSY_HREF} className="mt-8">Where to Buy</TextLink>
        </Reveal>
      </section>

      <section className="bg-ivory px-5 py-5 sm:px-8 sm:py-8 lg:px-12 lg:py-12">
        <div className="group relative isolate mx-auto flex min-h-[66svh] max-w-[1560px] items-center justify-center overflow-hidden px-5 py-24 text-center text-ivory">
          <OptimizedImage src={images.closingDrape} alt="Paisley Pashmina shawls laid out on a long wooden table in a Kashmiri workroom" fill sizes="100vw" className="-z-20 object-cover transition-transform duration-[1800ms] group-hover:scale-[1.015]" />
          <div className="absolute inset-0 -z-10 bg-forest/60" />
          <Reveal className="image-copy flex max-w-3xl flex-col items-center">
            <Monogram className="mb-7 w-16 text-gold" />
            <p className="eyebrow text-gold">Visit the House</p>
            <h2 className="display-1 mt-5 italic">See the looms.<br />Meet the family.</h2>
            <p className="body-editorial mt-6 max-w-xl text-ivory/85">Visits to our Srinagar office and looms, and online appointments, are arranged in advance.</p>
            <TextLink to="/private-client" tone="light" className="mt-10">Arrange a Visit</TextLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
