import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { FadeIn } from './FadeIn'

const projects = [
  {
    title: 'Desert Sun Solar Farm',
    location: 'Arizona, USA',
    capacity: '120 MW',
    type: 'Utility-Scale',
    gradient: 'from-amber-500/30 via-orange-600/20 to-oriana-navy',
  },
  {
    title: 'Greenfield Industrial Park',
    location: 'Bavaria, Germany',
    capacity: '8.5 MW',
    type: 'Commercial',
    gradient: 'from-emerald-500/25 via-teal-600/15 to-oriana-navy',
  },
  {
    title: 'Harbor View Residences',
    location: 'California, USA',
    capacity: '2.4 MW',
    type: 'Residential Community',
    gradient: 'from-sky-500/30 via-blue-600/20 to-oriana-navy',
  },
]

export function ProjectsSection() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="container">
        <FadeIn className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-oriana-blue">Projects</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-oriana-navy md:text-5xl">
              Deployed Worldwide
            </h2>
          </div>
          <Link href="/posts" className="text-sm font-semibold text-oriana-blue hover:underline">
            Read case studies →
          </Link>
        </FadeIn>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {projects.map((project, i) => (
            <FadeIn key={project.title} delay={i * 0.1}>
              <article className="group overflow-hidden rounded-2xl border border-oriana-navy/8 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-oriana-navy/8">
                <div className={`relative flex h-52 items-end bg-gradient-to-br ${project.gradient} p-6`}>
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
                  <div className="relative">
                    <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      {project.type}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-oriana-navy group-hover:text-oriana-blue">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-oriana-muted">{project.location}</p>
                  <p className="mt-4 text-2xl font-bold text-oriana-blue">{project.capacity}</p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CTABanner() {
  return (
    <section className="bg-oriana-silver py-24">
      <div className="container">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl bg-oriana-navy px-8 py-16 text-center md:px-16 lg:py-20">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(77,163,255,0.12),transparent)]" />
            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-oriana-blue/20 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-oriana-sky/10 blur-3xl" />

            <div className="relative">
              <h2 className="font-display text-3xl font-bold text-white md:text-5xl">
                Ready to Power Your Next Project?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-white/60">
                Our engineering team provides system sizing, compliance guidance, and distributor
                connections — from first inquiry to commissioning.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-oriana-navy transition hover:bg-oriana-sky"
                >
                  Request a Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/products"
                  className="rounded-full border border-white/25 px-8 py-4 text-sm font-semibold text-white transition hover:border-oriana-sky"
                >
                  Browse Products
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
