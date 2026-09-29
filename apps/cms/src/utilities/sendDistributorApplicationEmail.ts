import nodemailer from 'nodemailer'

export type DistributorApplicationMail = {
  name: string
  company: string
  email: string
  phone: string
  cityState: string
  message: string
}

export async function sendDistributorApplicationEmail(
  application: DistributorApplicationMail,
): Promise<'sent' | 'failed' | 'not-configured'> {
  const host = process.env.SMTP_HOST?.trim()
  const to = process.env.DISTRIBUTOR_NOTIFY_EMAIL?.trim() || 'info@orianainverters.com'

  if (!host) {
    console.warn(
      '[distributor-application] SMTP_HOST is not set. The application was saved without sending email.',
    )
    return 'not-configured'
  }

  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER?.trim()
  const pass = process.env.SMTP_PASS
  const from = process.env.SMTP_FROM?.trim() || 'Oriana Inverters <info@orianainverters.com>'

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: user && pass ? { user, pass } : undefined,
  })

  const lines = [
    `Name: ${application.name}`,
    `Company: ${application.company}`,
    `Email: ${application.email}`,
    `Phone: ${application.phone}`,
    `City / State: ${application.cityState}`,
    '',
    application.message,
  ]

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: application.email,
      subject: `Distributor application — ${application.company}`,
      text: lines.join('\n'),
    })
    return 'sent'
  } catch (error) {
    console.error('[distributor-application] email failed:', error)
    return 'failed'
  }
}
