import { useState } from 'react'
import { useKeywordOptimizer } from '../../hooks/useKeywordOptimizer'
import { useCV } from '../../hooks/useCV'
import { generateMarkdown } from '../../utils/markdownGenerator'
import { MarkdownEditorModal } from '../ui/MarkdownEditorModal'
import { Button } from '../ui/Button'
import type { KeywordSuggestion } from '../../types'

function applySubstitutions(markdown: string, selected: Set<number>, suggestions: KeywordSuggestion[]): string {
  let result = markdown
  suggestions.forEach((s, i) => {
    if (selected.has(i)) {
      result = result.split(s.cv_term).join(s.jd_term)
    }
  })
  return result
}

export function KeywordOptimizerPanel() {
  const cvData = useCV()
  const { result, isLoading, error, analyze, reset } = useKeywordOptimizer()
  const [jobDescription, setJobDescription] = useState('')
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [editorMarkdown, setEditorMarkdown] = useState<string | null>(null)

  function toggleAll(suggestions: KeywordSuggestion[]) {
    if (selected.size === suggestions.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(suggestions.map((_, i) => i)))
    }
  }

  function toggleOne(index: number) {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  function handleAnalyze() {
    setSelected(new Set())
    analyze(jobDescription)
  }

  function handleApply() {
    if (!result) return
    const base = generateMarkdown(cvData, { summary: true, skills: true, experience: true, education: true })
    const optimized = applySubstitutions(base, selected, result.suggestions)
    setEditorMarkdown(optimized)
  }

  return (
    <div className="tailoring-panel">
      <h2 className="panel-title">Keyword Optimizer</h2>
      <p className="panel-description">
        Paste a job description to find keywords you can swap in your CV for better ATS alignment.
      </p>

      {!result ? (
        <div className="tailoring-input-area">
          <textarea
            className="job-input"
            value={jobDescription}
            onChange={e => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            rows={10}
            disabled={isLoading}
          />
          <Button
            fullWidth
            onClick={handleAnalyze}
            disabled={isLoading || !jobDescription.trim()}
          >
            {isLoading ? (
              <span className="loading-dots">
                Analyzing<span>.</span><span>.</span><span>.</span>
              </span>
            ) : (
              'Analyze keywords'
            )}
          </Button>
          {error && <p className="tailoring-error">⚠ {error}</p>}
        </div>
      ) : (
        <div className="tailoring-result">
          <div className="keyword-optimizer__header">
            <span className="keyword-optimizer__count">
              {result.suggestions.length} suggestions found
            </span>
            <button
              className="keyword-optimizer__toggle-all"
              onClick={() => toggleAll(result.suggestions)}
            >
              {selected.size === result.suggestions.length ? 'Deselect all' : 'Select all'}
            </button>
          </div>

          <ul className="keyword-optimizer__list">
            {result.suggestions.map((s, i) => (
              <li
                key={i}
                className={`keyword-optimizer__item${selected.has(i) ? ' keyword-optimizer__item--selected' : ''}`}
                onClick={() => toggleOne(i)}
              >
                <input
                  type="checkbox"
                  className="keyword-optimizer__checkbox"
                  checked={selected.has(i)}
                  onChange={() => toggleOne(i)}
                  onClick={e => e.stopPropagation()}
                />
                <div className="keyword-optimizer__terms">
                  <span className="keyword-optimizer__cv-term">{s.cv_term}</span>
                  <span className="keyword-optimizer__arrow">→</span>
                  <span className="keyword-optimizer__jd-term">{s.jd_term}</span>
                </div>
                <span className="keyword-optimizer__location">{s.location}</span>
              </li>
            ))}
          </ul>

          <div className="tailoring-actions">
            <Button variant="secondary" onClick={reset}>
              Try another
            </Button>
            <Button onClick={handleApply} disabled={selected.size === 0}>
              Apply & Edit ({selected.size})
            </Button>
          </div>
        </div>
      )}

      {editorMarkdown !== null && (
        <MarkdownEditorModal
          markdown={editorMarkdown}
          filename="lucas-mansoldo-optimized-cv"
          onClose={() => setEditorMarkdown(null)}
        />
      )}
    </div>
  )
}
