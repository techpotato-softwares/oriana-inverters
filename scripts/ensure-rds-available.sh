#!/usr/bin/env bash
# Ensure shared RDS is available before CI schema push / seed.
# Prod uses a start/stop schedule; GitHub runners need the instance up.
#
# Usage: ./scripts/ensure-rds-available.sh [instance-id]
# Env: AWS_REGION (default ap-south-1), RDS_INSTANCE_ID (default oriana-web)

set -euo pipefail

INSTANCE_ID="${1:-${RDS_INSTANCE_ID:-oriana-web}}"
REGION="${AWS_REGION:-ap-south-1}"
MAX_WAIT_MINUTES="${RDS_WAIT_MINUTES:-20}"

echo "Checking RDS instance ${INSTANCE_ID}…"

STATUS=$(aws rds describe-db-instances \
  --db-instance-identifier "$INSTANCE_ID" \
  --region "$REGION" \
  --query 'DBInstances[0].DBInstanceStatus' \
  --output text 2>/dev/null || echo "missing")

if [[ "$STATUS" == "missing" || "$STATUS" == "None" ]]; then
  echo "RDS instance ${INSTANCE_ID} not found"
  exit 1
fi

echo "  Current status: ${STATUS}"

if [[ "$STATUS" == "stopped" ]]; then
  echo "  Starting ${INSTANCE_ID}…"
  aws rds start-db-instance \
    --db-instance-identifier "$INSTANCE_ID" \
    --region "$REGION" >/dev/null
  STATUS="starting"
fi

if [[ "$STATUS" == "stopping" ]]; then
  echo "  Instance is stopping — waiting for stopped, then starting…"
  for _ in $(seq 1 60); do
    STATUS=$(aws rds describe-db-instances \
      --db-instance-identifier "$INSTANCE_ID" \
      --region "$REGION" \
      --query 'DBInstances[0].DBInstanceStatus' \
      --output text)
    [[ "$STATUS" == "stopped" ]] && break
    sleep 10
  done
  aws rds start-db-instance \
    --db-instance-identifier "$INSTANCE_ID" \
    --region "$REGION" >/dev/null
  STATUS="starting"
fi

DEADLINE=$((SECONDS + MAX_WAIT_MINUTES * 60))
while (( SECONDS < DEADLINE )); do
  STATUS=$(aws rds describe-db-instances \
    --db-instance-identifier "$INSTANCE_ID" \
    --region "$REGION" \
    --query 'DBInstances[0].DBInstanceStatus' \
    --output text)
  echo "  Status: ${STATUS}"
  if [[ "$STATUS" == "available" ]]; then
    echo "RDS ${INSTANCE_ID} is available."
    exit 0
  fi
  sleep 15
done

echo "Timed out waiting for ${INSTANCE_ID} to become available (last status=${STATUS})"
exit 1
