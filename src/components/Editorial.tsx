import { Link } from "@tanstack/react-router";
import { type ReactNode } from "react";

import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

/** Small uppercase label above a heading. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("eyebrow text-gold", className)}>{children}</p>;
}

/** Understated editorial link with a drawn arrow. */
export function TextLink({
  to,
  children,
  tone = "dark",
  className,
}: {
  to: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "nav-label group inline-flex items-center gap-3 border-b pb-1 transition-colors duration-500",
        tone === "light"
          ? "border-ivory/35 text-ivory hover:border-gold hover:text-gold"
          : "border-charcoal/25 text-charcoal hover:border-gold hover:text-gold",
        className,
      )}
    >
      {children}
      <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}

/** A framed oval image in the Victorian archive manner. */
export function FramedImage({
  src,
  alt,
  className,
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[34rem]", className)}>
      <div className="relative aspect-square overflow-hidden rounded-[50%] border border-gold/45 p-2">
        <div className="h-full w-full overflow-hidden rounded-[50%] border border-gold/25">
          <img
            src={src}
            alt={alt}
            loading="lazy"
            width={width}
            height={height}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

/** Alternating two-column editorial band. */
export function SplitSection({
  image,
  imageAlt,
  eyebrow,
  title,
  body,
  action,
  reverse = false,
  tone = "ivory",
  imageRatio = "portrait",
}: {
  image: string;
  imageAlt: string;
  eyebrow?: string;
  title: ReactNode;
  body: ReactNode;
  action?: ReactNode;
  reverse?: boolean;
  tone?: "ivory" | "cream" | "forest" | "burgundy";
  imageRatio?: "portrait" | "landscape" | "square";
}) {
  const toneClass = {
    ivory: "bg-ivory text-charcoal",
    cream: "bg-cream text-charcoal",
    forest: "bg-forest text-ivory",
    burgundy: "bg-burgundy text-ivory",
  }[tone];
  const light = tone === "forest" || tone === "burgundy";
  const ratio = {
    portrait: "aspect-[4/5]",
    landscape: "aspect-[4/3]",
    square: "aspect-square",
  }[imageRatio];

  return (
    <section className={cn("overflow-hidden", toneClass)}>
      <div
        className={cn(
          "mx-auto grid max-w-[1560px] items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-20 lg:px-12 lg:py-32",
          reverse && "lg:[&>*:first-child]:order-2",
        )}
      >
        <Reveal>
          <div className={cn("overflow-hidden", ratio)}>
            <img src={image} alt={imageAlt} loading="lazy" className="h-full w-full object-cover" />
          </div>
        </Reveal>
        <Reveal delay={120} className="max-w-xl">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h2 className="display-2 mt-4 text-balance">{title}</h2>
          <div
            className={cn(
              "body-editorial mt-6 space-y-5",
              light ? "text-ivory/78" : "text-charcoal/80",
            )}
          >
            {body}
          </div>
          {action ? <div className="mt-9">{action}</div> : null}
        </Reveal>
      </div>
    </section>
  );
}

/** Full-bleed image band with text over it. */
export function ImmersiveSection({
  image,
  imageAlt,
  eyebrow,
  title,
  body,
  action,
  align = "left",
  minHeight = "min-h-[80svh]",
  position = "center",
}: {
  image: string;
  imageAlt: string;
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  action?: ReactNode;
  align?: "left" | "center";
  minHeight?: string;
  position?: string;
}) {
  return (
    <section className={cn("relative isolate flex items-center overflow-hidden", minHeight)}>
      <img
        src={image}
        alt={imageAlt}
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        style={{ objectPosition: position }}
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10",
          align === "center"
            ? "bg-forest/65"
            : "bg-gradient-to-r from-forest/88 via-forest/55 to-transparent",
        )}
      />
      <div className="mx-auto w-full max-w-[1560px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <Reveal
          className={cn(
            "image-copy text-ivory",
            align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl",
          )}
        >
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h2 className="display-2 mt-4 text-balance">{title}</h2>
          {body ? <div className="body-editorial mt-6 space-y-5 text-ivory/90">{body}</div> : null}
          {action ? <div className="mt-9">{action}</div> : null}
        </Reveal>
      </div>
    </section>
  );
}

/** Numbered movement used on the craft and Kani pages. */
export function MovementList({
  items,
  tone = "ivory",
}: {
  items: { index: string; title: string; body: string }[];
  tone?: "ivory" | "cream";
}) {
  return (
    <div className="divide-y divide-border">
      {items.map((item, i) => (
        <Reveal
          key={item.title}
          delay={i * 60}
          className={cn(
            "grid gap-4 py-10 sm:grid-cols-[6rem_1fr] sm:gap-10 lg:grid-cols-[8rem_1fr]",
            tone === "cream" && "",
          )}
        >
          <p className="eyebrow pt-2 text-gold">{item.index}</p>
          <div>
            <h3 className="display-3">{item.title}</h3>
            <p className="body-editorial mt-4 max-w-2xl text-charcoal/80">{item.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/** A quiet pull quote. */
export function PullQuote({ children, cite }: { children: ReactNode; cite?: string }) {
  return (
    <Reveal as="blockquote" className="mx-auto max-w-3xl py-4 text-center">
      <p className="font-display text-[1.5rem] leading-snug font-light text-balance italic sm:text-[2rem]">
        {children}
      </p>
      {cite ? <footer className="eyebrow mt-6 text-gold">{cite}</footer> : null}
    </Reveal>
  );
}
