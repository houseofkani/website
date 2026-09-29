import { createFileRoute } from "@tanstack/react-router";
import loom from "@/assets/kani-loom.jpg";
import pattern from "@/assets/kani-pattern.jpg";
import threads from "@/assets/threads.jpg";
import artisan from "@/assets/journal-artisan.jpg";
import hall from "@/assets/craftsmanship-hall.jpg";
import { PageHero } from "@/components/PageHero";
import { MovementList, PullQuote, SplitSection, TextLink } from "@/components/Editorial";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/kani")({
  head: () => ({ meta: [
    { title: "Kani — House of Kani" },
    { name: "description", content: "Enter the intricate world of Kani weaving: its origins, tools, patterns and master artisans." },
    { property: "og:title", content: "The Kani Tradition — House of Kani" },
    { property: "og:description", content: "A thousand threads. Infinite stories. Discover Kashmir's extraordinary Kani weaving tradition." },
    { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: KaniPage,
});

const movements = [
  { index: "I", title: "Origins", body: "Kani flourished in Kashmir’s courtly ateliers, where Persianate garden imagery met the imagination and hand of the valley’s weavers." },
  { index: "II", title: "The Talim", body: "A written colour-code translates the artist’s design into instructions. The weaver reads it aloud in thread, line after patient line." },
  { index: "III", title: "The Kani", body: "Small wooden bobbins, each carrying its own colour, move through selected warp threads. Their name came to describe the entire tradition." },
  { index: "IV", title: "The Pattern", body: "Boteh, cypress, iris and vine assemble into compositions of rhythm and balance — nature abstracted through memory." },
  { index: "V", title: "The Time", body: "Complex work advances by fractions. Months and years accumulate invisibly until the textile is released from the loom." },
];

function KaniPage() {
  return <>
    <PageHero image={loom} imageAlt="Hands weaving a Kani textile" eyebrow="One Pashmina Tradition" title="Kani: Woven by Hand. Drawn from Memory." subtitle="A museum of colour held within a single cloth — and one distinguished expression within the wider world of Pashmina." height="full" position="65% center" />
    <section className="bg-ivory px-5 py-20 sm:px-8 sm:py-28 lg:py-36"><div className="mx-auto max-w-5xl"><Reveal className="max-w-2xl"><p className="eyebrow text-gold">What Is Kani?</p><h2 className="display-1 mt-4">A Weave Without Equal.</h2><p className="body-editorial mt-7 text-charcoal/75">Kani is a tapestry technique native to Kashmir. Unlike embroidery, every motif is formed during weaving itself. Colour passes through the warp on dozens of tiny bobbins until ornament and structure become one.</p></Reveal><div className="mt-16"><MovementList items={movements} /></div></div></section>
    <SplitSection image={threads} imageAlt="Naturally dyed yarns for Kani weaving" eyebrow="Colour" title="A Garden in Thread." body={<p>Mineral, flower, bark and leaf once established the Kani palette. Today, the finest colour stories retain that earthbound harmony: saffron beside moss, madder beside walnut, ivory beside indigo.</p>} tone="cream" imageRatio="landscape" />
    <SplitSection image={artisan} imageAlt="A master Kani weaver beside his loom" eyebrow="The Artisan" title="The Hand Remembers." body={<p>Technique can be described, but fluency is acquired through years beside the loom. The master’s knowledge lives in pressure, tempo, correction and the ability to see the whole within a single line.</p>} reverse />
    <section className="relative min-h-[72svh] overflow-hidden bg-forest text-ivory"><img src={pattern} alt="Macro detail of Kani paisley weaving" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-50" /><div className="absolute inset-0 bg-forest/50" /><div className="relative mx-auto flex min-h-[72svh] max-w-[1560px] items-center px-5 py-24 sm:px-8 lg:px-12"><PullQuote cite="The Kani Tradition">The design does not rest upon the cloth. It is the cloth.</PullQuote></div></section>
    <SplitSection image={hall} imageAlt="Contemporary presentation of a traditional Kani Pashmina" eyebrow="Contemporary Kani" title="An Old Language, Still Alive." body={<p>Respect for tradition does not require stillness. Scale, colour and composition allow Kani to inhabit the present while preserving the intelligence that makes it singular.</p>} action={<TextLink to="/pashmina">Compare Pashmina Traditions</TextLink>} imageRatio="portrait" />
  </>;
}
