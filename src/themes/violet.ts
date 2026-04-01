import type { Theme } from './types'

export const violet: Theme = {
  id: 'violet',
  label: 'Violet',
  cssVars: {
    // ── Base surfaces ──────────────────────────────────────
    '--bg': '#060010',
    '--surface': '#0d0716',
    '--surface-2': '#170d27',
    '--surface-glass': 'rgba(13, 7, 22, 0.85)',
    '--surface-glass-60': 'rgba(13, 7, 22, 0.60)',
    '--dock-bg': 'rgba(6, 0, 16, 0.88)',
    '--dock-label-bg': 'rgba(23, 13, 39, 0.97)',

    // ── Borders ────────────────────────────────────────────
    '--border': '#271e37',
    '--border-hover': '#392e4e',

    // ── Text ───────────────────────────────────────────────
    '--text': '#f5f5f5',
    '--text-2': '#aaaaaa',
    '--text-3': '#a1a1aa',
    '--text-hero': '#ffffff',
    '--text-inverse': '#060010',

    // ── Accent ─────────────────────────────────────────────
    '--accent': '#8660fa',
    '--accent-hover': '#5227ff',
    '--accent-dim': 'rgba(82, 39, 255, 0.12)',
    '--accent-glow': 'rgba(82, 39, 255, 0.30)',
    '--accent-rgb': '134, 96, 250',

    // ── Overlays ───────────────────────────────────────────
    '--overlay': 'rgba(0, 0, 0, 0.70)',
    '--overlay-preview': 'rgba(0, 0, 0, 0.85)',

    // ── Status / feedback ──────────────────────────────────
    '--status-online': '#a855f7',
    '--error': '#f87171',

    // ── Glitch animation ───────────────────────────────────
    '--glitch-shadow-1': '#5227ff',
    '--glitch-shadow-2': '#b19eef',

    // ── Experience category colors ─────────────────────────
    '--cat-architecture': '#8660fa',
    '--cat-ui': '#b19eef',
    '--cat-integration': '#a855f7',
    '--cat-data': '#c084fc',
    '--cat-devops': '#5227ff',

    // ── Skill group label colors ───────────────────────────
    '--skill-frontend': '#b19eef',
    '--skill-languages': '#8660fa',
    '--skill-tooling': '#a855f7',
    '--skill-testing': '#c084fc',
    '--skill-runtime': '#988bc7',
    '--skill-api': '#5227ff',
    '--skill-craft': '#d8b4fe',
    '--skill-engineering': '#7c3aed',

    // ── Match score bars ───────────────────────────────────
    '--match-technologies': '#8660fa',
    '--match-competencies': '#b19eef',
    '--match-soft-skills': '#a855f7',
  },
  glitchColors: ['#060010', '#170d27', '#5227ff', '#8660fa'],
}
