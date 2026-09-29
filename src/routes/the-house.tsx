import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero-home.jpg";
import fibre from "@/assets/pashmina-fibre.jpg";
import hall from "@/assets/craftsmanship-hall.jpg";
import archive from "@/assets/heritage-archive.jpg";
import dusk from "@/assets/kashmir-dusk.jpg";
import { PageHero } from "@/components/PageHero";
import { PullQuote, SplitSection, TextLink } from "@/components/Editorial";
import { OrnamentRule } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/the-house")({
  head: () => ({ meta: [
    { title: "The House — House of Kani" },
    { name: "description", content: "Discover the philosophy of House of Kani: a Kashmiri maison devoted to Pashmina as art." },
    { property: "og:title", content: "The House — House of Kani" },
    { property: "og:description", content: "A house founded upon Kashmir, patience and the living art of Pashmina." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: TheHouse,
});

function TheHouse() {
  return <>
    <PageHero image={hero} imageAlt="A Kashmiri woman wearing an authentic patterned Pashmina" eyebrow="The House" title="From Kashmir, Woven for the World." subtitle="We make the people, process and cultural meaning of Pashmina visible — with honesty, respect and a contemporary point of view." position="60% center" />
    <section className="bg-ivory px-5 py-20 text-center sm:px-8 sm:py-28 lg:py-36"><Reveal className="mx-auto max-w-3xl"><p className="eyebrow text-gold">Who We Are</p><h2 className="display-1 mt-5">A Kashmir-Rooted House of Knowledge and Craft.</h2><p className="body-editorial mt-7 text-charcoal/75">House of Kani exists to help people understand authentic Pashmina in its breadth: Kani, Sozni, solids and other Kashmiri traditions. We tell their stories from the source, recognise the artisans whose knowledge sustains them, and bring carefully presented shawls to an international audience.</p><OrnamentRule className="mt-10" /></Reveal></section>
    <SplitSection image={fibre} imageAlt="Pashmina fibre and fine woven cloth" eyebrow="Why Pashmina" title="Material as Feeling." body={<p>Before it is a textile, Pashmina is warmth gathered from a high-altitude winter. Its fineness carries the severity of the mountains and the sensitivity of every hand it passes through.</p>} imageRatio="landscape" />
    <SplitSection image={hall} imageAlt="Kani Pashmina in an old Kashmir-inspired hall" eyebrow="Why Kani" title="Pattern as Memory." body={<p>Kani is one of the world’s most intricate weaving traditions. Its intelligence lives in coloured thread, coded notation and the practiced rhythm of the artisan — never printed, never hurried.</p>} reverse tone="cream" />
    <SplitSection image={dusk} imageAlt="Kashmir lake and mountains at dusk" eyebrow="The Place" title="Kashmir Is Not a Reference. It Is the Origin." body={<p>The valley’s gardens, light, architecture, seasons and people shaped every part of this tradition. To speak of Kani without Kashmir would be to speak of a river without its source.</p>} tone="forest" imageRatio="landscape" />
    <SplitSection image={archive} imageAlt="A Kashmir textile and botanical archive" eyebrow="The Living Archive" title="Inheritance, Reinterpreted." body={<p>We look back not to imitate the past, but to understand its discipline. House of Kani brings that depth into the present through proportion, colour and a contemporary eye.</p>} reverse imageRatio="landscape" />
    <section className="bg-burgundy px-5 py-20 text-ivory sm:px-8 sm:py-28 lg:py-36"><PullQuote cite="House of Kani">A Pashmina should not announce itself. It should reveal its depth slowly — in touch, in movement, and across generations.</PullQuote><div className="mt-10 text-center"><TextLink to="/private-client" tone="light">Speak with the House</TextLink></div></section>
  </>;
}
