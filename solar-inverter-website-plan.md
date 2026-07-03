# Solar Inverter Company Website — Full Build Plan
### Next.js (React) + Payload CMS | Digital Marketing, SEO & Product Catalogue Platform

**Prepared:** July 2026
**Benchmarked against:** Solis Inverters (solisinverters.com/us) and Sungrow (sungrowpower.com/en)

---

## 1. Executive Summary

You're building a manufacturer/distributor-style website for solar inverters (multi-category: string/PV inverters, hybrid/energy-storage inverters, utility-scale, accessories/monitoring). Your two named competitors are both large, multi-region industrial manufacturer sites with a hybrid **B2B (installers/distributors) + B2C (homeowners)** audience. The plan below gives you:

- A **content model and information architecture** that mirrors what already works for Solis/Sungrow, adapted to a leaner team
- A **Next.js (React) + Payload CMS** technical architecture — fully Node.js/TypeScript, no PHP or WordPress
- A concrete **SEO and digital-marketing feature set** baked into the architecture, not bolted on afterward
- A **phased build roadmap** and a **low-cost hosting stack** — Payload 3 runs inside your Next.js app on Vercel free tier, with Neon PostgreSQL and Vercel Blob for media (~$0 at launch). GoDaddy is used for domain/DNS only.

This document is written so it can be pasted directly into a website-builder/dev-agency brief, a Claude Code / Cursor project prompt, or handed to a freelance dev team as a spec.

---

## 2. Competitive Analysis (Basis for This Plan)

### 2.1 Solis Inverters (solisinverters.com)
- **Primary nav:** Inverter (mega-menu grouped by category: Single Phase PV / Three Phase PV / Utility-Scale PV / Energy Storage / Accessories) → Solution (by customer segment: Residential, Commercial & Industrial, Utility-scale, Energy Storage, Case Study) → Service and Support (Download Center, Warranty, After-Sales, Monitoring portal link, PV Plant Design tool, install videos) → Enterprise Explore (Newsroom, Video Center) → About Us (Profile, Honors, Partners, Contact) → Where to Buy
- **Region/language switcher** is a first-class nav element — 40+ localized country sites
- Every product has its **own detail page** with a model-number URL slug, downloadable datasheets, and links to an external **monitoring SaaS** (SolisCloud) and an external **support/ticketing portal** (separate subdomain, looks like Freshdesk/Zendesk-style)
- Heavy use of a **downloads center** (datasheets, certificates, manuals) and a **PV plant design tool** (external microsite)
- Newsletter capture in the footer; social links (LinkedIn, X, YouTube, Instagram, Facebook)

### 2.2 Sungrow (sungrowpower.com)
- **Segments the entire site by customer type first**: "Solutions for Home / Solutions for Business / Solutions for Utility," then by product line (PV Inverter, Energy Storage System, Floating PV, Wind, Hydrogen Equipment, Smart Energy Products, EV Charger)
- Home segment specifically bundles **PV inverter + storage + EV charger** as "one-stop home energy solution" — cross-sell is structural, not incidental
- Strong **support hub**: Service Stories, Installer Support, For-Home Support, For-Business Support, Product Documentation, Cases & Stories, FAQs, Warranty, Security Incident Response
- A **"Home Energy Estimator"** tool and **"Find a Distributor"** locator — both lead-generation utilities disguised as helpful tools
- Own monitoring platform (iSolarCloud) cross-linked everywhere
- Case studies / customer stories used heavily as trust and SEO content

### 2.3 What to Replicate vs. What to Simplify
| Pattern | Replicate? | Notes |
|---|---|---|
| Segment-first navigation (by customer type) | **Yes** | Better UX than product-first for mixed B2B/B2C traffic |
| Product-category mega-menu | **Yes** | Needed once you have >15–20 SKUs |
| Downloads/Resource Center (datasheets, manuals, certs) | **Yes** | High SEO value, low maintenance once modeled correctly |
| Distributor/"Where to Buy" locator | **Yes, simplified** | Table or map view is enough at launch |
| External monitoring SaaS integration | **Only if you have one** | Just link out; don't build this yourself |
| 40-country localization | **No, not at launch** | Start with 1–2 locales (e.g., EN + one more); Payload localization makes this trivial to expand later |
| Separate ticketing subdomain | **No, not at launch** | Use a lightweight helpdesk (see §8.5) instead of building one |
| Case studies / customer stories | **Yes** | Cheapest, highest-ROI SEO content type you can produce |

