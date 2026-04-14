import type { Theme } from './types'

export const affinity: Theme = {
  id: 'affinity',
  label: 'Affinity',
  cssVars: {
    // ── Base surfaces ──────────────────────────────────────
    '--bg': '#0b0c09',
    '--surface': '#111410',
    '--surface-2': '#191c16',
    '--surface-glass': 'rgba(17, 20, 16, 0.80)',
    '--surface-glass-60': 'rgba(17, 20, 16, 0.60)',
    '--dock-bg': 'rgba(17, 17, 17, 0.85)',
    '--dock-label-bg': 'rgba(24, 24, 24, 0.95)',

    // ── Borders ────────────────────────────────────────────
    '--border': '#252820',
    '--border-hover': '#31352a',

    // ── Text ───────────────────────────────────────────────
    '--text': '#ddd8cc',
    '--text-2': '#8c8878',
    '--text-3': '#50504a',
    '--text-hero': '#f5f2ec',
    '--text-inverse': '#0a0a0a',

    // ── Accent ─────────────────────────────────────────────
    '--accent': '#61dd69',
    '--accent-hover': '#3d9743',
    '--accent-dim': 'rgba(107, 158, 110, 0.12)',
    '--accent-glow': 'rgba(107, 158, 110, 0.25)',
    '--accent-rgb': '107, 158, 110',

    // ── Overlays ───────────────────────────────────────────
    '--overlay': 'rgba(0, 0, 0, 0.7)',
    '--overlay-preview': 'rgba(0, 0, 0, 0.85)',

    // ── Status / feedback ──────────────────────────────────
    '--status-online': '#22c55e',
    '--error': '#f87171',

    // ── Glitch animation ───────────────────────────────────
    '--glitch-shadow-1': '#00fdcf',
    '--glitch-shadow-2': '#c4bba8',

    // ── Experience category colors ─────────────────────────
    '--cat-architecture': '#bd34fe',
    '--cat-ui': '#61dafb',
    '--cat-integration': '#c8a96e',
    '--cat-data': '#22c55e',
    '--cat-devops': '#ff4785',

    // ── Skill group label colors ───────────────────────────
    '--skill-frontend': '#61dafb',
    '--skill-languages': '#bd34fe',
    '--skill-tooling': '#6b9e6e',
    '--skill-testing': '#22c55e',
    '--skill-runtime': '#5fa04e',
    '--skill-api': '#3178c6',
    '--skill-craft': '#ff4785',
    '--skill-engineering': '#ff3e00',

    // ── Match score bars ───────────────────────────────────
    '--match-technologies': '#6b9e6e',
    '--match-competencies': '#a78bfa',
    '--match-soft-skills': '#34d399',
  },
  glitchColors: ['#0b0c09', '#1a2416', '#2ead33', '#6b9e6e'],
}
