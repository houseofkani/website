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
- Use an inline SVG monogram for brand marks so the identity remains crisp at every display size.
- Keep static editorial image paths in the shared image registry with new, versioned filenames for refreshed photography; leave approved asset bytes and presentation untouched so imagery changes remain reversible.

## CMS integration

- The CMS (`../cms`) serves the Payload REST API and media files. Local dev: run the CMS first (`cd ../cms && pnpm dev`, port 3000), then the site with `PORT=3001 pnpm dev` (the CMS expects the site on 3001).
- Env vars (see `.env.local` / `.env.example`): `CMS_URL` (CMS origin), `CMS_API_KEY` (viewer API key for draft preview), `PREVIEW_SECRET` and `REVALIDATE_SECRET` (must match the CMS `.env`), `NEXT_PUBLIC_SITE_URL`.
- Draft preview: the CMS admin "Preview" button opens `/api/preview?secret=…&slug=…`, which enables Next draft mode; `/api/preview/disable` exits it. Drafts are only ever visible with the preview cookie.
- Revalidation: after content changes the CMS POSTs `{"tags":["journal","post:<slug>"]}` to `/api/revalidate` with header `x-revalidate-signature` = HMAC-SHA256 hex of the raw body keyed by `REVALIDATE_SECRET`. All journal fetches are tagged `journal` + `post:<slug>`.
- Renaming a published article slug creates a 308 redirect handled by `permanentRedirect()` in `src/app/journal/[slug]/page.tsx`.
- `next.config.ts` allows CMS media origins in `images.remotePatterns` — extend it when `CMS_URL` changes.
