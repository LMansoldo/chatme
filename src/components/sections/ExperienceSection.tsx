import { useTranslation } from 'react-i18next'
import { MagicBento } from '../ui/MagicBento'
import { useCV } from '../../hooks/useCV'

const CATEGORY_LABELS: Record<string, string> = {
  architecture: 'arch',
  ui: 'ui',
  integration: 'int',
  data: 'data',
  devops: 'ops',
}

export function ExperienceSection() {
  const { t } = useTranslation()
  const { experience, education } = useCV()

  return (
    <section id="experience" className="section">
      <div className="section-header">
        <h2 className="section-title">{t('experience.title')}</h2>
        <p className="section-desc">{t('experience.description')}</p>
      </div>

      <div className="experience-grid">
        {experience.map((exp, i) => (
          <MagicBento
            key={exp.company}
            className="exp-bento"
            enableSpotlight
            enableBorderGlow
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="exp-bento-header">
              <div>
                <h3 className="exp-bento-role">{exp.role}</h3>
                <p className="exp-bento-company">{exp.company}</p>
              </div>
              <div className="exp-bento-meta">
                <span className="exp-bento-period">{exp.period}</span>
                <span className="exp-bento-location">{exp.location}</span>
              </div>
            </div>

            <ul className="exp-bento-highlights">
              {exp.highlights.map((h, j) => (
                <li key={j} className="exp-bento-highlight">
                  <span className={`exp-bento-dot exp-bento-dot--${h.category}`} />
                  {h.text}
                </li>
              ))}
            </ul>

            <div className="exp-bento-cats">
              {[...new Set(exp.highlights.map(h => h.category))].map(cat => (
                <span key={cat} className={`exp-cat-badge exp-cat-badge--${cat}`}>
                  {CATEGORY_LABELS[cat]}
                </span>
              ))}
            </div>
          </MagicBento>
        ))}

        <MagicBento className="edu-bento" enableSpotlight enableBorderGlow>
          <div className="edu-icon" aria-hidden="true">🎓</div>
          <h3 className="edu-degree">{education.degree}</h3>
          <p className="edu-institution">{education.institution}</p>
          <p className="edu-graduation">{t('experience.graduatedIn')} {education.graduation}</p>
        </MagicBento>
      </div>
    </section>
  )
}
