import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { FadeIn } from '@/components/oriana/FadeIn'
import { VideoHero } from '@/components/oriana/VideoHero'
import { SustainabilitySubNav } from '@/components/oriana/sustainability/SustainabilitySubNav'

type SustainabilityHeroProps = {
  eyebrow?: string
  title: string
  description?: string
  videoSrc: string
  posterSrc: string
  cta?: { label: string; href: string }
}

export function SustainabilityHero({
  eyebrow,
  title,
  description,
  videoSrc,
  posterSrc,
  cta = { label: 'Explore our pillars', href: '#pillars' },
}: SustainabilityHeroProps) {
  return (
    <VideoHero videoSrc={videoSrc} posterSrc={posterSrc} ariaLabel="Sustainability">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(7,21,37,0.72) 0%, rgba(7,21,37,0.35) 55%, rgba(7,21,37,0) 100%)',
        }}
        aria-hidden
      />
      <div className="container relative flex h-full flex-col justify-end pb-8 lg:pb-10">
        <FadeIn>
          {eyebrow ? (
            <p className="flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-oriana-sky">
              <span className="h-px w-10 bg-oriana-sky/60" aria-hidden />
              {eyebrow}
            </p>
          ) : null}
          <h1
            className="mt-5 max-w-4xl font-display font-medium tracking-[-0.02em] text-balance text-white"
            style={{ fontSize: 'clamp(2.25rem, 5.2vw, 4.75rem)', lineHeight: 1.04 }}
          >
            {title}
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          {description ? (
            <p className="mt-6 max-w-xl text-base leading-8 text-pretty text-white/80 md:text-lg">
              {description}
            </p>
          ) : null}
          <Link
            href={cta.href}
            className="group mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-oriana-deep transition-colors duration-300 hover:bg-oriana-sky focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {cta.label}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </FadeIn>
        <FadeIn delay={0.18} direction="none">
          <SustainabilitySubNav className="mt-12 lg:mt-16" variant="dark" />
        </FadeIn>
      </div>
    </VideoHero>
  )
}
