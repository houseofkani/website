import type { Metadata } from "next";

import { LegalPage } from "@/components/LegalPage";
import { seoBundle } from "@/lib/seo";

export const metadata: Metadata = seoBundle({
  title: "Terms",
  description: "Terms for using the House of Kani website.",
  pathname: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      intro="This website is an editorial presentation of House of Kani and the cultural world around its work."
      sections={[
        {
          title: "Use of this website",
          body: "You may browse and share links to this website for personal, editorial and non-commercial purposes. Content may not be reproduced or adapted without written permission.",
        },
        {
          title: "Intellectual property",
          body: "The House of Kani name, monogram, written material and original imagery are protected. Historic references remain the property of their respective rights holders where applicable.",
        },
        {
          title: "Enquiries",
          body: "An enquiry does not create a contract or guarantee the availability of any piece, appointment or commission. Details are confirmed personally by the House.",
        },
        {
          title: "Accuracy",
          body: "We take care in presenting information about Pashmina, Kani and Kashmir. Editorial content is provided for general cultural information and may be revised over time.",
        },
      ]}
    />
  );
}
