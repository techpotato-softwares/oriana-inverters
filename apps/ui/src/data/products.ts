import type { CatalogueCategory, CatalogueProduct } from '@/types/catalogue'
import { getOnGridSeriesPageData } from './onGridProductPage'
import {
  categorySlug,
  productMasterCategories,
  segmentKeyOf,
  slugifyLabel,
} from './productMaster'

/**
 * Product catalogue aligned with productMaster.json.
 * Nested as category → family → capacity models, then flattened for CMS seed.
 */

type ProductModel = { modelNo: string; rating: string }

type ProductFamilySeed = {
  segment: string | null
  series: string
  productName: string
  models: ProductModel[]
}

type ProductCategorySeed = {
  name: string
  families: ProductFamilySeed[]
}

export const productCatalog: ProductCategorySeed[] = [
  {
    name: 'On Grid Inverters',
    families: [
      {
        segment: 'Single Phase',
        series: 'ORI-OG04',
        productName: 'ORI-(1/1.5/2/2.2/2.5/2.7/3/3.3/3.6/4)K-OG04P1-EU-CM1',
        models: [
          { modelNo: 'ORI-4K-OG04P1-EU-CM1', rating: '4 kW' },
          { modelNo: 'ORI-3.6K-OG04P1-EU-CM1', rating: '3.6 kW' },
          { modelNo: 'ORI-3.3K-OG04P1-EU-CM1', rating: '3.3 kW' },
          { modelNo: 'ORI-3K-OG04P1-EU-CM1', rating: '3 kW' },
          { modelNo: 'ORI-2.7K-OG04P1-EU-CM1', rating: '2.7 kW' },
          { modelNo: 'ORI-2.5K-OG04P1-EU-CM1', rating: '2.5 kW' },
          { modelNo: 'ORI-2.2K-OG04P1-EU-CM1', rating: '2.2 kW' },
          { modelNo: 'ORI-2K-OG04P1-EU-CM1', rating: '2 kW' },
          { modelNo: 'ORI-1.5K-OG04P1-EU-CM1', rating: '1.5 kW' },
          { modelNo: 'ORI-1K-OG04P1-EU-CM1', rating: '1 kW' },
        ],
      },
      {
        segment: 'Single Phase',
        series: 'ORI-OG05',
        productName: 'ORI-(3.6/4/4.2/4.6/5/5.2/6/6.2)K-OG05P1-EU-CM2',
        models: [
          { modelNo: 'ORI-6.2K-OG05P1-EU-CM2', rating: '6.2 kW' },
          { modelNo: 'ORI-6K-OG05P1-EU-CM2', rating: '6 kW' },
          { modelNo: 'ORI-5.2K-OG05P1-EU-CM2', rating: '5.2 kW' },
          { modelNo: 'ORI-5K-OG05P1-EU-CM2', rating: '5 kW' },
          { modelNo: 'ORI-4.6K-OG05P1-EU-CM2', rating: '4.6 kW' },
          { modelNo: 'ORI-4K-OG05P1-EU-CM2', rating: '4 kW' },
          { modelNo: 'ORI-3.6K-OG05P1-EU-CM2', rating: '3.6 kW' },
        ],
      },
      {
        segment: 'Three Phase',
        series: 'ORI-OG06',
        productName: 'ORI-(5/6/7/8/9/10/12/15)K-OG06P3-EU-CM2-P1',
        models: [
          { modelNo: 'ORI-15K-OG06P3-EU-CM2-P1', rating: '15 kW' },
          { modelNo: 'ORI-12K-OG06P3-EU-CM2-P1', rating: '12 kW' },
          { modelNo: 'ORI-10K-OG06P3-EU-CM2-P1', rating: '10 kW' },
          { modelNo: 'ORI-9K-OG06P3-EU-CM2-P1', rating: '9 kW' },
          { modelNo: 'ORI-8K-OG06P3-EU-CM2-P1', rating: '8 kW' },
          { modelNo: 'ORI-7K-OG06P3-EU-CM2-P1', rating: '7 kW' },
          { modelNo: 'ORI-6K-OG06P3-EU-CM2-P1', rating: '6 kW' },
          { modelNo: 'ORI-5K-OG06P3-EU-CM2-P1', rating: '5 kW' },
        ],
      },
      {
        segment: 'Three Phase',
        series: 'ORI-OG05',
        productName: 'ORI-(18/20/25)K-OG05',
        models: [
          { modelNo: 'ORI-25K-OG05', rating: '25 kW' },
          { modelNo: 'ORI-20K-OG05', rating: '20 kW' },
          { modelNo: 'ORI-18K-OG05', rating: '18 kW' },
        ],
      },
      {
        segment: 'Three Phase',
        series: 'ORI-OG04',
        productName: 'ORI-(30/33/35/36)K-OG04P3-EU-CM2',
        models: [
          { modelNo: 'ORI-36K-OG04P3-EU-CM2', rating: '36 kW' },
          { modelNo: 'ORI-35K-OG04P3-EU-CM2', rating: '35 kW' },
          { modelNo: 'ORI-33K-OG04P3-EU-CM2', rating: '33 kW' },
          { modelNo: 'ORI-30K-OG04P3-EU-CM2', rating: '30 kW' },
        ],
      },
      {
        segment: 'Three Phase',
        series: 'ORI-OG04',
        productName: 'ORI-(40/45)K-OG04P3-EU-CM3, ORI-50K-OG04P3-EU-CM4',
        models: [
          { modelNo: 'ORI-50K-OG04P3-EU-CM4', rating: '50 kW' },
          { modelNo: 'ORI-45K-OG04P3-EU-CM3', rating: '45 kW' },
          { modelNo: 'ORI-40K-OG04P3-EU-CM3', rating: '40 kW' },
        ],
      },
      {
        segment: 'Three Phase',
        series: 'ORI-OG04',
        productName: 'ORI-(60/70/75/80)K-OG04P3-EU-AM4',
        models: [
          { modelNo: 'ORI-80K-OG04P3-EU-AM4', rating: '80 kW' },
          { modelNo: 'ORI-75K-OG04P3-EU-AM4', rating: '75 kW' },
          { modelNo: 'ORI-70K-OG04P3-EU-AM4', rating: '70 kW' },
          { modelNo: 'ORI-60K-OG04P3-EU-AM4', rating: '60 kW' },
        ],
      },
      {
        segment: 'Three Phase',
        series: 'ORI-OG03',
        productName: 'ORI-(70/75/80/90/100/110)K-OG03',
        models: [
          { modelNo: 'ORI-110K-OG03', rating: '110 kW' },
          { modelNo: 'ORI-100K-OG03', rating: '100 kW' },
          { modelNo: 'ORI-90K-OG03', rating: '90 kW' },
          { modelNo: 'ORI-80K-OG03', rating: '80 kW' },
          { modelNo: 'ORI-75K-OG03', rating: '75 kW' },
          { modelNo: 'ORI-70K-OG03', rating: '70 kW' },
        ],
      },
      {
        segment: 'Three Phase',
        series: 'ORI-OG01',
        productName: 'ORI-(120/125/130/135/136)K-OG01P3-EU-AM8',
        models: [
          { modelNo: 'ORI-136K-OG01P3-EU-AM8', rating: '136 kW' },
          { modelNo: 'ORI-135K-OG01P3-EU-AM8', rating: '135 kW' },
          { modelNo: 'ORI-130K-OG01P3-EU-AM8', rating: '130 kW' },
          { modelNo: 'ORI-125K-OG01P3-EU-AM8', rating: '125 kW' },
          { modelNo: 'ORI-120K-OG01P3-EU-AM8', rating: '120 kW' },
        ],
      },
    ],
  },
  {
    name: 'Hybrid Inverters',
    families: [
      {
        segment: 'Single Phase',
        series: 'ORI-OG7',
        productName: 'ORI-OG7-EH1P(3-6)K02-NV-YD-L',
        models: [
          { modelNo: 'ORI-OG7-EH1P3K02-NV-YD-L', rating: '3 kW' },
          { modelNo: 'ORI-OG7-EH1P3.6K02-NV-YD-L', rating: '3.6 kW' },
          { modelNo: 'ORI-OG7-EH1P4.6K02-NV-YD-L', rating: '4.6 kW' },
          { modelNo: 'ORI-OG7-EH1P5K02-NV-YD-L', rating: '5 kW' },
          { modelNo: 'ORI-OG7-EH1P5.75K02-NV-YD-L', rating: '5.75 kW' },
          { modelNo: 'ORI-OG7-EH1P6K02-NV-YD-L', rating: '6 kW' },
        ],
      },
      {
        segment: 'Single Phase',
        series: 'ORI-OG7',
        productName: 'ORI-OG7-EH1P(8-12)K02-NV-YD-L',
        models: [
          { modelNo: 'ORI-OG7-EH1P8K02-NV-YD-L', rating: '8 kW' },
          { modelNo: 'ORI-OG7-EH1P9K02-NV-YD-L', rating: '9 kW' },
          { modelNo: 'ORI-OG7-EH1P9.9K02-NV-YD-L', rating: '9.9 kW' },
          { modelNo: 'ORI-OG7-EH1P10K02-NV-YD-L', rating: '10 kW' },
          { modelNo: 'ORI-OG7-EH1P12K02-NV-YD-L', rating: '12 kW' },
        ],
      },
      {
        segment: 'Three Phase',
        series: 'ORI-OG6',
        productName: 'ORI-OG6-EH3P(8-18)K02-NV-YD-L',
        models: [
          { modelNo: 'ORI-OG6-EH3P8K02-NV-YD-L', rating: '8 kW' },
          { modelNo: 'ORI-OG6-EH3P10K02-NV-YD-L', rating: '10 kW' },
          { modelNo: 'ORI-OG6-EH3P12K02-NV-YD-L', rating: '12 kW' },
          { modelNo: 'ORI-OG6-EH3P15K02-NV-YD-L', rating: '15 kW' },
        ],
      },
      {
        segment: 'Three Phase',
        series: 'ORI-OG6',
        productName: 'ORI-OG6-EH3P(30-60)K-H(21A)',
        models: [
          { modelNo: 'ORI-OG6-EH3P30K-H(21A)', rating: '30 kW' },
          { modelNo: 'ORI-OG6-EH3P40K-H(21A)', rating: '40 kW' },
          { modelNo: 'ORI-OG6-EH3P50K-H(21A)', rating: '50 kW' },
          { modelNo: 'ORI-OG6-EH3P60K-H(21A)', rating: '60 kW' },
        ],
      },
      {
        segment: 'Three Phase',
        series: 'ORI-OG6',
        productName: 'ORI-OG6-EH3P(80-125)K10-NV-YD-H',
        models: [
          { modelNo: 'ORI-OG6-EH3P80K10-NV-YD-H', rating: '80 kW' },
          { modelNo: 'ORI-OG6-EH3P100K10-NV-YD-H', rating: '100 kW' },
          { modelNo: 'ORI-OG6-EH3P125K10-NV-YD-H', rating: '125 kW' },
        ],
      },
    ],
  },
  {
    name: 'Utility Scale Inverters',
    families: [
      {
        segment: 'Utility Inverter',
        series: 'ORI-OG6',
        productName: 'ORI-OG6-GU3P350K06-EV-ND',
        models: [
          { modelNo: 'ORI-OG6-GU3P350K06-EV-ND', rating: '350 kW' },
        ],
      },
    ],
  },
  {
    name: 'BESS',
    families: [
      {
        segment: 'ORIANA BESS Home',
        series: 'ORIANA BESS Home',
        productName: 'ORIANA-BESS Home-(5-16)kWh',
        models: [
          { modelNo: 'ORIANA-BESS Home-5kWh-3K', rating: '5 kWh' },
          { modelNo: 'ORIANA-BESS Home-5kWh-6K', rating: '5 kWh' },
          { modelNo: 'ORIANA-BESS Home-10kWh-6K', rating: '10 kWh' },
          { modelNo: 'ORIANA-BESS Home-16kWh-6K', rating: '16 kWh' },
        ],
      },
      {
        segment: 'ORIANA BESS C&I',
        series: 'ORIANA BESS C&I',
        productName: 'ORIANA-BESS C&I-(60-261)kWh',
        models: [
          { modelNo: 'ORIANA-BESS C&I-60kWh', rating: '60 kWh' },
          { modelNo: 'ORIANA-BESS C&I-129kWh', rating: '129 kWh' },
          { modelNo: 'ORIANA-BESS C&I-261kWh', rating: '261 kWh' },
        ],
      },
      {
        segment: 'ORIANA BESS Core',
        series: 'ORIANA BESS Core',
        productName: 'ORIANA-BESS Core-(100-261)kWh',
        models: [
          { modelNo: 'ORIANA-BESS Core-100kWh', rating: '100 kWh' },
          { modelNo: 'ORIANA-BESS Core-200kWh', rating: '200 kWh' },
          { modelNo: 'ORIANA-BESS Core-261kWh', rating: '261 kWh' },
        ],
      },
    ],
  },
]

