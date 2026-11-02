import { cn } from "@/lib/utils";

type SkeletonProps = {
  className?: string;
};

/** A single shimmering placeholder block. Motion is reduced globally by CSS. */
export function Skeleton({ className }: SkeletonProps) {
  return <div aria-hidden className={cn("animate-pulse bg-charcoal/[0.07]", className)} />;
}

type Tone = "light" | "dark";

function toneClass(tone: Tone) {
  return tone === "dark" ? "bg-ivory/10" : undefined;
}

/** Card placeholder matching the journal grid: image, category, title, dek. */
export function JournalCardSkeleton({ tone = "light" }: { tone?: Tone }) {
  return (
    <div>
      <Skeleton className={cn("aspect-[4/3] w-full", toneClass(tone))} />
      <Skeleton className={cn("mt-5 h-2.5 w-28", toneClass(tone))} />
      <Skeleton className={cn("mt-4 h-7 w-10/12", toneClass(tone))} />
      <Skeleton className={cn("mt-3 h-4 w-full", toneClass(tone))} />
      <Skeleton className={cn("mt-2 h-4 w-3/4", toneClass(tone))} />
    </div>
  );
}

/** Featured story placeholder for the top of the journal index. */
export function JournalFeaturedSkeleton() {
  return (
    <section className="bg-forest text-ivory" role="status" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading the featured story…</span>
      <div className="mx-auto grid max-w-[1560px] lg:grid-cols-[1.35fr_0.65fr]">
        <Skeleton className="min-h-[52svh] w-full bg-ivory/10" />
        <div className="flex flex-col justify-center px-7 py-14 sm:px-12 lg:px-16">
          <Skeleton className="h-3 w-36 bg-ivory/15" />
          <Skeleton className="mt-5 h-10 w-11/12 bg-ivory/15" />
          <Skeleton className="mt-3 h-10 w-2/3 bg-ivory/15" />
          <Skeleton className="mt-7 h-4 w-full bg-ivory/10" />
          <Skeleton className="mt-2 h-4 w-4/5 bg-ivory/10" />
          <Skeleton className="mt-9 h-3 w-32 bg-gold/40" />
        </div>
      </div>
    </section>
  );
}

/** Category filter and card grid placeholder. */
export function JournalGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <section
      className="bg-ivory px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Loading journal stories…</span>
      <div className="mx-auto max-w-[1560px]">
        <div className="flex flex-wrap justify-center gap-x-7 gap-y-3 border-b border-border pb-6">
          {["w-12", "w-16", "w-14", "w-20", "w-16"].map((width, index) => (
            <Skeleton key={index} className={cn("h-3", width)} />
          ))}
        </div>
        <div className="mt-12 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: count }, (_, index) => (
            <JournalCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Full journal index placeholder (featured story + grid). */
export function JournalListingSkeleton() {
  return (
    <>
      <JournalFeaturedSkeleton />
      <JournalGridSkeleton />
    </>
  );
}

/** Homepage "Notes from the Valley" placeholder, including its section heading. */
export function HomeJournalSkeleton() {
  return (
    <section
      className="bg-ivory px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40"
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Loading journal stories…</span>
      <div className="mx-auto max-w-[1420px]">
        <div className="flex flex-col items-center text-center">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="mt-5 h-12 w-80 max-w-full" />
          <Skeleton className="mt-6 h-4 w-72 max-w-full" />
        </div>
        <div className="mt-16 grid gap-x-7 gap-y-12 md:grid-cols-3">
          {[0, 1, 2].map((index) => (
            <JournalCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Article page placeholder: hero, standing head and body copy. */
export function JournalArticleSkeleton() {
  const lines = ["w-full", "w-11/12", "w-full", "w-4/5"];

  return (
    <div className="bg-ivory" role="status" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading the story…</span>
      <header className="relative isolate flex min-h-[86svh] items-end bg-forest text-ivory">
        <div className="relative z-10 mx-auto w-full max-w-[1100px] px-5 pt-36 pb-14 sm:px-8 sm:pb-20">
          <Skeleton className="mb-6 h-11 w-11 bg-ivory/15" />
          <Skeleton className="h-3 w-40 bg-ivory/15" />
          <Skeleton className="mt-5 h-14 w-full max-w-4xl bg-ivory/15" />
          <Skeleton className="mt-3 h-14 w-2/3 bg-ivory/15" />
          <Skeleton className="mt-6 h-5 w-full max-w-2xl bg-ivory/10" />
          <Skeleton className="mt-2 h-5 w-1/2 bg-ivory/10" />
        </div>
      </header>
      <div className="mx-auto max-w-[780px] px-5 py-20 sm:px-8 sm:py-28">
        <Skeleton className="h-3 w-32" />
        {[0, 1, 2].map((block) => (
          <div key={block} className="mt-12 first:mt-7">
            {block > 0 ? <Skeleton className="mb-5 h-8 w-3/5" /> : null}
            {lines.map((width, index) => (
              <Skeleton key={index} className={cn("mt-3 h-4", width)} />
            ))}
            <Skeleton className="mt-3 h-4 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