---

## 3. Recommended Tech Stack

| Layer | Choice | Why |
|---|---|---|
| **Frontend + CMS** | **Next.js (React) + Payload CMS 3** in a single app | Payload 3 is Next.js-native — CMS admin and public site live in the same `/app` folder. Full TypeScript stack, no PHP. Query the database directly in React Server Components (no separate REST/GraphQL client required). |
| **CMS admin** | **Payload Admin UI** at `/admin` | React-based admin panel, role-based permissions, live preview, draft/publish workflow |
| **Database** | **PostgreSQL via Neon free tier** | Serverless Postgres, scales to zero, free tier sufficient at launch. Payload's official Vercel template uses Neon. |
| **Media/Assets** | **Vercel Blob** (free tier) or **Cloudinary free tier** | Vercel Blob integrates natively with Payload's official Vercel template; Cloudinary adds image transforms if needed |
| **API** | **Direct DB access in Server Components** + optional **Local API** / **REST** / **GraphQL** | Payload 3 lets you query Postgres directly in RSC — fastest path. REST/GraphQL available if you split frontend later |
| **Content modeling** | **Payload Collections + Globals** (TypeScript config) | Schema defined in `payload.config.ts` and collection files — version-controlled, type-safe, auto-generated TypeScript types |
| **Search** | Postgres full-text search at launch → **MeiliSearch** (free, self-hosted on Render) when catalogue grows past ~50 products | Needed for the "search inverters by kW/phase/type" filter |
| **Hosting — app (frontend + CMS)** | **Vercel free tier** | Deploy entire Next.js + Payload app serverlessly. Official one-click Payload + Vercel template available. |
| **Hosting — database** | **Neon free tier** | Bundled via Vercel integration; no separate DB host to manage |
| **Domain / DNS** | **GoDaddy** (domain registrar + DNS) | Point `www.yourdomain.com` A/CNAME records to Vercel. GoDaddy shared Linux hosting is **not used** for the app — Node.js cannot run reliably on it. |
| **Email (forms, newsletter)** | **Resend (free tier, 3,000 emails/mo)** or **Brevo (free tier, 300/day + built-in newsletter tool)** | For quote-request notifications and newsletter |
| **Analytics** | **Google Analytics 4** + **Google Search Console** (free) + **Plausible/Umami (free/self-hosted, privacy-friendly)** | GSC is non-negotiable for SEO monitoring |
| **CI/CD** | GitHub Actions → Vercel auto-deploy on push; build command: `payload migrate && next build` | Migrations run before every production build |

**Why Payload CMS over alternatives:**

| CMS | Node.js? | Best for this project? | Notes |
|---|---|---|---|
| **Payload CMS 3** | **Yes** | **Yes — chosen** | Next.js-native, TypeScript-first, MIT license, deploys to Vercel free tier with Neon. Admin UI is React. Schema in code = type-safe but needs developer for new fields. |
| **Strapi** | Yes | Good alternative | GUI content-type builder (better for non-dev editors adding fields). Requires separate Node host (Railway/Render ~$5–10/mo). Larger plugin ecosystem. |
| **Directus** | Yes | Possible | Vue admin (not React), BSL license with revenue threshold. Needs separate Node host. |
| **WordPress** | No (PHP) | **Ruled out** | Not Node.js; user requirement. |

**Why not host Node.js CMS on GoDaddy shared Linux hosting:**
GoDaddy shared hosting runs PHP/cPanel only — no persistent Node.js process, no PostgreSQL. Options if you must use GoDaddy hardware:
- **GoDaddy VPS** (~$5–20/mo): self-host Payload or Strapi with Docker — adds server ops burden
- **Recommended instead:** Vercel (free) + Neon (free) for the app; GoDaddy for domain/DNS only

**Hosting recommendation (lowest cost, fully Node.js):**

| Service | Role | Cost |
|---|---|---|
| Vercel Hobby | Next.js + Payload app | **$0** |
| Neon free tier | PostgreSQL database | **$0** |
| Vercel Blob free tier | Media uploads (PDFs, images) | **$0** |
| GoDaddy | Domain + DNS only | ~$10–15/yr (already owned) |
| **Total infra** | | **~$0–20/mo** (Vercel Pro only if team/traffic grows) |

