import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { articles } from "@/lib/journal";
import { Eyebrow } from "@/components/Editorial";
import { OrnamentRule } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";
import hero from "@/assets/heritage-archive.jpg";

export const Route = createFileRoute("/journal")({ head: () => ({ meta: [
  { title: "Journal — House of Kani" }, { name: "description", content: "Stories of Kani, Pashmina, craftsmanship, heritage, Kashmir and its people." },
  { property: "og:title", content: "The Journal — House of Kani" }, { property: "og:description", content: "Notes from the valley: the people, places and traditions behind Kani." },
  { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
]}), component: JournalPage });
const categories=["All","Kani","Pashmina","Craft","Heritage","Kashmir","People"] as const;
function JournalPage(){const [category,setCategory]=useState<(typeof categories)[number]>("All"); const visible=category==="All"?articles:articles.filter(a=>a.category===category); const featured=articles[0]; return <>
  <section className="bg-ivory px-5 pt-36 pb-16 text-center sm:px-8 sm:pt-44 sm:pb-24"><Reveal><Eyebrow>House of Kani</Eyebrow><h1 className="display-1 mt-4">The Journal</h1><p className="body-editorial mx-auto mt-5 max-w-xl text-charcoal/70">Essays from the loom, the archive and the valley.</p><OrnamentRule className="mt-8" /></Reveal></section>
  <section className="bg-forest text-ivory"><Link to="/journal/$slug" params={{slug:featured.slug}} className="group mx-auto grid max-w-[1560px] lg:grid-cols-[1.35fr_0.65fr]"><div className="min-h-[52svh] overflow-hidden"><img src={hero} alt="House of Kani archive" className="h-full w-full object-cover transition-transform duration-[1600ms] group-hover:scale-[1.02]"/></div><div className="flex flex-col justify-center px-7 py-14 sm:px-12 lg:px-16"><p className="eyebrow text-gold">Featured · {featured.category}</p><h2 className="display-2 mt-4">{featured.title}</h2><p className="mt-6 text-ivory/70">{featured.dek}</p><span className="nav-label mt-8 text-gold">Read the Story →</span></div></Link></section>
  <section className="bg-ivory px-5 py-20 sm:px-8 sm:py-28 lg:px-12"><div className="mx-auto max-w-[1560px]"><div className="flex flex-wrap justify-center gap-x-7 gap-y-3 border-b border-border pb-6">{categories.map(c=><button key={c} type="button" onClick={()=>setCategory(c)} className={`nav-label border-b pb-1 transition-colors ${category===c?"border-gold text-charcoal":"border-transparent text-stone hover:text-charcoal"}`}>{c}</button>)}</div><div className="mt-12 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">{visible.map((a,i)=><Reveal key={a.slug} delay={i*70}><Link to="/journal/$slug" params={{slug:a.slug}} className="group block"><div className="aspect-[4/3] overflow-hidden"><img src={a.image} alt={a.imageAlt} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.03]"/></div><p className="eyebrow mt-5 text-gold">{a.category} · {a.readTime}</p><h2 className="display-3 mt-2 group-hover:text-burgundy">{a.title}</h2><p className="mt-3 text-charcoal/65">{a.dek}</p></Link></Reveal>)}</div></div></section>
</>}
