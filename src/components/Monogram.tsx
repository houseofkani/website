import { cn } from "@/lib/utils";

export function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label="House of Kani emblem"
      className={cn("h-auto w-10 select-none text-gold", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M60 5 68 18 60 30 52 18 60 5Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M60 115 52 102 60 90 68 102 60 115Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 60 18 52 30 60 18 68 5 60Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M115 60 102 68 90 60 102 52 115 60Z" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M60 18C74 18 82 25 84 36 95 38 102 46 102 60S95 82 84 84C82 95 74 102 60 102S38 95 36 84C25 82 18 74 18 60S25 38 36 36C38 25 46 18 60 18Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M38 35C47 43 52 50 60 60c8-10 13-17 22-25M35 82c9-8 16-13 25-22 9 9 16 14 25 22" stroke="currentColor" strokeWidth="1.4" />
      <path d="M35 38c8 9 13 15 25 22-12 7-17 13-25 22M85 38c-8 9-13 15-25 22 12 7 17 13 25 22" stroke="currentColor" strokeWidth="1.4" />
      <path d="M44 42v36M76 42v36M44 60h32M76 42 45 78" stroke="currentColor" strokeWidth="3" />
      <circle cx="60" cy="60" r="52" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="60" cy="60" r="47" stroke="currentColor" strokeWidth="0.6" strokeDasharray="1 4" />
    </svg>
  );
}
