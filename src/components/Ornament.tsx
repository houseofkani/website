import ornament from "@/assets/ornament-flourish.png";
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
    <img
      src={ornament}
      alt=""
      aria-hidden="true"
      loading="lazy"
      width={1248}
      height={544}
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
