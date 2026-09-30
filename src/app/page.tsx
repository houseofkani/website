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

export const metadata: Metadata = {
  ...seoBundle({
    title: "House of Kani — Authentic Pashmina from Kashmir",
    description:
      "Discover authentic Kashmiri Pashmina through Kani weaving, Sozni embroidery, pure solids and the people who sustain these living traditions.",
    pathname: "/",
    image: images.victorianKaniHero,
  }),
  title: { absolute: "House of Kani — Authentic Pashmina from Kashmir" },
};

const traditions = [
  {
    number: "01",
    name: "Kani",
    line: "Pattern woven into the cloth",
    image: images.kaniPattern,
    alt: "Macro detail of an intricate woven Kani Pashmina",
    to: "/kani",
  },
  {
    number: "02",
    name: "Sozni",
    line: "Fine embroidery drawn by needle",
    image: images.originalSozni,
    alt: "Ivory Pashmina with fine hand-worked Sozni embroidery",
    to: "/pashmina",
  },
  {
    number: "03",
    name: "Solids",
    line: "Fibre, colour and drape revealed",
    image: images.originalSolid,
    alt: "Deep burgundy solid Pashmina in a heritage interior",
    to: "/pashmina",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="relative isolate flex min-h-svh items-center overflow-hidden text-ivory">
        <OptimizedImage
          src={images.victorianKaniHero}
          alt="Kashmiri woman wearing a purple Kani Pashmina in a Victorian-inspired royal salon"
          fill
          priority
          quality={92}
          sizes="100vw"
          className="-z-20 object-cover object-[62%_center] sm:object-center"
        />
        <div className="hero-shade absolute inset-0 -z-10" />
        <div className="mx-auto w-full max-w-[1560px] px-5 pt-28 pb-12 sm:px-8 lg:px-12">
          <Reveal className="image-copy max-w-[42rem] text-left">
            <Monogram className="mb-8 w-14 text-gold sm:w-16" />
            <p className="eyebrow text-gold">Authentic Pashmina · Kashmir</p>
            <h1 className="display-hero mt-5 text-balance">House of Kani</h1>
            <p className="font-display mt-6 max-w-lg text-[1.3rem] leading-relaxed font-light italic text-ivory sm:text-[1.6rem]">
              Kani, Sozni and solids — understood through the hands, histories and traditions that
              make them.
            </p>
            <TextLink to="/pashmina" tone="light" className="mt-10">
              Discover Pashmina
            </TextLink>
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
                alt="Fine Pashmina weave and traditional wooden thread bobbins"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120} className="max-w-xl lg:col-span-5 lg:col-start-8">
            <Eyebrow>Who We Are</Eyebrow>
            <h2 className="display-1 mt-6 text-balance italic">A house devoted to the truth of Pashmina.</h2>
            <p className="body-editorial mt-8 text-charcoal/80">
              House of Kani is a Kashmir-rooted knowledge and brand platform for authentic Pashmina.
              Our name honours the rare Kani weaving tradition; our world embraces Kani, Sozni,
              beautifully finished solids and other expressions of the cloth.
            </p>
            <p className="body-editorial mt-5 text-charcoal/80">
              We make the fibre, techniques and human skill visible, so that what is genuine can be
              recognised, respected and carried forward.
            </p>
            <TextLink to="/the-house" className="mt-10">
              Read Our Story
            </TextLink>
          </Reveal>
        </div>
      </section>

      <section className="bg-forest px-5 py-24 text-ivory sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1420px]">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow>What We Offer</Eyebrow>
            <h2 className="display-1 mt-5">One fibre. Distinct traditions.</h2>
            <p className="body-editorial mx-auto mt-7 max-w-2xl text-ivory/78">
              Pashmina is the material. The making gives each piece its character. These are the
              three expressions at the heart of our house.
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
          <div className="mt-14 text-center">
            <TextLink to="/pashmina" tone="light">Understand the Traditions</TextLink>
          </div>
        </div>
      </section>

      <ImmersiveSection
        image={images.kaniLoom}
        imageAlt="A Kashmiri artisan weaving a vivid Kani textile on a wooden loom"
        eyebrow="Craftsmanship"
        title={<>Time Is Not Hidden.<br />It Is the Measure.</>}
        body={<p>From sorting fibre and spinning thread to reading the talim and finishing the cloth, every stage depends on practised hands. Slowness is not theatre here; it is how integrity enters the textile.</p>}
        action={<TextLink to="/craftsmanship" tone="light">Meet the Making</TextLink>}
        position="60% center"
      />

      <SplitSection
        image={images.heritageArchive}
        imageAlt="Archival books, Kashmir illustrations and textile fragments"
        eyebrow="Why House of Kani"
        title={<>Knowledge Protects<br />What Is Genuine.</>}
        body={<><p>Pashmina is widely named and often misunderstood. We show the fibre, method, motif, time and human skill behind the cloth without reducing a living tradition to a luxury claim.</p><p>Understanding creates trust — and helps the makers and cultural memory of Kashmir endure.</p></>}
        action={<TextLink to="/heritage">Explore the Heritage</TextLink>}
        imageRatio="landscape"
      />

      <section className="bg-ivory px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1420px]">
          <Reveal className="flex flex-col items-center text-center">
            <Eyebrow>The Journal</Eyebrow>
            <h2 className="display-1 mt-4">Notes from the Valley</h2>
            <p className="body-editorial mt-6 max-w-2xl text-charcoal/70">Essays on fibre, loom, motif, landscape and the people who keep Kashmir’s textile knowledge alive.</p>
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
          <div className="mt-14 text-center"><TextLink to="/journal">Enter the Journal</TextLink></div>
        </div>
      </section>

      <section className="border-y border-gold/25 bg-cream px-5 py-16 text-center sm:px-8 sm:py-20">
        <Reveal className="mx-auto max-w-3xl">
          <Eyebrow>Our First Collection</Eyebrow>
          <h2 className="display-2 mt-4">Coming first to Etsy.</h2>
          <p className="body-editorial mx-auto mt-5 max-w-2xl text-charcoal/70">A considered edit of authentic Kashmiri Pashmina, accompanied by clear information about its material, method and making.</p>
        </Reveal>
      </section>

      <section className="bg-ivory px-5 py-5 sm:px-8 sm:py-8 lg:px-12 lg:py-12">
        <div className="group relative isolate mx-auto flex min-h-[66svh] max-w-[1560px] items-center justify-center overflow-hidden px-5 py-24 text-center text-ivory">
          <OptimizedImage src={images.closingDrape} alt="Authentic Kani Pashmina inspected in a Kashmiri heritage atelier" fill sizes="100vw" className="-z-20 object-cover transition-transform duration-[1800ms] group-hover:scale-[1.015]" />
          <div className="absolute inset-0 -z-10 bg-forest/60" />
          <Reveal className="image-copy flex max-w-3xl flex-col items-center">
            <Monogram className="mb-7 w-16 text-gold" />
            <p className="eyebrow text-gold">The Living Art of Pashmina</p>
            <h2 className="display-1 mt-5 italic">From Kashmir.<br />Woven for the world.</h2>
            <TextLink to="/the-house" tone="light" className="mt-10">Enter the House</TextLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}