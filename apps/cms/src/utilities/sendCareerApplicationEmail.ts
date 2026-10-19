import nodemailer from 'nodemailer'

export type CareerApplicationMail = {
  name: string
  email: string
  phone: string
  location: string
  role: string
  message: string
  attachment?: {
    filename: string
    content: Buffer
    contentType: string
  }
}

export async function sendCareerApplicationEmail(
  application: CareerApplicationMail,
): Promise<'sent' | 'failed' | 'not-configured'> {
  const host = process.env.SMTP_HOST?.trim()
  const to = process.env.CAREER_NOTIFY_EMAIL?.trim() || 'hr@orianainverters.com'

  if (!host) {
    console.warn(
      '[career-application] SMTP_HOST is not set. The application was saved without sending email.',
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

  const safe = (value: string) => value.replace(/[\r\n]+/g, ' ').trim()
  const lines = [
    `Name: ${safe(application.name)}`,
    `Email: ${safe(application.email)}`,
    `Phone: ${safe(application.phone)}`,
    `Location: ${safe(application.location) || '—'}`,
    `Role: ${safe(application.role) || 'Open application'}`,
    '',
    application.message || 'No cover note.',
  ]

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: safe(application.email),
      subject: safe(
        `Career application — ${application.name}${application.role ? ` (${application.role})` : ''}`,
      ),
      text: lines.join('\n'),
      attachments: application.attachment
        ? [
            {
              filename: safe(application.attachment.filename).replace(/[^\w.\-()+ ]+/g, '_'),
              content: application.attachment.content,
              contentType: application.attachment.contentType,
            },
          ]
        : undefined,
    })
    return 'sent'
  } catch (error) {
    console.error('[career-application] email failed:', error)
    return 'failed'
  }
}
