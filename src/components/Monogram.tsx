import { cn } from "@/lib/utils";

type MonogramProps = {
  className?: string;
  /** Hide from assistive tech when the house name is already spoken nearby. */
  decorative?: boolean;
};

/**
 * House of Kani seal — a royal Cinzel HK monogram in a double maison ring.
 * The letters are outlined (not font-dependent) and centred on a 120-unit grid.
 */
export function Monogram({ className, decorative = false }: MonogramProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-auto w-10 select-none text-gold", className)}
      {...(decorative
        ? { "aria-hidden": true }
        : { role: "img", "aria-label": "House of Kani monogram" })}
    >
      <circle cx="60" cy="60" r="56.9" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="60" cy="60" r="50.6" stroke="currentColor" strokeWidth="0.58" />
      <path fill="currentColor" d="M60 4.48 61.92 6.4 60 8.32 58.08 6.4Z" />
      <path fill="currentColor" d="M113.59 58.08 115.52 60 113.59 61.92 111.67 60Z" />
      <path fill="currentColor" d="M60 111.67 61.92 113.59 60 115.52 58.08 113.59Z" />
      <path fill="currentColor" d="M6.4 58.08 8.32 60 6.4 61.92 4.48 60Z" />
      <path
        fill="currentColor"
        d="M55.32 42.5V77.5H45.07V42.5ZM31.62 42.5V77.5H21.37V42.5ZM45.52 58.75V61.25H31.12V58.75ZM21.52 73.85V77.5H17.52V77Q17.52 77 17.85 77Q18.17 77 18.17 77Q19.47 77 20.4 76.08Q21.32 75.15 21.37 73.85ZM21.52 46.15H21.37Q21.32 44.85 20.4 43.92Q19.47 43 18.17 43Q18.17 43 17.85 43Q17.52 43 17.52 43V42.5H21.52ZM31.47 73.85H31.62Q31.67 75.15 32.6 76.08Q33.52 77 34.82 77Q34.82 77 35.12 77Q35.42 77 35.47 77V77.5H31.47ZM31.47 46.15V42.5H35.47V43Q35.42 43 35.12 43Q34.82 43 34.82 43Q33.52 43 32.6 43.92Q31.67 44.85 31.62 46.15ZM45.22 73.85V77.5H41.22V77Q41.27 77 41.57 77Q41.87 77 41.87 77Q43.17 77 44.12 76.08Q45.07 75.15 45.07 73.85ZM45.22 46.15H45.07Q45.07 44.85 44.12 43.92Q43.17 43 41.87 43Q41.87 43 41.57 43Q41.27 43 41.22 43V42.5H45.22ZM55.17 73.85H55.32Q55.37 75.15 56.3 76.08Q57.22 77 58.52 77Q58.52 77 58.85 77Q59.17 77 59.17 77V77.5H55.17ZM55.17 46.15V42.5H59.17V43Q59.17 43 58.85 43Q58.52 43 58.52 43Q57.22 43 56.3 43.92Q55.37 44.85 55.32 46.15Z"
      />
      <path
        fill="currentColor"
        d="M84.72 54.5 97.12 73.2Q98.32 75.05 99.62 76Q100.92 76.95 102.47 77V77.5H97.07Q96.53 77.5 95.03 77.45Q93.53 77.4 91.58 77Q89.62 76.6 87.65 75.55Q85.67 74.5 84.22 72.5Q83.82 71.95 83.17 70.97Q82.53 70 81.75 68.78Q80.97 67.55 80.17 66.3Q79.38 65.05 78.72 64Q78.07 62.95 77.67 62.28Q77.27 61.6 77.27 61.6ZM96.03 42.85 80.92 61.1 77.27 61.6 91.03 42.85ZM99.57 42.5V42.95H99.38Q97.72 42.95 96.3 43.62Q94.88 44.3 93.88 45.4L89.22 45.3Q89.82 44.45 89.45 43.7Q89.07 42.95 88.03 42.95H87.53V42.5H99.38ZM75.67 42.5V77.5H65.42V42.5ZM65.57 73.85V77.5H61.57V77Q61.67 77 61.92 77Q62.17 77 62.22 77Q63.52 77 64.45 76.08Q65.38 75.15 65.42 73.85ZM65.57 46.15H65.42Q65.38 44.85 64.45 43.92Q63.52 43 62.22 43Q62.17 43 61.92 43Q61.67 43 61.57 43V42.5H65.57ZM75.52 73.85H75.67Q75.72 75.15 76.65 76.08Q77.57 77 78.88 77Q78.97 77 79.22 77Q79.47 77 79.53 77V77.5H75.52ZM75.52 46.15V42.5H79.53V43Q79.47 43 79.22 43Q78.97 43 78.88 43Q77.57 43 76.65 43.92Q75.72 44.85 75.67 46.15Z"
      />
    </svg>
  );
}
