import { useState, useEffect } from 'react'
import { useWorldCup } from '../context/WorldCupContext'
import { formatMatchTime } from '../utils/timezone'

export default function MatchCard({ match, showGroup = false, editable = true }) {
  const { scores, setScore, userOffset } = useWorldCup()
  const [g1, setG1] = useState('')
  const [g2, setG2] = useState('')

  const isEmpty = !match.equipo1 || match.equipo1 === 'vacía'
  const userScore = scores[match.id]
  const hasScore = userScore !== undefined && userScore !== null && userScore.gol1 !== null

  const { fecha, hora } = formatMatchTime(match, userOffset)

  // Stage labels for knockout
  const stageLabels = {
    'Dieciseisavos': 'Dieciseisavos de final',
    'Octavos': 'Octavos de final',
    'Cuartos': 'Cuartos de final',
    'Semifinal': 'Semifinal',
    'Tercer puesto': 'Tercer puesto',
    'Final': 'FINAL'
  }
  const label = stageLabels[match.grupo]
  const isKnockout = label !== undefined

  // Sync inputs from context
  useEffect(() => {
    const s = scores[match.id]
    setG1(s?.gol1 !== null && s?.gol1 !== undefined ? String(s.gol1) : '')
    setG2(s?.gol2 !== null && s?.gol2 !== undefined ? String(s.gol2) : '')
  }, [match.id, scores])

  if (isEmpty && !isKnockout) return null

  const saveScore = () => {
    const n1 = g1 === '' ? null : parseInt(g1, 10)
    const n2 = g2 === '' ? null : parseInt(g2, 10)
    if (n1 !== null && n2 !== null && !isNaN(n1) && !isNaN(n2)) {
      setScore(match.id, n1, n2)
    } else if (n1 === null && n2 === null) {
      setScore(match.id, null, null)
    }
  }

  const inputClass =
    'w-10 h-10 text-center border-2 border-gray-300 rounded-lg text-base font-bold text-blue-700 bg-white focus:border-yellow-400 focus:shadow-[0_0_0_2px_rgba(250,204,21,0.3)] outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 mb-2">
      {(isKnockout || showGroup) && (
        <div className="text-xs font-bold text-blue-600 uppercase mb-1 tracking-wide">
          {isKnockout ? label : match.grupo}
        </div>
      )}

      {/* Date, time and stadium */}
      <div className="text-xs text-gray-500 mb-2">
        <span>{fecha || match.fecha_larga} {hora || match.hora}</span>
        {match.estadio && <span className="ml-1">{match.estadio}</span>}
      </div>

      {/* Teams and score */}
      <div className="flex items-center justify-between gap-1">
        {/* Team 1 */}
        <div className="flex-1 flex items-center justify-end gap-1.5 min-w-0">
          {!isEmpty && (
            <span className="font-semibold text-sm truncate uppercase">{match.equipo1}</span>
          )}
        </div>

        {/* Score - always visible inputs */}
        <div className="flex items-center gap-1.5 shrink-0">
          {editable && !isEmpty ? (
            <>
              <input
                type="number" min="0" max="99"
                value={g1}
                onChange={e => setG1(e.target.value)}
                onBlur={saveScore}
                className={inputClass}
              />
              <span className="font-bold text-gray-400 text-lg">–</span>
              <input
                type="number" min="0" max="99"
                value={g2}
                onChange={e => setG2(e.target.value)}
                onBlur={saveScore}
                className={inputClass}
              />
            </>
          ) : (
            <span className="font-bold text-lg text-blue-700 bg-blue-50 px-3 py-1 rounded-md min-w-[60px] text-center">
              {hasScore
                ? `${scores[match.id].gol1} – ${scores[match.id].gol2}`
                : '– –'}
            </span>
          )}
        </div>

        {/* Team 2 */}
        <div className="flex-1 flex items-center gap-1.5 min-w-0">
          {!isEmpty && (
            <span className="font-semibold text-sm truncate uppercase">{match.equipo2}</span>
          )}
        </div>
      </div>
    </div>
  )
}
