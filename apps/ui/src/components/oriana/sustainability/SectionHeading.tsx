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
          'fluid-heading mt-5 font-display font-medium text-balance',
          dark ? 'text-white' : 'text-oriana-navy',
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'fluid-lead mt-4 text-pretty',
            dark ? 'text-white/70' : 'text-oriana-muted',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
