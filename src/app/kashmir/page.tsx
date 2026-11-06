import type { Metadata } from "next";

import { PullQuote, SplitSection, TextLink } from "@/components/Editorial";
import { FaqSection } from "@/components/FaqSection";
import { PageHero } from "@/components/PageHero";
import { images } from "@/lib/images";
import { breadcrumbLd, jsonLdScript, seoBundle, webPageLd } from "@/lib/seo";

export const metadata: Metadata = seoBundle({
  title: "Kashmiri Pashmina: The Valley Behind the Shawl",
  description:
    "The valley behind Kashmiri Pashmina: its landscape, gardens and the community of spinners, dyers, weavers and embroiderers.",
  pathname: "/kashmir",
  image: images.kashmirDusk,
  type: "article",
});

export default function KashmirPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            webPageLd({
              path: "/kashmir",
              name: "Kashmiri Pashmina: The Valley Behind the Shawl",
              description:
                "The valley behind Kashmiri Pashmina: its landscape, gardens and the community of spinners, dyers, weavers and embroiderers.",
              image: images.kashmirDusk,
            }),
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Kashmir", path: "/kashmir" },
            ]),
          ]),
        }}
      />
      <PageHero
        image={images.kashmirDusk}
        imageAlt="Dal Lake and the mountains of Kashmir at dusk"
        eyebrow="Kashmir Lives Within"
        title="A Place. A People. A Tradition."
        subtitle="The craft exists because of the landscape, seasons and human imagination of the valley."
        height="full"
      />
      <SplitSection
        image={images.kashmirLake}
        imageAlt="A wooden shikara on Dal Lake beside carved houseboats and mountain reflections"
        eyebrow="Land"
        title="A Valley of Light and Shadow."
        body={
          <p>
            Encircled by mountains, Kashmir holds its own measure of distance and intimacy. Water
            mirrors sky; winter pares the world back; spring returns it in blossom. The valley
            teaches patience through season.
          </p>
        }
      />
      <SplitSection
        image={images.journalGardens}
        imageAlt="A Mughal garden in Kashmir in autumn, with fountains and mountains behind"
        eyebrow="Culture"
        title="The Garden as an Idea."
        body={
          <p>
            Water, geometry, flower and shade form an ordered paradise. This same imagination appears
            in carved wood, poetry, architecture — and in the flowers and vines of Kani and Sozni
            shawls.
          </p>
        }
        reverse
        tone="cream"
      />
      <SplitSection
        image={images.journalWorkshop}
        imageAlt="A weaver working a colourful Kani shawl on a wooden loom"
        eyebrow="People & Craft"
        title="Many Hands in Every Shawl."
        body={
          <p>
            A single Pashmina shawl can pass through the hands of a spinner, a dyer, a designer, a
            talim writer, a weaver, an embroiderer and a finisher. Most learned their skill within
            their own families.
          </p>
        }
        tone="forest"
        imageRatio="landscape"
      />
      <SplitSection
        image={images.pashminaFibre}
        imageAlt="A folded floral Pashmina shawl beside spools of coloured thread"
        eyebrow="Material"
        title="From Ladakh to the Valley."
        body={
          <p>
            The fibre comes from the Changthangi goats of Ladakh’s high plateau. It is in Kashmir
            that it is spun, woven and embroidered into cloth.
          </p>
        }
        action={<TextLink to="/pashmina">What Pashmina Is</TextLink>}
        reverse
      />
      <SplitSection
        image={images.journalWorkshop}
        imageAlt="A weaver working a colourful Kani shawl on a wooden loom"
        eyebrow="The Year"
        title="A Craft That Follows the Seasons."
        body={
          <>
            <p>
              Pashmina work has its own calendar. The fibre is combed from the Changthangi goats in
              spring and travels down from Ladakh. Through the warmer months it is sorted, spun, dyed
              and woven; winter is often the quietest time at the loom, when the workshop work turns
              inward.
            </p>
            <p>
              The rhythm matters. Haste shows in the tension of the warp and the evenness of the
              weave. The{" "}
              <TextLink to="/journal/inside-a-kashmiri-loom">story of a Kashmiri loom</TextLink>{" "}
              follows that rhythm through a working day.
            </p>
          </>
        }
        tone="cream"
        imageRatio="landscape"
      />
      <SplitSection
        image={images.journalGardens}
        imageAlt="A Mughal garden in Kashmir in autumn, with fountains and mountains behind"
        eyebrow="The Garden"
        title="The Landscape That Taught the Motif."
        body={
          <>
            <p>
              Kashmir’s Mughal gardens — Shalimar, Nishat, Chashma Shahi — are terraced compositions
              of water, stone, chinar and cypress. The{" "}
              <a
                href="https://whc.unesco.org/en/tentativelists/5580"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-gold/50"
              >
                UNESCO Tentative List entry
              </a>{" "}
              records their layout and water engineering.
            </p>
            <p>
              Those gardens gave the loom a visual grammar: the boteh, the vine, the cypress and the
              flowering tree.{" "}
              <TextLink to="/journal/the-gardens-of-kashmir">The Gardens of Kashmir</TextLink>{" "}
              follows that translation from terrace to shawl.
            </p>
          </>
        }
        reverse
        imageRatio="landscape"
      />
      <FaqSection
        title="Kashmir, Plainly."
        items={[
          {
            q: "Why does the landscape matter?",
            a: "The valley's gardens, water and seasons shaped both the motifs and the rhythm of work. The Mughal gardens gave the loom its vocabulary of terraces, water, cypress and chinar; the seasons still set the pace of combing, spinning, dyeing and weaving.",
          },
          {
            q: "What is Kashmiri Pashmina?",
            a: "It is the fine undercoat of the Changthangi goat, hand-spun and handwoven in Jammu & Kashmir. Kashmir Pashmina is protected by GI No. 46, with a registered specification covering fibre, spinning and weaving.",
          },
          {
            q: "Where is House of Kani?",
            a: "Our office is in Hazratbal, Srinagar. Visits are by appointment, and we can also show pieces online by video call.",
          },
        ]}
      />
      <section className="bg-burgundy px-5 py-20 text-ivory sm:px-8 sm:py-28">
        <PullQuote cite="Kashmir">
          The landscape is not pictured upon the shawl. It lives within its rhythm.
        </PullQuote>
        <div className="mt-10 text-center">
          <TextLink to="/journal/the-gardens-of-kashmir" tone="light">
            Read the Garden Story
          </TextLink>
        </div>
      </section>
    </>
  );
}
