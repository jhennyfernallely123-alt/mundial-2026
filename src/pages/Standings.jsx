import { calcGlobalStandings } from '../utils/standings'
import { useWorldCup } from '../context/WorldCupContext'

export default function Standings() {
  const { scores } = useWorldCup()
  const standings = calcGlobalStandings(scores)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 px-3 py-4">
      {/* Title */}
      <h1 className="text-center text-lg font-black tracking-widest uppercase mb-4"
        style={{
          color: '#f7d917',
          textShadow: '0 2px 8px rgba(247,217,23,0.3)',
        }}
      >
        Clasificación General
      </h1>

      {/* Standings table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: 'rgba(10, 15, 10, 0.8)',
          border: '1px solid rgba(247, 217, 23, 0.25)',
          boxShadow: '0 0 24px rgba(247, 217, 23, 0.06)',
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider border-b border-white/10"
                style={{ background: 'rgba(247, 217, 23, 0.08)', color: '#c0b070' }}
              >
                <th className="py-2 px-1 text-left w-6">#</th>
                <th className="py-2 px-1 text-left">Equipo</th>
                <th className="py-2 px-1.5 text-center">PJ</th>
                <th className="py-2 px-1.5 text-center hidden sm:table-cell">PG</th>
                <th className="py-2 px-1.5 text-center hidden sm:table-cell">PE</th>
                <th className="py-2 px-1.5 text-center hidden sm:table-cell">PP</th>
                <th className="py-2 px-1.5 text-center">GF</th>
                <th className="py-2 px-1.5 text-center">GC</th>
                <th className="py-2 px-1.5 text-center">DG</th>
                <th className="py-2 px-1.5 text-center font-bold" style={{ color: '#f7d917' }}>Pts</th>
              </tr>
            </thead>
            <tbody>
              {standings.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-gray-500 text-sm italic">
                    No hay resultados disponibles
                  </td>
                </tr>
              ) : (
                standings.map((s, i) => (
                  <tr
                    key={s.nombre}
                    className="border-b border-white/5 transition-colors hover:bg-white/[0.03]"
                  >
                    <td className="py-1.5 px-1 font-bold text-gray-500">{i + 1}º</td>
                    <td className="py-1.5 px-1">
                      <span className="font-semibold text-gray-200 uppercase tracking-wide text-xs">
                        {s.nombre}
                      </span>
                    </td>
                    <td className="py-1.5 px-1.5 text-center text-gray-300">{s.PJ}</td>
                    <td className="py-1.5 px-1.5 text-center hidden sm:table-cell" style={{ color: '#4ade80' }}>{s.PG}</td>
                    <td className="py-1.5 px-1.5 text-center hidden sm:table-cell" style={{ color: '#facc15' }}>{s.PE}</td>
                    <td className="py-1.5 px-1.5 text-center hidden sm:table-cell" style={{ color: '#f87171' }}>{s.PP}</td>
                    <td className="py-1.5 px-1.5 text-center text-gray-300">{s.GF}</td>
                    <td className="py-1.5 px-1.5 text-center text-gray-300">{s.GC}</td>
                    <td
                      className={`py-1.5 px-1.5 text-center font-medium ${
                        s.DG > 0 ? 'text-green-400' : s.DG < 0 ? 'text-red-400' : 'text-gray-400'
                      }`}
                    >
                      {s.DG > 0 ? '+' : ''}{s.DG}
                    </td>
                    <td className="py-1.5 px-1.5 text-center font-bold text-sm" style={{ color: '#f7d917' }}>
                      {s.Pts}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary footer */}
      <p className="text-center text-[10px] text-gray-600 mt-3 italic">
        {standings.length} equipos ordenados por puntos
      </p>
    </div>
  )
}
