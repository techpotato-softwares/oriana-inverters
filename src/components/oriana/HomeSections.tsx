'use client'

import Link from 'next/link'
import {
  ArrowRight,
  Award,
  Building2,
  Factory,
  Globe2,
  Headphones,
  Layers,
  Leaf,
  Microscope,
} from 'lucide-react'
import { segments } from '@/config/navigation'
import { caseStudies } from '@/data/caseStudies'
import { FadeIn } from './FadeIn'

/** Sungrow-style homepage hero — white, centred, mission-led */
export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-36 lg:pt-40">
      {/* Subtle abstract band — no stock photography */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-oriana-silver/80 to-transparent" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-48 opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, rgba(26,66,138,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(77,163,255,0.12) 0%, transparent 45%)',
        }}
      />

      <div className="container relative pb-6 pt-8 text-center lg:pb-10 lg:pt-12">
        <FadeIn>
          <p className="text-sm font-medium tracking-wide text-oriana-muted">Home Page</p>
          <h1 className="mt-4 font-display text-4xl font-light tracking-tight text-oriana-navy md:text-5xl lg:text-[3.25rem] lg:leading-tight">
            Clean Power for All
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-oriana-muted md:text-lg">
            At Oriana, we are committed to promoting the development and application of clean energy
            across solar, storage, and grid services. Our goal is to increase the adoption of clean
            power conversion technology and drive more innovative ways to deploy reliable energy
            worldwide.
          </p>
        </FadeIn>

        {/* Segment quick links — Sungrow For Business / For Utility pattern */}
        <FadeIn delay={0.08}>
          <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-3">
            {segments.map((seg) => (
              <Link
                key={seg.id}
                href={seg.href}
                className="rounded-full border border-oriana-navy/12 bg-white px-5 py-2 text-sm font-medium text-oriana-navy transition hover:border-oriana-blue hover:text-oriana-blue"
              >
                {seg.label}
              </Link>
            ))}
            <Link
              href="/products"
              className="rounded-full border border-oriana-blue bg-oriana-blue px-5 py-2 text-sm font-medium text-white transition hover:bg-oriana-navy"
            >
              All Products
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

const impactStats = [
  {
    icon: Layers,
    value: '1M+',
    label: 'Power Converters Installed',
    note: null,
  },
  {
    icon: Award,
    value: 'Tier 1',
    label: 'PV Inverter Bankability',
    note: 'Source: BloombergNEF',
  },
  {
    icon: Microscope,
    value: '3',
    label: 'R&D Centers',
    note: null,
  },
  {
    icon: Globe2,
    value: '25+',
    label: 'Countries Served',
    note: null,
  },
  {
    icon: Leaf,
    value: '99.6%',
    label: 'Peak Inverter Efficiency',
    note: null,
  },
]

