import monogram from "@/assets/hok-monogram.png.asset.json";
import { cn } from "@/lib/utils";

export function Monogram({ className }: { className?: string }) {
  return (
    <img
      src={monogram.url}
      alt="House of Kani monogram"
      loading="lazy"
      className={cn("h-auto w-10 select-none", className)}
    />
  );
}
