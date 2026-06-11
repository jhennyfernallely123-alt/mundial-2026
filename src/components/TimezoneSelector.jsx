import { useState, useRef, useEffect } from 'react'
import { useWorldCup } from '../context/WorldCupContext'
import { defaultTimezones } from '../utils/timezone'

export default function TimezoneSelector() {
  const { timezone, setTimezone, userOffset } = useWorldCup()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const current = defaultTimezones.find(t => t.utc === timezone) || { pais: `UTC ${userOffset >= 0 ? '+' : ''}${userOffset}`, utc: timezone }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full text-xs font-medium text-white transition-colors"
      >
        <span>🕐</span>
        <span>{current.pais}</span>
        <span className="text-white/60 text-[10px]">({timezone})</span>
        <span className={`transition-transform ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-200 z-50 w-56 max-h-72 overflow-y-auto">
          <div className="sticky top-0 bg-white px-3 py-2 border-b border-gray-100">
            <p className="text-xs font-bold text-gray-500 uppercase">Selecciona tu zona</p>
          </div>
          {defaultTimezones.map(tz => (
            <button
              key={tz.utc + tz.pais}
              onClick={() => { setTimezone(tz.utc); setOpen(false) }}
              className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-blue-50 transition-colors ${
                timezone === tz.utc ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700'
              }`}
            >
              <span>{tz.pais}</span>
              <span className="text-[10px] text-gray-400">{tz.utc}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