/** Sungrow impact stats row — line icons, light numbers, generous spacing */
export function ImpactStats() {
  return (
    <section className="border-b border-oriana-navy/6 bg-white py-14 lg:py-20">
      <div className="container">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-4">
          {impactStats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.05}>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center text-oriana-blue">
                  <stat.icon className="h-10 w-10 stroke-[1.25]" aria-hidden />
                </div>
                <p className="mt-5 font-display text-3xl font-light text-oriana-navy md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 max-w-[11rem] text-sm leading-snug text-oriana-muted">{stat.label}</p>
                {stat.note && (
                  <p className="mt-2 text-[10px] text-oriana-muted/70">{stat.note}</p>
                )}
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-14 flex justify-center">
            <Link
              href="/about"
              className="rounded-full border-2 border-oriana-blue px-10 py-3 text-sm font-semibold text-oriana-blue transition hover:bg-oriana-blue hover:text-white"
            >
              Discover Who We Are
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

const commitments = [
  {
    icon: Microscope,
    title: 'Technological Innovation',
    href: '/about',
    image: 'from-oriana-blue/10 to-oriana-silver',
  },
  {
    icon: Factory,
    title: 'Lean Manufacturing',
    href: '/about/certifications',
    image: 'from-oriana-silver to-oriana-blue/5',
  },
  {
    icon: Building2,
    title: 'Global Presence',
    href: '/where-to-buy',
    image: 'from-oriana-blue/8 to-oriana-silver',
  },
  {
    icon: Headphones,
    title: 'Professional Services',
    href: '/support',
    image: 'from-oriana-silver to-oriana-blue/10',
  },
]

/** Sungrow "Why Oriana" + four commitment cards */
export function WhyOrianaSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container">
        <FadeIn>
          <div className="text-center">
            <h2 className="font-display text-3xl font-light text-oriana-blue md:text-4xl lg:text-[2.75rem]">
              Why Oriana
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-oriana-muted md:text-lg">
              Backed by the trust of partners worldwide, Oriana is committed to delivering unwavering
              excellence in technology, manufacturing, and service. Together, let&apos;s bridge to a
              sustainable future.
            </p>
          </div>
        </FadeIn>

        <p className="mt-14 text-center font-display text-xl font-light text-oriana-navy md:text-2xl">
          Our Commitment to Innovation and Excellence
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {commitments.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.06}>
              <Link
                href={item.href}
                className="group flex h-full flex-col overflow-hidden rounded-sm border border-oriana-navy/8 bg-white transition hover:border-oriana-blue/30 hover:shadow-md"
              >
                <div
                  className={`flex h-44 items-center justify-center bg-gradient-to-br ${item.image}`}
                >
                  <item.icon
                    className="h-16 w-16 stroke-[1] text-oriana-blue/70 transition group-hover:text-oriana-blue"
                    aria-hidden
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-medium text-oriana-navy group-hover:text-oriana-blue">
                    {item.title}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-oriana-blue">
                    Explore More
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

const newsItems = [
  {
    title: 'Oriana Launches Next-Gen Hybrid Inverter Series for US Residential Market',
    date: 'Mar 15, 2026',
    href: '/posts',
    type: 'News',
  },
  {
    title: 'ORI-GU250K Achieves Top Global Ranking in Utility-Scale Inverters',
    date: 'Feb 28, 2026',
    href: '/posts',
    type: 'News',
  },
  {
    title: 'Oriana Publishes 2025 ESG & Sustainability Report',
    date: 'Jan 10, 2026',
    href: '/resources/downloads',
    type: 'Report',
  },
]

export function NewsEventsSection() {
  return (
    <section className="border-t border-oriana-navy/6 bg-oriana-surface py-16 lg:py-20">
      <div className="container">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-oriana-blue">
              News & Media
            </p>
            <h2 className="mt-2 font-display text-2xl font-light text-oriana-navy md:text-3xl">
              Latest from Oriana
            </h2>
          </div>
          <Link
            href="/posts"
            className="hidden text-sm font-semibold text-oriana-blue hover:underline sm:inline"
          >
            Newsroom →
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {newsItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group border border-oriana-navy/8 bg-white p-7 transition hover:border-oriana-blue/25 hover:shadow-sm"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-oriana-blue">
                {item.type}
              </span>
              <h3 className="mt-3 font-medium leading-snug text-oriana-navy group-hover:text-oriana-blue">
                {item.title}
              </h3>
              <p className="mt-4 text-xs text-oriana-muted">{item.date}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CaseStudiesSection() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="container">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-oriana-blue">
              Case Studies
            </p>
            <h2 className="mt-2 font-display text-2xl font-light text-oriana-navy md:text-3xl">
              Stories Speak Louder
            </h2>
          </div>
          <Link
            href="/case-studies"
            className="hidden text-sm font-semibold text-oriana-blue hover:underline sm:inline"
          >
            All case studies →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {caseStudies.slice(0, 3).map((study) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className="group overflow-hidden border border-oriana-navy/8 bg-white transition hover:border-oriana-blue/20 hover:shadow-md"
            >
              <div className="flex h-44 items-end bg-gradient-to-br from-oriana-blue/15 via-oriana-silver to-white p-5">
                <span className="border border-oriana-blue/20 bg-white/90 px-3 py-1 text-xs font-semibold text-oriana-blue">
                  {study.capacity}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-medium text-oriana-navy group-hover:text-oriana-blue">
                  {study.title}
                </h3>
                <p className="mt-1 text-sm text-oriana-muted">{study.location}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SupportDownloadStrip() {
  return (
    <section className="border-t border-oriana-navy/8 bg-oriana-silver/50 py-14 lg:py-16">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-oriana-blue">
              Service & Support
            </p>
            <p className="mt-3 font-display text-xl font-light text-oriana-navy">
              Bankable. Reliable. Local.
            </p>
            <p className="mt-2 text-sm text-oriana-muted">Customer Hotline: +1 (800) ORIANA-1</p>
            <Link
              href="/support"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-oriana-blue hover:underline"
            >
              Online Service
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-oriana-blue">
              Download Center
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {['Datasheets', 'Installation Manuals', 'Certificates', 'Warranty Documents'].map(
                (doc) => (
                  <li key={doc}>
                    <Link href="/resources/downloads" className="text-oriana-muted hover:text-oriana-blue">
                      {doc} →
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-oriana-blue">
              Where to Buy
            </p>
            <p className="mt-3 text-sm text-oriana-muted">
              Find authorized distributors and installers in your region.
            </p>
            <Link
              href="/where-to-buy"
              className="mt-5 inline-block rounded-full border-2 border-oriana-blue px-6 py-2.5 text-sm font-semibold text-oriana-blue transition hover:bg-oriana-blue hover:text-white"
            >
              Find a Distributor
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