---

## 4. System Architecture

```
                         ┌─────────────────────────┐
                         │        Users            │
                         │ (Homeowners, Installers,│
                         │  Distributors, B2B buyers)│
                         └───────────┬─────────────┘
                                     │ HTTPS
                                     ▼
                 ┌───────────────────────────────────┐
                 │   Next.js + Payload CMS (Vercel)   │
                 │   www.yourdomain.com               │
                 │   - Public pages: SSG/ISR/SSR      │
                 │   - Admin panel: /admin            │
                 │   - Local API + onPublish hooks    │
                 │   - next-sitemap, next-seo         │
                 └───────────────┬───────────────────┘
                                 │
             ┌───────────────────┼───────────────────┐
             ▼                   ▼                   ▼
    ┌────────────────┐  ┌────────────────┐  ┌──────────────────┐
    │ Neon PostgreSQL │  │ Vercel Blob /   │  │ Resend/Brevo      │
    │ (serverless)    │  │ Cloudinary      │  │ (forms, newsletter)│
    └────────────────┘  └────────────────┘  └──────────────────┘

    DNS (GoDaddy):
    - www.yourdomain.com  →  Vercel
    - yourdomain.com      →  Vercel (redirect to www)

    External / linked-out (not built in-house):
    - Monitoring app (if/when you have one)
    - Distributor/installer locator (Google Maps API, free tier)
    - Live chat (Tawk.to — free — or Crisp free tier)
```

**Key architectural decisions and why they matter for "minimal maintenance":**
1. **Static-first rendering (SSG + ISR):** Product and category pages are pre-built HTML. Payload `afterChange` hooks trigger Next.js `revalidatePath` / `revalidateTag` on publish — no full rebuild needed.
2. **Monolithic Next.js + Payload:** One codebase, one deploy, one set of TypeScript types shared between CMS and frontend. No CORS, no separate CMS server to monitor.
3. **Schema in git:** Content model changes are Pull Requests with review — reproducible across dev/staging/prod via `payload migrate`.
4. **Managed serverless for stateful services** (Neon DB, Vercel Blob, email) — no VPS patching.

**Payload vs. separate CMS host (alternative architecture):**
If you later split frontend and CMS, Payload can run on Railway/Render (~$5/mo) with Next.js on Vercel calling its REST API. Not needed at launch — the monolithic Vercel deploy is simpler and cheaper.

---

## 5. Information Architecture / Sitemap

Blending both competitors' strongest patterns, sized for a lean team:

```
Home
├── Products (mega-menu, grouped by category)
│   ├── Grid-Tied String Inverters (Residential)
│   ├── Grid-Tied String Inverters (Commercial/Industrial)
│   ├── Hybrid / Energy Storage Inverters
│   ├── Utility-Scale Inverters
│   ├── Microinverters (if applicable)
│   ├── Accessories & Monitoring Hardware
│   └── [Each product → dedicated detail page]
├── Solutions (by customer segment — mirrors Sungrow)
│   ├── Residential
│   ├── Commercial & Industrial
│   ├── Utility-Scale
│   └── Energy Storage
├── Case Studies / Projects
├── Resources
│   ├── Blog (SEO content engine)
│   ├── Download Center (datasheets, manuals, certificates, warranty docs)
│   ├── FAQs
│   └── Installation Videos
├── Where to Buy / Find a Distributor
├── Support
│   ├── Warranty
│   ├── After-Sales / Contact Support
│   └── Monitoring Platform (external link, if applicable)
├── About Us
│   ├── Company Profile
│   ├── Certifications & Awards
│   └── Careers (optional)
├── Contact / Request a Quote (primary lead-gen CTA)
└── (Footer) Newsletter signup, social links, legal/privacy, sitemap.xml
```

**Global elements on every page:** sticky header with mega-menu, search bar, "Request a Quote" CTA button, language/region switcher (structured for future expansion even if you launch with 1 locale), breadcrumb trail (SEO + UX), footer with schema-marked business info.

---

## 6. Content Model (Payload Collections & Globals)

