import { cn } from '@/utilities/ui'

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  id?: string
  align?: 'start' | 'center'
  tone?: 'light' | 'dark'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  align = 'start',
  tone = 'light',
  className,
}: SectionHeadingProps) {
  const dark = tone === 'dark'
  return (
    <div className={cn(align === 'center' && 'mx-auto text-center', 'max-w-2xl', className)}>
      {eyebrow ? (
        <p
          className={cn(
            'flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.3em]',
            align === 'center' && 'justify-center',
            dark ? 'text-oriana-sky' : 'text-oriana-blue',
          )}
        >
          <span
            className={cn('h-px w-10', dark ? 'bg-oriana-sky/60' : 'bg-oriana-blue/50')}
            aria-hidden
          />
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className={cn(
          'mt-5 font-display font-medium tracking-[-0.02em] text-balance',
          dark ? 'text-white' : 'text-oriana-navy',
        )}
        style={{ fontSize: 'clamp(1.9rem, 3.4vw, 3.1rem)', lineHeight: 1.1 }}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'mt-5 text-base leading-8 text-pretty',
            dark ? 'text-white/70' : 'text-oriana-muted',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
