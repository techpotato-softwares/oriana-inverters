import type { Metadata } from 'next'
import { SupportAudiencePage } from '@/components/oriana/support/SupportAudiencePage'
import { defaultHomeownersPage as defaults } from '@/components/oriana/support/supportData'
import { getSupport } from '@/utilities/getMarketing'
import { resolveAudiencePage, resolveMeta } from '@/utilities/cmsContent'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSupport()
  return resolveMeta(data?.homeowners?.meta, defaults.meta)
}

export default async function HomeownersSupportPage() {
  const data = await getSupport()
  return <SupportAudiencePage content={resolveAudiencePage(data?.homeowners, defaults)} />
}
