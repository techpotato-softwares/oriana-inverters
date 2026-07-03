# Oriana Inverters Website

Marketing and product catalogue website for [Oriana Inverters](https://www.orianainverters.com), built with **Next.js 15 + Payload CMS 3**.

## Stack

- **Frontend:** Next.js (React), Tailwind CSS 4, Framer Motion
- **CMS:** Payload CMS 3 (admin at `/admin`)
- **Database:** SQLite locally (`file:./payload.db`) — switch to Neon PostgreSQL for production
- **Media:** Supports images (up to 4K), MP4/WebM video, PDFs

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open:
- **Website:** http://localhost:3000
- **CMS Admin:** http://localhost:3000/admin (create your first user on first visit)

## Environment

Copy `.env` and update secrets before production:

```
DATABASE_URL=file:./payload.db
PAYLOAD_SECRET=your-secret-here
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

For production (Vercel + Neon), see `solar-inverter-website-plan.md` §13 and §16.

## Project Structure

```
src/
├── app/(frontend)/     # Public website routes
├── app/(payload)/      # Payload CMS admin + API
├── collections/        # Products, Media, Posts, Pages...
├── components/oriana/  # Oriana-branded UI (hero, gallery, video)
└── payload.config.ts
```

## Media & Video

Upload 4K videos and high-res images via Payload admin (`/admin` → Media). The `VideoBackground` component supports multiple sources with resolution-based `media` queries (1080p / 4K).

## Catalogue data (Payload CMS)

Product pages, categories, and the download center read from Payload collections (`products`, `categories`, `downloads`). Static fallback data in `src/data/products.ts` is used only when the CMS is empty.

Seed the catalogue (categories, 5 products, 6 sample downloads):

```bash
npm run seed:catalogue
```

Manage products at **Admin → Products**. Upload real product photos to replace the SVG placeholders.

## Build

```bash
npm run build          # migrate (non-interactive) + next build
npm run build:next     # next build only (skip migrate)
```

`npm run build` runs `scripts/prepare-migrate.mjs` first to clear dev-mode schema markers that would otherwise hang on an interactive prompt.

## Deploy

1. Push to GitHub
2. Import to Vercel
3. Add Neon PostgreSQL + Vercel Blob integrations
4. Set build command: `npm run build` (or `node scripts/prepare-migrate.mjs && payload migrate && next build`)
5. Run `npm run seed:catalogue` once after first deploy (or seed via admin)
6. Point GoDaddy DNS to Vercel
