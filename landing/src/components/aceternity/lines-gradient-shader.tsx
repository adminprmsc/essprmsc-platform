import { cn } from '@/lib/utils'

export function LinesGradientShader({ className }: { className?: string }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-br from-prmsc-blue/20 via-prmsc-navy-deep to-prmsc-green/15" />
      <div
        className="absolute -inset-[60%] opacity-[0.12] animate-[spin_90s_linear_infinite]"
        style={{
          background:
            'conic-gradient(from 180deg, transparent, #2196f3 60deg, transparent 120deg, #2eaa50 180deg, transparent 240deg, #81d4fa 300deg, transparent 360deg)',
        }}
      />
      <div className="absolute inset-0 animate-lines opacity-[0.06]">
        <div
          className="h-[200%] w-full"
          style={{
            backgroundImage:
              'repeating-linear-gradient(100deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 80px)',
          }}
        />
      </div>
    </div>
  )
}
