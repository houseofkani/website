import { createFileRoute, Link } from "@tanstack/react-router";

import hero from "@/assets/hero-home.jpg";
import lake from "@/assets/kashmir-lake.jpg";
import loom from "@/assets/kani-loom.jpg";
import hall from "@/assets/craftsmanship-hall.jpg";
import fibre from "@/assets/pashmina-fibre.jpg";
import pattern from "@/assets/kani-pattern.jpg";
import archive from "@/assets/heritage-archive.jpg";
import dusk from "@/assets/kashmir-dusk.jpg";
import privateClient from "@/assets/private-client.jpg";
import closing from "@/assets/closing-drape.jpg";
import { articles } from "@/lib/journal";
import { FramedImage, ImmersiveSection, SplitSection, TextLink, Eyebrow } from "@/components/Editorial";
import { Monogram } from "@/components/Monogram";
import { Ornament, OrnamentRule } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "House of Kani — The Art of Pashmina. The Soul of Kashmir." },
      { name: "description", content: "Enter House of Kani, a luxury Pashmina heritage house dedicated to Kashmir's Kani weaving tradition." },
      { property: "og:title", content: "House of Kani — The Art of Pashmina" },
      { property: "og:description", content: "A digital maison devoted to the soul, artistry and enduring heritage of Kashmir." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="relative isolate flex min-h-svh items-end overflow-hidden text-ivory">
        <img src={hero} alt="Woman wearing a richly patterned Kani Pashmina in a heritage interior" width={1920} height={1280} className="absolute inset-0 -z-20 h-full w-full object-cover object-[56%_center] sm:object-center" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-forest/65 via-transparent to-forest/90" />
        <div className="mx-auto flex w-full max-w-[1560px] flex-col items-center px-5 pt-32 pb-14 text-center sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
          <Reveal className="flex max-w-3xl flex-col items-center">
            <Monogram className="mb-6 w-12 opacity-95 sm:w-14" />
            <p className="eyebrow text-gold">A Legacy Woven in Time</p>
            <h1 className="display-hero mt-5 uppercase">House of Kani</h1>
            <p className="font-display mt-5 text-[1.15rem] font-light text-ivory/85 italic sm:text-[1.35rem]">The Art of Pashmina. The Soul of Kashmir.</p>
            <Link to="/the-house" className="nav-label mt-9 border-b border-ivory/50 pb-1 text-ivory transition-colors duration-500 hover:border-gold hover:text-gold">Enter the House</Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto grid max-w-[1560px] items-center gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 lg:px-12 lg:py-36">
          <Reveal><FramedImage src={lake} alt="Archival view of Dal Lake and the Kashmir mountains" width={1408} height={1408} /></Reveal>
          <Reveal delay={120} className="max-w-xl">
            <Eyebrow>A Heritage That Endures</Eyebrow>
            <h2 className="display-1 mt-4">More Than a Shawl.<br />A Living Tradition.</h2>
            <p className="body-editorial mt-7 text-charcoal/80">House of Kani is devoted to the timeless art of Kani weaving — where patience, poetry and nature converge in Pashmina. Each piece is a canvas of centuries, carried forward by extraordinary hands in the valleys of Kashmir.</p>
            <Ornament size="sm" className="mt-5 w-20" />
            <TextLink to="/the-house" className="mt-8">Our Story</TextLink>
          </Reveal>
        </div>
      </section>

      <ImmersiveSection image={loom} imageAlt="Hands guiding kani needles through an intricate weave" eyebrow="The Art of Kani" title={<>A Thousand Threads.<br />Infinite Stories.</>} body={<p>Kani is not merely a weave, but a language — expressing the landscapes, gardens and heritage of Kashmir through intricate, handwoven designs in Pashmina.</p>} action={<TextLink to="/kani" tone="light">Explore Kani</TextLink>} position="60% center" />

      <SplitSection image={hall} imageAlt="A woman displaying an heirloom Kani shawl in a heritage hall" eyebrow="An Heirloom for Generations" title={<>Bound by Craft.<br />Inspired by Eternity.</>} body={<p>From the royal courts of the past to the contemporary world, Kani remains a symbol of refinement, heritage and quiet luxury. Time is not hidden in the cloth; it is its greatest beauty.</p>} action={<TextLink to="/craftsmanship">Discover Craftsmanship</TextLink>} imageRatio="portrait" />

      <SplitSection image={fibre} imageAlt="Fine Pashmina fibre and a delicately woven textile" eyebrow="Pashmina" title={<>The Finest Fibre.<br />The Longest Patience.</>} body={<><p>Born in the severe beauty of the high Himalaya, Pashmina arrives in Kashmir almost weightless. Here, the hand learns its delicacy and gives it form.</p><p>Warmth, fineness and touch become a quiet kind of permanence.</p></>} reverse tone="cream" imageRatio="landscape" />

      <ImmersiveSection image={pattern} imageAlt="Macro detail of a complex woven Kani pattern" eyebrow="The Kani Tradition" title={<>Woven by Hand.<br />Drawn from Memory.</>} body={<p>Each colour travels on its own small wooden kani. The pattern emerges not upon the cloth, but within it — inseparable from the weave.</p>} action={<TextLink to="/kani" tone="light">The Kani Tradition</TextLink>} />

      <SplitSection image={archive} imageAlt="Archival books, Kashmir illustrations and textile fragments" eyebrow="The Archive" title="A Heritage That Endures." body={<p>In manuscripts, courtly ateliers, botanical drawings and textiles carried across continents, Pashmina holds an extraordinary cultural memory. We tend that memory as a living inheritance.</p>} action={<TextLink to="/heritage">Explore Our Heritage</TextLink>} imageRatio="landscape" />

      <ImmersiveSection image={dusk} imageAlt="Dal Lake and the Kashmir mountains at dusk" eyebrow="Kashmir Lives Within" title={<>A Place. A People.<br />A Tradition.</>} body={<p>The beauty of Kashmir is not only in its landscapes, but in the hands and hearts that keep its traditions alive.</p>} action={<TextLink to="/kashmir" tone="light">Discover Kashmir</TextLink>} align="center" />

      <section className="bg-ivory px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-[1560px]">
          <Reveal className="flex flex-col items-center text-center">
            <Eyebrow>The Journal</Eyebrow>
            <h2 className="display-1 mt-4">Notes from the Valley</h2>
            <OrnamentRule className="mt-7" />
          </Reveal>
          <div className="mt-14 grid gap-x-7 gap-y-12 md:grid-cols-3">
            {articles.slice(0, 3).map((article, i) => (
              <Reveal key={article.slug} delay={i * 100}>
                <Link to="/journal/$slug" params={{ slug: article.slug }} className="group block">
                  <div className="aspect-[4/3] overflow-hidden"><img src={article.image} alt={article.imageAlt} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.03]" /></div>
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

      <ImmersiveSection image={privateClient} imageAlt="Folded Kani Pashmina beside candlelight" eyebrow="Private Client" title="For Those Who Seek the Exceptional." body={<p>Private viewings, considered gifts, bespoke commissions and collection enquiries — guided with discretion by the House.</p>} action={<TextLink to="/private-client" tone="light">Private Enquiries</TextLink>} minHeight="min-h-[70svh]" />

      <section className="relative isolate flex min-h-[82svh] items-center justify-center overflow-hidden px-5 py-24 text-center text-ivory sm:px-8">
        <img src={closing} alt="A Kani Pashmina arranged in sculptural folds" loading="lazy" width={1920} height={1200} className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-forest/50" />
        <Reveal className="flex max-w-2xl flex-col items-center">
          <Monogram className="mb-6 w-14" />
          <h2 className="display-1 uppercase">House of Kani</h2>
          <p className="font-display mt-5 text-[1.2rem] font-light italic sm:text-[1.45rem]">The Art of Pashmina.<br />The Soul of Kashmir.</p>
          <TextLink to="/the-house" tone="light" className="mt-9">Enter the House</TextLink>
        </Reveal>
      </section>
    </>
  );
}
