import { useState } from 'react'
import { Link } from 'react-router-dom'
import { teams } from '../utils/data'

export default function Teams() {
  const [search, setSearch] = useState('')

  const groups = [...new Set(teams.map(t => t.grupo))].sort()

  const filtered = search
    ? teams.filter(t => t.nombre.toLowerCase().includes(search.toLowerCase()))
    : teams

  const byGroup = {}
  filtered.forEach(t => {
    if (!byGroup[t.grupo]) byGroup[t.grupo] = []
    byGroup[t.grupo].push(t)
  })

  return (
    <div className="p-4 pb-24">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Equipos</h1>
      <p className="text-sm text-gray-500 mb-4">Los 48 participantes</p>

      {/* Search */}
      <input
        type="text"
        placeholder="Buscar equipo..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />

      {search ? (
        // Search results flat
        <div className="space-y-2">
          {filtered.map(t => (
            <Link
              key={t.nombre}
              to={`/equipos/${encodeURIComponent(t.nombre)}`}
              className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm border border-gray-100"
            >
              <div>
                <div className="font-semibold text-gray-800 uppercase">{t.nombre}</div>
                <div className="text-xs text-gray-500">Grupo {t.grupo}</div>
              </div>
            </Link>
          ))}
          {filtered.length === 0 && (
            <p className="text-gray-400 text-center py-4">No se encontraron equipos</p>
          )}
        </div>
      ) : (
        // By group
        <div className="space-y-4">
          {groups.map(g => (
            <div key={g}>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">Grupo {g}</h3>
              <div className="space-y-2">
                {teams.filter(t => t.grupo === g).map(t => (
                  <Link
                    key={t.nombre}
                    to={`/equipos/${encodeURIComponent(t.nombre)}`}
                    className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-800 uppercase">{t.nombre}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
