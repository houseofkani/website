import { createFileRoute } from "@tanstack/react-router";
import workshop from "@/assets/journal-workshop.jpg";
import fibre from "@/assets/pashmina-fibre.jpg";
import loom from "@/assets/kani-loom.jpg";
import threads from "@/assets/threads.jpg";
import { PageHero } from "@/components/PageHero";
import { MovementList, SplitSection, TextLink } from "@/components/Editorial";

export const Route = createFileRoute("/craftsmanship")({
  head: () => ({ meta: [
    { title: "Craftsmanship — House of Kani" },
    { name: "description", content: "Follow Pashmina through fibre, thread, loom, hand, pattern and finishing." },
    { property: "og:title", content: "Craftsmanship — House of Kani" },
    { property: "og:description", content: "The rare patience and generational knowledge behind every handwoven Kani Pashmina." },
    { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: CraftsmanshipPage,
});
const craft = [
  { index: "01", title: "The Fibre", body: "The finest inner down of the Changthangi goat: light, warm and almost impossibly soft." },
  { index: "02", title: "The Thread", body: "Cleaned and spun with sensitivity, the fibre becomes a yarn whose delicacy demands an educated touch." },
  { index: "03", title: "The Loom", body: "A timber frame holds thousands of warp threads in precise tension — the architecture beneath every design." },
  { index: "04", title: "The Hands", body: "Knowledge passes through observation and repetition until judgment settles into the fingers." },
  { index: "05", title: "The Pattern", body: "Talim notation turns drawn design into a sequence of colour and movement the weaver can read." },
  { index: "06", title: "The Weaving", body: "Each kani travels only where its colour belongs. The surface grows by millimetres, dense with intention." },
  { index: "07", title: "The Finishing", body: "Edges are resolved, the cloth washed, softened and examined. Nothing disguises the integrity of the weave." },
  { index: "08", title: "The Time", body: "Months are not a production cost here. They are a material — as essential as fibre or colour." },
  { index: "09", title: "The Heirloom", body: "The finished Pashmina leaves the loom ready not for a season, but for a life measured in generations." },
];
function CraftsmanshipPage() { return <>
  <PageHero image={workshop} imageAlt="Traditional looms in a Kashmiri workshop" eyebrow="Craftsmanship" title="Bound by Craft. Inspired by Eternity." subtitle="Every stage carries the intelligence of a hand and the memory of those who came before." height="full" />
  <SplitSection image={fibre} imageAlt="Raw Pashmina fibre and woven cloth" eyebrow="The Beginning" title="Fineness Before Form." body={<p>True Pashmina begins far above the valley, in a climate that asks the Changthangi goat to grow a remarkable inner warmth. From this rare fibre, Kashmir creates cloth of extraordinary lightness.</p>} imageRatio="landscape" />
  <section className="bg-cream px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36"><div className="mx-auto max-w-5xl"><MovementList items={craft} tone="cream" /></div></section>
  <SplitSection image={threads} imageAlt="Naturally coloured skeins of yarn" eyebrow="Materials" title="Colour with a Memory." body={<p>Our palette belongs to the valley: the depth of walnut, the glow of saffron, the quiet of winter ivory, the green of chinar shade. Colour is chosen for harmony, not novelty.</p>} reverse imageRatio="landscape" />
  <SplitSection image={loom} imageAlt="Hands weaving Kani at a loom" eyebrow="The Measure of the Hand" title="Patience Made Visible." body={<p>Look closely and the presence of the maker appears — not as irregularity, but as humanity. A handwoven surface breathes. It carries the rhythm of attention.</p>} tone="forest" action={<TextLink to="/private-client" tone="light">Private Enquiries</TextLink>} imageRatio="landscape" />
  </>; }
