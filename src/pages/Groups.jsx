import { Link } from 'react-router-dom'
import { groups } from '../utils/data'

const bgColors = [
  'from-blue-500 to-blue-600',
  'from-emerald-500 to-emerald-600',
  'from-purple-500 to-purple-600',
  'from-orange-500 to-orange-600',
  'from-pink-500 to-pink-600',
  'from-teal-500 to-teal-600',
  'from-red-500 to-red-600',
  'from-indigo-500 to-indigo-600',
  'from-cyan-500 to-cyan-600',
  'from-rose-500 to-rose-600',
  'from-lime-500 to-lime-600',
  'from-amber-500 to-amber-600',
]

export default function Groups() {
  return (
    <div className="p-4 pb-24">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Grupos</h1>
      <p className="text-sm text-gray-500 mb-4">Fase de grupos — 48 equipos</p>

      <div className="grid grid-cols-2 gap-3">
        {groups.map((g, i) => (
          <Link
            key={g.grupo}
            to={`/grupos/${g.grupo.toLowerCase()}`}
            className={`bg-gradient-to-br ${bgColors[i % bgColors.length]} rounded-xl p-4 text-white shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="text-2xl font-black mb-2">Grupo {g.grupo}</div>
            <div className="space-y-1">
              {g.equipos.map(eq => (
                <div key={eq} className="flex items-center gap-1.5 text-sm font-medium">
                  <span className="uppercase">{eq}</span>
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
