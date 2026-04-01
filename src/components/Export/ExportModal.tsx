import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useTranslation } from 'react-i18next'
import type { ExportSection } from '../../types'
import { generateMarkdown, downloadMarkdown } from '../../utils/markdownGenerator'
import { downloadCvPdf } from '../../utils/pdfGenerator'
import { useCV } from '../../hooks/useCV'
import { Button } from '../ui/Button'

export function ExportModal() {
  const { t } = useTranslation()
  const cvData = useCV()

  const SECTION_LABELS: Record<keyof ExportSection, string> = {
    summary: t('export.sections.summary'),
    skills: t('export.sections.skills'),
    experience: t('export.sections.experience'),
    education: t('export.sections.education'),
  }

  const [sections, setSections] = useState<ExportSection>({
    summary: true,
    skills: true,
    experience: true,
    education: true,
  })
  const [preview, setPreview] = useState<string | null>(null)
  const [downloadedMd, setDownloadedMd] = useState(false)
  const [downloadedPdf, setDownloadedPdf] = useState(false)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)

  const toggleSection = (key: keyof ExportSection) => {
    setSections(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handlePreview = () => {
    setPreview(generateMarkdown(cvData, sections))
  }

  const handleDownloadMd = () => {
    downloadMarkdown(generateMarkdown(cvData, sections))
    setDownloadedMd(true)
    setTimeout(() => setDownloadedMd(false), 2000)
  }

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true)
    try {
      await downloadCvPdf(generateMarkdown(cvData, sections))
      setDownloadedPdf(true)
      setTimeout(() => setDownloadedPdf(false), 2000)
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  const pdfButtonLabel = () => {
    if (isGeneratingPdf) return t('export.generatingPdf')
    if (downloadedPdf) return t('export.downloadedPdf')
    return t('export.exportPdf')
  }

  return (
    <div className="export-panel">
      <h2 className="panel-title">{t('export.title')}</h2>
      <p className="panel-description">{t('export.description')}</p>

      <div className="section-checkboxes">
        {(Object.keys(sections) as (keyof ExportSection)[]).map(key => (
          <label key={key} className="checkbox-label">
            <input
              type="checkbox"
              className="checkbox-input"
              checked={sections[key]}
              onChange={() => toggleSection(key)}
            />
            <span className="checkbox-custom" aria-hidden="true" />
            <span className="checkbox-text">{SECTION_LABELS[key]}</span>
          </label>
        ))}
      </div>

      <div className="export-actions">
        <Button variant="secondary" onClick={handlePreview}>
          {t('export.preview')}
        </Button>
        <Button
          variant="secondary"
          onClick={handleDownloadMd}
          icon={downloadedMd ? (
            <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : undefined}
        >
          {downloadedMd ? t('export.downloaded') : t('export.export')}
        </Button>
        <Button
          onClick={handleDownloadPdf}
          disabled={isGeneratingPdf}
          icon={downloadedPdf ? (
            <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : undefined}
        >
          {pdfButtonLabel()}
        </Button>
      </div>

      {preview !== null && (
        <div className="preview-overlay" onClick={() => setPreview(null)}>
          <div className="preview-modal" onClick={e => e.stopPropagation()}>
            <div className="preview-modal-header">
              <h3>{t('export.previewTitle')}</h3>
              <button className="close-btn" onClick={() => setPreview(null)} aria-label="Close preview">
                ✕
              </button>
            </div>
            <div className="preview-content preview-markdown">
              <ReactMarkdown>{preview}</ReactMarkdown>
            </div>
            <div className="preview-modal-footer">
              <Button variant="secondary" onClick={() => { handleDownloadMd(); setPreview(null) }}>
                {t('export.download')}
              </Button>
              <Button onClick={() => { handleDownloadPdf(); setPreview(null) }} disabled={isGeneratingPdf}>
                {t('export.downloadPdf')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
