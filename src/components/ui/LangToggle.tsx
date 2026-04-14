import { useTranslation } from 'react-i18next'

export function LangToggle() {
  const { i18n } = useTranslation()
  const isBR = i18n.language === 'pt-BR'

  return (
    <button
      className="lang-toggle"
      onClick={() => i18n.changeLanguage(isBR ? 'en' : 'pt-BR')}
      aria-label={isBR ? 'Switch to English' : 'Mudar para Português'}
      title={isBR ? 'Switch to English' : 'Mudar para Português'}
    >
      <span className={`lang-toggle-opt ${!isBR ? 'lang-toggle-opt--active' : ''}`}>EN</span>
      <span className="lang-toggle-sep">/</span>
      <span className={`lang-toggle-opt ${isBR ? 'lang-toggle-opt--active' : ''}`}>PT</span>
    </button>
  )
}
