import { OptimizedImage } from "@/components/OptimizedImage";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

export function Monogram({ className }: { className?: string }) {
  return (
    <OptimizedImage
      src={images.logo}
      alt="House of Kani emblem"
      width={112}
      height={112}
      sizes="56px"
      className={cn("h-auto w-10 select-none", className)}
    />
  );
}
