import type { File, Payload } from 'payload'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { caseStudies } from '@/data/caseStudies'
import { staticDistributors } from '@/data/distributors'
import { megaMenus, primaryNav } from '@/config/navigation'
import { footerNav, socialLinks } from '@/config/footer'
import { seedProducts } from './products'
import {
  staticAbout,
  staticCareers,
  staticCertifications,
  staticContact,
  staticContentPages,
  staticFaqGroups,
  staticHome,
  staticJobs,
  staticPageIntros,
  staticPartners,
  staticSolutions,
  staticSupport,
  staticSustainability,
  staticSustainabilityReports,
  staticVideos,
  staticWarranty,
  staticWhereToBuy,
} from '@/data/siteContent'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const publicAssets = path.resolve(dirname, '../../../public/assets')

const seedOpts = { overrideAccess: true as const, context: { disableRevalidate: true } }

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function isRetryable(error: unknown): boolean {
  const text = String(error) + (error && typeof error === 'object' && 'cause' in error ? String((error as { cause: unknown }).cause) : '')
  return (
    text.includes('timeout exceeded when trying to connect') ||
    text.includes('EMAXCONNSESSION') ||
    text.includes('too many clients') ||
    text.includes('Connection terminated') ||
    text.includes('ECONNRESET') ||
    text.includes('ETIMEDOUT')
  )
}

async function withRetry<T>(label: string, fn: () => Promise<T>, attempts = 5): Promise<T> {
  let last: unknown
  for (let i = 1; i <= attempts; i++) {
    try {
      return await fn()
    } catch (error) {
      last = error
      if (!isRetryable(error) || i === attempts) break
      const wait = 2000 * i
      console.warn(`[seed] ${label} failed (attempt ${i}/${attempts}), retrying in ${wait}ms…`)
      await sleep(wait)
    }
  }
  throw last
}

function readAsset(relativePath: string, mimetype: string): File | null {
  const filePath = path.join(publicAssets, relativePath)
  if (!fs.existsSync(filePath)) return null
  const data = fs.readFileSync(filePath)
  return {
    name: path.basename(relativePath),
    data,
    mimetype,
    size: data.byteLength,
  }
}

async function upsertMedia(
  payload: Payload,
  filename: string,
  relativePath: string,
  mimetype: string,
): Promise<number | undefined> {
  try {
    return await withRetry(`media:${filename}`, async () => {
      const existing = await payload.find({
        collection: 'media',
        where: { filename: { equals: filename } },
        limit: 1,
        ...seedOpts,
      })
      if (existing.docs[0]) return existing.docs[0].id as number

      const file = readAsset(relativePath, mimetype)
      if (!file) {
        payload.logger.warn(`Asset not found: ${relativePath}`)
        return undefined
      }

      const doc = await payload.create({
        collection: 'media',
        data: { alt: filename.replace(/\.[^.]+$/, '') },
        file,
        ...seedOpts,
      })
      return doc.id as number
    })
  } catch (error) {
    payload.logger.warn(`Skipping media ${filename} after retries: ${String(error)}`)
    return undefined
  }
}

