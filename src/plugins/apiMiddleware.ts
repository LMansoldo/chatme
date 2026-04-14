import { loadEnv, type Plugin, type Connect } from 'vite'
import type { IncomingMessage, ServerResponse } from 'http'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { Readable } from 'stream'

const MODEL = 'gemini-3-flash-preview'
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models'

// ─── Types ─────────────────────────────────────────────────

interface ChatRequestBody {
  messages: { role: string; content: string }[]
  language: string
}

interface TailorRequestBody {
  jobDescription: string
  language: string
}

interface GeminiContent {
  role: 'user' | 'model'
  parts: { text: string }[]
}

// ─── CV data cache ─────────────────────────────────────────

const cvCache: Record<string, object> = {}

function loadCVData(root: string, lang: string): object {
  const key = lang === 'pt-BR' ? 'pt-BR' : 'en'
  if (!cvCache[key]) {
    const file = key === 'pt-BR' ? 'data.pt-BR.json' : 'data.json'
    cvCache[key] = JSON.parse(readFileSync(resolve(root, 'src', file), 'utf-8'))
  }
  return cvCache[key]
}

// ─── Prompt builders ───────────────────────────────────────

function buildChatSystemPrompt(cvData: object): string {
  return `You are an intelligent assistant for Lucas Mansoldo de Andrade's interactive CV. \
You have access to his complete career data below. Answer questions ONLY based on the information \
provided in the JSON. Do not invent or extrapolate details not present in the data. \
Respond in the same language the user writes in (Portuguese or English).

CV Data:
${JSON.stringify(cvData, null, 2)}`
}

const TAILORING_SYSTEM = `You are a professional resume writer. Given a job description and a candidate's CV data, \
rewrite the summary and experience highlights to better align with the job requirements.

Return ONLY valid JSON — no markdown, no explanation, no code blocks. The JSON must match this exact structure:
{
  "summary": "rewritten summary string",
  "experience": [
    { "company": "company name", "highlights": ["highlight 1", "highlight 2"] }
  ]
}

Rules:
- Keep the same number of highlights per company as in the original
- Do not fabricate information not present in the original CV
- Make the language more relevant to the job description keywords`

const KEYWORD_OPTIMIZER_SYSTEM = `You are an ATS (Applicant Tracking System) optimization specialist.

Given a job description and a candidate's CV data, identify terms/phrases used in the job description that could replace similar but differently-worded terms in the CV to improve keyword alignment.

Return ONLY valid JSON — no markdown, no explanation, no code blocks. Format:
{
  "suggestions": [
    {
      "cv_term": "exact phrase currently in the CV",
      "jd_term": "equivalent phrase from the job description",
      "location": "where in the CV (e.g. Skills, Summary, Experience at Company X)"
    }
  ]
}

Rules:
- cv_term must be an exact substring that appears verbatim in the CV data
- jd_term must come directly from the job description
- Only suggest where meaning is similar but wording differs (not identical matches)
- Do not suggest replacements that change the factual meaning
- Aim for 5 to 15 high-impact suggestions
- Prioritize: technical skills, tools, methodologies, role titles, frameworks
- Skip generic words like "team", "work", "good"`

function buildTailoringUserPrompt(cvData: object, jobDescription: string): string {
  return `Job Description:\n${jobDescription}\n\nCV Data:\n${JSON.stringify(cvData, null, 2)}`
}

// ─── Helpers ───────────────────────────────────────────────

function toGeminiMessages(messages: { role: string; content: string }[]): GeminiContent[] {
  return messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))
}

function parseBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((res, rej) => {
    let body = ''
    req.on('data', chunk => { body += chunk })
    req.on('end', () => {
      try { res(JSON.parse(body)) } catch (e) { rej(e) }
    })
    req.on('error', rej)
  })
}

function sendError(res: ServerResponse, status: number, message: string) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ error: message }))
}

// ─── Route handlers ────────────────────────────────────────

async function handleChat(
  req: IncomingMessage,
  res: ServerResponse,
  next: Connect.NextFunction,
  root: string,
  apiKey: string
) {
  if (req.method !== 'POST') return next()

  if (!apiKey) return sendError(res, 500, 'GEMINI_API_KEY not set')

  let body: ChatRequestBody
  try {
    body = await parseBody(req) as ChatRequestBody
  } catch {
    return sendError(res, 400, 'Invalid JSON body')
  }

  if (!Array.isArray(body.messages)) {
    return sendError(res, 400, 'messages array required')
  }

  const cvData = loadCVData(root, body.language ?? 'en')

  let upstream: Response
  try {
    upstream = await fetch(
      `${BASE_URL}/${MODEL}:streamGenerateContent?key=${apiKey}&alt=sse`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: buildChatSystemPrompt(cvData) }] },
          contents: toGeminiMessages(body.messages),
          generationConfig: { maxOutputTokens: 1024 },
        }),
      }
    )
  } catch (err) {
    return sendError(res, 502, `Upstream fetch failed: ${(err as Error).message}`)
  }

  if (!upstream.ok) {
    return sendError(res, upstream.status, `Upstream error: ${upstream.status}`)
  }

  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('X-Accel-Buffering', 'no')

  Readable.fromWeb(upstream.body as import('stream/web').ReadableStream).pipe(res)
}

