export interface ThemeCSSVars {
  // ── Base surfaces ──────────────────────────────────────
  '--bg': string
  '--surface': string
  '--surface-2': string
  '--surface-glass': string       // surface @ 80% opacity (profile card bg)
  '--surface-glass-60': string    // surface @ 60% opacity (glass icons bg)
  '--dock-bg': string             // dock bar background
  '--dock-label-bg': string       // dock tooltip background

  // ── Borders ────────────────────────────────────────────
  '--border': string
  '--border-hover': string

  // ── Text ───────────────────────────────────────────────
  '--text': string
  '--text-2': string
  '--text-3': string
  '--text-hero': string           // hero title (brighter than --text)
  '--text-inverse': string        // text on accent bg (button labels)

  // ── Accent ─────────────────────────────────────────────
  '--accent': string
  '--accent-hover': string
  '--accent-dim': string          // accent @ 12%
  '--accent-glow': string         // accent @ 25%
  '--accent-rgb': string          // r,g,b channels for rgba() composition

  // ── Overlays ───────────────────────────────────────────
  '--overlay': string             // modal backdrop
  '--overlay-preview': string     // export preview backdrop

  // ── Status / feedback ──────────────────────────────────
  '--status-online': string
  '--error': string

  // ── Glitch animation ───────────────────────────────────
  '--glitch-shadow-1': string
  '--glitch-shadow-2': string

  // ── Experience category colors ─────────────────────────
  '--cat-architecture': string
  '--cat-ui': string
  '--cat-integration': string
  '--cat-data': string
  '--cat-devops': string

  // ── Skill group label colors ───────────────────────────
  '--skill-frontend': string
  '--skill-languages': string
  '--skill-tooling': string
  '--skill-testing': string
  '--skill-runtime': string
  '--skill-api': string
  '--skill-craft': string
  '--skill-engineering': string

  // ── Match score bars ───────────────────────────────────
  '--match-technologies': string
  '--match-competencies': string
  '--match-soft-skills': string
}

export interface Theme {
  /** Internal identifier */
  id: string
  /** Display name shown in UI */
  label: string
  /** All CSS custom properties injected onto :root */
  cssVars: ThemeCSSVars
  /** LetterGlitch background color array (JS-only, passed as prop) */
  glitchColors: string[]
}
