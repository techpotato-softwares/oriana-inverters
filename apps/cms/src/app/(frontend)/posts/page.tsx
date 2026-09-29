import type { Metadata } from 'next/types'
import React from 'react'
import { getPayload } from 'payload'

import { CollectionArchive } from '@/components/CollectionArchive'
import { ComingSoon } from '@/components/oriana/ComingSoon'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { PLACEHOLDER_POST_SLUGS } from '@/utilities/placeholderContent'
import PageClient from './page.client'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    where: {
      slug: { not_in: [...PLACEHOLDER_POST_SLUGS] },
    },
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  if (posts.totalDocs === 0) {
    return (
      <main>
        <ComingSoon
          eyebrow="News"
          title="News & Insights"
          description="Articles and updates will appear here once posts are published in the CMS."
          primaryHref="/contact#contact-form"
          primaryLabel="Contact us"
        />
      </main>
    )
  }

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Posts</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'News & Insights',
    description: 'News, insights, and updates from Oriana Inverters.',
  }
}
