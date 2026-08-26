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

### Seed workflows

| Script | What it does |
|--------|----------------|
| `npm run seed:admin` | Creates admin user from `ADMIN_EMAIL` / `ADMIN_PASSWORD` |
| `npm run seed:catalogue` | Categories + products |
| `npm run seed:content` | Marketing globals, collections, media folders/assets, legal pages, contact form |
| `npm run seed:full` | Catalogue + content (use `--force` to wipe marketing collections first) |

From the repo root:

```bash
npm run seed:admin
npm run seed:full
# or
npm run seed:content -- --force
```

GitHub Actions → **Seed Payload CMS** supports `catalogue` | `content` | `admin` | `full`.

### CMS content model (hybrid)

- **Globals:** Home, Header/Navigation, About, Careers, Support, Sustainability, Contact, Site Settings
- **Collections:** Products, Categories, Downloads, Posts, Pages, Case Studies, FAQs, Videos, Distributors, Jobs, Certifications, Awards, Partners, Solutions, Warranty Plans, Sustainability Reports, Media (with folders)
- **Drafts:** marketing collections/globals use draft + publish; public site only shows published content

Edit copy, images, icons, and nav from Admin — no deploy required for content changes.

## Deploy via GitHub Actions (recommended)

### 1. GitHub repository secrets

| Secret | Purpose |
|--------|---------|
| `AWS_ACCESS_KEY_ID` | IAM user for deploy |
| `AWS_SECRET_ACCESS_KEY` | IAM secret |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Optional if you prefer not to type inputs each run |

Optional repo variable: `AWS_REGION` (default `ap-south-1`).

### 2. Environment file (no passwords in git)

Edit [`config/deploy.env`](config/deploy.env) with Supabase **host**, **port**, **database name**, **user** only:

```bash
QA_DB_HOST=db.xxxx.supabase.co
QA_DB_PORT=5432
QA_DB_NAME=postgres
QA_DB_USER=postgres
QA_DB_SSL=true
```

Copy from [`config/deploy.env.example`](config/deploy.env.example) for other envs.

### 3. Run deploy workflow

**Actions → Deploy oriana-invertors-web → Run workflow**

- Choose **environment**: `dev` | `qa` | `prod`
- Workflow will:
  1. **CDK bootstrap** (first time)
  2. **Create Secrets Manager placeholders** (auto-generates `PAYLOAD_SECRET`; if `db_password` input is provided, it is used immediately)
  3. Deploy stack + Lambda + CloudFront + S3

### 4. Set database password (one time per env)

AWS Console → **Secrets Manager** → `/oriana-invertors-web/qa/database` → Edit:

- Set `DB_PASSWORD` to your Supabase database password
- Re-run **Deploy** (workflow rebuilds `DATABASE_URL` from host + password)

You do **not** need to generate `PAYLOAD_SECRET` manually — it is created on first deploy.

### 5. Seed content

**Actions → Seed Payload CMS** → choose env + `catalogue` / `content` / `admin` / `full` and optionally provide `admin_email` + `admin_password` inputs.

## Secrets created automatically

| Secret path | Contents |
|-------------|----------|
| `/oriana-invertors-web/{env}/database` | `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DATABASE_URL`, … |
| `/oriana-invertors-web/{env}/payload` | Auto-generated `PAYLOAD_SECRET`, `CRON_SECRET`, `PREVIEW_SECRET` |

## Environments

| Env | Database | Stack |
|-----|----------|--------|
| **qa** | Supabase | `oriana-invertors-web-qa` |
| **prod** | RDS | `oriana-invertors-web-prod` |

## Manual (local AWS CLI)

```bash
# After editing config/deploy.env
export AWS_ACCESS_KEY_ID=... AWS_SECRET_ACCESS_KEY=... AWS_REGION=ap-south-1
./scripts/bootstrap-secrets.sh qa
cd cdk && npm run bootstrap && npm run deploy:qa
```

See [`docs/QA_VERIFY.md`](docs/QA_VERIFY.md) and [`ARCHITECTURE.md`](ARCHITECTURE.md).
