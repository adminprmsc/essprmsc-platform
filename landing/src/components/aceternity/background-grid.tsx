import { cn } from '@/lib/utils'

export function BackgroundGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]',
        className,
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
    </div>
  )
}
