import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'mundial2026_timezone'

export function parseUtcOffset(utcStr) {
  if (!utcStr) return 0
  const match = utcStr.match(/UTC([+-])(\d+)/)
  if (!match) return 0
  const sign = match[1] === '+' ? 1 : -1
  return sign * parseInt(match[2], 10)
}

export default function useTimezone() {
  const [timezone, setTimezoneState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'UTC-4'
    } catch { return 'UTC-4' }
  })

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, timezone) } catch {}
  }, [timezone])

  const userOffset = parseUtcOffset(timezone)

  const setTimezone = useCallback((tz) => {
    setTimezoneState(tz)
  }, [])

  return { timezone, userOffset, setTimezone }
}
