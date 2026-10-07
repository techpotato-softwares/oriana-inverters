/** Static About page content — shaped so it can later be supplied by a Payload global. */

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`

export type AboutImage = { src: string; alt: string }

export type AboutFeature = { key: string; title: string; description: string }

export const aboutOverview = {
  meta: {
    title: 'About ORIANA',
    description:
      'ORIANA is a clean-energy technology company building advanced power-conversion and energy-management solutions — engineered and manufactured in India.',
  },

  hero: {
    eyebrow: 'About ORIANA',
    title: 'Powering the Intelligence Behind Tomorrow’s Energy',
    description:
      'ORIANA is a clean-energy technology company building advanced power-conversion and energy-management solutions for a rapidly evolving world.',
    image: {
      src: unsplash('1508514177221-188b1cf16e9d', 2400),
      alt: 'Solar array under a wide blue sky',
    },
  },

  intro: {
    description:
      'We combine engineering, intelligent technology, manufacturing excellence and customer-focused innovation to create reliable energy solutions for residential, commercial and industrial applications.',
    ambitionLead: 'Our ambition is simple:',
    ambition: 'to make renewable energy smarter, more efficient and more dependable.',
  },

  whoWeAre: {
    id: 'who-we-are',
    number: '01',
    eyebrow: 'Who We Are',
    title: 'Built on Engineering. Driven by Energy.',
    paragraphs: [
      'ORIANA was created with a clear purpose — to build the next generation of energy technology from India for India and the world.',
      'Our expertise spans solar inverters, power electronics, energy storage and intelligent energy management, enabling us to address the changing requirements of modern energy infrastructure.',
      'We believe great energy products are built at the intersection of technology, reliability and simplicity.',
    ],
    manifesto: ['Technology that performs.', 'Engineering that lasts.', 'Energy that moves the world forward.'],
    image: {
      src: unsplash('1581092160562-40aa08e78837', 1400),
      alt: 'Engineer reviewing technical drawings at a workbench',
    },
  },

  technology: {
    id: 'technology',
    number: '02',
    eyebrow: 'Our Technology',
    title: 'Intelligence Meets Power',
    description:
      'At the heart of ORIANA is advanced power-electronics technology designed to deliver efficient, stable and intelligent energy conversion.',
    pillarsLead: 'Our technology philosophy focuses on:',
    pillars: [
      {
        key: 'efficiency',
        title: 'High Efficiency',
        description: 'Optimised power conversion to maximise energy utilisation.',
      },
      {
        key: 'control',
        title: 'Intelligent Control',
        description: 'Advanced control architecture designed for precise and responsive power management.',
      },
      {
        key: 'connectivity',
        title: 'Smart Connectivity',
        description: 'Real-time monitoring and data-driven insights for better visibility and control.',
      },
      {
        key: 'scalable',
        title: 'Scalable Architecture',
        description: 'Solutions designed to grow with changing energy requirements.',
      },
      {
        key: 'future',
        title: 'Future Ready',
        description: 'Engineered with the evolving renewable-energy ecosystem in mind.',
      },
    ] satisfies AboutFeature[],
    closing: 'We don’t just convert power.',
    closingEmphasis: 'We make energy intelligent.',
    image: {
      src: unsplash('1563770660941-20978e870e26', 1400),
      alt: 'Power-electronics board with capacitors and heat sink being assembled',
    },
  },

  manufacturing: {
    id: 'manufacturing',
    number: '03',
    eyebrow: 'Manufacturing',
    title: 'Precision Engineered. Made in India.',
    paragraphs: [
      'Our manufacturing vision is built around precision, consistency and process excellence.',
      'From component integration and assembly to testing and quality validation, every stage is designed to maintain stringent standards of performance and reliability.',
    ],
    capabilitiesLead: 'Our manufacturing ecosystem brings together:',
    capabilities: [
      'Advanced assembly processes',
      'Controlled production environments',
      'Product testing and validation',
      'Quality inspection systems',
      'Engineering and R&D capabilities',
      'Process-driven manufacturing',
    ],
    closing: 'Built in India.',
    closingEmphasis: 'Engineered for global standards.',
    image: {
      src: unsplash('1581092918056-0c4c3acd3789', 1400),
      alt: 'Technician assembling a circuit board',
    },
  },

  quality: {
    id: 'quality',
    number: '04',
    eyebrow: 'Quality',
    title: 'Reliability Is Designed In.',
    paragraphs: [
      'At ORIANA, quality is not a final inspection. It is embedded into the entire product lifecycle.',
      'From engineering and component selection to manufacturing, testing and field performance, we focus on creating products that customers can depend on for years.',
    ],
    principlesLead: 'Our approach is built around four principles:',
    principles: ['Design', 'Test', 'Validate', 'Improve'],
    closing: 'Because when energy systems are critical, reliability cannot be compromised.',
    image: {
      src: unsplash('1581093450021-4a7360e9a6b5', 1400),
      alt: 'Engineers testing equipment in a laboratory',
    },
  },

  vision: {
    id: 'vision',
    number: '05',
    eyebrow: 'Our Vision',
    title: 'A Smarter Energy Future',
    paragraphs: [
      'The world’s energy system is changing.',
      'Solar is becoming more accessible. Energy storage is becoming more important. Digital intelligence is transforming how electricity is generated, managed and consumed.',
      'ORIANA aims to be at the centre of this transformation.',
    ],
    futureLead:
      'Our vision is to build a globally trusted clean-energy technology company that enables a future where energy is:',
    future: ['Cleaner.', 'Smarter.', 'More Efficient.', 'More Accessible.', 'More Sustainable.'],
    image: {
      src: unsplash('1532601224476-15c79f2f7a51', 2400),
      alt: 'Wind turbines across rolling green hills',
    },
  },

  why: {
    id: 'why-oriana',
    number: '06',
    eyebrow: 'Why ORIANA',
    title: 'More Than an Inverter Company.',
    description: 'ORIANA is building an integrated clean-energy technology ecosystem.',
    reasons: [
      {
        key: 'engineering',
        title: 'Engineering',
        description: 'Technology-led product development with a focus on performance and reliability.',
      },
      {
        key: 'innovation',
        title: 'Innovation',
        description: 'Continuous development to meet the evolving needs of the energy industry.',
      },
      {
        key: 'manufacturing',
        title: 'Manufacturing',
        description: 'Indian manufacturing capabilities built around quality and process excellence.',
      },
      {
        key: 'reliability',
        title: 'Reliability',
        description: 'Products engineered for demanding real-world operating conditions.',
      },
      {
        key: 'service',
        title: 'Service',
        description: 'A customer-first approach throughout the product lifecycle.',
      },
      {
        key: 'vision',
        title: 'Vision',
        description: 'Building technology for the energy requirements of tomorrow — not just today.',
      },
    ] satisfies AboutFeature[],
  },

  commitment: {
    eyebrow: 'Our Commitment',
    title: 'Creating a Cleaner Tomorrow, Today.',
    matters: [
      'Every unit of renewable energy matters.',
      'Every improvement in efficiency matters.',
      'Every reliable energy system matters.',
    ],
    body: 'At ORIANA, we are committed to contributing to a cleaner and more sustainable future by developing technology that helps people and businesses transition towards smarter energy.',
    statement: 'We are not simply building inverters.',
    statementEmphasis: 'We are building the intelligence behind the energy transition.',
    brand: 'ORIANA',
    tagline: 'Intelligent Energy. Engineered for Tomorrow.',
    capabilities: ['Solar Inverters', 'Energy Storage', 'Power Electronics', 'Intelligent Energy Solutions'],
    primary: { label: 'Explore products', href: '/products' },
    secondary: { label: 'Read our brand story', href: '/about/brand-story' },
    image: {
      src: unsplash('1466611653911-95081537e5b7', 2400),
      alt: 'Wind farm silhouetted against a sunset',
    },
  },
}

export type AboutOverviewContent = typeof aboutOverview
