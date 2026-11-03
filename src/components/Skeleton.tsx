import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

/** A single shimmering block. Purely decorative — always hidden from AT. */
export function Skeleton({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: Tone;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "block",
        tone === "dark" ? "skeleton-block-dark" : "skeleton-block",
        className,
      )}
    >
      <span className={tone === "dark" ? "skeleton-sheen-dim" : "skeleton-sheen"} />
    </span>
  );
}

/**
 * One journal card in skeleton form: the 4:3 picture and the three lines of
 * copy, at the same rhythm as the loaded card.
 */
export function JournalCardSkeleton() {
  return (
    <div>
      <Skeleton className="aspect-[4/3] w-full" />
      <Skeleton className="mt-5 h-2.5 w-24" />
      <Skeleton className="mt-4 h-6 w-[92%]" />
      <Skeleton className="mt-2 h-6 w-[68%]" />
      <div className="mt-4 space-y-2.5">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-[86%]" />
        <Skeleton className="h-3.5 w-[54%]" />
      </div>
    </div>
  );
}

/** The article grid used on the journal listing. */
export function JournalGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-ivory px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
    >
      <span className="sr-only">Loading the Journal…</span>
      <div className="mx-auto max-w-[1560px]" aria-hidden="true">
        <div className="flex flex-wrap justify-center gap-x-7 gap-y-3 border-b border-border pb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-3 w-16" />
          ))}
        </div>
        <div className="mt-12 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: count }).map((_, i) => (
            <JournalCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

/** The featured story at the top of the journal listing. */
export function JournalFeaturedSkeleton() {
  return (
    <section className="bg-forest text-ivory" aria-hidden="true">
      <div className="mx-auto grid max-w-[1560px] lg:grid-cols-[1.35fr_0.65fr]">
        <div className="skeleton-block-dark relative min-h-[52svh] overflow-hidden">
          <span className="skeleton-sheen-dim" />
        </div>
        <div className="flex flex-col justify-center px-7 py-14 sm:px-12 lg:px-16">
          <Skeleton tone="dark" className="h-2.5 w-32" />
          <Skeleton tone="dark" className="mt-6 h-9 w-[94%]" />
          <Skeleton tone="dark" className="mt-3 h-9 w-[72%]" />
          <div className="mt-7 space-y-3">
            <Skeleton tone="dark" className="h-3.5 w-full" />
            <Skeleton tone="dark" className="h-3.5 w-[88%]" />
            <Skeleton tone="dark" className="h-3.5 w-[61%]" />
          </div>
          <Skeleton tone="dark" className="mt-9 h-3 w-32" />
        </div>
      </div>
    </section>
  );
}

/** Everything the journal listing streams in: featured story + article grid. */
export function JournalListingSkeleton() {
  return (
    <>
      <JournalFeaturedSkeleton />
      <JournalGridSkeleton />
    </>
  );
}

/** The homepage's three-story journal block, including its heading. */
export function HomeJournalSkeleton() {
  return (
    <section className="bg-ivory px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
      <div className="mx-auto max-w-[1420px]">
        <div
          role="status"
          aria-live="polite"
          className="flex flex-col items-center text-center"
        >
          <span className="sr-only">Loading stories from the Journal…</span>
          <Skeleton className="h-2.5 w-24" />
          <Skeleton className="mt-5 h-10 w-[min(22rem,80vw)]" />
          <Skeleton className="mt-6 h-3.5 w-[min(30rem,90vw)]" />
          <Skeleton className="mt-2.5 h-3.5 w-[min(24rem,70vw)]" />
        </div>
        <div className="mt-16 grid gap-x-7 gap-y-12 md:grid-cols-3" aria-hidden="true">
          {Array.from({ length: 3 }).map((_, i) => (
            <JournalCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
