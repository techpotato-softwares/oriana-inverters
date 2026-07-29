import Link from 'next/link'
import { ContentPage } from '@/components/oriana/ContentPage'

export const metadata = {
  title: 'Security Incident Response',
  description: 'Report a cybersecurity incident related to Oriana products or services.',
}

export default function SecurityPage() {
  return (
    <>
      <ContentPage
        eyebrow="Support"
        title="Security Incident Response"
        description="Oriana takes product and platform security seriously. Use this page to report vulnerabilities or incidents."
        breadcrumb={[{ label: 'Support', href: '/support' }, { label: 'Security' }]}
        sections={[
          {
            heading: 'Reporting a Vulnerability',
            paragraphs: [
              'If you discover a security vulnerability in Oriana hardware, firmware, or cloud monitoring services, please report it to security@orianainverters.com. Include a detailed description, affected product model, and steps to reproduce.',
              'We aim to acknowledge reports within 2 business days and provide status updates throughout our investigation.',
            ],
          },
          {
            heading: 'Coordinated Disclosure',
            paragraphs: [
              'We follow responsible disclosure practices. Please allow 90 days for remediation before public disclosure unless otherwise agreed. We recognize researchers who help improve our security posture.',
            ],
          },
          {
            heading: 'Product Security Updates',
            paragraphs: [
              'Firmware security patches are distributed through the Oriana Monitoring app and our Download Center. Register your products to receive automatic update notifications.',
            ],
          },
        ]}
      />
      <section className="border-t border-oriana-navy/8 bg-oriana-silver/40 py-10">
        <div className="container max-w-3xl text-center">
          <p className="text-sm text-oriana-muted">Need immediate assistance?</p>
          <Link
            href="/contact"
            className="mt-4 inline-block rounded-full bg-oriana-blue px-8 py-3 text-sm font-bold text-white hover:bg-oriana-navy"
          >
            Contact Security Team
          </Link>
        </div>
      </section>
    </>
  )
}
