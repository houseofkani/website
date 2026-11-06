# House of Kani

Editorial website for House of Kani — a Kashmir-rooted Pashmina maison.

## Stack

- **Next.js** (App Router) + React 19
- Tailwind CSS v4
- Static generation for all editorial routes
- `next/image` with AVIF/WebP + pre-compressed assets in `public/images`

## Develop

```bash
npm install
npm run optimize:images   # regenerate AVIF/WebP from src/assets
npm run dev
```

## Build

```bash
npm run build
npm start
```

## Environment

Copy `.env.example` to `.env.local`:

```
NEXT_PUBLIC_SITE_URL=https://houseofkani.com
CMS_URL=https://cms.houseofkani.com
CMS_API_KEY=
PREVIEW_SECRET=
REVALIDATE_SECRET=
```

`CMS_URL` must be a durable public origin. Never use an ephemeral
`*.trycloudflare.com` quick tunnel: it stops resolving when cloudflared
restarts, and the Journal falls back to its empty state.

## Deploy (Vercel)

1. Import the GitHub repo in Vercel
2. Set `NEXT_PUBLIC_SITE_URL` to the production domain
3. Deploy — no special build command beyond `next build`

## Content

Editorial copy lives in typed modules (`src/lib/site.ts`, `src/lib/journal.ts`) and route pages under `src/app/`.
