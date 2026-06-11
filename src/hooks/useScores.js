import { useState, useCallback, useEffect } from 'react'
import matchesData from '../data/matches.json'

const STORAGE_KEY = 'mundial2026_scores'

function loadScores() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {}
  // Initialize from matches data
  const initial = {}
  matchesData.forEach(m => {
    if (m.gol1 !== null && m.gol1 !== undefined) {
      initial[m.id] = { gol1: m.gol1, gol2: m.gol2 }
    }
  })
  return initial
}

export default function useScores() {
  const [scores, setScores] = useState(loadScores)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scores))
    } catch {}
  }, [scores])

  const setScore = useCallback((matchId, gol1, gol2) => {
    setScores(prev => {
      const next = { ...prev, [matchId]: { gol1, gol2 } }
      return next
    })
  }, [])

  const getScore = useCallback((matchId) => {
    return scores[matchId] || null
  }, [scores])

  const resetAll = useCallback(() => {
    const initial = {}
    matchesData.forEach(m => {
      if (m.gol1 !== null && m.gol1 !== undefined) {
        initial[m.id] = { gol1: m.gol1, gol2: m.gol2 }
      }
    })
    setScores(initial)
  }, [])

  return { scores, setScore, getScore, resetAll }
}
