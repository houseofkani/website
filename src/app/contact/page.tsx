import type { Metadata } from "next";

import { EnquiryForm } from "@/components/EnquiryForm";
import { PageHero } from "@/components/PageHero";
import { images } from "@/lib/images";
import { seoBundle } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = seoBundle({
  title: "Contact",
  description:
    "Contact House of Kani for general, private client, press and partnership enquiries.",
  pathname: "/contact",
  image: images.heritageArchive,
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        image={images.heritageArchive}
        imageAlt="House of Kani archive table"
        eyebrow="Contact"
        title="Begin a Conversation."
        subtitle="Every enquiry is received with attention and answered personally."
        height="medium"
      />
      <section className="bg-ivory px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <aside>
            <p className="eyebrow text-gold">The House</p>
            <h2 className="display-3 mt-4">We would be pleased to hear from you.</h2>
            <div className="mt-8 space-y-7 text-charcoal/70">
              <div>
                <p className="eyebrow text-stone">General</p>
                <p className="mt-1">{SITE.email}</p>
              </div>
              <div>
                <p className="eyebrow text-stone">Private Client</p>
                <p className="mt-1">{SITE.privateEmail}</p>
              </div>
              <div>
                <p className="eyebrow text-stone">Press</p>
                <p className="mt-1">{SITE.pressEmail}</p>
              </div>
              <div>
                <p className="eyebrow text-stone">Atelier</p>
                <p className="mt-1">{SITE.atelier}</p>
              </div>
            </div>
          </aside>
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
