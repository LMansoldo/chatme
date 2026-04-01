import { useRef, useState } from 'react'

export interface DockItem {
  icon: React.ReactNode
  label: string
  onClick: () => void
  isRaw?: boolean  // renders icon directly, no button wrapper (for interactive children)
}

interface DockProps {
  items: DockItem[]
  magnification?: number
}

export function Dock({ items, magnification = 56 }: DockProps) {
  const [mouseX, setMouseX] = useState<number | null>(null)
  const dockRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={dockRef}
      className="dock"
      onMouseMove={e => setMouseX(e.clientX)}
      onMouseLeave={() => setMouseX(null)}
      role="navigation"
      aria-label="Main navigation"
    >
      {items.map((item, i) => (
        item.isRaw ? (
          <div key={i} className="dock-item-wrap dock-item-wrap--raw">
            {item.icon}
          </div>
        ) : (
          <DockButton
            key={i}
            item={item}
            mouseX={mouseX}
            baseSize={45}
            magnification={magnification}
          />
        )
      ))}
    </div>
  )
}

interface DockButtonProps {
  item: DockItem
  mouseX: number | null
  baseSize: number
  magnification: number
}

function DockButton({ item, mouseX, baseSize, magnification }: DockButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null)
  const [hovered, setHovered] = useState(false)

  const getSize = () => {
    if (mouseX === null) return baseSize
    const rect = btnRef.current?.getBoundingClientRect()
    if (!rect) return baseSize
    const center = rect.left + rect.width / 2
    const distance = Math.abs(mouseX - center)
    const maxDist = 20
    if (distance > maxDist) return baseSize
    const ratio = 1 - distance / maxDist
    return baseSize + (magnification - baseSize) * ratio
  }

  const size = getSize()
  const isActive = size > baseSize * 1.1

  return (
    <div className="dock-item-wrap">
      {hovered && item.label && <span className="dock-label">{item.label}</span>}
      <button
        ref={btnRef}
        className="dock-btn"
        onClick={item.onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={item.label}
        style={{
          width: size,
          height: size,
          transition: 'width 0.1s ease, height 0.1s ease',
          transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
        }}
      >
        {item.icon}
      </button>
    </div>
  )
}
