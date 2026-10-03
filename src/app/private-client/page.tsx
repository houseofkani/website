import type { Metadata } from "next";

import { EnquiryForm } from "@/components/EnquiryForm";
import { MovementList, SplitSection } from "@/components/Editorial";
import { PageHero } from "@/components/PageHero";
import { images } from "@/lib/images";
import { seoBundle } from "@/lib/seo";

export const metadata: Metadata = seoBundle({
  title: "Appointments and Loom Visits",
  description:
    "Arrange an appointment with House of Kani — in person at our Srinagar office, with a visit to our looms, or online by video call.",
  pathname: "/private-client",
  image: images.kaniPurpleStripeSeated,
});

const options = [
  {
    index: "01",
    title: "In Srinagar",
    body: "Visit our office to see and handle pieces, with time to ask about fibre, technique and care.",
  },
  {
    index: "02",
    title: "At the looms",
    body: "With notice, we can take you to our looms to watch Pashmina being woven.",
  },
  {
    index: "03",
    title: "Online",
    body: "If you cannot travel, we show pieces on a video call — close up, in daylight, front and reverse.",
  },
];

export default function PrivateClientPage() {
  return (
    <>
      <PageHero
        image={images.kaniPurpleStripeSeated}
        imageAlt="A woman seated on a plinth wearing a striped Kani Pashmina shawl"
        eyebrow="Appointments"
        title="See Our Pashmina Up Close."
        subtitle="Meet our family in Srinagar, visit our looms, or see pieces with us online."
        height="tall"
      />
      <SplitSection
        image={images.closingDrape}
        imageAlt="Paisley Pashmina shawls laid out on a long wooden table in a Kashmiri workroom"
        eyebrow="How It Works"
        title="Unhurried, and by Appointment."
        body={
          <>
            <p>
              Tell us what you are looking for — a colour, a technique, an occasion or a gift — and
              we will prepare pieces for you to see.
            </p>
            <p>All appointments are arranged in advance, in person or online.</p>
          </>
        }
        imageRatio="landscape"
      />
      <section className="bg-ivory px-5 pb-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <MovementList items={options} />
        </div>
      </section>
      <section className="bg-cream px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <p className="eyebrow text-gold">Request an Appointment</p>
            <h2 className="display-2 mt-4">When Would You Like to Visit?</h2>
          </div>
          <EnquiryForm kind="appointment" />
        </div>
      </section>
    </>
  );
}
