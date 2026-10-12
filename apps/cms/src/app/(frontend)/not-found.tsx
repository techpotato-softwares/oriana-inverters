import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { OrriMascot } from '@/components/oriana/mascot/OrriMascot'

export default function NotFound() {
  return (
    <main className="relative overflow-hidden bg-oriana-surface">
      <div
        aria-hidden
        className="absolute -right-32 top-1/3 h-[28rem] w-[28rem] rounded-full bg-oriana-sky/25 blur-3xl"
      />
      <div className="container hero-safe-top relative grid min-h-[100svh] items-center gap-10 pb-16 md:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-oriana-blue">Error 404</p>
          <h1
            className="mt-4 font-display font-medium tracking-[-0.02em] text-balance text-oriana-deep"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 4.25rem)', lineHeight: 1.05 }}
          >
            This page went off-grid.
          </h1>
          <p className="mt-5 max-w-md text-base leading-8 text-oriana-muted">
            Orri searched everywhere but couldn’t find it. Head back home or tell us what you were looking for.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-oriana-blue px-7 text-sm font-semibold text-white transition-colors duration-300 hover:bg-oriana-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oriana-blue"
            >
              Go to homepage
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-oriana-navy/15 px-7 text-sm font-semibold text-oriana-deep transition-colors duration-300 hover:border-oriana-blue hover:text-oriana-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oriana-blue"
            >
              Contact us
            </Link>
          </div>
        </div>
        <OrriMascot
          pose="point"
          immediate
          priority
          className="mx-auto w-48 sm:w-60 md:w-full md:max-w-xs"
          sizes="(min-width: 768px) 320px, 240px"
        />
      </div>
    </main>
  )
}
