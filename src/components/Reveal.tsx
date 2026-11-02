"use client";

import { useLayoutEffect, useRef, useState, type ElementType, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
};

/** Quiet entrance for blocks that start below the fold. In-view copy stays painted. */
export function Reveal({ children, className, delay = 0, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [belowFold, setBelowFold] = useState(false);
  const [shown, setShown] = useState(false);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const rect = node.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) {
      setShown(true);
      return;
    }

    setBelowFold(true);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const animate = belowFold;

  return (
    <Tag
      ref={ref as never}
      style={animate && delay && !shown ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(animate && "reveal", animate && shown && "reveal-in", className)}
    >
      {children}
    </Tag>
  );
}