Define these as **Payload Collections** (repeatable content) and **Globals** (singleton pages/settings) in TypeScript under `src/collections/` and `src/globals/`. Payload auto-generates TypeScript types (`payload-types.ts`) used directly in Next.js Server Components.

### 6.1 `products` (Collection)
| Field | Payload Type | Notes |
|---|---|---|
| name | Text | e.g., "S6-EH1P(3.8-11.4)K-H-US" |
| slug | Text (unique, indexed) | For clean URLs |
| category | Relationship → `product-categories` | Many-to-one |
| segment | Relationship → `solution-segments` | Residential/C&I/Utility/Storage |
| shortDescription | Rich Text | Card/summary view |
| fullDescription | Rich Text | Detail page body |
| heroImage | Upload → media | |
| gallery | Array of Uploads | |
| keySpecs | Array: `{label, value, unit}` | Power rating, phases, efficiency %, warranty years, etc. |
| datasheetPdf | Upload → media | |
| manualPdf | Upload → media | |
| certificates | Array of Uploads | |
| featured | Checkbox | Controls homepage/category-page highlighting |
| seo | Group field (see 6.7) | |
| relatedProducts | Relationship → `products` (hasMany) | Cross-sell |

### 6.2 `product-categories` (Collection)
`name`, `slug`, `description`, `icon` (upload), `categoryIntroBody` (rich text — keyword-rich intro for SEO), `seo` — powers the mega-menu and category landing pages automatically (add a category in Payload admin → it appears in nav when frontend queries categories dynamically).

### 6.3 `solution-segments` (Collection)
`name` (Residential/C&I/Utility/Storage), `slug`, `heroContent` (rich text), `benefits` (array of `{title, description}`), `relatedProducts` (relationship), `relatedCaseStudies` (relationship), `seo`.

### 6.4 `case-studies` (Collection)
`title`, `slug`, `clientName`, `location`, `systemSizeKw`, `productsUsed` (relationship → products), `summary`, `body` (rich text), `images` (array of uploads), `resultsStats` (array: `{label, value}` e.g. "Annual savings: $X"), `seo`.

### 6.5 `posts` (Collection — Blog)
`title`, `slug`, `author` (relationship → users), `category` (relationship → post-categories), `coverImage` (upload), `excerpt`, `body` (rich text / Lexical editor), `publishedAt` (date), `seo`, `readingTime` (number or computed).

### 6.6 `downloads` (Collection)
`title`, `file` (upload), `documentType` (select: Datasheet/Manual/Certificate/Warranty/Brochure), `relatedProduct` (relationship), `locale` (text).

### 6.7 `seo` (Reusable Group Field — attach to every collection above)
`metaTitle`, `metaDescription`, `ogImage` (upload), `canonicalUrl`, `keywords`, `noIndex` (checkbox). Every collection includes this group so SEO fields are never forgotten.

### 6.8 Globals (Single-instance pages/settings)
- **`homepage`**: hero, featured categories, featured products, stats bar, testimonial slider, CTA blocks
- **`about-page`**: company profile content
- **`contact-page`**: contact info, form config
- **`site-settings`**: company name, logo, phone, social links, footer legal text, default SEO fallback

### 6.9 `distributors` (Collection — Where to Buy)
`name`, `address`, `latitude`, `longitude`, `phone`, `website`, `region`, `type` (select: Distributor/Installer/Retailer) — powers a simple map + filterable list.

### 6.10 `quote-requests` (Collection — form submissions)
`name`, `email`, `phone`, `company`, `productInterest` (relationship → products), `message`, `status` (select: New/Contacted/Closed), `utmSource`, `utmCampaign` — populated via Next.js API route on form submit. Gives sales a lightweight CRM view in Payload admin.

**Note on schema changes:** Unlike Strapi's GUI builder, adding a new field requires a developer to edit the TypeScript collection config and run `payload migrate:create`. This is the main trade-off of Payload — plan schema carefully upfront, batch field additions.

---

## 7. SEO & Digital Marketing — Built-In Requirements

This has to be architecture, not an afterthought:

