import { useState } from 'react'

interface GlassIconItem {
  icon: React.ReactNode
  label: string
  color?: string
}

interface GlassIconsProps {
  items: GlassIconItem[]
  columns?: number
}

export function GlassIcons({ items, columns = 4 }: GlassIconsProps) {
  return (
    <div
      className="glass-icons"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {items.map((item, i) => (
        <GlassIconItem key={i} item={item} />
      ))}
    </div>
  )
}

function GlassIconItem({ item }: { item: GlassIconItem }) {
  const [hovered, setHovered] = useState(false)
  const color = item.color ?? '#6b9e6e'

  return (
    <div
      className="glass-icon-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        '--icon-color': color,
        '--icon-glow': `${color}33`,
        transform: hovered ? 'translateY(-4px) scale(1.05)' : 'translateY(0) scale(1)',
        boxShadow: hovered ? `0 8px 24px ${color}22, 0 0 0 1px ${color}44` : undefined,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      } as React.CSSProperties}
    >
      <div
        className="glass-icon-bg"
        style={{ background: hovered ? `${color}18` : undefined }}
      />
      <div className="glass-icon-inner" style={{ color: hovered ? color : undefined }}>
        {item.icon}
      </div>
      <span className="glass-icon-label">{item.label}</span>
    </div>
  )
}
