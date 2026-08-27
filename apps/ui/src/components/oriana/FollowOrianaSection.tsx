'use client'

import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'

export type FollowSocialLink = {
  platform: 'linkedin' | 'instagram' | 'facebook' | 'x' | 'youtube'
  href: string
  label: string
}

export type FollowOrianaSectionProps = {
  title?: string
  links: FollowSocialLink[]
  ariaLabel?: string
  className?: string
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const iconByPlatform = {
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  x: XIcon,
} as const

export function FollowOrianaSection({
  title = 'Follow Oriana Inverter',
  links,
  ariaLabel = 'Follow Oriana on social media',
  className = '',
}: FollowOrianaSectionProps) {
  if (!links.length) return null

  return (
    <section className={`bg-white py-16 lg:py-20 ${className}`.trim()} aria-label={ariaLabel}>
      <div className="container text-center">
        <h2 className="font-display text-2xl font-medium tracking-tight text-oriana-muted md:text-3xl">
          {title}
        </h2>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-10 md:gap-14">
          {links.map((link) => {
            const Icon = iconByPlatform[link.platform]
            return (
              <li key={link.platform}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="inline-flex text-oriana-muted transition hover:text-oriana-blue"
                >
                  <Icon className="h-8 w-8 md:h-9 md:w-9" />
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
