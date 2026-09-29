import monogram from "@/assets/house-of-kani-logo.png";
import { cn } from "@/lib/utils";

export function Monogram({ className }: { className?: string }) {
  return (
    <img
      src={monogram}
      alt="House of Kani emblem"
      loading="lazy"
      className={cn("h-auto w-10 select-none", className)}
    />
  );
}
