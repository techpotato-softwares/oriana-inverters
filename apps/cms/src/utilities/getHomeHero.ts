import type { HomeHeroSlide } from '@/types/homeHero'
import { getHome } from '@/utilities/getMarketing'

/** @deprecated Prefer getHome().heroSlides — kept for compatibility. */
export async function getHomeHeroSlides(): Promise<HomeHeroSlide[]> {
  const { heroSlides } = await getHome()
  return heroSlides
}
