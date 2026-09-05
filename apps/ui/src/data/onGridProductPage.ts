import { slugifyLabel } from './productMaster'

/**
 * On-grid product page content from docs/Products Page 2.docx
 * Specs + feature highlights for Sungrow-style product detail pages.
 *
 * Feature image map in the doc:
 * - image2 → 1–4 kW (2×2 quadrant)
 * - image3 → 3.6–6.2 kW (2×2 quadrant)
 * - image4 → 5–15 kW (icon list)
 * - image5 → 18–25 kW (icon list)
 * - image6 → 30–36 kW (icon list)
 * - image7 → 40–50 kW (icon list)
 * - image8 → 60–80 kW (icon list)
 * - image9 → 70–110 kW (icon list)
 * - image10 → 120–136 kW (icon list)
 */

export type OnGridFeatureGroup = {
  title: 'Efficient' | 'Intelligent' | 'Adaptive' | 'Reliable'
  items: string[]
}

export type OnGridFeatureIcon =
  | 'chart'
  | 'export'
  | 'monitor'
  | 'wave'
  | 'pid'
  | 'spd'
  | 'lv'

export type OnGridFeatureListItem = {
  icon: OnGridFeatureIcon
  text: string
}

export type OnGridSeriesPageData = {
  maxPvInputVoltage: string
  ratedAcOutputPower: string
  ratedAcVoltage: string
  maxEfficiency: string
  heroType?: string
  /** Doc images 2–3 use a 2×2 quadrant; images 4–10 use a vertical icon list. */
  featureLayout: 'quadrant' | 'list'
  featureGroups?: OnGridFeatureGroup[]
  featureList?: OnGridFeatureListItem[]
}

const sharedListTail: OnGridFeatureListItem[] = [
  { icon: 'export', text: 'Zero export application, VSG application' },
  { icon: 'monitor', text: 'String intelligent monitoring (optional)' },
  { icon: 'wave', text: 'Wide output voltage range' },
  { icon: 'pid', text: 'Anti-PID function (Optional)' },
]

