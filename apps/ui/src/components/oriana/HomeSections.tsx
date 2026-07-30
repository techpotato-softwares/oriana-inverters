'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Award,
  Globe2,
  Headphones,
  Leaf,
  Microscope,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import type { CaseStudy } from '@/data/caseStudies'
import { staticHome } from '@/data/siteContent'
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

type HomeContent = typeof staticHome

const strategyMascots: Record<string, typeof OriHome> = {
  home: OriHome,
  business: OriBusiness,
  utility: OriUtility,
  storage: OriStorage,
}

const impactIcons: Record<string, LucideIcon> = {
  globe: Globe2,
  award: Award,
  leaf: Leaf,
  microscope: Microscope,
}

const whyOrianaIcons: Record<string, LucideIcon> = {
  microscope: Microscope,
  shield: ShieldCheck,
  globe: Globe2,
  headphones: Headphones,
}

/** Full-bleed atmospheric hero — brand first, international energy brand */
export function HomeHero({ hero }: { hero?: HomeContent['hero'] | null }) {
  const content = hero ?? staticHome.hero
  const reduce = useReducedMotion()

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
              {content.eyebrow}
            </p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1 className="mt-5 max-w-xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]">
              {content.title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70 md:text-lg">
              {content.description}
            </p>
          </FadeIn>

          <FadeIn delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href={content.primaryCta.href}
                className="group inline-flex items-center gap-2 rounded-md bg-oriana-sky px-7 py-3.5 text-sm font-semibold text-oriana-navy transition hover:bg-white"
              >
                {content.primaryCta.label}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={content.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-md border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-oriana-sky hover:text-oriana-sky"
              >
                {content.secondaryCta.label}
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

/** Strategy section — mascots for each go-to-market path */
export function StrategiesSection({
  strategies,
}: {
  strategies?: HomeContent['strategies'] | null
}) {
  const content = strategies ?? staticHome.strategies
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
              {content.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-oriana-navy md:text-4xl lg:text-[2.75rem]">
              {content.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-oriana-muted md:text-lg">
              {content.description}
            </p>
          </div>
        </FadeIn>

        <Stagger className="mt-14 grid gap-8 sm:grid-cols-2 xl:grid-cols-4" delay={0.1}>
          {content.items.map((item) => {
            const Mascot = strategyMascots[item.id] ?? OriHome
            return (
              <StaggerItem key={item.id}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col text-left transition"
                >
                  <div className="relative mb-6 aspect-square overflow-hidden rounded-2xl bg-oriana-surface">
                    <Mascot className="p-6 transition duration-500 group-hover:scale-105" />
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
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}

export function ImpactStats({ impact }: { impact?: HomeContent['impact'] | null }) {
  const content = impact ?? staticHome.impact
  return (
    <section className="relative overflow-hidden border-y border-oriana-navy/6 bg-oriana-surface py-16 lg:py-20">
      <div className="container">
        <FadeIn>
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-oriana-blue">
                {content.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-oriana-navy md:text-4xl">
                {content.title}
              </h2>
            </div>
            <Link
              href={content.ctaHref}
              className="inline-flex items-center gap-2 text-sm font-semibold text-oriana-blue transition hover:gap-3"
            >
              {content.ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>

        <Stagger className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-6">
          {content.stats.map((stat) => {
            const Icon = impactIcons[stat.icon] ?? Globe2
            return (
              <StaggerItem key={stat.label}>
                <div className="relative">
                  <Icon className="h-7 w-7 stroke-[1.4] text-oriana-blue" aria-hidden />
                  <AnimatedCounter
                    value={stat.value}
                    className="mt-5 block font-display text-4xl font-semibold tracking-tight text-oriana-navy md:text-5xl"
                  />
                  <p className="mt-2 text-sm text-oriana-muted">{stat.label}</p>
                </div>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}

export function WhyOrianaSection({
  whyOriana,
}: {
  whyOriana?: HomeContent['whyOriana'] | null
}) {
  const content = whyOriana ?? staticHome.whyOriana
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container">
        <div className="grid items-end gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-oriana-blue">
              {content.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-oriana-navy md:text-4xl lg:text-[2.75rem]">
              {content.title}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-oriana-muted">
              {content.description}
            </p>
          </FadeIn>

          <Stagger className="grid gap-6 sm:grid-cols-2" delay={0.08}>
            {content.items.map((item) => {
              const Icon = whyOrianaIcons[item.icon] ?? Microscope
              return (
                <StaggerItem key={item.title}>
                  <Link
                    href={item.href}
                    className="group block border-t border-oriana-navy/10 pt-6 transition hover:border-oriana-blue"
                  >
                    <Icon
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
              )
            })}
          </Stagger>
        </div>
      </div>
    </section>
  )
}

export function GlobalReachSection({
  globalReach,
}: {
  globalReach?: HomeContent['globalReach'] | null
}) {
  const content = globalReach ?? staticHome.globalReach
  return (
    <section className="relative overflow-hidden bg-oriana-navy py-20 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(77,163,255,0.18),transparent)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />

      <div className="container relative">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-oriana-sky">
              {content.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-white md:text-4xl">
              {content.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/65">
              {content.description}
            </p>
          </div>
        </FadeIn>

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" delay={0.1}>
          {content.regions.map((region) => (
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
              href={content.ctaHref}
              className="inline-flex items-center gap-2 rounded-md bg-oriana-sky px-7 py-3.5 text-sm font-semibold text-oriana-navy transition hover:bg-white"
            >
              {content.ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

export function NewsEventsSection({ news }: { news?: HomeContent['news'] | null }) {
  const content = news ?? staticHome.news
  return (
    <section className="bg-oriana-surface py-20 lg:py-24">
      <div className="container">
        <div className="flex items-end justify-between gap-6">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-oriana-blue">
              {content.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-oriana-navy md:text-4xl">
              {content.title}
            </h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <Link
              href={content.viewAllHref}
              className="hidden text-sm font-semibold text-oriana-blue transition hover:underline sm:inline"
            >
              {content.viewAllLabel}
            </Link>
          </FadeIn>
        </div>

        <Stagger className="mt-10 grid gap-6 md:grid-cols-3" delay={0.05}>
          {content.items.map((item) => (
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
  caseStudiesIntro,
  caseStudies,
}: {
  caseStudiesIntro?: HomeContent['caseStudiesIntro'] | null
  caseStudies: CaseStudy[]
}) {
  const intro = caseStudiesIntro ?? staticHome.caseStudiesIntro
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="container">
        <div className="flex items-end justify-between gap-6">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-oriana-blue">
              {intro.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-oriana-navy md:text-4xl">
              {intro.title}
            </h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <Link
              href={intro.viewAllHref}
              className="hidden text-sm font-semibold text-oriana-blue transition hover:underline sm:inline"
            >
              {intro.viewAllLabel}
            </Link>
          </FadeIn>
        </div>

        <Stagger className="mt-10 grid gap-8 md:grid-cols-3" delay={0.05}>
          {(caseStudies ?? []).slice(0, 3).map((study) => (
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

export function SupportDownloadStrip({
  supportStrip,
}: {
  supportStrip?: HomeContent['supportStrip'] | null
}) {
  const content = supportStrip ?? staticHome.supportStrip
  return (
    <section className="relative overflow-hidden border-t border-oriana-navy/8 bg-gradient-to-br from-oriana-silver via-white to-oriana-sky/10 py-16 lg:py-20">
      <div className="container">
        <Stagger className="grid gap-12 md:grid-cols-3" delay={0.05}>
          <StaggerItem>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-oriana-blue">
              {content.service.eyebrow}
            </p>
            <p className="mt-4 font-display text-2xl font-semibold text-oriana-navy">
              {content.service.title}
            </p>
            <p className="mt-3 text-sm text-oriana-muted">{content.service.hotline}</p>
            <Link
              href={content.service.linkHref}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-oriana-blue hover:underline"
            >
              {content.service.linkLabel}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </StaggerItem>

          <StaggerItem>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-oriana-blue">
              {content.downloads.eyebrow}
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {content.downloads.links.map((doc) => (
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
              {content.partner.eyebrow}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-oriana-muted">
              {content.partner.description}
            </p>
            <Link
              href={content.partner.ctaHref}
              className="mt-6 inline-flex rounded-md bg-oriana-blue px-6 py-3 text-sm font-semibold text-white transition hover:bg-oriana-navy"
            >
              {content.partner.ctaLabel}
            </Link>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  )
}
