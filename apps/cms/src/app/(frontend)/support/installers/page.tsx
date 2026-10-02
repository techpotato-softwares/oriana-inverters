import type { Metadata } from 'next'
import { SupportAudiencePage } from '@/components/oriana/support/SupportAudiencePage'
import { defaultInstallersPage as defaults } from '@/components/oriana/support/supportData'
import { getSupport } from '@/utilities/getMarketing'
import { resolveAudiencePage, resolveMeta } from '@/utilities/cmsContent'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSupport()
  return resolveMeta(data?.installers?.meta, defaults.meta)
}

export default async function InstallersSupportPage() {
  const data = await getSupport()
  return <SupportAudiencePage content={resolveAudiencePage(data?.installers, defaults)} />
}
