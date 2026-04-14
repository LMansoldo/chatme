import type { Theme } from './types'

export const stoneOcean: Theme = {
  id: 'stoneOcean',
  label: 'Stone Ocean',
  cssVars: {
    // ── Base surfaces ──────────────────────────────────────
    '--bg': '#07090f',
    '--surface': '#0d1117',
    '--surface-2': '#131c27',
    '--surface-glass': 'rgba(13, 17, 23, 0.80)',
    '--surface-glass-60': 'rgba(13, 17, 23, 0.60)',
    '--dock-bg': 'rgba(7, 12, 22, 0.85)',
    '--dock-label-bg': 'rgba(10, 16, 28, 0.95)',

    // ── Borders ────────────────────────────────────────────
    '--border': '#1e2a38',
    '--border-hover': '#2a3d54',

    // ── Text ───────────────────────────────────────────────
    '--text': '#d6e4f5',
    '--text-2': '#7a9ab8',
    '--text-3': '#3d5570',
    '--text-hero': '#e8f2ff',
    '--text-inverse': '#07090f',

    // ── Accent ─────────────────────────────────────────────
    '--accent': '#06b6d4',
    '--accent-hover': '#0891b2',
    '--accent-dim': 'rgba(6, 182, 212, 0.12)',
    '--accent-glow': 'rgba(6, 182, 212, 0.25)',
    '--accent-rgb': '6, 182, 212',

    // ── Overlays ───────────────────────────────────────────
    '--overlay': 'rgba(0, 0, 0, 0.75)',
    '--overlay-preview': 'rgba(0, 0, 0, 0.88)',

    // ── Status / feedback ──────────────────────────────────
    '--status-online': '#10b981',
    '--error': '#fb7185',

    // ── Glitch animation ───────────────────────────────────
    '--glitch-shadow-1': '#0e6a7e',
    '--glitch-shadow-2': '#a8c4e0',

    // ── Experience category colors ─────────────────────────
    '--cat-architecture': '#a78bfa',
    '--cat-ui': '#38bdf8',
    '--cat-integration': '#fbbf24',
    '--cat-data': '#10b981',
    '--cat-devops': '#f472b6',

    // ── Skill group label colors ───────────────────────────
    '--skill-frontend': '#38bdf8',
    '--skill-languages': '#a78bfa',
    '--skill-tooling': '#06b6d4',
    '--skill-testing': '#10b981',
    '--skill-runtime': '#34d399',
    '--skill-api': '#60a5fa',
    '--skill-craft': '#f472b6',
    '--skill-engineering': '#fb923c',

    // ── Match score bars ───────────────────────────────────
    '--match-technologies': '#06b6d4',
    '--match-competencies': '#a78bfa',
    '--match-soft-skills': '#10b981',
  },
  glitchColors: ['#07090f', '#0d1a2a', '#0891b2', '#06b6d4'],
}
