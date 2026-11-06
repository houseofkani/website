import { Reveal } from "@/components/Reveal";

export type FaqItem = { q: string; a: string };

export function FaqSection({
  title,
  items,
  eyebrow = "Common questions",
  tone = "ivory",
}: {
  title: string;
  items: FaqItem[];
  eyebrow?: string;
  tone?: "ivory" | "cream";
}) {
  return (
    <section
      className={`${tone === "cream" ? "bg-cream" : "bg-ivory"} px-5 py-20 sm:px-8 sm:py-28`}
    >
      <div className="mx-auto max-w-4xl">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-gold-ink">{eyebrow}</p>
          <h2 className="display-2 mt-4">{title}</h2>
        </Reveal>
        <div className="mt-10 divide-y divide-charcoal/10 border-y border-charcoal/10">
          {items.map((item) => (
            <details key={item.q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                <h3 className="font-display text-[1.35rem] leading-snug font-light">{item.q}</h3>
                <span
                  aria-hidden="true"
                  className="mt-1 text-gold-ink transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="body-editorial mt-4 max-w-2xl text-charcoal/75">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
