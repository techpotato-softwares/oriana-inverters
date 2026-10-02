import {
  Award,
  BadgeCheck,
  BookOpen,
  CircleHelp,
  FileText,
  Globe,
  Handshake,
  Headphones,
  Headset,
  Leaf,
  LifeBuoy,
  Megaphone,
  MonitorCog,
  ShieldCheck,
  Store,
  Users,
  Wrench,
  Zap,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react'

const icons: Record<string, LucideIcon> = {
  store: Store,
  handshake: Handshake,
  headset: Headset,
  headphones: Headphones,
  'book-open': BookOpen,
  globe: Globe,
  megaphone: Megaphone,
  'monitor-cog': MonitorCog,
  wrench: Wrench,
  'life-buoy': LifeBuoy,
  'shield-check': ShieldCheck,
  'badge-check': BadgeCheck,
  'file-text': FileText,
  'circle-help': CircleHelp,
  users: Users,
  award: Award,
  zap: Zap,
  leaf: Leaf,
}

type MarketingIconProps = LucideProps & {
  name?: string
  fallback?: LucideIcon
}

export function MarketingIcon({ name, fallback = BadgeCheck, ...props }: MarketingIconProps) {
  const Icon = (name && icons[name]) || fallback
  return <Icon aria-hidden {...props} />
}
