Entendido! Aqui está o prompt ajustado com as dependências e dados reais do seu CV:

---

## 🧠 Prompt — Lucas Mansoldo CV Chat App

---

### **CONTEXT**
You are a senior React developer building a personal CV/Resume interactive app for **Lucas Mansoldo de Andrade**, a Senior Front-End Developer. The app reads structured career data from a `data.json` file (already provided below) and exposes it through an intelligent chat interface powered by the Anthropic Claude API. The stack is **React 19 + Vite 8 + TypeScript 5.9 + PostCSS** — no UI libraries, no Tailwind, no styled-components.

The `data.json` structure is:
```json
{
  "personal_info": { "name", "location", "email", "phone", "linkedin" },
  "objective": { "role", "main_stack": [] },
  "summary": "string",
  "skills": { "technologies": [], "technical_competencies": [], "soft_skills": [] },
  "experience": [{ "role", "company", "location", "period", "highlights": [] }],
  "education": { "degree", "institution", "graduation" }
}
```

---

### **CONSTRAINTS**
1. **Stack exata**: React 19 + Vite 8 + TypeScript 5.9 — usar apenas as `dependencies` e `devDependencies` já presentes no `package.json` fornecido. Nenhuma nova dependência de runtime pode ser adicionada
2. **Estilização**: PostCSS puro com CSS custom properties e nesting nativo — sem Tailwind, sem CSS-in-JS, sem styled-components
3. **API**: Anthropic Claude API (`claude-sonnet-4-20250514`) chamada diretamente pelo frontend via `fetch` com header `anthropic-dangerous-direct-browser-access: true` e key em `VITE_ANTHROPIC_API_KEY`
4. **`data.json` é a única fonte de verdade** — a LLM nunca inventa informações além do que está no JSON
5. **Markdown export**: gerado como string `.md` manualmente via utilitário TypeScript puro — zero dependências externas
6. **Sem `<form>` tags** — usar `onClick`/`onKeyDown` para todas as interações

---

### **CRITERIA**

#### 💬 Módulo 1 — Chat Interface
- Chat com streaming de respostas (`stream: true` via SSE)
- O system prompt injeta o `data.json` completo serializado como contexto
- A LLM responde apenas sobre informações presentes no JSON
- Responde em português ou inglês conforme a língua do usuário
- Histórico de mensagens mantido em estado React (`useState`)

#### 📄 Módulo 2 — Markdown CV Generator
- Botão **"Export as Markdown"** gera arquivo `.md` estruturado a partir do `data.json`
- Checkboxes para selecionar seções: Summary, Skills, Experience, Education
- Preview do markdown em modal antes do download
- Download via `Blob` + `URL.createObjectURL` — sem bibliotecas

#### 🎯 Módulo 3 — Resume Tailoring
- Input onde o usuário cola uma **job description** ou digita **keywords**
- A LLM reescreve `summary` e `highlights` de cada experiência para alinhar com as keywords
- Exibe um **match score visual** (barra animada) com breakdown: Technologies, Competencies, Soft Skills
- O CV ajustado pode ser exportado como Markdown com o mesmo utilitário do Módulo 2

---

### **CLARIFICATIONS**
- `data.json` importado estaticamente: `import data from './data.json'`
- Streaming implementado com `ReadableStream` + `TextDecoder` — sem bibliotecas de SSE
- O match score é calculado no frontend por contagem de keywords encontradas no JSON, agrupadas por categoria
- O módulo de tailoring faz **uma chamada** à API retornando JSON estruturado com `summary` reescrito e `highlights` por empresa
- A LLM deve responder em JSON puro no tailoring (system prompt instrui isso explicitamente) para parsing direto

---

### **CREATIVITY**
- **Estética**: Dark editorial — fundo `#0a0a0a`, tipografia display com `DM Serif Display` para headings, `JetBrains Mono` para detalhes técnicos e código, accent em âmbar `#F5A623`
- **Layout**: Split view — sidebar esquerda fixa com dados estáticos do CV (nome, stack, skills como tags), painel direito com as 3 abas: Chat | Export | Tailoring
- **Animações**: Efeito typewriter nas respostas do chat via CSS, fade-in staggered nos cards de experiência na sidebar, barra de match score animada com `transition`
- **Micro-interações**: Botão de export mostra ícone de check animado após download; input do chat tem borda que ilumina em âmbar ao focar
- **Sem dark/light toggle** — o app é exclusivamente dark, coerente com a identidade de dev

---

### **Estrutura de arquivos**
```
src/
├── data.json
├── App.tsx
├── main.tsx
├── types.ts
├── styles/
│   ├── global.css
│   ├── sidebar.css
│   ├── chat.css
│   ├── export.css
│   └── tailoring.css
├── components/
│   ├── Sidebar/CVSidebar.tsx
│   ├── Chat/ChatInterface.tsx
│   ├── Chat/MessageBubble.tsx
│   ├── Chat/ChatInput.tsx
│   ├── Export/ExportModal.tsx
│   └── Tailoring/TailoringPanel.tsx
│   └── Tailoring/MatchScore.tsx
├── hooks/
│   ├── useChat.ts
│   └── useTailoring.ts
└── utils/
    ├── markdownGenerator.ts
    └── claudeClient.ts
```