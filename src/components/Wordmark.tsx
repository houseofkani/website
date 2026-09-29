import { Link } from "@tanstack/react-router";

import { Monogram } from "@/components/Monogram";
import { cn } from "@/lib/utils";

export function Wordmark({
  className,
  withMonogram = true,
}: {
  className?: string;
  withMonogram?: boolean;
}) {
  return (
    <Link to="/" className={cn("group flex items-center gap-3", className)} aria-label="House of Kani — home">
      {withMonogram ? <Monogram className="w-7 opacity-90 sm:w-8" /> : null}
      <span className="font-display text-[1.05rem] leading-none font-light tracking-[0.2em] uppercase sm:text-[1.2rem]">
        House of Kani
      </span>
    </Link>
  );
}
