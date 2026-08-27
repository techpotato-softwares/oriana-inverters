import type { Payload, PayloadRequest } from 'payload'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import { caseStudies } from '@/data/caseStudies'
import { staticDistributors } from '@/data/distributors'
import { mainNav, megaMenus } from '@/config/navigation'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/** Resolve assets from apps/ui/public */
function uiAssetsRoot(): string {
  return path.resolve(dirname, '../../../../../ui/public/assets')
}

async function ensureFolder(
  payload: Payload,
  name: string,
  folderIds: Record<string, number | string>,
): Promise<number | string | undefined> {
  try {
    const existing = await payload.find({
      collection: 'payload-folders' as 'media',
      where: { name: { equals: name } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })
    if (existing.docs[0]) {
      folderIds[name] = existing.docs[0].id
      return existing.docs[0].id
    }
    const created = await payload.create({
      collection: 'payload-folders' as 'media',
      data: { name } as never,
      overrideAccess: true,
    })
    folderIds[name] = created.id
    return created.id
  } catch (err) {
    payload.logger.warn(`Folder "${name}" skipped: ${err}`)
    return undefined
  }
}

async function uploadAsset(
  payload: Payload,
  req: PayloadRequest | undefined,
  relativePath: string,
  alt: string,
  folderId: number | string | undefined,
  mediaType: 'image' | 'icon' = 'image',
): Promise<number | string | null> {
  const fullPath = path.join(uiAssetsRoot(), relativePath)
  if (!fs.existsSync(fullPath)) {
    payload.logger.warn(`Asset missing: ${fullPath}`)
    return null
  }
  const data = fs.readFileSync(fullPath)
  const name = path.basename(fullPath)
  try {
    const doc = await payload.create({
      collection: 'media',
      data: {
        alt,
        mediaType,
        ...(folderId ? { folder: folderId } : {}),
      } as never,
      file: {
        data,
        mimetype: name.endsWith('.svg')
          ? 'image/svg+xml'
          : name.endsWith('.png')
            ? 'image/png'
            : 'application/octet-stream',
        name,
        size: data.length,
      },
      overrideAccess: true,
      context: { disableRevalidate: true },
      ...(req ? { req } : {}),
    })
    return doc.id
  } catch (err) {
    payload.logger.warn(`Upload failed for ${relativePath}: ${err}`)
    return null
  }
}

async function upsertBySlug(
  payload: Payload,
  collection: 'case-studies' | 'solutions' | 'distributors',
  slug: string,
  data: Record<string, unknown>,
) {
  const existing = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  const body = { ...data, _status: 'published' }
  if (existing.docs[0]) {
    return payload.update({
      collection,
      id: existing.docs[0].id,
      data: body as never,
      overrideAccess: true,
      context: { disableRevalidate: true },
    })
  }
  return payload.create({
    collection,
    data: body as never,
    overrideAccess: true,
    context: { disableRevalidate: true },
  })
}

export async function seedOrianaContent({
  payload,
  req,
  force = false,
}: {
  payload: Payload
  req?: PayloadRequest
  force?: boolean
}): Promise<void> {
  payload.logger.info('— Seeding Oriana marketing content...')

  if (force) {
    const wipe: Array<
      | 'case-studies'
      | 'faqs'
      | 'videos'
      | 'distributors'
      | 'jobs'
      | 'certifications'
      | 'awards'
      | 'partners'
      | 'solutions'
      | 'warranty-plans'
      | 'sustainability-reports'
    > = [
      'case-studies',
      'faqs',
      'videos',
      'distributors',
      'jobs',
      'certifications',
      'awards',
      'partners',
      'solutions',
      'warranty-plans',
      'sustainability-reports',
    ]
    for (const collection of wipe) {
      await payload.db.deleteMany({ collection, req: req!, where: {} }).catch(() => undefined)
    }
  }

  const folderIds: Record<string, number | string> = {}
  for (const name of [
    'Hero',
    'Products',
    'Case Studies',
    'Illustrations',
    'Icons',
    'Partners',
    'Downloads',
  ]) {
    await ensureFolder(payload, name, folderIds)
  }

  const productFolder = folderIds['Products']
  const illustFolder = folderIds['Illustrations']

  const mediaMap: Record<string, number | string | null> = {
    'single-phase': await uploadAsset(
      payload,
      req,
      'products/single-phase.svg',
      'Single-phase inverter',
      productFolder,
    ),
    'three-phase': await uploadAsset(
      payload,
      req,
      'products/three-phase.svg',
      'Three-phase inverter',
      productFolder,
    ),
    'utility-scale': await uploadAsset(
      payload,
      req,
      'products/utility-scale.svg',
      'Utility-scale inverter',
      productFolder,
    ),
    'hybrid-storage': await uploadAsset(
      payload,
      req,
      'products/hybrid-storage.svg',
      'Hybrid storage inverter',
      productFolder,
    ),
    careers: await uploadAsset(
      payload,
      req,
      'illustrations/careers.svg',
      'Careers illustration',
      illustFolder,
    ),
    sustainability: await uploadAsset(
      payload,
      req,
      'illustrations/sustainability.svg',
      'Sustainability illustration',
      illustFolder,
    ),
    logoLight: await uploadAsset(
      payload,
      req,
      'logo-light.png',
      'Oriana logo light',
      folderIds['Icons'],
      'icon',
    ),
    logoDark: await uploadAsset(
      payload,
      req,
      'logo-dark.png',
      'Oriana logo dark',
      folderIds['Icons'],
      'icon',
    ),
  }

  // Header navigation
  await payload.updateGlobal({
    slug: 'header',
    data: {
      hotlineLabel: 'Customer Hotline',
      localeLabel: 'USA · English',
      searchLabel: 'Search',
      loginLabel: 'Login',
      loginHref: '/contact',
      whereToBuy: { label: 'Where to Buy', href: '/where-to-buy' },
      requestQuote: { label: 'Request a Quote', href: '/contact' },
      primaryNav: [
        {
          key: 'products',
          label: megaMenus.products.label,
          columns: megaMenus.products.columns.map((col) => ({
            title: col.title,
            href: col.href || undefined,
            links: col.links,
          })),
        },
      ],
      _status: 'published',
    } as never,
    overrideAccess: true,
    context: { disableRevalidate: true },
  })

  // Site settings logos
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Oriana Inverters',
      hotline: '+1 (800) ORIANA-1',
      ...(mediaMap.logoLight ? { logoLight: mediaMap.logoLight } : {}),
      ...(mediaMap.logoDark ? { logoDark: mediaMap.logoDark } : {}),
    } as never,
    overrideAccess: true,
    context: { disableRevalidate: true },
  })

  // Home
  await payload.updateGlobal({
    slug: 'home',
    data: {
      heroMode: 'fallback',
      fallbackHero: {
        eyebrow: 'Oriana',
        headline: 'Clean power that crosses borders',
        subheadline:
          'High-efficiency inverters and storage platforms for homes, industry, and utility grids — engineered for partners who ship projects worldwide.',
        primaryCta: { label: 'Explore solutions', href: '/solutions/residential' },
        secondaryCta: { label: 'Become a partner', href: '/contact' },
      },
      strategiesSection: {
        eyebrow: 'Go-to-market strategies',
        title: 'One platform. Four ways to win.',
        intro:
          "Meet Ori's crew — each strategy tailored for the partners and projects shaping the global energy transition.",
        items: [
          {
            idKey: 'home',
            label: 'For Home',
            title: 'Residential energy independence',
            description:
              'Hybrid inverters and storage that keep households powered — quietly, efficiently, every day.',
            href: '/solutions/residential',
          },
          {
            idKey: 'business',
            label: 'For Business',
            title: 'Commercial & industrial scale',
            description:
              'Rooftop and carport platforms built for uptime, bankability, and fast commissioning.',
            href: '/solutions/commercial',
          },
          {
            idKey: 'utility',
            label: 'For Utility',
            title: 'Utility-scale grid strength',
            description:
              'Central and string architectures for multi-megawatt farms and IPP portfolios.',
            href: '/solutions/utility',
          },
          {
            idKey: 'storage',
            label: 'For Storage',
            title: 'Flexible energy services',
            description:
              'Hybrid conversion for peak shaving, backup, and emerging grid-service markets.',
            href: '/solutions/storage',
          },
        ],
      },
      impactSection: {
        title: 'Our Impact',
        body: 'As a trusted solar inverter brand, we are committed to powering India\'s clean energy transition through advanced technology, nationwide reach, and exceptional customer support.',
        link: { label: 'Discover who we are', href: '/about' },
        stats: [
          { iconKey: 'award', value: '10+', label: 'Solar industry project experience' },
          { iconKey: 'map', value: 'PAN India', label: 'Market presence' },
          { iconKey: 'zap', value: 'GW+', label: 'Inverter distribution & experience' },
          { iconKey: 'building', value: '500+', label: 'Channel & service partners' },
          { iconKey: 'leaf', value: '99.6%', label: 'Peak conversion efficiency' },
        ],
      },
      whySection: {
        eyebrow: 'Why Oriana',
        title: 'Excellence that travels with every shipment',
        body: 'From first sample to fleet deployment, we help international clients specify, certify, and scale clean power conversion with confidence.',
        items: [
          {
            iconKey: 'microscope',
            title: 'Technological innovation',
            copy: 'Continuous R&D across conversion efficiency, grid codes, and intelligent monitoring.',
            href: '/about',
          },
          {
            iconKey: 'shield',
            title: 'Bankable manufacturing',
            copy: 'Certified production, rigorous QA, and supply chains ready for multi-region delivery.',
            href: '/about/certifications',
          },
          {
            iconKey: 'globe',
            title: 'Local presence, global reach',
            copy: 'Distributor networks and support coverage that follow your projects across borders.',
            href: '/where-to-buy',
          },
          {
            iconKey: 'headphones',
            title: 'Partner-grade service',
            copy: 'Training, documentation, and responsive after-sales for installers and EPCs.',
            href: '/support',
          },
        ],
      },
      reachSection: {
        eyebrow: 'International clients',
        title: 'Ready wherever your next project lands',
        body: 'Regional documentation, certification pathways, and partner enablement — so cross-border deals move from RFQ to commissioning without friction.',
        regions: [
          { name: 'North America', focus: 'UL / NEC ready platforms' },
          { name: 'Europe & UK', focus: 'Grid-code compliant portfolios' },
          { name: 'Middle East', focus: 'High-irradiance utility lines' },
          { name: 'Asia Pacific', focus: 'C&I + storage growth markets' },
          { name: 'Latin America', focus: 'Distributed generation & EPCs' },
          { name: 'Africa', focus: 'Resilient off-grid & hybrid' },
        ],
        cta: { label: 'Find a distributor', href: '/where-to-buy' },
      },
      caseStudiesSection: {
        eyebrow: 'Customer success',
        title: 'Case studies',
        link: { label: 'View all', href: '/case-studies' },
        limit: 3,
      },
      newsSection: {
        eyebrow: 'News & media',
        title: 'Latest from Oriana',
        mode: 'live',
        postsLimit: 3,
        link: { label: 'Newsroom →', href: '/posts' },
      },
      supportStrip: {
        hotlineLabel: 'Customer Hotline',
        hotlineNote: 'Customer hotline: +1 (800) ORIANA-1',
        downloads: [
          { label: 'Datasheets', href: '/resources/downloads' },
          { label: 'Installation manuals', href: '/resources/downloads' },
          { label: 'Certificates', href: '/resources/downloads' },
          { label: 'Warranty documents', href: '/resources/downloads' },
        ],
        partnerCta: {
          title: 'Partner with us',
          body: "Looking to distribute Oriana across a new market? Let's talk territory, training, and co-marketing.",
          label: 'Request partnership',
          href: '/contact',
        },
      },
      seo: {
        metaTitle: 'Oriana Inverters | Advanced Solar Inverter Solutions',
        metaDescription:
          'High-efficiency string, hybrid, and utility-scale solar inverters for residential, commercial, and utility applications.',
      },
      _status: 'published',
    } as never,
    overrideAccess: true,
    context: { disableRevalidate: true },
  })

  // About
  await payload.updateGlobal({
    slug: 'about',
    data: {
      hero: {
        eyebrow: 'About',
        title: 'Powering a Cleaner Tomorrow',
        description:
          'Oriana Inverters is a global manufacturer of solar inverter technology, serving residential, commercial, and utility markets with products engineered for performance and longevity.',
      },
      storyTitle: 'Our Story',
      storyParagraphs: [
        {
          text: 'Founded by power electronics engineers with decades of experience in renewable energy, Oriana was built on a simple belief: the world needs inverters that are as reliable as the sun itself.',
        },
        {
          text: 'Today, over one million Oriana inverters operate across 25 countries — on rooftops, in industrial parks, and across desert solar farms — converting sunlight into clean, dependable power for millions of people.',
        },
      ],
      stats: [
        { value: '2010', label: 'Founded' },
        { value: '1M+', label: 'Units Deployed' },
        { value: '25+', label: 'Countries' },
        { value: '500+', label: 'Team Members' },
      ],
      values: [
        {
          title: 'Engineering Excellence',
          description:
            'Every product undergoes rigorous design validation, environmental stress testing, and field trials before market release.',
        },
        {
          title: 'Customer Partnership',
          description:
            'We work alongside installers, EPCs, and distributors with dedicated technical support, training, and co-marketing resources.',
        },
        {
          title: 'Sustainable Future',
          description:
            'Our mission is to accelerate the global transition to clean energy through reliable, accessible power conversion technology.',
        },
      ],
      seo: { metaTitle: 'About Us', metaDescription: 'Learn about Oriana Inverters.' },
      _status: 'published',
    } as never,
    overrideAccess: true,
    context: { disableRevalidate: true },
  })

  // Careers
  await payload.updateGlobal({
    slug: 'careers',
    data: {
      hero: {
        eyebrow: 'About',
        title: 'Careers at Oriana',
        description:
          'Build the future of clean power conversion with a global team of engineers, makers, and problem-solvers.',
      },
      ...(mediaMap.careers ? { image: mediaMap.careers } : {}),
      whyTitle: 'Why Oriana',
      whyBody:
        'We offer competitive benefits, hybrid work options for eligible roles, and the opportunity to work on products deployed across 25 countries.',
      openingsTitle: 'Open Positions',
      applyHref: '/contact',
      applyLabel: 'Apply Now',
      seo: { metaTitle: 'Careers', metaDescription: 'Join the Oriana team.' },
      _status: 'published',
    } as never,
    overrideAccess: true,
    context: { disableRevalidate: true },
  })

  // Support
  await payload.updateGlobal({
    slug: 'support',
    data: {
      hero: {
        eyebrow: 'Support',
        title: 'Service & Support',
        description:
          'Our technical team supports installers, EPCs, and end customers across every stage — from commissioning to long-term O&M.',
      },
      channels: [
        {
          iconKey: 'phone',
          title: 'Customer Hotline',
          detail: '+1 (800) ORIANA-1',
          note: 'Mon–Fri, 8 AM – 6 PM local time',
        },
        {
          iconKey: 'mail',
          title: 'Technical Email',
          detail: 'support@orianainverters.com',
          note: 'Response within 1 business day',
        },
        {
          iconKey: 'wrench',
          title: 'Installer Support',
          detail: 'installers@orianainverters.com',
          note: 'Dedicated line for certified partners',
        },
        {
          iconKey: 'mapPin',
          title: 'Regional Offices',
          detail: 'North America · Europe · APAC',
          note: 'Find your local representative',
        },
      ],
      selfServiceTitle: 'Self-Service Resources',
      selfServiceLinks: [
        { label: 'Download Center', href: '/resources/downloads' },
        { label: 'Warranty', href: '/support/warranty' },
        { label: 'FAQs', href: '/resources/faqs' },
        { label: 'Installation Videos', href: '/resources/videos' },
      ],
      ticketCta: {
        title: 'Submit a Support Ticket',
        body: 'Describe your issue, include the inverter serial number and fault code if applicable.',
        label: 'Open Contact Form',
        href: '/contact',
      },
      seo: { metaTitle: 'Service & Support' },
      _status: 'published',
    } as never,
    overrideAccess: true,
    context: { disableRevalidate: true },
  })

  // Sustainability
  await payload.updateGlobal({
    slug: 'sustainability',
    data: {
      hero: {
        eyebrow: 'Sustainability',
        title: 'Powering a Sustainable Future',
        description:
          'Oriana integrates environmental responsibility into product design, manufacturing, and supply chain operations.',
      },
      ...(mediaMap.sustainability ? { image: mediaMap.sustainability } : {}),
      highlights: [
        { value: '45%', label: 'Renewable energy at manufacturing sites' },
        { value: 'ISO 14001', label: 'Environmental management certified' },
        { value: '2025', label: 'ESG report published' },
        { value: '1M+', label: 'Clean energy units deployed' },
      ],
      approachTitle: 'Our Approach',
      approachBody:
        'Every Oriana inverter helps displace fossil generation over a 25+ year operational life.',
      links: [
        { label: 'Our Strategy', href: '/sustainability/strategy' },
        { label: 'Reports & Policies →', href: '/sustainability/reports' },
      ],
      strategyHero: {
        eyebrow: 'Sustainability',
        title: 'Sustainability Strategy',
        description: 'Our roadmap to net-zero operations and responsible product lifecycle management.',
      },
      strategySections: [
        {
          heading: '2030 Targets',
          body: 'Reduce Scope 1 and 2 greenhouse gas emissions by 50% versus 2020 baseline. Achieve 80% renewable electricity at major production sites.',
        },
        {
          heading: 'Product Lifecycle',
          body: 'Lifecycle assessments on flagship platforms; extended warranty and modular serviceability reduce e-waste.',
        },
        {
          heading: 'Supply Chain',
          body: 'Key suppliers audited against our Supplier Code of Conduct.',
        },
      ],
      seo: { metaTitle: 'Sustainability' },
      _status: 'published',
    } as never,
    overrideAccess: true,
    context: { disableRevalidate: true },
  })

  // Contact form (Form Builder) + link to contact global
  let contactFormId: number | string | null = null
  try {
    const existingForms = await payload.find({
      collection: 'forms',
      where: { title: { equals: 'Contact Form' } },
      limit: 1,
      overrideAccess: true,
    })
    if (existingForms.docs[0]) {
      contactFormId = existingForms.docs[0].id
    } else {
      const { contactForm } = await import('../contact-form')
      const created = await payload.create({
        collection: 'forms',
        data: contactForm,
        overrideAccess: true,
        context: { disableRevalidate: true },
      })
      contactFormId = created.id
    }
  } catch (err) {
    payload.logger.warn(`Contact form seed skipped: ${err}`)
  }

  // Contact
  await payload.updateGlobal({
    slug: 'contact',
    data: {
      hero: {
        eyebrow: 'Contact',
        title: "Let's Build Together",
        description:
          'Tell us about your project. Our engineering and sales teams respond within one business day.',
      },
      cards: [
        { iconKey: 'mail', title: 'Email', detail: 'info@orianainverters.com' },
        { iconKey: 'phone', title: 'Phone', detail: '+1 (800) ORIANA-1' },
        { iconKey: 'mapPin', title: 'Headquarters', detail: 'United States' },
      ],
      ...(contactFormId ? { form: contactFormId } : {}),
      successMessage:
        'Thank you for reaching out. Our team will contact you within one business day.',
      seo: { metaTitle: 'Contact Us' },
      _status: 'published',
    } as never,
    overrideAccess: true,
    context: { disableRevalidate: true },
  })

  // Solutions
  const solutions = [
    {
      slug: 'residential',
      title: 'Residential Solutions',
      description:
        'Power your home with Oriana single-phase string and hybrid inverters — engineered for maximum rooftop energy harvest, battery integration, and decades of reliable operation.',
      benefits: [
        'Single-phase and three-phase residential grid-tied inverters',
        'Hybrid models with seamless battery backup switching',
        'WiFi monitoring with homeowner-friendly app',
        'Quiet operation with fanless or low-noise designs',
        '10-year standard warranty with extension options',
      ],
      segmentKeys: ['residential', 'storage'],
      imageKey: 'single-phase',
    },
    {
      slug: 'commercial',
      title: 'Commercial & Industrial',
      description:
        'Scale your business energy independence with three-phase inverter systems designed for warehouses, factories, data centers, and commercial rooftops.',
      benefits: [
        'C&I grid-tied string inverters for rooftops and carports',
        'Multi-MPPT for complex rooftop geometries',
        'Fleet monitoring and SCADA integration',
        'AFCI and rapid shutdown compliance',
        'Dedicated C&I technical support team',
      ],
      segmentKeys: ['commercial'],
      imageKey: 'three-phase',
    },
    {
      slug: 'utility',
      title: 'Utility-Scale Solutions',
      description:
        'Deploy megawatt-class solar plants with Oriana utility platforms — built for high efficiency, grid code compliance, and long operational life.',
      benefits: [
        'Utility grid-tied inverters for large plants',
        'Outdoor-rated enclosures',
        'Advanced grid-support functions',
        'Modular serviceability',
        'Global grid code readiness',
      ],
      segmentKeys: ['utility'],
      imageKey: 'utility-scale',
    },
    {
      slug: 'storage',
      title: 'Energy Storage Solutions',
      description:
        'Integrate battery storage seamlessly with Oriana hybrid inverters — enabling backup power, peak shaving, time-of-use optimization, and grid services revenue.',
      benefits: [
        'Compatible with leading lithium battery brands',
        'Fast backup switching',
        'Time-of-use and self-consumption optimization',
        'Virtual power plant (VPP) ready',
        'Black start and islanding capability',
      ],
      segmentKeys: ['storage', 'residential'],
      imageKey: 'hybrid-storage',
    },
  ] as const

  for (const s of solutions) {
    await upsertBySlug(payload, 'solutions', s.slug, {
      title: s.title,
      slug: s.slug,
      description: s.description,
      benefits: s.benefits.map((text) => ({ text })),
      segmentKeys: [...s.segmentKeys],
      ...(mediaMap[s.imageKey] ? { image: mediaMap[s.imageKey] } : {}),
      primaryCta: { label: 'Request a Quote', href: '/contact' },
      secondaryCta: { label: 'View Products', href: '/products' },
    })
  }

  // Case studies
  const imageByPath: Record<string, string> = {
    '/assets/products/three-phase.svg': 'three-phase',
    '/assets/products/utility-scale.svg': 'utility-scale',
    '/assets/products/hybrid-storage.svg': 'hybrid-storage',
  }
  for (const cs of caseStudies) {
    const imgKey = imageByPath[cs.image]
    await upsertBySlug(payload, 'case-studies', cs.slug, {
      title: cs.title,
      slug: cs.slug,
      segment: cs.segment,
      capacity: cs.capacity,
      products: cs.products,
      location: cs.location,
      summary: cs.summary,
      challenge: cs.challenge,
      solution: cs.solution,
      results: cs.results.map((text) => ({ text })),
      stats: cs.stats,
      year: cs.year,
      featured: true,
      ...(imgKey && mediaMap[imgKey] ? { image: mediaMap[imgKey] } : {}),
    })
  }

  // Distributors
  for (const d of staticDistributors) {
    await upsertBySlug(payload, 'distributors', d.id, {
      name: d.name,
      slug: d.id,
      type: d.type,
      city: d.city,
      state: d.state,
      country: d.country,
      region: d.region,
      email: d.email,
      phone: d.phone,
    })
  }

  // Jobs
  const jobs = [
    {
      title: 'Power Electronics Engineer',
      location: 'San Jose, CA',
      department: 'R&D',
      type: 'Full-time',
    },
    {
      title: 'Applications Engineer — Utility-Scale',
      location: 'Austin, TX',
      department: 'Technical Sales',
      type: 'Full-time',
    },
    {
      title: 'Quality Assurance Specialist',
      location: 'Phoenix, AZ',
      department: 'Manufacturing',
      type: 'Full-time',
    },
    {
      title: 'Customer Support Specialist',
      location: 'Remote — US',
      department: 'Service',
      type: 'Full-time',
    },
  ]
  for (const [i, job] of jobs.entries()) {
    const existing = await payload.find({
      collection: 'jobs',
      where: { title: { equals: job.title } },
      limit: 1,
      overrideAccess: true,
    })
    const data = { ...job, sortOrder: i, _status: 'published' }
    if (existing.docs[0]) {
      await payload.update({
        collection: 'jobs',
        id: existing.docs[0].id,
        data: data as never,
        overrideAccess: true,
        context: { disableRevalidate: true },
      })
    } else {
      await payload.create({
        collection: 'jobs',
        data: data as never,
        overrideAccess: true,
        context: { disableRevalidate: true },
      })
    }
  }

  // Certifications
  const certs = [
    { name: 'UL 1741 SA', scope: 'Distributed energy resources', region: 'North America' },
    { name: 'IEEE 1547-2018', scope: 'Interconnection standards', region: 'North America' },
    { name: 'IEC 62109-1/2', scope: 'Safety of power converters', region: 'Global' },
    { name: 'EN 50549', scope: 'Grid connection', region: 'Europe' },
    { name: 'ISO 9001:2015', scope: 'Quality management', region: 'Global' },
    { name: 'ISO 14001:2015', scope: 'Environmental management', region: 'Global' },
  ]
  for (const [i, c] of certs.entries()) {
    const existing = await payload.find({
      collection: 'certifications',
      where: { name: { equals: c.name } },
      limit: 1,
      overrideAccess: true,
    })
    const data = { ...c, sortOrder: i, _status: 'published' }
    if (existing.docs[0]) {
      await payload.update({
        collection: 'certifications',
        id: existing.docs[0].id,
        data: data as never,
        overrideAccess: true,
        context: { disableRevalidate: true },
      })
    } else {
      await payload.create({
        collection: 'certifications',
        data: data as never,
        overrideAccess: true,
        context: { disableRevalidate: true },
      })
    }
  }

  // Awards
  const awards = [
    { year: '2025', title: 'Top Brand — Solar Inverters', org: 'Energy Storage News' },
    { year: '2024', title: 'Innovation Award — Hybrid Technology', org: 'Intersolar Europe' },
    { year: '2024', title: 'Bankability Leader', org: 'BloombergNEF Tier 1' },
  ]
  for (const [i, a] of awards.entries()) {
    const existing = await payload.find({
      collection: 'awards',
      where: { title: { equals: a.title } },
      limit: 1,
      overrideAccess: true,
    })
    const data = { ...a, sortOrder: i, _status: 'published' }
    if (existing.docs[0]) {
      await payload.update({
        collection: 'awards',
        id: existing.docs[0].id,
        data: data as never,
        overrideAccess: true,
        context: { disableRevalidate: true },
      })
    } else {
      await payload.create({
        collection: 'awards',
        data: data as never,
        overrideAccess: true,
        context: { disableRevalidate: true },
      })
    }
  }

  // Partners
  const partners = [
    { group: 'Distribution Partners', names: ['SolarEdge Distribution NA', 'GreenPower Wholesale', 'EuroSolar Components', 'APAC Energy Solutions'] },
    { group: 'Technology Alliances', names: ['Leading Battery OEMs', 'Monitoring Platform Integrators', 'EV Charger Manufacturers', 'Smart Home Ecosystems'] },
    { group: 'EPC & Developer Partners', names: ['Tier-1 Solar Developers', 'Commercial Rooftop Specialists', 'Utility-Scale EPC Firms', 'Microgrid Integrators'] },
  ]
  let pSort = 0
  for (const g of partners) {
    for (const name of g.names) {
      const existing = await payload.find({
        collection: 'partners',
        where: { name: { equals: name } },
        limit: 1,
        overrideAccess: true,
      })
      const data = { name, group: g.group, sortOrder: pSort++, _status: 'published' }
      if (existing.docs[0]) {
        await payload.update({
          collection: 'partners',
          id: existing.docs[0].id,
          data: data as never,
          overrideAccess: true,
          context: { disableRevalidate: true },
        })
      } else {
        await payload.create({
          collection: 'partners',
          data: data as never,
          overrideAccess: true,
          context: { disableRevalidate: true },
        })
      }
    }
  }

  // FAQs
  const faqGroups = [
    {
      group: 'Product Selection',
      items: [
        {
          q: 'How do I choose between single-phase and three-phase inverters?',
          a: 'Single-phase inverters are designed for residential systems up to ~11.4 kW. Three-phase models are required for commercial rooftops and systems above typical residential limits.',
        },
        {
          q: 'Are Oriana hybrid inverters compatible with third-party batteries?',
          a: 'Yes. Oriana hybrid inverters support leading lithium battery brands via standard communication protocols.',
        },
      ],
    },
    {
      group: 'Installation & Commissioning',
      items: [
        {
          q: 'Who can install Oriana inverters?',
          a: 'Installation must be performed by licensed electricians familiar with local electrical codes and solar interconnection requirements.',
        },
        {
          q: 'How do I register my inverter for warranty?',
          a: 'Register your product within 60 days of installation via the Oriana Monitoring app or the warranty portal.',
        },
      ],
    },
    {
      group: 'Monitoring & Troubleshooting',
      items: [
        {
          q: 'How do I connect my inverter to WiFi?',
          a: 'Use the Oriana Monitoring app to scan the QR code on the inverter label and follow the on-screen pairing steps.',
        },
        {
          q: 'What should I do if my inverter shows a fault code?',
          a: 'Note the fault code displayed on the unit or app, then consult the troubleshooting section of your installation manual.',
        },
      ],
    },
  ]
  let fSort = 0
  for (const g of faqGroups) {
    for (const item of g.items) {
      const existing = await payload.find({
        collection: 'faqs',
        where: { question: { equals: item.q } },
        limit: 1,
        overrideAccess: true,
      })
      const data = {
        group: g.group,
        question: item.q,
        answer: item.a,
        sortOrder: fSort++,
        _status: 'published',
      }
      if (existing.docs[0]) {
        await payload.update({
          collection: 'faqs',
          id: existing.docs[0].id,
          data: data as never,
          overrideAccess: true,
          context: { disableRevalidate: true },
        })
      } else {
        await payload.create({
          collection: 'faqs',
          data: data as never,
          overrideAccess: true,
          context: { disableRevalidate: true },
        })
      }
    }
  }

  // Videos
  const videos = [
    { title: 'Residential Hybrid — Unboxing & Wall Mount', category: 'Installation', duration: '8:42' },
    { title: 'Commissioning via Oriana Monitoring App', category: 'Commissioning', duration: '12:15' },
    { title: 'C&I Three-Phase — Rooftop Installation', category: 'Installation', duration: '15:30' },
    { title: 'Utility Grid-Tied — Plant Overview', category: 'Product Overview', duration: '6:20' },
    { title: 'Troubleshooting Common Fault Codes', category: 'Support', duration: '10:05' },
    { title: 'Battery Integration with Hybrid Inverters', category: 'Energy Storage', duration: '11:48' },
  ]
  for (const [i, v] of videos.entries()) {
    const existing = await payload.find({
      collection: 'videos',
      where: { title: { equals: v.title } },
      limit: 1,
      overrideAccess: true,
    })
    const data = { ...v, sortOrder: i, _status: 'published' }
    if (existing.docs[0]) {
      await payload.update({
        collection: 'videos',
        id: existing.docs[0].id,
        data: data as never,
        overrideAccess: true,
        context: { disableRevalidate: true },
      })
    } else {
      await payload.create({
        collection: 'videos',
        data: data as never,
        overrideAccess: true,
        context: { disableRevalidate: true },
      })
    }
  }

  // Warranty plans
  const warranties = [
    {
      productLine: 'Residential String & Hybrid',
      standard: '10 Years',
      extended: 'Up to 20 Years (optional)',
    },
    {
      productLine: 'Commercial Three-Phase',
      standard: '10 Years',
      extended: 'Up to 15 Years (optional)',
    },
    {
      productLine: 'Utility-Scale Central',
      standard: '10 Years',
      extended: 'Custom O&M agreements',
    },
  ]
  for (const [i, w] of warranties.entries()) {
    const existing = await payload.find({
      collection: 'warranty-plans',
      where: { productLine: { equals: w.productLine } },
      limit: 1,
      overrideAccess: true,
    })
    const data = { ...w, sortOrder: i, _status: 'published' }
    if (existing.docs[0]) {
      await payload.update({
        collection: 'warranty-plans',
        id: existing.docs[0].id,
        data: data as never,
        overrideAccess: true,
        context: { disableRevalidate: true },
      })
    } else {
      await payload.create({
        collection: 'warranty-plans',
        data: data as never,
        overrideAccess: true,
        context: { disableRevalidate: true },
      })
    }
  }

  // Sustainability reports
  const reports = [
    { title: '2025 ESG & Sustainability Report', year: '2025', size: '4.8 MB' },
    { title: 'Environmental Policy', year: '2024', size: '620 KB' },
    { title: 'Supplier Code of Conduct', year: '2024', size: '480 KB' },
    { title: 'Conflict Minerals Statement', year: '2025', size: '310 KB' },
    { title: 'ISO 14001 Certificate', year: '2024', size: '520 KB' },
  ]
  for (const [i, r] of reports.entries()) {
    const existing = await payload.find({
      collection: 'sustainability-reports',
      where: { title: { equals: r.title } },
      limit: 1,
      overrideAccess: true,
    })
    const data = {
      ...r,
      externalUrl: '/resources/downloads',
      sortOrder: i,
      _status: 'published',
    }
    if (existing.docs[0]) {
      await payload.update({
        collection: 'sustainability-reports',
        id: existing.docs[0].id,
        data: data as never,
        overrideAccess: true,
        context: { disableRevalidate: true },
      })
    } else {
      await payload.create({
        collection: 'sustainability-reports',
        data: data as never,
        overrideAccess: true,
        context: { disableRevalidate: true },
      })
    }
  }

  // Legal pages via Pages collection
  const legalPages = [
    {
      slug: 'privacy',
      title: 'Privacy Policy',
      sections: [
        {
          heading: 'Information We Collect',
          body: 'We collect information you provide when requesting quotes, registering products, or contacting support. We also collect technical data via cookies and analytics.',
        },
        {
          heading: 'How We Use Your Information',
          body: 'Your information is used to respond to inquiries, process warranty registrations, and improve our products. We do not sell personal information.',
        },
        {
          heading: 'Your Rights',
          body: 'Request access, correction, or deletion by contacting privacy@orianainverters.com.',
        },
      ],
    },
    {
      slug: 'terms',
      title: 'Terms of Use',
      sections: [
        {
          heading: 'Acceptance of Terms',
          body: 'By accessing this website you agree to these Terms of Use.',
        },
        {
          heading: 'Website Content',
          body: 'Product specifications are for general reference. Always refer to the official datasheet for installed products.',
        },
        {
          heading: 'Intellectual Property',
          body: 'All trademarks, logos, and content are owned by Oriana Inverters or its licensors.',
        },
      ],
    },
    {
      slug: 'disclaimer',
      title: 'Disclaimer',
      sections: [
        {
          heading: 'General',
          body: 'Information on this website is provided for general informational purposes only.',
        },
        {
          heading: 'Product Information',
          body: 'Specifications are subject to change without notice. Consult the official datasheet for your model.',
        },
        {
          heading: 'Third-Party Links',
          body: 'Oriana does not endorse and is not responsible for content on third-party sites.',
        },
      ],
    },
  ]

  for (const page of legalPages) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: page.slug } },
      limit: 1,
      overrideAccess: true,
    })
    const data = {
      title: page.title,
      slug: page.slug,
      _status: 'published',
      hero: { type: 'lowImpact' },
      layout: [
        {
          blockType: 'contentPage',
          sections: page.sections,
        },
      ],
      meta: { title: page.title },
    }
    if (existing.docs[0]) {
      await payload.update({
        collection: 'pages',
        id: existing.docs[0].id,
        data: data as never,
        overrideAccess: true,
        context: { disableRevalidate: true },
      })
    } else {
      await payload.create({
        collection: 'pages',
        data: data as never,
        overrideAccess: true,
        context: { disableRevalidate: true },
      })
    }
  }

  payload.logger.info('— Oriana marketing content seed complete.')
}
