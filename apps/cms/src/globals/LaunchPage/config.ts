import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { revalidateGlobal } from '@/fields/marketing'

export const LaunchPage: GlobalConfig = {
  slug: 'launch-page',
  label: 'Launch page',
  admin: {
    group: 'Content',
    description:
      'Countdown splash at /launch. Visitors see the timer, celebration, then redirect to the site. Disable to skip straight to the redirect URL.',
  },
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Enable countdown splash',
      defaultValue: true,
      admin: {
        description: 'When off, /launch immediately redirects to the redirect URL.',
      },
    },
    {
      name: 'countdownSeconds',
      type: 'number',
      label: 'Countdown seconds',
      defaultValue: 10,
      min: 3,
      max: 60,
      required: true,
      admin: {
        step: 1,
        description: 'Timer length when the page loads (3–60).',
      },
    },
    {
      name: 'headline',
      type: 'text',
      label: 'Headline',
      defaultValue: 'We’re launching',
    },
    {
      name: 'subheadline',
      type: 'textarea',
      label: 'Supporting line',
      defaultValue: 'Oriana Inverters is almost ready. Hang tight for a moment.',
    },
    {
      name: 'launchMessage',
      type: 'text',
      label: 'Launch message',
      defaultValue: 'We’re live!',
      admin: {
        description: 'Shown when the countdown hits zero, before redirect.',
      },
    },
    {
      name: 'redirectUrl',
      type: 'text',
      label: 'Redirect URL',
      defaultValue: '/',
      required: true,
      admin: {
        description: 'Where to send visitors after the celebration (usually /).',
      },
    },
    {
      name: 'redirectDelayMs',
      type: 'number',
      label: 'Celebration delay (ms)',
      defaultValue: 3200,
      min: 500,
      max: 10000,
      required: true,
      admin: {
        description:
          'How long to show the launch celebration (slower rocket + confetti) before navigating. Default 3200 ms.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal('launch-page', ['/launch'])],
  },
}
