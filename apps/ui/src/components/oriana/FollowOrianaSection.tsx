'use client'

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

/** Brand marks — solid/glyph style like Sungrow’s gray social row. */
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="2.5" fill="currentColor" />
      <path
        fill="#fff"
        d="M7.2 9.6h2.15v7.2H7.2V9.6zm1.07-3.45a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM10.95 9.6h2.06v.98h.03c.29-.54 1-1.12 2.05-1.12 2.2 0 2.6 1.44 2.6 3.32v4.02h-2.15v-3.56c0-.85-.02-1.94-1.18-1.94-1.18 0-1.36.92-1.36 1.88v3.62h-2.15V9.6z"
      />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor" />
      <circle cx="12" cy="12" r="3.6" fill="none" stroke="#fff" strokeWidth="1.7" />
      <rect
        x="6.2"
        y="6.2"
        width="11.6"
        height="11.6"
        rx="3.4"
        fill="none"
        stroke="#fff"
        strokeWidth="1.7"
      />
      <circle cx="16.35" cy="7.65" r="1.05" fill="#fff" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="2.5" fill="currentColor" />
      <path
        fill="#fff"
        d="M13.4 18.5v-5.2h1.75l.26-2.03H13.4V9.97c0-.59.16-1 .99-1h1.05V7.14c-.18-.02-.8-.08-1.53-.08-1.51 0-2.55.92-2.55 2.62v1.46H9.4v2.03h1.96v5.33h2.04z"
      />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M23.5 6.2a3.02 3.02 0 0 0-2.13-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.37.56A3.02 3.02 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.13 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.37-.56a3.02 3.02 0 0 0 2.13-2.14A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.75 15.57V8.43L15.84 12l-6.09 3.57z" />
    </svg>
  )
}

const iconByPlatform = {
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  youtube: YouTubeIcon,
  x: XIcon,
} as const

export function FollowOrianaSection({
  title = 'Follow Oriana',
  links,
  ariaLabel = 'Follow Oriana on social media',
  className = '',
}: FollowOrianaSectionProps) {
  if (!links.length) return null

  return (
    <section className={`bg-white py-16 lg:py-20 ${className}`.trim()} aria-label={ariaLabel}>
      <div className="container text-center">
        <h2
          className="font-display font-medium tracking-tight text-[#606060]"
          style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
        >
          {title}
        </h2>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-8 md:mt-12 md:gap-12">
          {links.map((link) => {
            const Icon = iconByPlatform[link.platform]
            return (
              <li key={link.platform}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="inline-flex text-[#606060] transition-colors duration-200 hover:text-oriana-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oriana-blue/40 focus-visible:ring-offset-2"
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
