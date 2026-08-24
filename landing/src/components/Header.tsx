import { ShieldCheck } from 'lucide-react'
import { Eyebrow } from '@/components/ui/typography'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-prmsc-navy-deep/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="min-w-0 flex-1 flex items-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-prmsc-sky" aria-hidden />
          <Eyebrow className="text-[10px] tracking-[0.2em] text-prmsc-cyan/90 sm:text-[11px]">
            ESS · Environment &amp; Social Safeguard Wing
          </Eyebrow>
        </div>
        <a
          href="#modules"
          className="shrink-0 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-white transition hover:border-prmsc-sky/30 hover:bg-white/10 sm:text-sm"
        >
          Modules
        </a>
      </div>
    </header>
  )
}

export function ExternalLinkHint() {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-slate-400">
      Opens in new tab
    </span>
  )
}
