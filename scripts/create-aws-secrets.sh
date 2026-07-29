#!/usr/bin/env bash
# Deprecated — use ./scripts/bootstrap-secrets.sh instead
exec "$(dirname "$0")/bootstrap-secrets.sh" "$@"
