"use client";

import Link from "next/link";
import { useState } from "react";

import { OptimizedImage } from "@/components/OptimizedImage";
import { Reveal } from "@/components/Reveal";
import type { JournalArticle } from "@/lib/cms";

export function JournalGrid({ articles }: { articles: JournalArticle[] }) {
  const categories = ["All", ...new Set(articles.map((a) => a.category))];
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const visible =
    category === "All" ? articles : articles.filter((a) => a.category === category);

  return (
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
  );
}
