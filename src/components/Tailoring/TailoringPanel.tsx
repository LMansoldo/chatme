import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTailoring } from '../../hooks/useTailoring'
import { MatchScore } from './MatchScore'
import { generateMarkdown, downloadMarkdown } from '../../utils/markdownGenerator'
import { downloadCvPdf } from '../../utils/pdfGenerator'
import { useCV } from '../../hooks/useCV'
import { Button } from '../ui/Button'

export function TailoringPanel() {
  const { t } = useTranslation()
  const cvData = useCV()
  const [jobDescription, setJobDescription] = useState('')
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const { result, isLoading, error, tailorResume, reset } = useTailoring(cvData)

  const getTailoredMd = () => generateMarkdown(
    cvData,
    { summary: true, skills: true, experience: true, education: true },
    result ?? undefined
  )

  const handleExportMd = () => {
    if (!result) return
    downloadMarkdown(getTailoredMd(), 'lucas-mansoldo-tailored-cv.md')
  }

  const handleExportPdf = async () => {
    if (!result) return
    setIsGeneratingPdf(true)
    try {
      await downloadCvPdf(getTailoredMd(), 'lucas-mansoldo-tailored-cv.pdf')
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  return (
    <div className="tailoring-panel">
      <h2 className="panel-title">{t('tailoring.title')}</h2>
      <p className="panel-description">{t('tailoring.description')}</p>

      {!result ? (
        <div className="tailoring-input-area">
          <textarea
            className="job-input"
            value={jobDescription}
            onChange={e => setJobDescription(e.target.value)}
            placeholder={t('tailoring.placeholder')}
            rows={10}
            disabled={isLoading}
          />
          <Button
            fullWidth
            onClick={() => tailorResume(jobDescription)}
            disabled={isLoading || !jobDescription.trim()}
          >
            {isLoading ? (
              <span className="loading-dots">
                {t('tailoring.tailoring')}<span>.</span><span>.</span><span>.</span>
              </span>
            ) : (
              t('tailoring.tailor')
            )}
          </Button>
          {error && <p className="tailoring-error">⚠ {error}</p>}
        </div>
      ) : (
        <div className="tailoring-result">
          <MatchScore score={result.matchScore} />

          <div className="tailored-section">
            <h3 className="tailored-section-title">{t('tailoring.tailoredSummary')}</h3>
            <p className="tailored-summary">{result.summary}</p>
          </div>

          <div className="tailored-section">
            <h3 className="tailored-section-title">{t('tailoring.tailoredHighlights')}</h3>
            {result.experience.map(exp => (
              <div key={exp.company} className="tailored-exp">
                <h4 className="tailored-exp-company">{exp.company}</h4>
                <ul className="tailored-highlights">
                  {exp.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="tailoring-actions">
            <Button variant="secondary" onClick={reset}>
              {t('tailoring.tryAnother')}
            </Button>
            <Button variant="secondary" onClick={handleExportMd}>
              {t('tailoring.exportTailored')} .md
            </Button>
            <Button onClick={handleExportPdf} disabled={isGeneratingPdf}>
              {isGeneratingPdf ? t('export.generatingPdf') : `${t('tailoring.exportTailored')} .pdf`}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
