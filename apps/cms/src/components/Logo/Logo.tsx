import Image from 'next/image'
import React from 'react'

import { cn } from '@/utilities/ui'

interface Props {
  className?: string
  variant?: 'light' | 'dark' | 'auto'
  loading?: 'lazy' | 'eager'
  priority?: boolean
}

export const Logo = (props: Props) => {
  const { className, variant = 'light', loading = 'lazy', priority = false } = props

  // light = navy logo on white bg (default for light backgrounds)
  // dark = for use on navy backgrounds (inverted to white)
  const src = variant === 'dark' ? '/assets/logo-dark.png' : '/assets/logo-light.png'

  return (
    <Image
      alt="Oriana Inverters"
      width={190}
      height={98}
      priority={priority}
      {...(priority ? {} : { loading })}
      className={cn('h-11 w-auto md:h-14', className)}
      src={src}
    />
  )
}
