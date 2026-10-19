import { APIError } from 'payload'

/** Honeypot field name — must stay empty. Hidden on the public forms. */
export const FORM_HONEYPOT_NAME = 'companyWebsite'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
const PHONE_PATTERN = /^\+\d{1,4}\s?\d{6,15}$/
const SAFE_NAME_PATTERN = /^[\p{L}\p{M}\s.'’-]+$/u

/** Patterns that indicate script / markup injection attempts. */
const DANGEROUS_PATTERN =
  /<\s*script|<\/\s*script|javascript\s*:|vbscript\s*:|data\s*:\s*text\/html|on\w+\s*=|<\s*iframe|<\s*object|<\s*embed|<\s*link|<\s*meta|<\s*svg[\s>]|expression\s*\(|url\s*\(\s*['"]?\s*javascript/i

const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g
const HTML_TAGS = /<\/?[a-zA-Z][^>]*>/g

export const FIELD_LIMITS = {
  name: 120,
  email: 254,
  phone: 32,
  company: 160,
  city: 120,
  role: 160,
  shortText: 200,
  message: 5000,
  fieldKey: 80,
  submissionRows: 40,
} as const

type RateBucket = { count: number; resetAt: number }

const rateBuckets = new Map<string, RateBucket>()

type AssertRateLimitOptions = {
  key: string
  /** Max creates in the window. */
  limit?: number
  /** Window length in ms. */
  windowMs?: number
}

/** Simple in-process rate limit (per Lambda instance). Fails closed when exceeded. */
export function assertFormRateLimit({
  key,
  limit = 8,
  windowMs = 10 * 60 * 1000,
}: AssertRateLimitOptions): void {
  const now = Date.now()
  const bucket = rateBuckets.get(key)
  if (!bucket || now >= bucket.resetAt) {
    rateBuckets.set(key, { count: 1, resetAt: now + windowMs })
    return
  }
  bucket.count += 1
  if (bucket.count > limit) {
    throw new APIError('Too many submissions. Please try again in a few minutes.', 429, null, true)
  }
}

export function clientKeyFromHeaders(headers: Headers | { get?: (name: string) => string | null } | undefined): string {
  if (!headers || typeof headers.get !== 'function') return 'unknown'
  const forwarded = headers.get('x-forwarded-for') || headers.get('x-real-ip') || ''
  const ip = forwarded.split(',')[0]?.trim() || 'unknown'
  return ip.slice(0, 64)
}

function stripControlChars(value: string, allowNewlines: boolean): string {
  if (allowNewlines) {
    return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
  }
  return value.replace(CONTROL_CHARS, '').replace(/[\r\n]/g, ' ')
}

/** Remove tags / nulls / header-injection newlines. Does not decode entities into HTML. */
export function sanitizePlainText(
  value: unknown,
  {
    maxLength,
    allowNewlines = false,
  }: {
    maxLength: number
    allowNewlines?: boolean
  },
): string {
  if (typeof value !== 'string') return ''
  let text = value.normalize('NFKC').trim()
  text = stripControlChars(text, allowNewlines)
  text = text.replace(HTML_TAGS, '')
  // Collapse leftover angle brackets used in XSS probes.
  text = text.replace(/[<>]/g, '')
  if (allowNewlines) {
    text = text.replace(/\r\n?/g, '\n').replace(/\n{3,}/g, '\n\n')
  } else {
    text = text.replace(/\s+/g, ' ').trim()
  }
  if (text.length > maxLength) text = text.slice(0, maxLength)
  return text
}

export function assertSafeText(value: string, label = 'Input'): void {
  if (DANGEROUS_PATTERN.test(value)) {
    throw new APIError(`${label} contains disallowed content.`, 400, null, true)
  }
}

export function assertHoneypotEmpty(data: Record<string, unknown> | null | undefined): void {
  if (!data) return
  const bait = data[FORM_HONEYPOT_NAME]
  if (typeof bait === 'string' && bait.trim()) {
    // Generic message — do not tip off bots.
    throw new APIError('Unable to submit. Please try again.', 400, null, true)
  }
  // Also reject if honeypot was stuffed into submissionData rows.
  const rows = data.submissionData
  if (Array.isArray(rows)) {
    const hit = rows.some((row) => {
      if (!row || typeof row !== 'object') return false
      const field = String((row as { field?: unknown }).field || '').toLowerCase()
      return field === FORM_HONEYPOT_NAME.toLowerCase() || field === 'website' || field === 'url'
    })
    if (hit) {
      throw new APIError('Unable to submit. Please try again.', 400, null, true)
    }
  }
}

export function sanitizeEmail(value: unknown): string {
  const email = sanitizePlainText(value, { maxLength: FIELD_LIMITS.email }).toLowerCase()
  if (!email || !EMAIL_PATTERN.test(email) || email.includes('..')) {
    throw new APIError('Enter a valid email address.', 400, null, true)
  }
  assertSafeText(email, 'Email')
  return email
}

export function sanitizePhone(value: unknown): string {
  const phone = sanitizePlainText(value, { maxLength: FIELD_LIMITS.phone })
  if (!PHONE_PATTERN.test(phone)) {
    throw new APIError('Enter a valid phone number with country code.', 400, null, true)
  }
  return phone
}

export function sanitizePersonName(value: unknown, required = true): string {
  const name = sanitizePlainText(value, { maxLength: FIELD_LIMITS.name })
  if (!name) {
    if (required) throw new APIError('Name is required.', 400, null, true)
    return ''
  }
  assertSafeText(name, 'Name')
  if (!SAFE_NAME_PATTERN.test(name)) {
    throw new APIError('Name contains invalid characters.', 400, null, true)
  }
  return name
}

export function sanitizeShortText(
  value: unknown,
  {
    maxLength = FIELD_LIMITS.shortText,
    required = false,
    label = 'Field',
  }: { maxLength?: number; required?: boolean; label?: string } = {},
): string {
  const text = sanitizePlainText(value, { maxLength })
  if (!text) {
    if (required) throw new APIError(`${label} is required.`, 400, null, true)
    return ''
  }
  assertSafeText(text, label)
  return text
}

export function sanitizeMessage(value: unknown, required = false): string {
  const text = sanitizePlainText(value, {
    maxLength: FIELD_LIMITS.message,
    allowNewlines: true,
  })
  if (!text) {
    if (required) throw new APIError('Message is required.', 400, null, true)
    return ''
  }
  assertSafeText(text, 'Message')
  return text
}

/** Safe basename for uploaded resumes — blocks path traversal and odd extensions. */
export function sanitizeUploadFilename(filename: string, allowedExt: ReadonlySet<string>): string {
  const base = filename.replace(/\\/g, '/').split('/').pop() || 'upload'
  const cleaned = base.replace(/[^\w.\-()+ ]+/g, '_').slice(0, 120)
  const ext = cleaned.split('.').pop()?.toLowerCase() || ''
  if (!allowedExt.has(ext)) {
    throw new APIError('Resume must be a PDF, DOC, or DOCX file.', 400, null, true)
  }
  // Block double extensions like resume.pdf.exe
  const parts = cleaned.split('.')
  if (parts.length > 2) {
    return `${parts[0].slice(0, 80)}.${ext}`
  }
  return cleaned || `resume.${ext}`
}

type SubmissionRow = { field?: unknown; value?: unknown }

type SanitizeSubmissionOptions = {
  /**
   * `strict` (default): validate email/phone/name formats — use on public creates.
   * `scrub`: strip markup / control chars only — use on admin edits of older rows.
   */
  mode?: 'strict' | 'scrub'
}

/** Sanitize Form Builder submissionData rows; drop empty / hostile keys. */
export function sanitizeSubmissionData(
  rows: unknown,
  { mode = 'strict' }: SanitizeSubmissionOptions = {},
): { field: string; value: string }[] {
  if (!Array.isArray(rows)) {
    throw new APIError('Invalid form submission.', 400, null, true)
  }
  if (rows.length > FIELD_LIMITS.submissionRows) {
    throw new APIError('Too many fields in submission.', 400, null, true)
  }

  const out: { field: string; value: string }[] = []
  for (const row of rows as SubmissionRow[]) {
    if (!row || typeof row !== 'object') continue
    const field = sanitizePlainText(row.field, { maxLength: FIELD_LIMITS.fieldKey })
      .replace(/[^\w.-]/g, '')
      .slice(0, FIELD_LIMITS.fieldKey)
    if (!field || field === FORM_HONEYPOT_NAME) continue

    const lower = field.toLowerCase()
    const raw = typeof row.value === 'string' || typeof row.value === 'number' ? String(row.value) : ''
    let value: string
    if (mode === 'scrub') {
      const allowNewlines = lower === 'message' || lower === 'details' || lower.includes('message')
      value = sanitizePlainText(raw, {
        maxLength: allowNewlines ? FIELD_LIMITS.message : FIELD_LIMITS.shortText,
        allowNewlines,
      })
      if (value) assertSafeText(value, field)
    } else if (lower === 'email') {
      value = sanitizeEmail(raw)
    } else if (lower === 'phone' || lower === 'mobile' || lower === 'tel') {
      value = sanitizePhone(raw)
    } else if (lower === 'name' || lower === 'fullname' || lower === 'fullname') {
      value = sanitizePersonName(raw)
    } else if (lower === 'message' || lower === 'details' || lower.includes('message')) {
      value = sanitizeMessage(raw, false)
    } else {
      value = sanitizeShortText(raw, {
        maxLength: FIELD_LIMITS.shortText,
        label: field,
      })
    }
    if (!value) continue
    out.push({ field, value })
  }
  return out
}
