import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

import { AnimatedCounter } from '@/components/oriana/AnimatedCounter'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { FadeIn, Stagger, StaggerItem } from '@/components/oriana/FadeIn'
import { JourneyTimeline } from '@/components/oriana/about/achievements/JourneyTimeline'
import type {
  AchievementStat,
  AchievementsContent,
} from '@/components/oriana/about/achievements/achievementsData'
import { AboutHero } from '@/components/oriana/about/shared/AboutHero'
import { ParallaxImage } from '@/components/oriana/about/shared/ParallaxImage'
import { IndiaMapOutline } from '@/components/oriana/support/IndiaMapOutline'
import { defaultPresence } from '@/components/oriana/support/supportData'
import { SectionHeading } from '@/components/oriana/sustainability/SectionHeading'
import { SustainabilityCta } from '@/components/oriana/sustainability/SustainabilityCta'
import { cn } from '@/utilities/ui'

function StatCopy({ stat, large }: { stat: AchievementStat; large?: boolean }) {
  return (
    <div className="relative">
      <p
        className="font-display font-semibold tracking-[-0.04em] text-white"
        style={{
          fontSize: large ? 'clamp(3.5rem, 9vw, 8rem)' : 'clamp(2.25rem, 4.4vw, 3.75rem)',
          lineHeight: 0.95,
        }}
      >
        <AnimatedCounter value={stat.value} />
      </p>
      <h3 className="mt-4 text-xs font-semibold uppercase tracking-[0.24em] text-oriana-sky">{stat.label}</h3>
      <p className={cn('mt-3 text-sm leading-6 text-white/75', large ? 'max-w-md sm:text-base sm:leading-7' : 'max-w-sm')}>
        {stat.description}
      </p>
    </div>
  )
}

