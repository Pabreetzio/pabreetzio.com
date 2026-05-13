import AchievementCard from './AchievementCard'

export default function AchievementGrid({ games }) {
  if (games.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500 gap-3">
        <span className="text-5xl">🎮</span>
        <p className="text-lg">No games match your filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {games.map((game, i) => (
        <AchievementCard key={`${game.DisplayName}-${i}`} game={game} />
      ))}
    </div>
  )
}
