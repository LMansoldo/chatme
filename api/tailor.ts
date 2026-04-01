import enData from '../src/data.json'
import ptBRData from '../src/data.pt-BR.json'

export const config = { runtime: 'edge' }

const MODEL = 'gemini-2.0-flash'
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models'

interface TailorRequestBody {
  jobDescription: string
  language: string
}

const SYSTEM_PROMPT = `You are a professional resume writer. Given a job description and a candidate's CV data, \
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

function getCVData(lang: string): object {
  return lang === 'pt-BR' ? ptBRData : enData
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

  let body: TailorRequestBody
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 })
  }

  if (!body.jobDescription?.trim()) {
    return new Response(JSON.stringify({ error: 'jobDescription required' }), { status: 400 })
  }

  const cvData = getCVData(body.language ?? 'en')

  let upstream: Response
  try {
    upstream = await fetch(
      `${BASE_URL}/${MODEL}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{
            role: 'user',
            parts: [{ text: `Job Description:\n${body.jobDescription}\n\nCV Data:\n${JSON.stringify(cvData, null, 2)}` }],
          }],
          generationConfig: { maxOutputTokens: 2048 },
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

  const data = await upstream.json() as {
    candidates?: { content?: { parts?: { text?: string }[] } }[]
  }
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) {
    return new Response(JSON.stringify({ error: 'Empty response from Gemini' }), { status: 502 })
  }

  return new Response(JSON.stringify({ text }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
