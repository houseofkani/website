"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Monogram } from "@/components/Monogram";
import { NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const light = pathname === "/" && !scrolled && !open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-700",
          scrolled || open
            ? "border-b border-charcoal/10 bg-ivory/95 py-3 backdrop-blur-md"
            : "border-b border-ivory/15 py-5",
        )}
      >
        <div className="mx-auto flex max-w-[1560px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={cn(
              "-ml-1 flex h-9 w-9 shrink-0 flex-col items-center justify-center gap-[5px] lg:hidden",
              light ? "text-ivory" : "text-charcoal",
            )}
          >
            <span
              className={cn(
                "block h-px w-5 bg-current transition-transform duration-500",
                open && "translate-y-[3px] rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-px w-5 bg-current transition-transform duration-500",
                open && "-translate-y-[3px] -rotate-45",
              )}
            />
          </button>

          <Link
            href="/"
            aria-label="House of Kani — home"
            className={cn(
                "absolute left-1/2 flex -translate-x-1/2 items-center gap-2 lg:static lg:left-auto lg:mr-8 lg:translate-x-0 lg:gap-3 xl:mr-14",
              light ? "text-ivory" : "text-charcoal",
            )}
          >
            <Monogram
              className={cn(
                "w-7 transition-opacity duration-500 sm:w-8",
                light ? "opacity-95" : "opacity-100",
              )}
            />
            <span className="font-display text-[0.95rem] leading-none font-light tracking-[0.18em] whitespace-nowrap uppercase sm:text-[1.15rem]">
              House of Kani
            </span>
          </Link>

          <nav className="ml-auto hidden items-center gap-6 lg:flex xl:gap-8">
            {NAV.map((item) => {
              const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
              return (
                <Link
                  key={item.to}
                  href={item.to}
                  className={cn(
                    "nav-label relative py-1 transition-colors duration-500",
                    light
                      ? "text-ivory/80 hover:text-ivory"
                      : "text-charcoal/70 hover:text-charcoal",
                    active &&
                      cn(
                        "after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:bg-gold",
                        light ? "text-ivory" : "text-charcoal",
                      ),
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <span className="h-9 w-9 shrink-0 lg:hidden" aria-hidden="true" />
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-forest transition-opacity duration-700 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-1 px-8 text-center">
          {NAV.map((item, i) => (
            <Link
              key={item.to}
              href={item.to}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
              className={cn(
                "font-display py-3 text-[1.75rem] leading-tight font-light tracking-[0.06em] text-ivory transition-all duration-700",
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
              )}
            >
              {item.label}
            </Link>
          ))}
          <p className="eyebrow mt-8 border-y border-gold/40 py-3 text-gold">
            First collection coming soon to Etsy
          </p>
        </nav>
      </div>
    </>
  );
}
