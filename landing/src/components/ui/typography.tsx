import * as React from 'react'
import { cn } from '@/lib/utils'

type TypographyProps = React.HTMLAttributes<HTMLElement>

/** Small caps eyebrow — section labels */
export function Eyebrow({ className, ...props }: TypographyProps) {
  return (
    <p
      className={cn(
        'text-[11px] font-semibold uppercase tracking-[0.28em] text-prmsc-sky sm:text-xs',
        className,
      )}
      {...props}
    />
  )
}

export function DisplayTitle({ className, ...props }: TypographyProps) {
  return (
    <h1
      className={cn(
        'text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.25rem]',
        className,
      )}
      {...props}
    />
  )
}

export function Heading({ className, ...props }: TypographyProps) {
  return (
    <h2
      className={cn(
        'text-3xl font-bold tracking-[-0.025em] text-prmsc-navy sm:text-4xl',
        className,
      )}
      {...props}
    />
  )
}

export function Subheading({ className, ...props }: TypographyProps) {
  return (
    <p
      className={cn(
        'mx-auto max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg sm:leading-relaxed',
        className,
      )}
      {...props}
    />
  )
}

export function Lead({ className, ...props }: TypographyProps) {
  return (
    <p
      className={cn(
        'text-base leading-relaxed text-slate-300 sm:text-lg sm:leading-relaxed',
        className,
      )}
      {...props}
    />
  )
}

export function Text({ className, ...props }: TypographyProps) {
  return (
    <p className={cn('text-sm leading-relaxed text-slate-600', className)} {...props} />
  )
}

export function Muted({ className, ...props }: TypographyProps) {
  return (
    <p className={cn('text-sm leading-snug text-slate-500', className)} {...props} />
  )
}

export function Small({ className, ...props }: TypographyProps) {
  return (
    <small
      className={cn('text-[11px] font-medium leading-none text-slate-400', className)}
      {...props}
    />
  )
}
