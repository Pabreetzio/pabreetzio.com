export default function ProgressBar({ pct, className = '' }) {
  const clamped = Math.min(Math.max(pct || 0, 0), 100)
  const color =
    clamped === 100
      ? 'bg-xbox-green-light'
      : clamped >= 50
      ? 'bg-green-500'
      : clamped > 0
      ? 'bg-green-700'
      : 'bg-gray-700'

  return (
    <div className={`h-1.5 bg-gray-800 rounded-full overflow-hidden ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-500 ${color}`}
        style={{ width: `${clamped}%` }}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  )
}
