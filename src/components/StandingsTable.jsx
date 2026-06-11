import { calcStandings } from '../utils/standings'
import { useWorldCup } from '../context/WorldCupContext'

export default function StandingsTable({ grupo }) {
  const { scores } = useWorldCup()
  const standings = calcStandings(grupo, scores)

  if (standings.length === 0) {
    return <p className="text-gray-500 text-sm italic p-3">Sin resultados disponibles</p>
  }

  const maxPJ = Math.max(...standings.map(s => s.PJ), 0)
  const clasifican = maxPJ >= 3 ? 2 : 0

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-gray-500 text-xs uppercase">
            <th className="py-2 px-1 text-left w-6">#</th>
            <th className="py-2 px-1 text-left">Equipo</th>
            <th className="py-2 px-2 text-center">Jug.</th>
            <th className="py-2 px-2 text-center">Gan.</th>
            <th className="py-2 px-2 text-center">Emp.</th>
            <th className="py-2 px-2 text-center">Per.</th>
            <th className="py-2 px-2 text-center">GF</th>
            <th className="py-2 px-2 text-center">GC</th>
            <th className="py-2 px-2 text-center">DG</th>
            <th className="py-2 px-2 text-center font-bold text-blue-700">Puntos</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((s, i) => (
            <tr key={s.nombre} className={`border-b border-gray-100 ${i < 2 && maxPJ >= 2 ? 'bg-green-50' : ''}`}>
              <td className="py-2 px-1 font-bold text-gray-400">{i + 1})</td>
              <td className="py-2 px-1">
                <span className="font-medium text-xs uppercase">{s.nombre}</span>
              </td>
              <td className="py-2 px-2 text-center">{s.PJ}</td>
              <td className="py-2 px-2 text-center text-green-600">{s.PG}</td>
              <td className="py-2 px-2 text-center text-yellow-600">{s.PE}</td>
              <td className="py-2 px-2 text-center text-red-500">{s.PP}</td>
              <td className="py-2 px-2 text-center">{s.GF}</td>
              <td className="py-2 px-2 text-center">{s.GC}</td>
              <td className={`py-2 px-2 text-center font-medium ${s.DG > 0 ? 'text-green-600' : s.DG < 0 ? 'text-red-500' : ''}`}>
                {s.DG > 0 ? '+' : ''}{s.DG}
              </td>
              <td className="py-2 px-2 text-center font-bold text-blue-700 text-base">{s.Pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {clasifican > 0 && (
        <p className="text-[10px] text-gray-400 px-3 pb-2 pt-1 italic">
          * Los 2 primeros clasifican a Dieciseisavos
        </p>
      )}
    </div>
  )
}
