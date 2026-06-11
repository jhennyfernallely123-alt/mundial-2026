import { useParams, Link } from 'react-router-dom'
import { teams, matches } from '../utils/data'
import { useWorldCup } from '../context/WorldCupContext'
import MatchCard from '../components/MatchCard'

export default function TeamDetail() {
  const { nombre } = useParams()
  const teamName = decodeURIComponent(nombre)
  const team = teams.find(t => t.nombre === teamName)
  const { scores } = useWorldCup()

  if (!team) {
    return (
      <div className="p-4 pb-24 text-center">
        <p className="text-gray-500">Equipo no encontrado</p>
        <Link to="/equipos" className="text-blue-600 underline mt-2 inline-block">Volver a equipos</Link>
      </div>
    )
  }

  const teamMatches = matches.filter(
    m => m.equipo1 === teamName || m.equipo2 === teamName
  ).sort((a, b) => a.id - b.id)

  const groupMatches = teamMatches.filter(m => m.grupo?.startsWith('Grupo'))
  const knockoutMatches = teamMatches.filter(m => !m.grupo?.startsWith('Grupo'))

  const getGoal = (match, team, which) => {
    const s = scores[match.id]
    if (s && s.gol1 !== null) {
      return which === 1 ? s.gol1 : s.gol2
    }
    return which === 1 ? match.gol1 : match.gol2
  }

  const wins = teamMatches.filter(m => {
    const g1 = getGoal(m, teamName, 1)
    const g2 = getGoal(m, teamName, 2)
    if (g1 === null || g1 === undefined || g2 === null || g2 === undefined) return false
    return (m.equipo1 === teamName && g1 > g2) ||
           (m.equipo2 === teamName && g2 > g1)
  }).length

  const draws = teamMatches.filter(m => {
    const g1 = getGoal(m, teamName, 1)
    const g2 = getGoal(m, teamName, 2)
    if (g1 === null || g1 === undefined || g2 === null || g2 === undefined) return false
    return g1 === g2
  }).length

  const losses = teamMatches.filter(m => {
    const g1 = getGoal(m, teamName, 1)
    const g2 = getGoal(m, teamName, 2)
    if (g1 === null || g1 === undefined || g2 === null || g2 === undefined) return false
    return (m.equipo1 === teamName && g1 < g2) ||
           (m.equipo2 === teamName && g2 < g1)
  }).length

  return (
    <div className="p-4 pb-24">
      <Link to="/equipos" className="text-blue-600 text-sm font-medium mb-3 inline-block">← Todos los equipos</Link>

      <div className="flex items-center gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 uppercase">{teamName}</h1>
          <span className="text-sm text-gray-500">Grupo {team.grupo}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 text-center">
          <div className="text-lg font-black text-gray-700">{teamMatches.length}</div>
          <div className="text-[10px] text-gray-500">Partidos</div>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 text-center">
          <div className="text-lg font-black text-green-600">{wins}</div>
          <div className="text-[10px] text-gray-500">Ganados</div>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 text-center">
          <div className="text-lg font-black text-yellow-600">{draws}</div>
          <div className="text-[10px] text-gray-500">Empatados</div>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 text-center">
          <div className="text-lg font-black text-red-500">{losses}</div>
          <div className="text-[10px] text-gray-500">Perdidos</div>
        </div>
      </div>

      {/* Group matches */}
      {groupMatches.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">Fase de grupos</h2>
          {groupMatches.map(m => <MatchCard key={m.id} match={m} />)}
        </div>
      )}

      {/* Knockout matches */}
      {knockoutMatches.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">Eliminatorias</h2>
          {knockoutMatches.map(m => <MatchCard key={m.id} match={m} />)}
        </div>
      )}

      {teamMatches.length === 0 && (
        <p className="text-gray-400 text-center py-8">No hay partidos registrados para este equipo</p>
      )}
    </div>
  )
}
