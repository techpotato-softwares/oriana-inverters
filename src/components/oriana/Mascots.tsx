'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/utilities/ui'

type MascotProps = {
  className?: string
  animate?: boolean
}

function useIdle(animate = true) {
  const reduce = useReducedMotion()
  return Boolean(animate && !reduce)
}

/** Hero mascot — energy panda */
export function OriHero({ className, animate = true }: MascotProps) {
  const idle = useIdle(animate)

  return (
    <motion.svg
      viewBox="0 0 320 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-full w-full', className)}
      aria-hidden
      animate={idle ? { y: [0, -10, 0] } : undefined}
      transition={idle ? { duration: 5, repeat: Infinity, ease: 'easeInOut' } : undefined}
    >
      <defs>
        <radialGradient id="pandaAura" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#4da3ff" stopOpacity="0.35" />
          <stop offset="55%" stopColor="#1a428a" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#071525" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pandaBelly" x1="110" y1="200" x2="210" y2="300" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="1" stopColor="#e8eef8" />
        </linearGradient>
        <filter id="pandaGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Energy aura */}
      <circle cx="160" cy="175" r="130" fill="url(#pandaAura)" />
      <ellipse cx="160" cy="318" rx="88" ry="16" fill="#1a428a" opacity="0.18" />

      <motion.g
        animate={idle ? { rotate: [-1.5, 1.5, -1.5] } : undefined}
        transition={idle ? { duration: 6, repeat: Infinity, ease: 'easeInOut' } : undefined}
        style={{ transformOrigin: '160px 190px' }}
      >
        {/* Ears */}
        <circle cx="95" cy="88" r="32" fill="#0b1524" />
        <circle cx="225" cy="88" r="32" fill="#0b1524" />
        <circle cx="95" cy="92" r="14" fill="#2a3f5f" />
        <circle cx="225" cy="92" r="14" fill="#2a3f5f" />

        {/* Head */}
        <ellipse cx="160" cy="128" rx="78" ry="72" fill="#f7f9fc" />

        {/* Eye patches */}
        <ellipse cx="128" cy="130" rx="28" ry="32" fill="#0b1524" transform="rotate(-12 128 130)" />
        <ellipse cx="192" cy="130" rx="28" ry="32" fill="#0b1524" transform="rotate(12 192 130)" />

        {/* Eyes */}
        <circle cx="130" cy="132" r="11" fill="#4da3ff" />
        <circle cx="190" cy="132" r="11" fill="#4da3ff" />
        <circle cx="130" cy="132" r="6" fill="#071525" />
        <circle cx="190" cy="132" r="6" fill="#071525" />
        <circle cx="133" cy="129" r="2.5" fill="white" />
        <circle cx="193" cy="129" r="2.5" fill="white" />

        {/* Nose + smile */}
        <ellipse cx="160" cy="158" rx="10" ry="7" fill="#0b1524" />
        <path
          d="M160 165 Q152 174 142 170"
          stroke="#0b1524"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M160 165 Q168 174 178 170"
          stroke="#0b1524"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Body */}
        <ellipse cx="160" cy="248" rx="70" ry="62" fill="#0b1524" />
        <ellipse cx="160" cy="252" rx="46" ry="42" fill="url(#pandaBelly)" />

        {/* Arms */}
        <ellipse cx="88" cy="230" rx="22" ry="36" fill="#0b1524" transform="rotate(-18 88 230)" />
        <ellipse cx="232" cy="230" rx="22" ry="36" fill="#0b1524" transform="rotate(18 232 230)" />

        {/* Energy core on chest */}
        <motion.g
          filter="url(#pandaGlow)"
          animate={idle ? { scale: [1, 1.08, 1], opacity: [0.9, 1, 0.9] } : undefined}
          transition={idle ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' } : undefined}
          style={{ transformOrigin: '160px 248px' }}
        >
          <circle cx="160" cy="248" r="22" fill="#F5B942" opacity="0.35" />
          <circle cx="160" cy="248" r="14" fill="#F5B942" />
          <path
            d="M157 236 L164 248 H156 L163 260"
            stroke="#fff7e0"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </motion.g>

        {/* Legs */}
        <ellipse cx="128" cy="300" rx="24" ry="18" fill="#0b1524" />
        <ellipse cx="192" cy="300" rx="24" ry="18" fill="#0b1524" />
      </motion.g>

      {/* Orbiting energy sparks */}
      <motion.g
        animate={idle ? { rotate: 360 } : undefined}
        transition={idle ? { duration: 14, repeat: Infinity, ease: 'linear' } : undefined}
        style={{ transformOrigin: '160px 180px' }}
      >
        <circle cx="160" cy="42" r="5" fill="#F5B942" />
        <circle cx="268" cy="170" r="4" fill="#4da3ff" />
        <circle cx="52" cy="170" r="3.5" fill="#4da3ff" opacity="0.85" />
        <circle cx="230" cy="280" r="3" fill="#F5B942" opacity="0.8" />
      </motion.g>

      {/* Lightning accents */}
      <motion.g
        animate={idle ? { opacity: [0.35, 1, 0.35] } : undefined}
        transition={idle ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } : undefined}
      >
        <path
          d="M48 120 L62 148 L52 148 L68 186"
          stroke="#4da3ff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M272 118 L258 148 L268 148 L252 184"
          stroke="#F5B942"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </motion.g>
    </motion.svg>
  )
}

