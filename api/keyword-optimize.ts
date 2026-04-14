import enData from '../src/data.json'
import ptBRData from '../src/data.pt-BR.json'

export const config = { runtime: 'edge' }

const MODEL = 'gemini-3-flash-preview'
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models'

interface RequestBody {
  jobDescription: string
  language: string
}

const SYSTEM_PROMPT = `You are an expert technical recruiter and ATS specialist.

You will receive:
1. A CV in structured sections
2. A job description

The CV experience is composed of bullet-point highlights per role. Skills are grouped into tech stacks, competencies, and soft skills.

Your task: identify semantic gaps that rule-based keyword matching cannot detect, identify terms/phrases used in the job description that could replace similar but differently-worded terms in the CV to improve keyword alignment

Focus on:
- Skills implied by JD but missing from CV (e.g., JD implies team leadership but CV never mentions it)
- Seniority signals: does the CV experience level match the JD seniority?
- Industry/domain context mismatches
- Soft skills mentioned in JD that are absent in CV
- Highlights in experience that should be reworded to match JD language
- Brazilian platforms (Gupy, Vagas): also check if experience highlights use vague language instead of results with metrics

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

  let body: RequestBody
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
          generationConfig: { maxOutputTokens: 8192, temperature: 0.2 },
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
