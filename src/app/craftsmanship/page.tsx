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
  { index: "01", title: "Combing", body: "In spring, herders on the Changthang plateau of Ladakh comb the fine winter undercoat from their Changthangi goats by hand." },
  { index: "02", title: "Sorting and cleaning", body: "The coarse outer hair is separated from the soft down, and the fibre is cleaned of dust and grease." },
  { index: "03", title: "Spinning", body: "The down is spun into yarn so fine that it breaks easily. Spinning by hand on a wooden wheel, called a yinder, is a skill passed down within families." },
  { index: "04", title: "Dyeing", body: "Yarn, or the finished cloth, is dyed in small batches by Kashmiri dyers." },
  { index: "05", title: "Setting the loom", body: "Thousands of warp threads are laid out and fixed under even tension on a wooden handloom. Every later step depends on this." },
  { index: "06", title: "Weaving", body: "A plain weave or a twill makes the base cloth of a solid or a Sozni piece. In Kani, the pattern is woven in at the same time, with small bobbins following a coded talim." },
  { index: "07", title: "Embroidery", body: "For Sozni, an embroiderer works the design by hand with a fine needle onto the woven Pashmina — often over many months." },
  { index: "08", title: "Washing and finishing", body: "The cloth is washed, its fringes are knotted, and it is gently pressed and inspected." },
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
        imageAlt="A weaver working a colourful Kani shawl on a wooden loom"
        eyebrow="Craftsmanship"
        title="From Fibre to Finished Shawl."
        subtitle="The stages a pure Pashmina passes through, and the hands that do the work."
        height="full"
      />
      <SplitSection
        image={images.pashminaFibre}
        imageAlt="A folded floral Pashmina shawl beside spools of coloured thread"
        eyebrow="The Beginning"
        title="It Starts in Ladakh."
        body={
          <p>
            Pashmina comes from the Changthangi goat, which grows a very fine undercoat to survive
            winters on the Changthang plateau. Each fibre is roughly 12 to 16 microns across, which
            is what makes the finished cloth so light and warm.
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
        imageAlt="A folded floral Pashmina shawl beside spools of coloured thread"
        eyebrow="Colour"
        title="A Palette from the Valley."
        body={
          <p>
            Kashmiri shawls draw their colours from the valley: walnut, saffron, winter ivory and the
            green of chinar shade. In Kani, each of these colours is carried by its own bobbin.
          </p>
        }
        reverse
        imageRatio="landscape"
      />
      <SplitSection
        image={images.kaniLoom}
        imageAlt="A weaver working a colourful Kani shawl on a wooden loom"
        eyebrow="Time"
        title="Why Handmade Takes Months."
        body={
          <>
            <p>
              A plain solid can be woven in weeks. A Sozni piece may need months of embroidery after
              weaving, and a fully patterned Kani shawl can stay on the loom for many months or more.
            </p>
            <p>That time is visible in the finished piece — and it is why genuine work is costly.</p>
          </>
        }
        tone="forest"
        action={
          <TextLink to="/pashmina#authenticity" tone="light">
            How to Recognise Handwork
          </TextLink>
        }
        imageRatio="landscape"
      />
    </>
  );
}
