import cvData from '../../data.json'
import '../../styles/sidebar.css'

const CATEGORY_LABELS: Record<string, string> = {
  architecture: 'arch',
  ui: 'ui',
  integration: 'int',
  data: 'data',
  devops: 'ops',
}

export function CVSidebar() {
  const { personal_info, objective, summary, skills, experience } = cvData

  return (
    <aside className="cv-sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-name">{personal_info.name}</h1>
        <p className="sidebar-role">{objective.role}</p>
      </div>

      <div className="sidebar-contact">
        <span className="contact-item">{personal_info.location}</span>
        <a className="contact-item contact-link" href={`mailto:${personal_info.email}`}>
          {personal_info.email}
        </a>
        <span className="contact-item">{personal_info.phone}</span>
        <a
          className="contact-item contact-link"
          href={personal_info.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn ↗
        </a>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-section-title">Focus</h3>
        <div className="tags">
          {summary.focus_areas.map(area => (
            <span key={area} className="tag tag--accent">
              {area}
            </span>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-section-title">Stack</h3>
        <div className="tags">
          {objective.main_stack.map(s => (
            <span key={s} className="tag tag--highlight">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-section-title">Skills</h3>
        <div className="skill-groups">
          {skills.tech.map(group => (
            <div key={group.label} className="skill-group">
              <span className="skill-group-label">{group.label}</span>
              <div className="tags">
                {group.items.map(item => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-section-title">Competencies</h3>
        <div className="skill-groups">
          {skills.competencies.map(group => (
            <div key={group.label} className="skill-group">
              <span className="skill-group-label">{group.label}</span>
              <ul className="competency-list">
                {group.items.map(item => (
                  <li key={item} className="competency-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-section-title">Experience</h3>
        <div className="exp-cards">
          {experience.map((exp, i) => (
            <div
              key={exp.company}
              className="exp-card"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <span className="exp-role">{exp.role}</span>
              <span className="exp-company">{exp.company}</span>
              <span className="exp-period">{exp.period}</span>
              <div className="exp-categories">
                {[...new Set(exp.highlights.map(h => h.category))].map(cat => (
                  <span key={cat} className={`cat-badge cat-badge--${cat}`}>
                    {CATEGORY_LABELS[cat]}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
