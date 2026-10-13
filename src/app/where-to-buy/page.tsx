import type { Metadata } from "next";

import { TextLink } from "@/components/Editorial";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { images } from "@/lib/images";
import { breadcrumbLd, jsonLdScript, seoBundle } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = seoBundle({
  title: "Where to Buy",
  description:
    "House of Kani’s first collection of pure Pashmina opens on Etsy. Pieces can also be seen by appointment in Srinagar or online.",
  pathname: "/where-to-buy",
  image: images.closingDrape,
});

export default function WhereToBuyPage() {
  const etsyLive = Boolean(SITE.etsyUrl);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Where to Buy", path: "/where-to-buy" },
            ]),
          ),
        }}
      />
      <PageHero
        image={images.closingDrape}
        imageAlt="An artisan inspecting a purple paisley Pashmina shawl on a walnut atelier table"
        eyebrow="Where to Buy"
        title="Our First Collection Opens on Etsy."
        subtitle="Every listing names the technique, the fibre and the size."
        height="medium"
      />
      <section className="bg-ivory px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
          <Reveal className="border-t border-gold/45 pt-8">
            <p className="eyebrow text-gold">Online</p>
            <h2 className="display-2 mt-4">Etsy</h2>
            <p className="body-editorial mt-5 text-charcoal/75">
              {etsyLive
                ? "Our Etsy shop carries our current shawls, stoles and wraps, with secure payment and worldwide delivery."
                : "Our Etsy shop is being prepared. Once it opens, the link will appear here. Until then, write to us about any piece you would like to see."}
            </p>
            {etsyLive ? (
              <a
                href={SITE.etsyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-label mt-8 inline-flex items-center gap-3 border-b border-charcoal/25 pb-1 hover:border-gold hover:text-gold"
              >
                Visit Our Etsy Shop <span aria-hidden="true">→</span>
              </a>
            ) : (
              <TextLink to="/contact" className="mt-8">
                Write to Us
              </TextLink>
            )}
          </Reveal>
          <Reveal delay={100} className="border-t border-gold/45 pt-8">
            <p className="eyebrow text-gold">In Person or by Video</p>
            <h2 className="display-2 mt-4">Appointments</h2>
            <p className="body-editorial mt-5 text-charcoal/75">
              See pieces at our office in Srinagar, visit our looms, or meet us on a video call.
              Every appointment is arranged in advance.
            </p>
            <TextLink to="/private-client" className="mt-8">
              Arrange an Appointment
            </TextLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
