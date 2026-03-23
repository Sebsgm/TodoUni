import React, { useState } from 'react'
import { useAppData }    from './hooks/useAppData'
import { genId }         from './utils/genId'
import Navbar            from './components/Navbar'
import {
  LandingPage,
  SchedulesListPage,
  ScheduleDetailPage,
  CalculatorPage,
  SettingsPage,
} from './pages/index'

export default function App() {
  const [data, setData] = useAppData()
  const [page, setPage] = useState('landing')
  const [selId, setSel] = useState(null)

  const dm = data.settings.darkMode
  const toggleDark = () =>
    setData((d) => ({ ...d, settings: { ...d.settings, darkMode: !d.settings.darkMode } }))

  /* ── Schedule actions ── */
  const createSchedule = (name) => {
    const s = { id: genId(), name, subjects: [] }
    setData((d) => ({ ...d, schedules: [...d.schedules, s] }))
    setSel(s.id); setPage('schedule')
  }
  const deleteSchedule = (id) =>
    setData((d) => ({ ...d, schedules: d.schedules.filter((s) => s.id !== id) }))
  const updateSchedule = (upd) =>
    setData((d) => ({ ...d, schedules: d.schedules.map((s) => (s.id === upd.id ? upd : s)) }))

  /* ── Calculator actions ── */
  const saveCalc = (calc) =>
    setData((d) => {
      const exists = d.calculators.find((c) => c.id === calc.id)
      return {
        ...d,
        calculators: exists
          ? d.calculators.map((c) => (c.id === calc.id ? calc : c))
          : [...d.calculators, calc],
      }
    })
  const delCalc = (id) =>
    setData((d) => ({ ...d, calculators: d.calculators.filter((c) => c.id !== id) }))

  /* ── Settings ── */
  const saveSettings = (s) =>
    setData((d) => ({ ...d, settings: { ...d.settings, ...s } }))

  const schedule = data.schedules.find((s) => s.id === selId)

  const navProps = { page, setPage, darkMode: dm, toggleDark }

  const renderPage = () => {
    if (page === 'landing')   return <LandingPage setPage={setPage} />
    if (page === 'schedules') return (
      <SchedulesListPage
        schedules={data.schedules}
        onSelect={(id) => { setSel(id); setPage('schedule') }}
        onDelete={deleteSchedule}
        onCreate={createSchedule}
      />
    )
    if (page === 'schedule' && schedule) return (
      <ScheduleDetailPage
        schedule={schedule}
        onUpdate={updateSchedule}
        onBack={() => setPage('schedules')}
        darkMode={dm}
        settings={data.settings}
      />
    )
    if (page === 'calculator') return (
      <CalculatorPage
        calculators={data.calculators}
        settings={data.settings}
        onSave={saveCalc}
        onDelete={delCalc}
      />
    )
    if (page === 'settings') return (
      <SettingsPage
        settings={data.settings}
        onSave={saveSettings}
        darkMode={dm}
        toggleDark={toggleDark}
      />
    )
    return <LandingPage setPage={setPage} />
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)', color: 'var(--text-pri)' }}>
      <Navbar {...navProps} />
      <div className="fade-in" key={page}>
        {renderPage()}
      </div>
    </div>
  )
}
