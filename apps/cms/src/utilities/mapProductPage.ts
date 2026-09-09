import {
  getOnGridSeriesPageData,
  type OnGridFeatureIcon,
  type OnGridSeriesPageData,
} from '@/data/onGridProductPage'
import type { CatalogueProduct, CatalogueSeries } from '@/types/catalogue'

const FEATURE_ICONS = new Set<OnGridFeatureIcon>([
  'chart',
  'export',
  'monitor',
  'wave',
  'pid',
  'spd',
  'lv',
])

/** Loose CMS shape so this file typechecks before `generate:types`. */
type CmsProductPage = {
  heroType?: string | null
  featureLayout?: 'quadrant' | 'list' | null
  maxPvInputVoltage?: string | null
  ratedAcOutputPower?: string | null
  ratedAcVoltage?: string | null
  maxEfficiency?: string | null
  tileLabels?: {
    maxPvInputVoltage?: string | null
    ratedAcOutputPower?: string | null
    ratedAcVoltage?: string | null
    maxEfficiency?: string | null
  } | null
  featureGroups?:
    | {
        title?: string | null
        items?: { text?: string | null }[] | null
      }[]
    | null
  featureList?:
    | {
        icon?: string | null
        text?: string | null
      }[]
    | null
}

function text(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

function isFeatureIcon(value: string): value is OnGridFeatureIcon {
  return FEATURE_ICONS.has(value as OnGridFeatureIcon)
}

/** Map CMS productPage group → view model. Returns null when nothing usable is set. */
export function mapCmsProductPage(raw: CmsProductPage | null | undefined): OnGridSeriesPageData | null {
  if (!raw || typeof raw !== 'object') return null

  const featureGroups =
    raw.featureGroups
      ?.map((group) => ({
        title: text(group?.title) ?? '',
        items:
          group?.items
            ?.map((item) => text(item?.text))
            .filter((item): item is string => Boolean(item)) ?? [],
      }))
      .filter((group) => group.title && group.items.length) ?? []

  const featureList =
    raw.featureList
      ?.flatMap((item) => {
        const body = text(item?.text)
        const icon = typeof item?.icon === 'string' && isFeatureIcon(item.icon) ? item.icon : null
        if (!body || !icon) return []
        return [{ icon, text: body }]
      }) ?? []

  const maxPvInputVoltage = text(raw.maxPvInputVoltage)
  const ratedAcOutputPower = text(raw.ratedAcOutputPower)
  const ratedAcVoltage = text(raw.ratedAcVoltage)
  const maxEfficiency = text(raw.maxEfficiency)
  const heroType = text(raw.heroType)
  const featureLayout = raw.featureLayout === 'list' ? 'list' : 'quadrant'

  const tileLabels = raw.tileLabels
    ? {
        maxPvInputVoltage: text(raw.tileLabels.maxPvInputVoltage),
        ratedAcOutputPower: text(raw.tileLabels.ratedAcOutputPower),
        ratedAcVoltage: text(raw.tileLabels.ratedAcVoltage),
        maxEfficiency: text(raw.tileLabels.maxEfficiency),
      }
    : undefined

  const hasTiles = Boolean(
    maxPvInputVoltage || ratedAcOutputPower || ratedAcVoltage || maxEfficiency,
  )
  const hasFeatures = featureGroups.length > 0 || featureList.length > 0
  if (!hasTiles && !hasFeatures && !heroType) return null

  return {
    maxPvInputVoltage: maxPvInputVoltage ?? '—',
    ratedAcOutputPower: ratedAcOutputPower ?? '—',
    ratedAcVoltage: ratedAcVoltage ?? '—',
    maxEfficiency: maxEfficiency ?? '—',
    tileLabels,
    heroType,
    featureLayout,
    featureGroups: featureGroups.length ? featureGroups : undefined,
    featureList: featureList.length ? featureList : undefined,
  }
}

function mergePageData(
  primary: OnGridSeriesPageData | null | undefined,
  fallback: OnGridSeriesPageData | null,
): OnGridSeriesPageData | null {
  if (!primary && !fallback) return null
  if (!primary) return fallback
  if (!fallback) return primary

  const groups = primary.featureGroups?.length
    ? primary.featureGroups
    : fallback.featureGroups
  const list = primary.featureList?.length ? primary.featureList : fallback.featureList

  return {
    maxPvInputVoltage:
      primary.maxPvInputVoltage !== '—'
        ? primary.maxPvInputVoltage
        : fallback.maxPvInputVoltage,
    ratedAcOutputPower:
      primary.ratedAcOutputPower !== '—'
        ? primary.ratedAcOutputPower
        : fallback.ratedAcOutputPower,
    ratedAcVoltage:
      primary.ratedAcVoltage !== '—' ? primary.ratedAcVoltage : fallback.ratedAcVoltage,
    maxEfficiency:
      primary.maxEfficiency !== '—' ? primary.maxEfficiency : fallback.maxEfficiency,
    tileLabels: {
      maxPvInputVoltage:
        primary.tileLabels?.maxPvInputVoltage ?? fallback.tileLabels?.maxPvInputVoltage,
      ratedAcOutputPower:
        primary.tileLabels?.ratedAcOutputPower ?? fallback.tileLabels?.ratedAcOutputPower,
      ratedAcVoltage: primary.tileLabels?.ratedAcVoltage ?? fallback.tileLabels?.ratedAcVoltage,
      maxEfficiency: primary.tileLabels?.maxEfficiency ?? fallback.tileLabels?.maxEfficiency,
    },
    heroType: primary.heroType || fallback.heroType,
    featureLayout: primary.featureLayout || fallback.featureLayout,
    featureGroups: groups,
    featureList: list,
  }
}

/**
 * Prefer CMS product-page data on the selected (or sibling) variant;
 * fall back to the static onGridProductPage.ts dataset when CMS is empty or API failed.
 */
export function resolveProductPageData(
  series: CatalogueSeries,
  selected: CatalogueProduct,
): OnGridSeriesPageData | null {
  const fallback = getOnGridSeriesPageData(
    selected.modelSeries,
    series.series,
    series.slug,
    selected.slug,
  )

  const fromSelected = selected.productPage
  if (fromSelected) return mergePageData(fromSelected, fallback)

  const fromSibling = series.variants.find((variant) => variant.productPage)?.productPage
  if (fromSibling) return mergePageData(fromSibling, fallback)

  return fallback
}

/** Shape used when seeding Products.productPage from static page data. */
export function productPageSeedData(pageData: OnGridSeriesPageData | null | undefined) {
  if (!pageData) return undefined
  return {
    heroType: pageData.heroType || undefined,
    featureLayout: pageData.featureLayout,
    maxPvInputVoltage: pageData.maxPvInputVoltage,
    ratedAcOutputPower: pageData.ratedAcOutputPower,
    ratedAcVoltage: pageData.ratedAcVoltage,
    maxEfficiency: pageData.maxEfficiency,
    tileLabels: pageData.tileLabels
      ? {
          maxPvInputVoltage: pageData.tileLabels.maxPvInputVoltage,
          ratedAcOutputPower: pageData.tileLabels.ratedAcOutputPower,
          ratedAcVoltage: pageData.tileLabels.ratedAcVoltage,
          maxEfficiency: pageData.tileLabels.maxEfficiency,
        }
      : undefined,
    featureGroups: pageData.featureGroups?.map((group) => ({
      title: group.title,
      items: group.items.map((item) => ({ text: item })),
    })),
    featureList: pageData.featureList?.map((item) => ({
      icon: item.icon,
      text: item.text,
    })),
  }
}

/** Read productPage off a Payload doc before or after types are regenerated. */
export function productPageFromDoc(doc: Record<string, unknown> | { productPage?: unknown }): OnGridSeriesPageData | null {
  const raw =
    doc && typeof doc === 'object' && 'productPage' in doc
      ? (doc.productPage as CmsProductPage | null | undefined)
      : undefined
  return mapCmsProductPage(raw)
}
