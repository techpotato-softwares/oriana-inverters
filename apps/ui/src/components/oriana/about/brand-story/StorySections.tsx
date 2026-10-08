import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BatteryCharging,
  BrainCircuit,
  Cpu,
  Gauge,
  type LucideIcon,
  MapPin,
  Sun,
} from 'lucide-react'

import { FadeIn } from '@/components/oriana/FadeIn'
import type { BrandStoryContent } from '@/components/oriana/about/brand-story/brandStoryData'
import { SectionHeading } from '@/components/oriana/sustainability/SectionHeading'

const eyebrowClass =
  'flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.3em]'

export function OriginSection({ content }: { content: BrandStoryContent['origin'] }) {
  return (
    <section id="origin" aria-labelledby="origin-title" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <div className="container grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <FadeIn>
            <SectionHeading id="origin-title" eyebrow={content.eyebrow} title={content.title} />
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="mt-8 max-w-2xl space-y-5 text-base leading-8 text-oriana-muted">
              {content.paragraphs.slice(0, 1).map((p) => (
                <p key={p}>{p}</p>
              ))}
              <div className="rounded-2xl border border-oriana-navy/8 bg-oriana-surface p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-oriana-blue">
                  Founded by
                </p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                  {content.founders.map((name) => (
                    <li key={name} className="font-display text-base font-semibold text-oriana-deep">
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
              {content.paragraphs.slice(1).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.12} direction="left" className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-oriana-silver">
            <Image
              src={content.image.src}
              alt={content.image.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </FadeIn>
      </div>

      <div className="container mt-20 lg:mt-28">
        <FadeIn>
          <figure className="mx-auto max-w-4xl border-l-2 border-oriana-sky pl-6 lg:pl-10">
            <p className="text-sm font-medium text-oriana-muted">{content.insightLead}</p>
            <blockquote
              className="mt-4 font-display font-medium tracking-[-0.02em] text-balance text-oriana-deep"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)', lineHeight: 1.15 }}
            >
              {content.insight}
            </blockquote>
            <p className="mt-6 max-w-3xl text-base leading-8 text-oriana-muted">{content.understanding}</p>
            <p className="mt-6 font-display text-lg font-semibold text-oriana-blue">{content.closing}</p>
          </figure>
        </FadeIn>
      </div>
    </section>
  )
}

export function VisionSection({ content }: { content: BrandStoryContent['vision'] }) {
  return (
    <section aria-labelledby="vision-title" className="relative isolate overflow-hidden bg-oriana-deep">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[22rem] lg:order-2 lg:min-h-full">
          <Image
            src={content.image.src}
            alt={content.image.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-oriana-deep via-oriana-deep/20 to-transparent lg:bg-gradient-to-r lg:from-oriana-deep lg:via-oriana-deep/10"
          />
        </div>
        <div className="px-6 py-20 sm:px-10 lg:flex lg:justify-end lg:px-16 lg:py-32">
          <div className="max-w-xl">
          <FadeIn>
            <SectionHeading id="vision-title" tone="dark" eyebrow={content.eyebrow} title={content.title} />
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="mt-8 max-w-xl space-y-5 text-base leading-8 text-white/75">
              {content.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-10 max-w-xl border-t border-white/15 pt-8">
              <p className="font-display text-2xl font-semibold text-white">{content.closing}</p>
              <p className="mt-2 text-base leading-7 text-oriana-sky">{content.closingSupport}</p>
            </div>
          </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}

export function JourneySection({ content }: { content: BrandStoryContent['journey'] }) {
  return (
    <section aria-labelledby="journey-title" className="bg-oriana-surface py-20 lg:py-28">
      <div className="container">
        <FadeIn>
          <SectionHeading
            id="journey-title"
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
          />
        </FadeIn>

        <ol className="mt-14 grid gap-5 md:grid-cols-3 lg:mt-16">
          {content.segments.map((segment, index) => (
            <li key={segment.label}>
              <FadeIn delay={index * 0.1}>
                <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-oriana-deep">
                  <Image
                    src={segment.image.src}
                    alt={segment.image.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-oriana-deep/90 via-oriana-deep/20 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.2em] text-oriana-sky">
                        {`0${index + 1}`}
                      </p>
                      <p className="mt-1 font-display text-xl font-semibold text-white">{segment.label}</p>
                    </div>
                    {index < content.segments.length - 1 ? (
                      <ArrowRight className="mb-1 hidden h-5 w-5 text-white/60 md:block" aria-hidden />
                    ) : null}
                  </div>
                </div>
              </FadeIn>
            </li>
          ))}
        </ol>

        <FadeIn className="mt-16 lg:mt-20">
          <p className="text-center text-sm font-medium text-oriana-muted">{content.balanceLead}</p>
          <p className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 font-display font-semibold text-oriana-deep">
            {content.balance.map((word, index) => (
              <span key={word} className="flex items-center gap-4">
                {index > 0 ? (
                  <span aria-hidden className="text-2xl font-light text-oriana-sky">
                    +
                  </span>
                ) : null}
                <span
                  className="rounded-full border border-oriana-blue/20 bg-white px-5 py-2.5 text-base lg:text-lg"
                >
                  {word}
                </span>
              </span>
            ))}
          </p>
          <div className="mx-auto mt-10 max-w-2xl text-center">
            <p className="font-display text-xl font-semibold text-oriana-blue lg:text-2xl">{content.closing}</p>
            <p className="mt-3 text-base leading-7 text-oriana-muted">{content.closingSupport}</p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

export function UnitsSection({ content }: { content: BrandStoryContent['units'] }) {
  return (
    <section
      aria-labelledby="units-title"
      className="relative isolate overflow-hidden bg-oriana-deep py-20 text-white lg:py-32"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 70% at 85% 10%, rgba(77,163,255,0.22) 0%, rgba(7,21,37,0) 70%), radial-gradient(50% 60% at 0% 100%, rgba(26,66,138,0.45) 0%, rgba(7,21,37,0) 70%)',
        }}
      />
      <div className="container">
        <FadeIn>
          <p className={`${eyebrowClass} text-oriana-sky`}>
            <span className="h-px w-10 bg-oriana-sky/60" aria-hidden />
            {content.eyebrow}
          </p>
          <h2
            id="units-title"
            className="mt-5 max-w-2xl font-display font-medium tracking-[-0.02em] text-balance"
            style={{ fontSize: 'clamp(1.9rem, 3.4vw, 3.1rem)', lineHeight: 1.1 }}
          >
            {content.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">{content.intro}</p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-14 lg:mt-20">
          <p
            className="font-display font-semibold tracking-[-0.04em] text-white"
            style={{ fontSize: 'clamp(4rem, 14vw, 11rem)', lineHeight: 0.95 }}
          >
            {content.figure}
            <span className="text-oriana-sun">+</span>
          </p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.3em] text-oriana-sky">
            {content.figureLabel}
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-12 border-t border-white/15 pt-12 lg:grid-cols-2 lg:gap-20">
          <FadeIn>
            <p className="text-base font-medium text-white">{content.lead}</p>
            <ul className="mt-6 space-y-5">
              {content.represents.map((item, index) => (
                <li key={item} className="flex gap-4">
                  <span className="mt-0.5 font-display text-sm font-semibold text-oriana-sky">
                    {`0${index + 1}`}
                  </span>
                  <span className="text-base leading-7 text-white/75">{item}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="space-y-5 text-base leading-8 text-white/70">
              {content.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="mt-10 font-display text-2xl font-semibold text-white lg:text-3xl">
              {content.statement}
              <span className="mt-1 block text-oriana-sky">{content.statementSupport}</span>
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

export function IndiaSection({ content }: { content: BrandStoryContent['india'] }) {
  return (
    <section aria-labelledby="india-title" className="bg-white py-20 lg:py-28">
      <div className="container grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        <FadeIn direction="right">
          <figure>
            <div className="relative aspect-[5/4] overflow-hidden rounded-3xl bg-oriana-silver">
              <Image
                src={content.image.src}
                alt={content.image.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 flex items-center gap-2 text-sm font-medium text-oriana-muted">
              <MapPin className="h-4 w-4 text-oriana-blue" aria-hidden />
              {content.location}
            </figcaption>
          </figure>
        </FadeIn>

        <div>
          <FadeIn>
            <SectionHeading
              id="india-title"
              eyebrow={content.eyebrow}
              title={content.title}
              description={content.description}
            />
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="mt-8 text-sm font-medium text-oriana-muted">{content.focusLead}</p>
            <ol className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-oriana-navy/8 bg-oriana-navy/8 sm:grid-cols-2">
              {content.focus.map((item, index) => (
                <li key={item} className="flex items-baseline gap-3 bg-white p-5">
                  <span className="font-display text-sm font-semibold text-oriana-sky">{`0${index + 1}`}</span>
                  <span className="font-display text-base font-semibold text-oriana-deep">{item}</span>
                </li>
              ))}
            </ol>
            <div className="mt-10 space-y-3">
              <p className="text-base leading-7 text-oriana-muted">{content.belief}</p>
              <p className="font-display text-xl font-semibold text-oriana-blue">{content.beliefEmphasis}</p>
              <p className="text-base leading-7 text-oriana-muted">{content.closing}</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

const ecosystemIcons: Record<string, LucideIcon> = {
  solar: Sun,
  storage: BatteryCharging,
  power: Cpu,
  digital: BrainCircuit,
  management: Gauge,
}

export function EcosystemSection({ content }: { content: BrandStoryContent['ecosystem'] }) {
  return (
    <section
      aria-labelledby="ecosystem-title"
      className="relative isolate overflow-hidden bg-oriana-deep py-20 lg:py-28"
    >
      <Image
        src={content.image.src}
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover opacity-25"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-oriana-deep/80 via-oriana-deep/90 to-oriana-deep" />
      <div className="container">
        <FadeIn>
          <SectionHeading
            id="ecosystem-title"
            tone="dark"
            align="center"
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
          />
        </FadeIn>

        <ul className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:mt-16 lg:grid-cols-5">
          {content.pillars.map((pillar, index) => {
            const Icon = ecosystemIcons[pillar.key] ?? Sun
            return (
              <li key={pillar.key} className={index === content.pillars.length - 1 ? 'col-span-2 sm:col-span-1' : undefined}>
                <FadeIn delay={index * 0.08} className="h-full">
                  <div className="flex h-full flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-8 text-center backdrop-blur-sm">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-oriana-sky/15 text-oriana-sky">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <span className="font-display text-base font-semibold text-white">{pillar.label}</span>
                  </div>
                </FadeIn>
              </li>
            )
          })}
        </ul>

        <FadeIn>
          <p className="mx-auto mt-12 max-w-3xl text-center text-base leading-8 text-white/70">
            {content.closing}
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

export function PurposeSection({ content }: { content: BrandStoryContent['purpose'] }) {
  return (
    <section aria-labelledby="purpose-title" className="bg-white py-20 lg:py-28">
      <div className="container grid gap-12 lg:grid-cols-12 lg:gap-16">
        <FadeIn className="lg:col-span-5">
          <SectionHeading
            id="purpose-title"
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.intro}
          />
        </FadeIn>
        <div className="lg:col-span-7">
          <ul className="divide-y divide-oriana-navy/10 border-y border-oriana-navy/10">
            {content.musts.map((item, index) => (
              <li key={item}>
                <FadeIn delay={index * 0.06}>
                  <p className="flex items-baseline gap-5 py-6">
                    <span className="font-display text-sm font-semibold text-oriana-sky">{`0${index + 1}`}</span>
                    <span className="font-display text-xl font-medium text-oriana-deep lg:text-2xl">{item}</span>
                  </p>
                </FadeIn>
              </li>
            ))}
          </ul>
          <FadeIn>
            <p className="mt-8 font-display text-xl font-semibold text-balance text-oriana-blue lg:text-2xl">
              {content.closing}
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

export function GlobalVisionSection({ content }: { content: BrandStoryContent['globalVision'] }) {
  return (
    <section
      aria-labelledby="global-title"
      className="relative isolate overflow-hidden bg-oriana-deep py-24 lg:py-36"
    >
      <Image src={content.image.src} alt={content.image.alt} fill sizes="100vw" className="-z-20 object-cover" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(100deg, rgba(7,21,37,0.95) 0%, rgba(7,21,37,0.82) 50%, rgba(7,21,37,0.45) 100%)',
        }}
      />
      <div className="container">
        <FadeIn>
          <SectionHeading id="global-title" tone="dark" eyebrow={content.eyebrow} title={content.title} />
        </FadeIn>
        <FadeIn delay={0.08}>
          <div className="mt-8 max-w-2xl space-y-5 text-base leading-8 text-white/75">
            {content.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </FadeIn>
        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
          {content.commitments.map((item, index) => (
            <li key={item} className="bg-oriana-deep/70 p-6 backdrop-blur-sm">
              <FadeIn delay={index * 0.06}>
                <p className="font-display text-base font-semibold leading-6 text-white">{item}</p>
              </FadeIn>
            </li>
          ))}
        </ul>
        <FadeIn>
          <p className="mt-10 font-display text-xl font-semibold text-oriana-sky lg:text-2xl">{content.closing}</p>
        </FadeIn>
      </div>
    </section>
  )
}

export function StoryRecapSection({ content }: { content: BrandStoryContent['recap'] }) {
  return (
    <section aria-labelledby="recap-title" className="bg-oriana-surface py-20 lg:py-28">
      <div className="container grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <FadeIn>
            <h2 id="recap-title" className={`${eyebrowClass} text-oriana-blue`}>
              <span className="h-px w-10 bg-oriana-blue/50" aria-hidden />
              {content.eyebrow}
            </h2>
          </FadeIn>
          <ol className="relative mt-10 space-y-8 pl-10">
            <span aria-hidden className="absolute bottom-2 left-[0.6875rem] top-2 w-px bg-gradient-to-b from-oriana-sky to-oriana-blue" />
            {content.timeline.map((item, index) => (
              <li key={item.marker} className="relative">
                <FadeIn delay={index * 0.06}>
                  <span
                    aria-hidden
                    className="absolute -left-10 top-1 flex h-[1.375rem] w-[1.375rem] items-center justify-center rounded-full border-2 border-oriana-blue bg-oriana-surface"
                  >
                    <span className="h-2 w-2 rounded-full bg-oriana-blue" />
                  </span>
                  <p className="font-display text-lg font-semibold text-oriana-deep">{item.marker}</p>
                  <p className="mt-1 text-base leading-7 text-oriana-muted">{item.text}</p>
                </FadeIn>
              </li>
            ))}
          </ol>
        </div>

        <FadeIn delay={0.1} className="lg:self-center">
          <p
            className="font-display font-medium tracking-[-0.02em] text-balance text-oriana-deep"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.08 }}
          >
            {content.statement}
            <span className="block text-oriana-blue">{content.statementEmphasis}</span>
          </p>
          <div className="mt-10 border-t border-oriana-navy/10 pt-8">
            <p className="font-display text-2xl font-bold tracking-[0.2em] text-oriana-deep">{content.brand}</p>
            <p className="mt-2 text-base text-oriana-muted">{content.tagline}</p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={content.primary.href}
              className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-oriana-blue px-7 text-sm font-semibold text-white transition-colors duration-300 hover:bg-oriana-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oriana-blue"
            >
              {content.primary.label}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
            <Link
              href={content.secondary.href}
              className="inline-flex min-h-12 items-center rounded-full border border-oriana-blue/30 px-7 text-sm font-semibold text-oriana-blue transition-colors duration-300 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oriana-blue"
            >
              {content.secondary.label}
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
