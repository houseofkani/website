import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { OptimizedImage } from "@/components/OptimizedImage";
import { OrnamentRule } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";
import { articles, getArticle } from "@/lib/journal";
import {
  blogPostingLd,
  breadcrumbLd,
  jsonLdScript,
  seoBundle,
} from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) {
    return seoBundle({
      title: "Story Not Found",
      pathname: `/journal/${slug}`,
      robots: "noindex",
    });
  }
  return seoBundle({
    title: article.title,
    description: article.dek,
    pathname: `/journal/${article.slug}`,
    image: article.image,
    type: "article",
    authors: ["House of Kani"],
  });
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <article className="bg-ivory">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            blogPostingLd({
              title: article.title,
              description: article.dek,
              path: `/journal/${article.slug}`,
              image: article.image,
            }),
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Journal", path: "/journal" },
              { name: article.title, path: `/journal/${article.slug}` },
            ]),
          ]),
        }}
      />
      <header className="relative isolate flex min-h-[86svh] items-end overflow-hidden text-ivory">
        <OptimizedImage
          src={article.image}
          alt={article.imageAlt}
          fill
          priority
          sizes="100vw"
          quality={92}
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-forest/60 via-forest/15 to-forest/90" />
        <div className="relative z-10 mx-auto w-full max-w-[1100px] px-5 pt-36 pb-14 sm:px-8 sm:pb-20">
          <Reveal>
            <p className="eyebrow text-gold">
              {article.category} · {article.readTime}
            </p>
            <h1 className="display-1 mt-4 max-w-4xl">{article.title}</h1>
            <p className="font-display mt-5 max-w-2xl text-[1.2rem] leading-relaxed font-light italic text-ivory/85">
              {article.dek}
            </p>
          </Reveal>
        </div>
      </header>
      <div className="mx-auto max-w-[780px] px-5 py-20 sm:px-8 sm:py-28">
        <p className="eyebrow text-gold">{article.date}</p>
        {article.body.map((section, i) => (
          <Reveal key={i} className="mt-12 first:mt-7">
            {section.heading ? <h2 className="display-3 mb-5">{section.heading}</h2> : null}
            {section.paragraphs.map((p) => (
              <p key={p} className="body-editorial mt-5 text-charcoal/80 first:mt-0">
                {p}
              </p>
            ))}
            {section.quote ? (
              <blockquote className="my-14 border-y border-gold/35 py-10 text-center font-display text-[1.55rem] leading-snug font-light italic sm:text-[2rem]">
                {section.quote}
              </blockquote>
            ) : null}
          </Reveal>
        ))}
      </div>
      <section className="bg-cream px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1560px]">
          <div className="text-center">
            <p className="eyebrow text-gold">Continue Reading</p>
            <h2 className="display-2 mt-3">Related Stories</h2>
            <OrnamentRule className="mt-7" />
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {related.map((a) => (
              <Link key={a.slug} href={`/journal/${a.slug}`} className="group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <OptimizedImage
                    src={a.image}
                    alt={a.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.03]"
                  />
                </div>
                <p className="eyebrow mt-5 text-gold">{a.category}</p>
                <h3 className="display-3 mt-2">{a.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
