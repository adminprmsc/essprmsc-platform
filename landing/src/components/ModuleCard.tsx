import { motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Muted, Small } from '@/components/ui/typography'
import type { ModuleLink } from '@/data/modules'
import { badgeVariant, buttonVariant, cardAccent } from '@/data/modules'
import { cn } from '@/lib/utils'

type Props = {
  module: ModuleLink
  index: number
}

export function ModuleCard({ module, index }: Props) {
  const Icon = module.icon
  const bVariant = badgeVariant[module.accent]
  const btnVariant = buttonVariant[module.accent]
  const accent = cardAccent[module.accent]

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="h-full"
    >
      <Card
        className={cn(
          'group flex h-full flex-col overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/80',
          accent.cardHover,
        )}
      >
        {/* Accent top bar */}
        <div className={cn('h-1 w-full', accent.bar)} aria-hidden />

        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div
              className={cn(
                'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-105',
                accent.icon,
              )}
            >
              <Icon className="h-5 w-5" aria-hidden />
            </div>
            <Badge variant={bVariant}>{module.shortName}</Badge>
          </div>

          <div className="space-y-1">
            <Label className="text-[10px] text-slate-400">{module.tagline}</Label>
            <CardTitle className="transition-colors group-hover:text-prmsc-blue">
              {module.name}
            </CardTitle>
          </div>

          <CardDescription>{module.description}</CardDescription>
        </CardHeader>

        <CardContent className="flex-1">
          <Separator className="mb-4" />
          <Label className="mb-3 block text-[10px] text-slate-400">Key capabilities</Label>
          <ul className="space-y-3">
            {module.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span
                  className={cn(
                    'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                    accent.check,
                  )}
                >
                  <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden />
                </span>
                <Muted className="text-sm leading-snug text-slate-600">{feature}</Muted>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="mt-auto">
          <Separator className="mb-4" />
          <Button variant={btnVariant} size="lg" className="w-full rounded-xl font-semibold" asChild>
            <a
              href={module.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${module.shortName} in new tab`}
            >
              Launch {module.shortName}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </Button>
          <Small className="text-center">Opens in new tab</Small>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
