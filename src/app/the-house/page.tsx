import type { Metadata } from "next";

import { PullQuote, SplitSection, TextLink } from "@/components/Editorial";
import { OrnamentRule } from "@/components/Ornament";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { images } from "@/lib/images";
import { breadcrumbLd, jsonLdScript, seoBundle } from "@/lib/seo";

export const metadata: Metadata = seoBundle({
  title: "The House",
  description:
    "House of Kani is a fourth-generation Kashmiri Pashmina family in Srinagar, weaving on its own looms and working with a trusted network of artisans.",
  pathname: "/the-house",
  image: images.victorianKaniHero,
});

export default function TheHousePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "The House", path: "/the-house" },
            ]),
          ),
        }}
      />
      <PageHero
        image={images.victorianKaniHero}
        imageAlt="A woman wearing a lilac paisley Pashmina shawl in a carved wooden Kashmiri interior"
        eyebrow="The House"
        title="A Kashmiri Pashmina Family, Four Generations On."
        subtitle="Our great-grandparents began this work in Srinagar. House of Kani is how we now share it with the world."
        position="center"
      />
      <section className="bg-ivory px-5 py-20 text-center sm:px-8 sm:py-28 lg:py-36">
        <Reveal className="mx-auto max-w-3xl">
          <p className="eyebrow text-gold">Who We Are</p>
          <h2 className="display-1 mt-5">Weavers First.</h2>
          <p className="body-editorial mt-7 text-charcoal/75">
            We are the fourth generation of a Kashmiri family that has lived by Pashmina. We weave on
            our own looms, and we choose further pieces from a network of artisans we have known and
            trusted for years. Everything we sell is a shawl, stole or wrap in 100% pure Pashmina.
          </p>
          <OrnamentRule className="mt-10" />
        </Reveal>
      </section>
      <SplitSection
        image={images.kaniLoom}
        imageAlt="A weaver working a colourful Kani shawl on a wooden loom"
        eyebrow="How We Work"
        title="Our Looms, and the Artisans We Trust."
        body={
          <>
            <p>
              Some pieces are woven on our family’s own looms. Others come from embroiderers and
              weavers whose work we know well, and we choose every piece ourselves.
            </p>
            <p>
              We describe each one honestly: its technique, its fibre, its size and how it was made.
            </p>
          </>
        }
        imageRatio="landscape"
      />
      <SplitSection
        image={images.kaniEarthStripeRod}
        imageAlt="A taupe Pashmina shawl with rose and turquoise paisleys and striped ends on a walnut rail"
        eyebrow="Why “Kani”"
        title="A Name That Sets the Standard."
        body={
          <p>
            Kani is the most demanding of Kashmir’s weaves: every motif is formed on the loom, thread
            by thread. We took its name as the standard we hold ourselves to — across our Kani, our
            Sozni and our solids alike.
          </p>
        }
        reverse
        tone="cream"
      />
      <SplitSection
        image={images.kashmirDusk}
        imageAlt="Dal Lake and the mountains of Kashmir at dusk"
        eyebrow="Srinagar"
        title="Visit Us, or Meet Us Online."
        body={
          <p>
            Our office is in Srinagar. By appointment, we welcome visitors there and can take you to
            our looms. If you cannot travel, we can show you pieces on a video call.
          </p>
        }
        tone="forest"
        imageRatio="landscape"
        action={
          <TextLink to="/private-client" tone="light">
            Arrange an Appointment
          </TextLink>
        }
      />
      <section className="bg-burgundy px-5 py-20 text-ivory sm:px-8 sm:py-28 lg:py-36">
        <PullQuote cite="House of Kani">
          A Pashmina should not announce itself. It should reveal its depth slowly — in touch, in
          movement, and across generations.
        </PullQuote>
        <div className="mt-10 text-center">
          <TextLink to="/where-to-buy" tone="light">
            Where to Buy
          </TextLink>
        </div>
      </section>
    </>
  );
}
