'use client'

import { useCallback, useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { FadeIn } from '../FadeIn'

const stories = [
  {
    image:
      'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&q=80&w=1000',
    tag: 'Commissioning',
    title: 'Final checks before handover',
    description: 'Supporting site teams through commissioning and first-day performance review.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&q=80&w=1000',
    tag: 'Commercial',
    title: 'Rooftop project coordination',
    description: 'Technical coordination across EPC, electrical, and monitoring stakeholders.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=1000',
    tag: 'Residential',
    title: 'Guidance that reaches the homeowner',
    description: 'Clear explanations for installers and owners, without the jargon.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1000',
    tag: 'Remote service',
    title: 'Diagnosis before dispatch',
    description: 'Operating data reviewed remotely so a site visit is only made when it counts.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=1000',
    tag: 'Utility',
    title: 'Large plant performance reviews',
    description: 'Periodic health checks that protect generation across the asset lifetime.',
  },
]

export function ServiceStories() {
  const railRef = useRef<HTMLUListElement>(null)

  const scrollByCard = useCallback((direction: 1 | -1) => {
    const rail = railRef.current
    if (!rail) return
    const card = rail.querySelector('li')
    const amount = (card?.getBoundingClientRect().width ?? 320) + 20
    rail.scrollBy({ left: amount * direction, behavior: 'smooth' })
  }, [])

  return (
    <section id="service-stories" className="scroll-mt-40 overflow-hidden bg-white py-20 lg:py-28">
      <div className="container">
        <FadeIn className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-oriana-blue">
              <span className="h-px w-10 bg-oriana-blue/50" aria-hidden />
              Service stories
            </p>
            <h2
              className="mt-6 max-w-2xl font-display font-medium tracking-[-0.02em] text-oriana-navy"
              style={{ fontSize: 'clamp(2rem, 3.8vw, 3.5rem)', lineHeight: 1.08 }}
            >
              The work behind reliable solar performance
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous service stories"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-oriana-deep/15 text-oriana-navy transition-colors duration-300 hover:border-oriana-blue hover:bg-oriana-blue hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oriana-blue"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next service stories"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-oriana-deep/15 text-oriana-navy transition-colors duration-300 hover:border-oriana-blue hover:bg-oriana-blue hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oriana-blue"
            >
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </FadeIn>
      </div>

      <ul
        ref={railRef}
        className="mt-12 flex gap-5 overflow-x-auto overscroll-x-contain px-[max(1rem,5vw)] pb-6 lg:mt-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        /* Only touch is taken from Lenis — wheel stays with the page so vertical scroll never stalls here. */
        data-lenis-prevent-touch
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-x pan-y pinch-zoom',
        }}
      >
        {stories.map((story, index) => (
          <li
            key={story.title}
            className={`shrink-0 ${index % 2 === 1 ? 'lg:translate-y-10' : ''}`}
            style={{ scrollSnapAlign: 'start' }}
          >
            <article className="group relative h-[26rem] w-[78vw] overflow-hidden rounded-[1.75rem] bg-oriana-deep sm:h-[30rem] sm:w-[21rem] lg:h-[34rem] lg:w-[24rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={story.image}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(7,21,37,0.15) 0%, rgba(7,21,37,0.2) 40%, rgba(7,21,37,0.95) 100%)',
                }}
              />
              <div className="relative flex h-full flex-col justify-end p-7">
                <span className="inline-flex w-fit rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-white/85">
                  {story.tag}
                </span>
                <h3 className="mt-5 font-display text-2xl font-medium leading-snug text-white">
                  {story.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/70">{story.description}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
