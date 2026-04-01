interface LogoItem {
  label: string
  icon?: React.ReactNode
}

interface LogoLoopProps {
  items: LogoItem[]
  direction?: 'left' | 'right'
  speed?: number
  fadeOut?: boolean
  scaleOnHover?: boolean
}

export function LogoLoop({
  items,
  direction = 'left',
  speed = 80,
  fadeOut = true,
  scaleOnHover = true,
}: LogoLoopProps) {
  // Duplicate to create seamless loop
  const doubled = [...items, ...items]
  const duration = (items.length * 120) / speed

  return (
    <div
      className="logo-loop"
      style={{
        '--mask': fadeOut
          ? 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
          : 'none',
      } as React.CSSProperties}
    >
      <div
        className="logo-loop-track"
        style={{
          animation: `logo-scroll-${direction} ${duration}s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="logo-loop-item"
            style={{ transition: scaleOnHover ? 'transform 0.2s ease, opacity 0.2s ease' : undefined }}
          >
            {item.icon && <span className="logo-loop-icon">{item.icon}</span>}
            <span className="logo-loop-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
