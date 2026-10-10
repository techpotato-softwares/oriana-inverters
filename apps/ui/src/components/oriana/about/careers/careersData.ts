/** Life at ORIANA defaults — the Careers global overrides hero and intro copy when set. */

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`

export type CareerValueIcon = 'rocket' | 'lightbulb' | 'graduation-cap' | 'handshake' | 'sprout' | 'trophy'

export type CareerValue = {
  key: string
  icon: CareerValueIcon
  title: string
  body: string[]
  highlight?: string
  image: string
  alt: string
}

export const lifeAtOriana = {
  hero: {
    eyebrow: 'Life at ORIANA',
    title: 'Build the Future. Grow With Us.',
    description:
      'We are building a new generation of energy technology from India—and every person who joins us becomes part of that journey.',
    video: {
      src: '/assets/careers/hero.mp4',
      poster: '/assets/careers/hero-poster.jpg',
    },
  },

  intro: {
    eyebrow: 'Life at ORIANA',
    statement: 'At ORIANA, we believe great technology is created by great people.',
    paragraphs: [
      'Life at ORIANA is about learning, taking ownership, solving meaningful problems and growing together.',
      'We encourage our people to think differently, challenge conventional ideas and turn their ideas into action.',
    ],
  },

  workplace: {
    eyebrow: 'More than a workplace',
    title: 'A Place to Build Your Career—and Something Bigger.',
    lead: 'At ORIANA, you will work alongside people who share a common purpose:',
    teams: [
      'Engineers',
      'Business leaders',
      'Technology professionals',
      'Manufacturing teams',
      'Sales experts',
      'Energy enthusiasts',
    ],
    purpose: 'To build a smarter and more sustainable energy future.',
    closing:
      'Whether you are designing a product, developing technology, working with customers, building our manufacturing capabilities or growing our business, your work contributes to something bigger than a job.',
    images: [
      { src: unsplash('1522071820081-009f0129c71c', 1200), alt: 'Colleagues collaborating around laptops' },
      { src: unsplash('1581091226825-a6a2a5aee158', 1000), alt: 'Engineer working on power electronics in a test lab' },
      { src: unsplash('1521737604893-d14cc237f11d', 1000), alt: 'Team working together in a bright office' },
    ],
  },

  values: {
    id: 'values',
    eyebrow: 'What life at ORIANA looks like',
    title: 'Six things you will feel from day one.',
    items: [
      {
        key: 'ownership',
        icon: 'rocket',
        title: 'Ownership',
        body: ['We believe in giving people responsibility and the freedom to make an impact.'],
        highlight: 'Your ideas matter. Your decisions matter. Your contribution matters.',
        image: unsplash('1581094288338-2314dddb7ece', 1000),
        alt: 'Engineer reviewing a prototype drawing',
      },
      {
        key: 'innovation',
        icon: 'lightbulb',
        title: 'Innovation',
        body: [
          'We encourage curiosity and new thinking.',
          'We don’t want people to simply follow processes—we want them to ask:',
        ],
        highlight: '“Can we build this better?”',
        image: unsplash('1552664730-d307ca884978', 1000),
        alt: 'Team brainstorming with sticky notes on a wall',
      },
      {
        key: 'learning',
        icon: 'graduation-cap',
        title: 'Learning & Growth',
        body: [
          'Energy technology is constantly evolving. So are we.',
          'We encourage continuous learning, technical development, cross-functional exposure and opportunities to take on greater responsibilities.',
        ],
        image: unsplash('1531482615713-2afd69097998', 1000),
        alt: 'Colleagues learning together at a shared desk',
      },
      {
        key: 'one-team',
        icon: 'handshake',
        title: 'One Team',
        body: [
          'We believe great results come from collaboration.',
          'Engineering works with manufacturing. Sales works with technology. Service works with customers.',
        ],
        highlight: 'Different teams. One ORIANA.',
        image: unsplash('1531545514256-b1400bc00f31', 1000),
        alt: 'Team smiling together in a meeting',
      },
      {
        key: 'purpose',
        icon: 'sprout',
        title: 'Purpose',
        body: [
          'Our work contributes to the transition towards cleaner and smarter energy.',
          'Every product we build and every customer we support is a step towards a more sustainable future.',
        ],
        highlight: 'Your work can make a difference beyond the workplace.',
        image: unsplash('1592833159155-c62df1b65634', 1000),
        alt: 'Solar panels set among green trees',
      },
      {
        key: 'recognition',
        icon: 'trophy',
        title: 'Performance & Recognition',
        body: [
          'We value people who take initiative, deliver results and raise the standard.',
          'We believe achievements should be recognised and opportunities should follow performance.',
        ],
        highlight: 'Grow with the company. Grow with your contribution.',
        image: unsplash('1600880292203-757bb62b4baf', 1000),
        alt: 'Colleagues celebrating with a high five',
      },
    ] satisfies CareerValue[],
  },

  culture: {
    eyebrow: 'Our culture',
    title: 'Think Big. Stay Grounded. Keep Building.',
    body: 'We are ambitious about where ORIANA can go, but we remain grounded in the fundamentals that matter:',
    values: ['Integrity', 'Ownership', 'Respect', 'Teamwork', 'Customer Focus', 'Continuous Improvement'],
    closing: 'We celebrate success together, learn from challenges and keep moving forward.',
    image: unsplash('1523240795612-9a054b0db644', 2000),
  },

  cta: {
    title: 'Build your future with ORIANA.',
    body: 'ORIANA is on a journey to become a globally trusted energy-technology brand from India. There is a lot to build—and a lot of opportunity for people who are curious, ambitious and ready to make an impact. Come build the future of energy with us.',
    primary: { label: 'Explore open positions', href: '#openings' },
    secondary: { label: 'Apply now', href: '#apply' },
    image: unsplash('1504384308090-c894fdcc538d', 2400),
  },
}

export type LifeAtOrianaContent = typeof lifeAtOriana
