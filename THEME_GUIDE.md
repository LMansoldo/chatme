# Theme System — Análise e Guia de Implementação

> Prompt gerado a partir da auditoria de estilos do projeto `lucas-mansoldo`.
> Use este documento como referência para implementar o sistema de temas ou adicionar novos temas.

---

## Estado atual do projeto

O projeto usa **CSS Custom Properties** em `global.css` para as cores base (bg, surface, text, accent), mas **vários componentes ainda têm cores hardcoded** via inline styles ou constantes JS. O sistema de temas existe parcialmente: o tema padrão (Affinity) está implícito nas variáveis do `:root`, mas não há mecanismo para troca em runtime.

---

## Auditoria de cores hardcoded

Abaixo estão **todos os valores hardcoded encontrados** na auditoria de 57 ocorrências em 13 arquivos, e o que deve ser feito em cada um.

---

### `src/styles/portfolio.css`

| Valor hardcoded | Local | Substituir por |
|---|---|---|
| `rgba(17, 17, 17, 0.8)` | `.profile-card` background | `var(--surface-glass)` |
| `rgba(17, 17, 17, 0.6)` | `.glass-icon-item` background | `var(--surface-glass-60)` |
| `rgba(17, 17, 17, 0.85)` | `.dock` background | `var(--dock-bg)` |
| `rgba(24, 24, 24, 0.95)` | `.dock-label` background | `var(--dock-label-bg)` |
| `rgba(0, 0, 0, 0.7)` | `.modal-overlay` background | `var(--overlay)` |
| `#22c55e` | `.profile-avatar-status` background | `var(--status-online)` |
| `#f5f2ec` | `.hero-title` color | `var(--text-hero)` |
| `rgba(107, 158, 110, 0.06)` | `.magic-bento-spotlight` radial-gradient | `rgba(var(--accent-rgb), 0.06)` |
| `rgba(107, 158, 110, var(...))` | `.magic-bento-border` border | `rgba(var(--accent-rgb), var(--border-opacity, 0))` |

**Ação adicional:** Adicionar as classes `.exp-cat-badge--*` e `.exp-bento-dot--*` usando `color-mix`:
```css
.exp-cat-badge--architecture {
  color: var(--cat-architecture);
  border-color: color-mix(in srgb, var(--cat-architecture) 26%, transparent);
  background:   color-mix(in srgb, var(--cat-architecture) 7%,  transparent);
}
/* repetir para: ui, integration, data, devops */
```

---

### `src/styles/tailoring.css`

| Valor hardcoded | Local | Substituir por |
|---|---|---|
| `#f87171` | `.tailoring-error` color | `var(--error)` |

---

### `src/components/ui/GlitchText.css`

| Valor hardcoded | Local | Substituir por |
|---|---|---|
| `#4a7a42` | `.glitch-text--shadows::before` color | `var(--glitch-shadow-1)` |
| `#c4bba8` | `.glitch-text--shadows::after` color | `var(--glitch-shadow-2)` |

---

### `src/components/sections/ExperienceSection.tsx`

Contém a constante `CATEGORY_COLORS` com 5 cores hardcoded:

```ts
const CATEGORY_COLORS = {
  architecture: '#bd34fe',
  ui: '#61dafb',
  integration: '#c8a96e',
  data: '#22c55e',
  devops: '#ff4785',
}
```

**Ação:** Remover a constante. Substituir inline styles por classes CSS.

**Dot (antes):**
```tsx
<span style={{ background: CATEGORY_COLORS[h.category] ?? '#6b9e6e' }} />
```
**Dot (depois):**
```tsx
<span className={`exp-bento-dot exp-bento-dot--${h.category}`} />
```

**Badge (antes):**
```tsx
<span style={{ color: CATEGORY_COLORS[cat], borderColor: `...44`, background: `...11` }}>
```
**Badge (depois):**
```tsx
<span className={`exp-cat-badge exp-cat-badge--${cat}`}>
```

---

### `src/components/sections/SkillsSection.tsx`

Contém a constante `SKILL_COLORS` com 14 entradas hardcoded (EN + PT-BR):

```ts
const SKILL_COLORS = {
  Frontend: '#61dafb',
  Languages: '#bd34fe',
  Tooling: '#6b9e6e',
  Testing: '#22c55e',
  Runtime: '#5fa04e',
  'API & Integration': '#3178c6',
  'Frontend Craft': '#ff4785',
  Engineering: '#ff3e00',
  // + PT-BR equivalents
}
```

**Ação:** Remover a constante. Importar `SKILL_LABEL_TO_CSS_VAR` de `src/themes/tokens.ts` e usar:

```tsx
import { SKILL_LABEL_TO_CSS_VAR } from '../../themes'

const cssVar = SKILL_LABEL_TO_CSS_VAR[group.label]
const color = cssVar ? `var(${cssVar})` : 'var(--accent)'

<div className="skill-bento-label" style={{ color }}>
```

---

### `src/components/sections/HeroSection.tsx`

Contém `TECH_COLORS` (12 entradas de brand colors) e glitchColors hardcoded:

```ts
const TECH_COLORS = { Svelte: '#ff3e00', React: '#61dafb', ... }

// hardcoded em JSX:
<LetterGlitch glitchColors={['#0b0c09', '#1a2416', '#2ead33', '#6b9e6e']} />
```

**Ação para TECH_COLORS:** Mover para `src/themes/tokens.ts` e importar de lá:
```tsx
import { TECH_COLORS } from '../../themes'
```

