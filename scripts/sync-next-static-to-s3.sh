#!/usr/bin/env bash
# Copy Next.js static assets from the running Lambda origin into the S3 bucket
# used by CloudFront for /_next/static/*.
#
# Usage:
#   ./scripts/sync-next-static-to-s3.sh <env>
#   ./scripts/sync-next-static-to-s3.sh qa \
#     --lambda-url https://xxx.lambda-url.region.on.aws \
#     --bucket oriana-invertors-web-static-qa \
#     --site-url https://xxx.cloudfront.net

set -euo pipefail

ENV="${1:?env required (dev|qa|prod)}"
shift || true

APP="${APP_NAME:-oriana-invertors-web}"
REGION="${AWS_REGION:-ap-south-1}"
STACK="${APP}-${ENV}"
FN="${APP}-${ENV}"

LAMBDA_URL=""
STATIC_BUCKET=""
SITE_URL=""

while [ $# -gt 0 ]; do
  case "$1" in
    --lambda-url) LAMBDA_URL="$2"; shift 2 ;;
    --bucket) STATIC_BUCKET="$2"; shift 2 ;;
    --site-url) SITE_URL="$2"; shift 2 ;;
    *) echo "Unknown arg: $1" >&2; exit 1 ;;
  esac
done

if [ -z "$LAMBDA_URL" ]; then
  LAMBDA_URL=$(aws cloudformation describe-stacks \
    --stack-name "$STACK" \
    --region "$REGION" \
    --query "Stacks[0].Outputs[?contains(OutputKey, 'FunctionUrl')].OutputValue" \
    --output text 2>/dev/null | head -1)
fi

if [ -z "$STATIC_BUCKET" ]; then
  STATIC_BUCKET=$(aws cloudformation describe-stacks \
    --stack-name "$STACK" \
    --region "$REGION" \
    --query "Stacks[0].Outputs[?contains(OutputKey, 'StaticAssetsBucketName')].OutputValue" \
    --output text 2>/dev/null | head -1)
fi

if [ -z "$SITE_URL" ]; then
  SITE_URL=$(aws cloudformation describe-stacks \
    --stack-name "$STACK" \
    --region "$REGION" \
    --query "Stacks[0].Outputs[?contains(OutputKey, 'CloudFrontURL')].OutputValue" \
    --output text 2>/dev/null | head -1)
fi

if [ -z "$LAMBDA_URL" ] || [ "$LAMBDA_URL" = "None" ]; then
  echo "Lambda Function URL not found for $FN" >&2
  exit 1
fi

if [ -z "$STATIC_BUCKET" ] || [ "$STATIC_BUCKET" = "None" ]; then
  echo "Static assets bucket not found for $STACK" >&2
  exit 1
fi

if [ -z "$SITE_URL" ] || [ "$SITE_URL" = "None" ]; then
  SITE_URL="$LAMBDA_URL"
fi

LAMBDA_URL="${LAMBDA_URL%/}"
SITE_URL="${SITE_URL%/}"

echo "Syncing static assets"
echo "  env:    $ENV"
echo "  lambda: $LAMBDA_URL"
echo "  bucket: s3://$STATIC_BUCKET"
echo "  html:   $SITE_URL/admin"

HTML=$(curl -fsSL "$SITE_URL/admin")
PATHS=$(printf '%s' "$HTML" | python3 -c '
import re, sys
html = sys.stdin.read()
paths = sorted(set(re.findall(
    r"/_next/static/[^\"\s<>]+?\.(?:js|css|png|jpg|jpeg|webp|svg|woff2)",
    html,
)))
for p in paths:
    print(p)
')

if [ -z "$PATHS" ]; then
  echo "No /_next/static paths found in admin HTML" >&2
  exit 1
fi

TMP_DIR=$(mktemp -d)
trap 'rm -rf "$TMP_DIR"' EXIT

uploaded=0
skipped=0
failed=0

while IFS= read -r asset_path; do
  [ -n "$asset_path" ] || continue
  s3_key="${asset_path#/}"
  local_file="$TMP_DIR/$(basename "$asset_path")"

  if aws s3api head-object --bucket "$STATIC_BUCKET" --key "$s3_key" >/dev/null 2>&1; then
    skipped=$((skipped + 1))
    continue
  fi

  if ! curl -fsSL "${LAMBDA_URL}${asset_path}" -o "$local_file"; then
    echo "Failed to download ${asset_path}" >&2
    failed=$((failed + 1))
    continue
  fi

  content_type="application/octet-stream"
  case "$asset_path" in
    *.js) content_type="application/javascript" ;;
    *.css) content_type="text/css" ;;
    *.png) content_type="image/png" ;;
    *.jpg|*.jpeg) content_type="image/jpeg" ;;
    *.webp) content_type="image/webp" ;;
    *.svg) content_type="image/svg+xml" ;;
    *.woff2) content_type="font/woff2" ;;
  esac

  aws s3 cp "$local_file" "s3://${STATIC_BUCKET}/${s3_key}" \
    --content-type "$content_type" \
    --cache-control "public,max-age=31536000,immutable" \
    --metadata-directive REPLACE >/dev/null

  decoded_key=$(python3 -c 'import sys, urllib.parse; print(urllib.parse.unquote(sys.argv[1]))' "$s3_key")
  if [ "$decoded_key" != "$s3_key" ]; then
    aws s3 cp "$local_file" "s3://${STATIC_BUCKET}/${decoded_key}" \
      --content-type "$content_type" \
      --cache-control "public,max-age=31536000,immutable" \
      --metadata-directive REPLACE >/dev/null
  fi

  echo "uploaded ${asset_path}"
  uploaded=$((uploaded + 1))
  rm -f "$local_file"
done <<< "$PATHS"

echo "Done. uploaded=$uploaded skipped=$skipped failed=$failed"

if [ "$failed" -gt 0 ]; then
  exit 1
fi

DIST_ID=$(aws cloudfront list-distributions \
  --query "DistributionList.Items[?contains(Comment, '${APP}-${ENV}')].Id | [0]" \
  --output text 2>/dev/null || true)

if [ -n "$DIST_ID" ] && [ "$DIST_ID" != "None" ]; then
  aws cloudfront create-invalidation \
    --distribution-id "$DIST_ID" \
    --paths "/_next/static/*" >/dev/null
  echo "Invalidated CloudFront distribution $DIST_ID for /_next/static/*"
fi
