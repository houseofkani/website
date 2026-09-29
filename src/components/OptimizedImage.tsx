import Image, { type ImageProps } from "next/image";

import { cn } from "@/lib/utils";

type OptimizedImageProps = Omit<ImageProps, "alt"> & {
  alt: string;
  /** Mark LCP / above-the-fold heroes — disables lazy loading. */
  priority?: boolean;
};

/**
 * Performance-first image wrapper: AVIF/WebP via next/image, CLS-safe sizes,
 * priority for LCP, lazy + async decode below the fold.
 */
export function OptimizedImage({
  alt,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1200px",
  quality = 92,
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      alt={alt}
      className={cn(className)}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      decoding="async"
      sizes={sizes}
      quality={quality}
      {...props}
    />
  );
}
