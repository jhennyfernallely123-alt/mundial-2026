import { createContext, useContext } from 'react'
import useScores from '../hooks/useScores'
import useTimezone from '../hooks/useTimezone'

const WorldCupContext = createContext(null)

export function WorldCupProvider({ children }) {
  const scoresData = useScores()
  const tzData = useTimezone()

  return (
    <WorldCupContext.Provider value={{ ...scoresData, ...tzData }}>
      {children}
    </WorldCupContext.Provider>
  )
}

export function useWorldCup() {
  const ctx = useContext(WorldCupContext)
  if (!ctx) throw new Error('useWorldCup must be used within WorldCupProvider')
  return ctx
}
