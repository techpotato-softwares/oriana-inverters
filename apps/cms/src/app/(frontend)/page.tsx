import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { ImpactStats, NewsEventsSection } from '@/components/oriana/HomeSections'
import { FollowOrianaSection } from '@/components/oriana/FollowOrianaSection'
import { GreenMissionSection } from '@/components/oriana/GreenMissionSection'
import { IntroductionSection } from '@/components/oriana/IntroductionSection'
import { PeekStackImages } from '@/components/oriana/PeekStackImages'
import { ProductCategoriesSection } from '@/components/oriana/ProductCategoriesSection'
import { VideoHero } from '@/components/oriana/VideoHero'
import { VisionMissionSection } from '@/components/oriana/VisionMissionSection'
import { WhyChooseOrianaSection } from '@/components/oriana/WhyChooseOrianaSection'
import { HOME_SEO } from '@/data/homeFallback'
import { getHiddenCategorySlugs } from '@/utilities/getCatalogue'
import { metadataFromSeo } from '@/utilities/generateMeta'
import { getHome } from '@/utilities/getMarketing'
import { getSiteSettings } from '@/utilities/getSiteSettings'
import { mapHomePage } from '@/utilities/mapHomePage'

export async function generateMetadata(): Promise<Metadata> {
  const { home } = await getHome()
  return metadataFromSeo(home?.seo, {
    title: home?.seo?.metaTitle || HOME_SEO.metaTitle,
    description: home?.seo?.metaDescription || HOME_SEO.metaDescription,
    path: '/',
  })
}

export default async function HomePage() {
  const [{ home }, settings, hiddenCategorySlugs] = await Promise.all([
    getHome(),
    getSiteSettings(),
    getHiddenCategorySlugs(),
  ])
  const view = mapHomePage(home, settings.socialLinks, { hiddenCategorySlugs })

  let livePosts: {
    title: string
    slug: string
    publishedAt?: string | null
    heroImage?: unknown
  }[] = []
  const { news } = view
  if (news && news.mode !== 'manual') {
    try {
      const payload = await getPayload({ config: configPromise })
      const result = await payload.find({
        collection: 'posts',
        depth: 1,
        limit: news.postsLimit || 5,
        where: { _status: { equals: 'published' } },
        sort: '-publishedAt',
      })
      livePosts = result.docs
    } catch {
      livePosts = []
    }
  }

  const mediaUrl = (value: unknown): string | undefined => {
    if (value && typeof value === 'object' && 'url' in value && typeof value.url === 'string') {
      return value.url
    }
    return undefined
  }

  const newsItems =
    news?.mode === 'manual' && news.manualItems.length
      ? news.manualItems
      : livePosts.map((post) => ({
          title: post.title,
          date: post.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            : '',
          href: `/posts/${post.slug}`,
          type: 'News',
          image: mediaUrl(post.heroImage),
        }))

  return (
    <main className="bg-white">
      <VideoHero {...view.videoHero} />
      {view.introduction ? <IntroductionSection {...view.introduction} /> : null}
      <PeekStackImages images={view.peekImages} ariaLabel="Customer scenarios" />
      <VisionMissionSection cards={view.visionMission} />
      {view.impact ? (
        <ImpactStats
          title={view.impact.title}
          body={view.impact.body}
          link={view.impact.link}
          stats={view.impact.stats}
        />
      ) : null}
      {view.productCategories ? (
        <ProductCategoriesSection
          title={view.productCategories.title}
          categories={view.productCategories.categories}
        />
      ) : null}
      {view.whyChoose ? (
        <WhyChooseOrianaSection
          title={view.whyChoose.title}
          body={view.whyChoose.body}
          cards={view.whyChoose.cards}
        />
      ) : null}
      {view.greenMission ? <GreenMissionSection {...view.greenMission} /> : null}
      {news ? <NewsEventsSection title={news.title} link={news.link} items={newsItems} /> : null}
      {view.follow ? <FollowOrianaSection title={view.follow.title} links={view.follow.links} /> : null}
    </main>
  )
}
