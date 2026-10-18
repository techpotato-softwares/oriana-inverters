/**
 * CMS-shaped Support global payload — mirrors apps/ui supportData defaults
 * so Admin shows editable copy instead of blank tabs.
 *
 * Image upload IDs are optional; pass them via `images` when seeding media.
 */

export type SupportSeedImages = {
  hero?: number | string | null
  strength?: Array<number | string | null>
  approach?: Array<number | string | null>
  story?: Array<number | string | null>
  resourceFeature?: number | string | null
  cases?: Array<number | string | null>
  warranty?: number | string | null
  security?: number | string | null
}

function withImage<T extends Record<string, unknown>>(
  row: T,
  image: number | string | null | undefined,
): T {
  if (image == null) return row
  return { ...row, image }
}

export function buildSupportGlobalData(images: SupportSeedImages = {}) {
  return {
    hub: {
      hero: {
        eyebrow: 'Service & Support',
        title: 'Professional support.',
        highlight: 'Reliable performance.',
        description:
          'Dependable service across the product lifecycle — technical expertise, responsive support, systematic troubleshooting, and field-level assistance that keeps customers, installers, and EPC partners running with minimal downtime.',
        ...(images.hero != null ? { image: images.hero } : {}),
        primary: { label: 'Contact support', href: '/contact' },
        secondary: { label: 'Explore our service', href: '#our-strengths' },
        quickLinksLabel: 'Frequently needed',
        quickLinks: [
          { label: 'Technical support', href: '/contact', icon: 'life-buoy' },
          { label: 'Warranty claim', href: '/support/warranty', icon: 'shield-check' },
          { label: 'Product documentation', href: '/resources/downloads', icon: 'file-text' },
        ],
      },
    },
    strengths: {
      hidden: false,
      intro: {
        eyebrow: 'Our strength',
        title: 'Six capabilities behind every service call',
        description:
          'Commissioning, diagnostics, warranty, and remote monitoring work as one service layer, so each conversation ends with a clear next step and restored uptime.',
      },
      items: [
        withImage(
          {
            title: 'Installation & Commissioning',
            body: 'Structured pre-commissioning checks and on-site guidance so every system is handed over with confidence.',
          },
          images.strength?.[0],
        ),
        withImage(
          {
            title: 'Technical Support',
            body: 'Product specialists on hand to resolve application and configuration questions.',
          },
          images.strength?.[1],
        ),
        withImage(
          {
            title: 'Responsive Customer Support',
            body: 'One direct route from the first enquiry to the right service team.',
          },
          images.strength?.[2],
        ),
        withImage(
          {
            title: 'Troubleshooting & Diagnostics',
            body: 'A systematic fault-finding process that isolates root cause instead of treating symptoms.',
          },
          images.strength?.[3],
        ),
        withImage(
          {
            title: 'Warranty & Service Assistance',
            body: 'Practical help with product registration, service requests, and warranty claims.',
          },
          images.strength?.[4],
        ),
        withImage(
          {
            title: 'Remote Support & Monitoring',
            body: 'Remote visibility that surfaces issues before they need a site visit.',
          },
          images.strength?.[5],
        ),
      ],
    },
    approach: {
      hidden: false,
      intro: {
        eyebrow: 'Our approach',
        title: 'One sequence, every service case',
        description:
          'Identify, diagnose, resolve, support. A consistent method keeps communication clear from the first observation through to long-term performance.',
      },
      cta: { label: 'Raise a service request', href: '/contact' },
      steps: [
        withImage(
          {
            title: 'Identify',
            body: 'Capture the operating condition, site context, and support requirement so nothing is assumed.',
          },
          images.approach?.[0],
        ),
        withImage(
          {
            title: 'Diagnose',
            body: 'Review monitoring data, event logs, and system design to isolate the most likely root cause.',
          },
          images.approach?.[1],
        ),
        withImage(
          {
            title: 'Resolve',
            body: 'Deliver a clear remote fix or coordinate field assistance to bring the plant back to full output.',
          },
          images.approach?.[2],
        ),
        withImage(
          {
            title: 'Support',
            body: 'Confirm the outcome, share preventive guidance, and stay engaged across the product lifecycle.',
          },
          images.approach?.[3],
        ),
      ],
    },
    presence: {
      hidden: false,
      intro: {
        eyebrow: 'Global presence',
        title: 'A service network built around your site',
        description:
          'Oriana pairs remote response with field-level assistance across India and beyond, so the right expertise reaches every system — residential rooftop to utility plant.',
      },
      stats: [
        { value: '10+', label: 'Years of field experience' },
        { value: '24/7', label: 'Remote monitoring & response' },
        { value: '50+', label: 'Service engineers' },
        { value: '48h', label: 'Typical on-site mobilisation' },
      ],
      cta: { label: 'Find the right support contact', href: '/contact' },
      coverageLabel: 'Coverage',
      coverageBody: 'PAN India service reach supported by regional partners and a central technical desk.',
      locations: [
        { label: 'Delhi NCR', top: '29.2%', left: '30.2%' },
        { label: 'Ahmedabad', top: '48.5%', left: '14.1%' },
        { label: 'Kolkata', top: '50%', left: '68.7%' },
        { label: 'Pune', top: '64%', left: '18.6%' },
        { label: 'Hyderabad', top: '67.9%', left: '34.6%' },
        { label: 'Bengaluru', top: '83.1%', left: '31.5%' },
      ],
      pillars: [
        {
          title: 'Remote response',
          body: 'Diagnostics, firmware guidance, and parameter checks handled from the desk.',
          icon: 'monitor-cog',
        },
        {
          title: 'Field assistance',
          body: 'Trained engineers and partners mobilised to site when hands-on work is needed.',
          icon: 'wrench',
        },
        {
          title: 'Customer care',
          body: 'A single point of contact that keeps owners and installers informed.',
          icon: 'headphones',
        },
      ],
    },
    stories: {
      hidden: false,
      intro: {
        eyebrow: 'Service stories',
        title: 'The work behind reliable solar performance',
      },
      items: [
        withImage(
          {
            tag: 'Commissioning',
            title: 'Final checks before handover',
            body: 'Supporting site teams through commissioning and first-day performance review.',
          },
          images.story?.[0],
        ),
        withImage(
          {
            tag: 'Commercial',
            title: 'Rooftop project coordination',
            body: 'Technical coordination across EPC, electrical, and monitoring teams.',
          },
          images.story?.[1],
        ),
        withImage(
          {
            tag: 'Residential',
            title: 'Guidance that reaches the homeowner',
            body: 'Clear explanations for installers and owners, without the jargon.',
          },
          images.story?.[2],
        ),
        withImage(
          {
            tag: 'Remote service',
            title: 'Diagnosis before dispatch',
            body: 'Operating data reviewed remotely so a site visit is only made when it counts.',
          },
          images.story?.[3],
        ),
        withImage(
          {
            tag: 'Utility',
            title: 'Large plant performance reviews',
            body: 'Periodic health checks that protect generation across the asset lifetime.',
          },
          images.story?.[4],
        ),
      ],
    },
    resources: {
      hidden: false,
      intro: {
        eyebrow: 'Resources',
        title: 'Everything needed to install, run, and maintain',
      },
      feature: {
        eyebrow: 'Resource centre',
        title: 'One library for every Oriana product',
        body: 'Browse documents by product category — on-grid, hybrid, utility, and storage — and download the latest revision in a click.',
        ...(images.resourceFeature != null ? { image: images.resourceFeature } : {}),
        cta: { label: 'Open resource centre', href: '/resources/downloads' },
      },
      items: [
        {
          title: 'Product documentation',
          body: 'Datasheets, user manuals, and quick installation guides, organised category by category.',
          href: '/resources/downloads',
          icon: 'file-text',
        },
        {
          title: 'FAQs',
          body: 'Answers to the questions that come up most often during installation, monitoring, and service.',
          href: '/resources/faqs',
          icon: 'circle-help',
        },
        {
          title: 'Warranty',
          body: 'Warranty terms, product registration, and a clear path for raising and tracking a claim.',
          href: '/support/warranty',
          icon: 'badge-check',
        },
      ],
    },
    cases: {
      hidden: false,
      intro: {
        eyebrow: 'Cases & stories',
        title: 'Projects, by system type',
        description:
          'Explore how Oriana inverters perform in the field as our case library grows across on-grid, hybrid, utility, and storage installations.',
      },
      cta: { label: 'View all case studies', href: '/case-studies' },
      items: [
        withImage(
          {
            title: 'On-grid',
            body: 'Rooftop and ground-mount systems feeding the grid.',
            href: '/case-studies',
          },
          images.cases?.[0],
        ),
        withImage(
          {
            title: 'Hybrid',
            body: 'Solar paired with storage for round-the-clock supply.',
            href: '/case-studies',
          },
          images.cases?.[1],
        ),
        withImage(
          {
            title: 'Utility',
            body: 'Large-scale plants engineered for long-term yield.',
            href: '/case-studies',
          },
          images.cases?.[2],
        ),
        withImage(
          {
            title: 'BESS',
            body: 'Battery energy storage for resilience and peak control.',
            href: '/case-studies',
          },
          images.cases?.[3],
        ),
      ],
    },
    warranty: {
      hero: {
        eyebrow: 'Support',
        title: 'Warranty',
        description:
          'Industry-leading warranty coverage backed by global service infrastructure and spare parts availability.',
        ...(images.warranty != null ? { image: images.warranty } : {}),
      },
      matrixTitle: 'Coverage by Product Line',
      steps: [
        {
          title: 'Register Your Product',
          body: 'Register within 60 days of installation to activate full warranty coverage. You will need the serial number, installation date, and installer contact information.',
        },
        {
          title: 'Submit a Warranty Claim',
          body: 'Contact our support team with your serial number, fault description, and photos if applicable. RMA processing typically completes within 5 business days for in-warranty units.',
        },
      ],
      primary: { label: 'Register / Claim Warranty', href: '/contact' },
      secondary: { label: 'Download Warranty Policy (PDF)', href: '/resources/downloads' },
      meta: {
        title: 'Warranty',
        description: 'Oriana inverter warranty terms, registration, and claim process.',
      },
    },
    security: {
      hero: {
        eyebrow: 'Support',
        title: 'Security Incident Response',
        description:
          'Oriana takes product and platform security seriously. Use this page to report vulnerabilities or incidents.',
        ...(images.security != null ? { image: images.security } : {}),
      },
      sections: [
        {
          heading: 'Reporting a Vulnerability',
          body: 'If you discover a security vulnerability in Oriana hardware, firmware, or cloud monitoring services, please report it to security@orianainverters.com. Include a detailed description, affected product model, and steps to reproduce.\n\nWe aim to acknowledge reports within 2 business days and provide status updates throughout our investigation.',
        },
        {
          heading: 'Coordinated Disclosure',
          body: 'We follow responsible disclosure practices. Please allow 90 days for remediation before public disclosure unless otherwise agreed. We recognize researchers who help improve our security posture.',
        },
        {
          heading: 'Product Security Updates',
          body: 'Firmware security patches are distributed through the Oriana Monitoring app and our Download Center. Register your products to receive automatic update notifications.',
        },
      ],
      ctaPrompt: 'Need immediate assistance?',
      cta: { label: 'Contact Security Team', href: '/contact' },
      meta: {
        title: 'Security Incident Response',
        description: 'Report a cybersecurity incident related to Oriana products or services.',
      },
    },
    seo: {
      metaTitle: 'Support & Service',
      metaDescription:
        'Dependable service support throughout the product lifecycle for installers, homeowners, and businesses.',
    },
    _status: 'published' as const,
  }
}
