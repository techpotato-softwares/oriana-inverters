/** Static Brand Story content — shaped so it can later be supplied by a Payload global. */

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`

export type StoryImage = { src: string; alt: string }

export type StoryMilestone = { value: string; label: string }

export const brandStory = {
  hero: {
    eyebrow: 'Our Brand Story',
    title: 'From Solar Experience to Energy Innovation',
    description:
      'Every meaningful journey begins with a vision. For ORIANA, it began in 2015 — with a team of engineers who shared a deep passion for cleaner, smarter energy.',
    image: {
      src: unsplash('1509391366360-2e959784a276', 2400),
      alt: 'Rows of solar panels under a clear sky',
    },
  },

  milestones: [
    { value: '2015', label: 'The vision begins' },
    { value: '10+ Years', label: 'Experience across the solar ecosystem' },
    { value: '1,00,000+', label: 'Inverters — the milestone we are building towards' },
    { value: 'Chakan MIDC', label: 'Engineered and manufactured in Pune' },
    { value: 'Global', label: 'An energy-technology brand from India' },
  ] satisfies StoryMilestone[],

  origin: {
    eyebrow: 'Where it began',
    title: 'Every meaningful journey begins with a vision.',
    paragraphs: [
      'For ORIANA, that journey began in 2015, driven by a team of engineers who shared a deep passion for energy and a vision for a cleaner, smarter future.',
      'Before building ORIANA, our team spent over a decade working across solar project development and the distribution of inverters for residential, commercial & industrial (C&I), and utility-scale applications.',
    ],
    insightLead: 'That experience gave us something invaluable:',
    insight: 'A first-hand understanding of what the energy industry truly needs.',
    understanding:
      'We understood the challenges faced by customers, EPCs, developers, distributors and businesses. We understood that an inverter is not simply a product — it is a critical part of an energy system where performance, reliability, efficiency and long-term support matter.',
    closing: 'And we believed we could build something better.',
    image: {
      src: unsplash('1559302504-64aae6ca6b6d', 1400),
      alt: 'Engineers in work gloves installing a solar panel',
    },
  },

  vision: {
    eyebrow: 'The Vision',
    title: 'Passion Turned Into Purpose',
    paragraphs: [
      'Our entry into the inverter and energy-technology industry was driven by more than business opportunity. It was driven by vision and passion for energy.',
      "We saw renewable energy moving from an alternative source of power to becoming a fundamental part of the world's energy future.",
      'We wanted to be part of that transformation — not simply by distributing technology, but by building technology of our own.',
    ],
    closing: 'That ambition became ORIANA.',
    closingSupport: 'A brand created to bring engineering, intelligence and reliability together.',
    image: {
      src: unsplash('1548337138-e87d889cc369', 1600),
      alt: 'Offshore wind turbines rising from a calm sea',
    },
  },

  journey: {
    eyebrow: 'Our Journey',
    title: 'From Experience to Execution',
    description:
      'Over the years, our journey has taken us across every segment of the solar industry. That experience shaped the way we think about products.',
    segments: [
      {
        label: 'Residential',
        image: {
          src: unsplash('1600585154340-be6161a56a0c', 1000),
          alt: 'Modern family home',
        },
      },
      {
        label: 'Commercial & Industrial',
        image: {
          src: unsplash('1486406146926-c627a92ad1ab', 1000),
          alt: 'Commercial office towers',
        },
      },
      {
        label: 'Utility-scale',
        image: {
          src: unsplash('1473341304170-971dccb5ac1e', 1000),
          alt: 'High-voltage transmission towers at dusk',
        },
      },
    ],
    balanceLead: 'We learned that great energy technology needs to balance:',
    balance: ['Performance', 'Reliability', 'Efficiency', 'Simplicity'],
    closing: 'And most importantly, it needs to perform in the real world.',
    closingSupport: "This philosophy became the foundation for ORIANA's product development.",
  },

  units: {
    eyebrow: '1,00,000+ Units',
    title: 'A Milestone We Are Building Towards',
    intro:
      'Since 2015, our journey has been shaped by a passion for energy, engineering and the belief that India can build world-class power-conversion technology.',
    figure: '1,00,000',
    figureLabel: 'ORIANA inverters in the field',
    lead: 'For us, this is more than a sales target. It represents:',
    represents: [
      '1,00,000+ energy systems powered by ORIANA technology.',
      'The trust of homeowners, businesses, industries, EPC partners and energy professionals who choose ORIANA for their renewable-energy journey.',
      'Our commitment to building high-performance, reliable and intelligent inverter technology from India.',
    ],
    body: [
      'Every inverter we design, manufacture and deliver takes us closer to that goal — and strengthens our understanding of what customers truly expect from their energy systems.',
      'But our ambition goes beyond the number. We want to see ORIANA technology powering homes, businesses and industries across India and, ultimately, markets around the world.',
    ],
    statement: '1,00,000+ ORIANA inverters.',
    statementSupport: 'A million possibilities beyond.',
  },

  india: {
    eyebrow: 'Built From India',
    title: 'Engineered at Chakan, Pune',
    description:
      "Today, ORIANA is taking the next step in its journey with its manufacturing and technology ecosystem at Chakan MIDC, Pune, Maharashtra.",
    location: 'Chakan MIDC, Pune, Maharashtra',
    focusLead: 'Our vision is to build advanced energy technology in India with a strong focus on:',
    focus: [
      'Engineering Excellence',
      'Manufacturing Precision',
      'Product Reliability',
      'Continuous Innovation',
    ],
    belief:
      "We believe India should not only be one of the world's largest renewable-energy markets.",
    beliefEmphasis: 'India should also become a global hub for energy technology.',
    closing: 'ORIANA is being built with that ambition.',
    image: {
      src: unsplash('1581091226825-a6a2a5aee158', 1400),
      alt: 'Engineer working on power electronics in a test lab',
    },
  },

  ecosystem: {
    eyebrow: 'Beyond the Inverter',
    title: 'Building the Energy Ecosystem of Tomorrow',
    description:
      'We believe the future of energy will not be defined by a single product. It will be shaped by the convergence of:',
    pillars: [
      { key: 'solar', label: 'Solar' },
      { key: 'storage', label: 'Energy Storage' },
      { key: 'power', label: 'Power Electronics' },
      { key: 'digital', label: 'Digital Intelligence' },
      { key: 'management', label: 'Smart Energy Management' },
    ],
    closing:
      'Our journey therefore extends beyond solar inverters. We are building towards a broader energy-technology ecosystem that helps businesses and communities generate, store, manage and use energy more intelligently.',
    image: {
      src: unsplash('1518770660439-4636190af475', 1600),
      alt: 'Close-up of a circuit board',
    },
  },

  purpose: {
    eyebrow: 'What Drives Us',
    title: 'Technology With Purpose',
    intro:
      'At ORIANA, technology is not innovation for the sake of innovation. It must create meaningful value.',
    musts: [
      'It must improve efficiency.',
      'It must enhance reliability.',
      'It must simplify energy management.',
      'It must create long-term value for customers.',
    ],
    closing:
      'And ultimately, it must contribute towards a cleaner and more sustainable future.',
  },

  globalVision: {
    eyebrow: 'Our Vision',
    title: 'Building a Global Energy Technology Brand from India',
    paragraphs: [
      'What started in 2015 as a vision shared by a team of engineers is evolving into something much bigger.',
      'Our ambition is to establish ORIANA as a globally trusted energy-technology brand, delivering advanced power-conversion and energy solutions from India to markets around the world.',
    ],
    commitments: [
      'We are building for the long term.',
      'We are investing in technology.',
      'We are strengthening manufacturing.',
      'We are developing people.',
      'We are listening to our customers.',
    ],
    closing: 'And we are continuously challenging ourselves to build better.',
    image: {
      src: unsplash('1451187580459-43490279c0fa', 2400),
      alt: 'Earth seen from space at night with city lights',
    },
  },

  recap: {
    eyebrow: 'This Is Our Story',
    timeline: [
      { marker: '2015', text: 'The vision begins.' },
      { marker: '10+ Years', text: 'Experience across the solar ecosystem.' },
      { marker: 'Residential → C&I → Utility', text: 'Understanding energy at every scale.' },
      { marker: '1,00,000+ Units', text: 'A milestone built on customer trust.' },
      { marker: 'Chakan, Pune', text: 'Building our manufacturing future.' },
      { marker: 'Tomorrow', text: 'A global energy-technology brand from India.' },
    ],
    statement: 'Our journey started with solar.',
    statementEmphasis: 'Our vision is much bigger.',
    brand: 'ORIANA',
    tagline: 'Intelligent Energy. Engineered for Tomorrow.',
    primary: { label: 'Explore our products', href: '/products' },
    secondary: { label: 'Partner with us', href: '/contact?intent=sales#contact-form' },
  },
}

export type BrandStoryContent = typeof brandStory
