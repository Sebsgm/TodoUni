import React, { useMemo } from 'react'
import { DAYS, DAY_FULL, DAY_JS } from '../utils/constants'
import { t2m, buildSlots } from '../utils/time'
import { colorSet } from '../utils/colors'

const ROW_H   = 28   // altura de cada fila de 30 min (px)
const TIME_W  = 64   // ancho de la columna de hora (px)
const HEAD_H  = 36   // altura de la fila de encabezados de día

export default function CalendarGrid({ subjects, darkMode }) {
  const now        = new Date()
  const todayWD    = now.getDay()
  const curMinutes = now.getHours() * 60 + now.getMinutes()

  const { startH, endH, slots } = useMemo(() => {
    if (!subjects.length) return { startH: 7, endH: 18, slots: buildSlots(7, 18) }
    const mins = subjects.flatMap((s) => [t2m(s.start), t2m(s.end)])
    const sH   = Math.floor(Math.min(...mins) / 60)
    const eH   = Math.ceil (Math.max(...mins) / 60)
    return { startH: sH, endH: eH, slots: buildSlots(sH, eH) }
  }, [subjects])

  if (!subjects.length) {
    return (
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center',
        justifyContent:'center', padding:'60px 20px', color:'var(--text-mut)', textAlign:'center' }}>
        <div style={{ fontSize:48, marginBottom:14 }}>📆</div>
        <p style={{ fontWeight:600, fontSize:15, marginBottom:6, color:'var(--text-sec)' }}>
          Sin materias todavía
        </p>
        <p style={{ fontSize:13 }}>Agrega una materia y aparecerá aquí como bloque de color</p>
      </div>
    )
  }

  // Cuántas filas de 30 min hay
  const totalRows = (endH - startH) * 2

  return (
    <div style={{ overflowX: 'auto', overflowY: 'visible' }}>
      <div style={{ minWidth: 520 }}>
        {/* ── ENCABEZADO DE DÍAS ── */}
        <div style={{ display: 'flex', marginLeft: TIME_W }}>
          {DAYS.map((day) => {
            const isToday = DAY_JS[day] === todayWD
            return (
              <div
                key={day}
                style={{
                  flex: 1,
                  height: HEAD_H,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 13,
                  color: isToday ? 'var(--accent)' : 'var(--text-sec)',
                  background: isToday ? 'var(--accent-soft)' : 'var(--bg-card2)',
                  borderBottom: `2px solid ${isToday ? 'var(--accent)' : 'var(--border)'}`,
                  borderRight: '1px solid var(--border)',
                  letterSpacing: '.02em',
                }}
              >
                <span style={{ display: 'none' }} className="day-short">{day}</span>
                <span className="day-full">{DAY_FULL[day]}</span>
              </div>
            )
          })}
        </div>

        {/* ── BODY: columna de horas + columnas de días ── */}
        <div style={{ display: 'flex', position: 'relative' }}>
          {/* Columna de tiempos */}
          <div style={{ width: TIME_W, flexShrink: 0 }}>
            {slots.map((slot, i) => {
              const isHour = slot.endsWith(':00')
              return (
                <div
                  key={slot}
                  style={{
                    height: ROW_H,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingRight: 8,
                    fontSize: isHour ? 11 : 10,
                    fontWeight: isHour ? 700 : 400,
                    color: isHour ? 'var(--text-sec)' : 'var(--text-mut)',
                    borderTop: `1px solid ${isHour ? 'var(--grid-line)' : 'transparent'}`,
                    userSelect: 'none',
                  }}
                >
                  {slot}
                </div>
              )
            })}
          </div>

          {/* Columnas por día */}
          {DAYS.map((day) => {
            const isToday    = DAY_JS[day] === todayWD
            const daySubs    = subjects.filter((s) => s.days.includes(day))
            const colH       = totalRows * ROW_H

            return (
              <div
                key={day}
                style={{
                  flex: 1,
                  position: 'relative',
                  height: colH,
                  borderLeft: '1px solid var(--border)',
                  background: isToday ? 'rgba(139,92,246,0.03)' : 'transparent',
                }}
              >
                {/* Líneas horizontales por cada slot */}
                {slots.map((slot, i) => {
                  const isHour = slot.endsWith(':00')
                  return (
                    <div
                      key={slot}
                      style={{
                        position: 'absolute',
                        top: i * ROW_H,
                        left: 0, right: 0, height: 1,
                        background: isHour ? 'var(--grid-line)' : 'var(--grid-half)',
                      }}
                    />
                  )
                })}

                {/* Línea de hora actual */}
                {isToday &&
                  curMinutes >= startH * 60 &&
                  curMinutes <= endH * 60 && (
                    <div
                      style={{
                        position: 'absolute',
                        top: ((curMinutes - startH * 60) / 30) * ROW_H,
                        left: 0, right: 0, height: 2,
                        background: '#EF4444',
                        zIndex: 6,
                        borderRadius: 1,
                      }}
                    >
                      <div style={{
                        position: 'absolute', left: -4, top: -3,
                        width: 8, height: 8, borderRadius: '50%', background: '#EF4444',
                      }} />
                    </div>
                  )}

                {/* Bloques de materias */}
                {daySubs.map((sub) => {
                  const sm     = t2m(sub.start)
                  const em     = t2m(sub.end)
                  const topPx  = ((sm - startH * 60) / 30) * ROW_H
                  const heightPx = Math.max(((em - sm) / 30) * ROW_H - 1, ROW_H - 1)
                  const c      = colorSet(sub.ci, darkMode)

                  return (
                    <div
                      key={sub.id}
                      style={{
                        position: 'absolute',
                        top:    topPx + 0.5,
                        left:   1,
                        right:  1,
                        height: heightPx,
                        background:  c.bg,
                        borderLeft:  `3.5px solid ${c.bd}`,
                        borderRadius: 5,
                        padding:     '3px 5px',
                        overflow:    'hidden',
                        zIndex:      3,
                        boxShadow:   `0 1px 4px ${c.bd}55`,
                      }}
                    >
                      <div style={{
                        color:        c.tx,
                        fontWeight:   700,
                        fontSize:     11,
                        lineHeight:   1.25,
                        overflow:     'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace:   'nowrap',
                      }}>
                        {sub.name}
                      </div>
                      {heightPx > 34 && (
                        <div style={{ color: c.tx, fontSize: 10, opacity: 0.75, marginTop: 1 }}>
                          {sub.start} – {sub.end}
                        </div>
                      )}
                      {heightPx > 52 && sub.credits > 0 && (
                        <div style={{ color: c.tx, fontSize: 10, opacity: 0.6, marginTop: 1 }}>
                          {sub.credits} cr.
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
