import type { Metadata } from "next";

import { PullQuote, SplitSection, TextLink } from "@/components/Editorial";
import { FaqSection } from "@/components/FaqSection";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { images } from "@/lib/images";
import { breadcrumbLd, jsonLdScript, seoBundle, webPageLd } from "@/lib/seo";

export const metadata: Metadata = seoBundle({
  title: "Kashmir Shawl History: Six Centuries of Pashmina",
  description:
    "A short history of the Kashmir shawl: how Pashmina weaving, Kani and Sozni developed in the valley and travelled the world.",
  pathname: "/heritage",
  image: images.heritageArchive,
  type: "article",
});

const eras = [
  [
    "Origins",
    "15th century",
    "Kashmiri tradition credits Sultan Zain-ul-Abidin with encouraging weavers and craftsmen from Persia and Central Asia to settle in the valley. Shawl weaving grew into one of Kashmir’s central crafts.",
  ],
  [
    "Courts",
    "16th–18th century",
    "Under Mughal rule the Kashmir shawl became a prized gift at court. Woven Kani patterns grew more elaborate, and the paisley-like boteh became their best-known motif.",
  ],
  [
    "The wider world",
    "18th–19th century",
    "Kashmir shawls reached Europe and became fashionable there. Imitations followed, most famously from the mills of Paisley in Scotland, which gave the motif its English name.",
  ],
  [
    "Needlework",
    "19th century onward",
    "As woven Kani became costly, embroidered shawls grew in importance. Sozni — fine needlework on plain Pashmina — became a tradition of its own.",
  ],
  [
    "Today",
    "The present",
    "Spinners, weavers and embroiderers still work in Kashmir. Kashmir Pashmina, Kani shawls and Sozni embroidery are now protected as Geographical Indications in India.",
  ],
] as const;