export async function seedSite({ payload }: { payload: Payload }) {
  payload.logger.info('— Seeding Oriana site content...')

  // Session-mode poolers often time out on media uploads from CI — skip by default.
  // Set SEED_SKIP_MEDIA=false to upload assets into the media collection.
  const skipMedia = process.env.SEED_SKIP_MEDIA !== 'false'
  const mediaIds: Record<string, number | undefined> = {}

  if (skipMedia) {
    payload.logger.info(
      '— Skipping media uploads (SEED_SKIP_MEDIA); frontend uses public /assets paths',
    )
  } else {
    const mediaFiles: [string, string, string][] = [
      ['single-phase.svg', 'products/single-phase.svg', 'image/svg+xml'],
      ['three-phase.svg', 'products/three-phase.svg', 'image/svg+xml'],
      ['utility-scale.svg', 'products/utility-scale.svg', 'image/svg+xml'],
      ['hybrid-storage.svg', 'products/hybrid-storage.svg', 'image/svg+xml'],
      ['careers.svg', 'illustrations/careers.svg', 'image/svg+xml'],
      ['sustainability.svg', 'illustrations/sustainability.svg', 'image/svg+xml'],
      ['logo-light.png', 'logo-light.png', 'image/png'],
    ]
    for (const [filename, rel, mime] of mediaFiles) {
      mediaIds[filename] = await upsertMedia(payload, filename, rel, mime)
      await sleep(300)
    }
  }

  // Site settings
  await withRetry('global:site-settings', () =>
    payload.updateGlobal({
      slug: 'site-settings',
      data: {
        brandName: 'Oriana Inverters',
        supportEmail: 'support@orianainverters.com',
        infoEmail: 'info@orianainverters.com',
        securityEmail: 'security@orianainverters.com',
        privacyEmail: 'privacy@orianainverters.com',
        hotline: '+1 (800) ORIANA-1',
        defaultMetaTitle: 'Oriana Inverters | Solar Inverter & Energy Storage Solutions',
        defaultMetaDescription:
          'High-efficiency solar inverters and storage platforms for residential, commercial, and utility projects worldwide.',
      },
      ...seedOpts,
    }),
  )

  // Header
  await payload.updateGlobal({
    slug: 'header',
    data: {
      hotlineLabel: 'Customer Hotline:',
      hotline: '+1 (800) ORIANA-1',
      languageLabel: 'USA · English',
      searchPlaceholder: 'Search',
      loginLabel: 'Login',
      loginHref: '/admin',
      whereToBuyLabel: 'Where to Buy',
      whereToBuyHref: '/where-to-buy',
      quoteLabel: 'Request Quote',
      quoteHref: '/contact',
      ...(mediaIds['logo-light.png'] ? { logo: mediaIds['logo-light.png'] } : {}),
      logoAlt: 'Oriana Inverters',
      navMenus: primaryNav.map((key) => {
        const menu = megaMenus[key]
        return {
          key,
          label: menu.label,
          columns: menu.columns.map((col) => ({
            title: col.title,
            href: col.href,
            links: col.links.map((l) => ({ label: l.label, href: l.href })),
          })),
        }
      }),
    },
    ...seedOpts,
  })

  // Footer
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      columns: footerNav.map((col) => ({
        title: col.title,
        links: col.links.map((l) => ({ label: l.label, href: l.href })),
      })),
      socialLinks: socialLinks.map((s) => ({ label: s.label, href: s.href })),
      legalLinks: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Disclaimer', href: '/disclaimer' },
        { label: 'Terms of Use', href: '/terms' },
      ],
      copyright: '© {year} Oriana Inverters. All rights reserved.',
    },
    ...seedOpts,
  })

  // Page globals
  await payload.updateGlobal({ slug: 'home', data: staticHome as never, ...seedOpts })
  await payload.updateGlobal({ slug: 'about', data: staticAbout as never, ...seedOpts })
  await payload.updateGlobal({ slug: 'contact', data: staticContact as never, ...seedOpts })
  await payload.updateGlobal({
    slug: 'careers',
    data: {
      ...staticCareers,
      why: {
        ...staticCareers.why,
        ...(mediaIds['careers.svg'] ? { image: mediaIds['careers.svg'] } : {}),
      },
    } as never,
    ...seedOpts,
  })
  await payload.updateGlobal({ slug: 'support', data: staticSupport as never, ...seedOpts })
  await payload.updateGlobal({ slug: 'warranty', data: staticWarranty as never, ...seedOpts })
  await payload.updateGlobal({
    slug: 'sustainability',
    data: {
      ...staticSustainability,
      approach: {
        ...staticSustainability.approach,
        ...(mediaIds['sustainability.svg']
          ? { image: mediaIds['sustainability.svg'] }
          : {}),
      },
    } as never,
    ...seedOpts,
  })
  await payload.updateGlobal({
    slug: 'sustainability-reports',
    data: staticSustainabilityReports as never,
    ...seedOpts,
  })
  await payload.updateGlobal({ slug: 'where-to-buy', data: staticWhereToBuy as never, ...seedOpts })
  await payload.updateGlobal({ slug: 'page-intros', data: staticPageIntros as never, ...seedOpts })

  // Solutions
  payload.logger.info('— Seeding solutions...')
  const solutionImageMap: Record<string, string> = {
    residential: 'single-phase.svg',
    commercial: 'three-phase.svg',
    utility: 'utility-scale.svg',
    storage: 'hybrid-storage.svg',
  }
  for (const sol of staticSolutions) {
    const existing = await payload.find({
      collection: 'solutions',
      where: { slug: { equals: sol.slug } },
      limit: 1,
      ...seedOpts,
    })
    const data = {
      ...sol,
      ...(mediaIds[solutionImageMap[sol.slug]]
        ? { image: mediaIds[solutionImageMap[sol.slug]] }
        : {}),
    }
    if (existing.docs[0]) {
      await payload.update({ collection: 'solutions', id: existing.docs[0].id, data, ...seedOpts })
    } else {
      await payload.create({ collection: 'solutions', data, ...seedOpts })
    }
  }

  // Case studies
  payload.logger.info('— Seeding case studies...')
  const caseImageMap: Record<string, string> = {
    '/assets/products/three-phase.svg': 'three-phase.svg',
    '/assets/products/utility-scale.svg': 'utility-scale.svg',
    '/assets/products/hybrid-storage.svg': 'hybrid-storage.svg',
  }
  for (const cs of caseStudies) {
    const existing = await payload.find({
      collection: 'case-studies',
      where: { slug: { equals: cs.slug } },
      limit: 1,
      ...seedOpts,
    })
    const data = {
      title: cs.title,
      slug: cs.slug,
      segment: cs.segment,
      capacity: cs.capacity,
      products: cs.products,
      productSlugs: cs.productSlugs.map((slug) => ({ slug })),
      location: cs.location,
      year: cs.year,
      imageUrl: cs.image,
      ...(mediaIds[caseImageMap[cs.image] || '']
        ? { image: mediaIds[caseImageMap[cs.image] || ''] }
        : {}),
      summary: cs.summary,
      challenge: cs.challenge,
      solution: cs.solution,
      results: cs.results.map((text) => ({ text })),
      stats: cs.stats,
    }
    if (existing.docs[0]) {
      await payload.update({ collection: 'case-studies', id: existing.docs[0].id, data, ...seedOpts })
    } else {
      await payload.create({ collection: 'case-studies', data, ...seedOpts })
    }
  }

  // FAQs
  payload.logger.info('— Seeding FAQs...')
  for (const group of staticFaqGroups) {
    const existing = await payload.find({
      collection: 'faqs',
      where: { title: { equals: group.title } },
      limit: 1,
      ...seedOpts,
    })
    if (existing.docs[0]) {
      await payload.update({ collection: 'faqs', id: existing.docs[0].id, data: group, ...seedOpts })
    } else {
      await payload.create({ collection: 'faqs', data: group, ...seedOpts })
    }
  }

  // Videos
  payload.logger.info('— Seeding videos...')
  for (const video of staticVideos) {
    const existing = await payload.find({
      collection: 'videos',
      where: { title: { equals: video.title } },
      limit: 1,
      ...seedOpts,
    })
    if (existing.docs[0]) {
      await payload.update({ collection: 'videos', id: existing.docs[0].id, data: video, ...seedOpts })
    } else {
      await payload.create({ collection: 'videos', data: video, ...seedOpts })
    }
  }

  // Jobs
  payload.logger.info('— Seeding jobs...')
  for (const job of staticJobs) {
    const existing = await payload.find({
      collection: 'jobs',
      where: { title: { equals: job.title } },
      limit: 1,
      ...seedOpts,
    })
    const data = { ...job, applyUrl: '/contact', active: true }
    if (existing.docs[0]) {
      await payload.update({ collection: 'jobs', id: existing.docs[0].id, data, ...seedOpts })
    } else {
      await payload.create({ collection: 'jobs', data, ...seedOpts })
    }
  }

  // Partners
  payload.logger.info('— Seeding partners...')
  for (const partner of staticPartners) {
    const existing = await payload.find({
      collection: 'partners',
      where: {
        and: [{ name: { equals: partner.name } }, { category: { equals: partner.category } }],
      },
      limit: 1,
      ...seedOpts,
    })
    if (existing.docs[0]) {
      await payload.update({ collection: 'partners', id: existing.docs[0].id, data: partner, ...seedOpts })
    } else {
      await payload.create({ collection: 'partners', data: partner, ...seedOpts })
    }
  }

  // Certifications
  payload.logger.info('— Seeding certifications...')
  for (const cert of staticCertifications) {
    const existing = await payload.find({
      collection: 'certifications',
      where: {
        and: [{ name: { equals: cert.name } }, { kind: { equals: cert.kind } }],
      },
      limit: 1,
      ...seedOpts,
    })
    if (existing.docs[0]) {
      await payload.update({
        collection: 'certifications',
        id: existing.docs[0].id,
        data: cert,
        ...seedOpts,
      })
    } else {
      await payload.create({ collection: 'certifications', data: cert, ...seedOpts })
    }
  }

  // Distributors
  payload.logger.info('— Seeding distributors...')
  for (const d of staticDistributors) {
    const existing = await payload.find({
      collection: 'distributors',
      where: { externalId: { equals: d.id } },
      limit: 1,
      ...seedOpts,
    })
    const data = {
      externalId: d.id,
      name: d.name,
      type: d.type,
      city: d.city,
      state: d.state,
      country: d.country,
      region: d.region,
      email: d.email,
      phone: d.phone,
    }
    if (existing.docs[0]) {
      await payload.update({ collection: 'distributors', id: existing.docs[0].id, data, ...seedOpts })
    } else {
      await payload.create({ collection: 'distributors', data, ...seedOpts })
    }
  }

  // Content pages
  payload.logger.info('— Seeding content pages...')
  for (const page of staticContentPages) {
    const existing = await payload.find({
      collection: 'content-pages',
      where: { slug: { equals: page.slug } },
      limit: 1,
      ...seedOpts,
    })
    if (existing.docs[0]) {
      await payload.update({
        collection: 'content-pages',
        id: existing.docs[0].id,
        data: page,
        ...seedOpts,
      })
    } else {
      await payload.create({ collection: 'content-pages', data: page, ...seedOpts })
    }
  }

  // Catalogue
  await seedProducts({ payload })

  payload.logger.info('✓ Oriana site seed complete')
}
