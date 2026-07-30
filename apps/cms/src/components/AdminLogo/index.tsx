import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: boolean
}

/** Compact logo for Payload admin sidebar */
export const Logo = (props: Props) => {
  const { className, loading = 'lazy', priority = false } = props

  return (
    <Image
      alt="Oriana Inverters"
      width={180}
      height={48}
      priority={priority}
      {...(priority ? {} : { loading })}
      className={clsx('h-8 w-auto', className)}
      src="/assets/logo-light.png"
    />
  )
}
