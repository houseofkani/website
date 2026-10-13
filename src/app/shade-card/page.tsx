import type { Metadata } from "next";

import { TextLink } from "@/components/Editorial";
import { OrnamentRule } from "@/components/Ornament";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ShadeCard } from "@/components/ShadeCard";
import { images } from "@/lib/images";
import { breadcrumbLd, jsonLdScript, seoBundle } from "@/lib/seo";
import { shades } from "@/lib/shades";

export const metadata: Metadata = seoBundle({
  title: "The Solid Shade Card",
  description: `All ${shades.length} colours in which House of Kani dyes solid, pure Pashmina shawls and stoles, from undyed ivory to Dal Lake navy. Physical swatches on request.`,
  pathname: "/shade-card",
  image: images.originalSolid,
});

const legend = [
  { mark: "LL", label: "Palest", body: "The lightest tint of a colour." },
  { mark: "L", label: "Light", body: "A softer tint of the base colour." },
  { mark: "—", label: "Base", body: "The number alone is the base colour." },
  { mark: "D", label: "Deep", body: "A deeper shade of the base colour." },
  { mark: "DD", label: "Deepest", body: "The darkest shade we dye." },
];

export default function ShadeCardPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Pashmina", path: "/pashmina" },
              { name: "Shade Card", path: "/shade-card" },
            ]),
          ),
        }}
      />
      <PageHero
        image={images.originalSolid}
        imageAlt="A deep burgundy solid Pashmina shawl draped over a wooden chair"
        eyebrow="Solids"
        title="The Shade Card."
        subtitle={`${shades.length} colours for solid, pure Pashmina — from undyed ivory to the navy of Dal Lake at night.`}
        height="tall"
      />

      <section className="bg-ivory px-5 py-20 sm:px-8 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-gold">The Colours of a Solid</p>
            <h2 className="display-1 mt-5">Two Hundred and Seventy-Nine Colours.</h2>
            <p className="body-editorial mt-7 text-charcoal/80">
              A solid Pashmina has no pattern to hide behind, so its colour carries the whole piece.
              Every shade below can be dyed for a shawl, stole or wrap in 100% pure Pashmina. The
              colours are arranged in ten chapters, each moving from light to deep.
            </p>
            <OrnamentRule className="mt-10" />
          </Reveal>

          <Reveal delay={120} className="mt-16">
            <p className="eyebrow text-center text-charcoal/60">Reading a shade number</p>
            <dl className="mt-8 grid grid-cols-2 gap-px border border-charcoal/10 bg-charcoal/10 sm:grid-cols-5">
              {legend.map((item) => (
                <div
                  key={item.mark}
                  className="bg-ivory px-5 py-6 text-center last:col-span-2 sm:last:col-span-1"
                >
                  <dt>
                    <span className="font-display block text-[2rem] leading-none font-light text-gold">
                      {item.mark}
                    </span>
                    <span className="eyebrow mt-3 block text-charcoal">{item.label}</span>
                  </dt>
                  <dd className="font-display mt-2 text-[1rem] leading-snug font-light text-charcoal/65 italic">
                    {item.body}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="font-display mt-6 text-center text-[1.05rem] font-light text-charcoal/65 italic">
              So 54, 54-D and 54-DD are the same navy, from base to darkest.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-label="Shade card" className="bg-cream/40">
        <ShadeCard />
      </section>

      <section className="bg-forest px-5 py-20 text-center text-ivory sm:px-8 sm:py-28">
        <Reveal className="mx-auto max-w-2xl">
          <p className="eyebrow text-gold">A Note on Colour</p>
          <h2 className="display-2 mt-4 text-balance">Every Screen Sees Colour Differently.</h2>
          <p className="body-editorial mx-auto mt-6 text-ivory/78">
            The colours here are a close guide, not an exact match. Dyed Pashmina has a depth and
            softness that no screen can show, and each dye lot varies slightly. We will gladly send
            physical swatches, and we are happy to discuss a colour of your own by appointment.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            <TextLink to="/private-client" tone="light">
              Book an Appointment
            </TextLink>
            <TextLink to="/contact" tone="light">
              Request Swatches
            </TextLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
