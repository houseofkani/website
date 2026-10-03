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
      {slides.map((slide, i) => {
        const active = i === index;
        return (
          <div key={slide.src} className="absolute inset-0" aria-hidden={active ? undefined : true}>
            <OptimizedImage
              src={slide.src}
              alt={active ? slide.alt : ""}
              fill
              sizes="100vw"
              className={cn(
                "object-cover transition-opacity duration-[1800ms] ease-in-out",
                slide.landscapeSrc ? "lg:hidden" : null,
                active ? "opacity-100" : "opacity-0",
              )}
            />
            {slide.landscapeSrc ? (
              <OptimizedImage
                src={slide.landscapeSrc}
                alt=""
                fill
                sizes="100vw"
                className={cn(
                  "hidden object-cover transition-opacity duration-[1800ms] ease-in-out lg:block",
                  active ? "opacity-100" : "opacity-0",
                )}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
