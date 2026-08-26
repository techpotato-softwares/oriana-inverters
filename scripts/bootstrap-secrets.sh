#!/usr/bin/env bash
# Bootstrap Secrets Manager for oriana-invertors-web.
#
# - Always ensures payload secrets exist (auto-generated).
# - For external DBs (qa/dev): writes app DB secret from config/deploy.env
#   (host/user only — password stays in Secrets Manager, never git/GH).
# - For RDS prod: only ensures payload secrets; DB app secret is written by
#   scripts/sync-rds-app-secret.sh after CDK creates the instance.
#
# Usage: ./scripts/bootstrap-secrets.sh qa

set -euo pipefail

ENV="${1:?Usage: bootstrap-secrets.sh <dev|qa|prod>}"
APP="${APP_NAME:-oriana-invertors-web}"
REGION="${AWS_REGION:-ap-south-1}"
ENV_FILE="config/deploy.env"
DB_SECRET="/${APP}/${ENV}/database"
PAYLOAD_SECRET_PATH="/${APP}/${ENV}/payload"
PLACEHOLDER_PASSWORD="CHANGE_ME_UPDATE_IN_AWS_CONSOLE"

# Prod uses shared RDS created by CDK — skip external DB bootstrap.
USES_RDS=false
if [[ "$ENV" == "prod" ]]; then
  USES_RDS=true
fi

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

# Create payload secrets once (never from GH secrets)
if ! secret_exists "$PAYLOAD_SECRET_PATH"; then
  PS=$(gen_secret)
  CS=$(gen_secret)
  PR=$(gen_secret)
  PAYLOAD_JSON=$(jq -n \
    --arg ps "$PS" --arg cs "$CS" --arg pr "$PR" \
    '{PAYLOAD_SECRET: $ps, CRON_SECRET: $cs, PREVIEW_SECRET: $pr}')
  put_secret "$PAYLOAD_SECRET_PATH" "$PAYLOAD_JSON"
else
  echo "Payload secret already exists: $PAYLOAD_SECRET_PATH"
fi

if [[ "$USES_RDS" == "true" ]]; then
  echo "Env ${ENV} uses CDK-managed RDS (oriana-web)."
  echo "App DB secret will be written by sync-rds-app-secret.sh after deploy."
  echo "Secrets bootstrap complete for ${ENV} (payload only)."
  exit 0
fi

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
DB_SCHEMA_VAR="${PREFIX}_DB_SCHEMA"

DB_HOST="${!DB_HOST_VAR:-}"
DB_PORT="${!DB_PORT_VAR:-}"
DB_NAME="${!DB_NAME_VAR:-}"
DB_USER="${!DB_USER_VAR:-}"
DB_SSL="${!DB_SSL_VAR:-true}"
DB_SCHEMA="${!DB_SCHEMA_VAR:-public}"

: "${DB_HOST:?${DB_HOST_VAR} required in $ENV_FILE}"
: "${DB_PORT:?${DB_PORT_VAR} required in $ENV_FILE}"
: "${DB_NAME:?${DB_NAME_VAR} required in $ENV_FILE}"
: "${DB_USER:?${DB_USER_VAR} required in $ENV_FILE}"

# Password only from existing Secrets Manager — never from GH / deploy.env
EXISTING_DB=$(get_secret_json "$DB_SECRET")
DB_PASSWORD=$(echo "$EXISTING_DB" | jq -r '.DB_PASSWORD // empty')
if [[ -z "$DB_PASSWORD" || "$DB_PASSWORD" == "null" ]]; then
  # Also accept RDS-style keys if someone rotated manually
  DB_PASSWORD=$(echo "$EXISTING_DB" | jq -r '.password // empty')
fi
if [[ -z "$DB_PASSWORD" || "$DB_PASSWORD" == "null" ]]; then
  DB_PASSWORD="$PLACEHOLDER_PASSWORD"
fi

ENC_PASSWORD=$(python3 -c "import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1], safe=''))" "$DB_PASSWORD")
SSL_QUERY=""
if [[ "$DB_SSL" == "true" ]]; then
  SSL_QUERY="?sslmode=require&uselibpqcompat=true"
fi
if [[ "$DB_SCHEMA" != "public" && -n "$DB_SCHEMA" ]]; then
  SEARCH_PATH_OPT=$(python3 -c "import urllib.parse,sys; print(urllib.parse.quote('-csearch_path='+sys.argv[1]+',public', safe=''))" "$DB_SCHEMA")
  if [[ -n "$SSL_QUERY" ]]; then
    SSL_QUERY="${SSL_QUERY}&options=${SEARCH_PATH_OPT}"
  else
    SSL_QUERY="?options=${SEARCH_PATH_OPT}"
  fi
fi

DATABASE_URL="postgresql://${DB_USER}:${ENC_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}${SSL_QUERY}"

DB_JSON=$(jq -n \
  --arg host "$DB_HOST" \
  --arg port "$DB_PORT" \
  --arg name "$DB_NAME" \
  --arg user "$DB_USER" \
  --arg pass "$DB_PASSWORD" \
  --arg schema "$DB_SCHEMA" \
  --arg url "$DATABASE_URL" \
  --argjson ssl "$([ "$DB_SSL" = true ] && echo true || echo false)" \
  '{
    DB_HOST: $host,
    DB_PORT: ($port | tonumber),
    DB_NAME: $name,
    DB_USER: $user,
    DB_PASSWORD: $pass,
    DB_SSL: $ssl,
    DB_SCHEMA: $schema,
    DATABASE_URL: $url
  }')

put_secret "$DB_SECRET" "$DB_JSON"

if [[ "$DB_PASSWORD" == "$PLACEHOLDER_PASSWORD" ]]; then
  echo "DB password is still placeholder for $ENV."
  echo "Set DB_PASSWORD once in AWS Secrets Manager → $DB_SECRET"
  echo "(Do not put the password in GitHub Actions secrets.)"
fi

echo "Secrets bootstrap complete for ${ENV}"
