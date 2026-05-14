import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'article' | 'main'
}

export function Container({ 
  children, 
  className = '', 
  as: Component = 'div' 
}: ContainerProps) {
  return (
    <Component 
      className={`w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl ${className}`}
    >
      {children}
    </Component>
  )
}
