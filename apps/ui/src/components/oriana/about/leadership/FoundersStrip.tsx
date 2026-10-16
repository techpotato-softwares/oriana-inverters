import { Linkedin } from 'lucide-react'

import { Stagger, StaggerItem } from '@/components/oriana/FadeIn'
import { LeaderPortrait } from '@/components/oriana/about/leadership/LeaderPortrait'
import type { Leader } from '@/components/oriana/about/leadership/leadershipData'

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
              <div className="relative aspect-[4/5] max-h-[min(14rem,36svh)] w-full overflow-hidden rounded-2xl bg-white [@media(max-height:52rem)]:aspect-[3/4]">
                <LeaderPortrait
                  leader={leader}
                  sizes="(min-width: 1024px) 14vw, 30vw"
                  className="object-cover object-[50%_8%]"
                  initialsClassName="text-2xl text-oriana-blue/30"
                />
              </div>
              <figcaption className="mt-3">
                <span className="flex items-center gap-1.5 font-display text-[clamp(0.8rem,1.8svh,1rem)] font-semibold leading-5 text-oriana-deep">
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
