import type { Theme } from './types'

export const lumina: Theme = {
  id: 'lumina',
  label: 'Lumina',
  cssVars: {
    // ── Base surfaces ──────────────────────────────────────
    '--bg': '#ecf9f7',
    '--surface': '#ecf9f7',
    '--surface-2': '#ecf9f7',
    '--surface-glass': 'rgba(245, 255, 254, 0.85)',
    '--surface-glass-60': 'rgba(245, 255, 254, 0.65)',
    '--dock-bg': 'rgba(255, 255, 255, 0.88)',
    '--dock-label-bg': 'rgba(214, 245, 240, 0.97)',

    // ── Borders ────────────────────────────────────────────
    '--border': '#814efa',
    '--border-hover': 'rgba(0, 253, 207, 0.45)',

    // ── Text ───────────────────────────────────────────────
    '--text': '#2f3132',
    '--text-2': '#2f3132',
    '--text-3': '#814efa',
    '--text-hero': '#2f3132',
    '--text-inverse': '#ffffff',

    // ── Accent ─────────────────────────────────────────────
    '--accent': '#00fdcf',
    '--accent-hover': '#00fdcf',
    '--accent-dim': 'rgba(0, 253, 207, 0.12)',
    '--accent-glow': '#00fdcf',
    '--accent-rgb': '0, 201, 167',

    // ── Overlays ───────────────────────────────────────────
    '--overlay': 'rgba(50, 21, 109, 0.45)',
    '--overlay-preview': 'rgba(50, 21, 109, 0.65)',

    // ── Status / feedback ──────────────────────────────────
    '--status-online': '#00c9a7',
    '--error': '#dc2626',

    // ── Glitch animation ───────────────────────────────────
    '--glitch-shadow-1': '#814efa',
    '--glitch-shadow-2': '#00fdcf',

    // ── Experience category colors ─────────────────────────
    '--cat-architecture': '#814efa',
    '--cat-ui': '#00c9a7',
    '--cat-integration': '#32156d',
    '--cat-data': '#0891b2',
    '--cat-devops': '#c026d3',

    // ── Skill group label colors ───────────────────────────
    '--skill-frontend': '#0891b2',
    '--skill-languages': '#814efa',
    '--skill-tooling': '#00c9a7',
    '--skill-testing': '#059669',
    '--skill-runtime': '#0d9488',
    '--skill-api': '#32156d',
    '--skill-craft': '#db2777',
    '--skill-engineering': '#ea580c',

    // ── Match score bars ───────────────────────────────────
    '--match-technologies': '#00fdcf',
    '--match-competencies': '#814efa',
    '--match-soft-skills': '#0891b2',
  },
  glitchColors: ['#ffffff', '#d6f5f0', '#00fdcf', '#32156d'],
}
