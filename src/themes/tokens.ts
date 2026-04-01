/**
 * Static brand / tech colors — these do NOT change with the theme.
 * Passed as inline styles where a specific brand identity is needed
 * (e.g. technology logo colors in the hero, skill dot colors).
 */
export const TECH_COLORS: Record<string, string> = {
  Svelte: '#ff3e00',
  React: '#61dafb',
  TypeScript: '#3178c6',
  'Next.js': '#ffffff',
  Tailwind: '#38bdf8',
  Storybook: '#ff4785',
  Vite: '#bd34fe',
  Docker: '#2496ed',
  Jest: '#c21325',
  Cypress: '#04c38e',
  Playwright: '#2ead33',
  'Node.js': '#5fa04e',
}

/**
 * Maps skill group labels (both EN and PT-BR) to their CSS variable name.
 * Used by SkillsSection to resolve `--skill-*` vars without hardcoded colors.
 */
export const SKILL_LABEL_TO_CSS_VAR: Record<string, string> = {
  // EN
  Frontend: '--skill-frontend',
  Languages: '--skill-languages',
  Tooling: '--skill-tooling',
  Testing: '--skill-testing',
  Runtime: '--skill-runtime',
  'API & Integration': '--skill-api',
  'Frontend Craft': '--skill-craft',
  Engineering: '--skill-engineering',
  // PT-BR
  Linguagens: '--skill-languages',
  Ferramentas: '--skill-tooling',
  Testes: '--skill-testing',
  'API & Integração': '--skill-api',
  'Craft Frontend': '--skill-craft',
  Engenharia: '--skill-engineering',
}
