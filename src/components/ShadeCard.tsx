"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

import { TextLink } from "@/components/Editorial";
import { Reveal } from "@/components/Reveal";
import { shadeChapters, shades, shadesInChapter, type ChapterId, type Shade } from "@/lib/shades";
import { cn } from "@/lib/utils";

const NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

const chapters = shadeChapters.map((chapter, i) => {
  const items = shadesInChapter(chapter.id);
  return { ...chapter, numeral: NUMERALS[i], items, ribbon: ribbon(items) };
});

const chapterTitle = Object.fromEntries(chapters.map((c) => [c.id, c.title])) as Record<
  ChapterId,
  string
>;

function ribbon(items: readonly Shade[]) {
  const step = Math.max(1, Math.floor(items.length / 8));
  const stops = items.filter((_, i) => i % step === 0).map((s) => s.hex);
  return `linear-gradient(to right, ${stops.join(", ")})`;
}

/** Soft light-and-shadow over a flat colour, so a swatch reads as cloth rather than a pixel. */
const SHEEN =
  "linear-gradient(140deg, rgb(255 255 255 / 0.14) 0%, transparent 38%, transparent 62%, rgb(0 0 0 / 0.1) 100%)";

export function ShadeCard() {
  const [active, setActive] = useState<Shade | null>(null);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<ChapterId>("ivory");
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const indexRef = useRef<HTMLDivElement | null>(null);

  const select = useCallback((shade: Shade, trigger: HTMLButtonElement) => {
    lastTrigger.current = trigger;
    setActive(shade);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    lastTrigger.current?.focus({ preventScroll: true });
  }, []);

  const step = useCallback(
    (delta: number) => {
      if (!active) return;
      const index = shades.findIndex((s) => s.code === active.code);
      const next = shades[(index + delta + shades.length) % shades.length];
      if (!next) return;
      setActive(next);
      lastTrigger.current = document.querySelector<HTMLButtonElement>(
        `[data-shade="${CSS.escape(next.code)}"]`,
      );
    },
    [active],
  );

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, step]);

  useEffect(() => {
    const sections = chapters
      .map((c) => document.getElementById(`shades-${c.id}`))
      .filter((node): node is HTMLElement => Boolean(node));
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setCurrent(visible.target.id.replace("shades-", "") as ChapterId);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    sections.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const strip = indexRef.current;
    const link = strip?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!strip || !link) return;
    strip.scrollTo({ left: link.offsetLeft - 20, behavior: "smooth" });
  }, [current]);

  return (
    <div className="relative">
      <nav
        aria-label="Shade card chapters"
        className="sticky top-[3.75rem] z-30 border-y border-charcoal/10 bg-ivory/95 backdrop-blur-md"
      >
        <div
          ref={indexRef}
          className="relative mx-auto flex max-w-[1560px] items-center gap-6 overflow-x-auto px-5 [scrollbar-width:none] sm:px-8 lg:px-12"
        >
          <p className="eyebrow hidden shrink-0 py-4 text-gold xl:block">{shades.length} Shades</p>
          <ul className="flex shrink-0 items-stretch gap-5 lg:gap-7">
            {chapters.map((chapter) => (
              <li key={chapter.id} className="shrink-0">
                <a
                  href={`#shades-${chapter.id}`}
                  aria-current={current === chapter.id ? "true" : undefined}
                  className={cn(
                    "nav-label group flex flex-col gap-2 py-4 whitespace-nowrap transition-colors duration-500",
                    current === chapter.id
                      ? "text-charcoal"
                      : "text-charcoal/50 hover:text-charcoal",
                  )}
                >
                  <span>
                    <span className="mr-2 text-gold">{chapter.numeral}</span>
                    {chapter.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-[3px] w-full origin-left transition-transform duration-700",
                      current === chapter.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                    style={{ backgroundImage: chapter.ribbon }}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        {chapters.map((chapter) => (
          <section
            key={chapter.id}
            id={`shades-${chapter.id}`}
            aria-labelledby={`shades-${chapter.id}-title`}
            className="scroll-mt-36 border-b border-charcoal/10 py-16 last:border-b-0 sm:py-20 lg:py-28"
          >
            <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16 xl:grid-cols-[minmax(0,24rem)_1fr]">
              <Reveal className="lg:sticky lg:top-40 lg:self-start">
                <p className="eyebrow text-gold">Chapter {chapter.numeral}</p>
                <h2 id={`shades-${chapter.id}-title`} className="display-2 mt-4 text-balance">
                  {chapter.title}
                </h2>
                <p className="font-display mt-5 max-w-sm text-[1.125rem] leading-relaxed font-light text-charcoal/75 italic">
                  {chapter.description}
                </p>
                <div
                  aria-hidden="true"
                  className="mt-8 h-1.5 w-full max-w-xs"
                  style={{ backgroundImage: chapter.ribbon }}
                />
                <p className="eyebrow mt-4 text-charcoal/50">
                  {chapter.items.length} {chapter.items.length === 1 ? "shade" : "shades"}
                </p>
              </Reveal>

              <ul className="grid grid-cols-4 gap-2 sm:grid-cols-5 sm:gap-3 md:grid-cols-6 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8">
                {chapter.items.map((shade) => (
                  <li key={shade.code}>
                    <Swatch
                      shade={shade}
                      selected={open && active?.code === shade.code}
                      onSelect={select}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <ShadeDetail shade={active} open={open} onClose={close} onStep={step} closeRef={closeRef} />
    </div>
  );
}

function Swatch({
  shade,
  selected,
  onSelect,
}: {
  shade: Shade;
  selected: boolean;
  onSelect: (shade: Shade, trigger: HTMLButtonElement) => void;
}) {
  return (
    <button
      type="button"
      data-shade={shade.code}
      aria-label={`Shade ${shade.code}, ${shade.name}`}
      aria-pressed={selected}
      onClick={(event) => onSelect(shade, event.currentTarget)}
      className={cn(
        "group block w-full bg-ivory p-1 text-left shadow-[0_1px_2px_rgb(0_0_0/0.06)] ring-1 transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_14px_28px_-14px_rgb(0_0_0/0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:p-1.5",
        selected ? "ring-gold" : "ring-charcoal/10 hover:ring-gold/70",
      )}
    >
      <span
        aria-hidden="true"
        className="block aspect-[3/4] w-full"
        style={{ backgroundColor: shade.hex, backgroundImage: SHEEN }}
      />
      <span className="block px-0.5 pt-2 pb-1">
        <span className="block font-sans text-[0.6rem] tracking-[0.18em] text-charcoal uppercase sm:text-[0.65rem]">
          {shade.code}
        </span>
        <span className="font-display mt-0.5 hidden truncate text-[0.85rem] leading-tight font-light text-charcoal/65 italic sm:block">
          {shade.name}
        </span>
      </span>
    </button>
  );
}

function ShadeDetail({
  shade,
  open,
  onClose,
  onStep,
  closeRef,
}: {
  shade: Shade | null;
  open: boolean;
  onClose: () => void;
  onStep: (delta: number) => void;
  closeRef: RefObject<HTMLButtonElement | null>;
}) {
  return (
    <aside
      role="dialog"
      aria-modal="false"
      aria-label={shade ? `Shade ${shade.code}, ${shade.name}` : "Shade detail"}
      inert={!open}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-gold/40 bg-ivory transition-[transform,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "lg:inset-x-auto lg:top-0 lg:right-0 lg:h-full lg:w-[26rem] lg:overflow-y-auto lg:border-t-0 lg:border-l",
        open
          ? "translate-y-0 shadow-[0_-20px_50px_-20px_rgb(0_0_0/0.35)] lg:translate-x-0 lg:shadow-[-20px_0_50px_-20px_rgb(0_0_0/0.35)]"
          : "translate-y-full shadow-none lg:translate-x-full lg:translate-y-0",
      )}
    >
      {shade ? (
        <div className="flex min-h-full flex-col p-5 sm:p-6 lg:px-9 lg:pt-32 lg:pb-10">
          <div className="flex items-start gap-5 lg:flex-col lg:gap-8">
            <div className="w-28 shrink-0 bg-ivory p-1.5 ring-1 ring-charcoal/10 sm:w-36 lg:w-full lg:p-2">
              <div
                className="aspect-[3/4] w-full transition-colors duration-700 lg:aspect-[6/5]"
                style={{ backgroundColor: shade.hex, backgroundImage: SHEEN }}
              />
            </div>
            <div className="min-w-0 flex-1 pr-8 lg:pr-0">
              <p className="eyebrow text-gold">{chapterTitle[shade.chapter]}</p>
              <p className="display-2 mt-2 lg:mt-3">No. {shade.code}</p>
              <p className="font-display mt-1 text-[1.25rem] font-light text-charcoal/75 italic">
                {shade.name}
              </p>
              <p className="eyebrow mt-4 text-charcoal/50">
                Indicative <span className="ml-1 font-sans tracking-[0.12em]">{shade.hex}</span>
              </p>
            </div>
          </div>

          <p className="body-editorial mt-5 hidden text-charcoal/70 lg:block">
            Screens cannot show the depth of dyed Pashmina. We are happy to send a physical swatch
            before you choose.
          </p>

          <div className="mt-5 flex items-center justify-between gap-4 lg:mt-auto lg:flex-col lg:items-start lg:gap-8">
            <TextLink to="/contact">Enquire About This Shade</TextLink>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onStep(-1)}
                aria-label="Previous shade"
                className="nav-label flex h-10 w-10 items-center justify-center border border-charcoal/15 text-charcoal transition-colors duration-500 hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => onStep(1)}
                aria-label="Next shade"
                className="nav-label flex h-10 w-10 items-center justify-center border border-charcoal/15 text-charcoal transition-colors duration-500 hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                →
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close shade detail"
        className="nav-label absolute top-3 right-3 flex h-10 w-10 items-center justify-center text-charcoal/60 transition-colors duration-500 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold lg:top-[4.75rem] lg:right-5"
      >
        ✕
      </button>
    </aside>
  );
}
