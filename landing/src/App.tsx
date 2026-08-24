import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { ModulesSection } from '@/components/ModulesSection'
import { FeatureBento } from '@/components/FeatureBento'
import { Footer } from '@/components/Footer'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 via-white to-prmsc-cyan/10">
      <Header />
      <Hero />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <ModulesSection />
        <FeatureBento />
      </main>

      <Footer />
    </div>
  )
}
