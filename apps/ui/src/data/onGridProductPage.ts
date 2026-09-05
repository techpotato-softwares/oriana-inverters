import { slugifyLabel } from './productMaster'

/**
 * On-grid product page content from docs/Products Page 2.docx
 * Specs + feature highlights for Sungrow-style product detail pages.
 */

export type OnGridFeatureGroup = {
  title: 'Efficient' | 'Intelligent' | 'Adaptive' | 'Reliable'
  items: string[]
}

export type OnGridSeriesPageData = {
  /** Max. PV Input Voltage display value */
  maxPvInputVoltage: string
  /** Rated AC Output Power display (series range) */
  ratedAcOutputPower: string
  /** Rated AC Voltage display */
  ratedAcVoltage: string
  /** Max. Efficiency display */
  maxEfficiency: string
  /** Optional hero subtitle override */
  heroType?: string
  featureGroups: OnGridFeatureGroup[]
}

/** Keyed by family productName (modelSeries). */
export const onGridSeriesPageData: Record<string, OnGridSeriesPageData> = {
  'ORI-(1/1.5/2/2.2/2.5/2.7/3/3.3/3.6/4)K-OG04P1-EU-CM1': {
    maxPvInputVoltage: '550 V',
    ratedAcOutputPower: '1~4 kW',
    ratedAcVoltage: '230 V',
    maxEfficiency: '97.3%',
    heroType: '1-Phase String Inverter',
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
    featureGroups: [
      {
        title: 'Efficient',
        items: ['2 MPP trackers, Max. efficiency up to 98.5%'],
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
        items: ['Anti-PID function (Optional)'],
      },
    ],
  },
  'ORI-(18/20/25)K-OG05': {
    maxPvInputVoltage: '1100 V',
    ratedAcOutputPower: '18~25 kW',
    ratedAcVoltage: '415~440 V',
    maxEfficiency: '98.5%',
    heroType: '3-Phase String Inverter',
    featureGroups: [
      {
        title: 'Efficient',
        items: ['2 MPP trackers, Max. efficiency up to 98.5%'],
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
        items: ['Anti-PID function (Optional)'],
      },
    ],
  },
  'ORI-(30/33/35/36)K-OG04P3-EU-CM2': {
    maxPvInputVoltage: '1100 V',
    ratedAcOutputPower: '30~36 kW',
    ratedAcVoltage: '415~440 V',
    maxEfficiency: '98.6%',
    heroType: '3-Phase String Inverter',
    featureGroups: [
      {
        title: 'Efficient',
        items: ['2 MPP trackers, Max. efficiency up to 98.6%'],
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
        items: ['Anti-PID function (Optional)'],
      },
    ],
  },
  'ORI-(40/45)K-OG04P3-EU-CM3, ORI-50K-OG04P3-EU-CM4': {
    maxPvInputVoltage: '800 V',
    ratedAcOutputPower: '40~50 kW',
    ratedAcVoltage: '415~440 V',
    maxEfficiency: '98.7%',
    heroType: '3-Phase String Inverter',
    featureGroups: [
      {
        title: 'Efficient',
        items: ['3 MPP trackers, Max. efficiency up to 98.7%'],
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
        items: ['Anti-PID function (Optional)'],
      },
    ],
  },
  'ORI-(60/70/75/80)K-OG04P3-EU-AM4': {
    maxPvInputVoltage: '1100 V',
    ratedAcOutputPower: '60~80 kW',
    ratedAcVoltage: '415~440 V',
    maxEfficiency: '98.7%',
    heroType: '3-Phase String Inverter',
    featureGroups: [
      {
        title: 'Efficient',
        items: ['4 MPP trackers, Max. efficiency up to 98.7%'],
      },
      {
        title: 'Intelligent',
        items: ['String intelligent monitoring (optional)'],
      },
      {
        title: 'Adaptive',
        items: [
          '127V/220V, 133V/230V and 50/60Hz, Three phase system',
          'Zero export application, VSG application',
          'Wide output voltage range',
        ],
      },
      {
        title: 'Reliable',
        items: ['Anti-PID function (Optional)'],
      },
    ],
  },
  'ORI-(70/75/80/90/100/110)K-OG03': {
    maxPvInputVoltage: '1000 V',
    ratedAcOutputPower: '70~110 kW',
    ratedAcVoltage: '415~440 V',
    maxEfficiency: '98.8%',
    heroType: '3-Phase String Inverter',
    featureGroups: [
      {
        title: 'Efficient',
        items: ['Max. efficiency up to 98.8%'],
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
        items: ['Anti-PID function (Optional)'],
      },
    ],
  },
  'ORI-(120/125/130/135/136)K-OG01P3-EU-AM8': {
    maxPvInputVoltage: '1100 V',
    ratedAcOutputPower: '120~136 kW',
    ratedAcVoltage: '415~440 V',
    maxEfficiency: '98.8%',
    heroType: '3-Phase String Inverter',
    featureGroups: [
      {
        title: 'Efficient',
        items: ['Max. efficiency up to 98.8%'],
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
        items: ['Anti-PID function (Optional)'],
      },
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
