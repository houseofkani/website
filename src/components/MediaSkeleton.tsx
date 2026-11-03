"use client";

import { useEffect, useRef, useState } from "react";

import { OptimizedImage } from "@/components/OptimizedImage";
import { cn } from "@/lib/utils";

type MediaSkeletonProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  quality?: number;
  /** Classes for the image itself — hover motion, object position, etc. */
  className?: string;
};

/**
 * Journal-card imagery with its own skeleton. A cream shimmer is painted
 * *behind* the picture, so the image is never hidden behind JavaScript: it
 * simply covers the shimmer the moment its pixels arrive, and the shimmer is
 * unmounted afterwards to keep the page quiet.
 * Render inside a positioned box (the card's `relative aspect-[4/3]`).
 */
export function MediaSkeleton({
  src,
  alt,
  sizes,
  priority = false,
  quality,
  className,
}: MediaSkeletonProps) {
  const [loaded, setLoaded] = useState(false);
  const holder = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    // A cached image can finish before hydration attaches onLoad.
    const image = holder.current?.parentElement?.querySelector("img");
    if (image?.complete) setLoaded(true);
  }, []);

  return (
    <span ref={holder} className="contents">
      {loaded ? null : (
        <span aria-hidden="true" className="skeleton-block absolute inset-0">
          <span className="skeleton-sheen" />
        </span>
      )}
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        quality={quality}
        onLoad={() => setLoaded(true)}
        className={cn("object-cover", className)}
      />
    </span>
  );
}
