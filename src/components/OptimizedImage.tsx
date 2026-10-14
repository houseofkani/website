import Image, { type ImageProps } from "next/image";

import { cn } from "@/lib/utils";

type OptimizedImageProps = Omit<ImageProps, "alt"> & {
  alt: string;
  /** Mark LCP / above-the-fold heroes — disables lazy loading. */
  priority?: boolean;
};

/**
 * Performance-first image wrapper: next/image encodes JPG masters → WebP once,
 * with high quality and retina-capable device sizes from next.config.
 */
export function OptimizedImage({
  alt,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1200px",
  quality = 82,
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
