import type { CVData, ExportSection, TailoredHighlight } from '../types'

export function generateMarkdown(
  data: CVData,
  sections: ExportSection,
  tailored?: { summary?: string; experience?: TailoredHighlight[] }
): string {
  const lines: string[] = []
  const { personal_info, objective, summary, skills, experience, education } = data

  lines.push(`# ${personal_info.name}`)
  lines.push(`**${objective.role}**`)
  lines.push('')
  lines.push(
    `📍 ${personal_info.location} · 📧 ${personal_info.email} · 📞 ${personal_info.phone}`
  )
  lines.push(`🔗 [LinkedIn](${personal_info.linkedin})`)
  lines.push('')

  if (sections.summary) {
    lines.push('## Summary')
    lines.push('')
    if (tailored?.summary) {
      lines.push(tailored.summary)
    } else {
      lines.push(summary.headline)
      lines.push('')
      lines.push(summary.tagline)
      lines.push('')
      lines.push(`**Focus areas:** ${summary.focus_areas.join(' · ')}`)
    }
    lines.push('')
  }

  if (sections.skills) {
    lines.push('## Skills')
    lines.push('')
    skills.tech.forEach(group => {
      lines.push(`**${group.label}:** ${group.items.join(', ')}`)
    })
    lines.push('')
    skills.competencies.forEach(group => {
      lines.push(`**${group.label}:** ${group.items.join(', ')}`)
    })
    lines.push('')
    lines.push(`**Soft Skills:** ${skills.soft_skills.join(', ')}`)
    lines.push('')
  }

  if (sections.experience) {
    lines.push('## Experience')
    lines.push('')
    experience.forEach(exp => {
      lines.push(`### ${exp.role} — ${exp.company}`)
      lines.push(`*${exp.location} · ${exp.period}*`)
      lines.push('')
      const tailoredExp = tailored?.experience?.find(t => t.company === exp.company)
      if (tailoredExp) {
        tailoredExp.highlights.forEach(h => lines.push(`- ${h}`))
      } else {
        exp.highlights.forEach(h => lines.push(`- ${h.text}`))
      }
      lines.push('')
    })
  }

  if (sections.education) {
    lines.push('## Education')
    lines.push('')
    lines.push(`**${education.degree}**`)
    lines.push(`${education.institution} · ${education.graduation}`)
    lines.push('')
  }

  return lines.join('\n')
}

export function downloadMarkdown(content: string, filename = 'lucas-mansoldo-cv.md'): void {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
