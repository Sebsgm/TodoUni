import { useState, useEffect } from 'react'

const DEFAULT_DATA = {
  schedules:   [],
  calculators: [],
  settings: {
    darkMode:     false,
    passingGrade: 3.0,
    maxGrade:     5.0,
  },
}

export function useAppData() {
  const [data, setData] = useState(() => {
    try {
      const raw = localStorage.getItem('todouni')
      if (raw) return { ...DEFAULT_DATA, ...JSON.parse(raw) }
    } catch { /* ignore */ }
    return DEFAULT_DATA
  })

  useEffect(() => {
    localStorage.setItem('todouni', JSON.stringify(data))
  }, [data])

  // Dark mode sync con DOM
  useEffect(() => {
    document.documentElement.setAttribute(
      'data-dark',
      data.settings.darkMode ? 'true' : 'false'
    )
  }, [data.settings.darkMode])

  return [data, setData]
}
