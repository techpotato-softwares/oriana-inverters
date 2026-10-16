import { AnimatedCounter } from '@/components/oriana/AnimatedCounter'
import { Stagger, StaggerItem } from '@/components/oriana/FadeIn'
import type { SustainabilityHighlight } from '@/components/oriana/sustainability/sustainabilityData'

export function ImpactBand({ items }: { items: SustainabilityHighlight[] }) {
  if (items.length === 0) return null

  return (
    <section aria-label="Sustainability at a glance" className="bg-white section-safe-y-tight">
      <Stagger className="container grid divide-y divide-oriana-deep/10 md:grid-cols-3 md:divide-x md:divide-y-0">
        {items.map((item) => (
          <StaggerItem
            key={item.label}
            className="py-8 first:pt-0 last:pb-0 md:px-10 md:py-2 md:first:pl-0 md:last:pr-0"
          >
            <p
              className="font-display font-medium tracking-[-0.03em] text-oriana-blue tabular-nums"
              style={{
                fontSize: /\d/.test(item.value)
                  ? 'clamp(1.85rem, 3.2vw, 2.75rem)'
                  : 'clamp(1.5rem, 2.6vw, 2.15rem)',
                lineHeight: 1.08,
                minHeight: 'clamp(1.85rem, 3.2vw, 2.75rem)',
              }}
            >
              <AnimatedCounter value={item.value} />
            </p>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-oriana-navy">
              {item.label}
            </p>
            {item.description ? (
              <p className="mt-2 max-w-xs text-sm leading-7 text-oriana-muted">
                {item.description}
              </p>
            ) : null}
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
