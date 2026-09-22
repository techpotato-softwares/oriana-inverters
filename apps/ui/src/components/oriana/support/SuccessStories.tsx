import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { FadeIn, Stagger, StaggerItem } from '../FadeIn'

const categories = [
  {
    title: 'On-grid',
    description: 'Rooftop and ground-mount systems feeding the grid.',
    image:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1000',
    offset: '',
  },
  {
    title: 'Hybrid',
    description: 'Solar paired with storage for round-the-clock supply.',
    image:
      'https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&q=80&w=1000',
    offset: 'lg:translate-y-10',
  },
  {
    title: 'Utility',
    description: 'Large-scale plants engineered for long-term yield.',
    image:
      'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=1000',
    offset: '',
  },
  {
    title: 'BESS',
    description: 'Battery energy storage for resilience and peak control.',
    image:
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1000',
    offset: 'lg:translate-y-10',
  },
]

export function SuccessStories() {
  return (
    <section
      id="success-stories"
      className="relative scroll-mt-40 overflow-hidden bg-oriana-deep py-20 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-24 h-[32rem] w-[32rem] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(26,66,138,0.55) 0%, rgba(7,21,37,0) 70%)',
        }}
      />

      <div className="container relative">
        <FadeIn className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-oriana-sky">
              <span className="h-px w-10 bg-oriana-sky/60" aria-hidden />
              Cases &amp; stories
            </p>
            <h2
              className="mt-6 max-w-2xl font-display font-medium tracking-[-0.02em] text-white"
              style={{ fontSize: 'clamp(2rem, 3.8vw, 3.5rem)', lineHeight: 1.08 }}
            >
              Projects, by system type
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/70">
              Explore how Oriana inverters perform in the field as our case library grows across
              on-grid, hybrid, utility, and storage installations.
            </p>
          </div>
          <Link
            href="/case-studies"
            className="group inline-flex min-h-12 w-fit items-center gap-2 rounded-full border border-white/30 px-7 text-sm font-semibold text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-oriana-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            View all case studies
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </Link>
        </FadeIn>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:pb-10">
          {categories.map((category) => (
            <StaggerItem key={category.title} className={`h-full ${category.offset}`}>
              <Link
                href="/case-studies"
                className="group relative flex h-full min-h-[24rem] flex-col justify-end overflow-hidden rounded-[1.75rem] bg-oriana-navy/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:min-h-[28rem]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={category.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(7,21,37,0.1) 0%, rgba(7,21,37,0.3) 45%, rgba(7,21,37,0.94) 100%)',
                  }}
                />
                <div className="relative p-6 lg:p-7">
                  <span
                    aria-hidden
                    className="block h-px w-10 origin-left bg-oriana-sky transition-transform duration-500 ease-out group-hover:scale-x-[2.4]"
                  />
                  <div className="mt-4 flex items-center justify-between gap-4">
                    <h3 className="font-display text-xl font-medium text-white lg:text-2xl">
                      {category.title}
                    </h3>
                    <ArrowUpRight
                      className="h-5 w-5 text-white/70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-oriana-sky"
                      aria-hidden
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/70">{category.description}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
