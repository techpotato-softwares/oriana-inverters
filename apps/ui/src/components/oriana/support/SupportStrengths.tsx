import { FadeIn, Stagger, StaggerItem } from '../FadeIn'
import type { CardItem, Intro } from '../marketing/types'

/** Mosaic tile sizes, repeated every six items. */
const spans = [
  'lg:col-span-7 lg:row-span-2',
  'lg:col-span-5',
  'lg:col-span-5',
  'lg:col-span-5 lg:row-span-2',
  'lg:col-span-7',
  'lg:col-span-7',
]

export function SupportStrengths({ intro, items }: { intro: Intro; items: CardItem[] }) {
  return (
    <section id="our-strengths" className="scroll-mt-40 bg-white py-20 lg:py-28">
      <div className="container">
        <FadeIn className="mb-12 grid gap-8 lg:mb-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-oriana-blue">
              <span className="h-px w-10 bg-oriana-blue/50" aria-hidden />
              {intro.eyebrow}
            </p>
            <h2
              className="mt-6 max-w-xl text-balance font-display font-medium tracking-[-0.02em] text-oriana-navy"
              style={{ fontSize: 'clamp(2rem, 3.8vw, 3.5rem)', lineHeight: 1.08 }}
            >
              {intro.title}
            </h2>
          </div>
          {intro.description ? (
            <p className="max-w-xl text-base leading-8 text-oriana-muted lg:justify-self-end lg:text-lg">
              {intro.description}
            </p>
          ) : null}
        </FadeIn>

        <Stagger
          className="grid gap-4 sm:grid-cols-2 lg:auto-rows-[13.5rem] lg:grid-cols-12"
          stagger={0.07}
        >
          {items.map((item, index) => (
            <StaggerItem
              key={item.title}
              className={`${spans[index % spans.length]} min-h-[17rem] lg:min-h-0`}
            >
              <article className="group relative h-full overflow-hidden rounded-3xl bg-oriana-deep">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt=""
                  loading={index < 2 ? 'eager' : 'lazy'}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-95"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(7,21,37,0.05) 0%, rgba(7,21,37,0.35) 45%, rgba(7,21,37,0.92) 100%)',
                  }}
                />

                <div className="relative flex h-full flex-col justify-between p-6 lg:p-7">
                  <span className="font-display text-sm font-medium tracking-[0.2em] text-white/55">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div>
                    <span
                      aria-hidden
                      className="block h-px w-10 origin-left bg-oriana-sky transition-transform duration-500 ease-out group-hover:scale-x-[2.4]"
                    />
                    <h3
                      className="mt-4 max-w-sm font-display font-medium leading-snug text-white"
                      style={{ fontSize: 'clamp(1.15rem, 1.5vw, 1.6rem)' }}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-6 text-white/75 transition-all duration-500 ease-out lg:max-h-0 lg:-translate-y-1 lg:overflow-hidden lg:opacity-0 lg:group-hover:max-h-32 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                      {item.body}
                    </p>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
