import type { ReactNode } from 'react'

import { cn } from '@/utilities/ui'

type HeroFrameProps = {
  children: ReactNode
  /** Sibling page category menu — pinned to the hero foot. */
  footer?: ReactNode
  className?: string
}

/**
 * Full-bleed hero layout used sitewide: mid-frame copy, optional foot sub-nav.
 */
export function HeroFrame({ children, footer, className }: HeroFrameProps) {
  return (
    <div
      className={cn(
        'container hero-safe-top relative flex min-h-0 flex-1 flex-col pb-[clamp(1.25rem,4svh,2.5rem)]',
        className,
      )}
    >
      <div className="flex min-h-0 flex-1 flex-col justify-center">{children}</div>
      {footer ? <div className="mt-[clamp(1rem,2.5svh,1.75rem)] shrink-0">{footer}</div> : null}
    </div>
  )
}