/** Residential strategy mascot */
export function OriHome({ className, animate = true }: MascotProps) {
  const idle = useIdle(animate)

  return (
    <motion.svg
      viewBox="0 0 200 200"
      fill="none"
      className={cn('h-full w-full', className)}
      aria-hidden
      animate={idle ? { y: [0, -6, 0] } : undefined}
      transition={idle ? { duration: 4.5, repeat: Infinity, ease: 'easeInOut' } : undefined}
    >
      <circle cx="100" cy="100" r="78" fill="#eef6ff" />
      <path d="M55 118 L100 78 L145 118 V148 H55 Z" fill="#1a428a" />
      <path d="M68 118 L100 90 L132 118" stroke="#4da3ff" strokeWidth="4" fill="none" strokeLinejoin="round" />
      <rect x="90" y="124" width="20" height="24" rx="2" fill="#F5B942" />
      <motion.circle
        cx="148"
        cy="62"
        r="16"
        fill="#F5B942"
        animate={idle ? { scale: [1, 1.1, 1] } : undefined}
        transition={idle ? { duration: 2.8, repeat: Infinity } : undefined}
      />
      <circle cx="82" cy="105" r="5" fill="white" />
      <circle cx="118" cy="105" r="5" fill="white" />
      <circle cx="83.5" cy="104" r="2" fill="#071525" />
      <circle cx="119.5" cy="104" r="2" fill="#071525" />
    </motion.svg>
  )
}

/** Commercial / business strategy mascot */
export function OriBusiness({ className, animate = true }: MascotProps) {
  const idle = useIdle(animate)

  return (
    <motion.svg
      viewBox="0 0 200 200"
      fill="none"
      className={cn('h-full w-full', className)}
      aria-hidden
      animate={idle ? { y: [0, -5, 0] } : undefined}
      transition={idle ? { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 } : undefined}
    >
      <circle cx="100" cy="100" r="78" fill="#eef2f8" />
      <rect x="58" y="78" width="28" height="70" rx="3" fill="#1a428a" />
      <rect x="92" y="58" width="32" height="90" rx="3" fill="#0d2248" />
      <rect x="130" y="92" width="24" height="56" rx="3" fill="#4da3ff" />
      {[88, 100, 112, 124].map((y) => (
        <rect key={y} x="98" y={y} width="8" height="6" rx="1" fill="#F5B942" opacity="0.9" />
      ))}
      <motion.path
        d="M48 150 H162"
        stroke="#1a428a"
        strokeWidth="4"
        strokeLinecap="round"
        animate={idle ? { opacity: [0.5, 1, 0.5] } : undefined}
        transition={idle ? { duration: 2.2, repeat: Infinity } : undefined}
      />
      <circle cx="70" cy="70" r="6" fill="white" />
      <circle cx="108" cy="50" r="6" fill="white" />
      <circle cx="142" cy="84" r="5" fill="white" />
      <circle cx="71.5" cy="69" r="2.2" fill="#071525" />
      <circle cx="109.5" cy="49" r="2.2" fill="#071525" />
      <circle cx="143.2" cy="83" r="2" fill="#071525" />
    </motion.svg>
  )
}

