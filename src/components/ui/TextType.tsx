import { useEffect, useRef, useState } from 'react'

interface TextTypeProps {
  text: string | string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  loop?: boolean
  startOnVisible?: boolean
  className?: string
  cursorChar?: string
  onComplete?: () => void
}

export function TextType({
  text,
  typingSpeed = 40,
  deletingSpeed = 20,
  pauseDuration = 1500,
  loop = false,
  startOnVisible = false,
  className = '',
  cursorChar = '▋',
  onComplete,
}: TextTypeProps) {
  const texts = Array.isArray(text) ? text : [text]
  const [displayed, setDisplayed] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing')
  const [started, setStarted] = useState(!startOnVisible)
  const [done, setDone] = useState(false)
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!startOnVisible) return
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [startOnVisible])

  useEffect(() => {
    if (!started || done) return

    const current = texts[textIndex]

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), typingSpeed)
        return () => clearTimeout(t)
      } else {
        const isLast = textIndex === texts.length - 1
        if (!loop && isLast) {
          setDone(true)
          onComplete?.()
          return
        }
        const t = setTimeout(() => setPhase(texts.length > 1 ? 'pausing' : 'typing'), pauseDuration)
        return () => clearTimeout(t)
      }
    }

    if (phase === 'pausing') {
      const t = setTimeout(() => setPhase(texts.length > 1 ? 'deleting' : 'typing'), pauseDuration)
      return () => clearTimeout(t)
    }

    if (phase === 'deleting') {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(prev => prev.slice(0, -1)), deletingSpeed)
        return () => clearTimeout(t)
      } else {
        const next = (textIndex + 1) % texts.length
        setTextIndex(next)
        setPhase('typing')
      }
    }
  }, [started, done, displayed, phase, textIndex, texts, typingSpeed, deletingSpeed, pauseDuration, loop, onComplete])

  return (
    <span ref={containerRef} className={`text-type ${className}`} aria-label={texts[textIndex]}>
      {displayed}
      <span
        className="text-type-cursor"
        aria-hidden="true"
        style={{ opacity: done ? 0 : 1 }}
      >
        {cursorChar}
      </span>
    </span>
  )
}