export default function HeritagePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            webPageLd({
              path: "/heritage",
              name: "Kashmir Shawl History: Six Centuries of Pashmina",
              description:
                "A short history of the Kashmir shawl: how Pashmina weaving, Kani and Sozni developed in the valley and travelled the world.",
              image: images.heritageArchive,
            }),
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Heritage", path: "/heritage" },
            ]),
          ]),
        }}
      />
      <PageHero
        image={images.heritageArchive}
        imageAlt="A paisley Pashmina shawl beside old folios on a carved walnut archive table"
        eyebrow="Heritage"
        title="Six Centuries of the Kashmir Shawl."
        subtitle="How Pashmina weaving, Kani and Sozni grew in the valley — and travelled the world."
      />
      <section className="bg-ivory px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow text-center text-gold-ink">A Short History</p>
          <div className="relative mt-14 before:absolute before:top-0 before:bottom-0 before:left-[0.34rem] before:w-px before:bg-gold/35 sm:before:left-[7.5rem]">
            {eras.map(([title, date, body], i) => (
              <Reveal
                key={title}
                delay={i * 80}
                className="relative grid grid-cols-[2rem_1fr] gap-5 pb-16 sm:grid-cols-[7.5rem_2rem_1fr] sm:gap-8"
              >
                <span className="mt-2 block h-3 w-3 rounded-full border border-gold bg-ivory sm:col-start-2" />
                <p className="eyebrow hidden text-right text-stone-ink sm:col-start-1 sm:row-start-1 sm:block">
                  {date}
                </p>
                <div className="sm:col-start-3 sm:row-start-1">
                  <p className="eyebrow text-stone-ink sm:hidden">{date}</p>
                  <h2 className="display-2 mt-2 sm:mt-0">{title}</h2>
                  <p className="body-editorial mt-5 max-w-2xl text-charcoal/75">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <SplitSection
        image={images.kashmirLake}
        imageAlt="A wooden shikara on Dal Lake beside carved houseboats and mountain reflections"
        eyebrow="The Valley"
        title="A Culture Woven into Place."
        body={
          <p>
            Kashmir’s history resides in gardens and manuscripts, carved wood and spoken verse — and
            in textiles whose borders hold whole imagined landscapes.
          </p>
        }
        tone="cream"
      />
      <SplitSection
        image={images.kaniTaupePaisley}
        imageAlt="A rust and walnut Pashmina shawl with large paisley medallions spread on a walnut table"
        eyebrow="The Motif"
        title="The Boteh, Known Abroad as Paisley."
        body={
          <p>
            The curved teardrop motif that Europe came to call paisley is the Kashmiri boteh.
            Weavers have drawn it as a leaf, a flame and a cypress bent by the wind, and it remains
            at the heart of Kani design.
          </p>
        }
        reverse
        imageRatio="landscape"
      />
      <section className="bg-burgundy px-5 py-20 text-ivory sm:px-8 sm:py-28">
        <PullQuote cite="House of Kani">
          Heritage is not what we keep behind glass. It is what we understand well enough to carry
          forward.
        </PullQuote>
      </section>
      <SplitSection
        image={images.kaniQuote[6]}
        imageAlt="An ivory shawl with four pastel flowering trees displayed in a walnut atelier"
        eyebrow="Our Part"
        title="Four Generations in This Story."
        body={
          <p>
            Our family has worked in Pashmina for four generations. Today we weave on our own looms
            and work with Kashmiri artisans we trust, so that this history continues as practice.
          </p>
        }
        action={<TextLink to="/the-house">About Our Family</TextLink>}
      />
      <FaqSection
        tone="cream"
        title="The Kashmir Shawl, Plainly."
        items={[
          {
            q: "What is the Kashmir shawl?",
            a: "A handwoven shawl from the Kashmir Valley, historically made in Pashmina. Kani is its woven technique; Sozni is its embroidered counterpart. Both are protected by their own Geographical Indications.",
          },
          {
            q: "When did Kani begin?",
            a: "Kashmiri tradition places Kani weaving in the 15th century, and it reached its height under the Mughals. The GI dossier records the craft's documented identity, its twill-tapestry process and the coded talim that guides it.",
          },
          {
            q: "What does GI protection mean?",
            a: "A Geographical Indication protects the name and the registered specification: where a craft is made, from what, and by which process. Kashmir Pashmina, Kani and Sozni each have their own registration; we arrange GI certification on request.",
          },
        ]}
      />
      <section className="bg-ivory px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-4xl">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold-ink">Sources and Further Reading</p>
            <h2 className="display-2 mt-4">What the Record Shows.</h2>
            <p className="body-editorial mt-6 text-charcoal/75">
              The history above is a short synthesis. The primary records are more detailed, and
              they are worth reading directly: the GI specifications for Kashmir Pashmina and Kani,
              the public garden record for the Mughal landscapes that shaped the motifs, and the
              Directorate of Handicrafts for the craft’s training and certification system.
            </p>
          </Reveal>
          <ul className="mt-8 space-y-4 text-charcoal/80">
            <li>
              <a
                href="https://cdiptqccgi.com/gi-crafts"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-gold/50"
              >
                Craft Development Institute — GI-registered Kashmir crafts
              </a>
            </li>
            <li>
              <a
                href="https://search.ipindia.gov.in/GIRPublicSearch/Application/Details/46"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-gold/50"
              >
                IP India — Kashmir Pashmina GI No. 46
              </a>
            </li>
            <li>
              <a
                href="https://whc.unesco.org/en/tentativelists/5580"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-gold/50"
              >
                UNESCO — Mughal Gardens in Kashmir
              </a>
            </li>
            <li>
              <a
                href="https://dohh.jk.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-gold/50"
              >
                Directorate of Handicrafts &amp; Handloom Kashmir
              </a>
            </li>
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <TextLink to="/craftsmanship">How the Work Is Made</TextLink>
            <TextLink to="/journal/the-gardens-of-kashmir">The Gardens of Kashmir</TextLink>
          </div>
        </div>
      </section>
    </>
  );
}
