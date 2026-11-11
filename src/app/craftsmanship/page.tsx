import type { Metadata } from "next";

import { MovementList, SplitSection, TextLink } from "@/components/Editorial";
import { FaqSection } from "@/components/FaqSection";
import { JournalRail } from "@/components/JournalRail";
import { PageHero } from "@/components/PageHero";
import { images } from "@/lib/images";
import { breadcrumbLd, jsonLdScript, seoBundle, webPageLd } from "@/lib/seo";

export const metadata: Metadata = seoBundle({
  title: "Craftsmanship",
  description:
    "Follow Pashmina through fibre, weaving, Sozni embroidery, finishing and the skilled hands behind each tradition.",
  pathname: "/craftsmanship",
  image: images.craftSpinningHero,
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

export default async function CraftsmanshipPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            webPageLd({
              path: "/craftsmanship",
              name: "Craftsmanship",
              description:
                "The techniques behind House of Kani Pashmina: Kani weaving, Sozni embroidery, hand-spinning and finishing.",
              image: images.craftSpinningHero,
            }),
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Craftsmanship", path: "/craftsmanship" },
            ]),
          ]),
        }}
      />
      <PageHero
        image={images.craftSpinningHero}
        imageAlt="A Kashmiri woman drawing fine Pashmina thread at a traditional wooden spinning wheel"
        eyebrow="Craftsmanship"
        title="From Fibre to Finished Shawl."
        subtitle="The stages a pure Pashmina passes through, and the hands that do the work."
        height="full"
      />
      <SplitSection
        image={images.craftLadakhGoats}
        imageAlt="Long-coated white Changthangi goats on the rocky high plateau of Ladakh"
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
        image={images.craftDyeRinsing}
        imageAlt="Moss-green woven cloth lifted on a wooden pole above a dye vat"
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
        image={images.craftWarpSetting}
        imageAlt="Fine ivory warp threads unwinding in a parallel sheet from a wooden loom beam"
        eyebrow="Time"
        title="Why Handmade Takes Months."
        body={
          <>
            <p>
              A plain solid can be woven in weeks. A Sozni piece may need months of embroidery after
              weaving, and a fully patterned Kani shawl can stay on the loom for many months or more.
            </p>
            <p>That time is visible in the finished piece — and it is why genuine work is costly.</p>
            <p>
              Kashmir Pashmina, Kani and Sozni are protected by Geographical Indications. The{" "}
              <a
                href="https://cdiptqccgi.com/gi-crafts"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-gold/50"
              >
                Craft Development Institute
              </a>{" "}
              publishes the specifications, and the{" "}
              <a
                href="https://dohh.jk.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-gold/50"
              >
                Directorate of Handicrafts
              </a>{" "}
              supports training and certification. Read more about{" "}
              <TextLink to="/kani">Kani</TextLink> and <TextLink to="/sozni">Sozni</TextLink>.
            </p>
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
      <FaqSection
        title="The Work, Plainly."
        items={[
          {
            q: "How long does a piece take?",
            a: "A plain solid can be woven in weeks. A Sozni piece may need months of embroidery after weaving. A fully patterned Kani shawl can stay on the loom for many months, sometimes longer. The time is part of what the piece costs.",
          },
          {
            q: "What is the difference between Kani and Sozni?",
            a: "Kani is woven: the pattern is formed on the loom with small wooden bobbins and a coded talim. Sozni is embroidered onto woven Pashmina with a needle. They are separate crafts with separate GI registrations.",
          },
          {
            q: "What is GI certification?",
            a: "A Geographical Indication protects a craft's name and registered specification. Kashmir Pashmina, Kani and Sozni each have their own GI. We arrange certification on request, and the Craft Development Institute publishes the testing process.",
          },
        ]}
      />
      <JournalRail category="Craft" categorySlug="craft" />
    </>
  );
}
