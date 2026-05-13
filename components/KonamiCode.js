import { useState, useEffect, useCallback, useRef } from 'react'

const SEQUENCE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

export default function KonamiCode() {
  const [visible, setVisible] = useState(false)
  const bufferRef = useRef([])
  const timerRef = useRef(null)

  const dismiss = useCallback(() => {
    setVisible(false)
  }, [])

  const handleKeyDown = useCallback((e) => {
    bufferRef.current = [...bufferRef.current, e.key].slice(-SEQUENCE.length)

    if (bufferRef.current.join(',') === SEQUENCE.join(',')) {
      bufferRef.current = []
      setVisible(true)
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setVisible(false), 5500)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      clearTimeout(timerRef.current)
    }
  }, [handleKeyDown])

  if (!visible) return null

  return (
    <div
      className="fixed bottom-6 right-6 z-50 animate-slide-up"
      role="status"
      aria-live="polite"
    >
      <button
        onClick={dismiss}
        className="group relative bg-gray-950 border border-green-600 rounded-lg shadow-2xl shadow-green-900/40 p-4 flex items-start gap-3 max-w-xs text-left hover:border-green-400 transition-colors"
        aria-label="Dismiss achievement notification"
      >
        {/* Xbox achievement icon */}
        <div className="flex-shrink-0 w-14 h-14 bg-xbox-green rounded-md flex items-center justify-center text-3xl shadow-inner">
          🏆
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs text-green-400 font-bold uppercase tracking-widest">
            Achievement Unlocked
          </p>
          <p className="text-white font-bold mt-0.5 truncate">Konami Code</p>
          <p className="text-gray-400 text-xs mt-0.5">↑ ↑ ↓ ↓ ← → ← → B A</p>
          <p className="text-green-400 text-xs font-bold mt-1.5">+30G</p>
        </div>

        {/* Dismiss hint */}
        <span className="absolute top-2 right-2 text-gray-600 group-hover:text-gray-400 text-xs leading-none transition-colors">
          ✕
        </span>
      </button>
    </div>
  )
}
