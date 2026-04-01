import { useTranslation } from 'react-i18next'
import type { MatchScore } from '../../types'

interface Props {
  score: MatchScore
}

export function MatchScore({ score }: Props) {
  const { t } = useTranslation()

  const BARS = [
    { key: 'technologies' as const, label: t('tailoring.bars.technologies'), cssVar: '--match-technologies' },
    { key: 'competencies' as const, label: t('tailoring.bars.competencies'), cssVar: '--match-competencies' },
    { key: 'soft_skills' as const, label: t('tailoring.bars.soft_skills'), cssVar: '--match-soft-skills' },
  ]

  return (
    <div className="match-score">
      <div className="match-total">
        <span className="match-number">{score.total}</span>
        <span className="match-pct">%</span>
        <span className="match-label">{t('tailoring.matchScore')}</span>
      </div>
      <div className="match-bars">
        {BARS.map(bar => (
          <div key={bar.key} className="match-bar-item">
            <div className="match-bar-header">
              <span>{bar.label}</span>
              <span>{score[bar.key]}%</span>
            </div>
            <div className="match-bar-track">
              <div
                className="match-bar-fill"
                style={{ width: `${score[bar.key]}%`, backgroundColor: `var(${bar.cssVar})` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
