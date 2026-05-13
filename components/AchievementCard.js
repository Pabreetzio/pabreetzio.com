import { parseTotalAchievements, getGameImageUrl } from '../lib/achievements'
import ProgressBar from './ProgressBar'

export default function AchievementCard({ game }) {
  const {
    DisplayName,
    CurrentAchievements,
    TotalAchievements,
    CurrentGamerscore,
    TotalGamerscore,
    ProgressPercentage,
    Description,
    Devices,
  } = game

  const totalAch = parseTotalAchievements(TotalAchievements)
  const imageUrl = getGameImageUrl(game)
  const isComplete = ProgressPercentage === 100
  const hasData = TotalGamerscore > 0 || totalAch > 0

  return (
    <div
      className={[
        'group bg-gray-900 border rounded-lg overflow-hidden flex flex-col',
        'transition-all duration-200 hover:border-green-600 hover:shadow-lg hover:shadow-green-900/20',
        isComplete ? 'border-green-700' : 'border-gray-800',
      ].join(' ')}
    >
      {/* Cover image */}
      <div className="relative aspect-square bg-gray-800 flex-shrink-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={DisplayName}
            className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600 text-4xl">
            🎮
          </div>
        )}
        {isComplete && (
          <span className="absolute top-1.5 right-1.5 bg-green-600 text-white text-xs font-bold px-1.5 py-0.5 rounded leading-none">
            ✓
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1 gap-2">
        <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2">{DisplayName}</h3>

        {Description && (
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{Description}</p>
        )}

        {Devices && Devices.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {Devices.slice(0, 2).map((d) => (
              <span key={d} className="text-xs bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded">
                {d}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-1">
          {hasData ? (
            <>
              <ProgressBar pct={ProgressPercentage} />
              <div className="flex justify-between items-center text-xs mt-1.5">
                <span className="text-gray-400">
                  {CurrentAchievements}/{totalAch}
                  <span className="text-gray-600 ml-1">ach</span>
                </span>
                <span className="font-semibold text-green-400">
                  {CurrentGamerscore}
                  <span className="text-gray-500 ml-0.5">G</span>
                </span>
              </div>
            </>
          ) : (
            <p className="text-xs text-gray-600 text-center py-1">No achievement data</p>
          )}
        </div>
      </div>
    </div>
  )
}