function ImageStat({ stat, large, className }: { stat: AchievementStat; large?: boolean; className?: string }) {
  return (
    <article className={cn('group relative isolate flex flex-col justify-end overflow-hidden rounded-3xl bg-oriana-deep p-6 sm:p-8', className)}>
      {stat.image ? (
        <Image
          src={stat.image}
          alt=""
          fill
          sizes={large ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, 100vw'}
          className="-z-20 object-cover transition-transform duration-1000 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      ) : null}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-oriana-deep via-oriana-deep/60 to-oriana-deep/10" />
      <StatCopy stat={stat} large={large} />
    </article>
  )
}

function PresenceStat({ stat, className }: { stat: AchievementStat; className?: string }) {
  return (
    <article
      className={cn('relative isolate flex flex-col justify-end overflow-hidden rounded-3xl bg-oriana-navy p-6 sm:p-8', className)}
    >
      <div aria-hidden className="absolute -right-6 -top-4 -z-10 h-[78%] opacity-90">
        <div className="relative h-full" style={{ aspectRatio: '921 / 1000' }}>
          <IndiaMapOutline className="absolute inset-0 h-full w-full text-oriana-sky/55" />
          {defaultPresence.locations.map((pin) => (
            <span
              key={pin.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ top: pin.top, left: pin.left }}
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-oriana-sun/60 motion-reduce:animate-none" />
              <span className="relative block h-2 w-2 rounded-full bg-oriana-sun" />
            </span>
          ))}
        </div>
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-oriana-navy via-oriana-navy/40 to-transparent" />
      <StatCopy stat={stat} />
    </article>
  )
}

function NumbersSection({ content }: { content: AchievementsContent['numbers'] }) {
  const [supply, experience, presence, partners] = content.stats
  return (
    <section id={content.id} aria-labelledby="numbers-title" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <div className="container">
        <FadeIn>
          <SectionHeading id="numbers-title" eyebrow={content.eyebrow} title={content.title} />
        </FadeIn>
        <Stagger className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-4 lg:grid-rows-2 lg:gap-5" stagger={0.1}>
          <StaggerItem className="lg:col-span-2 lg:row-span-2">
            <ImageStat stat={supply} large className="min-h-[26rem] lg:h-full lg:min-h-[36rem]" />
          </StaggerItem>
          <StaggerItem className="lg:col-span-2">
            <ImageStat stat={experience} className="min-h-[18rem] lg:h-full" />
          </StaggerItem>
          <StaggerItem>
            <PresenceStat stat={presence} className="min-h-[20rem] lg:h-full" />
          </StaggerItem>
          <StaggerItem>
            <ImageStat stat={partners} className="min-h-[20rem] lg:h-full" />
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  )
}

function ScaleSection({ content }: { content: AchievementsContent['scale'] }) {
  return (
    <section id={content.id} aria-labelledby="scale-title" className="scroll-mt-24 bg-oriana-surface py-20 lg:py-28">
      <div className="container">
        <FadeIn>
          <SectionHeading
            id="scale-title"
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
          />
        </FadeIn>
        <ol className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-16">
          {content.segments.map((segment, index) => (
            <li key={segment.label} className={cn(index === 1 && 'md:translate-y-10')}>
              <FadeIn delay={index * 0.1}>
                <figure className="relative">
                  <ParallaxImage
                    src={segment.image}
                    alt={segment.alt}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="aspect-[3/4] rounded-3xl bg-oriana-deep"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-oriana-deep/85 via-transparent to-transparent"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                    <span>
                      <span className="block font-display text-xs font-semibold tracking-[0.2em] text-oriana-sky">
                        {`0${index + 1}`}
                      </span>
                      <span className="mt-1 block font-display text-2xl font-semibold text-white">
                        {segment.label}
                      </span>
                    </span>
                    {index < content.segments.length - 1 ? (
                      <ArrowRight className="mb-1 hidden h-5 w-5 text-white/60 md:block" aria-hidden />
                    ) : null}
                  </figcaption>
                </figure>
              </FadeIn>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function ServiceSection({ content }: { content: AchievementsContent['service'] }) {
  return (
    <section id={content.id} aria-labelledby="service-title" className="scroll-mt-24 bg-white py-20 lg:py-32">
      <div className="container grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        <FadeIn direction="right">
          <ParallaxImage
            src={content.image}
            alt={content.imageAlt}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/5] rounded-3xl bg-oriana-silver sm:aspect-[5/4] lg:aspect-[4/5]"
          />
        </FadeIn>
        <div>
          <FadeIn>
            <SectionHeading id="service-title" eyebrow={content.eyebrow} title={content.title} />
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="mt-8 space-y-5 text-base leading-8 text-oriana-muted">
              {content.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ol className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-3">
              {content.lifecycle.map((step, index) => (
                <li key={step} className="flex items-center gap-3">
                  <span className="rounded-full border border-oriana-blue/20 bg-oriana-surface px-4 py-2 text-sm font-semibold text-oriana-deep">
                    {step}
                  </span>
                  {index < content.lifecycle.length - 1 ? (
                    <ArrowRight className="h-4 w-4 text-oriana-sky" aria-hidden />
                  ) : null}
                </li>
              ))}
            </ol>
          </FadeIn>
          <div className="mt-12 border-t border-oriana-navy/10 pt-8">
            <FadeIn>
              <p className="text-sm font-medium text-oriana-muted">{content.commitmentLead}</p>
            </FadeIn>
            <Stagger className="mt-4 space-y-1" stagger={0.14}>
              {content.commitment.map((line, index) => (
                <StaggerItem key={line}>
                  <p
                    className={cn(
                      'font-display font-semibold tracking-[-0.02em]',
                      index === content.commitment.length - 1 ? 'text-oriana-blue' : 'text-oriana-deep',
                    )}
                    style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.25rem)', lineHeight: 1.2 }}
                  >
                    {line}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  )
}

function JourneySection({ content }: { content: AchievementsContent['journey'] }) {
  return (
    <section
      id={content.id}
      aria-labelledby="journey-title"
      className="relative isolate scroll-mt-24 overflow-hidden bg-oriana-deep py-20 lg:py-32"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(50% 40% at 50% 0%, rgba(77,163,255,0.18) 0%, rgba(7,21,37,0) 70%), radial-gradient(45% 35% at 50% 100%, rgba(245,185,66,0.12) 0%, rgba(7,21,37,0) 70%)',
        }}
      />
      <div className="container">
        <FadeIn>
          <SectionHeading id="journey-title" tone="dark" align="center" eyebrow={content.eyebrow} title={content.title} />
        </FadeIn>
        <JourneyTimeline steps={content.steps} />
      </div>
    </section>
  )
}

export function Achievements({ content }: { content: AchievementsContent }) {
  const { hero } = content
  return (
    <main>
      <AboutHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        media={{ kind: 'video', src: hero.video.src, poster: hero.video.poster }}
        primary={{ label: 'See the numbers', href: `#${content.numbers.id}` }}
        secondary={{ label: 'Our journey', href: `#${content.journey.id}` }}
      />
      <Breadcrumbs items={[{ label: 'About', href: '/about' }, { label: 'Achievements' }]} />
      <NumbersSection content={content.numbers} />
      <ScaleSection content={content.scale} />
      <ServiceSection content={content.service} />
      <JourneySection content={content.journey} />
      <SustainabilityCta content={content.cta} />
    </main>
  )
}
