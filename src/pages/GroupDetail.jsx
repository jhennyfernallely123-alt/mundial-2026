import { useParams, Link } from 'react-router-dom'
import { groups, matches } from '../utils/data'
import StandingsTable from '../components/StandingsTable'
import MatchCard from '../components/MatchCard'

export default function GroupDetail() {
  const { letra } = useParams()
  const grupoLetra = letra.toUpperCase()
  const grupo = groups.find(g => g.grupo === grupoLetra)

  if (!grupo) {
    return (
      <div className="p-4 pb-24 text-center">
        <p className="text-gray-500">Grupo no encontrado</p>
        <Link to="/grupos" className="text-blue-600 underline mt-2 inline-block">Volver a grupos</Link>
      </div>
    )
  }

  const grupoLabel = `Grupo ${grupoLetra}`
  const groupMatches = matches.filter(m => m.grupo === grupoLabel)

  return (
    <div className="p-4 pb-24">
      <Link to="/grupos" className="text-blue-600 text-sm font-medium mb-3 inline-block">← Todos los grupos</Link>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg font-black text-blue-700">
          {grupoLetra}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Grupo {grupoLetra}</h1>
          <div className="flex gap-2 mt-1">
            {grupo.equipos.map(eq => (
              <span key={eq} className="text-sm uppercase">{eq}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Teams in group */}
      <div className="flex flex-wrap gap-2 mb-4">
        {grupo.equipos.map(eq => (
          <Link
            key={eq}
            to={`/equipos/${encodeURIComponent(eq)}`}
            className="bg-gray-100 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors uppercase"
          >
            {eq}
          </Link>
        ))}
      </div>

      {/* Matches */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-4 overflow-hidden">
        <div className="px-3 py-2 bg-gray-50 border-b border-gray-100">
          <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wide">Partidos</h2>
        </div>
        <div className="p-3">
          {groupMatches.length === 0 ? (
            <p className="text-gray-400 text-sm">No hay partidos registrados</p>
          ) : (
            groupMatches.map(m => (
              <MatchCard key={m.id} match={m} />
            ))
          )}
        </div>
      </div>

      {/* Standings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-3 py-2 bg-gray-50 border-b border-gray-100">
          <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wide">Posiciones</h2>
        </div>
        <StandingsTable grupo={grupoLabel} />
      </div>
    </div>
  )
}
