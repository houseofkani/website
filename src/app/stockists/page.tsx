import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { images } from "@/lib/images";
import { seoBundle } from "@/lib/seo";

export const metadata: Metadata = seoBundle({
  title: "Stockists",
  description:
    "Discover House of Kani through private presentation salons and appointed partners.",
  pathname: "/stockists",
  image: images.craftsmanshipHall,
});

export default function StockistsPage() {
  return (
    <>
      <PageHero
        image={images.craftsmanshipHall}
        imageAlt="A Kani Pashmina in a private heritage salon"
        eyebrow="Stockists"
        title="Where to Discover the House."
        subtitle="Our Pashmina is presented through a small circle of considered salons and private appointments."
        height="medium"
      />
      <section className="bg-ivory px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-4xl">
          <Reveal className="border-y border-gold/35 py-14 text-center">
            <p className="eyebrow text-gold">Private Presentation</p>
            <h2 className="display-2 mt-4">Srinagar · London</h2>
            <p className="body-editorial mx-auto mt-6 max-w-xl text-charcoal/70">
              Our current presentations are by appointment. Contact the House to arrange a private
              introduction or to locate an appointed partner near you.
            </p>
            <Link
              href="/contact"
              className="nav-label mt-8 inline-block border-b border-gold pb-1"
            >
              Contact the House
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
