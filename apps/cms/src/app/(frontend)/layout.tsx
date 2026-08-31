import type { Metadata } from 'next'
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google'
import React from 'react'

import { ChunkLoadRecovery } from '@/components/ChunkLoadRecovery'
import { SiteAnalytics, SiteAnalyticsNoscript } from '@/components/SiteAnalytics'
import { SiteFooter } from '@/components/oriana/SiteFooter'
import { SiteHeader } from '@/components/oriana/SiteHeader'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getCatalogueNav, getProductsMegaMenu, uniqueProductsMegaMenuImageUrls } from '@/utilities/getCatalogue'
import { getHeaderNav } from '@/utilities/getMarketing'
import { getSiteSettings } from '@/utilities/getSiteSettings'
import { partnersMegaMenuCategories } from '@/config/navigation'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

// Catalogue mega-menu must reflect live CMS data, not an empty build-time snapshot.
export const dynamic = 'force-dynamic'

function preloadImageType(href: string): string | undefined {
  const path = href.split('?')[0]?.toLowerCase() ?? ''
  if (path.endsWith('.png')) return 'image/png'
  if (path.endsWith('.webp')) return 'image/webp'
  if (path.endsWith('.jpg') || path.endsWith('.jpeg')) return 'image/jpeg'
  if (path.endsWith('.svg')) return 'image/svg+xml'
  return undefined
}

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
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '48x48' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    },
    manifest: '/site.webmanifest',
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [catalogueMenu, settings, headerNav, productsMegaMenu] = await Promise.all([
    getCatalogueNav(),
    getSiteSettings(),
    getHeaderNav(),
    getProductsMegaMenu(),
  ])

  const nav = {
    ...headerNav,
    mainNav: headerNav.mainNav.map((item) => {
      if (item.type === 'products') return { ...item, categories: productsMegaMenu }
      if (item.type === 'partners') return { ...item, categories: partnersMegaMenuCategories }
      return item
    }),
  }

  const megaMenuImageHrefs: string[] = uniqueProductsMegaMenuImageUrls(productsMegaMenu)
  const firstCategoryImageHrefs = new Set(
    uniqueProductsMegaMenuImageUrls(productsMegaMenu.slice(0, 1)),
  )

  return (
    <html
      className={`${jakarta.variable} ${outfit.variable}`}
      lang="en"
      data-theme="light"
      suppressHydrationWarning
    >
      <head>
        <link href="/favicon.ico" rel="icon" sizes="48x48" />
        <link href="/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
        <link href="/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
        <link href="/site.webmanifest" rel="manifest" />
        {megaMenuImageHrefs.map((href) => {
          const type = preloadImageType(href)
          return (
            <link
              key={href}
              rel="preload"
              as="image"
              href={href}
              {...(type ? { type } : {})}
              fetchPriority={firstCategoryImageHrefs.has(href) ? 'high' : 'auto'}
            />
          )
        })}
        <SiteAnalytics
          googleAnalyticsId={settings.googleAnalyticsId}
          googleTagManagerId={settings.googleTagManagerId}
        />
      </head>
      <body className="font-sans antialiased">
        <SiteAnalyticsNoscript googleTagManagerId={settings.googleTagManagerId} />
        <div className="sr-only" aria-hidden="true">
          {megaMenuImageHrefs.map((src) => (
            <img
              key={src}
              src={src}
              alt=""
              width={320}
              height={208}
              loading="eager"
              decoding="async"
              fetchPriority={firstCategoryImageHrefs.has(src) ? 'high' : 'auto'}
            />
          ))}
        </div>
        <Providers>
          <ChunkLoadRecovery />
          <SiteHeader catalogueMenu={catalogueMenu} nav={nav} />
          {children}
          <SiteFooter settings={settings} />
        </Providers>
      </body>
    </html>
  )
}
