import { createContext, useContext, useEffect, useState } from 'react'
import { THEMES, DEFAULT_THEME_ID } from './index'
import type { Theme } from './types'

interface ThemeContextValue {
  theme: Theme
  setTheme: (id: string) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = 'portfolio-theme'

function applyTheme(theme: Theme) {
  const root = document.documentElement
  for (const [key, value] of Object.entries(theme.cssVars)) {
    root.style.setProperty(key, value)
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
    return THEMES.find(t => t.id === saved) ?? THEMES.find(t => t.id === DEFAULT_THEME_ID) ?? THEMES[0]
  })

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  function setTheme(id: string) {
    const next = THEMES.find(t => t.id === id)
    if (!next) return
    localStorage.setItem(STORAGE_KEY, id)
    setThemeState(next)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
