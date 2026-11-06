import type { Metadata } from "next";
import Link from "next/link";
import { draftMode } from "next/headers";
import { notFound, permanentRedirect } from "next/navigation";

import { MediaSkeleton } from "@/components/MediaSkeleton";
import { OptimizedImage } from "@/components/OptimizedImage";
import { OrnamentRule } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";
import { getJournalPost, getJournalPosts, getJournalRedirect } from "@/lib/cms";
import { blogPostingLd, breadcrumbLd, jsonLdScript, seoBundle } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

type Props = { params: Promise<{ slug: string }> };

function ArticleHeading({ level = 2, children }: { level?: 2 | 3 | 4; children: string }) {
  if (level === 3) {
    return (
      <h3 className="mt-10 mb-4 font-display text-[1.45rem] leading-snug">{children}</h3>
    );
  }
  if (level === 4) {
    return <h4 className="mt-8 mb-3 font-display text-[1.2rem] leading-snug">{children}</h4>;
  }
  return <h2 className="display-3 mb-5">{children}</h2>;
}

export async function generateStaticParams() {
  const { getJournalSlugs } = await import("@/lib/cms");
  try {
    const slugs = await getJournalSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { isEnabled: draft } = await draftMode();
  const article = await getJournalPost(slug, { draft });
  if (!article) {
    return seoBundle({
      title: "Story Not Found",
      pathname: `/journal/${slug}`,
      robots: "noindex",
    });
  }
  const { seo } = article;
  return seoBundle({
    title: seo.title || article.title,
    description: seo.description || article.dek,
    pathname: seo.canonicalUrl
      ? new URL(seo.canonicalUrl, siteConfig.url).pathname
      : `/journal/${article.slug}`,
    image: seo.image || article.image,
    type: "article",
    authors: [article.author.name],
    publishedTime: article.publishedAt || undefined,
    modifiedTime: article.updatedAt || undefined,
    robots: seo.noindex ? "noindex" : undefined,
  });
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const { isEnabled: draft } = await draftMode();

  const article = await getJournalPost(slug, { draft });
  if (!article) {
    // The slug may have changed — serve the permanent redirect the CMS recorded.
    const redirect = await getJournalRedirect(slug);
    if (redirect?.type === "internal") permanentRedirect(redirect.path);
    if (redirect?.type === "external") permanentRedirect(redirect.url);
    notFound();
  }

  const all = await getJournalPosts({ draft });
  const related = all.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <article className="bg-ivory">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            blogPostingLd({
              title: article.seo.title || article.title,
              description: article.seo.description || article.dek,
              path: `/journal/${article.slug}`,
              image: article.seo.image || article.image,
              datePublished: article.publishedAt || undefined,
              dateModified: article.updatedAt || undefined,
              author: article.author,
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
          quality={85}
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-forest/60 via-forest/15 to-forest/90" />
        <div className="relative z-10 mx-auto w-full max-w-[1100px] px-5 pt-36 pb-14 sm:px-8 sm:pb-20">
          <p className="eyebrow text-gold">
            {article.category} · {article.readTime}
          </p>
          <h1 className="display-1 mt-4 max-w-4xl">{article.title}</h1>
          <p className="font-display mt-5 max-w-2xl text-[1.2rem] leading-relaxed font-light italic text-ivory/85">
            {article.dek}
          </p>
        </div>
      </header>
      <div className="mx-auto max-w-[780px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <p className="eyebrow text-gold-ink">By {article.author.name}</p>
          {article.author.designation ? (
            <p className="nav-label text-charcoal/55">{article.author.designation}</p>
          ) : null}
          <p className="eyebrow text-charcoal/40">{article.date}</p>
        </div>
        <div className="journal-body">
          {article.body.map((section, i) => (
            <Reveal key={i} className="mt-12 first:mt-7">
              {section.heading ? (
                <ArticleHeading level={section.headingLevel}>{section.heading}</ArticleHeading>
              ) : null}
              {section.paragraphs.map((paragraph, j) => (
                <p
                  key={j}
                  className="body-editorial mt-5 text-charcoal/80 first:mt-0"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
              {section.lists?.map((list, j) => {
                const List = list.ordered ? "ol" : "ul";
                return (
                  <List
                    key={`list-${j}`}
                    className="body-editorial journal-list mt-5 space-y-2 pl-6 text-charcoal/80"
                  >
                    {list.items.map((item, k) => (
                      <li key={k} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </List>
                );
              })}
              {section.quote ? (
                <blockquote
                  className="my-14 border-y border-gold/35 py-10 text-center font-display text-[1.55rem] leading-snug font-light italic sm:text-[2rem]"
                  dangerouslySetInnerHTML={{ __html: section.quote }}
                />
              ) : null}
            </Reveal>
          ))}
        </div>
        {article.author.bio ? (
          <aside className="mt-16 border-t border-gold/35 pt-8">
            <p className="eyebrow text-gold-ink">About the author</p>
            <p className="mt-3 font-display text-2xl text-charcoal">{article.author.name}</p>
            {article.author.designation ? (
              <p className="nav-label mt-1 text-charcoal/55">{article.author.designation}</p>
            ) : null}
            <p className="body-editorial mt-4 text-charcoal/75">{article.author.bio}</p>
          </aside>
        ) : null}
      </div>
      <section className="bg-cream px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1560px]">
          <div className="text-center">
            <p className="eyebrow text-gold-ink">Continue Reading</p>
            <h2 className="display-2 mt-3">Related Stories</h2>
            <OrnamentRule className="mt-7" />
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {related.map((a) => (
              <Link key={a.slug} href={`/journal/${a.slug}`} className="group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <MediaSkeleton
                    src={a.image}
                    alt={a.imageAlt}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="duration-[1400ms] group-hover:scale-[1.03]"
                  />
                </div>
                <p className="eyebrow mt-5 text-gold-ink">{a.category}</p>
                <h3 className="display-3 mt-2">{a.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
