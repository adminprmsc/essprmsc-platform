import { cn } from '@/lib/utils'

export function SpotlightShader({ className }: { className?: string }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden>
      <div className="absolute -top-24 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-prmsc-blue-bright/20 blur-[100px] animate-glow-pulse" />
      <div className="absolute top-1/3 -left-16 h-[20rem] w-[20rem] rounded-full bg-prmsc-green/15 blur-[80px]" />
      <div className="absolute -bottom-16 right-1/4 h-[16rem] w-[16rem] rounded-full bg-prmsc-sky/10 blur-[70px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(6,30,61,0.9)_72%)]" />
    </div>
  )
}
