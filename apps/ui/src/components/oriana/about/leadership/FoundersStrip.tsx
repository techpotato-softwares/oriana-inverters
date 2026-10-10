import Image from 'next/image'
import { Linkedin } from 'lucide-react'

import { Stagger, StaggerItem } from '@/components/oriana/FadeIn'
import { leaderInitials, type Leader } from '@/components/oriana/about/leadership/leadershipData'

/** Compact founder portraits for story sections. */
export function FoundersStrip({ leaders, label = 'Founded by' }: { leaders: Leader[]; label?: string }) {
  if (leaders.length === 0) return null
  return (
    <div className="rounded-3xl border border-oriana-navy/8 bg-oriana-surface p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-oriana-blue">{label}</p>
      <Stagger className="mt-5 grid grid-cols-3 gap-3 sm:gap-5" stagger={0.1}>
        {leaders.map((leader, index) => (
          <StaggerItem key={`${leader.name}-${index}`}>
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white">
                {leader.image ? (
                  <Image
                    src={leader.image}
                    alt={`Portrait of ${leader.name}`}
                    fill
                    sizes="(min-width: 1024px) 14vw, 30vw"
                    className="object-cover object-top"
                  />
                ) : (
                  <span
                    aria-hidden
                    className="absolute inset-0 flex items-center justify-center font-display text-2xl font-semibold text-oriana-blue/30"
                  >
                    {leaderInitials(leader.name)}
                  </span>
                )}
              </div>
              <figcaption className="mt-3">
                <span className="flex items-center gap-1.5 font-display text-sm font-semibold leading-5 text-oriana-deep sm:text-base">
                  {leader.linkedin ? (
                    <a
                      href={leader.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 underline-offset-4 hover:text-oriana-blue hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oriana-blue"
                    >
                      {leader.name}
                      <Linkedin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      <span className="sr-only">on LinkedIn (opens in a new tab)</span>
                    </a>
                  ) : (
                    leader.name
                  )}
                </span>
                <span className="mt-0.5 block text-xs leading-5 text-oriana-muted">{leader.role}</span>
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  )
}
