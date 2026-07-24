'use client'

import { useInView, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'

type AnimatedCounterProps = {
  value: string
  className?: string
}

/** Parses strings like "1M+", "99.6%", "25+", "3" and animates numeric parts. */
export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/)

  if (!match || reduce) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    )
  }

  const [, prefix, numStr, suffix] = match
  const target = parseFloat(numStr)
  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0

  return (
    <span ref={ref} className={className}>
      <CountingNumber
        prefix={prefix}
        target={target}
        suffix={suffix}
        decimals={decimals}
        active={inView}
      />
    </span>
  )
}

function CountingNumber({
  prefix,
  target,
  suffix,
  decimals,
  active,
}: {
  prefix: string
  target: number
  suffix: string
  decimals: number
  active: boolean
}) {
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { stiffness: 60, damping: 20 })
  const displayRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (active) motionValue.set(target)
  }, [active, motionValue, target])

  useEffect(() => {
    const unsubscribe = spring.on('change', (latest) => {
      if (displayRef.current) {
        displayRef.current.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`
      }
    })
    return unsubscribe
  }, [spring, prefix, suffix, decimals])

  return (
    <span ref={displayRef}>
      {prefix}
      {decimals > 0 ? (0).toFixed(decimals) : '0'}
      {suffix}
    </span>
  )
}
