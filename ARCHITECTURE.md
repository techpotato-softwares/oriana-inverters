# Architecture — oriana-invertors-web

## Monorepo map

```
apps/cms     Payload + Next.js host (admin, API, composed public routes)  ≈ ArcForge api/
apps/ui      Public UI source (components, providers, assets)             ≈ ArcForge ui/
packages/shared   payload-types
cdk          AWS CDK stack oriana-invertors-web-{env}
```

UI files live under `apps/ui` and are symlinked into `apps/cms/src` so existing `@/` imports and a single Next runtime are unchanged.

## Request flow (QA / prod)

```
Browser → CloudFront → Lambda Function URL (Web Adapter)
                      → Next.js standalone :3000
                         ├─ /admin, /api/*  → Payload
                         └─ /*             → public pages
Payload → Supabase (qa) or RDS (prod)
Payload media → S3 oriana-invertors-web-media-{env}
```

## Naming

All AWS resources use prefix **`oriana-invertors-web`** (e.g. `oriana-invertors-web-qa`).
