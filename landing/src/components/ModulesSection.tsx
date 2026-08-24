import { ModuleCard } from '@/components/ModuleCard'
import { FadeIn } from '@/components/motion'
import { Eyebrow, Heading, Subheading } from '@/components/ui/typography'
import { modules } from '@/data/modules'

export function ModulesSection() {
  return (
    <section id="modules" className="scroll-mt-24">
      <FadeIn className="mb-12 text-center">
        <Eyebrow className="mb-3 text-prmsc-blue">Operational Systems</Eyebrow>
        <Heading>One portal. Three operating surfaces.</Heading>
        <Subheading className="mt-4">
          Select a module to access its dedicated enterprise workspace. All platforms
          launch securely in a new browser tab.
        </Subheading>
      </FadeIn>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {modules.map((mod, i) => (
          <ModuleCard key={mod.id} module={mod} index={i} />
        ))}
      </div>
    </section>
  )
}
