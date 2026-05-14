import { useState, useEffect } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = (event: MediaQueryListEvent) => setMatches(event.matches)
    media.addEventListener('change', listener)

    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

// Tailwind breakpoint values
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

export function useIsMobile(): boolean {
  return !useMediaQuery(`(min-width: ${breakpoints.md})`)
}

export function useIsTablet(): boolean {
  const isAboveMobile = useMediaQuery(`(min-width: ${breakpoints.md})`)
  const isBelowDesktop = !useMediaQuery(`(min-width: ${breakpoints.lg})`)
  return isAboveMobile && isBelowDesktop
}

export function useIsDesktop(): boolean {
  return useMediaQuery(`(min-width: ${breakpoints.lg})`)
}

export function useBreakpoint(): 'mobile' | 'tablet' | 'desktop' {
  const isDesktop = useIsDesktop()
  const isTablet = useIsTablet()

  if (isDesktop) return 'desktop'
  if (isTablet) return 'tablet'
  return 'mobile'
}
