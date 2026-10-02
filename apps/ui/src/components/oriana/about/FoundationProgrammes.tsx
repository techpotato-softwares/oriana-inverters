import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { FadeIn, Stagger, StaggerItem } from '../FadeIn'
import type { CardItem, Intro, LinkItem } from '../marketing/types'

type FoundationProgrammesProps = {
  intro: Intro
  programmes: CardItem[]
  cta: LinkItem
}

export function FoundationProgrammes({ intro, programmes, cta }: FoundationProgrammesProps) {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container">
        <FadeIn className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            {intro.eyebrow ? (
              <p className="flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-oriana-blue">
                <span className="h-px w-10 bg-oriana-blue/50" aria-hidden />
                {intro.eyebrow}
              </p>
            ) : null}
            <h2
              className="mt-6 text-balance font-display font-medium tracking-[-0.02em] text-oriana-navy"
              style={{ fontSize: 'clamp(2rem, 3.8vw, 3.25rem)', lineHeight: 1.08 }}
            >
              {intro.title}
            </h2>
            {intro.description ? (
              <p className="mt-6 text-base leading-8 text-oriana-muted">{intro.description}</p>
            ) : null}
          </div>
          <Link
            href={cta.href}
            className="group inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-oriana-blue px-7 text-sm font-semibold text-white transition-colors duration-300 hover:bg-oriana-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oriana-blue"
          >
            {cta.label}
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </Link>
        </FadeIn>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {programmes.map((programme) => {
            const body = (
              <>
                {programme.image ? (
                  <div className="aspect-[4/3] overflow-hidden bg-oriana-silver">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={programme.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-xl font-medium text-oriana-navy">
                    {programme.title}
                  </h3>
                  {programme.body ? (
                    <p className="mt-3 text-sm leading-6 text-oriana-muted">{programme.body}</p>
                  ) : null}
                  {programme.href ? (
                    <span className="mt-auto pt-6 text-sm font-semibold text-oriana-blue">
                      {programme.linkLabel || 'Learn more'} →
                    </span>
                  ) : null}
                </div>
              </>
            )
            const className =
              'group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-oriana-deep/10 bg-oriana-surface'

            return (
              <StaggerItem key={programme.title} className="h-full">
                {programme.href ? (
                  <Link
                    href={programme.href}
                    className={`${className} transition-colors duration-300 hover:border-oriana-blue/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oriana-blue`}
                  >
                    {body}
                  </Link>
                ) : (
                  <div className={className}>{body}</div>
                )}
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
