'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

import { VideoHero } from '@/components/oriana/VideoHero'
import { AboutPageNav } from '@/components/oriana/about/shared/AboutPageNav'

const ease = [0.16, 1, 0.3, 1] as const

export type AboutHeroAction = { label: string; href: string }

export type AboutHeroMedia =
  | { kind: 'video'; src: string; poster: string }
  | { kind: 'image'; src: string; alt: string }

type AboutHeroProps = {
  eyebrow: string
  title: string
  description?: string
  media: AboutHeroMedia
  primary?: AboutHeroAction
  secondary?: AboutHeroAction
}

function HeroCopy({ eyebrow, title, description, primary, secondary }: Omit<AboutHeroProps, 'media'>) {
  const reduceMotion = useReducedMotion()
  const reveal = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease },
        }

  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(7,21,37,0.82) 0%, rgba(7,21,37,0.45) 55%, rgba(7,21,37,0.1) 100%)',
        }}
      />
      <div className="container relative flex h-full flex-col justify-end pb-8 pt-32 lg:pb-10">
        <motion.p
          {...reveal(0.1)}
          className="flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-oriana-sky"
        >
          <span className="h-px w-10 bg-oriana-sky/60" aria-hidden />
          {eyebrow}
        </motion.p>
        <motion.h1
          {...reveal(0.18)}
          className="mt-5 max-w-4xl font-display font-medium tracking-[-0.02em] text-balance text-white"
          style={{ fontSize: 'clamp(2.25rem, 5.2vw, 4.75rem)', lineHeight: 1.04 }}
        >
          {title}
        </motion.h1>
        {description ? (
          <motion.p
            {...reveal(0.28)}
            className="mt-6 max-w-xl text-base leading-8 text-pretty text-white/80 md:text-lg"
          >
            {description}
          </motion.p>
        ) : null}
        {primary || secondary ? (
          <motion.div {...reveal(0.36)} className="mt-8 flex flex-wrap gap-3">
            {primary ? (
              <Link
                href={primary.href}
                className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-oriana-deep transition-colors duration-300 hover:bg-oriana-sky focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {primary.label}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
                  aria-hidden
                />
              </Link>
            ) : null}
            {secondary ? (
              <Link
                href={secondary.href}
                className="inline-flex min-h-12 items-center rounded-full border border-white/35 px-7 text-sm font-semibold text-white transition-colors duration-300 hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {secondary.label}
              </Link>
            ) : null}
          </motion.div>
        ) : null}
        <motion.div {...reveal(0.46)}>
          <AboutPageNav className="mt-12 lg:mt-16" />
        </motion.div>
      </div>
    </>
  )
}

function ImageHero({ media, ...copy }: AboutHeroProps & { media: { kind: 'image'; src: string; alt: string } }) {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])

  return (
    <section
      ref={ref}
      aria-label={copy.eyebrow}
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-oriana-deep"
      style={{ height: '100svh' }}
    >
      <motion.div
        className="absolute inset-0 -z-10"
        style={reduceMotion ? undefined : { y }}
        initial={reduceMotion ? undefined : { scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 1.6, ease }}
      >
        <Image src={media.src} alt={media.alt} fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-oriana-deep/85 via-transparent to-oriana-deep/25" />
      <div className="absolute inset-0">
        <HeroCopy {...copy} />
      </div>
    </section>
  )
}

/** Full-bleed About-section hero: video or image, headline, CTAs and sibling page nav. */
export function AboutHero(props: AboutHeroProps) {
  const { media, ...copy } = props
  if (media.kind === 'image') return <ImageHero {...props} media={media} />

  return (
    <VideoHero videoSrc={media.src} posterSrc={media.poster} ariaLabel={copy.eyebrow}>
      <HeroCopy {...copy} />
    </VideoHero>
  )
}
