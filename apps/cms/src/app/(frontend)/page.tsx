import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import {
  CaseStudiesSection,
  GlobalReachSection,
  ImpactStats,
  NewsEventsSection,
  SupportDownloadStrip,
} from '@/components/oriana/HomeSections'
import { FollowOrianaSection } from '@/components/oriana/FollowOrianaSection'
import { GreenMissionSection } from '@/components/oriana/GreenMissionSection'
import { IntroductionSection } from '@/components/oriana/IntroductionSection'
import { PeekStackImages } from '@/components/oriana/PeekStackImages'
import { ProductCategoriesSection } from '@/components/oriana/ProductCategoriesSection'
import { VideoHero } from '@/components/oriana/VideoHero'
import { VisionMissionSection } from '@/components/oriana/VisionMissionSection'
import { WhyChooseOrianaSection } from '@/components/oriana/WhyChooseOrianaSection'
import { getHome, getCaseStudies } from '@/utilities/getMarketing'
import type { CaseStudy } from '@/data/caseStudies'

const HOME_VIDEO_HERO = {
  videoSrc: '/assets/clone/hero-dummy.mp4',
  posterSrc:
    'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1920&q=80',
  captions: [
    'Clean power that crosses borders',
    'To power that transforms businesses',
    'Energy platforms partners trust',
  ],
}

const HOME_INTRODUCTION = {
  title: 'Introduction',
  paragraphs: [
    'At Oriana, we are building the next generation of solar inverter technology with a focus on efficiency, reliability, intelligent performance, and long-term value.',
    "Backed by industry experience and a strong understanding of India's solar ecosystem, Oriana Inverters are designed to meet the evolving requirements of residential, commercial, industrial, and utility-scale solar applications.",
  ],
  tagline: 'Built in India. Designed for the Future.',
}

const HOME_PEEK_IMAGES = [
  {
    id: 'home',
    title: 'For Home',
    href: '/solutions/residential',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 'business',
    title: 'For Business',
    href: '/solutions/commercial',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 'utility',
    title: 'For Utility',
    href: '/solutions/utility',
    image:
     'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 'storage',
    title: 'For Storage',
    href: '/solutions/storage',
    image:
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1920&q=80',
  },
]

const HOME_VISION_MISSION = [
  {
    id: 'vision',
    label: 'Our Vision',
    body: 'To become a globally trusted solar inverter brand, powering a smarter, cleaner, and more sustainable energy future.',
    image:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1920&q=80',
    href: '/about',
    ctaLabel: 'Explore more',
  },
  {
    id: 'mission',
    label: 'Our Mission',
    body: 'To deliver innovative, reliable, and high-performance solar inverters through advanced technology, precision manufacturing, and exceptional customer service.',
    image:
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1920&q=80',
    href: '/about',
    ctaLabel: 'Explore more',
  },
]

const HOME_IMPACT = {
  title: 'Our Impact',
  body: 'As a trusted solar inverter brand, we are committed to powering India\'s clean energy transition through advanced technology, nationwide reach, and exceptional customer support.',
  link: { label: 'Discover who we are', href: '/about' },
  stats: [
    { iconKey: 'award', value: '10+', label: 'Solar industry project experience' },
    { iconKey: 'map', value: 'PAN India', label: 'Market presence' },
    { iconKey: 'zap', value: 'GW+', label: 'Inverter distribution & experience' },
    { iconKey: 'building', value: '500+', label: 'Channel & service partners' },
    { iconKey: 'leaf', value: '99.6%', label: 'Peak conversion efficiency' },
  ],
}

const HOME_PRODUCT_CATEGORIES = [
  {
    id: 'residential',
    label: 'Residential Inverters',
    href: '/products/category/residential-grid-tied',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
    alt: 'Residential rooftop solar installation',
  },
  {
    id: 'commercial',
    label: 'Commercial & Industrial Inverters',
    href: '/products/category/ci-grid-tied',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
    alt: 'Commercial building with solar power',
  },
  {
    id: 'utility',
    label: 'Utility-Scale Inverters',
    href: '/products/category/utility-grid-tied',
    image:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1920&q=80',
    alt: 'Utility-scale solar farm',
  },
  {
    id: 'bess',
    label: 'BESS',
    href: '/products/category/ci-hybrid',
    image:
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1920&q=80',
    alt: 'Battery energy storage system',
  },
]

const HOME_WHY_CHOOSE = {
  title: 'Why Choose Oriana Inverters?',
  body: 'Oriana Inverters brings together advanced power electronics, intelligent technology, and precision engineering to deliver reliable solar power solutions for homes, businesses, and large-scale applications.',
  cards: [
    {
      id: 'expertise',
      title: 'Solar Industry Expertise',
      href: '/about',
      image:
        'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1400&q=80',
      alt: 'Solar industry expertise',
    },
    {
      id: 'ai-tech',
      title: 'AI Technology Driven',
      href: '/about',
      image:
        'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1400&q=80',
      alt: 'AI technology driven solutions',
    },
    {
      id: 'quality',
      title: 'Quality Focused',
      href: '/about/certifications',
      image:
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=80',
      alt: 'Quality focused manufacturing',
    },
    {
      id: 'application',
      title: 'Application Focused',
      href: '/products',
      image:
        'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1400&q=80',
      alt: 'Application focused solar solutions',
    },
    {
      id: 'service',
      title: 'Professional Service',
      href: '/support',
      image:
        'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80',
      alt: 'Professional customer service',
    },
  ],
}

