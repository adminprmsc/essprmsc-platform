import { cn } from '@/lib/utils'

/** Dot distortion grid shader */
export function DotShader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]',
        className,
      )}
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div
        className="absolute inset-0 animate-shimmer opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(30,107,184,0.4) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  )
}
