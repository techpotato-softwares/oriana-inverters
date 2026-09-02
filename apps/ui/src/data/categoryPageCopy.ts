export const CATEGORY_HERO_IMAGE = '/assets/products/category-banner.png'

export type CategoryPageCopy = {
  paragraphs: string[]
}

/** Intro copy for each Products submenu (category) page. */
export const categoryPageCopy: Record<string, CategoryPageCopy> = {
  'on-grid-inverters': {
    paragraphs: [
      'Oriana On-Grid Solar Inverters are engineered to efficiently convert solar energy into usable AC power and seamlessly integrate it with the electrical grid. Designed with advanced power electronics, intelligent MPPT technology, and comprehensive protection features, our inverters help maximize solar generation while delivering reliable, efficient, and stable performance.',
      'From residential rooftops to commercial and industrial installations, Oriana offers scalable on-grid solutions designed for the evolving needs of modern solar energy systems.',
    ],
  },
  'hybrid-inverters': {
    paragraphs: [
      'Oriana Hybrid Solar Inverters intelligently manage solar, battery, and grid power to deliver efficient energy utilization with reliable backup. Designed to maximize solar self-consumption, store surplus energy, and provide power during grid outages, Oriana Hybrid Inverters offer a smarter way to manage energy for modern homes, businesses, and commercial applications.',
      'With advanced MPPT technology, intelligent battery management, smart monitoring, and flexible operating modes, Oriana Hybrid Inverters are engineered to provide greater energy independence and dependable performance.',
    ],
  },
  'utility-scale-inverters': {
    paragraphs: [
      'Oriana Utility-Scale Solar Inverter is engineered for high-capacity solar power plants where efficiency, reliability, grid performance, and long-term operational stability are critical.',
      'Designed for large-scale photovoltaic installations, our utility inverters combine advanced power electronics, intelligent MPPT technology, robust thermal management, and comprehensive protection to maximize energy yield and support reliable plant operation.',
      'From utility-scale solar parks to large ground-mounted PV projects, Oriana delivers inverter solutions engineered to perform at scale.',
    ],
  },
  bess: {
    paragraphs: [
      'Oriana Battery Energy Storage Systems (BESS) are designed to store electrical energy and deliver it when it matters most. By combining advanced battery technology, intelligent energy management, power conversion, and comprehensive safety systems, Oriana BESS enables businesses and energy projects to optimize energy consumption, integrate renewable power, and improve power reliability.',
      'From commercial and industrial facilities to renewable energy projects and grid-scale applications, Oriana BESS provides a flexible and scalable approach to modern energy management.',
    ],
  },
}

export function getCategoryPageCopy(slug: string): CategoryPageCopy | null {
  return categoryPageCopy[slug] ?? null
}
