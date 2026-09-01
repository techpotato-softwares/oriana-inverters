import Link from 'next/link'
import {
  Award,
  Building2,
  Globe2,
  Headphones,
  Leaf,
  MapPin,
  Microscope,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import { AnimatedCounter } from './AnimatedCounter'
import { FadeIn, Stagger, StaggerItem } from './FadeIn'

const impactStats = [
  {
    icon: Award,
    value: '10+',
    label: 'Solar industry project experience',
  },
  {
    icon: MapPin,
    value: 'PAN India',
    label: 'Market presence',
  },
  {
    icon: Zap,
    value: 'GW+',
    label: 'Inverter distribution & experience',
  },
  {
    icon: Building2,
    value: '500+',
    label: 'Channel & service partners',
  },
  {
    icon: Leaf,
    value: '99.6%',
    label: 'Peak conversion efficiency',
  },
]

const impactIconByKey = {
  globe: Globe2,
  award: Award,
  leaf: Leaf,
  microscope: Microscope,
  building: Building2,
  map: MapPin,
  zap: Zap,
  shield: ShieldCheck,
  headphones: Headphones,
} as const

type ImpactStatItem = {
  iconKey: string
  value: string
  label: string
}

function resolveImpactIcon(iconKey: string) {
  return impactIconByKey[iconKey as keyof typeof impactIconByKey] ?? Globe2
}

export function ImpactStats({
  eyebrow,
  title,
  body,
  link,
  stats,
}: {
  eyebrow?: string
  title?: string
  body?: string
  link?: { label: string; href: string }
  stats?: ImpactStatItem[]
} = {}) {
  const resolved =
    stats && stats.length > 0
      ? stats.map((stat) => ({
          icon: resolveImpactIcon(stat.iconKey),
          value: stat.value,
          label: stat.label,
        }))
      : impactStats

  const resolvedLink = link || { label: 'Discover who we are', href: '/about' }

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container">
        <FadeIn>
          <div className="mx-auto max-w-4xl text-center">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-oriana-blue">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="mt-3 font-display text-3xl font-semibold text-oriana-navy md:text-4xl lg:text-5xl">
              {title || 'Our Impact'}
            </h2>
            {body ? (
              <p className="mt-6 text-base leading-relaxed text-oriana-muted md:text-lg">{body}</p>
            ) : null}
          </div>
        </FadeIn>

        <Stagger className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:mt-16 lg:grid-cols-5 lg:gap-8">
          {resolved.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="flex flex-col items-center text-center">
                <stat.icon className="h-10 w-10 stroke-[1.3] text-oriana-sky" aria-hidden />
                <AnimatedCounter
                  value={stat.value}
                  className="mt-5 block font-display text-3xl font-semibold tracking-tight text-oriana-navy md:text-4xl"
                />
                <p className="mt-3 max-w-[12rem] text-sm leading-snug text-oriana-muted">
                  {stat.label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn delay={0.15}>
          <div className="mt-14 flex justify-center lg:mt-16">
            <Link
              href={resolvedLink.href}
              className="inline-flex min-w-[14rem] items-center justify-center rounded-full border-2 border-oriana-blue px-8 py-3.5 text-sm font-semibold text-oriana-blue transition hover:bg-oriana-blue hover:text-white md:text-base"
            >
              {resolvedLink.label}
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

const newsItems = [
  {
    title: 'Oriana expands hybrid inverter lineup for residential partners',
    date: 'Mar 15, 2026',
    href: '/posts',
    type: 'News',
  },
  {
    title: 'Utility grid-tied platform achieves strong global project uptake',
    date: 'Feb 28, 2026',
    href: '/posts',
    type: 'News',
  },
  {
    title: '2025 ESG & Sustainability Report now available',
    date: 'Jan 10, 2026',
    href: '/resources/downloads',
    type: 'Report',
  },
]

type NewsItem = {
  title: string
  date: string
  href: string
  type: string
}

export function NewsEventsSection({
  eyebrow,
  title,
  link,
  items,
}: {
  eyebrow?: string
  title?: string
  link?: { label: string; href: string }
  items?: NewsItem[]
} = {}) {
  const resolved = items && items.length > 0 ? items : newsItems
  const resolvedLink = link || { label: 'Newsroom →', href: '/posts' }

  return (
    <section className="bg-oriana-surface py-20 lg:py-24">
      <div className="container">
        <div className="flex items-end justify-between gap-6">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-oriana-blue">
              {eyebrow || 'News & media'}
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-oriana-navy md:text-4xl">
              {title || 'Latest from Oriana'}
            </h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <Link
              href={resolvedLink.href}
              className="hidden text-sm font-semibold text-oriana-blue transition hover:underline sm:inline"
            >
              {resolvedLink.label}
            </Link>
          </FadeIn>
        </div>

        <Stagger className="mt-10 grid gap-6 md:grid-cols-3" delay={0.05}>
          {resolved.map((item) => (
            <StaggerItem key={item.title}>
              <Link
                href={item.href}
                className="group block border-t-2 border-oriana-navy/10 bg-white p-7 transition hover:border-oriana-blue hover:shadow-[0_12px_40px_-20px_rgba(7,21,37,0.25)]"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-oriana-blue">
                  {item.type}
                </span>
                <h3 className="mt-3 font-medium leading-snug text-oriana-navy transition group-hover:text-oriana-blue">
                  {item.title}
                </h3>
                <p className="mt-5 text-xs text-oriana-muted">{item.date}</p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
