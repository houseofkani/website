import type { Metadata } from "next";

import { EnquiryForm } from "@/components/EnquiryForm";
import { SplitSection } from "@/components/Editorial";
import { PageHero } from "@/components/PageHero";
import { images } from "@/lib/images";
import { seoBundle } from "@/lib/seo";

export const metadata: Metadata = seoBundle({
  title: "Private Client",
  description:
    "Private viewings, bespoke Pashmina, gifting, hospitality and interior commissions.",
  pathname: "/private-client",
  image: images.privateClient,
});

export default function PrivateClientPage() {
  return (
    <>
      <PageHero
        image={images.privateClient}
        imageAlt="A Kani Pashmina by candlelight"
        eyebrow="Private Client"
        title="A More Personal Way to Discover Pashmina."
        subtitle="For collectors, thoughtful gifts and singular commissions, the House offers a discreet, individual service."
        height="full"
      />
      <SplitSection
        image={images.craftsmanshipHall}
        imageAlt="A rare Kani Pashmina in a private salon"
        eyebrow="The Appointment"
        title="Time to Look. Space to Understand."
        body={
          <>
            <p>
              A private appointment is unhurried. We begin with what draws you — a colour, a motif, a
              place, an occasion — and open the collection around that conversation.
            </p>
            <p>
              For bespoke work, we guide scale, palette and pattern with equal respect for your
              intention and the integrity of Kani.
            </p>
          </>
        }
        imageRatio="portrait"
      />
      <section className="bg-cream px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <p className="eyebrow text-gold">Private Enquiries</p>
            <h2 className="display-2 mt-4">How May the House Assist?</h2>
          </div>
          <EnquiryForm kind="private" />
        </div>
      </section>
    </>
  );
}
