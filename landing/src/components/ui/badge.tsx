import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] transition-colors',
  {
    variants: {
      variant: {
        default: 'border-slate-200 bg-slate-100 text-slate-700',
        emerald: 'border-prmsc-green/25 bg-prmsc-green/10 text-prmsc-green',
        blue: 'border-prmsc-blue/25 bg-prmsc-blue/10 text-prmsc-blue',
        teal: 'border-prmsc-blue-bright/25 bg-prmsc-blue-bright/10 text-prmsc-blue-bright',
        outline: 'border-slate-300 bg-transparent text-slate-600',
        gold: 'border-amber-200/60 bg-amber-50/90 text-amber-900',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