/** Keyed by family productName (modelSeries). */
export const onGridSeriesPageData: Record<string, OnGridSeriesPageData> = {
  'ORI-(1/1.5/2/2.2/2.5/2.7/3/3.3/3.6/4)K-OG04P1-EU-CM1': {
    maxPvInputVoltage: '550 V',
    ratedAcOutputPower: '1~4 kW',
    ratedAcVoltage: '230 V',
    maxEfficiency: '97.3%',
    heroType: '1-Phase String Inverter',
    featureLayout: 'quadrant',
    featureGroups: [
      {
        title: 'Efficient',
        items: ['1 MPP tracker, Max. efficiency up to 97.3%'],
      },
      {
        title: 'Intelligent',
        items: ['String intelligent monitoring (optional)'],
      },
      {
        title: 'Adaptive',
        items: ['Zero export application, VSG application', 'Wide output voltage range'],
      },
      {
        title: 'Reliable',
        items: ['Anti-PID function (Optional)', 'Low start-up voltage of 50V'],
      },
    ],
  },
  'ORI-(3.6/4/4.2/4.6/5/5.2/6/6.2)K-OG05P1-EU-CM2': {
    maxPvInputVoltage: '550 V',
    ratedAcOutputPower: '3.6~6.2 kW',
    ratedAcVoltage: '230 V',
    maxEfficiency: '97.5%',
    heroType: '1-Phase String Inverter',
    featureLayout: 'quadrant',
    // docs image3
    featureGroups: [
      {
        title: 'Efficient',
        items: ['2 MPP trackers, Max. efficiency up to 97.5%'],
      },
      {
        title: 'Intelligent',
        items: ['String intelligent monitoring (optional)'],
      },
      {
        title: 'Adaptive',
        items: ['Zero export application, VSG application', 'Wide output voltage range'],
      },
      {
        title: 'Reliable',
        items: ['Anti-PID function (Optional)', 'Low start-up voltage of 80V'],
      },
    ],
  },
  'ORI-(5/6/7/8/9/10/12/15)K-OG06P3-EU-CM2-P1': {
    maxPvInputVoltage: '1100 V',
    ratedAcOutputPower: '5~15 kW',
    ratedAcVoltage: '415~440 V',
    maxEfficiency: '98.5%',
    heroType: '3-Phase String Inverter',
    featureLayout: 'list',
    // docs image4
    featureList: [
      { icon: 'chart', text: '2 MPP trackers, Max. efficiency up to 98.5%' },
      ...sharedListTail,
    ],
  },
  'ORI-(18/20/25)K-OG05': {
    maxPvInputVoltage: '1100 V',
    ratedAcOutputPower: '18~25 kW',
    ratedAcVoltage: '415~440 V',
    maxEfficiency: '98.5%',
    heroType: '3-Phase String Inverter',
    featureLayout: 'list',
    // docs image5 (feature line shows 98.6% in the asset)
    featureList: [
      { icon: 'chart', text: '2 MPP trackers, Max. efficiency up to 98.6%' },
      ...sharedListTail,
    ],
  },
  'ORI-(30/33/35/36)K-OG04P3-EU-CM2': {
    maxPvInputVoltage: '1100 V',
    ratedAcOutputPower: '30~36 kW',
    ratedAcVoltage: '415~440 V',
    maxEfficiency: '98.6%',
    heroType: '3-Phase String Inverter',
    featureLayout: 'list',
    // docs image6
    featureList: [
      { icon: 'chart', text: '2 MPP trackers, Max. efficiency up to 98.6%' },
      ...sharedListTail,
    ],
  },
  'ORI-(40/45)K-OG04P3-EU-CM3, ORI-50K-OG04P3-EU-CM4': {
    maxPvInputVoltage: '800 V',
    ratedAcOutputPower: '40~50 kW',
    ratedAcVoltage: '415~440 V',
    maxEfficiency: '98.7%',
    heroType: '3-Phase String Inverter',
    featureLayout: 'list',
    // docs image7
    featureList: [
      { icon: 'lv', text: '127V/220V, 133V/230V and 50/60Hz, Three phase system' },
      { icon: 'chart', text: '4 MPP trackers, Max. efficiency up to 98.7%' },
      ...sharedListTail,
    ],
  },
  'ORI-(60/70/75/80)K-OG04P3-EU-AM4': {
    maxPvInputVoltage: '1100 V',
    ratedAcOutputPower: '60~80 kW',
    ratedAcVoltage: '415~440 V',
    maxEfficiency: '98.7%',
    heroType: '3-Phase String Inverter',
    featureLayout: 'list',
    // docs image8
    featureList: [
      { icon: 'chart', text: '4 MPP trackers, Max. efficiency up to 98.7%' },
      ...sharedListTail,
      { icon: 'spd', text: 'Type II DC/AC SPD' },
    ],
  },
  'ORI-(70/75/80/90/100/110)K-OG03': {
    maxPvInputVoltage: '1000 V',
    ratedAcOutputPower: '70~110 kW',
    ratedAcVoltage: '415~440 V',
    maxEfficiency: '98.8%',
    heroType: '3-Phase String Inverter',
    featureLayout: 'list',
    // docs image9
    featureList: [
      { icon: 'chart', text: 'Max. 6 MPP trackers, Max. efficiency up to 98.8%' },
      ...sharedListTail,
      { icon: 'spd', text: 'Type II DC/AC SPD' },
    ],
  },
  'ORI-(120/125/130/135/136)K-OG01P3-EU-AM8': {
    maxPvInputVoltage: '1100 V',
    ratedAcOutputPower: '120~136 kW',
    ratedAcVoltage: '415~440 V',
    maxEfficiency: '98.8%',
    heroType: '3-Phase String Inverter',
    featureLayout: 'list',
    // docs image10
    featureList: [
      { icon: 'chart', text: '8 MPP trackers, Max. efficiency up to 98.8%' },
      ...sharedListTail,
      { icon: 'spd', text: 'Type II DC/AC SPD' },
    ],
  },
}

const onGridPageDataBySlug = new Map(
  Object.entries(onGridSeriesPageData).map(([productName, data]) => [
    slugifyLabel(productName),
    data,
  ]),
)

/**
 * Resolve doc-driven specs/features for an on-grid series.
 * Accepts productName, modelSeries, series slug, or any of those together.
 */
export function getOnGridSeriesPageData(
  ...candidates: Array<string | null | undefined>
): OnGridSeriesPageData | null {
  for (const candidate of candidates) {
    const value = candidate?.trim()
    if (!value) continue
    const exact = onGridSeriesPageData[value]
    if (exact) return exact
    const bySlug = onGridPageDataBySlug.get(slugifyLabel(value))
    if (bySlug) return bySlug
  }
  return null
}
