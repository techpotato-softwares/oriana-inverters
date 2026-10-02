import { AnimatedCounter } from '@/components/oriana/AnimatedCounter'
import { Stagger, StaggerItem } from '@/components/oriana/FadeIn'
import type { SustainabilityHighlight } from '@/components/oriana/sustainability/sustainabilityData'

export function ImpactBand({ items }: { items: SustainabilityHighlight[] }) {
  if (items.length === 0) return null

  return (
    <section aria-label="Sustainability at a glance" className="bg-white py-16 lg:py-24">
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
                  ? 'clamp(2.5rem, 4.6vw, 4.25rem)'
                  : 'clamp(2rem, 3.2vw, 3rem)',
                lineHeight: 1.05,
                minHeight: 'clamp(2.5rem, 4.6vw, 4.25rem)',
              }}
            >
              <AnimatedCounter value={item.value} />
            </p>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-oriana-navy">
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
