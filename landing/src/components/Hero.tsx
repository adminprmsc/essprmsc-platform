import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { DotShader } from '@/components/aceternity/dot-shader'
import { LinesGradientShader } from '@/components/aceternity/lines-gradient-shader'
import { SpotlightShader } from '@/components/aceternity/spotlight-shader'
import { LogoShowcase } from '@/components/LogoShowcase'
import { DisplayTitle, Eyebrow, Lead } from '@/components/ui/typography'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-prmsc-navy-deep via-prmsc-navy to-[#0c3470] px-4 pb-20 pt-12 sm:px-6 sm:pb-28 sm:pt-14 lg:px-8">
      <LinesGradientShader />
      <SpotlightShader />
      <DotShader />

      <div className="relative mx-auto max-w-4xl">
        <LogoShowcase />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.4 }}
          className="mt-14 text-center"
        >
          <Eyebrow className="mb-4 text-prmsc-sky/90">Official Portal</Eyebrow>

          <DisplayTitle>PRMSC ESS Portal</DisplayTitle>

          <Eyebrow className="mt-4 text-[10px] tracking-[0.32em] text-prmsc-cyan/80 sm:text-[11px]">
            Environment &amp; Social Safeguard Wing
          </Eyebrow>

          <div className="mx-auto mt-8 max-w-2xl space-y-4">
            <Lead>
              The official digital gateway for integrated safeguard monitoring, environmental
              &amp; social management, and water quality assurance across Punjab&apos;s rural
              municipal services.
            </Lead>
            <p className="text-sm leading-relaxed text-slate-400 sm:text-[15px] sm:leading-relaxed">
              Operated by{' '}
              <span className="font-semibold text-white/95">
                Punjab Rural Municipal Services Company (PRMSC)
              </span>
              , a subsidiary undertaking of the{' '}
              <span className="font-medium text-slate-300">
                Local Government &amp; Community Development Department, Government of Punjab
              </span>
              .
            </p>
          </div>

          <motion.a
            href="#modules"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-prmsc-blue via-prmsc-blue-bright to-prmsc-green px-8 py-3.5 text-sm font-semibold tracking-wide text-white shadow-xl shadow-prmsc-blue/25 transition hover:shadow-prmsc-green/20"
          >
            Enter Operational Modules
            <ArrowRight className="h-4 w-4" aria-hidden />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
