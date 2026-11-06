import { OptimizedImage } from "@/components/OptimizedImage";
import { cn } from "@/lib/utils";

/**
 * The House of Kani HK emblem — the house's supplied gold mark.
 * 1024² with a transparent ground, so it sits on ivory, forest or photography.
 */
export function Emblem({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <OptimizedImage
      src="/images/house-of-kani-emblem-v1.png"
      alt=""
      aria-hidden="true"
      width={1024}
      height={1024}
      priority={priority}
      sizes="(max-width: 640px) 40px, 44px"
      className={cn("h-auto w-10 shrink-0 select-none", className)}
    />
  );
}
