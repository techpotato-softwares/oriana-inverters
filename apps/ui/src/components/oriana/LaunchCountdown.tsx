'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

import { Logo } from '@/components/Logo/Logo'
import { EnergyMesh } from '@/components/oriana/EnergyMesh'
import { OrriMascot, type OrriPose } from '@/components/oriana/mascot/OrriMascot'
import {
  formatLaunchCountdown,
  isBeforeWebsiteLaunch,
  msUntilWebsiteLaunch,
} from '@/data/launchConfig'
import { cn } from '@/utilities/ui'

type Phase = 'countdown' | 'celebrate'

type ConfettiPiece = {
  id: number
  left: string
  delay: number
  duration: number
  color: string
  rotate: number
  size: number
}

const CONFETTI_COLORS = ['#4da3ff', '#f5b942', '#eef2f8', '#1a428a', '#ffffff']
const ROCKET_FLIGHT_S = 2.85
const CELEBRATION_MS = 3200

function buildConfetti(count: number): ConfettiPiece[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    left: `${(id * 37) % 100}%`,
    delay: (id % 12) * 0.04,
    duration: 1.6 + (id % 5) * 0.12,
    color: CONFETTI_COLORS[id % CONFETTI_COLORS.length]!,
    rotate: (id * 47) % 360,
    size: 6 + (id % 4) * 2,
  }))
}

function orriPoseForMs(remainingMs: number): OrriPose {
  // Last hour → cheer; last day → point; otherwise wave
  if (remainingMs <= 60 * 60 * 1000) return 'cheer'
  if (remainingMs <= 24 * 60 * 60 * 1000) return 'point'
  return 'wave'
}

function Rocket({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32 4c8 10 12 22 12 34 0 4-1.5 7.5-4 10l-4 4h-8l-4-4c-2.5-2.5-4-6-4-10 0-12 4-24 12-34Z"
        fill="#4da3ff"
      />
      <path d="M28 48v8l4-3 4 3v-8H28Z" fill="#f5b942" />
      <circle cx="32" cy="28" r="5" fill="#eef2f8" />
      <path d="M20 36c-4 2-8 6-8 10 6 0 10-2 12-6l-4-4Z" fill="#1a428a" />
      <path d="M44 36c4 2 8 6 8 10-6 0-10-2-12-6l4-4Z" fill="#1a428a" />
    </svg>
  )
}

function ElectricWattField({ active }: { active: boolean }) {
  const reduceMotion = useReducedMotion()
  const bolts = useMemo(
    () =>
      [
        { x: '12%', delay: 0, scale: 0.9 },
        { x: '78%', delay: 0.8, scale: 1.1 },
        { x: '55%', delay: 1.5, scale: 0.75 },
        { x: '30%', delay: 2.2, scale: 1 },
      ] as const,
    [],
  )

  if (!active) return null

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute left-1/2 top-1/2 h-[42vmin] w-[42vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-oriana-sky/25"
          initial={{ scale: 0.55 + i * 0.12, opacity: 0 }}
          animate={
            reduceMotion
              ? { opacity: 0.12 }
              : { scale: [0.55 + i * 0.12, 1.35 + i * 0.08], opacity: [0.35, 0] }
          }
          transition={
            reduceMotion
              ? undefined
              : { duration: 3.2, delay: i * 0.7, repeat: Infinity, ease: 'easeOut' }
          }
        />
      ))}

      {[18, 42, 68, 86].map((top, i) => (
        <motion.div
          key={`beam-${top}`}
          className="absolute h-px w-full bg-gradient-to-r from-transparent via-oriana-sky/50 to-transparent"
          style={{ top: `${top}%` }}
          animate={
            reduceMotion
              ? { opacity: 0.2 }
              : { opacity: [0.08, 0.45, 0.08], x: ['-8%', '8%', '-8%'] }
          }
          transition={
            reduceMotion
              ? undefined
              : { duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }
          }
        />
      ))}

      {bolts.map((bolt, i) => (
        <motion.svg
          key={`bolt-${i}`}
          viewBox="0 0 40 80"
          className="absolute top-[8%] h-24 w-10 text-oriana-sun sm:h-32"
          style={{ left: bolt.x, scale: bolt.scale }}
          initial={{ opacity: 0 }}
          animate={
            reduceMotion
              ? { opacity: 0.15 }
              : { opacity: [0, 0.85, 0.15, 0.9, 0], y: [0, 8, 0] }
          }
          transition={
            reduceMotion
              ? undefined
              : { duration: 2.4, delay: bolt.delay, repeat: Infinity, repeatDelay: 1.6 }
          }
        >
          <path d="M22 2 8 38h12L10 78l24-42H22L34 2H22Z" fill="currentColor" opacity={0.85} />
        </motion.svg>
      ))}
    </div>
  )
}

