#!/usr/bin/env bash
# Unstick CMS Lambda after seed left reserved concurrency at 0
# (API returns ReservedFunctionConcurrentInvocationLimitExceeded / Rate Exceeded).
#
# Usage:
#   ./scripts/restore-lambda-concurrency.sh qa
#   ./scripts/restore-lambda-concurrency.sh qa ap-south-1
set -euo pipefail

ENV="${1:?Usage: $0 <dev|qa|prod> [aws-region]}"
REGION="${2:-${AWS_REGION:-ap-south-1}}"
FN="oriana-invertors-web-${ENV}"

echo "Checking $FN ($REGION)…"
aws lambda get-function --function-name "$FN" --region "$REGION" >/dev/null

echo "Current reserved concurrency:"
aws lambda get-function-concurrency --function-name "$FN" --region "$REGION" || echo "(none)"

echo "Deleting reserved concurrency cap…"
aws lambda delete-function-concurrency --function-name "$FN" --region "$REGION"

echo "After restore:"
aws lambda get-function-concurrency --function-name "$FN" --region "$REGION" || echo "(none = account default — OK)"
echo "Done. Retry the site /admin URL."
