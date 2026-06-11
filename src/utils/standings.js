import matchesData from '../data/matches.json'

export function calcStandings(grupo, userScores = {}) {
  const teamStats = {}

  const groupMatches = matchesData.filter(
    m => m.grupo === grupo && m.equipo1 && m.equipo2 &&
         m.equipo1 !== 'vacía' && m.equipo2 !== 'vacía'
  )

  groupMatches.forEach(m => {
    // Use user score if available, otherwise from match data
    const userScore = userScores[m.id]
    const g1 = userScore ? userScore.gol1 : m.gol1
    const g2 = userScore ? userScore.gol2 : m.gol2

    if (g1 === null || g1 === undefined || g2 === null || g2 === undefined) return

    const n1 = parseInt(g1, 10)
    const n2 = parseInt(g2, 10)
    if (isNaN(n1) || isNaN(n2)) return

    if (!teamStats[m.equipo1]) teamStats[m.equipo1] = { PJ: 0, PG: 0, PE: 0, PP: 0, GF: 0, GC: 0, DG: 0, Pts: 0 }
    if (!teamStats[m.equipo2]) teamStats[m.equipo2] = { PJ: 0, PG: 0, PE: 0, PP: 0, GF: 0, GC: 0, DG: 0, Pts: 0 }

    teamStats[m.equipo1].PJ++
    teamStats[m.equipo1].GF += n1
    teamStats[m.equipo1].GC += n2
    teamStats[m.equipo1].DG = teamStats[m.equipo1].GF - teamStats[m.equipo1].GC

    teamStats[m.equipo2].PJ++
    teamStats[m.equipo2].GF += n2
    teamStats[m.equipo2].GC += n1
    teamStats[m.equipo2].DG = teamStats[m.equipo2].GF - teamStats[m.equipo2].GC

    if (n1 > n2) {
      teamStats[m.equipo1].PG++; teamStats[m.equipo1].Pts += 3
      teamStats[m.equipo2].PP++
    } else if (n2 > n1) {
      teamStats[m.equipo2].PG++; teamStats[m.equipo2].Pts += 3
      teamStats[m.equipo1].PP++
    } else {
      teamStats[m.equipo1].PE++; teamStats[m.equipo1].Pts++
      teamStats[m.equipo2].PE++; teamStats[m.equipo2].Pts++
    }
  })

  return Object.entries(teamStats)
    .map(([nombre, stats]) => ({ nombre, ...stats }))
    .sort((a, b) => {
      if (b.Pts !== a.Pts) return b.Pts - a.Pts
      if (b.DG !== a.DG) return b.DG - a.DG
      return b.GF - a.GF
    })
}
