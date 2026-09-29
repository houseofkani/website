import { OptimizedImage } from "@/components/OptimizedImage";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

/** Engraved botanical flourish used to separate movements of a page. */
export function Ornament({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const width = size === "sm" ? "w-24" : size === "lg" ? "w-64" : "w-40";
  return (
    <OptimizedImage
      src={images.ornament}
      alt=""
      aria-hidden
      width={640}
      height={279}
      sizes="(max-width: 640px) 6rem, 10rem"
      className={cn("h-auto opacity-70 select-none", width, className)}
    />
  );
}

/** A hairline rule with the flourish centred. */
export function OrnamentRule({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      <span className="rule-gold w-16 sm:w-28" />
      <Ornament size="sm" className="w-16 sm:w-20" />
      <span className="rule-gold w-16 sm:w-28" />
    </div>
  );
}