function phasesOf(segment: string | null, categoryName: string): string {
  if (categoryName === 'BESS') return '—'
  if (segment === 'Single Phase') return 'Single Phase'
  return 'Three Phase'
}

export const staticCategories: CatalogueCategory[] = productMasterCategories

export const staticProducts: CatalogueProduct[] = productCatalog.flatMap((category) =>
  category.families.flatMap((family) =>
    family.models.map((model, index) => {
      const power = model.rating
      const compact = power.replace(/\s+/g, '')
      const phases = phasesOf(family.segment, category.name)
      const segment = family.segment || family.series
      const categoryLabel = category.name.endsWith('Inverters')
        ? category.name.slice(0, -1)
        : category.name
      const lead =
        phases === '—' ? 'Home battery energy storage' : `${phases} ${categoryLabel}`
      const pageData = getOnGridSeriesPageData(family.productName)
      const specs = [
        { label: 'Model', value: model.modelNo },
        { label: 'Model Series', value: family.productName },
        { label: 'Capacity', value: power },
        { label: 'Series', value: family.series },
      ]
      if (pageData) {
        specs.push(
          { label: 'Max. PV Input Voltage', value: pageData.maxPvInputVoltage },
          { label: 'Rated AC Output Power', value: pageData.ratedAcOutputPower },
          { label: 'Rated AC Voltage', value: pageData.ratedAcVoltage },
          { label: 'Max. Efficiency', value: pageData.maxEfficiency },
        )
      }
      return {
        slug: slugifyLabel(model.modelNo),
        name: compact ? `${compact} ${model.modelNo}` : model.modelNo,
        category: category.name,
        categorySlug: categorySlug(category.name),
        segment,
        segmentKey: segmentKeyOf(category.name, family),
        powerRange: power,
        efficiency: pageData?.maxEfficiency ?? '—',
        phases,
        warranty: '10 Years',
        featured: index === 0,
        description: `${lead} — ${power} model in the ${family.productName} series.`,
        modelSeries: family.productName,
        specs,
      } satisfies CatalogueProduct
    }),
  ),
)

/** @deprecated Use getCatalogueProducts() */
export const products = staticProducts

/** @deprecated Use getCategoryMeta() */
export const categoryMeta = Object.fromEntries(
  staticCategories.map((c) => [c.slug, { title: c.title, description: c.description }]),
)
