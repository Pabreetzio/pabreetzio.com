/**
 * Extracts the total achievement count from TotalAchievements, which Xbox sometimes
 * returns as a fraction string like "30/51" (unlocked/total) instead of a plain number.
 */
export function parseTotalAchievements(value) {
  const str = String(value)
  if (str.includes('/')) {
    return parseInt(str.split('/')[1], 10) || 0
  }
  return parseInt(str, 10) || 0
}

export function getGameImageUrl(game) {
  return game.DisplayImage?.Href || null
}

export function computeStats(gameItems) {
  const totalCurrentGS = gameItems.reduce((sum, g) => sum + (g.CurrentGamerscore || 0), 0)
  const totalPossibleGS = gameItems.reduce((sum, g) => sum + (g.TotalGamerscore || 0), 0)
  const totalCurrentAch = gameItems.reduce((sum, g) => sum + (g.CurrentAchievements || 0), 0)
  const totalPossibleAch = gameItems.reduce(
    (sum, g) => sum + parseTotalAchievements(g.TotalAchievements),
    0
  )
  const gamerscorePct = totalPossibleGS > 0 ? (totalCurrentGS / totalPossibleGS) * 100 : 0
  const achievementPct = totalPossibleAch > 0 ? (totalCurrentAch / totalPossibleAch) * 100 : 0
  const completedGames = gameItems.filter((g) => g.ProgressPercentage === 100).length

  return {
    totalCurrentGS,
    totalPossibleGS,
    totalCurrentAch,
    totalPossibleAch,
    gamerscorePct,
    achievementPct,
    completedGames,
    totalGames: gameItems.length,
  }
}
