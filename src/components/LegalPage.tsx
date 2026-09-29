import { OrnamentRule } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";

export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: { title: string; body: string }[];
}) {
  return (
    <section className="min-h-screen bg-ivory px-5 pt-36 pb-24 sm:px-8 sm:pt-44 sm:pb-32">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="eyebrow text-gold">House of Kani</p>
          <h1 className="display-1 mt-4">{title}</h1>
          <p className="body-editorial mx-auto mt-6 max-w-2xl text-charcoal/70">{intro}</p>
          <OrnamentRule className="mt-8" />
        </Reveal>
        <div className="mt-16 divide-y divide-border">
          {sections.map((s, i) => (
            <Reveal key={s.title} delay={i * 70} className="py-9">
              <h2 className="display-3">{s.title}</h2>
              <p className="body-editorial mt-4 text-charcoal/75">{s.body}</p>
            </Reveal>
          ))}
        </div>
        <p className="eyebrow mt-12 text-stone">Last updated September 2026</p>
      </div>
    </section>
  );
}