async function handleTailor(
  req: IncomingMessage,
  res: ServerResponse,
  next: Connect.NextFunction,
  root: string,
  apiKey: string
) {
  if (req.method !== 'POST') return next()

  if (!apiKey) return sendError(res, 500, 'GEMINI_API_KEY not set')

  let body: TailorRequestBody
  try {
    body = await parseBody(req) as TailorRequestBody
  } catch {
    return sendError(res, 400, 'Invalid JSON body')
  }

  if (!body.jobDescription?.trim()) {
    return sendError(res, 400, 'jobDescription required')
  }

  const cvData = loadCVData(root, body.language ?? 'en')

  let upstream: Response
  try {
    upstream = await fetch(
      `${BASE_URL}/${MODEL}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: TAILORING_SYSTEM }] },
          contents: [{ role: 'user', parts: [{ text: buildTailoringUserPrompt(cvData, body.jobDescription) }] }],
          generationConfig: { maxOutputTokens: 8192 },
        }),
      }
    )
  } catch (err) {
    return sendError(res, 502, `Upstream fetch failed: ${(err as Error).message}`)
  }

  if (!upstream.ok) {
    return sendError(res, upstream.status, `Upstream error: ${upstream.status}`)
  }

  const data = await upstream.json() as {
    candidates?: { content?: { parts?: { text?: string }[] } }[]
  }
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) return sendError(res, 502, 'Empty response from Gemini')

  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ text }))
}

async function handleKeywordOptimize(
  req: IncomingMessage,
  res: ServerResponse,
  next: Connect.NextFunction,
  root: string,
  apiKey: string
) {
  if (req.method !== 'POST') return next()

  if (!apiKey) return sendError(res, 500, 'GEMINI_API_KEY not set')

  let body: TailorRequestBody
  try {
    body = await parseBody(req) as TailorRequestBody
  } catch {
    return sendError(res, 400, 'Invalid JSON body')
  }

  if (!body.jobDescription?.trim()) {
    return sendError(res, 400, 'jobDescription required')
  }

  const cvData = loadCVData(root, body.language ?? 'en')

  let upstream: Response
  try {
    upstream = await fetch(
      `${BASE_URL}/${MODEL}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: KEYWORD_OPTIMIZER_SYSTEM }] },
          contents: [{ role: 'user', parts: [{ text: buildTailoringUserPrompt(cvData, body.jobDescription) }] }],
          generationConfig: { maxOutputTokens: 8192, temperature: 0.2 },
        }),
      }
    )
  } catch (err) {
    return sendError(res, 502, `Upstream fetch failed: ${(err as Error).message}`)
  }

  if (!upstream.ok) {
    return sendError(res, upstream.status, `Upstream error: ${upstream.status}`)
  }

  const data = await upstream.json() as {
    candidates?: { content?: { parts?: { text?: string }[] } }[]
  }
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) return sendError(res, 502, 'Empty response from Gemini')

  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ text }))
}

// ─── Middleware registration ────────────────────────────────

function registerMiddleware(app: Connect.Server, root: string, apiKey: string) {
  app.use('/api/chat', (req, res, next) => {
    handleChat(req, res, next, root, apiKey).catch(next)
  })
  app.use('/api/tailor', (req, res, next) => {
    handleTailor(req, res, next, root, apiKey).catch(next)
  })
  app.use('/api/keyword-optimize', (req, res, next) => {
    handleKeywordOptimize(req, res, next, root, apiKey).catch(next)
  })
}

// ─── Plugin export ─────────────────────────────────────────

export function apiMiddlewarePlugin(): Plugin {
  let apiKey = ''

  return {
    name: 'gemini-api-middleware',
    // configResolved fires after Vite has fully loaded .env files.
    // loadEnv with prefix '' returns ALL variables, not just VITE_* ones.
    configResolved(config) {
      const env = loadEnv(config.mode, config.root, '')
      apiKey = env.GEMINI_API_KEY ?? ''
      if (!apiKey) {
        console.warn('[gemini-middleware] GEMINI_API_KEY is not set in .env')
      }
    },
    configureServer(server) {
      registerMiddleware(server.middlewares, server.config.root, apiKey)
    },
    configurePreviewServer(server) {
      registerMiddleware(server.middlewares, server.config.root, apiKey)
    },
  }
}
