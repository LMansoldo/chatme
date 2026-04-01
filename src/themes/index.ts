export { affinity } from './affinity'
export { stoneOcean } from './stoneOcean'
export { lumina } from './lumina'
export { violet } from './violet'
export { aurora } from './aurora'
export { stark } from './stark'
export type { Theme, ThemeCSSVars } from './types'
export { TECH_COLORS, SKILL_LABEL_TO_CSS_VAR } from './tokens'

import { affinity } from './affinity'
import { stoneOcean } from './stoneOcean'
import { lumina } from './lumina'
import { violet } from './violet'
import { aurora } from './aurora'
import { stark } from './stark'
import type { Theme } from './types'

export const THEMES: Theme[] = [affinity, stoneOcean, lumina, violet, aurora, stark]
export const DEFAULT_THEME_ID = 'affinity'
