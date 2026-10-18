#!/usr/bin/env bash
# Resolve S3_BUCKET / S3_REGION for seed jobs (same bucket the Lambda uses).
# Prints export lines — use: eval "$(./scripts/load-media-env.sh qa)"
#
# Tries Lambda env first, then CloudFormation MediaBucketName output.

set -euo pipefail
ENV="${1:?env required}"
REGION="${AWS_REGION:-ap-south-1}"
APP="${APP_NAME:-oriana-invertors-web}"
FN="${APP}-${ENV}"
STACK="${APP}-${ENV}"

S3_BUCKET=""
S3_REGION="${REGION}"

if aws lambda get-function-configuration --function-name "$FN" --region "$REGION" >/dev/null 2>&1; then
  S3_BUCKET=$(aws lambda get-function-configuration \
    --function-name "$FN" --region "$REGION" \
    --query 'Environment.Variables.S3_BUCKET' --output text 2>/dev/null || true)
  LAMBDA_REGION=$(aws lambda get-function-configuration \
    --function-name "$FN" --region "$REGION" \
    --query 'Environment.Variables.S3_REGION' --output text 2>/dev/null || true)
  if [[ -n "${LAMBDA_REGION:-}" && "$LAMBDA_REGION" != "None" && "$LAMBDA_REGION" != "null" ]]; then
    S3_REGION="$LAMBDA_REGION"
  fi
fi

if [[ -z "${S3_BUCKET:-}" || "$S3_BUCKET" == "None" || "$S3_BUCKET" == "null" ]]; then
  OUT=$(aws cloudformation describe-stacks --stack-name "$STACK" --region "$REGION" \
    --query 'Stacks[0].Outputs' --output json 2>/dev/null || echo '[]')
  S3_BUCKET=$(echo "$OUT" | jq -r '.[] | select(.OutputKey|test("MediaBucketName")) | .OutputValue' | head -1)
fi

if [[ -z "${S3_BUCKET:-}" || "$S3_BUCKET" == "None" || "$S3_BUCKET" == "null" ]]; then
  echo "warning: could not resolve S3_BUCKET for ${ENV} (Lambda ${FN} / stack ${STACK})" >&2
  S3_BUCKET=""
fi

printf 'export S3_BUCKET=%q\n' "${S3_BUCKET}"
printf 'export S3_REGION=%q\n' "${S3_REGION}"
