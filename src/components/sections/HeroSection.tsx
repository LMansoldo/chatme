import { useTranslation } from 'react-i18next'
import { LetterGlitch } from '../ui/LetterGlitch'
import { ProfileCard } from '../ui/ProfileCard'
import { GlassIcons } from '../ui/GlassIcons'
import { LogoLoop } from '../ui/LogoLoop'
import { GlitchText } from '../ui/GlitchText'
import { useCV } from '../../hooks/useCV'
import { TECH_COLORS } from '../../themes'
import { useTheme } from '../../themes/ThemeProvider'

function TechSvg({ name }: { name: string }) {
  const color = TECH_COLORS[name] ?? '#6b9e6e'
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="10" fill={`${color}22`} stroke={color} strokeWidth="1.5" />
      <text x="11" y="15" textAnchor="middle" fill={color} fontSize="10" fontWeight="700" fontFamily="monospace">
        {name[0]}
      </text>
    </svg>
  )
}

export function HeroSection() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const cvData = useCV()
  const { personal_info, objective, summary, experience } = cvData

  const glassItems = objective.main_stack.map(tech => ({
    icon: <TechSvg name={tech} />,
    label: tech,
    color: TECH_COLORS[tech] ?? '#6b9e6e',
  }))

  const loopItems = [
    ...experience.map(exp => ({ label: exp.company })),
    ...objective.main_stack.map(t => ({ label: t })),
  ]

  return (
    <section id="hero" className="hero-section">
      <LetterGlitch
        glitchColors={theme.glitchColors}
        outerVignette
        centerVignette
      />

      <div className="hero-content">
        <div className="hero-greeting">
          <p className="hero-greeting-label">{t('hero.greeting')}</p>
          <h1 className="hero-title">
            <GlitchText speed={1.2} enableShadows>
              Lucas Mansoldo
            </GlitchText>
          </h1>
          <p className="hero-tagline">{summary.tagline}</p>
        </div>

        <div className="hero-card-wrap">
          <ProfileCard
            name={personal_info.name}
            title={objective.role}
            location={personal_info.location}
            email={personal_info.email}
            linkedin={personal_info.linkedin}
            tagline={summary.headline}
          />
        </div>

        <div className="hero-stack">
          <p className="hero-stack-label">
            <GlitchText speed={1.2} enableShadows>
              {t('hero.mainStack')}
            </GlitchText>
          </p>
          <GlassIcons items={glassItems} columns={3} />
        </div>
      </div>

      <div className="hero-loop">
        <LogoLoop
          items={loopItems}
          direction="left"
          speed={60}
          fadeOut
          scaleOnHover
        />
      </div>
    </section>
  )
}
