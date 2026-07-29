#!/usr/bin/env bash
# Bootstrap Secrets Manager placeholders for oriana-invertors-web.
# Reads DB details from config/deploy.env using ENV-prefixed keys.
# Usage: ./scripts/bootstrap-secrets.sh qa

set -euo pipefail

ENV="${1:?Usage: bootstrap-secrets.sh <dev|qa|prod>}"
APP="${APP_NAME:-oriana-invertors-web}"
REGION="${AWS_REGION:-ap-south-1}"
ENV_FILE="config/deploy.env"
DB_SECRET="/${APP}/${ENV}/database"
PAYLOAD_SECRET_PATH="/${APP}/${ENV}/payload"
PLACEHOLDER_PASSWORD="CHANGE_ME_UPDATE_IN_AWS_CONSOLE"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing $ENV_FILE — copy from config/deploy.env.example"
  exit 1
fi

# shellcheck disable=SC1090
set -a && source "$ENV_FILE" && set +a

PREFIX=$(printf '%s' "$ENV" | tr '[:lower:]' '[:upper:]')

DB_HOST_VAR="${PREFIX}_DB_HOST"
DB_PORT_VAR="${PREFIX}_DB_PORT"
DB_NAME_VAR="${PREFIX}_DB_NAME"
DB_USER_VAR="${PREFIX}_DB_USER"
DB_SSL_VAR="${PREFIX}_DB_SSL"

DB_HOST="${!DB_HOST_VAR:-}"
DB_PORT="${!DB_PORT_VAR:-}"
DB_NAME="${!DB_NAME_VAR:-}"
DB_USER="${!DB_USER_VAR:-}"
DB_SSL="${!DB_SSL_VAR:-true}"

: "${DB_HOST:?${DB_HOST_VAR} required in $ENV_FILE}"
: "${DB_PORT:?${DB_PORT_VAR} required in $ENV_FILE}"
: "${DB_NAME:?${DB_NAME_VAR} required in $ENV_FILE}"
: "${DB_USER:?${DB_USER_VAR} required in $ENV_FILE}"

gen_secret() {
  openssl rand -hex 32
}

secret_exists() {
  aws secretsmanager describe-secret --secret-id "$1" --region "$REGION" >/dev/null 2>&1
}

get_secret_json() {
  aws secretsmanager get-secret-value \
    --secret-id "$1" \
    --region "$REGION" \
    --query SecretString \
    --output text 2>/dev/null || echo "{}"
}

put_secret() {
  local id="$1" json="$2"
  if secret_exists "$id"; then
    aws secretsmanager put-secret-value \
      --secret-id "$id" \
      --secret-string "$json" \
      --region "$REGION" >/dev/null
    echo "Updated secret: $id"
  else
    aws secretsmanager create-secret \
      --name "$id" \
      --description "oriana-invertors-web ${ENV}" \
      --secret-string "$json" \
      --region "$REGION" >/dev/null
    echo "Created secret: $id"
  fi
}

# Create payload secrets once
if ! secret_exists "$PAYLOAD_SECRET_PATH"; then
  PS=$(gen_secret)
  CS=$(gen_secret)
  PR=$(gen_secret)
  PAYLOAD_JSON=$(jq -n \
    --arg ps "$PS" --arg cs "$CS" --arg pr "$PR" \
    '{PAYLOAD_SECRET: $ps, CRON_SECRET: $cs, PREVIEW_SECRET: $pr}')
  put_secret "$PAYLOAD_SECRET_PATH" "$PAYLOAD_JSON"
fi

# DB password source priority:
# 1) DB_PASSWORD_OVERRIDE (workflow manual input)
# 2) existing secret DB_PASSWORD
# 3) placeholder
if [[ -n "${DB_PASSWORD_OVERRIDE:-}" ]]; then
  DB_PASSWORD="$DB_PASSWORD_OVERRIDE"
else
  EXISTING_DB=$(get_secret_json "$DB_SECRET")
  if [[ "$EXISTING_DB" != "{}" ]]; then
    DB_PASSWORD=$(echo "$EXISTING_DB" | jq -r '.DB_PASSWORD // empty')
    if [[ -z "$DB_PASSWORD" || "$DB_PASSWORD" == "null" ]]; then
      DB_PASSWORD="$PLACEHOLDER_PASSWORD"
    fi
  else
    DB_PASSWORD="$PLACEHOLDER_PASSWORD"
  fi
fi

SSL_QUERY=""
if [[ "$DB_SSL" == "true" ]]; then
  SSL_QUERY="?sslmode=require"
fi

DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}${SSL_QUERY}"

DB_JSON=$(jq -n \
  --arg host "$DB_HOST" \
  --arg port "$DB_PORT" \
  --arg name "$DB_NAME" \
  --arg user "$DB_USER" \
  --arg pass "$DB_PASSWORD" \
  --arg url "$DATABASE_URL" \
  --argjson ssl "$([ "$DB_SSL" = true ] && echo true || echo false)" \
  '{
    DB_HOST: $host,
    DB_PORT: ($port | tonumber),
    DB_NAME: $name,
    DB_USER: $user,
    DB_PASSWORD: $pass,
    DB_SSL: $ssl,
    DATABASE_URL: $url
  }')

put_secret "$DB_SECRET" "$DB_JSON"

if [[ "$DB_PASSWORD" == "$PLACEHOLDER_PASSWORD" ]]; then
  echo "DB password is still placeholder for $ENV."
  echo "Update $DB_SECRET -> DB_PASSWORD in AWS Secrets Manager"
fi

echo "Secrets bootstrap complete for ${ENV}"
