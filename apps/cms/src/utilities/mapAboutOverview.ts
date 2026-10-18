import {
  aboutOverview,
  type AboutOverviewContent,
} from '@/components/oriana/about/overview/aboutOverviewData'
import type { About } from '@/payload-types'
import { mediaUrl } from '@/utilities/cmsContent'

/** Merge About global CMS fields onto the built-in /about page defaults. */
export function mapAboutOverview(cms: About | null | undefined): AboutOverviewContent {
  const defaults = aboutOverview
  if (!cms) return defaults

  const storyParagraphs = (cms.storyParagraphs ?? [])
    .map((row) => row.text?.trim())
    .filter((text): text is string => Boolean(text))

  const values = (cms.values ?? [])
    .map((row) => ({
      title: row.title?.trim() || '',
      description: row.description?.trim() || '',
    }))
    .filter((row) => row.title && row.description)

  const heroImage = mediaUrl(cms.hero?.image)
  const heroVideo = mediaUrl(cms.heroVideo)
  const heroPoster = mediaUrl(cms.heroPoster) || heroImage

  return {
    ...defaults,
    meta: {
      title: cms.seo?.metaTitle?.trim() || defaults.meta.title,
      description: cms.seo?.metaDescription?.trim() || defaults.meta.description,
    },
    hero: {
      ...defaults.hero,
      eyebrow: cms.hero?.eyebrow?.trim() || defaults.hero.eyebrow,
      title: cms.hero?.title?.trim() || defaults.hero.title,
      description: cms.hero?.description?.trim() || defaults.hero.description,
      video: {
        src: heroVideo || defaults.hero.video.src,
        poster: heroPoster || defaults.hero.video.poster,
      },
    },
    intro: {
      ...defaults.intro,
      description:
        storyParagraphs[0] ||
        defaults.intro.description,
    },
    whoWeAre: {
      ...defaults.whoWeAre,
      title: cms.storyTitle?.trim() || defaults.whoWeAre.title,
      paragraphs: storyParagraphs.length > 0 ? storyParagraphs : defaults.whoWeAre.paragraphs,
    },
    why:
      values.length > 0
        ? {
            ...defaults.why,
            reasons: values.map((value, index) => ({
              key: defaults.why.reasons[index]?.key || `value-${index}`,
              title: value.title,
              description: value.description,
            })),
          }
        : defaults.why,
  }
}
