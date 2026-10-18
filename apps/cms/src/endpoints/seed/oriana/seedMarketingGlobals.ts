/**
 * Shared helpers to seed Support / Sustainability / About globals
 * (hub + all CMS subpage tabs) from site defaults.
 *
 * Media: reuse by filename → upload to S3 when S3_BUCKET is set → else keep
 * existing relation ids so force-seed never blanks working photos.
 */
import type { Payload } from 'payload'

import { buildAboutGlobalData, type AboutSeedImages } from './aboutDefaults'
import {
  buildSustainabilityGlobalData,
  type SustainabilitySeedImages,
} from './sustainabilityDefaults'
import { buildSupportGlobalData, type SupportSeedImages } from './supportDefaults'
import { mediaId, preferMedia, resolveSeedMedia } from './seedMedia'

export type MarketingPage = 'support' | 'sustainability' | 'about'

export const ALL_MARKETING_PAGES: MarketingPage[] = ['support', 'sustainability', 'about']

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

  const prev = existing as unknown as {
    hub?: { hero?: { image?: unknown } }
    warranty?: { hero?: { image?: unknown } }
    security?: { hero?: { image?: unknown } }
    resources?: { feature?: { image?: unknown } }
    strengths?: { items?: Array<{ image?: unknown }> }
    approach?: { steps?: Array<{ image?: unknown }> }
    stories?: { items?: Array<{ image?: unknown }> }
    cases?: { items?: Array<{ image?: unknown }> }
  } | null
  const keep = {
    hero: mediaId(prev?.hub?.hero?.image),
    warranty: mediaId(prev?.warranty?.hero?.image),
    security: mediaId(prev?.security?.hero?.image),
    resourceFeature: mediaId(prev?.resources?.feature?.image),
    strength: (prev?.strengths?.items ?? []).map((row) => mediaId(row?.image)),
    approach: (prev?.approach?.steps ?? []).map((row) => mediaId(row?.image)),
    story: (prev?.stories?.items ?? []).map((row) => mediaId(row?.image)),
    cases: (prev?.cases?.items ?? []).map((row) => mediaId(row?.image)),
  }

  const hero = preferMedia(
    await resolveSeedMedia(payload, 'heroes/solutions.jpg', 'Support hero — solar field', keep.hero),
    keep.hero,
  )
  const warranty = preferMedia(
    await resolveSeedMedia(payload, 'heroes/warranty.jpg', 'Warranty hero', keep.warranty),
    keep.warranty,
  )
  const downloads = preferMedia(
    await resolveSeedMedia(payload, 'heroes/downloads.jpg', 'Resources feature', keep.resourceFeature),
    keep.resourceFeature,
  )
  const caseStudies = preferMedia(
    await resolveSeedMedia(payload, 'heroes/case-studies.jpg', 'Case studies', keep.cases[0]),
    keep.cases[0],
  )
  const contact = preferMedia(
    await resolveSeedMedia(payload, 'heroes/contact-team.jpg', 'Service story', keep.security),
    keep.security,
  )
  const installers = preferMedia(
    await resolveSeedMedia(payload, 'heroes/installers.jpg', 'Field service', keep.approach[0]),
    keep.approach[0],
  )
  const faqs = preferMedia(
    await resolveSeedMedia(payload, 'heroes/faqs.jpg', 'Support capability', keep.strength[1]),
    keep.strength[1],
  )

  const images: SupportSeedImages = {
    hero,
    warranty,
    security: contact,
    resourceFeature: downloads,
    strength: [
      preferMedia(hero, keep.strength[0]),
      preferMedia(faqs, keep.strength[1]),
      preferMedia(contact, keep.strength[2]),
      preferMedia(installers, keep.strength[3]),
      preferMedia(warranty, keep.strength[4]),
      preferMedia(downloads, keep.strength[5]),
    ],
    approach: [
      preferMedia(installers, keep.approach[0]),
      preferMedia(faqs, keep.approach[1]),
      preferMedia(contact, keep.approach[2]),
      preferMedia(warranty, keep.approach[3]),
    ],
    story: [
      preferMedia(caseStudies, keep.story[0]),
      preferMedia(installers, keep.story[1]),
      preferMedia(contact, keep.story[2]),
      preferMedia(faqs, keep.story[3]),
      preferMedia(hero, keep.story[4]),
    ],
    cases: [
      preferMedia(hero, keep.cases[0]),
      preferMedia(caseStudies, keep.cases[1]),
      preferMedia(installers, keep.cases[2]),
      preferMedia(downloads, keep.cases[3]),
    ],
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

  const keepPoster = mediaId(existing?.image) ?? mediaId(existing?.hero?.image)
  const keepPillars = (existing?.pillars ?? []).map((row: { image?: unknown }) =>
    mediaId(row?.image),
  )
  const keepCta = mediaId(existing?.cta?.image)

  const poster = preferMedia(
    await resolveSeedMedia(payload, 'heroes/solutions.jpg', 'Sustainability hero', keepPoster),
    keepPoster,
  )
  const pillarA = preferMedia(
    await resolveSeedMedia(payload, 'heroes/case-studies.jpg', 'Sustainability pillar', keepPillars[0]),
    keepPillars[0],
  )
  const pillarB = preferMedia(
    await resolveSeedMedia(payload, 'heroes/installers.jpg', 'Manufacturing', keepPillars[1]),
    keepPillars[1],
  )
  const pillarC = preferMedia(
    await resolveSeedMedia(payload, 'heroes/faqs.jpg', 'Communities', keepPillars[2]),
    keepPillars[2],
  )
  const pillarD = preferMedia(
    await resolveSeedMedia(payload, 'heroes/warranty.jpg', 'Circularity', keepPillars[3]),
    keepPillars[3],
  )
  const cta = preferMedia(
    await resolveSeedMedia(payload, 'heroes/contact-team.jpg', 'Sustainability CTA', keepCta),
    keepCta,
  )

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

  const prev = existing as {
    hero?: { image?: unknown }
    brandStory?: { hero?: { image?: unknown } }
    visionMission?: { hero?: { image?: unknown } }
    achievements?: { hero?: { image?: unknown } }
    certifications?: { hero?: { image?: unknown } }
    partnersNetwork?: { hero?: { image?: unknown } }
    foundation?: { hero?: { image?: unknown }; programmes?: unknown[] }
    leadership?: { members?: unknown[] }
  } | null
  const keep: AboutSeedImages = {
    hero: mediaId(prev?.hero?.image),
    brandStory: mediaId(prev?.brandStory?.hero?.image),
    visionMission: mediaId(prev?.visionMission?.hero?.image),
    achievements: mediaId(prev?.achievements?.hero?.image),
    certifications: mediaId(prev?.certifications?.hero?.image),
    partners: mediaId(prev?.partnersNetwork?.hero?.image),
    foundation: mediaId(prev?.foundation?.hero?.image),
  }

  const images: AboutSeedImages = {
    hero: preferMedia(
      await resolveSeedMedia(payload, 'heroes/solutions.jpg', 'About hero', keep.hero),
      keep.hero,
    ),
    brandStory: preferMedia(
      await resolveSeedMedia(payload, 'heroes/case-studies.jpg', 'Brand story hero', keep.brandStory),
      keep.brandStory,
    ),
    visionMission: preferMedia(
      await resolveSeedMedia(payload, 'heroes/faqs.jpg', 'Vision & mission hero', keep.visionMission),
      keep.visionMission,
    ),
    achievements: preferMedia(
      await resolveSeedMedia(payload, 'heroes/warranty.jpg', 'Achievements hero', keep.achievements),
      keep.achievements,
    ),
    certifications: preferMedia(
      await resolveSeedMedia(
        payload,
        'heroes/certifications.jpg',
        'Certifications hero',
        keep.certifications,
      ),
      keep.certifications,
    ),
    partners: preferMedia(
      await resolveSeedMedia(payload, 'heroes/about-partners.jpg', 'Partners hero', keep.partners),
      keep.partners,
    ),
    foundation: preferMedia(
      await resolveSeedMedia(payload, 'heroes/foundation.jpg', 'Foundation hero', keep.foundation),
      keep.foundation,
    ),
  }

  const data = buildAboutGlobalData(images) as Record<string, unknown>

  // Preserve director portraits and foundation programmes (never wipe on text seed).
  const existingMembers = prev?.leadership?.members
  if (Array.isArray(existingMembers) && existingMembers.length > 0) {
    data.leadership = {
      ...(typeof data.leadership === 'object' && data.leadership ? data.leadership : {}),
      members: existingMembers,
    }
  }
  const existingProgrammes = prev?.foundation?.programmes
  if (Array.isArray(existingProgrammes) && existingProgrammes.length > 0) {
    data.foundation = {
      ...(typeof data.foundation === 'object' && data.foundation ? data.foundation : {}),
      programmes: existingProgrammes,
    }
  }

  await payload.updateGlobal({
    slug: 'about',
    data: data as never,
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

  const s3 = process.env.S3_BUCKET?.trim()
  if (s3) {
    payload.logger.info(`Media uploads target S3_BUCKET=${s3}`)
  } else {
    payload.logger.warn(
      'S3_BUCKET is unset — new media may only exist on local disk. CI will keep existing photo relations instead of uploading.',
    )
  }

  for (const page of opts.pages) {
    if (page === 'support') result.support = await seedSupport(payload, opts.force)
    if (page === 'sustainability')
      result.sustainability = await seedSustainability(payload, opts.force)
    if (page === 'about') result.about = await seedAbout(payload, opts.force)
  }

  return result
}
