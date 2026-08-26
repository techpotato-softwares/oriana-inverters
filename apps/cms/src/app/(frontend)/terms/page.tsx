import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { ContentPage } from '@/components/oriana/ContentPage'
import type { ContentPageBlock, Page } from '@/payload-types'

export const metadata = {
  title: 'Terms of Use',
  description: 'Terms and conditions for using the Oriana Inverters website and digital services.',
}

const fallbackSections = [
  {
    heading: 'Acceptance of Terms',
    paragraphs: [
      'By accessing www.orianainverters.com you agree to these Terms of Use. If you do not agree, please discontinue use of this website.',
    ],
  },
  {
    heading: 'Website Content',
    paragraphs: [
      'Product specifications, images, and documentation on this site are for general reference. Always refer to the official datasheet for the product serial number installed at your site.',
      'Oriana reserves the right to update product information without prior notice. Nothing on this website constitutes a binding offer or warranty beyond published product documentation.',
    ],
  },
  {
    heading: 'Intellectual Property',
    paragraphs: [
      'All trademarks, logos, datasheets, and website content are owned by Oriana Inverters or its licensors. You may not reproduce materials without written permission.',
    ],
  },
  {
    heading: 'Limitation of Liability',
    paragraphs: [
      'Oriana is not liable for indirect or consequential damages arising from use of this website. Product warranties are governed by separate warranty documents supplied with each unit.',
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
    heading: s.heading,
    paragraphs: s.body
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean),
  }))
}

export default async function TermsPage() {
  const page = await getPublishedPageBySlug('terms')
  const sections = (page && sectionsFromPage(page)) || fallbackSections

  return (
    <ContentPage
      eyebrow="Legal"
      title={page?.title || 'Terms of Use'}
      description={page?.meta?.description || 'Last updated: January 2026'}
      breadcrumb={[{ label: 'Terms of Use' }]}
      sections={sections}
    />
  )
}
