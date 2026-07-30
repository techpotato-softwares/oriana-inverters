import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ContentPage } from '@/components/oriana/ContentPage'
import { getContentPageBySlug } from '@/utilities/getSiteContent'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContentPageBySlug('strategy')
  return {
    title: content?.seo?.metaTitle ?? content?.title,
    description: content?.seo?.metaDescription ?? content?.description,
  }
}

export default async function SustainabilityStrategyPage() {
  const content = await getContentPageBySlug('strategy')
  if (!content) notFound()

  return (
    <ContentPage
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
      breadcrumb={content.breadcrumb}
      sections={content.sections.map((s: { heading?: string; paragraphs: { text: string }[] }) => ({
        heading: s.heading,
        paragraphs: s.paragraphs.map((p: { text: string }) => p.text),
      }))}
    />
  )
}
