export type HeroImage = { src: string; alt: string }

/** Self-hosted Unsplash photography (free licence) used behind page heroes. */
export const heroImages = {
  contact: { src: '/assets/heroes/contact-team.jpg', alt: 'Oriana team members working together at laptops' },
  whereToBuy: {
    src: '/assets/heroes/where-to-buy.jpg',
    alt: 'Stocked aisles in a distribution warehouse',
  },
  solutions: { src: '/assets/heroes/solutions.jpg', alt: 'Solar panels under a bright blue sky' },
  downloads: {
    src: '/assets/heroes/downloads.jpg',
    alt: 'Technical documents and a laptop on a desk',
  },
  becomeInstaller: {
    src: '/assets/heroes/become-installer.jpg',
    alt: 'Installer fitting solar panels on a roof',
  },
  partnership: {
    src: '/assets/heroes/partnership.jpg',
    alt: 'Two business partners shaking hands',
  },
  videos: {
    src: '/assets/heroes/videos.jpg',
    alt: 'Laptop showing an energy monitoring dashboard',
  },
  certifications: {
    src: '/assets/heroes/certifications.jpg',
    alt: 'Engineer testing equipment in a laboratory',
  },
  caseStudies: { src: '/assets/heroes/case-studies.jpg', alt: 'Rooftop solar array at sunset' },
  installers: { src: '/assets/heroes/installers.jpg', alt: 'Technician wiring a solar panel' },
  distributors: {
    src: '/assets/heroes/distributors.jpg',
    alt: 'Warehouse racks stocked with products',
  },
  faqs: { src: '/assets/heroes/faqs.jpg', alt: 'Team discussing questions around a laptop' },
  aboutPartners: {
    src: '/assets/heroes/about-partners.jpg',
    alt: 'Partner teams collaborating in an office',
  },
  training: { src: '/assets/heroes/training.jpg', alt: 'Installers attending a training session' },
  foundation: {
    src: '/assets/heroes/foundation.jpg',
    alt: 'Smiling children in a community programme',
  },
  partners: { src: '/assets/heroes/partners.jpg', alt: 'Aerial view of a solar farm' },
  warranty: {
    src: '/assets/heroes/warranty.jpg',
    alt: 'Engineer reviewing technical drawings with tools',
  },
  content: { src: '/assets/heroes/content.jpg', alt: 'Bright modern office interior' },
} satisfies Record<string, HeroImage>
