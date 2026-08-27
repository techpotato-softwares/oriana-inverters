'use client'

import Link from 'next/link'

export type GreenMissionSectionProps = {
  title?: string
  image: string
  alt?: string
  href?: string
  ctaLabel?: string
  ariaLabel?: string
  className?: string
}

export function GreenMissionSection({
  title = 'Green Mission. Greener World',
  image,
  alt = 'Green mission',
  href,
  ctaLabel = 'Explore more',
  ariaLabel = 'Green mission',
  className = '',
}: GreenMissionSectionProps) {
  const content = (
    <div
      className="border border-white/30 bg-white/15 px-8 py-8 text-center shadow-[0_8px_32px_rgba(7,21,37,0.18)] backdrop-blur-md sm:px-12 sm:py-10 lg:px-16 lg:py-12"
      style={{ borderRadius: 24, maxWidth: 'min(920px, 92vw)' }}
    >
      <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {href ? (
        <span className="mt-8 inline-flex items-center justify-center rounded-full border-2 border-white/70 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-white hover:text-oriana-navy sm:text-base">
          {ctaLabel}
        </span>
      ) : null}
    </div>
  )

  return (
    <section className={`bg-white py-16 lg:py-24 ${className}`.trim()} aria-label={ariaLabel}>
      <div className="container">
        <article
          className="relative overflow-hidden"
          style={{ minHeight: 'min(75svh, 720px)', borderRadius: 40 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-oriana-navy/35" aria-hidden />
          <div
            className="absolute inset-0 bg-gradient-to-t from-oriana-navy/55 via-oriana-navy/20 to-oriana-navy/10"
            aria-hidden
          />

          <div
            className="relative flex items-center justify-center p-6 sm:p-10 lg:p-14"
            style={{ minHeight: 'min(75svh, 720px)' }}
          >
            {href ? (
              <Link href={href} className="group transition hover:scale-[1.01]">
                {content}
              </Link>
            ) : (
              content
            )}
          </div>
        </article>
      </div>
    </section>
  )
}
