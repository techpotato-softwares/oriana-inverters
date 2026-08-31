'use client'

import { EnergyMesh } from './EnergyMesh'
import { FadeIn } from './FadeIn'

type PageHeroProps = {
  eyebrow: string
  title: string
  description?: string
  children?: React.ReactNode
}

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-oriana-navy pb-16 pt-32 lg:pb-20 lg:pt-48">
      <div className="absolute inset-0 bg-gradient-to-br from-[#041018] via-oriana-navy to-[#0f2f6b]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_0%,rgba(77,163,255,0.16),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_10%_90%,rgba(245,185,66,0.1),transparent)]" />
      <EnergyMesh className="opacity-70" />

      <div className="container relative">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-oriana-sky">{eyebrow}</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/65">{description}</p>
          )}
          {children}
        </FadeIn>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
