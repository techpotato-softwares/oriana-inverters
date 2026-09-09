import { slugifyLabel } from './productMaster'

/**
 * Product page specs/features from docs (Products Page 2 + 3).
 * Quadrant featureGroups power the advantages section; list layout is used
 * for later on-grid 3-phase series.
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

  // --- Hybrid ---
  'ORI-OG7-EH1P(3-6)K02-NV-YD-L': {
    maxPvInputVoltage: '500 V',
    ratedAcOutputPower: '3~6 kW',
    ratedAcVoltage: '230 V',
    maxEfficiency: '96.2%',
    heroType: '1-Phase Hybrid Inverter',
    featureLayout: 'quadrant',
    featureGroups: [
      {
        title: 'High Performance & PV Compatibility',
        items: [
          '160% PV Oversizing – Supports up to 160% of rated DC power.',
          '21A PV Input – Compatible with high-power PV modules.',
          '200% Overload for 10s – Ensures stable motor, pump and AC startup.',
          'PV-Only Off-Grid – Reduces upfront system costs.',
        ],
      },
      {
        title: 'Flexible Battery & Energy Management',
        items: [
          '40–60V Battery Support – Compatible with any battery in this range.',
          'Smart Load Management – Extends backup for critical loads.',
          'Customizable Battery Backup – Ensures uninterrupted power.',
          'Existing PV System Support – Enables export control and off-grid use.',
        ],
      },
      {
        title: 'Backup, Generator & Expansion',
        items: [
          '<10ms On/Off-Grid Switching – Ensures uninterrupted power supply.',
          'Flexible Generator Connection – Supports multiple connection methods and auto control.',
          'Up to 6 Units in Parallel – Enables easy system capacity expansion.',
        ],
      },
      {
        title: 'Intelligent Control & Rugged Design',
        items: [
          '7-Inch Industrial Touchscreen – Offers a larger, user-friendly interface.',
          'IP66 Protection – Ensures reliable operation in harsh conditions.',
        ],
      },
    ],
  },
  'ORI-OG7-EH1P(8-12)K02-NV-YD-L': {
    maxPvInputVoltage: '500 V',
    ratedAcOutputPower: '8~12 kW',
    ratedAcVoltage: '230 V',
    maxEfficiency: '96.2%',
    heroType: '1-Phase Hybrid Inverter',
    featureLayout: 'quadrant',
    featureGroups: [
      {
        title: 'PV Performance & Power',
        items: [
          '160% PV Oversizing – Supports up to 160% of rated DC power.',
          '21A PV Input – Supports future high-power PV modules.',
          '200% Overload for 10s – Ensures stable startup of motors, pumps and ACs.',
          'PV-Only Off-Grid Operation – Reduces upfront system costs.',
        ],
      },
      {
        title: 'Battery & Load Management',
        items: [
          '40–60V Battery Compatibility – Supports any battery within this voltage range.',
          'Smart Load Management – Extends backup time for critical loads.',
          'Customizable Battery Backup – Ensures uninterrupted power supply.',
          'Existing PV System Support – Enables export control and off-grid operation.',
        ],
      },
      {
        title: 'Backup & System Flexibility',
        items: [
          '<10ms On/Off-Grid Switching – Ensures uninterrupted power supply.',
          'Flexible Generator Integration – Supports multiple connection methods and auto control.',
          'Up to 6 Units in Parallel – Enables system capacity expansion.',
        ],
      },
      {
        title: 'Smart Control & Protection',
        items: [
          '7-Inch Industrial Touchscreen – Provides a larger, user-friendly interface.',
          'IP66 Protection – Enables reliable operation in harsh conditions.',
        ],
      },
    ],
  },
  'ORI-OG6-EH3P(8-18)K02-NV-YD-L': {
    maxPvInputVoltage: '1000 V',
    ratedAcOutputPower: '8~18 kW',
    ratedAcVoltage: '380~400 V',
    maxEfficiency: '97.5%',
    heroType: '3-Phase Hybrid Inverter',
    featureLayout: 'quadrant',
    featureGroups: [
      {
        title: 'Advanced PV & Power Performance',
        items: [
          '160% PV Oversizing – Supports up to 160% of rated DC power.',
          '21A PV Input – Supports future high-power PV modules.',
          '200% Overload for 10s – Ensures stable startup of motors, pumps and ACs.',
          'Three-Phase Unbalanced Output – Supports up to 50% rated power per phase.',
        ],
      },
      {
        title: 'Flexible Energy & Battery Management',
        items: [
          'DC & AC Coupling – Enables PV expansion, battery charging and reliable off-grid power.',
          'Smart Load Management – Prioritizes loads to extend critical-load backup.',
          'Customizable Battery Backup – Sets the backup level for uninterrupted power.',
          'PV-Only Off-Grid Operation – Reduces upfront system costs.',
        ],
      },
      {
        title: 'Backup, Generator & System Expansion',
        items: [
          '<10ms On/Off-Grid Switching – Ensures uninterrupted power supply.',
          'Flexible Generator Integration – Supports multiple connection methods and auto control.',
          'Up to 6 Units in Parallel – Enables easy system capacity expansion.',
        ],
      },
      {
        title: 'Smart Control & Protection',
        items: [
          '7-Inch Industrial Touchscreen – Provides a larger, user-friendly interface.',
          'IP66 Protection – Ensures reliable operation in harsh conditions.',
        ],
      },
    ],
  },
  'ORI-OG6-EH3P(30-60)K-H(21A)': {
    maxPvInputVoltage: '1000 V',
    ratedAcOutputPower: '30~60 kW',
    ratedAcVoltage: '380~400 V',
    maxEfficiency: '98.1%',
    heroType: '3-Phase Hybrid Inverter',
    featureLayout: 'quadrant',
    featureGroups: [
      {
        title: 'PV & Energy Performance',
        items: [
          'Up to 100kW PV Input – Maximizes solar energy utilization.',
          '21A String Input Current – Supports high-power PV modules.',
          'Up to 2× PV Oversizing – Maximizes solar energy utilization.',
          '100–314Ah Battery Compatibility – Reduces overall system costs.',
          'Fast Battery Charging – Supports up to 168A / 200A charging current.',
          'Dual Battery Ports – Enables flexible configurations and easy capacity expansion.',
        ],
      },
      {
        title: 'Backup & Load Management',
        items: [
          '160% Off-Grid Overload – Supports 2s / 200ms overload for stable heavy-load startup.',
          'Battery Reserve Management – Ensures reliable backup across diverse scenarios.',
          'Intelligent Load Prioritization – Extends backup time for critical loads.',
          'Utility Bypass – Supplies backup loads directly from the grid.',
        ],
      },
      {
        title: 'Grid, Genset & System Integration',
        items: [
          'Weak-Grid & Genset Hybrid Control – Reduces system investment costs.',
          'DC & AC Coupling – Enables flexible retrofits and system expansion.',
          'PV & Storage Integration – Supports demand management and anti-reverse flow.',
          'Three-in-One Integration – Seamlessly integrates on-grid PV, wind power and diesel generators.',
          'Dynamic Reactive Power Compensation – Improves power factor and reduces reactive power charges.',
        ],
      },
      {
        title: 'Reliable Operation & Scalability',
        items: [
          '<10ms On/Off-Grid Switching – Ensures uninterrupted power supply.',
          'Up to 600kW Parallel Operation – Supports multi-unit systems; Solis STS cabinet recommended above 6 units.',
          'Patented Cooling Technology – Ensures reliable operation at high temperatures.',
        ],
      },
    ],
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

  // --- BESS ---
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
    featureGroups: [
      {
        title: 'Smart Energy Management & Connectivity',
        items: [
          'Unified Monitoring Platform – Supports OTA updates.',
          '100+ VPP/EMS Integrations – Over 100 third-party manufacturers onboarded or being onboarded.',
          'Oriana AI Energy Management – Enables smart energy management.',
          'Smart Port – Supports grid-tied inverters, generators and AC wind inverters.',
        ],
      },
      {
        title: 'Battery Performance & Intelligent BMS',
        items: [
          'A+ Grade Cells – Delivers 8,000+ cycle life.',
          'Intelligent BMS – Enables real-time cell monitoring and fault recovery.',
          'Automatic Pack Identification – Quickly identifies and locates faulty battery packs.',
          '7-Inch LCD & Bluetooth – Enables quick commissioning and automatic battery recognition.',
        ],
      },
      {
        title: 'Safety, Reliability & Easy Installation',
        items: [
          'Five-Level Safety Protection – Includes temperature monitoring, ceramic insulation, directional venting, aerosol protection and mica insulation.',
          'Vertical Stacking Design – Enables quick installation; each pack weighs only 151kg.',
          'Top-Brand Fans – Provide up to 10 years of maintenance-free operation.',
        ],
      },
      {
        title: 'Integrated Power & System Scalability',
        items: [
          'Modular Design – 20kWh per module; up to 260kWh per cluster.',
          'Large-Scale Expansion – Supports 6 clusters in parallel, up to 1,560kWh.',
          'Dual DC Output Ports – Connects multiple clusters without a combiner box.',
          '4-in-1 Power Electronics – Integrates PV, PCS, STS and EMS.',
          '200% PV Oversizing – Maximizes solar energy utilization.',
          '21A String Input – Matches high-power PV modules.',
          '<10ms Grid/Off-Grid Switching – Ensures seamless power transition.',
          '160% Overload for 200ms – Supports heavy loads in off-grid mode.',
        ],
      },
    ],
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
    featureGroups: [
      {
        title: 'Advanced Safety & Protection',
        items: [
          'Four-Layer Separation – Structural, safety, thermal and protective layers enable safer, plug-and-play installation.',
          '15-Level Protection – Protects from cell to cabinet to complete system level.',
          'Layered Detection & Isolation – Helps contain and manage extreme scenarios.',
          'IP66 + IP55 Protection – IP66 inverter, IP55 cabinet and C5 anti-corrosion protection for demanding sites.',
        ],
      },
      {
        title: 'Integrated Power & Scalability',
        items: [
          'AC & DC Expansion – Scales up to 1.25MW / 15.66MWh.',
          '4-in-1 Integration – Combines PCS, PV, STS and EMS with one central controller.',
          '<10ms Backup Switching – Reduces failure points without additional equipment.',
        ],
      },
      {
        title: 'Thermal Management & Reliability',
        items: [
          'Hybrid Air Duct Design – Improves thermal management efficiency by up to 30%.',
          'Separated Air-Cooled Architecture – Reduces system complexity and service time.',
          'Industrial-Grade Components – Designed for long-term, maintenance-free operation.',
        ],
      },
      {
        title: 'Smart O&M & Energy Optimisation',
        items: [
          'Remote Monitoring & Digital O&M – Enables wireless system updates.',
          'Intelligent Energy Management – Supports forecasting, intelligent dispatch and revenue optimisation.',
          'Broad EMS/VPP Compatibility – Enables flexible integration with EMS and VPP platforms.',
        ],
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
