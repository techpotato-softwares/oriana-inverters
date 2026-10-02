export type Intro = {
  eyebrow?: string
  title: string
  description?: string
}

export type LinkItem = {
  label: string
  href: string
}

export type CtaBandContent = {
  title: string
  body?: string
  primary?: LinkItem
  secondary?: LinkItem
}

export type HeroContent = {
  eyebrow?: string
  title: string
  description?: string
  image?: string
}

export type CardItem = {
  title: string
  body?: string
  icon?: string
  image?: string
  href?: string
  linkLabel?: string
  tag?: string
  highlights?: string[]
}

export type PageMeta = {
  title: string
  description: string
}
