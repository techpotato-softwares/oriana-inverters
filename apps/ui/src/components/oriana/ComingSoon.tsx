import Link from 'next/link'

import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { FadeIn } from '@/components/oriana/FadeIn'
import { MediaHero } from '@/components/oriana/MediaHero'

type Crumb = { label: string; href?: string }

type ComingSoonProps = {
  eyebrow?: string
  title: string
  description?: string
  breadcrumbs?: Crumb[]
  /** When true, skip the full-bleed hero and render a compact panel only. */
  compact?: boolean
  primaryHref?: string
  primaryLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
}

/**
 * Placeholder for routes that should not show seeded/dummy marketing content
 * until real CMS entries exist.
 */
export function ComingSoon({
  eyebrow = 'Oriana',
  title,
  description = 'This section is being prepared. Check back soon, or reach out if you need details now.',
  breadcrumbs,
  compact = false,
  primaryHref = '/contact#contact-form',
  primaryLabel = 'Contact us',
  secondaryHref = '/',
  secondaryLabel = 'Back to home',
}: ComingSoonProps) {
  if (compact) {
    return (
      <FadeIn>
        <div className="rounded-2xl border border-oriana-navy/10 bg-oriana-surface px-8 py-12 text-center lg:px-12 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-oriana-blue">Coming soon</p>
          <h2 className="mt-4 font-display text-2xl font-semibold text-oriana-navy md:text-3xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-oriana-muted">{description}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={primaryHref}
              className="rounded-full bg-oriana-blue px-6 py-3 text-sm font-bold text-white transition hover:bg-oriana-deep"
            >
              {primaryLabel}
            </Link>
            <Link
              href={secondaryHref}
              className="rounded-full border border-oriana-navy/15 px-6 py-3 text-sm font-semibold text-oriana-navy transition hover:border-oriana-blue hover:text-oriana-blue"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </FadeIn>
    )
  }

  return (
    <>
      <MediaHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        imageSrc="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2400&q=80"
        imageAlt="Solar installation under open sky"
        primary={{ href: primaryHref, label: primaryLabel }}
        secondary={{ href: secondaryHref, label: secondaryLabel }}
      />
      {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
      <section className="py-16 lg:py-24">
        <div className="container">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-oriana-blue">Coming soon</p>
              <p className="mt-4 text-base leading-relaxed text-oriana-muted">
                We are publishing verified Oriana content here. In the meantime, explore products or contact the team for
                the latest information.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/products"
                  className="rounded-full bg-oriana-blue px-6 py-3 text-sm font-bold text-white transition hover:bg-oriana-deep"
                >
                  View products
                </Link>
                <Link
                  href={primaryHref}
                  className="rounded-full border border-oriana-navy/15 px-6 py-3 text-sm font-semibold text-oriana-navy transition hover:border-oriana-blue hover:text-oriana-blue"
                >
                  {primaryLabel}
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
