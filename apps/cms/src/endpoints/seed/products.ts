import type { Payload, File } from 'payload'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { getCategoryPageCopy } from '@/data/categoryPageCopy'
import { staticCategories, staticProductFamilies } from '@/data/products'
import { getOnGridSeriesPageData } from '@/data/onGridProductPage'
import { productPageSeedData } from '@/utilities/mapProductPage'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const assetsDir = path.resolve(dirname, '../../../public/assets/products')

const seedOpts = { overrideAccess: true as const, context: { disableRevalidate: true } }

function readLocalImage(filename: string): File {
  const filePath = path.join(assetsDir, filename)
  const data = fs.readFileSync(filePath)
  const mimetype = filename.endsWith('.png')
    ? 'image/png'
    : filename.endsWith('.jpg') || filename.endsWith('.jpeg')
      ? 'image/jpeg'
      : 'image/svg+xml'
  return {
    name: filename,
    data,
    mimetype,
    size: data.byteLength,
  }
}

function minimalPdf(name: string): File {
  const data = Buffer.from(
    '%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[]/Count 0>>endobj\nxref\n0 3\ntrailer<</Root 1 0 R/Size 3>>\nstartxref\n9\n%%EOF\n',
  )
  return {
    name,
    data,
    mimetype: 'application/pdf',
    size: data.byteLength,
  }
}

const categoryImages: Record<string, string> = {
  'on-grid-inverters': 'segment-string.png',
  'hybrid-inverters': 'segment-string.png',
  'utility-scale-inverters': 'segment-cabinet.png',
  bess: 'segment-cabinet.png',
}