1. **Rendering:** Every public page must be server-rendered or statically generated (Next.js SSG/ISR) — never client-side-only rendered. This is non-negotiable for a catalogue site competing with Solis/Sungrow's PageRank.
2. **Structured data (Schema.org JSON-LD):** `Organization`, `Product` (with `Offer`/availability if pricing is shown), `BreadcrumbList`, `FAQPage` (on FAQ content), `Article` (on blog posts). Generate this from the `seo` group + content fields automatically at render time — one Next.js component, reused everywhere.
3. **Technical SEO baseline:**
   - Auto-generated `sitemap.xml` via `next-sitemap`, fed by Payload data at build time; regenerated on publish via ISR revalidation
   - `robots.txt` with correct disallow rules for `/admin` and preview routes
   - Canonical tags on every page (from the SEO group field)
   - Core Web Vitals budget: LCP < 2.5s, CLS < 0.1 — enforced via `next/image` for all product photos and lazy-loading below the fold
   - hreflang tags wired from day one (even with 1 locale) so adding languages later needs zero refactor
4. **Content/keyword strategy (informed by competitor gaps):**
   - Target long-tail, spec-driven queries competitors under-serve on-page (e.g., "10kW hybrid inverter for [region] home battery backup") via Blog + Case Study collections
   - Category pages should carry unique, keyword-rich intro copy — `categoryIntroBody` on `product-categories`
   - Case studies double as location-based SEO (great for "solar inverter installer near me" long-tail if you serve specific regions)
5. **Digital marketing features:**
   - Newsletter signup (footer + blog) wired to Brevo/Resend, double opt-in
   - "Request a Quote" CTA on every product/solution page → Next.js API route → `quote-requests` collection + email to sales
   - UTM-aware forms (capture source/campaign into quote request record)
   - GA4 + GSC + Meta Pixel (if running paid social) wired via a consent-managed tag setup (see compliance note below)
   - Retargeting-ready: dataLayer events for product views, quote submissions

**Compliance note:** If you'll run ads/retargeting or serve EU/UK/CA visitors, add a cookie-consent banner (e.g., free tier of Cookiebot, or a self-built lightweight consent gate) before firing GA4/Pixel — this is a legal requirement in many of the regions your competitors serve, not optional polish.

---

## 8. Non-Functional Requirements

### 8.1 Performance
- Target Lighthouse scores ≥ 90 across Performance/SEO/Best Practices/Accessibility at launch
- Image pipeline: all product images through `next/image` + Vercel Blob or Cloudinary auto-format (WebP/AVIF)
- Static generation for all catalogue pages; ISR revalidation on Payload `afterChange` hook so publish-to-live feels instant

### 8.2 Accessibility
- WCAG 2.1 AA baseline: semantic HTML, alt text required on all Upload fields in Payload schema, color-contrast-checked design tokens, keyboard-navigable mega-menu

### 8.3 Security
- Payload admin at `/admin` behind strong auth; enable 2FA for admin users
- Rate-limit public form API routes (quote requests, newsletter) via middleware
- Keep Payload and dependencies patched via Dependabot/Renovate (automated PRs)
- HTTPS everywhere (automatic via Vercel)
- Production: set `push: false` on Postgres adapter; use `payload migrate` in CI (never auto-push schema in prod)
- Restrict API access: Local API for Server Components; lock down REST endpoints if exposed publicly

### 8.4 Internationalization (structured now, expanded later)
- Payload's built-in localization: mark `products`, `posts`, `solution-segments`, etc. as localized collections even if you populate only English at launch. Adding a second language later is a content task with minimal engineering.

### 8.5 Support/Helpdesk (lighter than competitors' custom portals)
- Start with a shared inbox or a free-tier helpdesk (e.g., Freshdesk free plan, or even a well-organized `support@` inbox) rather than building a ticketing system — this is the single biggest "don't build it yourself" recommendation in this plan.

### 8.6 Backups & Disaster Recovery
- Neon provides automatic point-in-time recovery on paid tiers; on free tier, schedule weekly `pg_dump` via GitHub Action to cloud storage
- Vercel Blob media: replicate critical assets to secondary storage if catalogue is large
- Payload content is DB + uploads — as long as both are backed up, full recovery is straightforward

---

## 9. Repository & Project Structure

