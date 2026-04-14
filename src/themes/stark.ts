import type { Theme } from './types'

export const stark: Theme = {
  id: 'stark',
  label: 'Stark',
  cssVars: {
    // ── Base surfaces ──────────────────────────────────────
    '--bg': '#ffffff',
    '--surface': '#f5f5f5',
    '--surface-2': '#ebebeb',
    '--surface-glass': 'rgba(255, 255, 255, 0.88)',
    '--surface-glass-60': 'rgba(255, 255, 255, 0.65)',
    '--dock-bg': 'rgba(255, 255, 255, 0.94)',
    '--dock-label-bg': 'rgba(235, 235, 235, 0.98)',

    // ── Borders ────────────────────────────────────────────
    '--border': '#1a1a1a',
    '--border-hover': '#1a1a1a',

    // ── Text ───────────────────────────────────────────────
    '--text': '#000000',
    '--text-2': '#1a1a1a',
    '--text-3': '#666666',
    '--text-hero': '#000000',
    '--text-inverse': '#ffffff',

    // ── Accent ─────────────────────────────────────────────
    '--accent': '#7c00ff',
    '--accent-hover': '#6200cc',
    '--accent-dim': 'rgba(124, 0, 255, 0.08)',
    '--accent-glow': 'rgba(124, 0, 255, 0.18)',
    '--accent-rgb': '124, 0, 255',

    // ── Overlays ───────────────────────────────────────────
    '--overlay': 'rgba(0, 0, 0, 0.55)',
    '--overlay-preview': 'rgba(0, 0, 0, 0.75)',

    // ── Status / feedback ──────────────────────────────────
    '--status-online': '#7c00ff',
    '--error': '#cc0000',

    // ── Glitch animation ───────────────────────────────────
    '--glitch-shadow-1': '#7c00ff',
    '--glitch-shadow-2': '#000000',

    // ── Experience category colors ─────────────────────────
    '--cat-architecture': '#7c00ff',
    '--cat-ui': '#aa00ff',
    '--cat-integration': '#5500cc',
    '--cat-data': '#000000',
    '--cat-devops': '#9900ff',

    // ── Skill group label colors ───────────────────────────
    '--skill-frontend': '#7c00ff',
    '--skill-languages': '#000000',
    '--skill-tooling': '#5500cc',
    '--skill-testing': '#aa00ff',
    '--skill-runtime': '#4400bb',
    '--skill-api': '#000000',
    '--skill-craft': '#9900ff',
    '--skill-engineering': '#6200cc',

    // ── Match score bars ───────────────────────────────────
    '--match-technologies': '#7c00ff',
    '--match-competencies': '#000000',
    '--match-soft-skills': '#1a1a1a',
  },
  glitchColors: ['#ffffff', '#ebebeb', '#7c00ff', '#000000'],
}
