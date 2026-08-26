'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Award,
  Globe2,
  Headphones,
  Leaf,
  Microscope,
  ShieldCheck,
} from 'lucide-react'
import { caseStudies, type CaseStudy } from '@/data/caseStudies'
import type { HomeHeroSlide } from '@/types/homeHero'
import { AnimatedCounter } from './AnimatedCounter'
import { EnergyMesh } from './EnergyMesh'
import { FadeIn, Stagger, StaggerItem } from './FadeIn'
import {
  OriBusiness,
  OriHero,
  OriHome,
  OriStorage,
  OriUtility,
} from './Mascots'

type HomeHeroFallback = {
  eyebrow?: string
  headline?: string
  subheadline?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

/** Full-bleed atmospheric hero — brand first, international energy brand */
export function HomeHero({
  slides = [],
  fallback,
}: {
  slides?: HomeHeroSlide[]
  fallback?: HomeHeroFallback
}) {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const slide = slides[active]

  useEffect(() => {
    if (slides.length < 2 || reduce) return
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length)
    }, 7000)
    return () => window.clearInterval(timer)
  }, [slides.length, reduce])

  if (slide) {
    return (
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-oriana-navy">
        <Image
          src={slide.imageUrl}
          alt={slide.imageAlt}
          fill
          priority
          unoptimized
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-oriana-navy/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-oriana-navy/80 via-oriana-navy/45 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent" />

        <div className="container relative z-10 pb-28 pt-32 lg:pb-36 lg:pt-36">
          <FadeIn>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.28em] text-oriana-sky">
              {slide.linkType === 'post' ? 'From the blog' : 'Featured product'}
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
              {slide.headline}
            </h1>
          </FadeIn>
          <FadeIn delay={0.18}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href={slide.href}
                className="group inline-flex items-center gap-2 rounded-md bg-oriana-sky px-7 py-3.5 text-sm font-semibold text-oriana-navy transition hover:bg-white"
              >
                {slide.ctaLabel}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
            </div>
          </FadeIn>

          {slides.length > 1 ? (
            <div className="mt-10 flex gap-2">
              {slides.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Show hero ${index + 1}`}
                  aria-current={index === active}
                  onClick={() => setActive(index)}
                  className={`h-2.5 rounded-full transition ${
                    index === active ? 'w-8 bg-oriana-sky' : 'w-2.5 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          ) : null}
        </div>
      </section>
    )
  }

  const eyebrow = fallback?.eyebrow || 'Oriana'
  const headline = fallback?.headline || 'Clean power that crosses borders'
  const subheadline =
    fallback?.subheadline ||
    'High-efficiency inverters and storage platforms for homes, industry, and utility grids — engineered for partners who ship projects worldwide.'
  const primaryCta = fallback?.primaryCta || {
    label: 'Explore solutions',
    href: '/solutions/residential',
  }
  const secondaryCta = fallback?.secondaryCta || {
    label: 'Become a partner',
    href: '/contact',
  }

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-oriana-navy">
      <div className="absolute inset-0 bg-gradient-to-br from-[#041018] via-oriana-navy to-[#0f2f6b]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_75%_20%,rgba(77,163,255,0.22),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_15%_85%,rgba(245,185,66,0.12),transparent)]" />
      <EnergyMesh />

      {/* Atmospheric horizon band */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent" />

      <div className="container relative z-10 grid items-center gap-10 pb-28 pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:pb-36 lg:pt-36">
        <div>
          <FadeIn>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.28em] text-oriana-sky">
              {eyebrow}
            </p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1 className="mt-5 max-w-xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]">
              {headline}
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70 md:text-lg">
              {subheadline}
            </p>
          </FadeIn>

          <FadeIn delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href={primaryCta.href}
                className="group inline-flex items-center gap-2 rounded-md bg-oriana-sky px-7 py-3.5 text-sm font-semibold text-oriana-navy transition hover:bg-white"
              >
                {primaryCta.label}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-md border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-oriana-sky hover:text-oriana-sky"
              >
                {secondaryCta.label}
              </Link>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.15} direction="none" className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative mx-auto aspect-square max-w-[420px]">
            {!reduce && (
              <motion.div
                className="absolute inset-8 rounded-full border border-oriana-sky/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              />
            )}
            {!reduce && (
              <motion.div
                className="absolute inset-16 rounded-full border border-oriana-sun/25"
                animate={{ rotate: -360 }}
                transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
              />
            )}
            <OriHero className="relative z-10 drop-shadow-[0_20px_60px_rgba(77,163,255,0.25)]" />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

const strategies = [
  {
    id: 'home',
    label: 'For Home',
    title: 'Residential energy independence',
    description:
      'Hybrid inverters and storage that keep households powered — quietly, efficiently, every day.',
    href: '/solutions/residential',
    Mascot: OriHome,
  },
  {
    id: 'business',
    label: 'For Business',
    title: 'Commercial & industrial scale',
    description:
      'Rooftop and carport platforms built for uptime, bankability, and fast commissioning.',
    href: '/solutions/commercial',
    Mascot: OriBusiness,
  },
  {
    id: 'utility',
    label: 'For Utility',
    title: 'Utility-scale grid strength',
    description:
      'Central and string architectures for multi-megawatt farms and IPP portfolios.',
    href: '/solutions/utility',
    Mascot: OriUtility,
  },
  {
    id: 'storage',
    label: 'For Storage',
    title: 'Flexible energy services',
    description:
      'Hybrid conversion for peak shaving, backup, and emerging grid-service markets.',
    href: '/solutions/storage',
    Mascot: OriStorage,
  },
]

const strategyMascotById = {
  home: OriHome,
  business: OriBusiness,
  utility: OriUtility,
  storage: OriStorage,
} as const

type StrategyItem = {
  id: string
  label: string
  title: string
  description: string
  href: string
}

function resolveStrategyMascot(id: string) {
  return strategyMascotById[id as keyof typeof strategyMascotById] ?? OriHome
}

/** Strategy section — mascots for each go-to-market path */
export function StrategiesSection({
  eyebrow,
  title,
  intro,
  items,
}: {
  eyebrow?: string
  title?: string
  intro?: string
  items?: StrategyItem[]
} = {}) {
  const resolved =
    items && items.length > 0
      ? items.map((item) => ({
          ...item,
          Mascot: resolveStrategyMascot(item.id),
        }))
      : strategies

  return (
    <section className="relative bg-white py-20 lg:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(circle at 10% 20%, rgba(77,163,255,0.08), transparent 40%), radial-gradient(circle at 90% 80%, rgba(245,185,66,0.07), transparent 35%)',
        }}
      />

      <div className="container relative">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-oriana-blue">
              {eyebrow || 'Go-to-market strategies'}
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-oriana-navy md:text-4xl lg:text-[2.75rem]">
              {title || 'One platform. Four ways to win.'}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-oriana-muted md:text-lg">
              {intro || (
                <>
                  Meet Ori&apos;s crew — each strategy tailored for the partners and projects shaping
                  the global energy transition.
                </>
              )}
            </p>
          </div>
        </FadeIn>

        <Stagger className="mt-14 grid gap-8 sm:grid-cols-2 xl:grid-cols-4" delay={0.1}>
          {resolved.map((item) => (
            <StaggerItem key={item.id}>
              <Link
                href={item.href}
                className="group flex h-full flex-col text-left transition"
              >
                <div className="relative mb-6 aspect-square overflow-hidden rounded-2xl bg-oriana-surface">
                  <item.Mascot className="p-6 transition duration-500 group-hover:scale-105" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-oriana-navy/5 to-transparent opacity-0 transition group-hover:opacity-100" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-oriana-blue">
                  {item.label}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-oriana-navy transition group-hover:text-oriana-blue">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-oriana-muted">
                  {item.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-oriana-blue">
                  View solution
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

const impactStats = [
  {
    icon: Globe2,
    value: '25+',
    label: 'Countries served',
  },
  {
    icon: Award,
    value: '1M+',
    label: 'Converters installed',
  },
  {
    icon: Leaf,
    value: '99.6%',
    label: 'Peak efficiency',
  },
  {
    icon: Microscope,
    value: '3',
    label: 'Global R&D centers',
  },
]

const impactIconByKey = {
  globe: Globe2,
  award: Award,
  leaf: Leaf,
  microscope: Microscope,
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
  link,
  stats,
}: {
  eyebrow?: string
  title?: string
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
    <section className="relative overflow-hidden border-y border-oriana-navy/6 bg-oriana-surface py-16 lg:py-20">
      <div className="container">
        <FadeIn>
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-oriana-blue">
                {eyebrow || 'Global footprint'}
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-oriana-navy md:text-4xl">
                {title || 'Built for international partners'}
              </h2>
            </div>
            <Link
              href={resolvedLink.href}
              className="inline-flex items-center gap-2 text-sm font-semibold text-oriana-blue transition hover:gap-3"
            >
              {resolvedLink.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>

        <Stagger className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-6">
          {resolved.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="relative">
                <stat.icon className="h-7 w-7 stroke-[1.4] text-oriana-blue" aria-hidden />
                <AnimatedCounter
                  value={stat.value}
                  className="mt-5 block font-display text-4xl font-semibold tracking-tight text-oriana-navy md:text-5xl"
                />
                <p className="mt-2 text-sm text-oriana-muted">{stat.label}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

const commitments = [
  {
    icon: Microscope,
    title: 'Technological innovation',
    copy: 'Continuous R&D across conversion efficiency, grid codes, and intelligent monitoring.',
    href: '/about',
  },
  {
    icon: ShieldCheck,
    title: 'Bankable manufacturing',
    copy: 'Certified production, rigorous QA, and supply chains ready for multi-region delivery.',
    href: '/about/certifications',
  },
  {
    icon: Globe2,
    title: 'Local presence, global reach',
    copy: 'Distributor networks and support coverage that follow your projects across borders.',
    href: '/where-to-buy',
  },
  {
    icon: Headphones,
    title: 'Partner-grade service',
    copy: 'Training, documentation, and responsive after-sales for installers and EPCs.',
    href: '/support',
  },
]

const commitmentIconByKey = {
  microscope: Microscope,
  shield: ShieldCheck,
  globe: Globe2,
  headphones: Headphones,
} as const

type WhyOrianaItem = {
  iconKey: string
  title: string
  copy: string
  href: string
}

function resolveCommitmentIcon(iconKey: string) {
  return commitmentIconByKey[iconKey as keyof typeof commitmentIconByKey] ?? Microscope
}

export function WhyOrianaSection({
  eyebrow,
  title,
  body,
  items,
}: {
  eyebrow?: string
  title?: string
  body?: string
  items?: WhyOrianaItem[]
} = {}) {
  const resolved =
    items && items.length > 0
      ? items.map((item) => ({
          icon: resolveCommitmentIcon(item.iconKey),
          title: item.title,
          copy: item.copy,
          href: item.href,
        }))
      : commitments

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container">
        <div className="grid items-end gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-oriana-blue">
              {eyebrow || 'Why Oriana'}
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-oriana-navy md:text-4xl lg:text-[2.75rem]">
              {title || 'Excellence that travels with every shipment'}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-oriana-muted">
              {body ||
                'From first sample to fleet deployment, we help international clients specify, certify, and scale clean power conversion with confidence.'}
            </p>
          </FadeIn>

          <Stagger className="grid gap-6 sm:grid-cols-2" delay={0.08}>
            {resolved.map((item) => (
              <StaggerItem key={item.title}>
                <Link
                  href={item.href}
                  className="group block border-t border-oriana-navy/10 pt-6 transition hover:border-oriana-blue"
                >
                  <item.icon
                    className="h-8 w-8 stroke-[1.25] text-oriana-blue transition group-hover:text-oriana-sky"
                    aria-hidden
                  />
                  <h3 className="mt-4 font-display text-lg font-semibold text-oriana-navy group-hover:text-oriana-blue">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-oriana-muted">{item.copy}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-oriana-blue">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}

const regions = [
  { name: 'North America', focus: 'UL / NEC ready platforms' },
  { name: 'Europe & UK', focus: 'Grid-code compliant portfolios' },
  { name: 'Middle East', focus: 'High-irradiance utility lines' },
  { name: 'Asia Pacific', focus: 'C&I + storage growth markets' },
  { name: 'Latin America', focus: 'Distributed generation & EPCs' },
  { name: 'Africa', focus: 'Resilient off-grid & hybrid' },
]

export function GlobalReachSection({
  eyebrow,
  title,
  body,
  regions: regionsProp,
  cta,
}: {
  eyebrow?: string
  title?: string
  body?: string
  regions?: { name: string; focus: string }[]
  cta?: { label: string; href: string }
} = {}) {
  const resolvedRegions = regionsProp && regionsProp.length > 0 ? regionsProp : regions
  const resolvedCta = cta || { label: 'Find a distributor', href: '/where-to-buy' }

  return (
    <section className="relative overflow-hidden bg-oriana-navy py-20 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(77,163,255,0.18),transparent)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />

      <div className="container relative">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-oriana-sky">
              {eyebrow || 'International clients'}
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-white md:text-4xl">
              {title || 'Ready wherever your next project lands'}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/65">
              {body ||
                'Regional documentation, certification pathways, and partner enablement — so cross-border deals move from RFQ to commissioning without friction.'}
            </p>
          </div>
        </FadeIn>

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" delay={0.1}>
          {resolvedRegions.map((region) => (
            <StaggerItem key={region.name}>
              <div className="border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-sm transition hover:border-oriana-sky/40 hover:bg-white/8">
                <p className="font-display text-lg font-semibold text-white">{region.name}</p>
                <p className="mt-1.5 text-sm text-white/55">{region.focus}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn delay={0.2}>
          <div className="mt-12 flex justify-center">
            <Link
              href={resolvedCta.href}
              className="inline-flex items-center gap-2 rounded-md bg-oriana-sky px-7 py-3.5 text-sm font-semibold text-oriana-navy transition hover:bg-white"
            >
              {resolvedCta.label}
              <ArrowRight className="h-4 w-4" />
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

export function CaseStudiesSection({
  eyebrow,
  title,
  link,
  studies,
}: {
  eyebrow?: string
  title?: string
  link?: { label: string; href: string }
  studies?: CaseStudy[]
} = {}) {
  const resolved = studies && studies.length > 0 ? studies : caseStudies.slice(0, 3)
  const resolvedLink = link || { label: 'All case studies →', href: '/case-studies' }

  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="container">
        <div className="flex items-end justify-between gap-6">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-oriana-blue">
              {eyebrow || 'Case studies'}
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-oriana-navy md:text-4xl">
              {title || 'Projects that prove the promise'}
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

        <Stagger className="mt-10 grid gap-8 md:grid-cols-3" delay={0.05}>
          {resolved.map((study) => (
            <StaggerItem key={study.slug}>
              <Link
                href={`/case-studies/${study.slug}`}
                className="group block"
              >
                <div className="relative flex h-52 items-end overflow-hidden bg-gradient-to-br from-[#0d2248] via-oriana-blue to-oriana-sky/60 p-6">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(245,185,66,0.25),transparent_50%)]" />
                  <span className="relative border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    {study.capacity}
                  </span>
                </div>
                <div className="pt-5">
                  <h3 className="font-display text-lg font-semibold text-oriana-navy transition group-hover:text-oriana-blue">
                    {study.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-oriana-muted">{study.location}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

const defaultDownloads = [
  { label: 'Datasheets', href: '/resources/downloads' },
  { label: 'Installation manuals', href: '/resources/downloads' },
  { label: 'Certificates', href: '/resources/downloads' },
  { label: 'Warranty documents', href: '/resources/downloads' },
]

export function SupportDownloadStrip({
  hotlineNote,
  downloads,
  partner,
}: {
  hotlineNote?: string
  downloads?: { label: string; href: string }[]
  partner?: { title?: string; body?: string; label: string; href: string }
} = {}) {
  const resolvedDownloads = downloads && downloads.length > 0 ? downloads : defaultDownloads
  const resolvedPartner = partner || {
    title: 'Partner with us',
    body: "Looking to distribute Oriana across a new market? Let's talk territory, training, and co-marketing.",
    label: 'Request partnership',
    href: '/contact',
  }

  return (
    <section className="relative overflow-hidden border-t border-oriana-navy/8 bg-gradient-to-br from-oriana-silver via-white to-oriana-sky/10 py-16 lg:py-20">
      <div className="container">
        <Stagger className="grid gap-12 md:grid-cols-3" delay={0.05}>
          <StaggerItem>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-oriana-blue">
              Service & support
            </p>
            <p className="mt-4 font-display text-2xl font-semibold text-oriana-navy">
              Bankable. Reliable. Local.
            </p>
            <p className="mt-3 text-sm text-oriana-muted">
              {hotlineNote || 'Customer hotline: +1 (800) ORIANA-1'}
            </p>
            <Link
              href="/support"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-oriana-blue hover:underline"
            >
              Online service
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </StaggerItem>

          <StaggerItem>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-oriana-blue">
              Download center
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {resolvedDownloads.map((doc) => (
                <li key={doc.label}>
                  <Link
                    href={doc.href}
                    className="text-oriana-muted transition hover:text-oriana-blue"
                  >
                    {doc.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-oriana-blue">
              {resolvedPartner.title || 'Partner with us'}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-oriana-muted">
              {resolvedPartner.body || (
                <>
                  Looking to distribute Oriana across a new market? Let&apos;s talk territory,
                  training, and co-marketing.
                </>
              )}
            </p>
            <Link
              href={resolvedPartner.href}
              className="mt-6 inline-flex rounded-md bg-oriana-blue px-6 py-3 text-sm font-semibold text-white transition hover:bg-oriana-navy"
            >
              {resolvedPartner.label}
            </Link>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  )
}
