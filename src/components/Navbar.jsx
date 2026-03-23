import React from 'react'
import { CalendarIcon, CalculatorIcon, SettingsIcon, SunIcon, MoonIcon } from './Icons'

export default function Navbar({ page, setPage, darkMode, toggleDark }) {
  const navItem = (p, label, Icon) => {
    const active = page === p || (p === 'schedules' && page === 'schedule')
    return (
      <button
        onClick={() => setPage(p)}
        style={{
          display:    'flex',
          alignItems: 'center',
          gap:        6,
          padding:    '7px 15px',
          borderRadius: 8,
          border:     'none',
          cursor:     'pointer',
          fontFamily: 'Outfit, sans-serif',
          fontWeight: active ? 700 : 500,
          fontSize:   13.5,
          background: active ? 'var(--accent-soft)' : 'transparent',
          color:      active ? 'var(--accent)'      : 'var(--text-sec)',
          transition: 'all .15s',
        }}
      >
        <Icon size={15} />
        <span>{label}</span>
      </button>
    )
  }

  return (
    <nav style={{
      position:       'sticky',
      top:            0,
      zIndex:         200,
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'space-between',
      padding:        '10px 28px',
      background:     'var(--bg-card)',
      borderBottom:   '1px solid var(--border)',
      boxShadow:      '0 1px 0 var(--border)',
      backdropFilter: 'blur(12px)',
    }}>
      <div
        onClick={() => setPage('landing')}
        style={{
          display:    'flex',
          alignItems: 'baseline',
          gap:        1,
          cursor:     'pointer',
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          fontSize:   20,
          letterSpacing: '-0.5px',
          userSelect: 'none',
        }}
      >
        <span style={{ color: 'var(--accent)' }}>TODO</span>
        <span style={{ color: 'var(--text-pri)' }}>UNI</span>
      </div>

      <div style={{ display: 'flex', gap: 2 }}>
        {navItem('schedules',  'Horarios',  CalendarIcon)}
        {navItem('calculator', 'Notas',     CalculatorIcon)}
        {navItem('settings',   'Ajustes',   SettingsIcon)}
      </div>

      <button
        onClick={toggleDark}
        title={darkMode ? 'Modo claro' : 'Modo oscuro'}
        style={{
          display:    'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width:      34,
          height:     34,
          borderRadius: 8,
          border:     '1px solid var(--border)',
          background: 'var(--bg-page)',
          color:      'var(--text-sec)',
          cursor:     'pointer',
          transition: 'all .15s',
          flexShrink: 0,
        }}
      >
        {darkMode ? <SunIcon size={15} /> : <MoonIcon size={15} />}
      </button>
    </nav>
  )
}
