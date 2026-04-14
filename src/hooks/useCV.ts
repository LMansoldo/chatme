import { useTranslation } from 'react-i18next'
import enData from '../data.json'
import ptBRData from '../data.pt-BR.json'
import type { CVData } from '../types'

export function useCV(): CVData {
  const { i18n } = useTranslation()
  return i18n.language === 'pt-BR' ? (ptBRData as CVData) : (enData as CVData)
}
