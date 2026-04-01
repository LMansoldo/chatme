import type { Theme } from './types'

export const aurora: Theme = {
  id: 'aurora',
  label: 'Aurora',
  cssVars: {
    // ── Base surfaces ──────────────────────────────────────
    '--bg': '#faf8ff',
    '--surface': '#f0ebff',
    '--surface-2': '#e5deff',
    '--surface-glass': 'rgba(240, 235, 255, 0.85)',
    '--surface-glass-60': 'rgba(240, 235, 255, 0.60)',
    '--dock-bg': 'rgba(250, 248, 255, 0.90)',
    '--dock-label-bg': 'rgba(229, 222, 255, 0.97)',

    // ── Borders ────────────────────────────────────────────
    '--border': '#d0c4f7',
    '--border-hover': '#b19eef',

    // ── Text ───────────────────────────────────────────────
    '--text': '#0a0210',
    '--text-2': '#392e4e',
    '--text-3': '#988bc7',
    '--text-hero': '#060010',
    '--text-inverse': '#ffffff',

    // ── Accent ─────────────────────────────────────────────
    '--accent': '#5227ff',
    '--accent-hover': '#3d18e0',
    '--accent-dim': 'rgba(82, 39, 255, 0.10)',
    '--accent-glow': 'rgba(82, 39, 255, 0.22)',
    '--accent-rgb': '82, 39, 255',

    // ── Overlays ───────────────────────────────────────────
    '--overlay': 'rgba(6, 0, 16, 0.45)',
    '--overlay-preview': 'rgba(6, 0, 16, 0.65)',

    // ── Status / feedback ──────────────────────────────────
    '--status-online': '#7c3aed',
    '--error': '#dc2626',

    // ── Glitch animation ───────────────────────────────────
    '--glitch-shadow-1': '#8660fa',
    '--glitch-shadow-2': '#b19eef',

    // ── Experience category colors ─────────────────────────
    '--cat-architecture': '#5227ff',
    '--cat-ui': '#7c3aed',
    '--cat-integration': '#a855f7',
    '--cat-data': '#6d28d9',
    '--cat-devops': '#8660fa',

    // ── Skill group label colors ───────────────────────────
    '--skill-frontend': '#5227ff',
    '--skill-languages': '#7c3aed',
    '--skill-tooling': '#8660fa',
    '--skill-testing': '#6d28d9',
    '--skill-runtime': '#a855f7',
    '--skill-api': '#392e4e',
    '--skill-craft': '#9333ea',
    '--skill-engineering': '#4c1d95',

    // ── Match score bars ───────────────────────────────────
    '--match-technologies': '#5227ff',
    '--match-competencies': '#8660fa',
    '--match-soft-skills': '#a855f7',
  },
  glitchColors: ['#faf8ff', '#e5deff', '#8660fa', '#5227ff'],
}
