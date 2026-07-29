/**
 * SQLite-specific prepare step is no longer needed (Postgres).
 * Kept as a no-op so older scripts/docs that call it do not fail.
 */
process.exit(0)
