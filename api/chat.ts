import enData from '../src/data.json'
import ptBRData from '../src/data.pt-BR.json'

export const config = { runtime: 'edge' }

const MODEL = 'gemini-3-flash-preview'
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models'

interface ChatRequestBody {
  messages: { role: string; content: string }[]
  language: string
}

interface GeminiContent {
  role: 'user' | 'model'
  parts: { text: string }[]
}

function getCVData(lang: string): object {
  return lang === 'pt-BR' ? ptBRData : enData
}

function buildSystemPrompt(cvData: object): string {
  return `You are an intelligent assistant for Lucas Mansoldo de Andrade's interactive CV. \
You have access to his complete career data below. Answer questions ONLY based on the information \
provided in the JSON. Do not invent or extrapolate details not present in the data. \
Respond in the same language the user writes in (Portuguese or English).

CV Data:
${JSON.stringify(cvData, null, 2)}`
}

function toGeminiMessages(messages: { role: string; content: string }[]): GeminiContent[] {
  return messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'GEMINI_API_KEY not set' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let body: ChatRequestBody
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 })
  }

  if (!Array.isArray(body.messages)) {
    return new Response(JSON.stringify({ error: 'messages array required' }), { status: 400 })
  }

  const cvData = getCVData(body.language ?? 'en')

  let upstream: Response
  try {
    upstream = await fetch(
      `${BASE_URL}/${MODEL}:streamGenerateContent?key=${apiKey}&alt=sse`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: buildSystemPrompt(cvData) }] },
          contents: toGeminiMessages(body.messages),
          generationConfig: { maxOutputTokens: 1024 },
        }),
      }
    )
  } catch (err) {
    return new Response(JSON.stringify({ error: `Upstream fetch failed: ${(err as Error).message}` }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (!upstream.ok) {
    const errorText = await upstream.text()
    return new Response(JSON.stringify({ error: `Upstream error ${upstream.status}: ${errorText}` }), {
      status: upstream.status,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response(upstream.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'X-Accel-Buffering': 'no',
    },
  })
}
