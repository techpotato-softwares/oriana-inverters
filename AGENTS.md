# Agent guide — Oriana Invertors Web

## Stack

- Monorepo: `apps/cms` (Payload + Next host), `apps/ui` (public UI), `packages/shared`, `cdk`
- UI: React 19, Next 15, Tailwind 4, Framer Motion, Radix/shadcn primitives

## Mandatory UI/UX skills

Project skills live in `.agents/skills/` (locked via `skills-lock.json`). For any public UI work, use:

| Skill | Why |
|-------|-----|
| `oriana-modern-ui` | Brand tokens, hero/section rules, monorepo placement |
| `frontend-design` | Distinctive non-generic aesthetics (Anthropic) |
| `ui-ux-pro-max` | Layout, type, interaction patterns |
| `ui-styling` / `design-system` | Tailwind + systematic tokens |
| `web-design-guidelines` | Vercel Web Interface Guidelines |
| `accessibility` | WCAG 2.2 |
| `core-web-vitals` / `performance` | LCP, CLS, INP |
| `vercel-react-best-practices` | React/Next performance |
| `vercel-composition-patterns` | Scalable component APIs |
| `vercel-react-view-transitions` | Route/shared-element motion |
| `interface-design` | Craft for denser product UI (admin/tools) |
| `web-quality-audit` | Full quality pass before ship |

Cursor rules in `.cursor/rules/` reinforce the same standards automatically.

## Local dev

```bash
cp apps/cms/.env.example apps/cms/.env   # then set DATABASE_URL + PAYLOAD_SECRET
npm install && npm run dev
```

Admin: http://localhost:3000/admin — public site needs working Postgres/Payload or CMS content will not match deployed.