**Ação para glitchColors:** Usar `useTheme()` para obter do tema ativo:
```tsx
import { useTheme } from '../../themes/ThemeProvider'

const { theme } = useTheme()
// ...
<LetterGlitch glitchColors={theme.glitchColors} />
```

---

### `src/components/Tailoring/MatchScore.tsx`

Contém 3 cores hardcoded nas barras de progresso:

```ts
const BARS = [
  { key: 'technologies', color: '#6b9e6e' },
  { key: 'competencies', color: '#a78bfa' },
  { key: 'soft_skills',  color: '#34d399' },
]

<div style={{ backgroundColor: bar.color }} />
```

**Ação:** Substituir inline `backgroundColor` por CSS via `var(--match-*)`. Remover o campo `color` dos BARS:

```tsx
const BARS = [
  { key: 'technologies', cssVar: '--match-technologies' },
  { key: 'competencies', cssVar: '--match-competencies' },
  { key: 'soft_skills',  cssVar: '--match-soft-skills'  },
]

<div
  className="match-bar-fill"
  style={{ width: `${score[bar.key]}%`, backgroundColor: `var(${bar.cssVar})` }}
/>
```

---

### `src/App.tsx`

Não tem cores hardcoded, mas precisa de dois ajustes estruturais:

1. **Envolver com `ThemeProvider`:**
```tsx
import { ThemeProvider } from './themes/ThemeProvider'

function App() { ... }

export default function Root() {
  return <ThemeProvider><App /></ThemeProvider>
}
```

2. **Adicionar `ThemeToggle` no Dock** (com `isRaw: true`):
```tsx
import { ThemeToggle } from './components/ui/ThemeToggle'

{ icon: <ThemeToggle />, label: '', onClick: () => {}, isRaw: true },
```

---

## Arquivos de tema a criar

### `src/themes/types.ts` ✅ (já existe)
Interface `ThemeCSSVars` (37 vars) + interface `Theme`.

### `src/themes/tokens.ts`
Exporta `TECH_COLORS` (brand colors estáticas, não temáticas) e `SKILL_LABEL_TO_CSS_VAR` (mapeamento EN + PT-BR → CSS var).

### `src/themes/affinity.ts`
Tema atual (padrão). Paleta retro verde/bege:
- `--bg: #0b0c09` · `--accent: #6b9e6e` · `--text: #ddd8cc`
- `glitchColors: ['#0b0c09', '#1a2416', '#2ead33', '#6b9e6e']`

### `src/themes/stoneOcean.ts`
Paleta navy/cyan:
- `--bg: #07090f` · `--accent: #06b6d4` · `--text: #d6e4f5`
- `glitchColors: ['#07090f', '#0d1a2a', '#0891b2', '#06b6d4']`

### `src/themes/index.ts`
Registra os temas no array `THEMES` e exporta `DEFAULT_THEME_ID = 'affinity'`.

### `src/themes/ThemeProvider.tsx`
- `createContext` com `{ theme, setTheme }`
- Injeta vars via `document.documentElement.style.setProperty(key, value)` no `useEffect([theme])`
- Persiste em `localStorage` com a chave `'portfolio-theme'`
- Hook `useTheme()` para consumo

### `src/components/ui/ThemeToggle.tsx`
Botão no Dock que chama `setTheme` ciclando pelos temas registrados.

---

## Como adicionar um novo tema

1. Criar `src/themes/meuTema.ts` implementando a interface `Theme` (todos os 37 campos de `ThemeCSSVars` + `glitchColors`)
2. Importar e adicionar ao array `THEMES` em `src/themes/index.ts`
3. O `ThemeToggle` passa a incluir o novo tema automaticamente

---

## Variáveis CSS — referência rápida

| Variável | Onde é usada |
|---|---|
| `--bg` | `body` background |
| `--surface` | Cards (`MagicBento`), modais |
| `--surface-2` | Inputs, skill tags, bubble do assistente |
| `--surface-glass` | `ProfileCard` backdrop (80%) |
| `--surface-glass-60` | `GlassIcons` backdrop (60%) |
| `--dock-bg` | Barra do Dock |
| `--dock-label-bg` | Tooltip do Dock |
| `--border` / `--border-hover` | Bordas gerais |
| `--text` / `--text-2` / `--text-3` | Hierarquia de texto |
| `--text-hero` | `<h1>` do Hero (quase branco) |
| `--text-inverse` | Texto sobre botão com fundo accent |
| `--accent` | Links, bordas ativas, destaques |
| `--accent-hover` | Accent no hover |
| `--accent-dim` | Accent 12% — bg de chips e bubbles |
| `--accent-glow` | Accent 25% — borda de bubble do usuário |
| `--accent-rgb` | Canais raw para `rgba(var(--accent-rgb), x)` (spotlight MagicBento) |
| `--overlay` | Backdrop do modal |
| `--status-online` | Bolinha verde do ProfileCard |
| `--error` | Texto de erro no TailoringPanel |
| `--glitch-shadow-1` / `--glitch-shadow-2` | Pseudos `::before` / `::after` do GlitchText |
| `--cat-architecture` … `--cat-devops` | Dots e badges da ExperienceSection |
| `--skill-frontend` … `--skill-engineering` | Labels coloridas da SkillsSection |
| `--match-technologies` … `--match-soft-skills` | Barras de progresso do MatchScore |
