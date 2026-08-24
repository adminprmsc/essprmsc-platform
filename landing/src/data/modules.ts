import type { LucideIcon } from 'lucide-react'
import {
  ClipboardCheck,
  Droplets,
  Users,
} from 'lucide-react'

export type ModuleLink = {
  id: string
  name: string
  shortName: string
  tagline: string
  description: string
  href: string
  accent: 'emerald' | 'blue' | 'teal'
  icon: LucideIcon
  features: string[]
}

export const modules: ModuleLink[] = [
  {
    id: 'mrv',
    name: 'Monitoring, Reporting & Verification',
    shortName: 'MRV',
    tagline: 'Field operations & executive oversight',
    description:
      'Enterprise platform for monitoring field activities, submission workflows, and verification reporting across tehsil and HQ levels.',
    href: 'http://mrv.essprmsc.com/hq',
    accent: 'emerald',
    icon: ClipboardCheck,
    features: ['HQ command dashboard', 'Field submission tracking', 'Executive analytics'],
  },
  {
    id: 'esms',
    name: 'Environmental & Social Management',
    shortName: 'ESMS',
    tagline: 'Workforce & safeguard compliance',
    description:
      'Integrated system for senior management oversight, workforce operations, and environmental & social safeguard compliance.',
    href: 'http://esms.essprmsc.com/dashboard/senior-manager',
    accent: 'blue',
    icon: Users,
    features: ['Senior manager portal', 'Workforce management', 'Compliance monitoring'],
  },
  {
    id: 'wqms',
    name: 'Water Quality Management',
    shortName: 'WQMS',
    tagline: 'Laboratory & PCRWR reporting',
    description:
      'Professional water quality monitoring platform for lab submissions, analytical results, and PCRWR reporting under safeguard frameworks.',
    href: 'http://wqms.essprmsc.com/pcrwr',
    accent: 'teal',
    icon: Droplets,
    features: ['PCRWR reporting portal', 'Laboratory data management', 'Quality assurance dashboards'],
  },
]

export const badgeVariant = {
  emerald: 'emerald',
  blue: 'blue',
  teal: 'teal',
} as const

export const buttonVariant = {
  emerald: 'emerald',
  blue: 'blue',
  teal: 'teal',
} as const

export const cardAccent = {
  emerald: {
    bar: 'bg-gradient-to-r from-prmsc-green to-prmsc-green-light',
    icon: 'bg-prmsc-green/10 text-prmsc-green ring-prmsc-green/20',
    check: 'bg-prmsc-green/15 text-prmsc-green',
    cardHover: 'hover:ring-prmsc-green/15',
  },
  blue: {
    bar: 'bg-gradient-to-r from-prmsc-navy to-prmsc-blue',
    icon: 'bg-prmsc-blue/10 text-prmsc-blue ring-prmsc-blue/20',
    check: 'bg-prmsc-blue/15 text-prmsc-blue',
    cardHover: 'hover:ring-prmsc-blue/15',
  },
  teal: {
    bar: 'bg-gradient-to-r from-prmsc-blue to-prmsc-sky',
    icon: 'bg-prmsc-blue-bright/10 text-prmsc-blue-bright ring-prmsc-blue-bright/20',
    check: 'bg-prmsc-blue-bright/15 text-prmsc-blue-bright',
    cardHover: 'hover:ring-prmsc-blue-bright/15',
  },
} as const
