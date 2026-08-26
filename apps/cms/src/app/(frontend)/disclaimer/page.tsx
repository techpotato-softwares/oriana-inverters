import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { ContentPage } from '@/components/oriana/ContentPage'
import type { ContentPageBlock, Page } from '@/payload-types'

export const metadata = {
  title: 'Disclaimer',
  description: 'Website disclaimer for Oriana Inverters product and marketing information.',
}

const fallbackSections = [
  {
    paragraphs: [
      'The information on this website is provided for general informational purposes only. While Oriana Inverters strives to keep content accurate and up to date, we make no warranties about completeness, reliability, or suitability for any purpose.',
    ],
  },
  {
    heading: 'Product Information',
    paragraphs: [
      'Specifications, images, and performance data are subject to change without notice. Always consult the official datasheet for the specific product model and serial number installed at your site.',
    ],
  },
  {
    heading: 'Third-Party Links',
    paragraphs: [
      'Links to external websites are provided for convenience. Oriana does not endorse and is not responsible for content on third-party sites.',
    ],
  },
]

async function getPublishedPageBySlug(slug: string): Promise<Page | null> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'pages',
      where: {
        and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }],
      },
      limit: 1,
      depth: 2,
    })
    return (result.docs[0] as Page | undefined) ?? null
  } catch {
    return null
  }
}

function sectionsFromPage(page: Page) {
  const block = page.layout?.find(
    (b): b is ContentPageBlock => b.blockType === 'contentPage',
  )
  if (!block?.sections?.length) return null
  return block.sections.map((s) => ({
    heading: s.heading || undefined,
    paragraphs: s.body
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean),
  }))
}

export default async function DisclaimerPage() {
  const page = await getPublishedPageBySlug('disclaimer')
  const sections = (page && sectionsFromPage(page)) || fallbackSections

  return (
    <ContentPage
      eyebrow="Legal"
      title={page?.title || 'Disclaimer'}
      description={
        page?.meta?.description || 'Important notices regarding information on this website.'
      }
      breadcrumb={[{ label: 'Disclaimer' }]}
      sections={sections}
    />
  )
}
