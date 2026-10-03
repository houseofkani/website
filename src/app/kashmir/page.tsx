import type { Metadata } from "next";

import { PullQuote, SplitSection, TextLink } from "@/components/Editorial";
import { PageHero } from "@/components/PageHero";
import { images } from "@/lib/images";
import { breadcrumbLd, jsonLdScript, seoBundle } from "@/lib/seo";

export const metadata: Metadata = seoBundle({
  title: "Kashmir",
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
          __html: jsonLdScript(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Kashmir", path: "/kashmir" },
            ]),
          ),
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
        imageAlt="A shikara on Dal Lake with mountains behind, in sepia tones"
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
