import { Reveal } from "@/components/Reveal";
import { Ornament } from "@/components/Ornament";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  image: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  imageAlt: string;
  height?: "full" | "tall" | "medium";
  position?: string;
};

/** Cinematic opening image with the header overlaying it. */
export function PageHero({
  image,
  eyebrow,
  title,
  subtitle,
  imageAlt,
  height = "tall",
  position = "center",
}: PageHeroProps) {
  const heightClass =
    height === "full"
      ? "min-h-svh"
      : height === "tall"
        ? "min-h-[78svh] sm:min-h-[88svh]"
        : "min-h-[58svh] sm:min-h-[66svh]";

  return (
    <section className={cn("relative isolate flex items-end overflow-hidden", heightClass)}>
      <img
        src={image}
        alt={imageAlt}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        style={{ objectPosition: position }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-forest/80 via-forest/20 to-forest/90"
      />
      <div className="mx-auto w-full max-w-[1560px] px-5 pt-32 pb-16 sm:px-8 sm:pb-20 lg:px-12 lg:pb-28">
        <Reveal className="image-copy max-w-3xl text-ivory">
          <Ornament size="sm" className="mb-5 w-20 brightness-[1.6]" />
          {eyebrow ? <p className="eyebrow text-gold">{eyebrow}</p> : null}
          <h1 className="display-1 mt-4 text-balance">{title}</h1>
          {subtitle ? (
            <p className="font-display mt-6 max-w-xl text-[1.125rem] leading-relaxed font-light text-ivory italic sm:text-[1.3rem]">
              {subtitle}
            </p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
