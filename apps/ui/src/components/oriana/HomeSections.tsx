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
    value: '10+ Years',
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
    <section className="relative z-[1] bg-white pb-14 pt-4 lg:pb-20 lg:pt-6">
      <div className="container">
        <FadeIn>
          <div className="mx-auto max-w-4xl text-center">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-oriana-blue">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="mt-3 font-display text-3xl font-semibold text-[#606060] md:text-4xl lg:text-5xl">
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
                  className="mt-5 block font-display text-3xl font-semibold tracking-tight text-[#606060] md:text-4xl"
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

const newsFallbackImages = [
  'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=800&q=80',
]

const newsItems = [
  {
    title: 'Oriana expands hybrid inverter lineup for residential partners',
    date: 'Mar. 15, 2026',
    href: '/posts',
    type: 'News',
    image: newsFallbackImages[0],
  },
  {
    title: '2026 Oriana Partner Summit — Powering Growth Together',
    date: 'Jan. 27, 2026',
    href: '/posts',
    type: 'Events',
    image: newsFallbackImages[1],
  },
  {
    title: 'Utility grid-tied platform achieves strong global project uptake',
    date: 'Feb. 28, 2026',
    href: '/posts',
    type: 'News',
    image: newsFallbackImages[2],
  },
  {
    title: '1,000 Reasons to Choose Oriana',
    date: 'Jan. 26, 2026',
    href: '/posts',
    type: 'Campaign',
    image: newsFallbackImages[3],
  },
  {
    title: '2025 ESG & Sustainability Report now available',
    date: 'Jan. 10, 2026',
    href: '/resources/downloads',
    type: 'Report',
    image: newsFallbackImages[4],
  },
]

type NewsItem = {
  title: string
  date: string
  href: string
  type: string
  image?: string
}

function NewsCard({
  item,
  featured = false,
  image,
}: {
  item: NewsItem
  featured?: boolean
  image: string
}) {
  return (
    <Link
      href={item.href}
      className="group flex h-full flex-col overflow-hidden bg-white transition-shadow duration-300 hover:shadow-[0_16px_48px_-24px_rgba(7,21,37,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oriana-blue/40"
      style={{ borderRadius: 24 }}
    >
      <div
        className={`relative overflow-hidden bg-oriana-silver ${featured ? 'aspect-[16/10]' : 'aspect-[16/9]'}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
      <div className={`flex flex-1 flex-col ${featured ? 'p-5 sm:p-6' : 'p-4 sm:p-5'}`}>
        <span className="text-xs font-medium text-oriana-sun sm:text-[0.8125rem]">{item.type}</span>
        <h3
          className={`mt-2 font-display leading-snug text-oriana-navy transition group-hover:text-oriana-blue ${
            featured ? 'text-base sm:text-lg' : 'text-sm sm:text-[0.9375rem]'
          }`}
        >
          {item.title}
        </h3>
        <p className="mt-auto pt-4 text-xs text-oriana-navy/80 sm:text-sm">{item.date}</p>
      </div>
    </Link>
  )
}

export function NewsEventsSection({
  title,
  link,
  items,
}: {
  eyebrow?: string
  title?: string
  link?: { label: string; href: string }
  items?: NewsItem[]
} = {}) {
  const resolved = (items && items.length > 0 ? items : newsItems).map((item, i) => ({
    ...item,
    image: item.image || newsFallbackImages[i % newsFallbackImages.length],
  }))
  const resolvedLink = link || { label: 'Explore more', href: '/posts' }
  const [featured, ...rest] = resolved
  const sideItems = rest.slice(0, 4)

  return (
    <section className="bg-oriana-surface py-16 lg:py-24" aria-label="News and events">
      <div className="container">
        <FadeIn>
          <h2
            className="text-center font-display font-medium tracking-tight text-[#606060]"
            style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)' }}
          >
            {title || 'Trending News & Events'}
          </h2>
        </FadeIn>

        {featured ? (
          <div className="mt-10 grid gap-4 lg:mt-14 lg:grid-cols-2 lg:gap-5">
            <FadeIn>
              <NewsCard item={featured} image={featured.image!} featured />
            </FadeIn>

            {sideItems.length > 0 ? (
              <Stagger
                className={`grid gap-4 sm:grid-cols-2 lg:gap-5 ${sideItems.length === 1 ? 'sm:grid-cols-1' : ''} [&>*]:h-full`}
                delay={0.06}
              >
                {sideItems.map((item) => (
                  <StaggerItem key={`${item.href}-${item.title}`} className="h-full">
                    <NewsCard item={item} image={item.image!} />
                  </StaggerItem>
                ))}
              </Stagger>
            ) : null}
          </div>
        ) : null}

        <FadeIn delay={0.1}>
          <div className="mt-10 flex justify-center lg:mt-12">
            <Link
              href={resolvedLink.href}
              className="inline-flex min-w-[11rem] items-center justify-center border border-oriana-blue px-8 py-3.5 text-sm font-medium text-oriana-blue transition hover:bg-oriana-blue hover:text-white"
              style={{ borderRadius: 12 }}
            >
              {resolvedLink.label.replace(/\s*→\s*$/, '') || 'Explore more'}
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

