'use client'

import { FadeIn } from './FadeIn'

type PageHeroProps = {
  eyebrow: string
  title: string
  description?: string
  children?: React.ReactNode
}

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-oriana-navy pb-16 pt-32 lg:pb-20 lg:pt-40">
      <div className="absolute inset-0 bg-gradient-to-br from-oriana-navy via-[#0d2248] to-oriana-blue" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_0%,rgba(77,163,255,0.12),transparent)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="container relative">
        <FadeIn>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-oriana-sky">{eyebrow}</p>
          <h1 className="mt-4 font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/60">{description}</p>
          )}
          {children}
        </FadeIn>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
