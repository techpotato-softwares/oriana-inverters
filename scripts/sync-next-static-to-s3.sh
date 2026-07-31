#!/usr/bin/env bash
# Sync Next.js static assets to the S3 bucket used by CloudFront for /_next/static/*.
#
# Prefer --source-dir pointing at the exact .next/static tree from the deployed
# Lambda image (CI does this). Fallback: scrape multiple Lambda HTML pages and
# upload referenced assets (must include / — admin alone misses app/(frontend)/*).
#
# Usage:
#   ./scripts/sync-next-static-to-s3.sh qa
#   ./scripts/sync-next-static-to-s3.sh qa --source-dir /tmp/lambda-next-static

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
  # CloudFront/S3 OAC may request keys with URL-encoded [ ] ( ) from Next route segments.
  # Keep literal keys and create encoded alias objects so both forms resolve.
  # Important: pass the literal source key to --copy-source. The AWS CLI encodes it;
  # pre-encoding causes NoSuchKey (%28 looked up as a literal key name).
  python3 - <<'PY' "$STATIC_BUCKET"
import json
import subprocess
import sys

bucket = sys.argv[1]
SPECIAL = "[]()"

def encoded_alias_key(key: str) -> str:
    if not any(ch in key for ch in SPECIAL):
        return key
    parts = key.split("/")
    encoded_parts = []
    for part in parts:
        if any(ch in part for ch in SPECIAL):
            encoded_parts.append(
                part.replace("[", "%5B")
                .replace("]", "%5D")
                .replace("(", "%28")
                .replace(")", "%29")
            )
        else:
            encoded_parts.append(part)
    return "/".join(encoded_parts)

def list_keys(prefix: str) -> list[str]:
    keys: list[str] = []
    token = None
    while True:
        cmd = [
            "aws", "s3api", "list-objects-v2",
            "--bucket", bucket,
            "--prefix", prefix,
        ]
        if token:
            cmd.extend(["--continuation-token", token])
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        payload = json.loads(result.stdout)
        keys.extend(item["Key"] for item in payload.get("Contents") or [])
        if not payload.get("IsTruncated"):
            break
        token = payload.get("NextContinuationToken")
    return keys

keys = list_keys("_next/static/")
# Only alias literal route-segment keys — skip existing %XX alias objects.
literal_keys = [k for k in keys if any(ch in k for ch in SPECIAL)]
created = 0

for key in literal_keys:
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

# Pages whose HTML references distinct Next.js chunks. Admin alone is not enough —
# homepage uses app/(frontend)/* chunks that admin never loads.
SYNC_PAGES=(
  /
  /admin/login
  /admin
  /products
  /about
  /contact
  /where-to-buy
  /support
  /careers
  /case-studies
  /search
)

wait_for_lambda_html() {
  local deadline=$((SECONDS + WAIT_SECONDS))
  local page html
  : > /tmp/static-paths.txt
  while [ "$SECONDS" -lt "$deadline" ]; do
    for page in "${SYNC_PAGES[@]}"; do
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

collect_paths_from_pages() {
  local page html
  : > /tmp/static-paths.txt
  for page in "${SYNC_PAGES[@]}"; do
    if html=$(curl -fsSL --max-time 30 "${LAMBDA_URL}${page}" 2>/dev/null); then
      if printf '%s' "$html" | extract_paths_from_html >/tmp/static-paths-page.txt 2>/dev/null; then
        cat /tmp/static-paths-page.txt >> /tmp/static-paths.txt
        echo "  collected: ${page}" >&2
      else
        echo "  skip (no static refs): ${page}" >&2
      fi
    else
      echo "  skip (unreachable): ${page}" >&2
    fi
  done
  if [ ! -s /tmp/static-paths.txt ]; then
    return 1
  fi
  sort -u /tmp/static-paths.txt -o /tmp/static-paths.txt
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
  collect_paths_from_pages || {
    echo "No static asset paths collected from Lambda HTML" >&2
    return 1
  }
  PATHS="$(cat /tmp/static-paths.txt)"
  echo "  unique assets: $(printf '%s\n' "$PATHS" | grep -c . || true)"

  TMP_DIR=$(mktemp -d)
  trap 'rm -rf "$TMP_DIR"' EXIT

  uploaded=0
  failed=0

  while IFS= read -r asset_path; do
    [ -n "$asset_path" ] || continue
    [[ "$asset_path" == /_next/static/* ]] || continue

    s3_key="${asset_path#/}"
    # Decode any already-encoded segment so we always upload the literal S3 key.
    s3_key=$(python3 -c 'import sys, urllib.parse; print(urllib.parse.unquote(sys.argv[1]))' "$s3_key")
    local_file="$TMP_DIR/$(printf '%s' "$asset_path" | tr '/[]()%' '______')"

    # curl encodes () in the request path; Lambda serves the literal filesystem path.
    if ! curl -fsSL --max-time 60 --path-as-is "${LAMBDA_URL}${asset_path}" -o "$local_file"; then
      # Retry with explicitly encoded parentheses/brackets for picky origins.
      encoded_path=$(python3 -c '
import sys, urllib.parse
p = sys.argv[1]
print("/".join(
  urllib.parse.quote(part, safe="._-~") if any(c in part for c in "[]()") else part
  for part in p.split("/")
))
' "$asset_path")
      if ! curl -fsSL --max-time 60 "${LAMBDA_URL}${encoded_path}" -o "$local_file"; then
        echo "Failed to download ${asset_path}" >&2
        failed=$((failed + 1))
        continue
      fi
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

    echo "uploaded /${s3_key}"
    uploaded=$((uploaded + 1))
    rm -f "$local_file"
  done <<< "$PATHS"

  upload_encoded_aliases

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
