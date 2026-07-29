# CDK — oriana-invertors-web

AWS CDK for **Oriana Invertors Web**.

## Stacks

| Stack | DB | Notes |
|-------|-----|--------|
| `oriana-invertors-web-dev` | External | Local/dev |
| `oriana-invertors-web-qa` | Supabase (`features.rds: false`) | Share CloudFront URL with team |
| `oriana-invertors-web-prod` | RDS (`features.rds: true`) | Production |

## Resources

- Lambda (container + Web Adapter): `oriana-invertors-web-{env}`
- CloudFront distribution
- S3: `oriana-invertors-web-media-{env}` (Put/Get/Delete/List on Lambda role; OAC for CF)
- Secrets: `/oriana-invertors-web/{env}/database`, `/oriana-invertors-web/{env}/payload`

## Commands

```bash
# From repo root after npm install
npm run deploy:qa -w @oriana/cdk
# or
cd cdk && npm run deploy:qa
```

Create Secrets Manager entries **before** first deploy (see root README).

Dockerfile context is the **monorepo root** (`apps/cms/Dockerfile`).
