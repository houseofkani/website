import { createFileRoute } from "@tanstack/react-router";
import dusk from "@/assets/kashmir-dusk.jpg";
import lake from "@/assets/kashmir-lake.jpg";
import gardens from "@/assets/journal-gardens.jpg";
import workshop from "@/assets/journal-workshop.jpg";
import fibre from "@/assets/pashmina-fibre.jpg";
import { PageHero } from "@/components/PageHero";
import { PullQuote, SplitSection, TextLink } from "@/components/Editorial";

export const Route = createFileRoute("/kashmir")({ head: () => ({ meta: [
  { title: "Kashmir — House of Kani" }, { name: "description", content: "Kashmir as land, people, culture, craft, material and memory — the origin of Kani." },
  { property: "og:title", content: "Kashmir Lives Within — House of Kani" }, { property: "og:description", content: "The craft cannot be separated from the place and people that produced it." },
  { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" },
]}), component: KashmirPage });
function KashmirPage(){return <>
  <PageHero image={dusk} imageAlt="Dal Lake and the mountains of Kashmir at dusk" eyebrow="Kashmir Lives Within" title="A Place. A People. A Tradition." subtitle="The craft exists because of the landscape, seasons and human imagination of the valley." height="full" />
  <SplitSection image={lake} imageAlt="Archival Kashmir lake landscape" eyebrow="Land" title="A Valley of Light and Shadow." body={<p>Encircled by mountains, Kashmir holds its own measure of distance and intimacy. Water mirrors sky; winter pares the world back; spring returns it in blossom. The valley teaches patience through season.</p>} />
  <SplitSection image={gardens} imageAlt="Mughal garden in Kashmir" eyebrow="Culture" title="The Garden as an Idea." body={<p>Water, geometry, flower and shade form an ordered paradise. This same imagination appears in carved wood, poetry, architecture and the woven garden of Kani.</p>} reverse tone="cream" />
  <SplitSection image={workshop} imageAlt="Kashmiri weavers and wooden handlooms" eyebrow="People & Craft" title="Knowledge Held in Community." body={<p>Kani belongs to a network of human skill: the spinner, dyer, designer, talim writer and weaver. Their work carries both individual intelligence and collective memory.</p>} tone="forest" imageRatio="landscape" />
  <SplitSection image={fibre} imageAlt="Pashmina fibre and woven cloth" eyebrow="Material" title="Mountain Warmth, Valley Hand." body={<p>Pashmina arrives from high ground and finds its final language in Kashmir. Material and place complete one another.</p>} reverse />
  <section className="bg-burgundy px-5 py-20 text-ivory sm:px-8 sm:py-28"><PullQuote cite="Kashmir">The landscape is not pictured upon the shawl. It lives within its rhythm.</PullQuote><div className="mt-10 text-center"><TextLink to="/journal/the-gardens-of-kashmir" tone="light">Read the Garden Story</TextLink></div></section>
</>}
