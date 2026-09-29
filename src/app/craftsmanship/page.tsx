import type { Metadata } from "next";

import { MovementList, SplitSection, TextLink } from "@/components/Editorial";
import { PageHero } from "@/components/PageHero";
import { images } from "@/lib/images";
import { breadcrumbLd, jsonLdScript, seoBundle } from "@/lib/seo";

export const metadata: Metadata = seoBundle({
  title: "Craftsmanship",
  description:
    "Follow Pashmina through fibre, weaving, Sozni embroidery, finishing and the skilled hands behind each tradition.",
  pathname: "/craftsmanship",
  image: images.journalWorkshop,
  type: "article",
});

const craft = [
  { index: "01", title: "The Fibre", body: "The finest inner down of the Changthangi goat: light, warm and almost impossibly soft." },
  { index: "02", title: "The Thread", body: "Cleaned and spun with sensitivity, the fibre becomes a yarn whose delicacy demands an educated touch." },
  { index: "03", title: "The Loom", body: "A timber frame holds thousands of warp threads in precise tension — the architecture beneath every design." },
  { index: "04", title: "The Hands", body: "Knowledge passes through observation and repetition until judgment settles into the fingers." },
  { index: "05", title: "The Weaving", body: "A cloth may remain beautifully solid or become the foundation for further work. Its quality begins with even tension, fine yarn and an educated hand." },
  { index: "06", title: "Kani", body: "In Kani, each wooden bobbin travels only where its colour belongs. Pattern forms within the weave, advancing by millimetres." },
  { index: "07", title: "Sozni", body: "In Sozni, a fine needle draws motifs upon woven Pashmina. Dense, precise embroidery develops slowly across borders or the entire field." },
  { index: "08", title: "The Time", body: "Months are not a production cost here. They are a material — as essential as fibre or colour." },
  { index: "09", title: "The Heirloom", body: "The finished Pashmina leaves the artisan ready not for a season, but for a life measured in generations." },
];

export default function CraftsmanshipPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Craftsmanship", path: "/craftsmanship" },
            ]),
          ),
        }}
      />
      <PageHero
        image={images.journalWorkshop}
        imageAlt="Traditional looms in a Kashmiri workshop"
        eyebrow="Craftsmanship"
        title="Many Traditions. One Measure of Integrity."
        subtitle="From weaving to needlework, every stage carries the intelligence of a hand and the memory of those who came before."
        height="full"
      />
      <SplitSection
        image={images.pashminaFibre}
        imageAlt="Raw Pashmina fibre and woven cloth"
        eyebrow="The Beginning"
        title="Fineness Before Form."
        body={
          <p>
            True Pashmina begins far above the valley, in a climate that asks the Changthangi goat to
            grow a remarkable inner warmth. From this rare fibre, Kashmir creates cloth of
            extraordinary lightness.
          </p>
        }
        imageRatio="landscape"
      />
      <section className="bg-cream px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-5xl">
          <MovementList items={craft} tone="cream" />
        </div>
      </section>
      <SplitSection
        image={images.threads}
        imageAlt="Naturally coloured skeins of yarn"
        eyebrow="Materials"
        title="Colour with a Memory."
        body={
          <p>
            Our palette belongs to the valley: the depth of walnut, the glow of saffron, the quiet of
            winter ivory, the green of chinar shade. Colour is chosen for harmony, not novelty.
          </p>
        }
        reverse
        imageRatio="landscape"
      />
      <SplitSection
        image={images.kaniLoom}
        imageAlt="Hands weaving Kani at a loom"
        eyebrow="The Measure of the Hand"
        title="Patience Made Visible."
        body={
          <p>
            Look closely and the presence of the maker appears — in the woven surface, the embroidered
            line and the final drape. Each carries the rhythm of attention.
          </p>
        }
        tone="forest"
        action={
          <TextLink to="/pashmina" tone="light">
            Explore Pashmina Traditions
          </TextLink>
        }
        imageRatio="landscape"
      />
    </>
  );
}
