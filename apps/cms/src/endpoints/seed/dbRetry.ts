/**
 * Shared DB retry helpers for seed scripts against Supabase session poolers.
 */

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function errorText(error: unknown): string {
  const parts: unknown[] = [error]
  if (error && typeof error === 'object') {
    const err = error as { cause?: unknown; message?: unknown }
    if (err.cause) parts.push(err.cause)
    if (err.message) parts.push(err.message)
    if (err.cause && typeof err.cause === 'object' && 'message' in err.cause) {
      parts.push((err.cause as { message: unknown }).message)
    }
  }
  return parts.map(String).join(' ')
}

export function isRetryableDbError(error: unknown): boolean {
  const text = errorText(error)
  // Schema missing is not transient — fail fast so ensureSchema can fix it
  if (text.includes('does not exist') || text.includes('42P01')) return false
  return (
    text.includes('timeout exceeded when trying to connect') ||
    text.includes('cannot begin transaction') ||
    text.includes('EMAXCONNSESSION') ||
    text.includes('max clients reached') ||
    text.includes('too many clients') ||
    text.includes('Connection terminated') ||
    text.includes('ECONNRESET') ||
    text.includes('ECONNREFUSED') ||
    text.includes('ETIMEDOUT') ||
    text.includes('remaining connection slots') ||
    text.includes('sorry, too many clients')
  )
}

export async function withRetry<T>(
  label: string,
  fn: () => Promise<T>,
  attempts = Number(process.env.SEED_RETRY_ATTEMPTS || 6),
): Promise<T> {
  let last: unknown
  for (let i = 1; i <= attempts; i++) {
    try {
      return await fn()
    } catch (error) {
      last = error
      if (!isRetryableDbError(error) || i === attempts) break
      const wait = Math.min(2000 * i, 15_000)
      console.warn(`[seed] ${label} failed (attempt ${i}/${attempts}), retrying in ${wait}ms…`)
      await sleep(wait)
    }
  }
  throw last
}

export { sleep }
