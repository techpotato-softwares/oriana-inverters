#!/usr/bin/env bash
# Sync Next.js static assets to the S3 bucket used by CloudFront for /_next/static/*.
#
# Default: copy assets referenced by the live Lambda HTML (source of truth for the
# running container image). Optional --source-dir uses a local folder instead.
#
# Usage:
#   ./scripts/sync-next-static-to-s3.sh qa
#   ./scripts/sync-next-static-to-s3.sh qa --source-dir apps/cms/.next/static

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
SOURCE_DIR=""
WAIT_SECONDS=180

while [ $# -gt 0 ]; do
  case "$1" in
    --lambda-url) LAMBDA_URL="$2"; shift 2 ;;
    --bucket) STATIC_BUCKET="$2"; shift 2 ;;
    --site-url) SITE_URL="$2"; shift 2 ;;
    --source-dir) SOURCE_DIR="$2"; shift 2 ;;
    --wait-seconds) WAIT_SECONDS="$2"; shift 2 ;;
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

if [ -z "$STATIC_BUCKET" ] || [ "$STATIC_BUCKET" = "None" ]; then
  echo "Static assets bucket not found for $STACK" >&2
  exit 1
fi

LAMBDA_URL="${LAMBDA_URL%/}"
SITE_URL="${SITE_URL%/}"

echo "Syncing static assets"
echo "  env:    $ENV"
echo "  bucket: s3://$STATIC_BUCKET"

upload_encoded_aliases() {
  python3 - <<'PY' "$STATIC_BUCKET"
import json
import subprocess
import sys

bucket = sys.argv[1]

def encoded_alias_key(key: str) -> str:
    if not any(ch in key for ch in "[]"):
        return key
    parts = key.split("/")
    encoded_parts = [
        part.replace("[", "%5B").replace("]", "%5D") if any(ch in part for ch in "[]") else part
        for part in parts
    ]
    return "/".join(encoded_parts)

result = subprocess.run(
    ["aws", "s3api", "list-objects-v2", "--bucket", bucket, "--prefix", "_next/static/"],
    capture_output=True,
    text=True,
    check=True,
)
keys = [item["Key"] for item in json.loads(result.stdout).get("Contents", [])]
created = 0

for key in keys:
    encoded_key = encoded_alias_key(key)
    if encoded_key == key:
        continue
    subprocess.run(
        [
            "aws",
            "s3api",
            "copy-object",
            "--bucket",
            bucket,
            "--copy-source",
            f"{bucket}/{key}",
            "--key",
            encoded_key,
            "--metadata-directive",
            "COPY",
        ],
        check=True,
        stdout=subprocess.DEVNULL,
    )
    created += 1

print(f"Created {created} URL-encoded alias object(s)")
PY
}

sync_from_local() {
  echo "  source: $SOURCE_DIR (local build)"
  aws s3 sync "$SOURCE_DIR" "s3://${STATIC_BUCKET}/_next/static" \
    --delete \
    --cache-control "public,max-age=31536000,immutable"
  upload_encoded_aliases
}

extract_paths_from_html() {
  python3 -c '
import re, sys
html = sys.stdin.read()
if not html or html.lstrip().startswith("{") or "<html" not in html.lower():
    sys.exit(1)
paths = sorted(set(re.findall(
    r"/_next/static/[^\"\s<>]+?\.(?:js|css|png|jpg|jpeg|webp|svg|woff2)",
    html,
)))
if not paths:
    sys.exit(1)
for p in paths:
    print(p)
'
}

wait_for_lambda_html() {
  local deadline=$((SECONDS + WAIT_SECONDS))
  local page html
  : > /tmp/static-paths.txt
  while [ "$SECONDS" -lt "$deadline" ]; do
    for page in /admin/login /admin /; do
      if html=$(curl -fsSL --max-time 30 "${LAMBDA_URL}${page}" 2>/dev/null); then
        if printf '%s' "$html" | extract_paths_from_html >/tmp/static-paths.txt 2>/dev/null; then
          echo "  healthy: ${LAMBDA_URL}${page}" >&2
          return 0
        fi
      fi
    done
    echo "  waiting for Lambda HTML... ($((deadline - SECONDS))s left)" >&2
    sleep 5
  done
  return 1
}

sync_from_lambda_html() {
  if [ -z "$LAMBDA_URL" ] || [ "$LAMBDA_URL" = "None" ]; then
    echo "Lambda Function URL not found for $FN" >&2
    return 1
  fi

  echo "  source: Lambda HTML (${LAMBDA_URL})"
  wait_for_lambda_html || {
    echo "Lambda did not return HTML with /_next/static assets within ${WAIT_SECONDS}s" >&2
    echo "Check CloudWatch logs for /aws/lambda/${FN}" >&2
    return 1
  }
  PATHS="$(cat /tmp/static-paths.txt)"

  TMP_DIR=$(mktemp -d)
  trap 'rm -rf "$TMP_DIR"' EXIT

  uploaded=0
  failed=0

  while IFS= read -r asset_path; do
    [ -n "$asset_path" ] || continue
    [[ "$asset_path" == /_next/static/* ]] || continue

    s3_key="${asset_path#/}"
    local_file="$TMP_DIR/$(basename "$asset_path" | tr '/[]' '___')"

    if ! curl -fsSL --max-time 60 "${LAMBDA_URL}${asset_path}" -o "$local_file"; then
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
      --cache-control "public,max-age=31536000,immutable" >/dev/null

    decoded_key=$(python3 -c 'import sys, urllib.parse; print(urllib.parse.unquote(sys.argv[1]))' "$s3_key")
    if [ "$decoded_key" != "$s3_key" ]; then
      aws s3 cp "$local_file" "s3://${STATIC_BUCKET}/${decoded_key}" \
        --content-type "$content_type" \
        --cache-control "public,max-age=31536000,immutable" >/dev/null
    fi

    echo "uploaded ${asset_path}"
    uploaded=$((uploaded + 1))
    rm -f "$local_file"
  done <<< "$PATHS"

  echo "Done. uploaded=$uploaded failed=$failed"
  [ "$failed" -eq 0 ]
}

if [ -n "$SOURCE_DIR" ]; then
  sync_from_local
else
  sync_from_lambda_html
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
