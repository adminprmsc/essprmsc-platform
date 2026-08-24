import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-slate-900 text-white shadow hover:bg-slate-800 focus-visible:ring-slate-400',
        emerald:
          'bg-prmsc-green text-white shadow-md hover:bg-prmsc-green-bright focus-visible:ring-prmsc-green',
        blue: 'bg-prmsc-blue text-white shadow-md hover:bg-prmsc-blue-bright focus-visible:ring-prmsc-blue',
        teal: 'bg-prmsc-blue-bright text-white shadow-md hover:bg-prmsc-sky focus-visible:ring-prmsc-blue-bright',
        outline:
          'border border-slate-200 bg-white text-slate-800 shadow-sm hover:bg-slate-50 focus-visible:ring-slate-400',
        ghost: 'hover:bg-slate-100 focus-visible:ring-slate-400',
      },
      size: {
        default: 'h-11 px-5 py-2',
        sm: 'h-9 rounded-md px-3 text-xs',
        lg: 'h-12 rounded-xl px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
