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
- [ ] `/admin` works (QA DB must use Supabase **transaction** pooler port `6543`, not session `5432`)
- [ ] Media uploads -> `oriana-invertors-web-media-qa` (browser PUTs via presigned URL; objects under `media/`)
- [ ] Upload a file >6MB (e.g. short hero video) to confirm clientUploads bypasses Lambda body limit
- [ ] Confirm Lambda env has `S3_BUCKET` set (without it, admin falls back to disk upload and >6MB fails on AWS)
- [ ] Confirm media-bucket CORS includes the CloudFront/admin origin (CDK `MediaBucketClientUploadCors`)

### How large media uploads work

1. Admin selects a file in **Assets → Media**.
2. Browser `POST /api/storage-s3-generate-signed-url` (small JSON: filename, size, mime).
3. Browser `PUT` the file bytes **directly to S3** using the signed URL (never through Lambda).
4. Payload saves the media document (metadata only).

If step 3 fails (CORS / wrong bucket / missing IAM), the admin may appear to “upload through the API” and hit the ~6MB Function URL limit.

Share CloudFront URL + admin link with the team.
