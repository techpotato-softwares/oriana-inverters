/** Static Achievements content — shaped so it can later be supplied by a Payload global. */

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`

export type AchievementStat = {
  key: 'supply' | 'experience' | 'presence' | 'partners'
  value: string
  label: string
  description: string
  image?: string
}

export type ScaleSegment = { label: string; image: string; alt: string }
export type JourneyStep = { marker: string; label: string }

export const achievements = {
  meta: {
    title: 'Our Achievements',
    description:
      '5 GW+ of solar inverters supplied, 10+ years of industry experience, pan-India presence and a strong channel-partner network — the experience behind ORIANA.',
  },

  hero: {
    eyebrow: 'Our Achievements',
    title: 'Experience That Powers Confidence',
    description:
      'Over the past decade, our journey across the renewable-energy industry has been built on experience, partnerships, execution and a commitment to customer success.',
    video: {
      src: '/assets/about/achievements-hero.mp4',
      poster: '/assets/about/achievements-hero-poster.jpg',
    },
  },

  numbers: {
    id: 'numbers',
    eyebrow: 'By the numbers',
    title: 'A decade of execution across India’s solar market.',
    stats: [
      {
        key: 'supply',
        value: '5 GW+',
        label: 'Solar Inverters Supplied',
        description: 'Across Residential, C&I and Utility-Scale applications.',
        image: unsplash('1509391366360-2e959784a276', 1600),
      },
      {
        key: 'experience',
        value: '10+ Years',
        label: 'Industry Experience',
        description:
          'A decade of experience in solar project development and inverter distribution, giving us deep insight into the evolving renewable-energy ecosystem.',
        image: unsplash('1559302504-64aae6ca6b6d', 1400),
      },
      {
        key: 'presence',
        value: 'Pan-India',
        label: 'Nationwide Reach',
        description:
          'Our presence across India enables us to serve customers and projects across diverse markets and operating environments.',
      },
      {
        key: 'partners',
        value: 'Multiple',
        label: 'A Strong Partner Network',
        description:
          'A growing network of channel partners, EPCs, developers and industry stakeholders helps us bring energy solutions closer to customers across the country.',
        image: unsplash('1542744173-8e7e53415bb0', 1200),
      },
    ] satisfies AchievementStat[],
  },

  scale: {
    id: 'scale',
    eyebrow: 'Every scale',
    title: 'Residential. C&I. Utility-scale.',
    description:
      'Today, our capabilities span residential, commercial & industrial and utility-scale solar applications, giving us a comprehensive understanding of India’s diverse energy requirements.',
    segments: [
      {
        label: 'Residential',
        image: unsplash('1600585154340-be6161a56a0c', 1200),
        alt: 'Home with rooftop solar panels',
      },
      {
        label: 'Commercial & Industrial',
        image: unsplash('1486406146926-c627a92ad1ab', 1200),
        alt: 'Commercial building representing C&I solar',
      },
      {
        label: 'Utility-Scale',
        image: unsplash('1509390144018-eeaf65052242', 1200),
        alt: 'Electrical substation connecting a utility-scale plant',
      },
    ] satisfies ScaleSegment[],
  },

  service: {
    id: 'service',
    eyebrow: 'Built on experience. Driven by service.',
    title: 'Supplying technology is only the beginning.',
    paragraphs: [
      'With thousands of systems deployed across different applications, we understand that service, responsiveness and long-term support are critical to the success of any energy project.',
      'Our objective is to establish best-in-class service practices across the ORIANA ecosystem—from installation and commissioning to technical support and long-term customer care.',
    ],
    lifecycle: ['Installation', 'Commissioning', 'Technical support', 'Long-term customer care'],
    commitmentLead: 'Our commitment is simple:',
    commitment: ['Deliver the technology.', 'Support the customer.', 'Stand behind the product.'],
    image: unsplash('1581092795360-fd1ca04f0952', 1600),
    imageAlt: 'Engineers monitoring systems in a control room',
  },

  journey: {
    id: 'journey',
    eyebrow: 'Our journey so far',
    title: 'Every step built the next.',
    steps: [
      { marker: '10+ Years', label: 'of experience across the solar ecosystem' },
      { marker: 'Residential → C&I → Utility-Scale', label: 'Applications at every scale' },
      { marker: '5 GW+', label: 'Inverter supply experience' },
      { marker: 'Pan-India', label: 'Market presence' },
      { marker: 'Channel Partners', label: 'A strong partner network' },
      { marker: 'Next Generation', label: 'Building the next generation of ORIANA energy technology' },
    ] satisfies JourneyStep[],
  },

  cta: {
    title: 'We have built our foundation on experience. Now, we are building the future on innovation.',
    primary: { label: 'Explore products', href: '/products' },
    secondary: { label: 'Become a partner', href: '/partners/become-a-distributor' },
    image: unsplash('1497435334941-8c899ee9e8e9', 2400),
  },
}

export type AchievementsContent = typeof achievements
