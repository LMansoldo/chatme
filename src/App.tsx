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
import { KeywordOptimizerPanel } from './components/KeywordOptimizer/KeywordOptimizerPanel'
import { PinModal } from './components/ui/PinModal'
import { useAuth } from './hooks/useAuth'
import './styles/global.css'
import './styles/chat.css'
import './styles/export.css'
import './styles/tailoring.css'
import './styles/portfolio.css'

type Modal = 'export' | 'tailoring' | 'keyword' | 'pin' | null

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

function KeyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function App() {
  const { t } = useTranslation()
  const [modal, setModal] = useState<Modal>(null)
  const { isAuthenticated, authenticate } = useAuth()

  const baseDockItems = [
    { icon: <HomeIcon />, label: t('nav.home'), onClick: () => scrollTo('hero') },
    { icon: <BriefcaseIcon />, label: t('nav.experience'), onClick: () => scrollTo('experience') },
    { icon: <FileTextIcon />, label: t('nav.exportCV'), onClick: () => setModal('export') },
  ]

  const authDockItems = isAuthenticated
    ? [
        { icon: <TargetIcon />, label: t('nav.tailorCV'), onClick: () => setModal('tailoring') },
        { icon: <KeyIcon />, label: 'Keywords', onClick: () => setModal('keyword') },
        { icon: <LangToggle />, label: '', onClick: () => {}, isRaw: true },
        { icon: <ThemeToggle />, label: '', onClick: () => {}, isRaw: true },
      ]
    : [
        { icon: <LangToggle />, label: '', onClick: () => {}, isRaw: true },
        { icon: <LockIcon />, label: 'Admin', onClick: () => setModal('pin') },
      ]

  const dockItems = [...baseDockItems, ...authDockItems]

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
            <ExportModal isAuthenticated={isAuthenticated} />
          </div>
        </div>
      )}

      {modal === 'tailoring' && isAuthenticated && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal-panel modal-panel--wide" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModal(null)} aria-label="Close">✕</button>
            <TailoringPanel />
          </div>
        </div>
      )}

      {modal === 'keyword' && isAuthenticated && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal-panel modal-panel--wide" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModal(null)} aria-label="Close">✕</button>
            <KeywordOptimizerPanel />
          </div>
        </div>
      )}

      {modal === 'pin' && (
        <PinModal
          onSubmit={pin => {
            const ok = authenticate(pin)
            if (ok) setModal(null)
            return ok
          }}
          onClose={() => setModal(null)}
        />
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