```
solar-inverter-website/
├── src/
│   ├── app/
│   │   ├── (frontend)/          # Public routes: /products, /solutions, /blog
│   │   ├── (payload)/           # Payload admin: /admin, API routes
│   │   └── api/                 # Quote form, revalidation, newsletter
│   ├── collections/             # Payload collection configs
│   │   ├── Products.ts
│   │   ├── ProductCategories.ts
│   │   ├── CaseStudies.ts
│   │   ├── Downloads.ts
│   │   ├── Distributors.ts
│   │   ├── QuoteRequests.ts
│   │   └── Posts.ts
│   ├── globals/                 # Homepage, SiteSettings, etc.
│   ├── components/              # Shared React components
│   ├── fields/                  # Reusable field groups (seo.ts)
│   ├── lib/                     # Payload Local API helpers, SEO, schema.org
│   └── payload.config.ts
├── migrations/                  # Payload DB migrations (committed to git)
├── payload-types.ts             # Auto-generated TypeScript types
├── next-sitemap.config.js
├── .github/workflows/           # CI: lint, migrate, build, deploy
└── README.md
```

Start from the official **`create-payload-app`** template with the `with-vercel-website` variant — includes Next.js frontend, Payload admin, Neon Postgres, and Vercel Blob pre-wired.

---

## 10. Build Roadmap (Phased)

**Phase 0 — Setup (Week 1)**
Scaffold from `create-payload-app` (Vercel + Neon template). Connect GoDaddy domain DNS to Vercel. Configure Vercel Blob, Resend/Brevo, CI/CD with `payload migrate && next build`. Create first admin user.

**Phase 1 — Content Model & Design System (Weeks 2–3)**
Define all Payload collections and globals from §6. Run migrations. Establish design tokens/component library in Next.js — reference Solis/Sungrow's clean industrial aesthetic but build original components (do not copy their code/assets).

**Phase 2 — Core Pages (Weeks 3–5)**
Homepage, Product listing + detail pages, Category pages, Solutions/Segment pages, Contact/Quote form, Where to Buy.

**Phase 3 — Content Engine (Weeks 5–6)**
Blog, Case Studies, Download Center, FAQs — plus sitemap, structured data, GA4/GSC, `afterChange` revalidation hooks.

**Phase 4 — Marketing Integrations (Week 6–7)**
Newsletter, quote-request email notifications, UTM tracking, cookie consent, distributor map.

**Phase 5 — QA, Performance, Launch (Week 7–8)**
Lighthouse/accessibility audit, cross-browser/device QA, load testing on quote form, GoDaddy DNS cutover to Vercel, GSC submission, launch.

**Phase 6 — Post-Launch (Ongoing)**
Marketing team adds/edits products, blog posts, and case studies in Payload admin at `/admin` — no developer for routine content. Developer needed for new collection types, schema fields, or features (e.g., Home Energy Estimator calculator).

---

## 11. Cost Summary (Launch Configuration)

| Item | Cost at launch |
|---|---|
| Payload CMS (open source, MIT) | **$0** |
| Next.js + Payload hosting (Vercel Hobby) | **$0** |
| PostgreSQL (Neon free tier) | **$0** |
| Media storage (Vercel Blob free tier) | **$0** |
| Email (Resend/Brevo) | **$0** — free tiers cover early-stage volume |
| Domain (GoDaddy) | ~$10–15/yr (DNS only; no hosting plan needed for app) |
| Analytics/Search Console | Free |
| Cloudinary (optional, if Blob limits hit) | **$0** — free tier |

**Realistic ongoing infra cost: ~$0–20/month** (Vercel Pro ~$20/mo only if team size or bandwidth limits are hit), with zero licensing cost.

**If you need more than free tiers later:**
| Upgrade | When | Cost |
|---|---|---|
| Neon Launch | DB storage/compute exceeds free tier | ~$19/mo |
| Vercel Pro | Team collaboration or bandwidth | ~$20/mo |
| GoDaddy VPS (alternative) | Want everything self-hosted on GoDaddy hardware | ~$5–20/mo + ops time |

---

## 12. What to Hand to a Developer/Agency (Copy-Paste Brief)

> Build a marketing + product-catalogue website for a solar inverter manufacturer/distributor using **Next.js (React) + Payload CMS 3** in a single application, deployed on **Vercel** with **Neon PostgreSQL** and **Vercel Blob** for media. Use the official `with-vercel-website` Payload template as a starting point. Define products, case studies, downloads, and distributors as Payload Collections with a reusable SEO group field on every type. Implement ISR revalidation via Payload `afterChange` hooks. All public pages must be SSG/ISR for SEO — no client-only rendering. Domain DNS managed in GoDaddy, pointed to Vercel. Implement the content model, sitemap, and SEO requirements exactly as specified in the attached plan, benchmarked against solisinverters.com/us and sungrowpower.com/en for information architecture (segment-first navigation, product mega-menu by category, resource/download center, case studies, quote-request lead capture). Marketing team manages products, blog posts, and case studies via Payload admin at `/admin`.

