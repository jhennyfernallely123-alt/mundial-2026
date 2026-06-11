export function parseUtcOffset(utcStr) {
  if (!utcStr) return 0
  const match = utcStr.match(/UTC([+-])(\d+)(?::(\d+))?/)
  if (!match) return 0
  const sign = match[1] === '+' ? 1 : -1
  const hours = parseInt(match[2], 10)
  const mins = parseInt(match[3] || '0', 10)
  return sign * (hours + mins / 60)
}

export function parseMatchTime(fechaLarga, hora, coefUtco) {
  if (!fechaLarga || !hora) return null
  const dateMatch = fechaLarga.match(/(\d+)\s+junio|(\d+)\s+julio/)
  if (!dateMatch) return null

  const day = parseInt(dateMatch[1] || dateMatch[2], 10)
  const month = fechaLarga.includes('julio') ? 7 : 6
  const year = 2026

  const [hours, mins] = hora.split(':').map(Number)
  if (isNaN(hours) || isNaN(mins)) return null

  const baseOffset = parseInt(coefUtco, 10)
  if (isNaN(baseOffset)) return null

  // Create date in UTC
  const utcDate = new Date(Date.UTC(year, month - 1, day, hours - baseOffset, mins))
  return utcDate
}

export function formatMatchTime(match, userUtcOffset) {
  const utcDate = parseMatchTime(match.fecha_larga, match.hora, match.coef_utco)
  if (!utcDate) return { fecha: match.fecha_larga || '', hora: match.hora || '' }

  // Apply user timezone offset
  const localHours = utcDate.getUTCHours() + userUtcOffset
  const localMins = utcDate.getUTCMinutes()
  const dayShift = Math.floor(localHours / 24)
  const localDay = utcDate.getUTCDate() + dayShift
  const adjustedHours = ((localHours % 24) + 24) % 24

  // Compute day of week using a local Date
  const localDate = new Date(Date.UTC(
    utcDate.getUTCFullYear(),
    utcDate.getUTCMonth(),
    utcDate.getUTCDate() + dayShift,
    adjustedHours,
    localMins
  ))

  const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
  const dayName = dayNames[localDate.getUTCDay()]

  const monthNames = ['junio', 'julio']
  const month = monthNames[utcDate.getUTCMonth() - 5] || ''

  const horaStr = `${String(adjustedHours).padStart(2, '0')}:${String(localMins).padStart(2, '0')}`
  const fechaStr = `${dayName} ${localDay} ${month}`

  return { fecha: fechaStr, hora: horaStr }
}

export function getUtcLabel(offset) {
  const sign = offset >= 0 ? '+' : ''
  return `UTC${sign}${offset}`
}

export const defaultTimezones = [
  { pais: 'Argentina', utc: 'UTC-3' },
  { pais: 'Bolivia', utc: 'UTC-4' },
  { pais: 'Chile', utc: 'UTC-4' },
  { pais: 'Colombia', utc: 'UTC-5' },
  { pais: 'Costa Rica', utc: 'UTC-6' },
  { pais: 'Cuba', utc: 'UTC-4' },
  { pais: 'Ecuador', utc: 'UTC-5' },
  { pais: 'El Salvador', utc: 'UTC-6' },
  { pais: 'España (Peninsula)', utc: 'UTC+2' },
  { pais: 'Estados Unidos (Este)', utc: 'UTC-4' },
  { pais: 'Estados Unidos (Centro)', utc: 'UTC-5' },
  { pais: 'Estados Unidos (Montaña)', utc: 'UTC-6' },
  { pais: 'Estados Unidos (Pacífico)', utc: 'UTC-7' },
  { pais: 'Guatemala', utc: 'UTC-6' },
  { pais: 'Honduras', utc: 'UTC-6' },
  { pais: 'México (Centro)', utc: 'UTC-6' },
  { pais: 'México (Quintana Roo)', utc: 'UTC-5' },
  { pais: 'México (Baja California)', utc: 'UTC-7' },
  { pais: 'Nicaragua', utc: 'UTC-6' },
  { pais: 'Panamá', utc: 'UTC-5' },
  { pais: 'Paraguay', utc: 'UTC-3' },
  { pais: 'Perú', utc: 'UTC-5' },
  { pais: 'Puerto Rico', utc: 'UTC-4' },
  { pais: 'República Dominicana', utc: 'UTC-4' },
  { pais: 'Uruguay', utc: 'UTC-3' },
  { pais: 'Venezuela', utc: 'UTC-4' },
  { pais: 'Canadá (Toronto)', utc: 'UTC-4' },
  { pais: 'Canadá (Vancouver)', utc: 'UTC-7' },
]
