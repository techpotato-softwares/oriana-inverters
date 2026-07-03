'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/utilities/ui'

export function EnergyMesh({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frame = 0
    let animationId: number

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      // Subtle energy wave lines inspired by Oriana logo
      for (let i = 0; i < 5; i++) {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(77, 163, 255, ${0.08 + i * 0.02})`
        ctx.lineWidth = 1.5

        for (let x = 0; x <= w; x += 4) {
          const y =
            h * 0.45 +
            Math.sin(x * 0.008 + frame * 0.015 + i * 1.2) * (40 + i * 12) +
            Math.sin(x * 0.003 + frame * 0.01) * 20
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      // Grid dots
      const spacing = 48
      for (let x = 0; x < w; x += spacing) {
        for (let y = 0; y < h; y += spacing) {
          const dist = Math.hypot(x - w / 2, y - h / 2)
          const alpha = Math.max(0, 0.15 - dist / w)
          ctx.fillStyle = `rgba(110, 200, 255, ${alpha})`
          ctx.fillRect(x, y, 1.5, 1.5)
        }
      }

      frame++
      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
      aria-hidden
    />
  )
}
