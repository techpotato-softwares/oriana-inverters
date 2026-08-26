#!/usr/bin/env bash
# After CDK creates shared RDS (oriana-web), sync the *app* connection secret and
# ensure the site schema exists.
#
# Reads master credentials from /{APP}/{ENV}/database-master (CDK-owned).
# Writes app secret to /{APP}/{ENV}/database with:
#   DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, DB_SSL, DB_SCHEMA, DATABASE_URL
#
# Usage: ./scripts/sync-rds-app-secret.sh prod
# Optional env:
#   RDS_INSTANCE_ID   (default: oriana-web)
#   DB_SCHEMA         (default: oriana_invertors)
#   SKIP_SCHEMA_CREATE=true  — only rewrite Secrets Manager JSON

set -euo pipefail

ENV="${1:?Usage: sync-rds-app-secret.sh <prod|dev>}"
APP="${APP_NAME:-oriana-invertors-web}"
REGION="${AWS_REGION:-ap-south-1}"
INSTANCE_ID="${RDS_INSTANCE_ID:-oriana-web}"
SCHEMA="${DB_SCHEMA:-oriana_invertors}"
MASTER_SECRET="/${APP}/${ENV}/database-master"
APP_SECRET="/${APP}/${ENV}/database"

if [[ "$ENV" == "qa" ]]; then
  echo "QA uses external Supabase — skip RDS sync."
  exit 0
fi

echo "Syncing RDS app secret for ${ENV} (instance=${INSTANCE_ID}, schema=${SCHEMA})"

# Wait until RDS is available
for i in $(seq 1 60); do
  STATUS=$(aws rds describe-db-instances \
    --db-instance-identifier "$INSTANCE_ID" \
    --region "$REGION" \
    --query 'DBInstances[0].DBInstanceStatus' \
    --output text 2>/dev/null || echo "missing")
  if [[ "$STATUS" == "available" ]]; then
    break
  fi
  echo "  RDS status: ${STATUS} (attempt ${i}/60)…"
  sleep 15
done

if [[ "$STATUS" != "available" ]]; then
  echo "RDS instance ${INSTANCE_ID} not available (status=${STATUS})"
  exit 1
fi

ENDPOINT=$(aws rds describe-db-instances \
  --db-instance-identifier "$INSTANCE_ID" \
  --region "$REGION" \
  --query 'DBInstances[0].Endpoint.Address' \
  --output text)
PORT=$(aws rds describe-db-instances \
  --db-instance-identifier "$INSTANCE_ID" \
  --region "$REGION" \
  --query 'DBInstances[0].Endpoint.Port' \
  --output text)
DB_NAME=$(aws rds describe-db-instances \
  --db-instance-identifier "$INSTANCE_ID" \
  --region "$REGION" \
  --query 'DBInstances[0].DBName' \
  --output text)
DB_NAME="${DB_NAME:-postgres}"

MASTER_JSON=$(aws secretsmanager get-secret-value \
  --secret-id "$MASTER_SECRET" \
  --region "$REGION" \
  --query SecretString \
  --output text)

DB_USER=$(echo "$MASTER_JSON" | jq -r '.username // .DB_USER')
DB_PASSWORD=$(echo "$MASTER_JSON" | jq -r '.password // .DB_PASSWORD')

if [[ -z "$DB_USER" || "$DB_USER" == "null" || -z "$DB_PASSWORD" || "$DB_PASSWORD" == "null" ]]; then
  echo "Master secret ${MASTER_SECRET} missing username/password"
  exit 1
fi

# URL-encode password for DATABASE_URL
ENC_PASSWORD=$(python3 -c "import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1], safe=''))" "$DB_PASSWORD")

# search_path via connection options so clients land in the site schema
# options=-csearch_path%3Dschema,public
SEARCH_PATH_OPT=$(python3 -c "import urllib.parse,sys; print(urllib.parse.quote('-csearch_path='+sys.argv[1]+',public', safe=''))" "$SCHEMA")
DATABASE_URL="postgresql://${DB_USER}:${ENC_PASSWORD}@${ENDPOINT}:${PORT}/${DB_NAME}?sslmode=require&uselibpqcompat=true&options=${SEARCH_PATH_OPT}"

APP_JSON=$(jq -n \
  --arg host "$ENDPOINT" \
  --arg port "$PORT" \
  --arg name "$DB_NAME" \
  --arg user "$DB_USER" \
  --arg pass "$DB_PASSWORD" \
  --arg schema "$SCHEMA" \
  --arg url "$DATABASE_URL" \
  --arg instance "$INSTANCE_ID" \
  '{
    DB_HOST: $host,
    DB_PORT: ($port | tonumber),
    DB_NAME: $name,
    DB_USER: $user,
    DB_PASSWORD: $pass,
    DB_SSL: true,
    DB_SCHEMA: $schema,
    RDS_INSTANCE_ID: $instance,
    DATABASE_URL: $url
  }')

if aws secretsmanager describe-secret --secret-id "$APP_SECRET" --region "$REGION" >/dev/null 2>&1; then
  aws secretsmanager put-secret-value \
    --secret-id "$APP_SECRET" \
    --secret-string "$APP_JSON" \
    --region "$REGION" >/dev/null
  echo "Updated app secret: $APP_SECRET"
else
  aws secretsmanager create-secret \
    --name "$APP_SECRET" \
    --description "App DB connection for ${APP} ${ENV} (schema ${SCHEMA} on ${INSTANCE_ID})" \
    --secret-string "$APP_JSON" \
    --region "$REGION" >/dev/null
  echo "Created app secret: $APP_SECRET"
fi

if [[ "${SKIP_SCHEMA_CREATE:-}" == "true" ]]; then
  echo "SKIP_SCHEMA_CREATE=true — not creating schema"
  exit 0
fi

# Create schema if missing (requires network reachability to RDS)
if ! command -v psql >/dev/null 2>&1; then
  echo "Installing postgresql client…"
  sudo apt-get update -qq && sudo apt-get install -y -qq postgresql-client >/dev/null
fi

export PGPASSWORD="$DB_PASSWORD"
export PGSSLMODE=require

echo "Ensuring schema \"${SCHEMA}\" exists…"
psql \
  -h "$ENDPOINT" \
  -p "$PORT" \
  -U "$DB_USER" \
  -d "$DB_NAME" \
  -v ON_ERROR_STOP=1 \
  -c "CREATE SCHEMA IF NOT EXISTS ${SCHEMA}; GRANT ALL ON SCHEMA ${SCHEMA} TO ${DB_USER}; ALTER ROLE ${DB_USER} SET search_path TO ${SCHEMA}, public;"

echo "RDS app secret + schema sync complete."
