import { useTheme } from '../../themes/ThemeProvider'
import { THEMES } from '../../themes'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  function cycle() {
    const idx = THEMES.findIndex(t => t.id === theme.id)
    const next = THEMES[(idx + 1) % THEMES.length]
    setTheme(next.id)
  }

  return (
    <button className="theme-toggle" onClick={cycle} title={`Theme: ${theme.label}`}>
      <span className="theme-toggle-icon">◐</span>
      <span className="theme-toggle-label">{theme.label}</span>
    </button>
  )
}
