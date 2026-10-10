import Image from 'next/image'

import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { FadeIn } from '@/components/oriana/FadeIn'
import { AboutHero } from '@/components/oriana/about/shared/AboutHero'
import { ParallaxImage } from '@/components/oriana/about/shared/ParallaxImage'
import { RevealStatement } from '@/components/oriana/about/shared/RevealStatement'
import { LongTermList } from '@/components/oriana/about/vision-mission/LongTermList'
import type { VisionMissionContent } from '@/components/oriana/about/vision-mission/visionMissionData'
import { SectionHeading } from '@/components/oriana/sustainability/SectionHeading'
import { SustainabilityCta } from '@/components/oriana/sustainability/SustainabilityCta'

const eyebrowClass = 'flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.3em]'

function VisionStatementSection({ content }: { content: VisionMissionContent['vision'] }) {
  return (
    <section id={content.id} aria-labelledby="vision-title" className="scroll-mt-24 bg-white py-20 lg:py-32">
      <div className="container">
        <FadeIn>
          <h2 id="vision-title" className={`${eyebrowClass} text-oriana-blue`}>
            <span className="h-px w-10 bg-oriana-blue/50" aria-hidden />
            {content.eyebrow}
          </h2>
        </FadeIn>
        <RevealStatement
          text={content.statement}
          className="mt-8 max-w-5xl font-display font-medium text-balance"
          style={{ fontSize: 'clamp(1.9rem, 4.4vw, 4rem)', lineHeight: 1.1 }}
        />

        <ul className="mt-16 grid gap-4 sm:grid-cols-3 lg:mt-24 lg:gap-6">
          {content.panels.map((panel, index) => (
            <li key={panel.label}>
              <FadeIn delay={index * 0.1}>
                <figure className="relative">
                  <ParallaxImage
                    src={panel.image}
                    alt={panel.alt}
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="aspect-[4/5] rounded-3xl bg-oriana-deep"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-oriana-deep/85 via-oriana-deep/10 to-transparent"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 lg:p-8">
                    <span
                      className="font-display font-medium tracking-[-0.02em] text-white"
                      style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)', lineHeight: 1 }}
                    >
                      {panel.label}
                    </span>
                    <span className="font-display text-sm font-semibold text-oriana-sun">{`0${index + 1}`}</span>
                  </figcaption>
                </figure>
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function MissionSection({ content }: { content: VisionMissionContent['mission'] }) {
  return (
    <section
      id={content.id}
      aria-labelledby="mission-title"
      className="relative isolate scroll-mt-24 bg-oriana-deep py-20 text-white lg:py-32"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(55% 50% at 100% 0%, rgba(77,163,255,0.18) 0%, rgba(7,21,37,0) 70%), radial-gradient(45% 45% at 0% 100%, rgba(26,66,138,0.45) 0%, rgba(7,21,37,0) 70%)',
        }}
      />
      <div className="container grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <div className="lg:sticky lg:top-[calc(var(--site-header-height,5rem)+3rem)]">
            <FadeIn>
              <h2 id="mission-title" className={`${eyebrowClass} text-oriana-sky`}>
                <span className="h-px w-10 bg-oriana-sky/60" aria-hidden />
                {content.eyebrow}
              </h2>
            </FadeIn>
            <RevealStatement
              text={content.statement}
              tone="dark"
              className="mt-8 font-display font-medium text-balance"
              style={{ fontSize: 'clamp(1.6rem, 2.7vw, 2.6rem)', lineHeight: 1.18 }}
            />
            <FadeIn delay={0.1}>
              <p className="mt-10 text-sm font-semibold uppercase tracking-[0.24em] text-oriana-sun">
                {content.valueLead}
              </p>
            </FadeIn>
          </div>
        </div>

        <ul className="space-y-6 lg:col-span-6 lg:space-y-10">
          {content.values.map((value, index) => (
            <li key={value.key}>
              <FadeIn delay={0.05} direction="left">
                <article className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <Image
                      src={value.image}
                      alt={value.alt}
                      fill
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                    <span className="absolute left-5 top-5 rounded-full bg-oriana-deep/70 px-3 py-1 font-display text-xs font-semibold text-oriana-sky backdrop-blur-sm">
                      {`0${index + 1}`}
                    </span>
                  </div>
                  <div className="p-6 lg:p-8">
                    <h3 className="font-display text-2xl font-semibold text-white">{value.label}</h3>
                    <p className="mt-2 text-base leading-7 text-white/70">{value.description}</p>
                  </div>
                </article>
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function LongTermSection({ content }: { content: VisionMissionContent['longTerm'] }) {
  return (
    <section
      id={content.id}
      aria-labelledby="long-term-title"
      className="scroll-mt-24 overflow-hidden bg-oriana-surface py-20 lg:py-28"
    >
      <div className="container">
        <FadeIn>
          <SectionHeading id="long-term-title" eyebrow={content.eyebrow} title={content.title} />
        </FadeIn>
        <LongTermList items={content.items} />
      </div>
    </section>
  )
}

export function VisionMission({ content }: { content: VisionMissionContent }) {
  const { hero } = content
  return (
    <main>
      <AboutHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        media={{ kind: 'video', src: hero.video.src, poster: hero.video.poster }}
        primary={{ label: 'Our vision', href: `#${content.vision.id}` }}
        secondary={{ label: 'Our mission', href: `#${content.mission.id}` }}
      />
      <Breadcrumbs items={[{ label: 'About', href: '/about' }, { label: 'Vision & Mission' }]} />
      <VisionStatementSection content={content.vision} />
      <MissionSection content={content.mission} />
      <LongTermSection content={content.longTerm} />
      <SustainabilityCta content={content.cta} />
    </main>
  )
}
