'use client'

import { cn } from '@/utilities/ui'
import { EnergyMesh } from './EnergyMesh'
import { FadeIn } from './FadeIn'

type PageHeroProps = {
  eyebrow?: string
  title: string
  description?: string
  children?: React.ReactNode
  /** Dark navy (default) or a light airy hero for catalogue-style pages. */
  variant?: 'dark' | 'light'
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  variant = 'dark',
}: PageHeroProps) {
  const light = variant === 'light'

  return (
    <section
      className={cn(
        'relative overflow-hidden',
        light
          ? 'bg-oriana-surface pb-12 pt-32 lg:pb-16 lg:pt-44'
          : 'bg-oriana-navy pb-16 pt-32 lg:pb-20 lg:pt-48',
      )}
    >
      {light ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-white via-oriana-surface to-oriana-silver/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_90%_0%,rgba(26,66,138,0.08),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_8%_85%,rgba(245,185,66,0.08),transparent)]" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-[#041018] via-oriana-navy to-[#0f2f6b]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_0%,rgba(77,163,255,0.16),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_10%_90%,rgba(245,185,66,0.1),transparent)]" />
          <EnergyMesh className="opacity-70" />
        </>
      )}

      <div className="container relative">
        <FadeIn>
          {eyebrow ? (
            <p
              className={cn(
                'text-xs font-semibold uppercase tracking-[0.22em]',
                light ? 'text-oriana-blue' : 'text-oriana-sky',
              )}
            >
              {eyebrow}
            </p>
          ) : null}
          <h1
            className={cn(
              'font-display font-semibold tracking-tight',
              eyebrow ? 'mt-4' : '',
              light
                ? 'text-4xl text-oriana-navy md:text-5xl lg:text-6xl xl:text-7xl'
                : 'text-4xl text-white md:text-5xl lg:text-6xl',
            )}
          >
            {title}
          </h1>
          {description && (
            <p
              className={cn(
                'mt-5 max-w-3xl leading-relaxed',
                light ? 'text-lg text-oriana-muted md:text-xl' : 'text-lg text-white/65',
              )}
            >
              {description}
            </p>
          )}
          {children}
        </FadeIn>
      </div>

      {light ? null : (
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      )}
    </section>
  )
}
