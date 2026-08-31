'use client'

import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'
import { FadeIn } from './FadeIn'
import { EnergyMesh } from './EnergyMesh'

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-oriana-navy">
      {/* Layered background */}
      <div className="absolute inset-0 bg-gradient-to-br from-oriana-navy via-[#0d2248] to-oriana-blue" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(77,163,255,0.18),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_10%_80%,rgba(26,66,138,0.4),transparent)]" />
      <EnergyMesh />

      {/* Decorative ring — evokes logo circle */}
      <div className="pointer-events-none absolute -right-32 top-1/4 h-[500px] w-[500px] rounded-full border border-oriana-sky/10" />
      <div className="pointer-events-none absolute -right-16 top-1/3 h-[380px] w-[380px] rounded-full border border-oriana-sky/5" />

      <div className="container relative z-10 pt-28 pb-20 lg:pt-44">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <FadeIn>
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-oriana-sky/20 bg-oriana-sky/5 px-5 py-2 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-oriana-sky opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-oriana-sky" />
                </span>
                <span className="text-sm font-medium text-oriana-sky">Next-Gen Power Conversion Technology</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl xl:text-7xl">
                Precision Inverters for the{' '}
                <span className="bg-gradient-to-r from-oriana-sky via-white to-oriana-sky bg-clip-text text-transparent">
                  Energy Revolution
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-7 max-w-lg text-lg leading-relaxed text-white/65">
                From rooftop residential systems to gigawatt-scale solar farms — Oriana delivers
                industry-leading efficiency, reliability, and intelligent monitoring.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/products"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-oriana-navy shadow-xl shadow-black/20 transition hover:bg-oriana-sky"
                >
                  Explore Products
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-sm font-semibold text-white transition hover:border-oriana-sky hover:text-oriana-sky"
                >
                  Request a Quote
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-10">
                {[
                  { value: '99.6%', label: 'Max Efficiency' },
                  { value: '1M+', label: 'Units Shipped' },
                  { value: '25+', label: 'Countries' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-2xl font-bold text-white md:text-3xl">{stat.value}</p>
                    <p className="mt-1 text-xs text-white/50">{stat.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Hero visual — product showcase card */}
          <FadeIn delay={0.2} direction="none" className="relative hidden lg:block">
            <div className="relative mx-auto aspect-square max-w-lg">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-oriana-blue/40 to-oriana-sky/10 blur-2xl" />
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-md">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-oriana-sky">Featured Series</p>
                  <h2 className="mt-2 font-display text-3xl font-bold text-white">OG6 Hybrid Series</h2>
                  <p className="mt-2 text-sm text-white/50">3.8 – 11.4 kW · Single Phase</p>
                </div>

                {/* Abstract inverter visual */}
                <div className="relative my-6 flex flex-1 items-center justify-center">
                  <div className="relative h-48 w-64 rounded-2xl bg-gradient-to-br from-oriana-navy to-oriana-blue shadow-2xl">
                    <div className="absolute inset-x-4 top-4 h-1 rounded-full bg-oriana-sky/60" />
                    <div className="absolute inset-x-4 top-8 flex gap-2">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-2 flex-1 rounded-sm bg-oriana-sky/30" />
                      ))}
                    </div>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                      <div className="h-16 w-16 rounded-full border-2 border-oriana-sky/40 bg-oriana-sky/10">
                        <div className="absolute inset-2 rounded-full border border-oriana-sky/60" />
                      </div>
                    </div>
                    {/* Glow */}
                    <div className="absolute -bottom-4 left-1/2 h-8 w-40 -translate-x-1/2 rounded-full bg-oriana-sky/30 blur-xl" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-6 text-center">
                    <div>
                      <p className="text-lg font-bold text-oriana-sky">98.7%</p>
                      <p className="text-xs text-white/40">Efficiency</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-oriana-sky">IP65</p>
                      <p className="text-xs text-white/40">Protection</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-oriana-sky">10yr</p>
                      <p className="text-xs text-white/40">Warranty</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 transition hover:bg-oriana-sky hover:text-oriana-navy"
                    aria-label="Watch product video"
                  >
                    <Play className="h-5 w-5 fill-current" />
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Bottom fade to white */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
