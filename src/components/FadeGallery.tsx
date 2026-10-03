"use client";

import { useEffect, useState } from "react";

import { OptimizedImage } from "@/components/OptimizedImage";
import { cn } from "@/lib/utils";

type Slide = {
  src: string;
  /** Landscape crop for large screens. Portrait `src` is used below `lg`. */
  landscapeSrc?: string;
  alt: string;
};

/** Crossfades full-bleed images. Stays on the first slide when motion is reduced. */
export function FadeGallery({
  slides,
  interval = 6000,
  className,
}: {
  slides: readonly Slide[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const hasLandscape = slides.some((slide) => slide.landscapeSrc);

  useEffect(() => {
    if (slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [interval, slides.length]);

  return (
    <div className={cn("absolute inset-0", className)}>
      <div className={cn("absolute inset-0", hasLandscape && "lg:hidden")}>
        {slides.map((slide, i) => (
          <OptimizedImage
            key={`portrait-${slide.src}`}
            src={slide.src}
            alt={i === index ? slide.alt : ""}
            aria-hidden={i === index ? undefined : true}
            fill
            sizes="100vw"
            className={cn(
              "object-cover transition-opacity duration-[1800ms] ease-in-out",
              i === index ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
      </div>
      {hasLandscape ? (
        <div className="absolute inset-0 hidden lg:block">
          {slides.map((slide, i) => (
            <OptimizedImage
              key={`landscape-${slide.landscapeSrc ?? slide.src}`}
              src={slide.landscapeSrc ?? slide.src}
              alt=""
              aria-hidden
              fill
              sizes="100vw"
              className={cn(
                "object-cover transition-opacity duration-[1800ms] ease-in-out",
                i === index ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
