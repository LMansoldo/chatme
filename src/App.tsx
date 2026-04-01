import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dock } from './components/ui/Dock'
import { LangToggle } from './components/ui/LangToggle'
import { ThemeToggle } from './components/ui/ThemeToggle'
import { ThemeProvider } from './themes/ThemeProvider'
import { HeroSection } from './components/sections/HeroSection'
import { ChatSection } from './components/sections/ChatSection'
import { ExperienceSection } from './components/sections/ExperienceSection'
import { ExportModal } from './components/Export/ExportModal'
import { TailoringPanel } from './components/Tailoring/TailoringPanel'
import './styles/global.css'
import './styles/chat.css'
import './styles/export.css'
import './styles/tailoring.css'
import './styles/portfolio.css'

type Modal = 'export' | 'tailoring' | null

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function BriefcaseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  )
}

function FileTextIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  )
}

function TargetIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function App() {
  const { t } = useTranslation()
  const [modal, setModal] = useState<Modal>(null)

  const dockItems = [
    { icon: <HomeIcon />, label: t('nav.home'), onClick: () => scrollTo('hero') },
    { icon: <BriefcaseIcon />, label: t('nav.experience'), onClick: () => scrollTo('experience') },
    { icon: <FileTextIcon />, label: t('nav.exportCV'), onClick: () => setModal('export') },
    { icon: <TargetIcon />, label: t('nav.tailorCV'), onClick: () => setModal('tailoring') },
    { icon: <LangToggle />, label: '', onClick: () => {}, isRaw: true },
    { icon: <ThemeToggle />, label: '', onClick: () => {}, isRaw: true },
  ]

  return (
    <div className="portfolio">
      <main className="portfolio-main">
        <HeroSection />
        <ChatSection />
        <ExperienceSection />
      </main>

      <Dock items={dockItems} magnification={52} />

      {modal === 'export' && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal-panel" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModal(null)} aria-label="Close">✕</button>
            <ExportModal />
          </div>
        </div>
      )}

      {modal === 'tailoring' && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal-panel modal-panel--wide" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModal(null)} aria-label="Close">✕</button>
            <TailoringPanel />
          </div>
        </div>
      )}
    </div>
  )
}

export default function Root() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  )
}
