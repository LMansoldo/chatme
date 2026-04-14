import { useEffect, useRef } from 'react'

interface LetterGlitchProps {
  glitchColors?: string[]
  glitchSpeed?: number
  outerVignette?: boolean
  centerVignette?: boolean
  smooth?: boolean
  className?: string
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&<>[]{}|'

export function LetterGlitch({
  glitchColors = ['#0f172a', '#38bdf8', '#22c55e'],
  glitchSpeed = 50,
  outerVignette = true,
  className = '',
}: LetterGlitchProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>(0)
  const lastRef = useRef<number>(0)
  const gridRef = useRef<{ char: string; color: string; opacity: number }[]>([])
  const colsRef = useRef(0)
  const rowsRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const fontSize = 14
    const lineHeight = 20

    function resize() {
      canvas!.width = canvas!.offsetWidth
      canvas!.height = canvas!.offsetHeight
      colsRef.current = Math.ceil(canvas!.width / (fontSize * 0.6))
      rowsRef.current = Math.ceil(canvas!.height / lineHeight)
      const total = colsRef.current * rowsRef.current
      gridRef.current = Array.from({ length: total }, () => ({
        char: CHARS[Math.floor(Math.random() * CHARS.length)],
        color: glitchColors[Math.floor(Math.random() * glitchColors.length)],
        opacity: Math.random() * 0.4 + 0.05,
      }))
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    function draw(ts: number) {
      frameRef.current = requestAnimationFrame(draw)
      if (ts - lastRef.current < glitchSpeed) return
      lastRef.current = ts

      const cols = colsRef.current
      const rows = rowsRef.current
      const grid = gridRef.current

      // Randomly mutate ~3% of cells
      const mutations = Math.floor(cols * rows * 0.03)
      for (let i = 0; i < mutations; i++) {
        const idx = Math.floor(Math.random() * grid.length)
        grid[idx].char = CHARS[Math.floor(Math.random() * CHARS.length)]
        grid[idx].color = glitchColors[Math.floor(Math.random() * glitchColors.length)]
        grid[idx].opacity = Math.random() * 0.5 + 0.05
      }

      ctx.clearRect(0, 0, canvas!.width, canvas!.height)
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cell = grid[r * cols + c]
          if (!cell) continue
          ctx.globalAlpha = cell.opacity
          ctx.fillStyle = cell.color
          ctx.fillText(cell.char, c * (fontSize * 0.6), (r + 1) * lineHeight)
        }
      }
      ctx.globalAlpha = 1
    }

    frameRef.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(frameRef.current)
      ro.disconnect()
    }
  }, [glitchColors, glitchSpeed])

  return (
    <div
      className={`letter-glitch-wrap ${className}`}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
      {outerVignette && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.85) 100%)',
          }}
        />
      )}
    </div>
  )
}
