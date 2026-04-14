import { useState, useRef, useEffect } from 'react'

interface PinModalProps {
  onSubmit: (pin: string) => boolean
  onClose: () => void
}

export function PinModal({ onSubmit, onClose }: PinModalProps) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPin(e.target.value.replace(/\D/g, '').slice(0, 6))
    setError(false)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const ok = onSubmit(pin)
    if (!ok) {
      setError(true)
      setPin('')
      inputRef.current?.focus()
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="pin-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="pin-modal__icon">🔐</div>
        <h2 className="pin-modal__title">Admin access</h2>
        <form className="pin-modal__form" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className={`pin-modal__input${error ? ' pin-modal__input--error' : ''}`}
            type="password"
            inputMode="numeric"
            value={pin}
            onChange={handleChange}
            placeholder="••••••"
            maxLength={6}
            autoComplete="off"
          />
          {error && <p className="pin-modal__error">Incorrect PIN</p>}
          <button className="pin-modal__btn" type="submit" disabled={pin.length !== 6}>
            Enter
          </button>
        </form>
      </div>
    </div>
  )
}
