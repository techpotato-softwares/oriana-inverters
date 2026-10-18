/**
 * Shared helpers to seed Support / Sustainability / About globals
 * (hub + all CMS subpage tabs) from site defaults.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import type { Payload } from 'payload'

import { buildAboutGlobalData, type AboutSeedImages } from './aboutDefaults'
import {
  buildSustainabilityGlobalData,
  type SustainabilitySeedImages,
} from './sustainabilityDefaults'
import { buildSupportGlobalData, type SupportSeedImages } from './supportDefaults'

export type MarketingPage = 'support' | 'sustainability' | 'about'

export const ALL_MARKETING_PAGES: MarketingPage[] = ['support', 'sustainability', 'about']

const filename = fileURLToPath(import.meta.url)
const uiAssetsRoot = path.resolve(path.dirname(filename), '../../../../../ui/public/assets')

async function uploadLocal(
  payload: Payload,
  relativePath: string,
  alt: string,
): Promise<number | string | null> {
  const fullPath = path.join(uiAssetsRoot, relativePath)
  if (!fs.existsSync(fullPath)) {
    payload.logger.warn(`Asset missing: ${fullPath}`)
    return null
  }
  const data = fs.readFileSync(fullPath)
  const name = path.basename(fullPath)
  try {
    const doc = await payload.create({
      collection: 'media',
      data: { alt, mediaType: 'image' } as never,
      file: {
        data,
        mimetype: name.endsWith('.png') ? 'image/png' : 'image/jpeg',
        name,
        size: data.length,
      },
      overrideAccess: true,
      context: { disableRevalidate: true },
    })
    return doc.id
  } catch (err) {
    payload.logger.warn(`Upload failed for ${relativePath}: ${err}`)
    return null
  }
}

function isFilled(value: unknown): boolean {
  return typeof value === 'string' && value.trim().length > 0
}

async function seedSupport(payload: Payload, force: boolean): Promise<'seeded' | 'skipped'> {
  const existing = await payload.findGlobal({ slug: 'support', depth: 0 })
  const alreadyFilled = isFilled(existing?.hub?.hero?.title)
  if (alreadyFilled && !force) {
    payload.logger.info(
      'Support global already has hub hero copy. Re-run with --force to replace all tabs.',
    )
    return 'skipped'
  }

  payload.logger.info('Seeding Support Pages (hub + warranty + security + all sections)…')
  const hero = await uploadLocal(payload, 'heroes/solutions.jpg', 'Support hero — solar field')
  const warranty = await uploadLocal(payload, 'heroes/warranty.jpg', 'Warranty hero')
  const downloads = await uploadLocal(payload, 'heroes/downloads.jpg', 'Resources feature')
  const caseStudies = await uploadLocal(payload, 'heroes/case-studies.jpg', 'Case studies')
  const contact = await uploadLocal(payload, 'heroes/contact-team.jpg', 'Service story')
  const installers = await uploadLocal(payload, 'heroes/installers.jpg', 'Field service')
  const faqs = await uploadLocal(payload, 'heroes/faqs.jpg', 'Support capability')

  const images: SupportSeedImages = {
    hero,
    warranty,
    security: contact,
    resourceFeature: downloads,
    strength: [hero, faqs, contact, installers, warranty, downloads],
    approach: [installers, faqs, contact, warranty],
    story: [caseStudies, installers, contact, faqs, hero],
    cases: [hero, caseStudies, installers, downloads],
  }

  await payload.updateGlobal({
    slug: 'support',
    data: buildSupportGlobalData(images) as never,
    overrideAccess: true,
    draft: false,
    context: { disableRevalidate: true },
  })
  return 'seeded'
}

async function seedSustainability(
  payload: Payload,
  force: boolean,
): Promise<'seeded' | 'skipped'> {
  const existing = await payload.findGlobal({ slug: 'sustainability', depth: 0 })
  const alreadyFilled = isFilled(existing?.hero?.title)
  if (alreadyFilled && !force) {
    payload.logger.info(
      'Sustainability global already has hub hero copy. Re-run with --force to replace hub + strategy tabs.',
    )
    return 'skipped'
  }

  payload.logger.info('Seeding Sustainability Pages (hub + strategy)…')
  const poster = await uploadLocal(payload, 'heroes/solutions.jpg', 'Sustainability hero')
  const pillarA = await uploadLocal(payload, 'heroes/case-studies.jpg', 'Sustainability pillar')
  const pillarB = await uploadLocal(payload, 'heroes/installers.jpg', 'Manufacturing')
  const pillarC = await uploadLocal(payload, 'heroes/faqs.jpg', 'Communities')
  const pillarD = await uploadLocal(payload, 'heroes/warranty.jpg', 'Circularity')
  const cta = await uploadLocal(payload, 'heroes/contact-team.jpg', 'Sustainability CTA')

  const images: SustainabilitySeedImages = {
    heroPoster: poster,
    pillar: [pillarA, pillarB, pillarC, pillarD],
    cta,
  }

  await payload.updateGlobal({
    slug: 'sustainability',
    data: buildSustainabilityGlobalData(images) as never,
    overrideAccess: true,
    draft: false,
    context: { disableRevalidate: true },
  })
  return 'seeded'
}

async function seedAbout(payload: Payload, force: boolean): Promise<'seeded' | 'skipped'> {
  const existing = await payload.findGlobal({ slug: 'about', depth: 0 })
  const alreadyFilled = isFilled(existing?.hero?.title)
  if (alreadyFilled && !force) {
    payload.logger.info(
      'About global already has hub hero copy. Re-run with --force to replace hub + all subpage tabs.',
    )
    return 'skipped'
  }

  payload.logger.info(
    'Seeding About Pages (hub + brand story + vision/mission + achievements + certifications + partners + foundation)…',
  )
  const aboutHero = await uploadLocal(payload, 'heroes/solutions.jpg', 'About hero')
  const brandStory = await uploadLocal(payload, 'heroes/case-studies.jpg', 'Brand story hero')
  const vision = await uploadLocal(payload, 'heroes/faqs.jpg', 'Vision & mission hero')
  const achievements = await uploadLocal(payload, 'heroes/warranty.jpg', 'Achievements hero')
  const certifications = await uploadLocal(
    payload,
    'heroes/downloads.jpg',
    'Certifications hero',
  )
  const partners = await uploadLocal(payload, 'heroes/installers.jpg', 'Partners hero')
  const foundation = await uploadLocal(payload, 'heroes/contact-team.jpg', 'Foundation hero')

  const images: AboutSeedImages = {
    hero: aboutHero,
    brandStory,
    visionMission: vision,
    achievements,
    certifications,
    partners,
    foundation,
  }

  await payload.updateGlobal({
    slug: 'about',
    data: buildAboutGlobalData(images) as never,
    overrideAccess: true,
    draft: false,
    context: { disableRevalidate: true },
  })
  return 'seeded'
}

export function parseMarketingPages(argv: string[]): MarketingPage[] {
  const pagesArg = argv.find((a) => a.startsWith('--pages='))
  const fromEnv = process.env.SEED_PAGES?.trim()
  const raw = pagesArg?.slice('--pages='.length) || fromEnv || 'support,sustainability,about'
  const requested = raw
    .split(',')
    .map((p) => p.trim().toLowerCase())
    .filter(Boolean)

  if (requested.includes('all')) return [...ALL_MARKETING_PAGES]

  const pages = requested.filter((p): p is MarketingPage =>
    (ALL_MARKETING_PAGES as string[]).includes(p),
  )
  return pages.length > 0 ? pages : [...ALL_MARKETING_PAGES]
}

export async function seedMarketingGlobals(
  payload: Payload,
  opts: { pages: MarketingPage[]; force: boolean },
): Promise<Record<MarketingPage, 'seeded' | 'skipped' | 'not-requested'>> {
  const result: Record<MarketingPage, 'seeded' | 'skipped' | 'not-requested'> = {
    support: 'not-requested',
    sustainability: 'not-requested',
    about: 'not-requested',
  }

  for (const page of opts.pages) {
    if (page === 'support') result.support = await seedSupport(payload, opts.force)
    if (page === 'sustainability')
      result.sustainability = await seedSustainability(payload, opts.force)
    if (page === 'about') result.about = await seedAbout(payload, opts.force)
  }

  return result
}
