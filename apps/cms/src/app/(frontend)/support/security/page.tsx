import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ContentPage } from '@/components/oriana/ContentPage'
import { getContentPageBySlug } from '@/utilities/getSiteContent'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContentPageBySlug('security')
  return {
    title: content?.seo?.metaTitle ?? content?.title,
    description: content?.seo?.metaDescription ?? content?.description,
  }
}

export default async function SecurityPage() {
  const content = await getContentPageBySlug('security')
  if (!content) notFound()

  return (
    <>
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
      <section className="border-t border-oriana-navy/8 bg-oriana-silver/40 py-10">
        <div className="container max-w-3xl text-center">
          <p className="text-sm text-oriana-muted">Need immediate assistance?</p>
          <Link
            href="/contact"
            className="mt-4 inline-block rounded-full bg-oriana-blue px-8 py-3 text-sm font-bold text-white hover:bg-oriana-navy"
          >
            Contact Security Team
          </Link>
        </div>
      </section>
    </>
  )
}
