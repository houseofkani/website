import { cn } from "@/lib/utils";

export function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label="House of Kani HK monogram"
      className={cn("h-auto w-10 select-none", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>House of Kani HK monogram</title>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="60" cy="60" rx="48" ry="42" strokeWidth="1.5" />
        <ellipse cx="60" cy="60" rx="44.5" ry="38.5" strokeWidth="0.7" />
        <path d="M60 17V11m0 92v6" strokeWidth="1.4" />
        <path d="M60 5c-2.2 2.5-2.2 4.5 0 6.5 2.2-2 2.2-4 0-6.5Zm-1 7c-5.4-3.5-8.7-3.2-10 .2 2.1 3 5.5 3.1 10 .8Zm2 0c5.4-3.5 8.7-3.2 10 .2-2.1 3-5.5 3.1-10 .8ZM60 115c-2.2-2.5-2.2-4.5 0-6.5 2.2 2 2.2 4 0 6.5Zm-1-7c-5.4 3.5-8.7 3.2-10-.2 2.1-3 5.5-3.1 10-.8Zm2 0c5.4 3.5 8.7 3.2 10-.2-2.1-3-5.5-3.1-10-.8Z" strokeWidth="1.2" />
      </g>
      <path d="M28 39h16v4h-5v13h15V43h-5v-4h16v4h-5v34h5v4H49v-4h5V61H39v16h5v4H28v-4h5V43h-5v-4Zm36 0h16v4h-5v13l14-13h-4v-4h16v4h-4L82 60l18 17h5v4H88v-4h4L75 63v14h5v4H64v-4h5V43h-5v-4Z" fill="currentColor" />
    </svg>
  );
}
