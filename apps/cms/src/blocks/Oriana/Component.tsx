import React from 'react'
import Link from 'next/link'

import type {
  CardGridBlock as CardGridBlockProps,
  ContentPageBlock as ContentPageBlockProps,
  CtaBandBlock as CtaBandBlockProps,
  IconFeatureBlock as IconFeatureBlockProps,
  StatsGridBlock as StatsGridBlockProps,
} from '@/payload-types'

type MediaLike = { url?: string | null; alt?: string | null } | number | null | undefined

function mediaUrl(media: MediaLike): string | null {
  if (media && typeof media === 'object' && 'url' in media && media.url) return media.url
  return null
}

export const StatsGridBlock: React.FC<StatsGridBlockProps & { disableInnerContainer?: boolean }> = ({
  eyebrow,
  title,
  stats,
}) => (
  <section className="container py-12">
    {eyebrow ? (
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-oriana-blue">{eyebrow}</p>
    ) : null}
    {title ? (
      <h2 className="mt-3 font-display text-3xl font-semibold text-oriana-navy">{title}</h2>
    ) : null}
    <div className="mt-10 grid grid-cols-2 gap-8 lg:grid-cols-4">
      {(stats || []).map((stat, i) => {
        const iconSrc = mediaUrl(stat.icon)
        return (
          <div key={`${stat.label}-${i}`}>
            {iconSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={iconSrc} alt="" className="h-7 w-7 object-contain" />
            ) : null}
            <p className="mt-4 font-display text-4xl font-semibold text-oriana-navy">{stat.value}</p>
            <p className="mt-2 text-sm text-oriana-muted">{stat.label}</p>
          </div>
        )
      })}
    </div>
  </section>
)

export const CardGridBlock: React.FC<CardGridBlockProps & { disableInnerContainer?: boolean }> = ({
  eyebrow,
  title,
  cards,
}) => (
  <section className="container py-12">
    {eyebrow ? (
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-oriana-blue">{eyebrow}</p>
    ) : null}
    {title ? (
      <h2 className="mt-3 font-display text-3xl font-semibold text-oriana-navy">{title}</h2>
    ) : null}
    <div className="mt-10 grid gap-8 md:grid-cols-3">
      {(cards || []).map((card, i) => {
        const body = (
          <>
            <h3 className="font-display text-xl font-semibold text-oriana-navy">{card.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-oriana-muted">{card.body}</p>
          </>
        )
        return card.href ? (
          <Link key={`${card.title}-${i}`} href={card.href} className="block border-t border-oriana-navy/10 pt-6">
            {body}
          </Link>
        ) : (
          <div key={`${card.title}-${i}`} className="border-t border-oriana-navy/10 pt-6">
            {body}
          </div>
        )
      })}
    </div>
  </section>
)

export const CtaBandBlock: React.FC<CtaBandBlockProps & { disableInnerContainer?: boolean }> = ({
  title,
  body,
  primaryCta,
  secondaryCta,
}) => (
  <section className="container py-12">
    <div className="rounded-2xl bg-oriana-navy px-8 py-12 text-center text-white">
      <h2 className="font-display text-3xl font-semibold">{title}</h2>
      {body ? <p className="mx-auto mt-4 max-w-2xl text-white/70">{body}</p> : null}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {primaryCta?.href && primaryCta.label ? (
          <Link
            href={primaryCta.href}
            className="rounded-md bg-oriana-sky px-6 py-3 text-sm font-semibold text-oriana-navy"
          >
            {primaryCta.label}
          </Link>
        ) : null}
        {secondaryCta?.href && secondaryCta.label ? (
          <Link
            href={secondaryCta.href}
            className="rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white"
          >
            {secondaryCta.label}
          </Link>
        ) : null}
      </div>
    </div>
  </section>
)

export const ContentPageBlock: React.FC<
  ContentPageBlockProps & { disableInnerContainer?: boolean }
> = ({ sections }) => (
  <section className="container max-w-3xl space-y-10 py-12">
    {(sections || []).map((section, i) => (
      <div key={`${section.heading}-${i}`}>
        <h2 className="font-display text-2xl font-semibold text-oriana-navy">{section.heading}</h2>
        <p className="mt-4 whitespace-pre-line leading-relaxed text-oriana-muted">{section.body}</p>
      </div>
    ))}
  </section>
)

export const IconFeatureBlock: React.FC<
  IconFeatureBlockProps & { disableInnerContainer?: boolean }
> = ({ title, body, href, icon }) => {
  const iconSrc = mediaUrl(icon)
  const content = (
    <>
      {iconSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={iconSrc} alt="" className="h-8 w-8 object-contain" />
      ) : null}
      <h3 className="mt-4 font-display text-lg font-semibold text-oriana-navy">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-oriana-muted">{body}</p>
    </>
  )
  return (
    <div className="container py-6">
      {href ? <Link href={href}>{content}</Link> : content}
    </div>
  )
}
