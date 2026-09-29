import { createFileRoute } from "@tanstack/react-router";
import archive from "@/assets/heritage-archive.jpg";
import lake from "@/assets/kashmir-lake.jpg";
import pattern from "@/assets/kani-pattern.jpg";
import hall from "@/assets/craftsmanship-hall.jpg";
import { PageHero } from "@/components/PageHero";
import { PullQuote, SplitSection } from "@/components/Editorial";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/heritage")({ head: () => ({ meta: [
  { title: "Heritage — House of Kani" }, { name: "description", content: "Enter the living archive of Kashmir's Pashmina and Kani tradition." },
  { property: "og:title", content: "A Heritage That Endures — House of Kani" }, { property: "og:description", content: "Origins, courtly tradition, generations of craft and the contemporary House of Kani." },
  { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" },
]}), component: HeritagePage });
const eras = [
  ["Origins", "15th century", "Kashmir’s weaving culture absorbed influences travelling along old routes of scholarship and trade, transforming them through the valley’s own materials and imagination."],
  ["Tradition", "17th–18th century", "Under royal patronage, Pashmina became a canvas for extraordinary refinement. Atelier knowledge deepened; motifs multiplied; the shawl entered courts far beyond Kashmir."],
  ["Generations", "19th–20th century", "Through political change and shifting taste, families of spinners, dyers, designers and weavers continued to hold the knowledge of Kani in their hands."],
  ["Contemporary Kashmir", "The present", "The tradition persists not as a relic, but as a living practice — vulnerable, exacting and capable of renewed expression."],
  ["House of Kani", "The next chapter", "We bring heritage forward with reverence and clarity, creating a house in which the old intelligence of Kani can be seen, understood and desired anew."],
];
function HeritagePage(){return <>
  <PageHero image={archive} imageAlt="An archival table of Kashmir drawings, manuscripts and textile" eyebrow="Heritage" title="A Heritage That Endures." subtitle="The story of Kani is carried in cloth, in family knowledge and in the cultural memory of Kashmir." />
  <section className="bg-ivory px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36"><div className="mx-auto max-w-5xl"><p className="eyebrow text-center text-gold">The Living Archive</p><div className="relative mt-14 before:absolute before:top-0 before:bottom-0 before:left-[0.34rem] before:w-px before:bg-gold/35 sm:before:left-[7.5rem]">{eras.map(([title,date,body],i)=><Reveal key={title} delay={i*80} className="relative grid grid-cols-[2rem_1fr] gap-5 pb-16 sm:grid-cols-[7.5rem_2rem_1fr] sm:gap-8"><span className="mt-2 block h-3 w-3 rounded-full border border-gold bg-ivory sm:col-start-2"/><p className="eyebrow hidden text-right text-stone sm:col-start-1 sm:row-start-1 sm:block">{date}</p><div className="sm:col-start-3 sm:row-start-1"><p className="eyebrow text-stone sm:hidden">{date}</p><h2 className="display-2 mt-2 sm:mt-0">{title}</h2><p className="body-editorial mt-5 max-w-2xl text-charcoal/75">{body}</p></div></Reveal>)}</div></div></section>
  <SplitSection image={lake} imageAlt="Archival view of Dal Lake" eyebrow="The Valley" title="A Culture Woven into Place." body={<p>Kashmir’s history resides in gardens and manuscripts, carved wood and spoken verse — and in textiles whose borders hold whole imagined landscapes.</p>} tone="cream" />
  <SplitSection image={pattern} imageAlt="Historic paisley forms in a Kani textile" eyebrow="The Motif" title="Forms That Travelled the World." body={<p>The boteh crossed courts and continents, inspiring new names and interpretations. Yet in Kashmir it remains close to its origins: a shape alive with leaf, flame and cypress.</p>} reverse imageRatio="landscape" />
  <section className="bg-burgundy px-5 py-20 text-ivory sm:px-8 sm:py-28"><PullQuote cite="House of Kani">Heritage is not what we keep behind glass. It is what we understand well enough to carry forward.</PullQuote></section>
  <SplitSection image={hall} imageAlt="Kani shawl presented in a contemporary heritage interior" eyebrow="The Present" title="Preserved Through Practice." body={<p>House of Kani honours the archive by returning to the loom. Every contemporary expression begins with respect for material, process and the person who makes it.</p>} />
</>}
