import type { Metadata } from "next";

import { Eyebrow, TextLink } from "@/components/Editorial";
import { OptimizedImage } from "@/components/OptimizedImage";
import { OrnamentRule } from "@/components/Ornament";
import { PageHero } from "@/components/PageHero";
import { images } from "@/lib/images";
import { breadcrumbLd, jsonLdScript, seoBundle, webPageLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = seoBundle({
  title: "Press & Media",
  description:
    "Press and media resources for House of Kani: boilerplate, key facts, story angles, downloadable images and contact details for editors.",
  pathname: "/press",
  image: images.heritageArchive,
});

const facts = [
  ["House", "Fourth-generation family house, Hazratbal, Srinagar"],
  ["Fibre", "100% pure Pashmina: Kani, Sozni and fine solids"],
  ["Colour", "279 solid shades, dyed in-house"],
  ["Model", "Private enquiry; worldwide delivery; loom appointments"],
  ["Journal", "Long-form guides on fibre, GI, craft, care and buying"],
  ["Shahtoosh", "Not sold; the house explains why the trade is prohibited"],
];

const angles = [
  "What the Kashmir Pashmina GI actually certifies, and what it does not.",
  "The talim: a woven pattern written as a spoken code.",
  "Why a 16-micron ceiling is not a quality grade.",
  "The 279-shade dye house and how a colour is chosen for a shawl.",
  "Moth damage, repair and the economics of keeping a shawl for decades.",
  "Shahtoosh: why the finest Kashmir cloth is illegal to trade.",
];

const imagesList: Array<[string, string]> = [
  ["/press/house-of-kani-boteh.jpg", "A patterned Pashmina shawl hanging flat, showing boteh motifs."],
  ["/press/house-of-kani-loom.jpg", "A wooden handloom with a shawl in progress in a Srinagar workshop."],
  ["/press/house-of-kani-reverse.webp", "The reverse of a handwoven Kani shawl, showing interlocked colour joins."],
];

export default function PressPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            webPageLd({
              path: "/press",
              name: "Press & Media",
              description:
                "Press and media resources for House of Kani: boilerplate, key facts, story angles and downloadable images.",
              image: images.heritageArchive,
            }),
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Press", path: "/press" },
            ]),
          ]),
        }}
      />
      <PageHero
        image={images.heritageArchive}
        imageAlt="A paisley Pashmina shawl beside old folios on a carved walnut archive table"
        eyebrow="Press"
        title="For Editors and Writers."
        height="medium"
      />

      <section className="bg-ivory px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[900px]">
          <Eyebrow tone="ink">About the House</Eyebrow>
          <h2 className="display-2 mt-3">A Kashmiri Pashmina family in Srinagar.</h2>
          <p className="body-editorial mt-6 text-charcoal/75">
            House of Kani is a fourth-generation Kashmiri family selling 100% pure Pashmina —
            handwoven Kani, hand-embroidered Sozni and fine solids — woven on its own looms and
            chosen from artisans the family has known for years. It sells by private enquiry,
            delivers worldwide and receives clients at its Hazratbal workshop or by video call.
          </p>
          <p className="body-editorial mt-5 text-charcoal/75">
            The Journal publishes long-form guides on the Changthangi goat, the 16-micron Kashmir
            GI specification, the talim, Sozni stitch vocabulary, colour, care, repair and the
            legal position on shahtoosh. Images, measurements and the reverse of the cloth are
            shared before a piece is sent.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-8">
            <TextLink to="/press/house-of-kani-press-kit.zip">Download press kit (ZIP)</TextLink>
            <TextLink to="/journal">Read the Journal</TextLink>
            <TextLink to={`mailto:${SITE.email}`}>Email the house</TextLink>
          </div>
        </div>
      </section>

      <section className="bg-cream px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[1200px]">
          <Eyebrow tone="ink">Key Facts</Eyebrow>
          <h2 className="display-2 mt-3">The short version.</h2>
          <dl className="mt-10 grid gap-px border border-charcoal/10 bg-charcoal/10 sm:grid-cols-2">
            {facts.map(([label, value]) => (
              <div key={label} className="bg-cream p-6">
                <dt className="eyebrow text-gold-ink">{label}</dt>
                <dd className="mt-2 text-charcoal/75">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-ivory px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[1000px]">
          <Eyebrow tone="ink">Story Angles</Eyebrow>
          <h2 className="display-2 mt-3">Six places to begin.</h2>
          <ol className="mt-8 space-y-5">
            {angles.map((angle, index) => (
              <li key={angle} className="flex gap-5 border-b border-charcoal/10 pb-5">
                <span className="eyebrow text-gold-ink">{String(index + 1).padStart(2, "0")}</span>
                <span className="body-editorial text-charcoal/75">{angle}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-cream px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
            <div>
              <Eyebrow tone="ink">Images</Eyebrow>
              <h2 className="display-2 mt-3">For editorial use.</h2>
            </div>
            <TextLink to="/press/house-of-kani-press-kit.zip">Download all images</TextLink>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {imagesList.map(([src, alt]) => (
              <a key={src} href={src} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <OptimizedImage
                    src={src}
                    alt={alt}
                    width={1200}
                    height={900}
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="h-full w-full object-cover duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-charcoal/65">{alt}</p>
              </a>
            ))}
          </div>
          <p className="mt-8 text-[0.9rem] leading-relaxed text-charcoal/55">
            Credit: House of Kani. Images may be used with editorial coverage of the house; do not
            alter them or use them to imply endorsement.
          </p>
        </div>
      </section>

      <section className="bg-ivory px-5 py-20 text-center sm:px-8 sm:py-28">
        <OrnamentRule className="mx-auto" />
        <Eyebrow tone="ink" className="mt-8">Contact</Eyebrow>
        <h2 className="display-2 mt-3">Interviews and information.</h2>
        <p className="body-editorial mx-auto mt-5 max-w-xl text-charcoal/70">
          For interviews, image requests or a visit to the looms, write to the house. We answer
          press enquiries directly.
        </p>
        <p className="mt-8">
          <a href={`mailto:${SITE.email}`} className="display-3 border-b border-gold/50 text-charcoal">
            {SITE.email}
          </a>
        </p>
      </section>
    </>
  );
}
