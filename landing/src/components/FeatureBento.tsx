import { ArrowUpRight, Building2, Check, Globe2, Layers, ShieldCheck } from 'lucide-react'
import { FadeIn, HoverLift, StaggerContainer, StaggerItem } from '@/components/motion'
import { Heading, Subheading, Eyebrow } from '@/components/ui/typography'
import { modules } from '@/data/modules'
import { cn } from '@/lib/utils'

type FeatureAccent = 'green' | 'blue' | 'navy' | 'suite'

const accentStyles: Record<
  FeatureAccent,
  { bar: string; icon: string; glow: string; ring: string }
> = {
  green: {
    bar: 'from-prmsc-green to-prmsc-green-light',
    icon: 'bg-prmsc-green text-white shadow-lg shadow-prmsc-green/25',
    glow: 'from-prmsc-green/20 to-emerald-400/10',
    ring: 'ring-prmsc-green/15',
  },
  blue: {
    bar: 'from-prmsc-navy to-prmsc-blue',
    icon: 'bg-prmsc-blue text-white shadow-lg shadow-prmsc-blue/25',
    glow: 'from-prmsc-blue/20 to-prmsc-sky/10',
    ring: 'ring-prmsc-blue/15',
  },
  navy: {
    bar: 'from-slate-700 to-slate-500',
    icon: 'bg-slate-800 text-white shadow-lg shadow-slate-800/20',
    glow: 'from-slate-400/15 to-slate-200/10',
    ring: 'ring-slate-200',
  },
  suite: {
    bar: 'from-prmsc-blue via-prmsc-blue-bright to-prmsc-green',
    icon: 'bg-gradient-to-br from-prmsc-blue to-prmsc-blue-bright text-white shadow-lg shadow-prmsc-blue/30',
    glow: 'from-prmsc-blue-bright/25 to-prmsc-green/15',
    ring: 'ring-prmsc-blue-bright/20',
  },
}

const features = [
  {
    id: 'safeguard',
    icon: ShieldCheck,
    title: 'Safeguard Compliance',
    description:
      'Institutional oversight and environmental & social safeguard monitoring across all PRMSC programme activities.',
    className: 'md:col-span-2 md:row-span-2',
    accent: 'green' as FeatureAccent,
    surface: 'from-emerald-50/80 via-white to-white',
    highlights: [
      'Environmental oversight',
      'Social safeguard audits',
      'Programme-wide reporting',
    ],
    large: true,
  },
  {
    id: 'lgcd',
    icon: Building2,
    title: 'Local Government & CDD',
    description:
      'Delivering rural municipal services under the Local Government & Community Development Department, Punjab.',
    className: 'md:col-span-1',
    accent: 'blue' as FeatureAccent,
    surface: 'from-blue-50/70 via-white to-white',
    large: false,
  },
  {
    id: 'world-bank',
    icon: Globe2,
    title: 'World Bank Programme',
    description:
      'Supported by World Bank funding to strengthen accountable municipal reform across Punjab.',
    className: 'md:col-span-1',
    accent: 'navy' as FeatureAccent,
    surface: 'from-slate-50 via-white to-white',
    large: false,
  },
  {
    id: 'suite',
    icon: Layers,
    title: 'Integrated Module Suite',
    description:
      'Four connected platforms — monitoring, workforce management, water quality, and village-level development — for end-to-end safeguard operations.',
    className: 'md:col-span-2',
    accent: 'suite' as FeatureAccent,
    surface: 'from-sky-50/60 via-white to-emerald-50/40',
    showModules: true,
    large: false,
  },
]

function FeatureCard({
  feature,
}: {
  feature: (typeof features)[number]
}) {
  const Icon = feature.icon
  const styles = accentStyles[feature.accent]

  return (
    <div
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-gradient-to-br bg-white shadow-sm ring-1 ring-transparent transition-all duration-300 hover:border-slate-300/80 hover:shadow-xl hover:shadow-slate-200/60 hover:ring-slate-100',
        feature.surface,
        styles.ring,
      )}
    >
      {/* Accent bar */}
      <div
        className={cn('h-1 w-full bg-gradient-to-r', styles.bar)}
        aria-hidden
      />

      {/* Ambient glow */}
      <div
        className={cn(
          'pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100',
          styles.glow,
        )}
        aria-hidden
      />

      <div className={cn('relative flex flex-1 flex-col p-6', feature.large && 'sm:p-8')}>
        <div
          className={cn(
            'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105',
            styles.icon,
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
        </div>

        <h3
          className={cn(
            'mt-5 font-bold tracking-[-0.02em] text-prmsc-navy',
            feature.large ? 'text-2xl sm:text-[1.65rem]' : 'text-lg',
          )}
        >
          {feature.title}
        </h3>

        <p
          className={cn(
            'mt-2 leading-relaxed text-slate-600',
            feature.large ? 'text-sm sm:text-[15px]' : 'text-sm',
          )}
        >
          {feature.description}
        </p>

        {feature.highlights && (
          <ul className="mt-6 space-y-3 border-t border-slate-200/80 pt-5">
            {feature.highlights.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-prmsc-green/12 text-prmsc-green">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
                </span>
                {item}
              </li>
            ))}
          </ul>
        )}

        {feature.showModules && (
          <div className="mt-6 border-t border-slate-200/80 pt-5">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Launch a module
            </p>
            <div className="flex flex-wrap gap-2">
              {modules.map((mod) => {
                const ModIcon = mod.icon
                return (
                  <a
                    key={mod.id}
                    href={mod.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'inline-flex items-center gap-2 rounded-xl border border-slate-200/90 bg-white/90 px-3 py-2 text-sm font-semibold text-prmsc-navy shadow-sm transition-all hover:-translate-y-0.5 hover:border-prmsc-blue/30 hover:shadow-md',
                    )}
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-prmsc-navy/5 text-prmsc-blue">
                      <ModIcon className="h-3.5 w-3.5" aria-hidden />
                    </span>
                    {mod.shortName}
                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" aria-hidden />
                  </a>
                )
              })}
            </div>
            <a
              href="#modules"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-prmsc-blue transition-colors hover:text-prmsc-blue-bright"
            >
              View all module details
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

/** Bento feature grid — institutional framework & programme context */
export function FeatureBento() {
  return (
    <section className="mt-24">
      <FadeIn className="mb-12 text-center">
        <Eyebrow className="mb-3 text-prmsc-blue">Institutional Framework</Eyebrow>
        <Heading>Built for institutional governance</Heading>
        <Subheading className="mt-4">
          PRMSC operates within Punjab&apos;s local government reform architecture,
          supported by World Bank funding and safeguard compliance frameworks.
        </Subheading>
      </FadeIn>

      <StaggerContainer className="grid gap-5 md:grid-cols-3 md:grid-rows-2 md:gap-5">
        {features.map((feature) => (
          <StaggerItem key={feature.id} className={feature.className}>
            <HoverLift className="h-full">
              <FeatureCard feature={feature} />
            </HoverLift>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  )
}
