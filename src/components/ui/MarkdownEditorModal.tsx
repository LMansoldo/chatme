import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useTranslation } from 'react-i18next'
import { downloadMarkdown } from '../../utils/markdownGenerator'
import { downloadCvPdf } from '../../utils/pdfGenerator'
import { Button } from './Button'

interface Props {
  markdown: string
  filename?: string
  onClose: () => void
}

type Tab = 'edit' | 'preview'

export function MarkdownEditorModal({ markdown: initialMarkdown, filename = 'cv', onClose }: Props) {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<Tab>('edit')
  const [edited, setEdited] = useState(initialMarkdown)
  const [downloadedMd, setDownloadedMd] = useState(false)
  const [downloadedPdf, setDownloadedPdf] = useState(false)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)

  const isDirty = edited !== initialMarkdown

  const handleReset = () => setEdited(initialMarkdown)

  const handleDownloadMd = () => {
    downloadMarkdown(edited, `${filename}.md`)
    setDownloadedMd(true)
    setTimeout(() => setDownloadedMd(false), 2000)
  }

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true)
    try {
      await downloadCvPdf(edited, `${filename}.pdf`)
      setDownloadedPdf(true)
      setTimeout(() => setDownloadedPdf(false), 2000)
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  return (
    <div className="preview-overlay" onClick={onClose}>
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
          <button className="close-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="preview-modal-body">
          {activeTab === 'edit' ? (
            <textarea
              className="md-editor"
              value={edited}
              onChange={e => setEdited(e.target.value)}
              spellCheck={false}
              aria-label="Markdown editor"
            />
          ) : (
            <div className="preview-content preview-markdown">
              <ReactMarkdown>{edited}</ReactMarkdown>
            </div>
          )}
        </div>

        <div className="preview-modal-footer">
          <button
            className="preview-reset-btn"
            onClick={handleReset}
            disabled={!isDirty}
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
  )
}

function CheckIcon() {
  return (
    <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
