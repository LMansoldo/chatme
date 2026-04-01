import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import type { KeywordOptimizerResult } from '../types'
import { optimizeKeywords } from '../utils/claudeClient'

/** Strips markdown code fences if the model wraps JSON in ```json ... ``` */
function stripCodeFences(raw: string): string {
  return raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim()
}

/**
 * Attempts to recover a truncated JSON object of the shape { suggestions: [...] }.
 * Finds all complete suggestion objects (each ending with `}`) and rebuilds the envelope.
 */
function recoverTruncatedJSON(raw: string): KeywordOptimizerResult {
  // Grab everything inside the suggestions array, even if cut off
  const arrayStart = raw.indexOf('[')
  if (arrayStart === -1) throw new Error('No JSON array found in response')

  const partial = raw.slice(arrayStart)

  // Collect all complete objects: find each `}` and try to parse up to it
  const suggestions: KeywordOptimizerResult['suggestions'] = []
  let searchFrom = 0

  while (true) {
    const objStart = partial.indexOf('{', searchFrom)
    if (objStart === -1) break

    let depth = 0
    let objEnd = -1
    for (let i = objStart; i < partial.length; i++) {
      if (partial[i] === '{') depth++
      else if (partial[i] === '}') {
        depth--
        if (depth === 0) { objEnd = i; break }
      }
    }

    if (objEnd === -1) break // incomplete object — stop

    try {
      const obj = JSON.parse(partial.slice(objStart, objEnd + 1)) as {
        cv_term?: string; jd_term?: string; location?: string
      }
      if (obj.cv_term && obj.jd_term && obj.location) {
        suggestions.push({ cv_term: obj.cv_term, jd_term: obj.jd_term, location: obj.location })
      }
    } catch {
      // malformed object — skip
    }

    searchFrom = objEnd + 1
  }

  if (suggestions.length === 0) throw new Error('Could not extract any suggestions from response')
  return { suggestions }
}

function parseResponse(raw: string): KeywordOptimizerResult {
  const cleaned = stripCodeFences(raw)
  try {
    return JSON.parse(cleaned) as KeywordOptimizerResult
  } catch {
    return recoverTruncatedJSON(cleaned)
  }
}

export function useKeywordOptimizer() {
  const { i18n } = useTranslation()
  const [result, setResult] = useState<KeywordOptimizerResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const analyze = useCallback(async (jobDescription: string) => {
    if (!jobDescription.trim()) return
    setIsLoading(true)
    setError(null)

    try {
      const raw = await optimizeKeywords(jobDescription, i18n.language)
      setResult(parseResponse(raw))
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }, [i18n.language])

  const reset = useCallback(() => {
    setResult(null)
    setError(null)
  }, [])

  return { result, isLoading, error, analyze, reset }
}
