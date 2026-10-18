/**
 * CMS-shaped About global — hub + brand story + vision/mission + achievements
 * + certifications / partners / foundation empty states.
 */

export type AboutSeedImages = {
  hero?: number | string | null
  brandStory?: number | string | null
  visionMission?: number | string | null
  achievements?: number | string | null
  certifications?: number | string | null
  partners?: number | string | null
  foundation?: number | string | null
}

export function buildAboutGlobalData(images: AboutSeedImages = {}) {
  return {
    hero: {
      eyebrow: 'About ORIANA',
      title: 'Powering the Intelligence Behind Tomorrow’s Energy',
      description:
        'ORIANA is a clean-energy technology company building advanced power-conversion and energy-management solutions for a rapidly evolving world.',
      ...(images.hero != null ? { image: images.hero } : {}),
    },
    storyTitle: 'Built on Engineering. Driven by Energy.',
    storyParagraphs: [
      {
        text: 'ORIANA was created with a clear purpose — to build the next generation of energy technology from India for India and the world.',
      },
      {
        text: 'Our expertise spans solar inverters, power electronics, energy storage and intelligent energy management, enabling us to address the changing requirements of modern energy infrastructure.',
      },
      {
        text: 'We believe great energy products are built at the intersection of technology, reliability and simplicity.',
      },
    ],
    stats: [
      { value: '2015', label: 'Vision began' },
      { value: '5 GW+', label: 'Inverters supplied' },
      { value: 'Pan-India', label: 'Service reach' },
      { value: 'Make in India', label: 'Manufacturing' },
    ],
    values: [
      {
        title: 'Engineering',
        description:
          'Technology-led product development with a focus on performance and reliability.',
      },
      {
        title: 'Innovation',
        description:
          'Continuous development to meet the evolving needs of the energy industry.',
      },
      {
        title: 'Manufacturing',
        description:
          'Indian manufacturing capabilities built around quality and process excellence.',
      },
      {
        title: 'Reliability',
        description: 'Products engineered for demanding real-world operating conditions.',
      },
      {
        title: 'Service',
        description: 'A customer-first approach throughout the product lifecycle.',
      },
      {
        title: 'Vision',
        description:
          'Building technology for the energy requirements of tomorrow — not just today.',
      },
    ],
    leadership: {
      hidden: false,
      intro: {
        eyebrow: 'Leadership',
        title: 'Founded by engineers. Led with purpose.',
        description: 'The people steering ORIANA’s product, manufacturing, and market journey.',
      },
      // members left empty — use seed:leadership or built-in directors until edited
      members: [],
    },
    brandStory: {
      hero: {
        eyebrow: 'Our Brand Story',
        title: 'From Solar Experience to Energy Innovation',
        description:
          'Every meaningful journey begins with a vision. For ORIANA, it began in 2015 — with a team of engineers who shared a deep passion for cleaner, smarter energy.',
        ...(images.brandStory != null ? { image: images.brandStory } : {}),
      },
      originParagraphs: [
        {
          text: 'For ORIANA, that journey began in 2015, driven by a team of engineers who shared a deep passion for energy and a vision for a cleaner, smarter future.',
        },
        {
          text: 'Before building ORIANA, our team spent over a decade working across solar project development and the distribution of inverters for residential, commercial & industrial (C&I), and utility-scale applications.',
        },
      ],
      meta: {
        title: 'Our Brand Story',
        description:
          'From solar experience to energy innovation — how ORIANA grew from a team of engineers in 2015 into an energy-technology brand engineered at Chakan, Pune.',
      },
    },
    visionMission: {
      hero: {
        eyebrow: 'Vision & Mission',
        title: 'Building a Global Energy Technology Brand from India',
        description:
          'What started in 2015 as a vision shared by a team of engineers is evolving into something much bigger.',
        ...(images.visionMission != null ? { image: images.visionMission } : {}),
      },
      visionStatement:
        'To become a globally trusted energy-technology brand from India, delivering intelligent, reliable and sustainable power solutions for a cleaner energy future.',
      missionStatement:
        'To engineer and deliver high-performance solar inverters and energy solutions that combine innovation, reliability and intelligent technology—creating lasting value for our customers, partners and the planet.',
      meta: {
        title: 'Vision & Mission',
        description:
          'ORIANA’s vision is to become a globally trusted energy-technology brand from India. Our mission: high-performance solar inverters and energy solutions that create lasting value.',
      },
    },
    achievements: {
      hero: {
        eyebrow: 'Our Achievements',
        title: 'Experience That Powers Confidence',
        description:
          'Over the past decade, our journey across the renewable-energy industry has been built on experience, partnerships, execution and a commitment to customer success.',
        ...(images.achievements != null ? { image: images.achievements } : {}),
      },
      stats: [
        {
          value: '5 GW+',
          label: 'Solar Inverters Supplied',
          description: 'Across Residential, C&I and Utility-Scale applications.',
        },
        {
          value: '10+ Years',
          label: 'Industry Experience',
          description:
            'A decade of experience in solar project development and inverter distribution.',
        },
        {
          value: 'Pan-India',
          label: 'Nationwide Reach',
          description:
            'Our presence across India enables us to serve customers and projects across diverse markets.',
        },
        {
          value: 'Multiple',
          label: 'A Strong Partner Network',
          description:
            'A growing network of channel partners, EPCs, developers and industry stakeholders.',
        },
      ],
      meta: {
        title: 'Our Achievements',
        description:
          '5 GW+ of solar inverters supplied, 10+ years of industry experience, pan-India presence and a strong channel-partner network.',
      },
    },
    certifications: {
      hero: {
        eyebrow: 'About',
        title: 'Certifications & Awards',
        description:
          'Product certifications and recognition that demonstrate ORIANA’s commitment to quality and safety.',
        ...(images.certifications != null ? { image: images.certifications } : {}),
      },
      certificationsTitle: 'Certifications',
      awardsTitle: 'Awards & recognition',
      emptyDescription:
        'Published certifications and awards will appear here once added in the Certifications and Awards collections.',
      meta: {
        title: 'Certifications & Awards',
        description: 'ORIANA product certifications and industry awards.',
      },
    },
    partnersNetwork: {
      hero: {
        eyebrow: 'About',
        title: 'Our Partners',
        description: 'Channel partners, EPCs, and collaborators who bring ORIANA solutions to market.',
        ...(images.partners != null ? { image: images.partners } : {}),
      },
      programmeLink: { label: 'Become a distributor', href: '/partners/become-a-distributor' },
      emptyDescription:
        'Partner logos and profiles will appear here once published in the Partners collection.',
      emptyCta: { label: 'Become a distributor', href: '/partners/become-a-distributor' },
      meta: {
        title: 'Partners',
        description: 'ORIANA partner network and programmes.',
      },
    },
    foundation: {
      hero: {
        eyebrow: 'Oriana Foundation',
        title: 'Giving back as we grow',
        description:
          'Community and education programmes that sit alongside our manufacturing and product mission.',
        ...(images.foundation != null ? { image: images.foundation } : {}),
      },
      intro: {
        eyebrow: 'Foundation',
        title: 'Impact beyond the product',
        description:
          'The Oriana Foundation focuses on skills, community energy access, and education around clean power.',
      },
      programmes: [],
      cta: { label: 'Partner with us', href: '/contact/sales' },
      emptyDescription:
        'Foundation programmes will appear here once at least one programme is added in this tab.',
      meta: {
        title: 'Oriana Foundation',
        description: 'Community programmes from the Oriana Foundation.',
      },
    },
    seo: {
      metaTitle: 'About ORIANA',
      metaDescription:
        'ORIANA is a clean-energy technology company building advanced power-conversion and energy-management solutions — engineered and manufactured in India.',
    },
    _status: 'published' as const,
  }
}
