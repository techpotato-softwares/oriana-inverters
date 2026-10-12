'use client'

import type { ReactNode } from 'react'

import { OrriMascot } from '@/components/oriana/mascot/OrriMascot'

/** Form confirmation with Orri celebrating the submission. */
export function OrriSuccess({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div
      role="status"
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-oriana-surface via-white to-oriana-sky/20 p-8 text-center ring-1 ring-oriana-navy/8 sm:p-10"
    >
      <div
        aria-hidden
        className="absolute left-1/2 top-6 h-44 w-44 -translate-x-1/2 rounded-full bg-oriana-sky/25 blur-3xl"
      />
      <OrriMascot pose="cheer" immediate priority className="relative mx-auto w-36 sm:w-44" sizes="176px" />
      <p className="relative mt-6 font-display text-2xl font-semibold text-oriana-deep">{title}</p>
      <div className="relative mx-auto mt-2 max-w-md text-pretty text-oriana-muted">{children}</div>
    </div>
  )
}
