import { Link } from "@tanstack/react-router";

import { Monogram } from "@/components/Monogram";
import { OrnamentRule } from "@/components/Ornament";
import { FOOTER_COLUMNS, SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-forest text-ivory">
      <div className="mx-auto max-w-[1560px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h2 className="eyebrow text-gold">{column.title}</h2>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="font-display text-[1.0625rem] font-light text-ivory/75 transition-colors duration-500 hover:text-ivory"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <OrnamentRule className="mt-16 sm:mt-20" />

        <div className="mt-12 flex flex-col items-center text-center">
          <Monogram className="w-11 opacity-90" />
          <p className="font-display mt-6 text-[1.35rem] leading-none font-light tracking-[0.22em] uppercase sm:text-[1.6rem]">
            House of Kani
          </p>
          <p className="font-display mt-4 text-[1.0625rem] font-light italic text-ivory/70">
            {SITE.tagline}
          </p>
          <address className="mt-8 space-y-1 text-[0.95rem] font-light text-ivory/55 not-italic">
            <p>{SITE.atelier}</p>
            <p>{SITE.email}</p>
          </address>
        </div>

        <div className="mt-14 flex flex-col items-center gap-6 border-t border-ivory/12 pt-8 sm:flex-row sm:justify-between">
          <ul className="flex flex-wrap items-center justify-center gap-6">
            {SITE.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="nav-label text-ivory/55 transition-colors duration-500 hover:text-gold"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="eyebrow text-ivory/40">
            © {new Date().getFullYear()} House of Kani — Srinagar, Kashmir
          </p>
        </div>
      </div>
    </footer>
  );
}
