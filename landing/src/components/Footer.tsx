export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200/80 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <img
              src="/logos/prmsc-logo.png"
              alt="PRMSC"
              className="h-20 object-contain sm:h-24"
            />
            <div>
              <p className="text-sm font-bold tracking-tight text-prmsc-navy">PRMSC</p>
              <p className="text-sm text-slate-600">Punjab Rural Municipal Services Company</p>
              <p className="mt-1 text-xs text-slate-400">
                Local Government &amp; Community Development Department, Punjab
              </p>
            </div>
          </div>

          <div className="max-w-sm text-sm text-slate-500 lg:text-right">
            <p className="font-medium text-slate-700">PRMSC ESS Portal</p>
            <p className="mt-1 text-xs leading-relaxed">
              World Bank supported municipal reform programme
            </p>
            <p className="mt-3 text-xs text-slate-400">
              &copy; {new Date().getFullYear()} PRMSC. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
