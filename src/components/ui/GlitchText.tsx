import './GlitchText.css'

interface GlitchTextProps {
  children: string
  speed?: number
  enableShadows?: boolean
  enableOnHover?: boolean
  className?: string
}

export function GlitchText({
  children,
  speed = 0.5,
  enableShadows = true,
  enableOnHover = false,
  className = '',
}: GlitchTextProps) {
  const duration = speed * 4

  return (
    <span
      className={[
        'glitch-text',
        enableShadows ? 'glitch-text--shadows' : '',
        enableOnHover ? 'glitch-text--hover-only' : 'glitch-text--active',
        className,
      ].filter(Boolean).join(' ')}
      data-text={children}
      style={{ '--glitch-duration': `${duration}s` } as React.CSSProperties}
    >
      {children}
    </span>
  )
}
