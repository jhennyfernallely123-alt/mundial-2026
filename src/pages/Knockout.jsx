import { matches } from '../utils/data'
import MatchCard from '../components/MatchCard'

const stages = [
  { key: 'Dieciseisavos', label: 'Dieciseisavos de final', icon: '🔵', matches: [] },
  { key: 'Octavos', label: 'Octavos de final', icon: '🟣', matches: [] },
  { key: 'Cuartos', label: 'Cuartos de final', icon: '🟠', matches: [] },
  { key: 'Semifinal', label: 'Semifinales', icon: '🔴', matches: [] },
  { key: 'Tercer puesto', label: 'Tercer puesto', icon: '🥉', matches: [] },
  { key: 'Final', label: 'Gran Final', icon: '🏆', matches: [] },
]

matches.forEach(m => {
  const stage = stages.find(s => s.key === m.grupo)
  if (stage) stage.matches.push(m)
})

export default function Knockout() {
  return (
    <div className="p-4 pb-24">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Eliminatorias</h1>
      <p className="text-sm text-gray-500 mb-4">Fase final del torneo</p>

      {stages.map(stage => (
        <div key={stage.key} className="mb-6">
          {/* Stage header */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{stage.icon}</span>
            <h2 className="text-lg font-bold text-gray-800">{stage.label}</h2>
            <span className="text-xs text-gray-400 ml-auto">{stage.matches.length} partidos</span>
          </div>

          {/* Matches */}
          <div className="space-y-1">
            {stage.matches.length === 0 ? (
              <p className="text-gray-400 text-sm italic">Partidos por definir</p>
            ) : (
              stage.matches.map(m => (
                <MatchCard key={m.id} match={m} editable={true} />
              ))
            )}
          </div>

          {/* Arrow connecting stages */}
          {stage.key !== 'Final' && stage.matches.length > 0 && (
            <div className="flex justify-center my-2">
              <span className="text-gray-300 text-xl">↓</span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
