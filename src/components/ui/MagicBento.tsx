import { useRef, useState } from 'react'

interface MagicBentoProps {
  children: React.ReactNode
  className?: string
  enableSpotlight?: boolean
  enableBorderGlow?: boolean
  enableTilt?: boolean
  disableAnimations?: boolean
  style?: React.CSSProperties
}

export function MagicBento({
  children,
  className = '',
  enableSpotlight = true,
  enableBorderGlow = true,
  enableTilt = false,
  disableAnimations = false,
  style,
}: MagicBentoProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [spotlight, setSpotlight] = useState({ x: -200, y: -200 })
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [active, setActive] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disableAnimations) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setSpotlight({ x, y })
    if (enableTilt) {
      const nx = (x / rect.width - 0.5) * 8
      const ny = (y / rect.height - 0.5) * 8
      setTilt({ x: -ny, y: nx })
    }
  }

  const handleMouseEnter = () => {
    if (!disableAnimations) setActive(true)
  }

  const handleMouseLeave = () => {
    setActive(false)
    setSpotlight({ x: -200, y: -200 })
    if (enableTilt) setTilt({ x: 0, y: 0 })
  }

  return (
    <div
      ref={ref}
      className={`magic-bento ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform: enableTilt && !disableAnimations
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : undefined,
        transition: active ? 'transform 0.1s ease' : 'transform 0.4s ease',
        '--spotlight-x': `${spotlight.x}px`,
        '--spotlight-y': `${spotlight.y}px`,
        '--border-opacity': active && enableBorderGlow ? '1' : '0',
      } as React.CSSProperties}
    >
      {enableSpotlight && !disableAnimations && (
        <div className="magic-bento-spotlight" aria-hidden="true" />
      )}
      {enableBorderGlow && !disableAnimations && (
        <div className="magic-bento-border" aria-hidden="true" />
      )}
      <div className="magic-bento-content">
        {children}
      </div>
    </div>
  )
}
