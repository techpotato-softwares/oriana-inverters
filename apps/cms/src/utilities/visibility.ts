/**
 * Public-site visibility helpers for the admin "Hide on website" checkbox.
 *
 * Fallback rule: mappers use built-in default content only when the CMS list
 * is empty. When the CMS has rows and every row is hidden, render nothing —
 * otherwise defaults would reappear the moment an editor hides the last item.
 */

export function isHidden(item: unknown): boolean {
  return Boolean(item && typeof item === 'object' && (item as { hidden?: unknown }).hidden === true)
}

export function isVisible(item: unknown): boolean {
  return !isHidden(item)
}

export function visibleItems<T>(rows: readonly T[] | null | undefined): T[] {
  return (rows ?? []).filter(isVisible)
}

/**
 * Resolve a CMS list against its fallback.
 * - CMS has no rows → fallback
 * - CMS has rows → mapped visible rows (possibly empty when all are hidden)
 */
export function cmsListOrFallback<Row, Out>(
  rows: unknown,
  map: (rows: Row[]) => Out[],
  fallback: Out[],
): Out[] {
  if (!Array.isArray(rows) || rows.length === 0) return fallback
  const visible = visibleItems(rows as Row[])
  if (visible.length === 0) return []
  const mapped = map(visible)
  return mapped.length ? mapped : fallback
}

/** True when a section group (or tab group) is toggled off in the CMS. */
export function isSectionHidden(section: unknown): boolean {
  return isHidden(section)
}
