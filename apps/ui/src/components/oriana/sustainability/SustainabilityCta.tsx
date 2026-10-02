import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'

import { FadeIn } from '@/components/oriana/FadeIn'
import type { SustainabilityCtaContent } from '@/components/oriana/sustainability/sustainabilityData'

export function SustainabilityCta({ content }: { content: SustainabilityCtaContent }) {
  const { title, body, primary, secondary, image, contactEmail } = content

  return (
    <section id="contact" aria-labelledby="sustainability-cta-heading" className="scroll-mt-24">
      <div className="relative isolate overflow-hidden bg-oriana-deep">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              'linear-gradient(100deg, rgba(7,21,37,0.92) 0%, rgba(7,21,37,0.7) 50%, rgba(7,21,37,0.35) 100%)',
          }}
        />
        <div className="container py-24 lg:py-36">
          <FadeIn>
            <h2
              id="sustainability-cta-heading"
              className="max-w-3xl font-display font-medium tracking-[-0.02em] text-balance text-white"
              style={{ fontSize: 'clamp(2rem, 4.2vw, 3.75rem)', lineHeight: 1.08 }}
            >
              {title}
            </h2>
            {body ? (
              <p className="mt-6 max-w-xl text-base leading-8 text-pretty text-white/75">{body}</p>
            ) : null}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={primary.href}
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-oriana-blue px-7 text-sm font-semibold text-white transition-colors duration-300 hover:bg-oriana-sky hover:text-oriana-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {primary.label}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
              {secondary ? (
                <Link
                  href={secondary.href}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/35 px-7 text-sm font-semibold text-white transition-colors duration-300 hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  {secondary.label}
                </Link>
              ) : null}
            </div>
            {contactEmail ? (
              <a
                href={`mailto:${contactEmail}`}
                className="mt-10 inline-flex items-center gap-2 text-sm text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <Mail className="h-4 w-4" aria-hidden />
                Questions for our ESG team? {contactEmail}
              </a>
            ) : null}
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
