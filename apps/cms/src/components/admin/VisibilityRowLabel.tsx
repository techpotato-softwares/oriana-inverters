'use client'
import { type RowLabelProps, useRowLabel } from '@payloadcms/ui'

const LABEL_KEYS = ['label', 'title', 'name', 'text', 'value', 'question', 'platform', 'idKey'] as const

function rowTitle(data: Record<string, unknown> | undefined): string | null {
  if (!data) return null
  for (const key of LABEL_KEYS) {
    const value = data[key]
    if (typeof value === 'string' && value.trim()) return value.trim().slice(0, 60)
  }
  const link = data.link
  if (link && typeof link === 'object' && 'label' in link && typeof link.label === 'string') {
    return link.label
  }
  return null
}

export const VisibilityRowLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<Record<string, unknown>>()
  const title = rowTitle(data) ?? `Item ${rowNumber !== undefined ? rowNumber + 1 : ''}`.trim()
  const hidden = data?.hidden === true

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <span style={hidden ? { opacity: 0.55 } : undefined}>{title}</span>
      {hidden ? (
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            padding: '1px 6px',
            borderRadius: 4,
            background: 'var(--theme-warning-100, #fff4d6)',
            color: 'var(--theme-warning-800, #7a5300)',
          }}
        >
          Hidden
        </span>
      ) : null}
    </span>
  )
}
