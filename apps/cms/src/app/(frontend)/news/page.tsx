import type { Metadata } from 'next'
import { getPayload } from 'payload'

import { CollectionArchive } from '@/components/CollectionArchive'
import { ComingSoon } from '@/components/oriana/ComingSoon'
import { AboutHero } from '@/components/oriana/about/shared/AboutHero'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { NewsPageNav } from '@/components/oriana/news/NewsPageNav'
import { heroImages } from '@/components/oriana/heroImages'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { PLACEHOLDER_POST_SLUGS } from '@/utilities/placeholderContent'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Newsroom',
  description: 'News, announcements, and updates from Oriana Inverters.',
}

export default async function NewsroomPage() {
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

  return (
    <main>
      <AboutHero
        eyebrow="News & Media"
        title="Newsroom"
        description="Company updates, product announcements, and stories from Oriana across India."
        media={{ kind: 'image', src: heroImages.content.src, alt: heroImages.content.alt }}
        primary={{ label: 'Contact media', href: '/contact' }}
        secondary={{ label: 'Case studies', href: '/case-studies' }}
        nav={<NewsPageNav />}
      />
      <Breadcrumbs items={[{ label: 'News', href: '/news' }, { label: 'Newsroom' }]} />

      <section className="section-safe-y">
        <div className="container">
          {posts.totalDocs === 0 ? (
            <div className="mx-auto max-w-3xl">
              <ComingSoon
                compact
                title="Newsroom coming soon"
                description="Articles and company updates will appear here once posts are published in the CMS."
                primaryHref="/contact"
                primaryLabel="Contact us"
                secondaryHref="/case-studies"
                secondaryLabel="Case studies"
              />
            </div>
          ) : (
            <>
              <div className="mb-8">
                <PageRange
                  collection="posts"
                  currentPage={posts.page}
                  limit={12}
                  totalDocs={posts.totalDocs}
                />
              </div>
              <CollectionArchive posts={posts.docs} />
              {posts.totalPages > 1 && posts.page ? (
                <div className="mt-12">
                  <Pagination page={posts.page} totalPages={posts.totalPages} />
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>
    </main>
  )
}
