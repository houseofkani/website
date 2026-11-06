<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project decisions

- Journal content (articles, categories, images, redirects) lives in the Payload CMS at `../cms` and is fetched server-side through REST — see `src/lib/cms.ts`. Do not reintroduce local content modules for journal copy; do not import `cms.ts` from client components (it reads secret env vars).
- Use shared editorial primitives for all routes so typography, pacing, ornament, imagery and navigation stay consistent across the digital maison.
- Use the supplied HK emblem (`public/images/house-of-kani-emblem-v1.png`, derived from `src/assets/house-of-kani-emblem-new.png`) for every brand mark. Icons, touch icons and social avatars are generated from it by `pnpm brand:assets` — never hand-edited.
- Keep static editorial image paths in the shared image registry with new, versioned filenames for refreshed photography; leave approved asset bytes and presentation untouched so imagery changes remain reversible.
- Give each content page dedicated image registry keys rather than changing shared keys when refreshing one page; this isolates photography updates from approved imagery elsewhere.
- Small type on light grounds uses the text-safe accents `text-gold-ink` / `text-stone-ink` (WCAG AA on ivory and cream). `text-gold` and `text-stone` stay for ornaments, borders and type over forest/burgundy or imagery; `<Eyebrow>` takes `tone="ink"` on light sections.

## CMS integration

- The CMS (`../cms`) serves the Payload REST API and media files. Local dev: run the CMS first (`cd ../cms && pnpm dev`, port 3000), then the site with `PORT=3001 pnpm dev` (the CMS expects the site on 3001).
- Env vars (see `.env.local` / `.env.example`): `CMS_URL` (CMS origin — production `https://cms.houseofkani.com`, fallback `https://house-of-kani-cms.vercel.app`; never an ephemeral `*.trycloudflare.com` tunnel), `CMS_API_KEY` (viewer API key for draft preview), `PREVIEW_SECRET` and `REVALIDATE_SECRET` (must match the CMS `.env`), `NEXT_PUBLIC_SITE_URL`.
- The CMS is deployed on Vercel as the `house-of-kani-cms` project, backed by Neon Postgres and Vercel Blob. Its canonical origin is `https://cms.houseofkani.com`, with `https://house-of-kani-cms.vercel.app` as the fallback origin. The exe.dev VM (`https://house-of-kani.exe.xyz`) is intentionally kept as a rollback standby — switch only via `scripts/switch-cms.sh exe`, never by hard-coding it or reintroducing quick tunnels.
- `next.config.ts` permanently allows the Vercel, exe.dev and configured `CMS_URL` origins in `images.remotePatterns`; keep all of them so image optimisation survives an env change or rollback. `scripts/switch-cms.sh` updates `CMS_URL` and redeploys the site.
- Journal rich text is Lexical. `src/lib/cms.ts` serializes headings, paragraphs, lists, quotes, links and bold/italic into sanitized HTML; `src/app/journal/[slug]/page.tsx` renders it. The visible byline, author bio and `Person` JSON-LD come from the CMS `authors` collection — keep those mappings in sync when changing the Authors schema.
- Draft preview: the CMS admin "Preview" button opens `/api/preview?secret=…&slug=…`, which enables Next draft mode; `/api/preview/disable` exits it. Drafts are only ever visible with the preview cookie.
- Revalidation: after content changes the CMS POSTs `{"tags":["journal","post:<slug>"]}` to `/api/revalidate` with header `x-revalidate-signature` = HMAC-SHA256 hex of the raw body keyed by `REVALIDATE_SECRET`. All journal fetches are tagged `journal` + `post:<slug>`.
- Renaming a published article slug creates a 308 redirect handled by `permanentRedirect()` in `src/app/journal/[slug]/page.tsx`.
- Syndication: `/feed.xml` (RSS 2.0 with `content:encoded`) and `/feed.json` (JSON Feed 1.1) render from `getJournalPosts()` through the pure renderers in `src/lib/feed.ts`. They are prerendered with `revalidate = 300` and carry the `journal` tag, so the CMS revalidate webhook refreshes them on publish; `alternates.types` in `layout.tsx` / `seoBundle()` handles reader auto-discovery.
- Journal scale: the index paginates at 9 stories (`getJournalPage` + `?page=N`), and `getJournalArchive()` walks every Payload page, so the sitemap and `generateStaticParams` are not capped at 100. `/journal` reads `searchParams`, so it renders dynamically — keep the listing fetch inside its `Suspense` boundary and re-check TTFB before changing that.
