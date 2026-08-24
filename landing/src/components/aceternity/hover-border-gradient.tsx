import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  children: ReactNode
  className?: string
  accent?: 'emerald' | 'blue' | 'teal'
}

const accentMap = {
  emerald: 'group-hover:via-emerald-400/40',
  blue: 'group-hover:via-blue-400/40',
  teal: 'group-hover:via-teal-400/40',
}

export function HoverBorderGradient({ children, className, accent = 'emerald' }: Props) {
  return (
    <div className={cn('group relative rounded-2xl p-[1px]', className)}>
      <div
        className={cn(
          'absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 opacity-80 transition duration-500 group-hover:from-slate-300 group-hover:to-slate-300',
          accentMap[accent],
        )}
      />
      <div className="relative h-full rounded-[calc(1rem-1px)] bg-white">{children}</div>
    </div>
  )
}
