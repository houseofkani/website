import type { Metadata } from "next";

import { LegalPage } from "@/components/LegalPage";
import { seoBundle } from "@/lib/seo";

export const metadata: Metadata = seoBundle({
  title: "Privacy",
  description: "House of Kani privacy notice.",
  pathname: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      intro="We treat your correspondence with the same discretion we bring to every private conversation."
      sections={[
        {
          title: "Information you share",
          body: "When you make an enquiry, you may provide your name, contact details and information about your request. We use these details only to respond and to provide the service you have asked for.",
        },
        {
          title: "How information is used",
          body: "We do not sell personal information. Details may be used to manage appointments, respond to press or partnership enquiries, and maintain necessary business records.",
        },
        {
          title: "Your choices",
          body: "You may ask to see, correct or remove personal information held by the House. Please contact our general enquiries address with your request.",
        },
        {
          title: "Updates",
          body: "This notice may be refined as the House and its services evolve. The current version will always appear on this page.",
        },
      ]}
    />
  );
}