export async function seedProducts({ payload }: { payload: Payload }) {
  payload.logger.info('— Seeding product categories...')

  const categoryIds: Record<string, number> = {}
  const canUploadMedia = Boolean(process.env.S3_BUCKET)

  let sharedCategoryHeroId: number | undefined
  if (canUploadMedia) {
    try {
      const existingHero = await payload.find({
        collection: 'media',
        where: { filename: { equals: 'category-banner.png' } },
        limit: 1,
        ...seedOpts,
      })
      if (existingHero.docs[0]) {
        sharedCategoryHeroId = existingHero.docs[0].id
      } else {
        const hero = await payload.create({
          collection: 'media',
          data: {
            alt: 'Oriana product category banner',
            mediaType: 'image',
          },
          file: readLocalImage('category-banner.png'),
          ...seedOpts,
        })
        sharedCategoryHeroId = hero.id
      }
    } catch (error) {
      payload.logger.warn(
        `— Skipping category hero upload: ${error instanceof Error ? error.message : error}`,
      )
    }
  }

  for (const [index, cat] of staticCategories.entries()) {
    const existing = await payload.find({
      collection: 'categories',
      where: { slug: { equals: cat.slug } },
      limit: 1,
      ...seedOpts,
    })

    const copy = getCategoryPageCopy(cat.slug)
    const categoryData = {
      title: cat.title,
      description: cat.description,
      sortOrder: index * 10 + 10,
      introParagraphs: copy?.paragraphs.map((text) => ({ text })) ?? [],
      ...(sharedCategoryHeroId ? { heroImage: sharedCategoryHeroId } : {}),
    }

    if (existing.docs[0]) {
      categoryIds[cat.slug] = existing.docs[0].id
      await payload.update({
        collection: 'categories',
        id: existing.docs[0].id,
        data: categoryData,
        ...seedOpts,
      })
      continue
    }

    const doc = await payload.create({
      collection: 'categories',
      data: {
        ...categoryData,
        slug: cat.slug,
      },
      ...seedOpts,
    })

    categoryIds[cat.slug] = doc.id
  }

  payload.logger.info('— Seeding product families...')

  if (!staticProductFamilies.length) {
    payload.logger.info(
      '— No static product families to seed. Add families in Admin → Catalogue → Product families.',
    )
  }

  const canonicalSlugs = new Set(staticProductFamilies.map((family) => family.slug))

  for (const family of staticProductFamilies) {
    const existing = await payload.find({
      collection: 'products',
      where: {
        or: [{ slug: { equals: family.slug } }, { name: { equals: family.name } }],
      },
      limit: 50,
      ...seedOpts,
    })

    const preferred =
      existing.docs.find((doc) => doc.slug === family.slug) ?? existing.docs[0] ?? null

    let heroImageId: number | undefined =
      preferred?.heroImage && typeof preferred.heroImage === 'object'
        ? preferred.heroImage.id
        : typeof preferred?.heroImage === 'number'
          ? preferred.heroImage
          : undefined

    if (canUploadMedia && !heroImageId) {
      try {
        const imageFile = readLocalImage(categoryImages[family.categorySlug] ?? 'segment-string.png')
        const hero = await payload.create({
          collection: 'media',
          data: {
            alt: family.name,
            mediaType: 'image',
          },
          file: imageFile,
          ...seedOpts,
        })
        heroImageId = hero.id
      } catch (error) {
        payload.logger.warn(
          `— Skipping hero image for ${family.slug}: ${error instanceof Error ? error.message : error}`,
        )
      }
    }

    const data = {
      name: family.name,
      slug: family.slug,
      generateSlug: false,
      category: categoryIds[family.categorySlug],
      segment: family.segmentKey,
      shortDescription: family.description,
      powerRange: family.powerRange,
      efficiency: family.efficiency,
      phases: family.phases,
      warranty: family.warranty,
      modelSeries: family.modelSeries,
      featured: family.featured,
      keySpecs: family.specs.map((s) => ({ label: s.label, value: s.value })),
      capacityVariants: family.capacityVariants.map((variant) => ({
        modelNo: variant.modelNo,
        powerRange: variant.powerRange,
        slug: variant.slug,
        featured: variant.featured,
      })),
      productPage: productPageSeedData(
        family.productPage ?? getOnGridSeriesPageData(family.modelSeries),
      ),
      heroImage: canUploadMedia ? heroImageId : null,
      _status: 'published' as const,
    }

    if (preferred) {
      await payload.update({
        collection: 'products',
        id: preferred.id,
        data,
        ...seedOpts,
      })
    } else {
      await payload.create({
        collection: 'products',
        data,
        ...seedOpts,
      })
    }

    for (const doc of existing.docs) {
      if (preferred && doc.id === preferred.id) continue
      if (doc.name === family.name || !canonicalSlugs.has(doc.slug)) {
        await payload.delete({
          collection: 'products',
          id: doc.id,
          ...seedOpts,
        })
        payload.logger.info(`— Removed duplicate / legacy product ${doc.slug} (#${doc.id})`)
      }
    }
  }

  // Remove every product that is not a canonical family (old capacity SKUs, etc.).
  const leftovers = await payload.find({
    collection: 'products',
    depth: 0,
    limit: 500,
    pagination: false,
    ...seedOpts,
  })
  for (const doc of leftovers.docs) {
    if (canonicalSlugs.has(doc.slug)) continue
    await payload.delete({
      collection: 'products',
      id: doc.id,
      ...seedOpts,
    })
    payload.logger.info(`— Removed old capacity SKU / product ${doc.slug} (#${doc.id})`)
  }

  const canonicalCategorySlugs = new Set(staticCategories.map((cat) => cat.slug))
  const oldCategories = await payload.find({
    collection: 'categories',
    depth: 0,
    limit: 100,
    pagination: false,
    ...seedOpts,
  })
  for (const doc of oldCategories.docs) {
    if (canonicalCategorySlugs.has(doc.slug)) continue
    await payload.delete({
      collection: 'categories',
      id: doc.id,
      ...seedOpts,
    })
    payload.logger.info(`— Removed old category ${doc.slug} (#${doc.id})`)
  }

  payload.logger.info('— Seeding downloads...')

  const sampleDownloads = [
    { title: 'On Grid Inverters Datasheet', type: 'datasheet' as const },
    { title: 'Hybrid Inverters Datasheet', type: 'datasheet' as const },
    { title: 'Utility Scale Inverters Datasheet', type: 'datasheet' as const },
    { title: 'BESS Home Datasheet', type: 'datasheet' as const },
    { title: 'UL 1741 SA Certificate', type: 'certificate' as const },
    { title: 'ISO 9001 Quality Certificate', type: 'certificate' as const },
  ]

  for (const dl of sampleDownloads) {
    const existing = await payload.find({
      collection: 'downloads',
      where: { title: { equals: dl.title } },
      limit: 1,
      ...seedOpts,
    })

    if (existing.docs[0]) continue

    const fileDoc = await payload.create({
      collection: 'media',
      data: {
        alt: dl.title,
        mediaType: 'document',
      },
      file: minimalPdf(`${dl.title.replace(/\s+/g, '-').toLowerCase()}.pdf`),
      ...seedOpts,
    })

    await payload.create({
      collection: 'downloads',
      data: {
        title: dl.title,
        documentType: dl.type,
        file: fileDoc.id,
        locale: 'en',
      },
      ...seedOpts,
    })
  }
}
