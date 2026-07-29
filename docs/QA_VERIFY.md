# QA deploy checklist

## One-time setup

1. **Edit** [`config/deploy.env`](../config/deploy.env) and set `QA_DB_HOST`, `QA_DB_USER`, etc. (no password).
2. **GitHub secrets:** `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`.
3. **Run** Actions -> **Deploy oriana-invertors-web** -> environment **qa**.

## After first deploy

1. AWS Console -> Secrets Manager -> **`/oriana-invertors-web/qa/database`**
2. Change **`DB_PASSWORD`** from `CHANGE_ME_UPDATE_IN_AWS_CONSOLE` to your Supabase password.
3. **Re-run Deploy** (qa) — migrate runs, Lambda gets real `DATABASE_URL`.
4. **Seed Payload CMS** -> `catalogue` + `admin` (or open `/admin` on CloudFront).

## Verify

- [ ] CloudFront URL loads `/`
- [ ] `/admin` works
- [ ] Media uploads -> `oriana-invertors-web-media-qa`

Share CloudFront URL + admin link with the team.
