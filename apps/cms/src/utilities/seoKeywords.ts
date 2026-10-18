/** Default site-wide SEO keywords (meta + JSON-LD). Prefer natural phrases. */
export const DEFAULT_KEYWORDS = [
  'Oriana Inverters',
  'solar inverter',
  'solar inverters India',
  'string inverter',
  'hybrid inverter',
  'utility scale inverter',
  'Make in India solar',
  'on-grid inverter',
  'energy storage inverter',
  'TechPotato Software LLP',
]

export function parseKeywords(
  value: unknown,
  fallback: string[] = DEFAULT_KEYWORDS,
): string[] {
  if (typeof value !== 'string' || !value.trim()) return fallback
  const parts = value
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
  return parts.length ? parts : fallback
}