const HOME_GREEN_MISSION = {
  title: 'Green Mission. Greener World',
  image:
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80',
  alt: 'Lush green landscape representing sustainability',
  href: '/sustainability',
  ctaLabel: 'Explore more',
}

const HOME_FOLLOW_ORIANA = {
  title: 'Follow Oriana Inverter',
  links: [
    {
      platform: 'linkedin' as const,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/oriana-inverters',
    },
    {
      platform: 'instagram' as const,
      label: 'Instagram',
      href: 'https://www.instagram.com/orianainverters',
    },
    {
      platform: 'facebook' as const,
      label: 'Facebook',
      href: 'https://www.facebook.com/orianainverters',
    },
    {
      platform: 'x' as const,
      label: 'X',
      href: 'https://x.com/orianainverters',
    },
    {
      platform: 'youtube' as const,
      label: 'YouTube',
      href: 'https://www.youtube.com/@orianainverters',
    },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const { home } = await getHome()
  return {
    title: home?.seo?.metaTitle || 'Oriana Inverters | Solar Inverter & Energy Storage Solutions',
    description:
      home?.seo?.metaDescription ||
      'Oriana manufactures high-efficiency string, hybrid, and utility-scale solar inverters for residential, commercial, and utility partners worldwide.',
  }
}

export default async function HomePage() {
  const { home } = await getHome()
  const caseStudyDocs = await getCaseStudies()

  let livePosts: { title: string; slug: string; publishedAt?: string | null }[] = []
  if (home?.newsSection?.mode !== 'manual') {
    try {
      const payload = await getPayload({ config: configPromise })
      const result = await payload.find({
        collection: 'posts',
        depth: 0,
        limit: home?.newsSection?.postsLimit || 3,
        where: { _status: { equals: 'published' } },
        sort: '-publishedAt',
      })
      livePosts = result.docs
    } catch {
      livePosts = []
    }
  }

  const reach = home?.reachSection
  const news = home?.newsSection
  const support = home?.supportStrip
  const caseSec = home?.caseStudiesSection

  const studies: CaseStudy[] = (caseStudyDocs as Array<Record<string, unknown>>)
    .slice(0, caseSec?.limit || 3)
    .map((doc) => ({
      slug: String(doc.slug || ''),
      title: String(doc.title || ''),
      segment: String(doc.segment || ''),
      capacity: String(doc.capacity || ''),
      products: String(doc.products || ''),
      productSlugs: [],
      location: String(doc.location || ''),
      image: '',
      summary: String(doc.summary || ''),
      challenge: String(doc.challenge || ''),
      solution: String(doc.solution || ''),
      results: [],
      stats: [],
      year: String(doc.year || ''),
    }))

  const newsItems =
    news?.mode === 'manual' && news.manualItems?.length
      ? news.manualItems.map((item) => ({
          title: item.title || '',
          date: item.date || '',
          href: item.href || '/posts',
          type: item.type || 'News',
        }))
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
        }))

  return (
    <main className="bg-white">
      <VideoHero {...HOME_VIDEO_HERO} />
      <IntroductionSection {...HOME_INTRODUCTION} />
      <PeekStackImages images={HOME_PEEK_IMAGES} ariaLabel="Customer scenarios" />
      <VisionMissionSection cards={HOME_VISION_MISSION} />
      <ImpactStats
        title={HOME_IMPACT.title}
        body={HOME_IMPACT.body}
        link={HOME_IMPACT.link}
        stats={HOME_IMPACT.stats}
      />
      <ProductCategoriesSection categories={HOME_PRODUCT_CATEGORIES} />
      <WhyChooseOrianaSection
        title={HOME_WHY_CHOOSE.title}
        body={HOME_WHY_CHOOSE.body}
        cards={HOME_WHY_CHOOSE.cards}
      />
      <GreenMissionSection {...HOME_GREEN_MISSION} />
      <FollowOrianaSection title={HOME_FOLLOW_ORIANA.title} links={HOME_FOLLOW_ORIANA.links} />
      {/* <GlobalReachSection
        eyebrow={reach?.eyebrow ?? undefined}
        title={reach?.title ?? undefined}
        body={reach?.body ?? undefined}
        regions={reach?.regions?.map((r) => ({ name: r.name || '', focus: r.focus || '' }))}
        cta={reach?.cta?.href ? { label: reach.cta.label || '', href: reach.cta.href } : undefined}
      />
      <CaseStudiesSection
        eyebrow={caseSec?.eyebrow ?? undefined}
        title={caseSec?.title ?? undefined}
        link={
          caseSec?.link?.href
            ? { label: caseSec.link.label || '', href: caseSec.link.href }
            : undefined
        }
        studies={studies}
      /> */}
      <NewsEventsSection
        eyebrow={news?.eyebrow ?? undefined}
        title={news?.title ?? undefined}
        link={news?.link?.href ? { label: news.link.label || '', href: news.link.href } : undefined}
        items={newsItems}
      />
      {/* <SupportDownloadStrip
        hotlineNote={support?.hotlineNote ?? undefined}
        downloads={support?.downloads
          ?.filter((d): d is { label: string; href: string } => Boolean(d?.label && d?.href))
          .map((d) => ({ label: d.label, href: d.href }))}
        partner={
          support?.partnerCta
            ? {
                title: support.partnerCta.title ?? undefined,
                body: support.partnerCta.body ?? undefined,
                label: support.partnerCta.label || 'Request partnership',
                href: support.partnerCta.href || '/contact',
              }
            : undefined
        }
      /> */}
    </main>
  )
}
