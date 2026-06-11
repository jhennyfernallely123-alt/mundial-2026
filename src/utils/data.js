import rawMatches from '../data/matches.json'
import rawTeams from '../data/teams.json'
import rawGroups from '../data/groups.json'
import rawStadiums from '../data/stadiums.json'

export const teams = rawTeams
export const stadiums = rawStadiums

export const groups = rawGroups.map(g => ({
  ...g,
  equipos: g.equipos || []
}))

export const matches = rawMatches.map((m, i) => ({
  ...m,
  etapa: m.grupo?.startsWith('Grupo') ? 'grupos' : m.grupo,
  grupoSimple: m.grupo?.replace('Grupo ', '')
}))


