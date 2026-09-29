'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

type HeroAction = {
  href: string
  label: string
}

type MediaHeroProps = {
  eyebrow: string
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  primary?: HeroAction
  secondary?: HeroAction
  unoptimized?: boolean
}

export function MediaHero({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  primary,
  secondary,
  unoptimized,
}: MediaHeroProps) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative isolate flex min-h-[78svh] items-end overflow-hidden bg-oriana-deep">
      <motion.div
        className="absolute inset-0 -z-10"
        initial={reduceMotion ? undefined : { scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 1.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          unoptimized={unoptimized}
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(100deg, rgba(7,21,37,0.94) 0%, rgba(7,21,37,0.78) 42%, rgba(7,21,37,0.28) 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-2/5"
        style={{
          background: 'linear-gradient(180deg, rgba(7,21,37,0) 0%, rgba(7,21,37,0.88) 100%)',
        }}
      />

      <div className="container relative w-full pb-16 pt-40 lg:pb-24 lg:pt-52">
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-oriana-sky">{eyebrow}</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">{description}</p>
          {primary || secondary ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {primary ? (
                <Link
                  href={primary.href}
                  className="rounded-full bg-white px-6 py-3 text-sm font-bold text-oriana-navy transition hover:bg-oriana-silver"
                >
                  {primary.label}
                </Link>
              ) : null}
              {secondary ? (
                <Link
                  href={secondary.href}
                  className="rounded-full border border-white/35 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  {secondary.label}
                </Link>
              ) : null}
            </div>
          ) : null}
        </motion.div>
      </div>
    </section>
  )
}
