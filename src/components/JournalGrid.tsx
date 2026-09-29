"use client";

import Link from "next/link";
import { useState } from "react";

import { OptimizedImage } from "@/components/OptimizedImage";
import { Reveal } from "@/components/Reveal";
import { articles, type JournalArticle } from "@/lib/journal";

const categories = ["All", "Kani", "Pashmina", "Craft", "Heritage", "Kashmir", "People"] as const;

export function JournalGrid({ featured }: { featured: JournalArticle }) {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const visible =
    category === "All" ? articles : articles.filter((a) => a.category === category);

  return (
    <>
      <section className="bg-forest text-ivory">
        <Link
          href={`/journal/${featured.slug}`}
          className="group mx-auto grid max-w-[1560px] lg:grid-cols-[1.35fr_0.65fr]"
        >
          <div className="relative min-h-[52svh] overflow-hidden">
            <OptimizedImage
              src={featured.image}
              alt={featured.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-cover transition-transform duration-[1600ms] group-hover:scale-[1.02]"
            />
          </div>
          <div className="flex flex-col justify-center px-7 py-14 sm:px-12 lg:px-16">
            <p className="eyebrow text-gold">Featured · {featured.category}</p>
            <h2 className="display-2 mt-4">{featured.title}</h2>
            <p className="mt-6 text-ivory/70">{featured.dek}</p>
            <span className="nav-label mt-8 text-gold">Read the Story →</span>
          </div>
        </Link>
      </section>

      <section className="bg-ivory px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1560px]">
          <div className="flex flex-wrap justify-center gap-x-7 gap-y-3 border-b border-border pb-6">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`nav-label border-b pb-1 transition-colors ${
                  category === c
                    ? "border-gold text-charcoal"
                    : "border-transparent text-stone hover:text-charcoal"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="mt-12 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((a, i) => (
              <Reveal key={a.slug} delay={i * 70}>
                <Link href={`/journal/${a.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <OptimizedImage
                      src={a.image}
                      alt={a.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="eyebrow mt-5 text-gold">
                    {a.category} · {a.readTime}
                  </p>
                  <h2 className="display-3 mt-2 group-hover:text-burgundy">{a.title}</h2>
                  <p className="mt-3 text-charcoal/65">{a.dek}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
