import { useTranslation } from 'react-i18next'
import { MagicBento } from '../ui/MagicBento'
import { useCV } from '../../hooks/useCV'
import { SKILL_LABEL_TO_CSS_VAR } from '../../themes'

export function SkillsSection() {
  const { t } = useTranslation()
  const { skills } = useCV()

  function skillColor(label: string): string {
    const cssVar = SKILL_LABEL_TO_CSS_VAR[label]
    return cssVar ? `var(${cssVar})` : 'var(--accent)'
  }

  return (
    <section id="skills" className="section">
      <div className="section-header">
        <h2 className="section-title">{t('skills.title')}</h2>
        <p className="section-desc">{t('skills.description')}</p>
      </div>

      <div className="skills-grid">
        {skills.tech.map(group => (
          <MagicBento key={group.label} className="skill-bento" enableSpotlight enableBorderGlow>
            <div className="skill-bento-label" style={{ color: skillColor(group.label) }}>
              {group.label}
            </div>
            <div className="skill-tags">
              {group.items.map(item => (
                <span key={item} className="skill-tag">{item}</span>
              ))}
            </div>
          </MagicBento>
        ))}

        <MagicBento className="skill-bento skill-bento--wide" enableSpotlight enableBorderGlow>
          <div className="skill-bento-label" style={{ color: 'var(--accent)' }}>
            {t('skills.softSkills')}
          </div>
          <div className="skill-tags">
            {skills.soft_skills.map(s => (
              <span key={s} className="skill-tag skill-tag--soft">{s}</span>
            ))}
          </div>
        </MagicBento>

        {skills.competencies.map(group => (
          <MagicBento key={group.label} className="skill-bento" enableSpotlight enableBorderGlow>
            <div className="skill-bento-label" style={{ color: skillColor(group.label) }}>
              {group.label}
            </div>
            <ul className="skill-list">
              {group.items.map(item => (
                <li key={item} className="skill-list-item">{item}</li>
              ))}
            </ul>
          </MagicBento>
        ))}
      </div>
    </section>
  )
}
