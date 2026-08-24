import { motion } from 'framer-motion'

/** Centered PRMSC brand mark — hero logo */
export function LogoShowcase() {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative flex flex-col items-center"
      >
        <div className="absolute -inset-16 sm:-inset-24" aria-hidden>
          <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-prmsc-blue-bright/35 blur-[72px] animate-glow-pulse sm:h-72 sm:w-72" />
          <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-prmsc-green/30 blur-[60px] animate-glow-pulse [animation-delay:1s] sm:h-56 sm:w-56" />
        </div>

        <img
          src="/logos/prmsc-logo.png"
          alt="Punjab Rural Municipal Services Company"
          className="relative z-10 h-40 w-auto object-contain sm:h-52 md:h-64 lg:h-72"
        />

        <div className="relative z-10 mt-6 text-center">
          <p className="text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl md:text-4xl">
            PRMSC
          </p>
          <p className="mt-2 max-w-md text-xs font-medium uppercase tracking-[0.22em] text-prmsc-sky/90 sm:text-sm sm:tracking-[0.26em]">
            Punjab Rural Municipal Services Company
          </p>
        </div>
      </motion.div>
    </div>
  )
}
