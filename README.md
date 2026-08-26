# Oriana Invertors Web — Monorepo

Solar inverter manufacturer website: **Payload CMS** + **Next.js** public site, deployed to AWS as `oriana-invertors-web-{env}`.

## Layout

| Path | Role |
|------|------|
| [`apps/cms`](apps/cms) | Payload CMS + Next host — **deployable** |
| [`apps/ui`](apps/ui) | Public UI source — consumed by cms |
| [`packages/shared`](packages/shared) | Shared types |
| [`cdk`](cdk) | AWS CDK — stack `oriana-invertors-web-{env}` |

## Local development

```bash
cp apps/cms/.env.example apps/cms/.env
npm install && npm run dev
```

Admin: **http://localhost:3000/admin**

### Schema bootstrap

On a fresh database:

```bash
cd apps/cms
npm run schema:push
```

Then create a durable migration when ready:

```bash
DATABASE_URL="postgresql://..." PAYLOAD_SECRET="..." npm run migrate:create
```

### Production database (shared RDS)

| Resource | Value |
|----------|--------|
| RDS instance | `oriana-web` (shared across Oriana client sites) |
| Postgres database | `postgres` |
| This site’s schema | `oriana_invertors` |
| Master secret | `/oriana-invertors-web/prod/database-master` (CDK auto username/password) |
| App connection secret | `/oriana-invertors-web/prod/database` (host, user, password, `DB_SCHEMA`, `DATABASE_URL`) |

Future websites on the same RDS: create another schema (e.g. `other_site`) and a separate Secrets Manager path for that app. Do **not** create a second RDS instance unless capacity requires it.

After each prod CDK deploy, CI runs `scripts/sync-rds-app-secret.sh` which:

1. Reads master credentials from Secrets Manager  
2. Writes the app connection secret  
3. Runs `CREATE SCHEMA IF NOT EXISTS oriana_invertors`

### Seed workflows

| Script | What it does |
|--------|----------------|
| `npm run seed:admin` | Creates admin user from `ADMIN_EMAIL` / `ADMIN_PASSWORD` |
| `npm run seed:catalogue` | Categories + products |
| `npm run seed:content` | Marketing globals, collections, media folders/assets, legal pages, contact form |
| `npm run seed:full` | Catalogue + content (use `--force` to wipe marketing collections first) |

From the repo root (secrets loaded from AWS):

```bash
eval "$(./scripts/load-deploy-secrets.sh prod)"
npm run seed:full
```

GitHub Actions → **Seed Payload CMS** supports `catalogue` | `content` | `admin` | `full`. Seeder always pulls `DATABASE_URL` from Secrets Manager.

### CMS content model (hybrid)

- **Globals:** Home, Header/Navigation, About, Careers, Support, Sustainability, Contact, Site Settings
- **Collections:** Products, Categories, Downloads, Posts, Pages, Case Studies, FAQs, Videos, Distributors, Jobs, Certifications, Awards, Partners, Solutions, Warranty Plans, Sustainability Reports, Media (with folders)
- **Drafts:** marketing collections/globals use draft + publish; public site only shows published content

Edit copy, images, icons, and nav from Admin — no deploy required for content changes.

## Deploy via GitHub Actions (recommended)

### 1. GitHub repository secrets (only these two)

| Secret | Purpose |
|--------|---------|
| `AWS_ACCESS_KEY_ID` | IAM user for deploy |
| `AWS_SECRET_ACCESS_KEY` | IAM secret |

Optional repo variable: `AWS_REGION` (default `ap-south-1`).

Do **not** store DB passwords, Payload secrets, or admin passwords as GitHub secrets. Those live in AWS Secrets Manager (or one-off workflow_dispatch inputs for admin seed).

### 2. Environment file (no passwords in git)

Edit [`config/deploy.env`](config/deploy.env) with **QA** Supabase host/user only (see [`config/deploy.env.example`](config/deploy.env.example)). Prod RDS host/password are auto-registered by CDK + `sync-rds-app-secret.sh`.

### 3. Run deploy workflow

**Actions → Deploy oriana-invertors-web → Run workflow**

- Choose **environment**: `dev` | `qa` | `prod`
- Workflow will:
  1. **CDK bootstrap** (first time)
  2. Create/ensure Secrets Manager **payload** secrets
  3. Build + **CDK deploy** (prod creates RDS `oriana-web`)
  4. **Prod:** sync app DB secret + create schema `oriana_invertors`
  5. Push Payload schema, patch Lambda env from Secrets Manager
  6. Sync static assets to S3

### 4. QA database password (one time)

AWS Console → **Secrets Manager** → `/oriana-invertors-web/qa/database` → set `DB_PASSWORD` to your Supabase password. Re-run deploy/seed. Never put this password in GitHub.

### 5. Seed content

**Actions → Seed Payload CMS** → choose env + seed type. Optionally pass `admin_email` / `admin_password` as **workflow inputs** (not saved GitHub secrets).

## Secrets created automatically

| Secret path | Contents |
|-------------|----------|
| `/oriana-invertors-web/{env}/payload` | Auto-generated `PAYLOAD_SECRET`, `CRON_SECRET`, `PREVIEW_SECRET` |
| `/oriana-invertors-web/prod/database-master` | CDK-generated RDS master `username` / `password` |
| `/oriana-invertors-web/prod/database` | App connection: host, user, password, `DB_SCHEMA=oriana_invertors`, `DATABASE_URL` |
| `/oriana-invertors-web/qa/database` | External Supabase connection (password set once in AWS Console) |

## Environments

| Env | Database | Stack |
|-----|----------|--------|
| **qa** | Supabase (external) | `oriana-invertors-web-qa` |
| **prod** | Shared RDS `oriana-web` / schema `oriana_invertors` | `oriana-invertors-web-prod` |

## Manual (local AWS CLI)

```bash
export AWS_ACCESS_KEY_ID=... AWS_SECRET_ACCESS_KEY=... AWS_REGION=ap-south-1
./scripts/bootstrap-secrets.sh qa   # or prod (payload only)
cd cdk && npm run bootstrap && npm run deploy:prod
../scripts/sync-rds-app-secret.sh prod
eval "$(../scripts/load-deploy-secrets.sh prod)"
```

See [`docs/QA_VERIFY.md`](docs/QA_VERIFY.md) and [`ARCHITECTURE.md`](ARCHITECTURE.md).
