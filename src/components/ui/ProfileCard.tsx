import { useRef, useState } from 'react'

interface ProfileCardProps {
  name: string
  title: string
  location?: string
  email?: string
  linkedin?: string
  avatarUrl?: string
  tagline?: string
}

export function ProfileCard({
  name,
  title,
  location,
  email,
  linkedin,
  avatarUrl,
  tagline,
}: ProfileCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glowing, setGlowing] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * 12, y: -x * 12 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setGlowing(false)
  }

  const initials = name
    .split(' ')
    .slice(0, 2)
    .map(p => p[0])
    .join('')

  return (
    <div
      ref={cardRef}
      className="profile-card"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setGlowing(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.5s ease' : 'transform 0.1s ease',
        '--glow-opacity': glowing ? '1' : '0',
      } as React.CSSProperties}
    >
      <div className="profile-card-glow" aria-hidden="true" />

      <div className="profile-avatar">
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} />
        ) : (
          <span className="profile-avatar-initials">{initials}</span>
        )}
        <span className="profile-avatar-status" aria-label="Available" />
      </div>

      <div className="profile-info">
        <h2 className="profile-name">{name}</h2>
        <p className="profile-title">{title}</p>
        {tagline && <p className="profile-tagline">{tagline}</p>}

        <div className="profile-meta">
          {location && (
            <span className="profile-meta-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {location}
            </span>
          )}
          {email && (
            <a className="profile-meta-item profile-meta-link" href={`mailto:${email}`}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              {email}
            </a>
          )}
          {linkedin && (
            <a className="profile-meta-item profile-meta-link" href={linkedin} target="_blank" rel="noreferrer">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn ↗
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
