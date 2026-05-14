import type { ReactNode } from 'react'

type Gap = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12'

const gapClasses: Record<Gap, string> = {
  '0': 'gap-0',
  '1': 'gap-1',
  '2': 'gap-2',
  '3': 'gap-3',
  '4': 'gap-4',
  '5': 'gap-5',
  '6': 'gap-6',
  '8': 'gap-8',
  '10': 'gap-10',
  '12': 'gap-12',
}

interface StackProps {
  children: ReactNode
  gap?: Gap
  className?: string
}

export function VStack({ children, gap = '4', className = '' }: StackProps) {
  return (
    <div className={`flex flex-col ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  )
}

export function HStack({ children, gap = '4', className = '' }: StackProps) {
  return (
    <div className={`flex flex-row ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  )
}

// Responsive stack: column on mobile, row on tablet+
export function ResponsiveStack({ children, gap = '4', className = '' }: StackProps) {
  return (
    <div className={`flex flex-col md:flex-row ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  )
}
