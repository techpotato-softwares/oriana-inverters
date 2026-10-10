import Image from 'next/image'

import { FadeIn, Stagger, StaggerItem } from '@/components/oriana/FadeIn'
import type { LifeAtOrianaContent } from '@/components/oriana/about/careers/careersData'
import { ParallaxImage } from '@/components/oriana/about/shared/ParallaxImage'
import { RevealStatement } from '@/components/oriana/about/shared/RevealStatement'
import { SectionHeading } from '@/components/oriana/sustainability/SectionHeading'

const eyebrowClass = 'flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.3em]'

export function LifeIntroSection({
  content,
}: {
  content: Omit<LifeAtOrianaContent['intro'], 'paragraphs'> & { paragraphs: string[] }
}) {
  return (
    <section id="life" aria-labelledby="life-title" className="scroll-mt-24 bg-white py-20 lg:py-32">
      <div className="container">
        <FadeIn>
          <h2 id="life-title" className={`${eyebrowClass} text-oriana-blue`}>
            <span className="h-px w-10 bg-oriana-blue/50" aria-hidden />
            {content.eyebrow}
          </h2>
        </FadeIn>
        <RevealStatement
          text={content.statement}
          className="mt-8 max-w-5xl font-display font-medium text-balance"
          style={{ fontSize: 'clamp(2rem, 4.6vw, 4.25rem)', lineHeight: 1.06 }}
        />
        <div className="mt-12 grid gap-6 border-t border-oriana-navy/10 pt-10 md:grid-cols-2 lg:mt-16 lg:gap-16">
          {content.paragraphs.map((p, index) => (
            <FadeIn key={p} delay={index * 0.08}>
              <p className="max-w-xl text-lg leading-8 text-oriana-muted">{p}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export function WorkplaceSection({ content }: { content: LifeAtOrianaContent['workplace'] }) {
  const [primary, secondary, tertiary] = content.images
  return (
    <section aria-labelledby="workplace-title" className="overflow-hidden bg-white pb-20 lg:pb-32">
      <div className="container grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="relative lg:col-span-6">
          <FadeIn direction="right">
            <ParallaxImage
              src={primary.src}
              alt={primary.alt}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="aspect-[4/3] w-[86%] rounded-3xl bg-oriana-silver"
              strength={6}
            />
          </FadeIn>
          <FadeIn delay={0.15} className="absolute -bottom-10 right-0 w-[46%] sm:-bottom-14">
            <ParallaxImage
              src={secondary.src}
              alt={secondary.alt}
              sizes="(min-width: 1024px) 22vw, 45vw"
              className="aspect-[4/5] rounded-3xl border-4 border-white bg-oriana-silver shadow-xl"
              strength={12}
            />
          </FadeIn>
          {tertiary ? (
            <FadeIn delay={0.25} className="mt-6 hidden w-[38%] sm:block">
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-oriana-silver">
                <Image
                  src={tertiary.src}
                  alt={tertiary.alt}
                  fill
                  sizes="(min-width: 1024px) 18vw, 35vw"
                  className="object-cover"
                />
              </div>
            </FadeIn>
          ) : null}
        </div>

        <div className="mt-10 lg:col-span-6 lg:mt-0">
          <FadeIn>
            <SectionHeading id="workplace-title" eyebrow={content.eyebrow} title={content.title} />
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="mt-8 text-base leading-8 text-oriana-muted">{content.lead}</p>
          </FadeIn>
          <Stagger className="mt-5 flex flex-wrap gap-2.5" stagger={0.06}>
            {content.teams.map((team) => (
              <StaggerItem key={team}>
                <span className="inline-flex rounded-full border border-oriana-blue/20 bg-oriana-surface px-4 py-2 text-sm font-semibold text-oriana-deep">
                  {team}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
          <FadeIn delay={0.1}>
            <p
              className="mt-8 border-l-2 border-oriana-sun pl-5 font-display font-semibold text-balance text-oriana-blue"
              style={{ fontSize: 'clamp(1.35rem, 2.2vw, 1.9rem)', lineHeight: 1.25 }}
            >
              {content.purpose}
            </p>
            <p className="mt-8 text-base leading-8 text-oriana-muted">{content.closing}</p>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

export function CultureSection({ content }: { content: LifeAtOrianaContent['culture'] }) {
  return (
    <section
      aria-labelledby="culture-title"
      className="relative isolate overflow-hidden bg-oriana-deep py-24 text-white lg:py-36"
    >
      <Image src={content.image} alt="" fill sizes="100vw" className="-z-20 object-cover opacity-40" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(7,21,37,0.92) 0%, rgba(7,21,37,0.78) 50%, rgba(7,21,37,0.95) 100%)',
        }}
      />
      <div className="container">
        <FadeIn>
          <p className={`${eyebrowClass} justify-center text-oriana-sky`}>
            <span className="h-px w-10 bg-oriana-sky/60" aria-hidden />
            {content.eyebrow}
          </p>
          <h2
            id="culture-title"
            className="mx-auto mt-6 max-w-4xl text-center font-display font-medium tracking-[-0.03em] text-balance"
            style={{ fontSize: 'clamp(2.25rem, 5.6vw, 5rem)', lineHeight: 1.02 }}
          >
            {content.title}
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-center text-base leading-8 text-white/70">{content.body}</p>
        </FadeIn>
        <Stagger
          className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-3 lg:mt-16"
          stagger={0.08}
        >
          {content.values.map((value, index) => (
            <StaggerItem key={value} className="bg-oriana-deep/70 backdrop-blur-sm">
              <div className="flex h-full flex-col gap-3 p-6 lg:p-8">
                <span className="font-display text-xs font-semibold tracking-[0.2em] text-oriana-sun">{`0${index + 1}`}</span>
                <span className="font-display text-lg font-semibold text-white lg:text-2xl">{value}</span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <FadeIn>
          <p className="mx-auto mt-12 max-w-2xl text-center font-display text-xl font-semibold text-balance text-oriana-sky lg:text-2xl">
            {content.closing}
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
