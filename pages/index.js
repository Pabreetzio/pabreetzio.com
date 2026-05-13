import fs from 'fs'
import path from 'path'
import { useState, useMemo } from 'react'
import Head from 'next/head'
import ScoreSummary from '../components/ScoreSummary'
import AchievementGrid from '../components/AchievementGrid'
import KonamiCode from '../components/KonamiCode'
import { computeStats } from '../lib/achievements'

const SORT_OPTIONS = [
  { value: 'progress-desc', label: 'Progress (high → low)' },
  { value: 'progress-asc', label: 'Progress (low → high)' },
  { value: 'gamerscore', label: 'Gamerscore earned' },
  { value: 'name', label: 'Name (A → Z)' },
]

export default function Home({ games, stats }) {
  const [sortBy, setSortBy] = useState('progress-desc')
  const [completedOnly, setCompletedOnly] = useState(false)

  const displayed = useMemo(() => {
    let result = completedOnly ? games.filter((g) => g.ProgressPercentage === 100) : [...games]

    switch (sortBy) {
      case 'progress-desc':
        result.sort((a, b) => b.ProgressPercentage - a.ProgressPercentage)
        break
      case 'progress-asc':
        result.sort((a, b) => a.ProgressPercentage - b.ProgressPercentage)
        break
      case 'gamerscore':
        result.sort((a, b) => b.CurrentGamerscore - a.CurrentGamerscore)
        break
      case 'name':
        result.sort((a, b) => a.DisplayName.localeCompare(b.DisplayName))
        break
    }

    return result
  }, [games, sortBy, completedOnly])

  return (
    <>
      <Head>
        <title>pabreetzio's achievements</title>
        <meta name="description" content="Xbox achievement progress across all games" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <KonamiCode />

      <div className="min-h-screen">
        <header className="border-b border-gray-800 sticky top-0 z-40 bg-gray-950/95 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
            <span className="text-xl" aria-hidden="true">🎮</span>
            <h1 className="text-xl font-bold text-white tracking-tight">
              pabreetzio&apos;s achievements
            </h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
          {/* Stats summary */}
          <section aria-label="Score summary">
            <ScoreSummary stats={stats} />
          </section>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-sm text-gray-400 whitespace-nowrap">
                Sort by
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-white text-sm rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={completedOnly}
                onChange={(e) => setCompletedOnly(e.target.checked)}
                className="w-4 h-4 accent-green-500 rounded"
              />
              Completed only
            </label>

            <span className="ml-auto text-sm text-gray-500">
              {displayed.length} of {games.length} games
            </span>
          </div>

          {/* Game grid */}
          <section aria-label="Achievement list">
            <AchievementGrid games={displayed} />
          </section>
        </main>

        <footer className="border-t border-gray-800 mt-12 py-6 text-center text-sm text-gray-600">
          pabreetzio.com
        </footer>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public/xbox.com/TitleHub.json')
  const raw = fs.readFileSync(filePath, 'utf8')
  const data = JSON.parse(raw)
  const games = data.GameItems

  return {
    props: {
      games,
      stats: computeStats(games),
    },
  }
}
