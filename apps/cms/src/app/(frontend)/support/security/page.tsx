import type { Metadata } from 'next'
import Link from 'next/link'
import { ContentPage } from '@/components/oriana/ContentPage'
import { defaultSecurityPage as defaults } from '@/components/oriana/support/supportData'
import { getSupport } from '@/utilities/getMarketing'
import { resolveLink, resolveMeta, resolveText } from '@/utilities/cmsContent'

const PARAGRAPH_BREAK = /\n\s*\n/

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSupport()
  return resolveMeta(data?.security?.meta, defaults.meta)
}

export default async function SecurityPage() {
  const data = await getSupport()
  const cms = data?.security
  const sections = cms?.sections?.length
    ? cms.sections.map(({ heading, body }) => ({
        heading,
        paragraphs: body
          .split(PARAGRAPH_BREAK)
          .map((paragraph) => paragraph.trim())
          .filter(Boolean),
      }))
    : defaults.sections
  const cta = resolveLink(cms?.cta, defaults.cta)

  return (
    <>
      <ContentPage
        eyebrow={resolveText(cms?.hero?.eyebrow, defaults.hero.eyebrow)}
        title={resolveText(cms?.hero?.title, defaults.hero.title)}
        description={resolveText(cms?.hero?.description, defaults.hero.description)}
        breadcrumb={[{ label: 'Support', href: '/support' }, { label: 'Security' }]}
        sections={sections}
      />
      <section className="border-t border-oriana-navy/8 bg-oriana-silver/40 py-10">
        <div className="container max-w-3xl text-center">
          <p className="text-sm text-oriana-muted">
            {resolveText(cms?.ctaPrompt, defaults.ctaPrompt)}
          </p>
          <Link
            href={cta.href}
            className="mt-4 inline-block rounded-full bg-oriana-blue px-8 py-3 text-sm font-bold text-white hover:bg-oriana-deep"
          >
            {cta.label}
          </Link>
        </div>
      </section>
    </>
  )
}
