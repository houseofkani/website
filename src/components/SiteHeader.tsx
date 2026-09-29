import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Monogram } from "@/components/Monogram";
import { NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
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

  const light = !scrolled && !open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-700",
          scrolled || open
            ? "border-b border-border/70 bg-ivory/95 py-3 backdrop-blur-sm"
            : "border-b border-transparent py-5",
        )}
      >
        <div className="mx-auto flex max-w-[1560px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
          {/* Mobile: menu */}
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
            to="/"
            aria-label="House of Kani — home"
            className={cn(
              "flex flex-1 items-center justify-center gap-2 lg:flex-none lg:justify-start lg:gap-3",
              light ? "text-ivory" : "text-charcoal",
            )}
          >
            <Monogram
              className={cn(
                "w-6 transition-opacity duration-500 sm:w-7",
                light ? "opacity-95" : "opacity-100",
              )}
            />
            <span className="font-display text-[0.95rem] leading-none font-light tracking-[0.22em] whitespace-nowrap uppercase sm:text-[1.1rem]">
              House of Kani
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "nav-label relative py-1 transition-colors duration-500",
                  light ? "text-ivory/80 hover:text-ivory" : "text-charcoal/70 hover:text-charcoal",
                )}
                activeProps={{
                  className: cn(
                    "nav-label relative py-1 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:bg-gold",
                    light ? "text-ivory" : "text-charcoal",
                  ),
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* balance the mobile grid */}
          <span className="h-9 w-9 shrink-0 lg:hidden" aria-hidden="true" />
        </div>
      </header>

      {/* Mobile menu */}
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
              to={item.to}
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
