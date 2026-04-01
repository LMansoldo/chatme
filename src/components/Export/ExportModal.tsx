import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { ExportSection } from '../../types'
import { generateMarkdown, downloadMarkdown } from '../../utils/markdownGenerator'
import { downloadCvPdf } from '../../utils/pdfGenerator'
import { useCV } from '../../hooks/useCV'
import { Button } from '../ui/Button'
import { MarkdownEditorModal } from '../ui/MarkdownEditorModal'

export function ExportModal({ isAuthenticated }: { isAuthenticated: boolean }) {
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
  const [editorMarkdown, setEditorMarkdown] = useState<string | null>(null)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)

  const toggleSection = (key: keyof ExportSection) => {
    setSections(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const getMarkdown = () => generateMarkdown(cvData, sections)

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
        {isAuthenticated && (
          <Button variant="secondary" onClick={() => setEditorMarkdown(getMarkdown())}>
            {t('export.preview')}
          </Button>
        )}
        <Button variant="secondary" onClick={() => downloadMarkdown(getMarkdown())}>
          {t('export.export')}
        </Button>
        <Button
          onClick={async () => {
            setIsGeneratingPdf(true)
            try { await downloadCvPdf(getMarkdown()) }
            finally { setIsGeneratingPdf(false) }
          }}
          disabled={isGeneratingPdf}
        >
          {isGeneratingPdf ? t('export.generatingPdf') : t('export.exportPdf')}
        </Button>
      </div>

      {editorMarkdown !== null && (
        <MarkdownEditorModal
          markdown={editorMarkdown}
          filename="lucas-mansoldo-cv"
          onClose={() => setEditorMarkdown(null)}
        />
      )}
    </div>
  )
}
