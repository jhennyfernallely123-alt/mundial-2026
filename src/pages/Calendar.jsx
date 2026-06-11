import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { matches } from '../utils/data'
import MatchCard from '../components/MatchCard'

const stageLabels = {
  'Dieciseisavos': 'Dieciseisavos',
  'Octavos': 'Octavos',
  'Cuartos': 'Cuartos',
  'Semifinal': 'Semifinal',
  'Tercer puesto': '3er puesto',
  'Final': 'Final'
}

const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const monthNames = ['junio', 'julio']

function getTodayFecha() {
  const now = new Date()
  const day = dayNames[now.getDay()]
  const date = now.getDate()
  const month = monthNames[now.getMonth() - 5] || ''
  return `${day} ${date} ${month}`
}

export default function Calendar() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialFilter = searchParams.get('hoy') === '1' ? 'hoy' : 'todas'
  const [filter, setFilter] = useState(initialFilter)
  const today = useMemo(getTodayFecha, [])

  const stages = [...new Set(matches.map(m => {
    if (m.grupo?.startsWith('Grupo')) return 'Fase de grupos'
    return stageLabels[m.grupo] || m.grupo
  }))]

  const filtered = filter === 'todas'
    ? matches
    : filter === 'hoy'
    ? matches.filter(m => m.fecha_larga === today)
    : matches.filter(m => {
        if (filter === 'Fase de grupos') return m.grupo?.startsWith('Grupo')
        return m.grupo === filter || stageLabels[m.grupo] === filter
      })

  // Group by date
  const byDate = {}
  filtered.forEach(m => {
    const date = m.fecha_larga || 'Sin fecha'
    if (!byDate[date]) byDate[date] = []
    byDate[date].push(m)
  })

  const handleFilter = (f) => {
    setFilter(f)
    if (f === 'hoy') {
      setSearchParams({ hoy: '1' })
    } else {
      setSearchParams({})
    }
  }

  const filterBtn = (key, label) => (
    <button
      onClick={() => handleFilter(key)}
      className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
        filter === key ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="p-4 pb-24">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Calendario</h1>
      <p className="text-sm text-gray-500 mb-4">Todos los partidos del Mundial</p>

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {filterBtn('todas', 'Todas')}
        {filterBtn('hoy', `Hoy ${new Date().getDate()}/${new Date().getMonth() + 1}`)}
        {filterBtn('Fase de grupos', 'Fase de grupos')}
        {['Dieciseisavos','Octavos','Cuartos','Semifinal','Tercer puesto','Final'].map(s => (
          <span key={s}>{filterBtn(s, stageLabels[s])}</span>
        ))}
      </div>

      {/* Today banner */}
      {filter === 'hoy' && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl px-4 py-3 mb-4 text-white shadow-sm">
          <p className="text-sm font-bold uppercase tracking-wide">Partidos de hoy</p>
          <p className="text-xs opacity-80">{today}</p>
        </div>
      )}

      {/* No matches message */}
      {filter === 'hoy' && Object.keys(byDate).length === 0 && (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">📅</p>
          <p className="text-gray-500 font-medium">No hay partidos hoy</p>
          <p className="text-gray-400 text-sm mt-1">Seleccioná otra fecha o filtro</p>
        </div>
      )}

      {/* Matches by date */}
      {Object.entries(byDate).map(([date, dayMatches]) => (
        <div key={date} className="mb-4">
          <h3 className="text-sm font-bold text-gray-600 mb-2 sticky top-0 bg-gray-50 py-1 z-10">
            {date}
          </h3>
          {dayMatches.map(m => (
            <MatchCard key={m.id} match={m} showGroup={true} />
          ))}
        </div>
      ))}
    </div>
  )
}
