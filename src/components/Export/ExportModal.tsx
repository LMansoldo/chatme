import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useTranslation } from 'react-i18next'
import type { ExportSection } from '../../types'
import { generateMarkdown, downloadMarkdown } from '../../utils/markdownGenerator'
import { downloadCvPdf } from '../../utils/pdfGenerator'
import { useCV } from '../../hooks/useCV'
import { Button } from '../ui/Button'

type PreviewTab = 'edit' | 'preview'

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
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<PreviewTab>('edit')
  const [editedMarkdown, setEditedMarkdown] = useState('')
  const [originalMarkdown, setOriginalMarkdown] = useState('')
  const [downloadedMd, setDownloadedMd] = useState(false)
  const [downloadedPdf, setDownloadedPdf] = useState(false)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)

  const toggleSection = (key: keyof ExportSection) => {
    setSections(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleOpenPreview = () => {
    const md = generateMarkdown(cvData, sections)
    setOriginalMarkdown(md)
    setEditedMarkdown(md)
    setActiveTab('edit')
    setIsPreviewOpen(true)
  }

  const handleReset = () => {
    setEditedMarkdown(originalMarkdown)
  }

  const handleDownloadMd = () => {
    downloadMarkdown(editedMarkdown)
    setDownloadedMd(true)
    setTimeout(() => setDownloadedMd(false), 2000)
  }

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true)
    try {
      await downloadCvPdf(editedMarkdown)
      setDownloadedPdf(true)
      setTimeout(() => setDownloadedPdf(false), 2000)
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  const isDirty = editedMarkdown !== originalMarkdown

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
        <Button variant="secondary" onClick={handleOpenPreview}>
          {t('export.preview')}
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            downloadMarkdown(generateMarkdown(cvData, sections))
          }}
        >
          {t('export.export')}
        </Button>
        <Button
          onClick={async () => {
            setIsGeneratingPdf(true)
            try { await downloadCvPdf(generateMarkdown(cvData, sections)) }
            finally { setIsGeneratingPdf(false) }
          }}
          disabled={isGeneratingPdf}
        >
          {isGeneratingPdf ? t('export.generatingPdf') : t('export.exportPdf')}
        </Button>
      </div>

      {isPreviewOpen && (
        <div className="preview-overlay" onClick={() => setIsPreviewOpen(false)}>
          <div className="preview-modal preview-modal--editor" onClick={e => e.stopPropagation()}>

            <div className="preview-modal-header">
              <div className="preview-modal-tabs">
                <button
                  className={`preview-tab-btn${activeTab === 'edit' ? ' preview-tab-btn--active' : ''}`}
                  onClick={() => setActiveTab('edit')}
                >
                  {t('export.tabEdit')}
                </button>
                <button
                  className={`preview-tab-btn${activeTab === 'preview' ? ' preview-tab-btn--active' : ''}`}
                  onClick={() => setActiveTab('preview')}
                >
                  {t('export.tabPreview')}
                </button>
                {isDirty && (
                  <span className="preview-dirty-badge">{t('export.edited')}</span>
                )}
              </div>
              <button
                className="close-btn"
                onClick={() => setIsPreviewOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="preview-modal-body">
              {activeTab === 'edit' ? (
                <textarea
                  className="md-editor"
                  value={editedMarkdown}
                  onChange={e => setEditedMarkdown(e.target.value)}
                  spellCheck={false}
                  aria-label="Markdown editor"
                />
              ) : (
                <div className="preview-content preview-markdown">
                  <ReactMarkdown>{editedMarkdown}</ReactMarkdown>
                </div>
              )}
            </div>

            <div className="preview-modal-footer">
              <button
                className="preview-reset-btn"
                onClick={handleReset}
                disabled={!isDirty}
                title={t('export.reset')}
              >
                {t('export.reset')}
              </button>
              <div className="preview-modal-footer-actions">
                <Button
                  variant="secondary"
                  onClick={handleDownloadMd}
                  icon={downloadedMd ? <CheckIcon /> : undefined}
                >
                  {downloadedMd ? t('export.downloaded') : t('export.download')}
                </Button>
                <Button
                  onClick={handleDownloadPdf}
                  disabled={isGeneratingPdf}
                  icon={downloadedPdf ? <CheckIcon /> : undefined}
                >
                  {isGeneratingPdf
                    ? t('export.generatingPdf')
                    : downloadedPdf
                    ? t('export.downloadedPdf')
                    : t('export.downloadPdf')}
                </Button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

function CheckIcon() {
  return (
    <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
