import { Eyebrow } from "@/components/Editorial";
import { Monogram } from "@/components/Monogram";
import { OrnamentRule } from "@/components/Ornament";

/** Static opening for the journal index, shared by the page and its loading state. */
export function JournalMasthead() {
  return (
    <section className="bg-ivory px-5 pt-36 pb-16 text-center sm:px-8 sm:pt-44 sm:pb-24">
      <Monogram decorative className="mx-auto mb-6 w-12" />
      <Eyebrow>House of Kani</Eyebrow>
      <h1 className="display-1 mt-4">The Journal</h1>
      <p className="body-editorial mx-auto mt-5 max-w-xl text-charcoal/70">
        Essays from the loom, the archive and the valley.
      </p>
      <OrnamentRule className="mt-8" />
    </section>
  );
}
