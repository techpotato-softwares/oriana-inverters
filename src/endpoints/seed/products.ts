import type { Payload, File } from 'payload'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { staticCategories, staticProducts } from '@/data/products'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const assetsDir = path.resolve(dirname, '../../../public/assets/products')

const seedOpts = { overrideAccess: true as const, context: { disableRevalidate: true } }

function readLocalSvg(filename: string): File {
  const filePath = path.join(assetsDir, filename)
  const data = fs.readFileSync(filePath)
  return {
    name: filename,
    data,
    mimetype: 'image/svg+xml',
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
  'single-phase': 'single-phase.svg',
  'three-phase': 'three-phase.svg',
  'utility-scale': 'utility-scale.svg',
  'energy-storage': 'hybrid-storage.svg',
  accessories: 'accessories.svg',
}

export async function seedProducts({ payload }: { payload: Payload }) {
  payload.logger.info('— Seeding product categories...')

  const categoryIds: Record<string, number> = {}

  for (const cat of staticCategories) {
    const existing = await payload.find({
      collection: 'categories',
      where: { slug: { equals: cat.slug } },
      limit: 1,
      ...seedOpts,
    })

    if (existing.docs[0]) {
      categoryIds[cat.slug] = existing.docs[0].id
      await payload.update({
        collection: 'categories',
        id: existing.docs[0].id,
        data: {
          title: cat.title,
          description: cat.description,
        },
        ...seedOpts,
      })
      continue
    }

    const doc = await payload.create({
      collection: 'categories',
      data: {
        title: cat.title,
        slug: cat.slug,
        description: cat.description,
      },
      ...seedOpts,
    })

    categoryIds[cat.slug] = doc.id
  }

  payload.logger.info('— Seeding products...')

  for (const product of staticProducts) {
    const existing = await payload.find({
      collection: 'products',
      where: { slug: { equals: product.slug } },
      limit: 1,
      ...seedOpts,
    })

    const imageFile = readLocalSvg(categoryImages[product.categorySlug] ?? 'single-phase.svg')
    let heroImageId: number | undefined =
      existing.docs[0]?.heroImage && typeof existing.docs[0].heroImage === 'object'
        ? existing.docs[0].heroImage.id
        : typeof existing.docs[0]?.heroImage === 'number'
          ? existing.docs[0].heroImage
          : undefined

    if (!heroImageId) {
      const hero = await payload.create({
        collection: 'media',
        data: {
          alt: product.name,
          mediaType: 'image',
        },
        file: imageFile,
        ...seedOpts,
      })
      heroImageId = hero.id
    }

    const data = {
      name: product.name,
      slug: product.slug,
      category: categoryIds[product.categorySlug],
      segment: product.segmentKey,
      shortDescription: product.description,
      powerRange: product.powerRange,
      efficiency: product.efficiency,
      phases: product.phases,
      warranty: product.warranty,
      featured: product.featured ?? false,
      keySpecs: product.specs.map((s) => ({ label: s.label, value: s.value })),
      heroImage: heroImageId,
      _status: 'published' as const,
    }

    if (existing.docs[0]) {
      await payload.update({
        collection: 'products',
        id: existing.docs[0].id,
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
  }

  payload.logger.info('— Seeding downloads...')

  const sampleDownloads = [
    { title: 'ORI-S6 Hybrid Series Datasheet', type: 'datasheet' as const },
    { title: 'ORI-S5 Three-Phase Datasheet', type: 'datasheet' as const },
    { title: 'ORI-GU250K Utility Datasheet', type: 'datasheet' as const },
    { title: 'ORI-S6 Hybrid Installation Guide', type: 'manual' as const },
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
