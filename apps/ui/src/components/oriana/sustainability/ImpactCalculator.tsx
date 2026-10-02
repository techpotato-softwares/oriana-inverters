'use client'

import { Leaf, type LucideIcon, TreePine, Zap } from 'lucide-react'
import { type CSSProperties, useId, useState } from 'react'

import { FadeIn } from '@/components/oriana/FadeIn'
import { SectionHeading } from '@/components/oriana/sustainability/SectionHeading'
import type { CalculatorConfig } from '@/components/oriana/sustainability/sustainabilityData'

const MIN_KW = 1
const MAX_KW = 100
const DEFAULT_KW = 5

const integer = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 })
const oneDecimal = new Intl.NumberFormat('en-IN', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

type Output = {
  icon: LucideIcon
  label: string
  value: string
  unit: string
}

export function ImpactCalculator({ config }: { config: CalculatorConfig }) {
  const [kw, setKw] = useState(DEFAULT_KW)
  const inputId = useId()
  const headingId = useId()

  const outputs: Output[] = [
    {
      icon: Zap,
      label: 'Clean units generated',
      value: integer.format(kw * config.kwhPerKw),
      unit: 'kWh / year',
    },
    {
      icon: Leaf,
      label: 'Carbon offset',
      value: oneDecimal.format(kw * config.co2TonnesPerKw),
      unit: 'tonnes CO₂ / year',
    },
    {
      icon: TreePine,
      label: 'Equivalent trees planted',
      value: integer.format(kw * config.treesPerKw),
      unit: 'trees',
    },
  ]

  const fill = ((kw - MIN_KW) / (MAX_KW - MIN_KW)) * 100

  return (
    <section
      id="estimator"
      aria-labelledby={headingId}
      className="relative scroll-mt-24 overflow-hidden bg-oriana-deep py-20 text-white lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-32 h-[36rem] w-[36rem] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(77,163,255,0.22) 0%, rgba(7,21,37,0) 70%)',
        }}
      />
      <div className="container relative grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:items-center lg:gap-20">
        <FadeIn>
          <SectionHeading
            id={headingId}
            tone="dark"
            eyebrow="Impact estimator"
            title={config.title}
            description={config.description}
          />
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-10">
            <div className="flex items-end justify-between gap-4">
              <label htmlFor={inputId} className="text-sm font-medium text-white/70">
                Solar capacity installed
              </label>
              <p className="font-display text-3xl font-medium tabular-nums text-white sm:text-4xl">
                {kw}
                <span className="ml-1 text-base font-semibold text-oriana-sky">kW</span>
              </p>
            </div>

            <input
              id={inputId}
              type="range"
              min={MIN_KW}
              max={MAX_KW}
              step={1}
              value={kw}
              onChange={(event) => setKw(Number(event.target.value))}
              aria-valuetext={`${kw} kilowatts`}
              className="oriana-range mt-6 w-full"
              style={{ '--range-fill': `${fill}%` } as CSSProperties}
            />
            <div className="mt-2 flex justify-between text-xs text-white/50 tabular-nums">
              <span>{MIN_KW} kW</span>
              <span>{MAX_KW} kW</span>
            </div>

            <dl className="mt-10 grid gap-4 sm:grid-cols-3" aria-live="polite">
              {outputs.map(({ icon: Icon, label, value, unit }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-oriana-deep/60 p-5"
                >
                  <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
                    <Icon className="h-4 w-4 text-oriana-sky" aria-hidden />
                    {label}
                  </dt>
                  <dd className="mt-4">
                    <span className="block font-display text-2xl font-medium tabular-nums text-white lg:text-[1.75rem]">
                      {value}
                    </span>
                    <span className="mt-1 block text-xs text-white/55">{unit}</span>
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 text-xs leading-6 text-white/50">{config.disclaimer}</p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