---

## 13. Deployment Checklist (Vercel + Neon + GoDaddy DNS)

1. Run `npx create-payload-app@latest` — select **website** template with Vercel deploy option
2. Push repo to GitHub; import project in Vercel
3. Add **Neon** integration in Vercel → auto-provisions `POSTGRES_URL`
4. Add **Vercel Blob** integration → auto-provisions `BLOB_READ_WRITE_TOKEN`
5. Set Vercel build command: `payload migrate && next build`
6. Set production env: `PAYLOAD_SECRET` (random 32+ char string), `NEXT_PUBLIC_SERVER_URL=https://www.yourdomain.com`
7. In GoDaddy DNS: add CNAME `www` → `cname.vercel-dns.com`; add A record for apex domain per Vercel docs
8. Add custom domain in Vercel project settings; enable automatic SSL
9. Create first admin user at `https://www.yourdomain.com/admin`
10. Configure `afterChange` hooks on collections to call `revalidatePath` / `revalidateTag`
11. Set `push: false` on Postgres adapter before first production deploy; commit all migrations to git

### Security Hardening
- Strong admin passwords + enable 2FA in Payload user settings
- Never commit `.env` secrets; use Vercel environment variables
- Rate-limit `/api/quote` and `/api/newsletter` routes
- Keep `robots.txt` disallowing `/admin`
- Run `payload migrate` in CI — never use `push: true` in production

---

## 14. Trade-offs: Payload vs. Strapi vs. WordPress

| | Payload CMS (chosen) | Strapi | WordPress |
|---|---|---|---|
| Stack | Node.js + TypeScript + React | Node.js + React admin | PHP |
| GoDaddy shared hosting | No — use Vercel | No — use Railway/Render | Yes |
| Monthly cost at launch | **~$0** (Vercel + Neon free) | ~$5–25 (separate CMS host) | ~$0 (GoDaddy shared) |
| Content model changes | TypeScript code + migrations | GUI (no code) | GUI plugins (ACF) |
| Type safety | Auto-generated TS types | Manual API types | Manual |
| Marketing team UX | Payload admin (modern, learning curve) | Strapi admin (modern) | WordPress (most familiar) |
| Deploy complexity | Single Vercel deploy | Two services | Two services (headless) |
| License | MIT | MIT | GPL |

---

## 15. When to Reconsider (Future)

- **Non-dev editors need to add fields frequently:** Consider migrating admin-facing schema to Strapi (GUI builder) — trade type-safety for editor autonomy.
- **Product catalogue exceeds ~200 SKUs with heavy faceted search:** Add MeiliSearch on Render free tier, indexed from Payload `afterChange` webhooks.
- **Vercel/serverless limits hit:** Move Payload to Railway (~$5/mo) or GoDaddy VPS with Docker; keep Next.js on Vercel as headless frontend.
- **Regulatory data residency requirements:** Self-host Postgres + Payload on GoDaddy VPS, AWS, or another regional cloud (see §16).

---

## 16. Future AWS Migration Path

The launch stack (Payload + Next.js on Vercel, Neon Postgres, Vercel Blob) is **fully portable**. Moving to AWS later is an infrastructure swap, not a rebuild — collections, migrations, frontend components, and SEO setup all carry over.

### 16.1 Service Mapping

| Launch stack | AWS equivalent | Migration effort |
|---|---|---|
| Vercel (Next.js + Payload app) | **AWS Amplify**, **ECS/Fargate**, or **EC2** + Docker | Low–medium |
| Neon PostgreSQL | **RDS PostgreSQL** or **Aurora Serverless v2** | Low (`pg_dump` / restore or logical replication) |
| Vercel Blob | **S3** + **CloudFront** CDN | Low (Payload `@payloadcms/storage-s3` adapter; bucket sync) |
| GoDaddy DNS | **Route 53** | Trivial (DNS cutover) |
| Resend / Brevo | **Amazon SES** | Low (swap email provider env vars) |
| GitHub Actions CI/CD | **CodePipeline** + **CodeBuild** or keep GitHub Actions | Low |