const rippleVariants: Variants = {
  idle: { scale: 1, opacity: 0 },
  pulse: {
    scale: [1, 1.85],
    opacity: [0.55, 0],
    transition: { duration: 1.1, ease: 'easeOut' },
  },
}

/** Static homepage gate until 20 Oct 2026, 2:30 PM IST. */
export function LaunchCountdown() {
  const reduceMotion = useReducedMotion()
  const [remainingMs, setRemainingMs] = useState(() => msUntilWebsiteLaunch())
  const [phase, setPhase] = useState<Phase>(() =>
    isBeforeWebsiteLaunch() ? 'countdown' : 'celebrate',
  )
  const confetti = useMemo(() => buildConfetti(reduceMotion ? 0 : 42), [reduceMotion])
  const parts = formatLaunchCountdown(remainingMs)
  const orriPose = phase === 'celebrate' ? 'cheer' : orriPoseForMs(remainingMs)
  const tickKey = parts.ss

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  useEffect(() => {
    if (phase !== 'countdown') return

    const tick = () => {
      const ms = msUntilWebsiteLaunch()
      setRemainingMs(ms)
      if (ms <= 0) setPhase('celebrate')
    }

    tick()
    const id = window.setInterval(tick, 250)
    return () => window.clearInterval(id)
  }, [phase])

  useEffect(() => {
    if (phase !== 'celebrate') return
    const delay = reduceMotion ? 900 : CELEBRATION_MS
    const id = window.setTimeout(() => {
      window.location.reload()
    }, delay)
    return () => window.clearTimeout(id)
  }, [phase, reduceMotion])

  const celebrating = phase === 'celebrate'

  return (
    <main
      className="fixed inset-0 z-50 flex h-[100svh] max-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-oriana-surface text-oriana-navy"
      aria-live="polite"
    >
      <EnergyMesh className="pointer-events-none absolute inset-0 opacity-35" />
      <ElectricWattField active={!celebrating} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(77,163,255,0.14),transparent_60%)]"
      />

      {celebrating && !reduceMotion
        ? confetti.map((piece) => (
            <motion.span
              key={piece.id}
              aria-hidden
              className="pointer-events-none absolute top-0 z-20 rounded-sm"
              style={{
                left: piece.left,
                width: piece.size,
                height: piece.size * 1.6,
                backgroundColor: piece.color,
              }}
              initial={{ y: '-10%', opacity: 1, rotate: piece.rotate }}
              animate={{ y: '110vh', opacity: [1, 1, 0], rotate: piece.rotate + 200 }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: 'easeIn',
              }}
            />
          ))
        : null}

      {celebrating ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex justify-center"
          initial={reduceMotion ? { opacity: 1, y: 0 } : { y: '18%', opacity: 1 }}
          animate={
            reduceMotion
              ? { opacity: 1, y: '-30%' }
              : { y: ['18%', '-120%'], opacity: [1, 1, 0.85, 0] }
          }
          transition={{
            duration: reduceMotion ? 1.1 : ROCKET_FLIGHT_S,
            ease: [0.33, 0.1, 0.25, 1],
          }}
        >
          <div className="relative flex h-[18svh] max-h-40 w-auto aspect-square items-center justify-center">
            <Rocket className="h-full w-full drop-shadow-[0_0_28px_rgba(77,163,255,0.45)]" />
            {!reduceMotion ? (
              <motion.div
                className="absolute -bottom-2 left-1/2 h-12 w-4 -translate-x-1/2 rounded-full bg-gradient-to-t from-oriana-sun via-oriana-sky/80 to-transparent"
                animate={{ opacity: [0.95, 0.35, 0.95], scaleY: [1, 1.55, 1] }}
                transition={{ duration: 0.28, repeat: Infinity }}
              />
            ) : null}
          </div>
        </motion.div>
      ) : null}

      <div className="relative z-10 flex h-full w-full max-w-3xl flex-col items-center justify-center px-5 py-[3svh] text-center">
        <motion.div
          className="mb-[1.5svh] shrink-0"
          animate={reduceMotion || celebrating ? { scale: 1 } : { scale: [1, 1.04, 1] }}
          transition={
            reduceMotion || celebrating
              ? undefined
              : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          <Logo variant="light" priority className="h-[clamp(3rem,8.5svh,5.25rem)] w-auto" />
        </motion.div>

        {!celebrating ? (
          <>
            <h1
              className="shrink-0 font-display font-bold leading-tight tracking-[-0.02em] text-oriana-navy"
              style={{ fontSize: 60, paddingTop: 24 }}
            >
              We’re launching
            </h1>

            <div
              className="relative mt-[3svh] flex aspect-square w-[min(72vw,min(42svh,18rem))] shrink-0 items-center justify-center"
              aria-label={`${parts.hh} hours, ${parts.mm} minutes, ${parts.ss} seconds remaining`}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={`${tickKey}-ripple-${i}`}
                  aria-hidden
                  className="absolute inset-0 rounded-full border-2 border-oriana-sky/40"
                  variants={rippleVariants}
                  initial="idle"
                  animate={reduceMotion ? 'idle' : 'pulse'}
                  transition={{ delay: i * 0.18 }}
                />
              ))}
              <div
                aria-hidden
                className="absolute inset-[6%] rounded-full bg-gradient-to-b from-white to-oriana-silver/80 shadow-[0_0_48px_rgba(26,66,138,0.12)] ring-2 ring-oriana-blue/20"
              />
              <div aria-hidden className="absolute inset-[6%] rounded-full border border-oriana-navy/10" />

              <div className="relative flex flex-col items-center justify-center gap-1.5">
                <motion.div
                  key={tickKey}
                  initial={reduceMotion ? false : { scale: 0.96, opacity: 0.7 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-baseline justify-center gap-0.5 font-display font-bold tabular-nums leading-none text-oriana-blue sm:gap-1"
                  style={{ fontSize: 'clamp(2.25rem, 7.5svh, 64px)' }}
                >
                  <span>{parts.hh}</span>
                  <span className="pb-0.5 text-oriana-blue/70">:</span>
                  <span>{parts.mm}</span>
                  <span className="pb-0.5 text-oriana-blue/70">:</span>
                  <span>{parts.ss}</span>
                </motion.div>
                <p className="font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-oriana-blue/60 sm:text-xs">
                  Hours : Minutes : Seconds
                </p>
              </div>
            </div>

            <OrriMascot
              key={orriPose}
              pose={orriPose}
              immediate
              priority
              alt={`Orri ${orriPose}`}
              className="mt-[2svh] w-[clamp(5.5rem,16svh,9rem)] shrink-0"
              sizes="144px"
            />
          </>
        ) : (
          <>
            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45 }}
              className="font-display text-[clamp(2rem,6svh,3.5rem)] font-bold tracking-tight text-oriana-navy"
            >
              We’re live!
            </motion.h1>
            <p className="mt-[1svh] text-base text-oriana-muted sm:text-lg">Opening the homepage…</p>

            <OrriMascot
              pose="cheer"
              immediate
              priority
              alt="Orri celebrating"
              className={cn('mt-[2svh] w-[clamp(6rem,18svh,10rem)]')}
              sizes="160px"
            />
          </>
        )}
      </div>
    </main>
  )
}
