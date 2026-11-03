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

## CMS integration

- The CMS (`../cms`) serves the Payload REST API and media files. Local dev: run the CMS first (`cd ../cms && pnpm dev`, port 3000), then the site with `PORT=3001 pnpm dev` (the CMS expects the site on 3001).
- Env vars (see `.env.local` / `.env.example`): `CMS_URL` (CMS origin — use the stable `https://house-of-kani-cms.exe.xyz`, never an ephemeral `*.trycloudflare.com` tunnel), `CMS_API_KEY` (viewer API key for draft preview), `PREVIEW_SECRET` and `REVALIDATE_SECRET` (must match the CMS `.env`), `NEXT_PUBLIC_SITE_URL`.
- The CMS is hosted on the exe.dev VM `house-of-kani-cms`. Its public origin is the exe.dev HTTPS proxy (TLS termination) pointed at Caddy on port 80, which reverse-proxies Payload. Publish it with `ssh exe.dev share port house-of-kani-cms 80 && ssh exe.dev share set-public house-of-kani-cms`. Do not re-introduce quick tunnels.
- `next.config.ts` allows the stable CMS origin and the configured `CMS_URL` in `images.remotePatterns`; keep both so image optimisation survives an env change.
- Draft preview: the CMS admin "Preview" button opens `/api/preview?secret=…&slug=…`, which enables Next draft mode; `/api/preview/disable` exits it. Drafts are only ever visible with the preview cookie.
- Revalidation: after content changes the CMS POSTs `{"tags":["journal","post:<slug>"]}` to `/api/revalidate` with header `x-revalidate-signature` = HMAC-SHA256 hex of the raw body keyed by `REVALIDATE_SECRET`. All journal fetches are tagged `journal` + `post:<slug>`.
- Renaming a published article slug creates a 308 redirect handled by `permanentRedirect()` in `src/app/journal/[slug]/page.tsx`.