### 16.2 Phased Migration (recommended order)

**Phase A — Data layer first (lowest risk, can keep Vercel for the app)**
1. Provision RDS PostgreSQL (or Aurora Serverless) in your target AWS region
2. `pg_dump` from Neon → restore to RDS; update `POSTGRES_URL` in Vercel env vars
3. Create S3 bucket; switch Payload storage adapter to S3; sync existing media from Vercel Blob
4. Validate app against new DB + S3 while still hosted on Vercel

**Phase B — Move the application**
1. Containerize Next.js + Payload (`Dockerfile` based on official Node image)
2. Deploy to **ECS Fargate** (recommended for always-on Payload admin) or **Amplify** (simpler, serverless-style)
3. Put **Application Load Balancer** or **CloudFront** in front; attach ACM SSL certificate
4. Update GoDaddy/Route 53 DNS to point `www` at the new AWS endpoint
5. Decommission Vercel once smoke tests pass

**Phase C — Scale & harden (when traffic or compliance demands it)**
- **CloudFront** global CDN for static assets and cached pages
- **WAF** for DDoS and bot protection
- **ElastiCache** if session or API caching is needed
- **Multi-AZ RDS** for high availability
- **VPC** with private subnets for database (no public RDS endpoint)

```
Launch                         Phase A                    Phase B                    Phase C
────────                       ───────                    ───────                    ───────
Vercel (app)          →        Vercel (app)      →        ECS Fargate / Amplify  →   + CloudFront + WAF
Neon (Postgres)       →        RDS Postgres      →        RDS (private VPC)      →   + Multi-AZ
Vercel Blob           →        S3                →        S3 + CloudFront        →   + lifecycle policies
GoDaddy DNS           →        GoDaddy DNS       →        Route 53               →   (same)
```

### 16.3 Practices to follow at launch (makes AWS migration painless)

- **Environment variables for everything** — `POSTGRES_URL`, `PAYLOAD_SECRET`, storage keys, email API keys. No hardcoded Vercel-specific values in application code.
- **Commit Payload migrations to git** — schema travels with the repo; RDS gets the same `payload migrate` on deploy.
- **Use Payload's S3 storage adapter config pattern** even on Vercel Blob — keeps the storage interface consistent so switching to S3 is a config change, not a refactor.
- **Avoid deep coupling to Vercel-only APIs** (e.g. `@vercel/kv`, Edge Config) unless wrapped in an abstraction layer you can swap later.
- **Export media with consistent paths** — S3 key structure should mirror what Payload expects so revalidation URLs don't break after migration.

### 16.4 When to migrate (realistic triggers)

| Trigger | Why AWS makes sense |
|---|---|
| Vercel + Neon monthly bill exceeds **~$50–100/mo** | Reserved RDS instances and S3 are often cheaper at sustained volume |
| Need **VPC, private database, or compliance** (SOC2, HIPAA, data residency) | AWS gives full network and audit control |
| **AWS credits or enterprise agreement** available | Offset migration cost |
| Traffic requires **multi-region** or dedicated CDN/WAF | CloudFront + WAF are mature on AWS |
| Team already has **AWS ops expertise** | Lower ongoing ops risk than multi-vendor stack |

**Not a reason to rush:** the Vercel + Neon free/low tiers are genuinely sufficient for launch and early growth. Migrate when cost, compliance, or scale — not ideology — justify the added ops complexity.

### 16.5 Estimated migration effort

| Scope | Developer time | Downtime |
|---|---|---|
| DB only (Neon → RDS) | 1–2 days | < 30 min (maintenance window) |
| Media only (Blob → S3) | 0.5–1 day | None (background sync) |
| Full app move (Vercel → ECS/Amplify) | 3–5 days | 1–2 hours (DNS cutover) |
| Full stack + VPC hardening | 1–2 weeks | Planned maintenance window |

No changes to Payload collections, Next.js pages, SEO components, or content model are required for any of the above.

---

*This plan is designed to be pasted as-is into a builder platform, a Claude Code project brief, or a development agency RFP. Sections 5–10 are directly implementable as tickets/epics.*
