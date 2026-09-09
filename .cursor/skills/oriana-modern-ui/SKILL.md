---
name: oriana-modern-ui
description: Oriana Invertors brand UI system for modern marketing and product pages. Use when building, redesigning, or reviewing any public frontend UI, homepage, product catalogue, heroes, navigation, or Tailwind components in apps/ui or apps/cms frontend routes.
---

# Oriana modern UI

Apply this skill for all public-site UI work. Combine with installed ecosystem skills: `frontend-design`, `ui-ux-pro-max`, `web-design-guidelines`, `accessibility`, `ui-styling`, `design-system`, `vercel-react-best-practices`.

## Product context

Oriana is a solar inverter manufacturer (residential → utility). Visual direction: clean industrial energy — deep navy, confident blue, soft silver surfaces, sun accent sparingly. Premium B2B clarity, not consumer gimmicks.

## Brand tokens (do not replace)

From `apps/cms/src/app/(frontend)/globals.css`:

| Token | Role |
|-------|------|
| `oriana-ink` / `oriana-muted` / `oriana-navy` (text) `#606060` | Headings, descriptions, body copy |
| `oriana-deep` `#071525` | Dark surfaces / dark heroes |
| `oriana-blue` `#1a428a` | Primary action / links |
| `oriana-sky` `#4da3ff` | Highlights / mesh accents |
| `oriana-sun` `#f5b942` | Sparse accent only |
| `oriana-silver` `#eef2f8` | Soft fills |
| `oriana-surface` `#f7f9fc` | Page background |
| `font-display` / Montserrat | Headings + UI |

## Layout rules

1. **Hero budget**: brand presence + one headline + one support sentence + CTA group + one dominant full-bleed visual.
2. **No hero clutter**: no cards, stat strips, floating badges, or promo chips over media.
3. **One job per section**: one purpose, one headline, short support.
4. **Reuse shells**: `PageHero`, `VideoHero`, `FadeIn`, `SiteHeader`, `SiteFooter`, catalogue components under `apps/ui/src/components/oriana/`.
5. **Monorepo split**: UI source in `apps/ui`; Next host + routes in `apps/cms`.

## Motion

- Prefer existing `FadeIn` (Framer Motion + `useReducedMotion`).
- 2–3 intentional motions per page max; no decorative noise.
- Optional: `vercel-react-view-transitions` for route-level polish.

## Workflow

```
Task Progress:
- [ ] Read this skill + relevant section in existing oriana components
- [ ] Apply frontend-design / ui-ux-pro-max for structure & craft
- [ ] Implement in apps/ui (or thin page compose in cms)
- [ ] Pass accessibility + web-design-guidelines checks
- [ ] Spot-check mobile + reduced motion
```

## Anti-patterns

- Purple-on-white / indigo AI themes
- Default Inter/Roboto/Arial stacks (use Montserrat tokens)
- Card-heavy marketing grids when a composition will do
- Hardcoded product catalogue when Payload should supply data
- Hover-only navigation or CTAs
---

