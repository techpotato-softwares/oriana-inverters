import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Check,
  DraftingCompass,
  Factory,
  Headset,
  Layers,
  Lightbulb,
  type LucideIcon,
  Rocket,
  ShieldCheck,
  SlidersHorizontal,
  Telescope,
  Wifi,
  Zap,
} from 'lucide-react'

import { FadeIn } from '@/components/oriana/FadeIn'
import type { AboutOverviewContent } from '@/components/oriana/about/overview/aboutOverviewData'
import { RevealStatement } from '@/components/oriana/about/shared/RevealStatement'
import { SectionHeading } from '@/components/oriana/sustainability/SectionHeading'
import { cn } from '@/utilities/ui'

const chapterEyebrow = (number: string, eyebrow: string) => `${number} — ${eyebrow}`

export function AboutIntroSection({ content }: { content: AboutOverviewContent['intro'] }) {
  return (
    <section aria-label="Our ambition" className="bg-white pb-20 pt-16 lg:pb-28 lg:pt-24">
      <div className="container grid gap-10 lg:grid-cols-12 lg:gap-16">
        <FadeIn className="lg:col-span-7">
          <p className="text-sm font-medium text-oriana-muted">{content.ambitionLead}</p>
          <RevealStatement text={content.ambition} className="mt-4 font-display font-medium text-balance" />
        </FadeIn>
        <FadeIn delay={0.08} className="lg:col-span-5 lg:self-end">
          <p className="text-base leading-8 text-oriana-muted">{content.description}</p>
        </FadeIn>
      </div>
    </section>
  )
}

