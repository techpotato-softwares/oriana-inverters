#!/usr/bin/env bash
# Print export lines for Payload + database secrets (rebuilds DATABASE_URL from parts).
# Usage: eval "$(./scripts/load-deploy-secrets.sh qa)"

set -euo pipefail
ENV="${1:?env required}"
APP="${APP_NAME:-oriana-invertors-web}"
REGION="${AWS_REGION:-ap-south-1}"

PAYLOAD_JSON=$(aws secretsmanager get-secret-value \
  --secret-id "/$APP/$ENV/payload" --region "$REGION" \
  --query SecretString --output text)
DB_JSON=$(aws secretsmanager get-secret-value \
  --secret-id "/$APP/$ENV/database" --region "$REGION" \
  --query SecretString --output text)

PAYLOAD_SECRET=$(echo "$PAYLOAD_JSON" | jq -r '.PAYLOAD_SECRET')
CRON_SECRET=$(echo "$PAYLOAD_JSON" | jq -r '.CRON_SECRET // empty')
PREVIEW_SECRET=$(echo "$PAYLOAD_JSON" | jq -r '.PREVIEW_SECRET // empty')

DB_HOST=$(echo "$DB_JSON" | jq -r '.DB_HOST')
DB_PORT=$(echo "$DB_JSON" | jq -r '.DB_PORT')
DB_NAME=$(echo "$DB_JSON" | jq -r '.DB_NAME')
DB_USER=$(echo "$DB_JSON" | jq -r '.DB_USER')
DB_PASSWORD=$(echo "$DB_JSON" | jq -r '.DB_PASSWORD')
DB_SSL=$(echo "$DB_JSON" | jq -r '.DB_SSL // true')

SSL_QUERY=""
if [[ "$DB_SSL" == "true" ]]; then SSL_QUERY="?sslmode=require&uselibpqcompat=true"; fi
DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}${SSL_QUERY}"

printf 'export PAYLOAD_SECRET=%q\n' "$PAYLOAD_SECRET"
printf 'export CRON_SECRET=%q\n' "$CRON_SECRET"
printf 'export PREVIEW_SECRET=%q\n' "$PREVIEW_SECRET"
printf 'export DATABASE_URL=%q\n' "$DATABASE_URL"
printf 'export DB_PASSWORD=%q\n' "$DB_PASSWORD"
