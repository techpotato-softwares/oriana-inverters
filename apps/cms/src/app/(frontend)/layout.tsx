import type { Metadata } from 'next'
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { ChunkLoadRecovery } from '@/components/ChunkLoadRecovery'
import { SiteAnalytics, SiteAnalyticsNoscript } from '@/components/SiteAnalytics'
import { SiteFooter } from '@/components/oriana/SiteFooter'
import { SiteHeader } from '@/components/oriana/SiteHeader'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getCatalogueNav } from '@/utilities/getCatalogue'
import { getSiteSettings } from '@/utilities/getSiteSettings'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

// Catalogue mega-menu must reflect live CMS data, not an empty build-time snapshot.
export const dynamic = 'force-dynamic'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return {
    metadataBase: new URL(getServerSideURL()),
    title: {
      default: settings.seoTitle,
      template: settings.seoTitleTemplate,
    },
    description: settings.seoDescription,
    openGraph: mergeOpenGraph({
      siteName: settings.siteName,
      title: settings.seoTitle,
      description: settings.seoDescription,
      images: settings.ogImageUrl ? [{ url: settings.ogImageUrl }] : undefined,
    }),
    twitter: {
      card: 'summary_large_image',
      creator: settings.twitterHandle,
    },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const [catalogueMenu, settings] = await Promise.all([getCatalogueNav(), getSiteSettings()])

  return (
    <html
      className={`${jakarta.variable} ${outfit.variable}`}
      lang="en"
      data-theme="light"
      suppressHydrationWarning
    >
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <SiteAnalytics
          googleAnalyticsId={settings.googleAnalyticsId}
          googleTagManagerId={settings.googleTagManagerId}
        />
      </head>
      <body className="font-sans antialiased">
        <SiteAnalyticsNoscript googleTagManagerId={settings.googleTagManagerId} />
        <Providers>
          <ChunkLoadRecovery />
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
          <SiteHeader catalogueMenu={catalogueMenu} hotline={settings.hotline} />
          {children}
          <SiteFooter settings={settings} />
        </Providers>
      </body>
    </html>
  )
}
