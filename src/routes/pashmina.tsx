import { createFileRoute } from "@tanstack/react-router";

import sozniBeige from "@/assets/sozni-pashmina-beige.jpg.asset.json";
import sozniIvory from "@/assets/sozni-pashmina-ivory.jpg.asset.json";
import solidMustard from "@/assets/solid-pashmina-mustard.png.asset.json";
import kani from "@/assets/kani-pattern.jpg";
import { PageHero } from "@/components/PageHero";
import { SplitSection, TextLink } from "@/components/Editorial";
import { OrnamentRule } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/pashmina")({
  head: () => ({
    meta: [
      { title: "Pashmina Traditions — House of Kani" },
      { name: "description", content: "Understand the principal Pashmina traditions of House of Kani: woven Kani, hand-embroidered Sozni, pure solids and more." },
      { property: "og:title", content: "Pashmina Traditions — House of Kani" },
      { property: "og:description", content: "Kani, Sozni and solids: distinct expressions of authentic Kashmiri Pashmina." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PashminaPage,
});

function PashminaPage() {
  return (
    <>
      <PageHero
        image={sozniBeige.url}
        imageAlt="Beige Pashmina with fine brown Sozni embroidery"
        eyebrow="The World of Pashmina"
        title="One Fibre. Many Expressions."
        subtitle="Kani, Sozni and pure solids each reveal a different intelligence of Kashmir’s most treasured cloth."
        height="full"
        position="center 32%"
      />

      <section className="bg-ivory px-5 py-20 text-center sm:px-8 sm:py-28 lg:py-36">
        <Reveal className="mx-auto max-w-3xl">
          <p className="eyebrow text-gold">Understanding the House</p>
          <h2 className="display-1 mt-5">House of Kani Is a House of Pashmina.</h2>
          <p className="body-editorial mt-7 text-charcoal/80">Our name honours Kani, one of Kashmir’s rarest weaving traditions, while our world embraces Pashmina in its breadth. We present woven Kani, hand-embroidered Sozni, beautifully finished solids and other expressions shaped by Kashmiri knowledge.</p>
          <OrnamentRule className="mt-10" />
        </Reveal>
      </section>

      <SplitSection image={kani} imageAlt="Detailed woven Kani Pashmina pattern" eyebrow="01 · Kani" title="Pattern Woven Into the Cloth." body={<p>Kani motifs are created during weaving with small wooden bobbins. Pattern and structure emerge together, guided by a coded talim and the patient rhythm of the loom.</p>} action={<TextLink to="/kani">Explore Kani Weaving</TextLink>} />
      <SplitSection image={sozniIvory.url} imageAlt="Ivory Pashmina with blue Sozni needle embroidery" eyebrow="02 · Sozni" title="The Fineness of the Needle." body={<p>Sozni is delicate needle embroidery worked by hand upon finished Pashmina. Fine lines, floral forms and borders can take months to complete, rewarding close attention rather than distance.</p>} reverse tone="cream" />
      <SplitSection image={solidMustard.url} imageAlt="Mustard solid Pashmina with an embroidered paisley border" eyebrow="03 · Solids" title="The Beauty of Restraint." body={<p>A pure solid places fibre, colour, drape and finish at the centre. Without an all-over pattern, the quality of the Pashmina and the confidence of its colour become the expression.</p>} imageRatio="portrait" />
      <SplitSection image={sozniBeige.url} imageAlt="Neutral Pashmina with fine Sozni borders and paisley motifs" eyebrow="Beyond the Three" title="A Tradition with Many Voices." body={<p>From restrained borders to richly worked surfaces, Kashmir’s vocabulary extends beyond a single category. House of Kani will introduce these traditions carefully, always naming the technique and explaining the work behind it.</p>} reverse tone="forest" />
    </>
  );
}