export interface PersonalInfo {
  name: string
  location: string
  email: string
  phone: string
  linkedin: string
}

export interface Objective {
  role: string
  main_stack: string[]
}

export interface Summary {
  headline: string
  focus_areas: string[]
  tagline: string
}

export interface SkillGroup {
  label: string
  items: string[]
}

export interface Skills {
  tech: SkillGroup[]
  competencies: SkillGroup[]
  soft_skills: string[]
}

export type HighlightCategory = 'architecture' | 'ui' | 'integration' | 'data' | 'devops'

export interface Highlight {
  text: string
  category: HighlightCategory
}

export interface Experience {
  role: string
  company: string
  location: string
  period: string
  highlights: Highlight[]
}

export interface Education {
  degree: string
  institution: string
  graduation: string
}

export interface CVData {
  personal_info: PersonalInfo
  objective: Objective
  summary: Summary
  skills: Skills
  experience: Experience[]
  education: Education
}

export type MessageRole = 'user' | 'assistant'

export interface Message {
  id: string
  role: MessageRole
  content: string
  timestamp: number
}

export interface ExportSection {
  summary: boolean
  skills: boolean
  experience: boolean
  education: boolean
}

export interface MatchScore {
  total: number
  technologies: number
  competencies: number
  soft_skills: number
}

export interface TailoredHighlight {
  company: string
  highlights: string[]
}

export interface TailoringResult {
  summary: string
  experience: TailoredHighlight[]
  matchScore: MatchScore
}