/** Utility-scale strategy mascot */
export function OriUtility({ className, animate = true }: MascotProps) {
  const idle = useIdle(animate)

  return (
    <motion.svg
      viewBox="0 0 200 200"
      fill="none"
      className={cn('h-full w-full', className)}
      aria-hidden
      animate={idle ? { y: [0, -4, 0] } : undefined}
      transition={idle ? { duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 } : undefined}
    >
      <circle cx="100" cy="100" r="78" fill="#e8f0fa" />
      <rect x="94" y="48" width="12" height="110" rx="2" fill="#071525" />
      <motion.path
        d="M100 70 L145 95 L100 95 Z"
        fill="#4da3ff"
        animate={idle ? { rotate: [0, 360] } : undefined}
        transition={idle ? { duration: 8, repeat: Infinity, ease: 'linear' } : undefined}
        style={{ transformOrigin: '100px 95px' }}
      />
      <motion.path
        d="M100 70 L55 95 L100 95 Z"
        fill="#1a428a"
        animate={idle ? { rotate: [0, 360] } : undefined}
        transition={idle ? { duration: 8, repeat: Infinity, ease: 'linear' } : undefined}
        style={{ transformOrigin: '100px 95px' }}
      />
      <circle cx="100" cy="95" r="8" fill="#F5B942" />
      <circle cx="100" cy="95" r="3.5" fill="white" />
      <path d="M70 158 H130" stroke="#1a428a" strokeWidth="6" strokeLinecap="round" />
      <circle cx="78" cy="140" r="5" fill="white" />
      <circle cx="122" cy="140" r="5" fill="white" />
      <circle cx="79.5" cy="139" r="2" fill="#071525" />
      <circle cx="123.5" cy="139" r="2" fill="#071525" />
    </motion.svg>
  )
}

/** Energy storage strategy mascot */
export function OriStorage({ className, animate = true }: MascotProps) {
  const idle = useIdle(animate)

  return (
    <motion.svg
      viewBox="0 0 200 200"
      fill="none"
      className={cn('h-full w-full', className)}
      aria-hidden
      animate={idle ? { y: [0, -6, 0] } : undefined}
      transition={idle ? { duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 } : undefined}
    >
      <circle cx="100" cy="100" r="78" fill="#f0f5fb" />
      <rect x="62" y="68" width="76" height="78" rx="12" fill="#1a428a" />
      <rect x="88" y="58" width="24" height="12" rx="3" fill="#0d2248" />
      <motion.rect
        x="74"
        y="88"
        width="52"
        height="14"
        rx="3"
        fill="#F5B942"
        animate={idle ? { scaleX: [0.35, 1, 0.35], opacity: [0.6, 1, 0.6] } : undefined}
        transition={idle ? { duration: 2.6, repeat: Infinity, ease: 'easeInOut' } : undefined}
        style={{ transformOrigin: '74px 95px' }}
      />
      <rect x="74" y="112" width="52" height="10" rx="2" fill="#4da3ff" opacity="0.7" />
      <circle cx="84" cy="140" r="5" fill="white" />
      <circle cx="116" cy="140" r="5" fill="white" />
      <circle cx="85.5" cy="139" r="2" fill="#071525" />
      <circle cx="117.5" cy="139" r="2" fill="#071525" />
      <path d="M90 152 Q100 160 110 152" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </motion.svg>
  )
}

export const strategyMascots = {
  home: OriHome,
  business: OriBusiness,
  utility: OriUtility,
  storage: OriStorage,
} as const
