/** Static Vision & Mission content — shaped so it can later be supplied by a Payload global. */

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`

export type VisionPanel = { label: string; image: string; alt: string }
export type MissionValue = { key: string; label: string; description: string; image: string; alt: string }
export type LongTermItem = { label: string; href: string; linkLabel: string }

export const visionMission = {
  meta: {
    title: 'Vision & Mission',
    description:
      'ORIANA’s vision is to become a globally trusted energy-technology brand from India. Our mission: high-performance solar inverters and energy solutions that create lasting value.',
  },

  hero: {
    eyebrow: 'Vision & Mission',
    title: 'Building a Global Energy Technology Brand from India',
    description:
      'What started in 2015 as a vision shared by a team of engineers is evolving into something much bigger.',
    video: {
      src: '/assets/about/vision-hero.mp4',
      poster: '/assets/about/vision-hero-poster.jpg',
    },
  },

  vision: {
    id: 'vision',
    eyebrow: 'Our Vision',
    statement:
      'To become a globally trusted energy-technology brand from India, delivering intelligent, reliable and sustainable power solutions for a cleaner energy future.',
    panels: [
      {
        label: 'Intelligent',
        image: unsplash('1518770660439-4636190af475', 1200),
        alt: 'Close-up of a printed circuit board',
      },
      {
        label: 'Reliable',
        image: unsplash('1581093450021-4a7360e9a6b5', 1200),
        alt: 'Engineers testing equipment in a laboratory',
      },
      {
        label: 'Sustainable',
        image: unsplash('1592833159155-c62df1b65634', 1200),
        alt: 'Aerial view of solar panels set among green trees',
      },
    ] satisfies VisionPanel[],
  },

  mission: {
    id: 'mission',
    eyebrow: 'Our Mission',
    statement:
      'To engineer and deliver high-performance solar inverters and energy solutions that combine innovation, reliability and intelligent technology—creating lasting value for our customers, partners and the planet.',
    valueLead: 'Creating lasting value for',
    values: [
      {
        key: 'customers',
        label: 'Our customers',
        description: 'High-performance inverters, backed by service and long-term support.',
        image: unsplash('1611365892117-00ac5ef43c90', 1400),
        alt: 'Rooftop solar installation at sunset',
      },
      {
        key: 'partners',
        label: 'Our partners',
        description: 'Technology our channel partners, EPCs and developers can stand behind.',
        image: unsplash('1600880292089-90a7e086ee0c', 1400),
        alt: 'Two business partners shaking hands',
      },
      {
        key: 'planet',
        label: 'The planet',
        description: 'Cleaner, smarter energy for every rooftop, factory and solar plant.',
        image: unsplash('1613665813446-82a78c468a1d', 1400),
        alt: 'Solar panels glowing under an evening sky',
      },
    ] satisfies MissionValue[],
  },

  longTerm: {
    id: 'long-term',
    eyebrow: 'How we get there',
    title: 'We are building for the long term.',
    items: [
      { label: 'We are investing in technology.', href: '/about#technology', linkLabel: 'Our technology' },
      { label: 'We are strengthening manufacturing.', href: '/about#manufacturing', linkLabel: 'Manufacturing' },
      { label: 'We are developing people.', href: '/careers', linkLabel: 'Life at ORIANA' },
      { label: 'We are listening to our customers.', href: '/support', linkLabel: 'Service & support' },
      {
        label: 'And we are continuously challenging ourselves to build better.',
        href: '/about/achievements',
        linkLabel: 'Our achievements',
      },
    ] satisfies LongTermItem[],
  },

  cta: {
    title: 'Our journey started with solar. Our vision is much bigger.',
    body: 'ORIANA — Intelligent Energy. Engineered for Tomorrow.',
    primary: { label: 'See our achievements', href: '/about/achievements' },
    secondary: { label: 'Read our brand story', href: '/about/brand-story' },
    image: unsplash('1466611653911-95081537e5b7', 2400),
  },
}

export type VisionMissionContent = typeof visionMission
