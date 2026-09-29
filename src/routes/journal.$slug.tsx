import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getArticle, articles } from "@/lib/journal";
import { OrnamentRule } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => { const article=getArticle(params.slug); if(!article) throw notFound(); return article; },
  head: ({ loaderData }) => ({ meta: loaderData ? [
    { title: `${loaderData.title} — House of Kani` }, { name: "description", content: loaderData.dek },
    { property: "og:title", content: `${loaderData.title} — House of Kani` }, { property: "og:description", content: loaderData.dek },
    { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" },
  ] : [{title:"Story Not Found — House of Kani"},{name:"robots",content:"noindex"}] }),
  component: JournalArticlePage,
  notFoundComponent: () => <div className="bg-ivory px-5 pt-44 pb-32 text-center"><p className="eyebrow text-gold">The Journal</p><h1 className="display-1 mt-4">This story could not be found.</h1><Link to="/journal" className="nav-label mt-9 inline-block border-b border-gold pb-1">Return to the Journal</Link></div>,
});
function JournalArticlePage(){const article=Route.useLoaderData(); const related=articles.filter(a=>a.slug!==article.slug).slice(0,3); return <article className="bg-ivory">
  <header className="relative isolate flex min-h-[86svh] items-end overflow-hidden text-ivory"><img src={article.image} alt={article.imageAlt} className="absolute inset-0 -z-20 h-full w-full object-cover"/><div className="absolute inset-0 -z-10 bg-gradient-to-b from-forest/60 via-forest/15 to-forest/90"/><div className="mx-auto w-full max-w-[1100px] px-5 pt-36 pb-14 sm:px-8 sm:pb-20"><Reveal><p className="eyebrow text-gold">{article.category} · {article.readTime}</p><h1 className="display-1 mt-4 max-w-4xl">{article.title}</h1><p className="font-display mt-5 max-w-2xl text-[1.2rem] leading-relaxed font-light italic text-ivory/85">{article.dek}</p></Reveal></div></header>
  <div className="mx-auto max-w-[780px] px-5 py-20 sm:px-8 sm:py-28"><p className="eyebrow text-gold">{article.date}</p>{article.body.map((section,i)=><Reveal key={i} className="mt-12 first:mt-7">{section.heading?<h2 className="display-3 mb-5">{section.heading}</h2>:null}{section.paragraphs.map(p=><p key={p} className="body-editorial mt-5 text-charcoal/80 first:mt-0">{p}</p>)}{section.quote?<blockquote className="my-14 border-y border-gold/35 py-10 text-center font-display text-[1.55rem] leading-snug font-light italic sm:text-[2rem]">{section.quote}</blockquote>:null}</Reveal>)}</div>
  <section className="bg-cream px-5 py-20 sm:px-8 sm:py-28 lg:px-12"><div className="mx-auto max-w-[1560px]"><div className="text-center"><p className="eyebrow text-gold">Continue Reading</p><h2 className="display-2 mt-3">Related Stories</h2><OrnamentRule className="mt-7"/></div><div className="mt-12 grid gap-8 md:grid-cols-3">{related.map(a=><Link key={a.slug} to="/journal/$slug" params={{slug:a.slug}} className="group"><div className="aspect-[4/3] overflow-hidden"><img src={a.image} alt={a.imageAlt} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.03]"/></div><p className="eyebrow mt-5 text-gold">{a.category}</p><h3 className="display-3 mt-2">{a.title}</h3></Link>)}</div></div></section>
</article>}
