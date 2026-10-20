import { formatDateTime } from '@/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <section className="relative isolate flex min-h-[min(72svh,var(--viewport-height))] items-end overflow-hidden bg-oriana-deep">
      <div className="absolute inset-0">
        {heroImage && typeof heroImage === 'object' ? (
          <Media
            fill
            priority
            imgClassName="object-cover object-center"
            className="absolute inset-0"
            size="100vw"
            resource={heroImage}
          />
        ) : null}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, rgba(7,21,37,0.9) 0%, rgba(7,21,37,0.62) 48%, rgba(7,21,37,0.28) 100%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-3/5"
          style={{
            background: 'linear-gradient(180deg, rgba(7,21,37,0) 0%, rgba(7,21,37,0.92) 100%)',
          }}
        />
      </div>

      <div className="container relative z-10 w-full pb-10 pt-[calc(var(--site-header-height,var(--header-offset))+1.25rem)] text-white">
        <div className="max-w-3xl">
          {categories?.some((category) => typeof category === 'object' && category !== null) ? (
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-oriana-sky">
              {categories.flatMap((category, index) => {
                if (typeof category !== 'object' || category === null) return []
                const label = category.title || 'Untitled category'
                const isLast = index === categories.length - 1
                return isLast ? [label] : [`${label}, `]
              })}
            </p>
          ) : null}

          <h1 className="font-display text-3xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>

          <div className="mt-6 flex flex-col gap-4 md:flex-row md:gap-16">
            {hasAuthors ? (
              <div className="flex flex-col gap-1">
                <p className="text-sm text-white/70">Author</p>
                <p className="text-white">{formatAuthors(populatedAuthors)}</p>
              </div>
            ) : null}
            {publishedAt ? (
              <div className="flex flex-col gap-1">
                <p className="text-sm text-white/70">Date Published</p>
                <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
