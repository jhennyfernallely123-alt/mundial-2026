import { calcGlobalStandings } from '../utils/standings'
import { useWorldCup } from '../context/WorldCupContext'

export default function Standings() {
  const { scores } = useWorldCup()
  const standings = calcGlobalStandings(scores)

  return (
    <div className="min-h-screen bg-white px-3 py-4">
      {/* Title */}
      <h1 className="text-center text-lg font-black tracking-widest uppercase mb-4 text-gray-800">
        Clasificación General
      </h1>

      {/* Standings table */}
      <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider border-b border-gray-200 bg-gray-50 text-gray-500">
                <th className="py-2 px-1 text-left w-6">#</th>
                <th className="py-2 px-1 text-left">Equipo</th>
                <th className="py-2 px-1.5 text-center">PJ</th>
                <th className="py-2 px-1.5 text-center hidden sm:table-cell">PG</th>
                <th className="py-2 px-1.5 text-center hidden sm:table-cell">PE</th>
                <th className="py-2 px-1.5 text-center hidden sm:table-cell">PP</th>
                <th className="py-2 px-1.5 text-center">GF</th>
                <th className="py-2 px-1.5 text-center">GC</th>
                <th className="py-2 px-1.5 text-center">DG</th>
                <th className="py-2 px-1.5 text-center font-bold text-blue-700">Pts</th>
              </tr>
            </thead>
            <tbody>
              {standings.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-gray-400 text-sm italic">
                    No hay resultados disponibles
                  </td>
                </tr>
              ) : (
                standings.map((s, i) => (
                  <tr
                    key={s.nombre}
                    className="border-b border-gray-100 transition-colors hover:bg-gray-50"
                  >
                    <td className="py-1.5 px-1 font-bold text-gray-400">{i + 1}º</td>
                    <td className="py-1.5 px-1">
                      <span className="font-semibold text-gray-700 uppercase tracking-wide text-xs">
                        {s.nombre}
                      </span>
                    </td>
                    <td className="py-1.5 px-1.5 text-center text-gray-600">{s.PJ}</td>
                    <td className="py-1.5 px-1.5 text-center hidden sm:table-cell text-green-600">{s.PG}</td>
                    <td className="py-1.5 px-1.5 text-center hidden sm:table-cell text-yellow-600">{s.PE}</td>
                    <td className="py-1.5 px-1.5 text-center hidden sm:table-cell text-red-500">{s.PP}</td>
                    <td className="py-1.5 px-1.5 text-center text-gray-600">{s.GF}</td>
                    <td className="py-1.5 px-1.5 text-center text-gray-600">{s.GC}</td>
                    <td
                      className={`py-1.5 px-1.5 text-center font-medium ${
                        s.DG > 0 ? 'text-green-600' : s.DG < 0 ? 'text-red-500' : 'text-gray-400'
                      }`}
                    >
                      {s.DG > 0 ? '+' : ''}{s.DG}
                    </td>
                    <td className="py-1.5 px-1.5 text-center font-bold text-sm text-blue-700">
                      {s.Pts}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
