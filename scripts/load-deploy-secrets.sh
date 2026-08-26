#!/usr/bin/env bash
# Print export lines for Payload + database secrets from Secrets Manager.
# Supports app secret shape (DB_*) and falls back to RDS master shape (username/password).
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

DB_HOST=$(echo "$DB_JSON" | jq -r '.DB_HOST // .host // empty')
DB_PORT=$(echo "$DB_JSON" | jq -r '.DB_PORT // .port // 5432')
DB_NAME=$(echo "$DB_JSON" | jq -r '.DB_NAME // .dbname // .database // "postgres"')
DB_USER=$(echo "$DB_JSON" | jq -r '.DB_USER // .username // empty')
DB_PASSWORD=$(echo "$DB_JSON" | jq -r '.DB_PASSWORD // .password // empty')
DB_SSL=$(echo "$DB_JSON" | jq -r '.DB_SSL // true')
DB_SCHEMA=$(echo "$DB_JSON" | jq -r '.DB_SCHEMA // empty')
EXISTING_URL=$(echo "$DB_JSON" | jq -r '.DATABASE_URL // empty')

# Payload/Drizzle reject schemaName "public" — treat as default (omit)
if [[ "$DB_SCHEMA" == "public" ]]; then
  DB_SCHEMA=""
fi

if [[ -z "$DB_USER" || -z "$DB_PASSWORD" ]]; then
  echo "Database secret /$APP/$ENV/database is missing credentials" >&2
  exit 1
fi

if [[ -n "$EXISTING_URL" && "$EXISTING_URL" != "null" ]]; then
  DATABASE_URL="$EXISTING_URL"
else
  ENC_PASSWORD=$(python3 -c "import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1], safe=''))" "$DB_PASSWORD")
  SSL_QUERY=""
  if [[ "$DB_SSL" == "true" ]]; then
    SSL_QUERY="?sslmode=require&uselibpqcompat=true"
  fi
  if [[ -n "$DB_SCHEMA" && "$DB_SCHEMA" != "public" ]]; then
    SEARCH_PATH_OPT=$(python3 -c "import urllib.parse,sys; print(urllib.parse.quote('-csearch_path='+sys.argv[1]+',public', safe=''))" "$DB_SCHEMA")
    if [[ -n "$SSL_QUERY" ]]; then
      SSL_QUERY="${SSL_QUERY}&options=${SEARCH_PATH_OPT}"
    else
      SSL_QUERY="?options=${SEARCH_PATH_OPT}"
    fi
  fi
  DATABASE_URL="postgresql://${DB_USER}:${ENC_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}${SSL_QUERY}"
fi

printf 'export PAYLOAD_SECRET=%q\n' "$PAYLOAD_SECRET"
printf 'export CRON_SECRET=%q\n' "$CRON_SECRET"
printf 'export PREVIEW_SECRET=%q\n' "$PREVIEW_SECRET"
printf 'export DATABASE_URL=%q\n' "$DATABASE_URL"
printf 'export DB_PASSWORD=%q\n' "$DB_PASSWORD"
printf 'export DB_SCHEMA=%q\n' "$DB_SCHEMA"
printf 'export PAYLOAD_DB_SCHEMA=%q\n' "$DB_SCHEMA"
