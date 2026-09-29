#!/usr/bin/env bash
# Download AWS Lambda Web Adapter binary from the public Lambda layer
# (avoids public.ecr.aws pulls that hit anonymous rate/data limits).
#
# Usage:
#   ./scripts/fetch-lambda-adapter.sh           # 0.9.1 (layer v25)
#   ./scripts/fetch-lambda-adapter.sh 0.9.1
#   ./scripts/fetch-lambda-adapter.sh 1.0.1

set -euo pipefail

VERSION="${1:-0.9.1}"
REGION="${AWS_REGION:-${AWS_DEFAULT_REGION:-ap-south-1}}"
OUT_DIR="$(cd "$(dirname "$0")/.." && pwd)/docker"
OUT_FILE="$OUT_DIR/lambda-adapter"

case "$VERSION" in
  0.9.0) LAYER_VER=24 ;;
  0.9.1) LAYER_VER=25 ;;
  1.0.0) LAYER_VER=27 ;;
  1.0.1) LAYER_VER=28 ;;
  *)
    echo "Unsupported adapter version: $VERSION" >&2
    echo "Supported: 0.9.0 0.9.1 1.0.0 1.0.1" >&2
    exit 1
    ;;
esac

LAYER_ARN="arn:aws:lambda:${REGION}:753240598075:layer:LambdaAdapterLayerX86:${LAYER_VER}"

mkdir -p "$OUT_DIR"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

echo "Fetching Lambda Web Adapter $VERSION (layer $LAYER_VER) in $REGION..."
URL="$(aws lambda get-layer-version-by-arn \
  --region "$REGION" \
  --arn "$LAYER_ARN" \
  --query 'Content.Location' \
  --output text)"

curl -fsSL "$URL" -o "$TMP/layer.zip"
unzip -qo "$TMP/layer.zip" -d "$TMP/extracted"
install -m 755 "$TMP/extracted/extensions/lambda-adapter" "$OUT_FILE"

echo "Wrote $OUT_FILE ($(wc -c < "$OUT_FILE" | tr -d ' ') bytes)"
