import { cn } from '@/lib/utils'

export function Spotlight({ className }: { className?: string }) {
  return (
    <div
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      aria-hidden
    >
      <div className="absolute -top-24 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-emerald-500/20 blur-[100px]" />
      <div className="absolute -bottom-16 right-0 h-[20rem] w-[20rem] rounded-full bg-blue-500/15 blur-[90px]" />
    </div>
  )
}
