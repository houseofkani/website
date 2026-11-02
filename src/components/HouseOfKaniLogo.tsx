import { cn } from "@/lib/utils";

/** The House of Kani paisley-and-shuttle emblem. Pair with the full name. */
export function HouseOfKaniLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label="House of Kani paisley and weaving-shuttle logo"
      className={cn("h-auto w-10 shrink-0 select-none", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>House of Kani paisley and weaving-shuttle logo</title>
      <path
        d="M60 105C51 94 30 80 21 63 11 44 19 24 38 15 54 8 73 13 87 25c12 10 15 23 8 33-6 9-17 10-24 3-5-5-4-13 2-16 4-2 9 0 10 4"
        strokeWidth="3"
      />
      <path
        d="M60 94C47 82 31 69 28 53c-3-13 5-25 17-30m15 69c12-10 25-21 31-34"
        strokeWidth="2"
      />
      <path
        d="M60 34 67 46v31L60 89l-7-12V46l7-12Zm-6 20h12m-12 6h12m-12 6h12m-11 6h10"
        strokeWidth="2.4"
      />
      <path
        d="M43 58c-8 2-12 7-12 13 7-1 11-5 12-13Zm2 12c-8 1-12 6-13 12 7 0 12-4 13-12Zm32-12c8 2 12 7 12 13-7-1-11-5-12-13Zm-2 12c8 1 12 6 13 12-7 0-12-4-13-12ZM48 86c3 1 7 4 12 10 5-6 9-9 12-10-2 8-6 13-12 17-6-4-10-9-12-17Z"
        strokeWidth="2"
      />
    </svg>
  );
}