export function WhoWeAreSection({ content }: { content: AboutOverviewContent['whoWeAre'] }) {
  return (
    <section
      id={content.id}
      aria-labelledby="who-we-are-title"
      className="scroll-mt-24 bg-oriana-surface py-20 lg:py-28"
    >
      <div className="container grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-7">
          <FadeIn>
            <SectionHeading
              id="who-we-are-title"
              eyebrow={chapterEyebrow(content.number, content.eyebrow)}
              title={content.title}
            />
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="mt-8 max-w-2xl space-y-5 text-base leading-8 text-oriana-muted">
              {content.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ul className="mt-10 max-w-2xl space-y-2 border-l-2 border-oriana-sky pl-6">
              {content.manifesto.map((line, index) => (
                <li
                  key={line}
                  className={
                    index === content.manifesto.length - 1
                      ? 'font-display text-xl font-semibold text-oriana-blue lg:text-2xl'
                      : 'font-display text-xl font-semibold text-oriana-deep lg:text-2xl'
                  }
                >
                  {line}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        <FadeIn delay={0.12} direction="left" className="lg:col-span-5">
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-oriana-silver lg:aspect-[4/5]">
            <Image
              src={content.image.src}
              alt={content.image.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-[50%_80%]"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

const technologyIcons: Record<string, LucideIcon> = {
  efficiency: Zap,
  control: SlidersHorizontal,
  connectivity: Wifi,
  scalable: Layers,
  future: Rocket,
}

export function TechnologySection({ content }: { content: AboutOverviewContent['technology'] }) {
  return (
    <section
      id={content.id}
      aria-labelledby="technology-title"
      className="relative isolate scroll-mt-24 overflow-hidden bg-oriana-deep py-20 lg:py-28"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(55% 60% at 100% 0%, rgba(77,163,255,0.18) 0%, rgba(7,21,37,0) 70%), radial-gradient(45% 55% at 0% 100%, rgba(26,66,138,0.4) 0%, rgba(7,21,37,0) 70%)',
        }}
      />
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <FadeIn>
            <SectionHeading
              id="technology-title"
              tone="dark"
              eyebrow={chapterEyebrow(content.number, content.eyebrow)}
              title={content.title}
              description={content.description}
            />
          </FadeIn>
          <FadeIn delay={0.1} direction="left">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-oriana-navy">
              <Image
                src={content.image.src}
                alt={content.image.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-oriana-deep/50 to-transparent" />
            </div>
          </FadeIn>
        </div>

        <FadeIn className="mt-16 lg:mt-20">
          <p className="text-sm font-medium text-white/60">{content.pillarsLead}</p>
        </FadeIn>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {content.pillars.map((pillar, index) => {
            const Icon = technologyIcons[pillar.key] ?? Zap
            return (
              <li key={pillar.key} className="sm:last:col-span-2 lg:last:col-span-1">
                <FadeIn delay={index * 0.08} className="h-full">
                  <div className="flex h-full flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-oriana-sky/15 text-oriana-sky">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-white">{pillar.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/65">{pillar.description}</p>
                    </div>
                  </div>
                </FadeIn>
              </li>
            )
          })}
        </ul>

        <FadeIn>
          <p
            className="mx-auto mt-16 max-w-3xl text-center font-display font-medium tracking-[-0.02em] text-balance text-white lg:mt-20"
            style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.4rem)', lineHeight: 1.2 }}
          >
            {content.closing}{' '}
            <span className="text-oriana-sky">{content.closingEmphasis}</span>
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

export function ManufacturingSection({ content }: { content: AboutOverviewContent['manufacturing'] }) {
  return (
    <section
      id={content.id}
      aria-labelledby="manufacturing-title"
      className="scroll-mt-24 bg-white py-20 lg:py-28"
    >
      <div className="container grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        <FadeIn direction="right">
          <div className="relative aspect-[5/4] overflow-hidden rounded-3xl bg-oriana-silver">
            <Image
              src={content.image.src}
              alt={content.image.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-4 py-2 font-display text-sm font-semibold text-oriana-deep shadow-sm">
              {content.closing} <span className="text-oriana-blue">{content.closingEmphasis}</span>
            </div>
          </div>
        </FadeIn>

        <div>
          <FadeIn>
            <SectionHeading
              id="manufacturing-title"
              eyebrow={chapterEyebrow(content.number, content.eyebrow)}
              title={content.title}
            />
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="mt-8 space-y-5 text-base leading-8 text-oriana-muted">
              {content.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="mt-10 text-sm font-medium text-oriana-muted">{content.capabilitiesLead}</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {content.capabilities.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-oriana-navy/8 bg-oriana-surface px-4 py-3.5"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-oriana-blue" aria-hidden />
                  <span className="text-sm font-medium leading-6 text-oriana-deep">{item}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

export function QualitySection({ content }: { content: AboutOverviewContent['quality'] }) {
  return (
    <section
      id={content.id}
      aria-labelledby="quality-title"
      className="scroll-mt-24 bg-oriana-surface py-20 lg:py-28"
    >
      <div className="container grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-7">
          <FadeIn>
            <SectionHeading
              id="quality-title"
              eyebrow={chapterEyebrow(content.number, content.eyebrow)}
              title={content.title}
            />
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="mt-8 max-w-2xl space-y-5 text-base leading-8 text-oriana-muted">
              {content.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </FadeIn>
        </div>
        <FadeIn delay={0.12} direction="left" className="lg:col-span-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-oriana-silver">
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

      <div className="container mt-16 lg:mt-20">
        <FadeIn>
          <p className="text-sm font-medium text-oriana-muted">{content.principlesLead}</p>
        </FadeIn>
        <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {content.principles.map((step, index) => {
            const last = index === content.principles.length - 1
            return (
              <li key={step}>
                <FadeIn delay={index * 0.1} className="h-full">
                  <div
                    className={cn(
                      'flex h-full items-center justify-between gap-4 rounded-2xl px-6 py-7',
                      last
                        ? 'bg-oriana-blue text-white lg:rounded-l-none'
                        : 'border border-oriana-navy/8 bg-white text-oriana-deep lg:border-r-0',
                      index === 0 ? 'lg:rounded-r-none' : !last && 'lg:rounded-none',
                    )}
                  >
                    <span>
                      <span
                        className={
                          last
                            ? 'block font-display text-sm font-semibold text-oriana-sun'
                            : 'block font-display text-sm font-semibold text-oriana-sky'
                        }
                      >
                        {`0${index + 1}`}
                      </span>
                      <span className="mt-1 block font-display text-xl font-semibold uppercase tracking-[0.12em] lg:text-2xl">
                        {step}
                      </span>
                    </span>
                    {last ? null : (
                      <ArrowRight className="hidden h-5 w-5 shrink-0 text-oriana-blue/50 lg:block" aria-hidden />
                    )}
                  </div>
                </FadeIn>
              </li>
            )
          })}
        </ol>
        <FadeIn>
          <p className="mt-12 max-w-3xl font-display text-xl font-semibold text-balance text-oriana-deep lg:text-2xl">
            {content.closing}
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

export function AboutVisionSection({ content }: { content: AboutOverviewContent['vision'] }) {
  return (
    <section
      id={content.id}
      aria-labelledby="about-vision-title"
      className="relative isolate scroll-mt-24 overflow-hidden bg-oriana-deep py-24 lg:py-36"
    >
      <Image src={content.image.src} alt={content.image.alt} fill sizes="100vw" className="-z-20 object-cover" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(100deg, rgba(7,21,37,0.96) 0%, rgba(7,21,37,0.85) 50%, rgba(7,21,37,0.5) 100%)',
        }}
      />
      <div className="container grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <FadeIn>
            <SectionHeading
              id="about-vision-title"
              tone="dark"
              eyebrow={chapterEyebrow(content.number, content.eyebrow)}
              title={content.title}
            />
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="mt-8 max-w-xl space-y-5 text-base leading-8 text-white/75">
              {content.paragraphs.map((p, index) => (
                <p
                  key={p}
                  className={index === content.paragraphs.length - 1 ? 'font-semibold text-white' : undefined}
                >
                  {p}
                </p>
              ))}
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.12} className="lg:self-end">
          <p className="max-w-md text-base leading-7 text-white/70">{content.futureLead}</p>
          <ul className="mt-6 space-y-1">
            {content.future.map((word) => (
              <li
                key={word}
                className="flex items-center gap-4 font-display font-medium tracking-[-0.02em] text-white"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)', lineHeight: 1.2 }}
              >
                <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-oriana-sun" />
                {word}
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  )
}

const reasonIcons: Record<string, LucideIcon> = {
  engineering: DraftingCompass,
  innovation: Lightbulb,
  manufacturing: Factory,
  reliability: ShieldCheck,
  service: Headset,
  vision: Telescope,
}

export function WhyOrianaSection({ content }: { content: AboutOverviewContent['why'] }) {
  return (
    <section id={content.id} aria-labelledby="why-title" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <div className="container">
        <FadeIn>
          <SectionHeading
            id="why-title"
            eyebrow={chapterEyebrow(content.number, content.eyebrow)}
            title={content.title}
            description={content.description}
          />
        </FadeIn>
        <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-oriana-navy/8 bg-oriana-navy/8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {content.reasons.map((reason, index) => {
            const Icon = reasonIcons[reason.key] ?? ShieldCheck
            return (
              <li key={reason.key} className="bg-white">
                <FadeIn delay={(index % 3) * 0.08} className="h-full">
                  <div className="flex h-full flex-col gap-6 p-8 lg:p-10">
                    <div className="flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-oriana-blue/8 text-oriana-blue">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <span className="font-display text-sm font-semibold text-oriana-sky">{`0${index + 1}`}</span>
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-oriana-deep">
                        {reason.title}
                      </h3>
                      <p className="mt-3 text-base leading-7 text-oriana-muted">{reason.description}</p>
                    </div>
                  </div>
                </FadeIn>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export function CommitmentSection({ content }: { content: AboutOverviewContent['commitment'] }) {
  return (
    <section
      aria-labelledby="commitment-title"
      className="relative isolate overflow-hidden bg-oriana-deep py-24 text-white lg:py-36"
    >
      <Image src={content.image.src} alt="" fill sizes="100vw" className="-z-20 object-cover opacity-60" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(7,21,37,0.95) 0%, rgba(7,21,37,0.72) 50%, rgba(7,21,37,0.95) 100%)',
        }}
      />
      <div className="container grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <FadeIn>
            <SectionHeading
              id="commitment-title"
              tone="dark"
              eyebrow={content.eyebrow}
              title={content.title}
            />
          </FadeIn>
          <FadeIn delay={0.08}>
            <ul className="mt-10 space-y-4 border-l-2 border-oriana-sky/60 pl-6">
              {content.matters.map((line) => (
                <li key={line} className="font-display text-lg font-medium text-white lg:text-xl">
                  {line}
                </li>
              ))}
            </ul>
            <p className="mt-10 max-w-xl text-base leading-8 text-white/70">{content.body}</p>
          </FadeIn>
        </div>

        <FadeIn delay={0.12} className="lg:self-end">
          <p
            className="font-display font-medium tracking-[-0.02em] text-balance"
            style={{ fontSize: 'clamp(1.8rem, 3.4vw, 3rem)', lineHeight: 1.12 }}
          >
            {content.statement}
            <span className="mt-2 block text-oriana-sky">{content.statementEmphasis}</span>
          </p>

          <div className="mt-12 border-t border-white/15 pt-8">
            <p className="font-display text-2xl font-bold tracking-[0.2em]">{content.brand}</p>
            <p className="mt-2 text-base text-white/75">{content.tagline}</p>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-[0.18em] text-oriana-sky">
              {content.capabilities.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-oriana-sun" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={content.primary.href}
              className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-oriana-deep transition-colors duration-300 hover:bg-oriana-sky focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {content.primary.label}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
                aria-hidden
              />
            </Link>
            <Link
              href={content.secondary.href}
              className="inline-flex min-h-12 items-center rounded-full border border-white/30 px-7 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {content.secondary.label}
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
