import ProgressBar from './ProgressBar'

function StatCard({ label, value, sub, pct }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
      <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">{label}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-3xl font-bold text-white">{value}</span>
        {sub && <span className="text-sm text-gray-500">{sub}</span>}
      </div>
      <ProgressBar pct={pct} className="mt-3" />
      <p className="mt-1.5 text-right text-xs text-gray-500">{pct.toFixed(1)}%</p>
    </div>
  )
}

export default function ScoreSummary({ stats }) {
  const {
    totalCurrentGS,
    totalPossibleGS,
    gamerscorePct,
    totalCurrentAch,
    totalPossibleAch,
    achievementPct,
    completedGames,
    totalGames,
  } = stats

  const completionPct = totalGames > 0 ? (completedGames / totalGames) * 100 : 0

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard
        label="Gamerscore"
        value={totalCurrentGS.toLocaleString()}
        sub={`/ ${totalPossibleGS.toLocaleString()}`}
        pct={gamerscorePct}
      />
      <StatCard
        label="Achievements"
        value={totalCurrentAch.toLocaleString()}
        sub={`/ ${totalPossibleAch.toLocaleString()}`}
        pct={achievementPct}
      />
      <StatCard
        label="Completed Games"
        value={completedGames}
        sub={`/ ${totalGames} games`}
        pct={completionPct}
      />
    </div>
  )
}
