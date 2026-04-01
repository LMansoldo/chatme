import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import type { TailoringResult, MatchScore, CVData } from '../types'
import { tailorCV } from '../utils/claudeClient'

function calculateMatchScore(jobDescription: string, cvData: CVData): MatchScore {
  const jd = jobDescription.toLowerCase()

  const allTech = cvData.skills.tech.flatMap(g => g.items)
  const techMatches = allTech.filter(t => jd.includes(t.toLowerCase())).length

  const allComps = cvData.skills.competencies.flatMap(g => g.items)
  const compMatches = allComps.filter(c =>
    c.split(' ').some(w => w.length > 3 && jd.includes(w.toLowerCase()))
  ).length

  const softMatches = cvData.skills.soft_skills.filter(s =>
    s.split(' ').some(w => w.length > 3 && jd.includes(w.toLowerCase()))
  ).length

  const technologies = Math.min(100, Math.round((techMatches / allTech.length) * 100))
  const competencies = Math.min(100, Math.round((compMatches / allComps.length) * 100))
  const soft_skills = Math.min(100, Math.round((softMatches / cvData.skills.soft_skills.length) * 100))
  const total = Math.round((technologies + competencies + soft_skills) / 3)

  return { total, technologies, competencies, soft_skills }
}

export function useTailoring(cvData: CVData) {
  const { i18n } = useTranslation()
  const [result, setResult] = useState<TailoringResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const tailorResume = useCallback(async (jobDescription: string) => {
    if (!jobDescription.trim()) return
    setIsLoading(true)
    setError(null)

    try {
      const raw = await tailorCV(jobDescription, i18n.language)
      const parsed = JSON.parse(raw) as { summary: string; experience: { company: string; highlights: string[] }[] }
      const matchScore = calculateMatchScore(jobDescription, cvData)
      setResult({ ...parsed, matchScore })
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }, [cvData, i18n.language])

  const reset = useCallback(() => {
    setResult(null)
    setError(null)
  }, [])

  return { result, isLoading, error, tailorResume, reset }
}
