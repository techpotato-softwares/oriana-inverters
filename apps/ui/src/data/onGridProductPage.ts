import { slugifyLabel } from './productMaster'

/**
 * Product page specs/features from docs (Products Page 2 + 3).
 * On-grid includes advantage cards; Hybrid / Utility / BESS ship with basics only
 * (empty featureGroups) until copy is trimmed to the 4-card layout.
 */

export type OnGridFeatureGroup = {
  title: string
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
  /** Override default inverter tile labels (BESS and similar). */
  tileLabels?: {
    maxPvInputVoltage?: string
    ratedAcOutputPower?: string
    ratedAcVoltage?: string
    maxEfficiency?: string
  }
  heroType?: string
  /** On-grid doc images 2–3 use quadrant; 4–10 use icon list. Empty groups = no advantages yet. */
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
    heroType: '1-Phase On Grid Inverter',
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
    heroType: '1-Phase On Grid Inverter',
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
    heroType: '3-Phase On Grid Inverter',
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
    heroType: '3-Phase On Grid Inverter',
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
    heroType: '3-Phase On Grid Inverter',
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
    heroType: '3-Phase On Grid Inverter',
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
    heroType: '3-Phase On Grid Inverter',
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
    heroType: '3-Phase On Grid Inverter',
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
    heroType: '3-Phase On Grid Inverter',
    featureLayout: 'list',
    // docs image10
    featureList: [
      { icon: 'chart', text: '8 MPP trackers, Max. efficiency up to 98.8%' },
      ...sharedListTail,
      { icon: 'spd', text: 'Type II DC/AC SPD' },
    ],
  },

  // --- Hybrid (Products Page 3) — basics only; advantages deferred ---
  'ORI-OG7-EH1P(3-6)K02-NV-YD-L': {
    maxPvInputVoltage: '500 V',
    ratedAcOutputPower: '3~6 kW',
    ratedAcVoltage: '230 V',
    maxEfficiency: '96.2%',
    heroType: '1-Phase Hybrid Inverter',
    featureLayout: 'quadrant',
    featureGroups: [],
  },
  'ORI-OG7-EH1P(8-12)K02-NV-YD-L': {
    maxPvInputVoltage: '500 V',
    ratedAcOutputPower: '8~12 kW',
    ratedAcVoltage: '230 V',
    maxEfficiency: '96.2%',
    heroType: '1-Phase Hybrid Inverter',
    featureLayout: 'quadrant',
    featureGroups: [],
  },
  'ORI-OG6-EH3P(8-18)K02-NV-YD-L': {
    maxPvInputVoltage: '1000 V',
    ratedAcOutputPower: '8~18 kW',
    ratedAcVoltage: '380~400 V',
    maxEfficiency: '97.5%',
    heroType: '3-Phase Hybrid Inverter',
    featureLayout: 'quadrant',
    featureGroups: [],
  },
  'ORI-OG6-EH3P(30-60)K-H(21A)': {
    maxPvInputVoltage: '1000 V',
    ratedAcOutputPower: '30~60 kW',
    ratedAcVoltage: '380~400 V',
    maxEfficiency: '98.1%',
    heroType: '3-Phase Hybrid Inverter',
    featureLayout: 'quadrant',
    featureGroups: [],
  },
  'ORI-OG6-EH3P(80-125)K10-NV-YD-H': {
    maxPvInputVoltage: '1000 V',
    ratedAcOutputPower: '80~125 kW',
    ratedAcVoltage: '380~400 V',
    maxEfficiency: '97.6%',
    heroType: '3-Phase Hybrid Inverter',
    featureLayout: 'quadrant',
    featureGroups: [],
  },

  // --- Utility (Products Page 3, image2 Leading Features) ---
  'ORI-OG6-GU3P350K06-EV-ND': {
    maxPvInputVoltage: '1500 V',
    ratedAcOutputPower: '350 kW',
    ratedAcVoltage: '800 V',
    maxEfficiency: '99.0%',
    heroType: 'Utility Grid-Tied PV Inverter',
    featureLayout: 'quadrant',
    featureGroups: [
      {
        title: 'Efficient',
        items: [
          '24/30 inputs, > 150% DC/AC ratio',
          'Each MPPT maximum current 80A, compatible with 182 and 210 series bifacial modules',
          'Patented heat transfer technology, continuous output increase of 5% at high temperature',
        ],
      },
      {
        title: 'Safe',
        items: [
          'IP66, C5-M Anti-Corrosion level',
          'Intelligent string break, remote release for DC switch, active safety',
          'Support intelligent AC/DC terminal temperature detection',
        ],
      },
      {
        title: 'Smart',
        items: [
          'Intelligent string monitoring, smart I-V curve scan',
          'Low temperature antifreeze, reverse dust removal, indoor dehumidification',
          'Each MPPT online insulation fault detection facilitates rapid fault identification',
        ],
      },
      {
        title: 'Economic',
        items: [
          'Inverter with 20ms fast reactive power response, can replace SVG',
          'Support 400mm² aluminum wire connection, saving AC cable cost',
          'Support PLC communication, saving communication cables and construction cost',
        ],
      },
    ],
  },

  // --- BESS (Products Page 3) — basics only; advantages deferred ---
  'ORIANA-BESS Home-(5-16)kWh': {
    maxPvInputVoltage: 'LiFePO4',
    ratedAcOutputPower: '5 / 10 / 16 kWh',
    ratedAcVoltage: '44.8~57.6 V',
    maxEfficiency: '≥6000',
    tileLabels: {
      maxPvInputVoltage: 'Battery Type',
      ratedAcOutputPower: 'Nominal Capacity',
      ratedAcVoltage: 'Operating Voltage',
      maxEfficiency: 'Cycle Life',
    },
    heroType: 'Residential Energy Storage',
    featureLayout: 'quadrant',
    featureGroups: [],
  },
  'ORIANA-BESS C&I-(60-261)kWh': {
    maxPvInputVoltage: 'LFP',
    ratedAcOutputPower: '60~261 kWh',
    ratedAcVoltage: '314 Ah',
    maxEfficiency: '≥8000',
    tileLabels: {
      maxPvInputVoltage: 'Battery Type',
      ratedAcOutputPower: 'Capacity Range',
      ratedAcVoltage: 'Cell Capacity',
      maxEfficiency: 'Cycle Life',
    },
    heroType: 'C&I Energy Storage',
    featureLayout: 'quadrant',
    featureGroups: [],
  },
  'ORIANA-BESS Core-(100-261)kWh': {
    maxPvInputVoltage: 'LFP 314 Ah',
    ratedAcOutputPower: '100~261 kWh',
    ratedAcVoltage: '50 / 60 / 125 kW',
    maxEfficiency: '8000',
    tileLabels: {
      maxPvInputVoltage: 'Cell',
      ratedAcOutputPower: 'Rated Energy',
      ratedAcVoltage: 'Inverter Power',
      maxEfficiency: 'Cycle Life',
    },
    heroType: 'Utility Energy Storage',
    featureLayout: 'quadrant',
    featureGroups: [],
  },
}

const onGridPageDataBySlug = new Map(
  Object.entries(onGridSeriesPageData).map(([productName, data]) => [
    slugifyLabel(productName),
    data,
  ]),
)

/**
 * Resolve doc-driven specs/features for a catalogue series.
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
