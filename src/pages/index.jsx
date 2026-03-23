import React, { useState, useRef, useEffect } from 'react'
import { DAYS, DAY_FULL } from '../utils/constants'
import { COLORS, colorSet } from '../utils/colors'
import { t2m } from '../utils/time'
import { genId } from '../utils/genId'
import { generatePDF } from '../utils/pdf'
import CalendarGrid from '../components/CalendarGrid'
import SubjectForm  from '../components/SubjectForm'
import {
  CalendarIcon, CalculatorIcon, LayersIcon, ShieldIcon,
  BookIcon, ChartIcon, GridIcon,
  DownloadIcon, PlusIcon, TrashIcon, EditIcon,
  CheckIcon, ArrowLeftIcon, CloseIcon,
} from '../components/Icons'

/* ─────────────────────────────────────────────
   LANDING
───────────────────────────────────────────── */
const features = [
  { Icon: CalendarIcon, title: 'Horario visual', desc: 'Vista semanal con bloques de color por materia, estilo Google Calendar. Franjas de 30 minutos.' },
  { Icon: ChartIcon,    title: 'Calculadora de notas', desc: 'Define tus cortes, asigna pesos y calcula exactamente cuánto necesitas para pasar.' },
  { Icon: LayersIcon,   title: 'Múltiples semestres', desc: 'Guarda tantos horarios como necesites. Cada uno con su nombre y materias independientes.' },
  { Icon: DownloadIcon, title: 'Exportar a PDF', desc: 'Descarga tu horario en un PDF limpio y bien diagramado, listo para imprimir o compartir.' },
  { Icon: ShieldIcon,   title: 'Sin cuenta',  desc: 'Todo se guarda en tu navegador. Sin registro, sin servidor, sin publicidad.' },
  { Icon: GridIcon,     title: 'Modo oscuro', desc: 'Disponible en modo claro y oscuro. Cambia cuando quieras desde ajustes.' },
]

export function LandingPage({ setPage }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)' }}>

      {/* Hero */}
      <section style={{
        padding: 'clamp(64px, 10vw, 100px) 24px clamp(56px, 8vw, 88px)',
        maxWidth: 820, margin: '0 auto', textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'var(--accent-soft)', border: '1px solid var(--border-s)',
          borderRadius: 30, padding: '5px 16px', marginBottom: 32,
          color: 'var(--accent)', fontSize: 13, fontWeight: 600,
        }}>
          <CalendarIcon size={13} />
          <span>Organizador universitario</span>
        </div>

        <h1 style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 900,
          fontSize: 'clamp(44px, 8vw, 80px)', lineHeight: 1.02,
          color: 'var(--text-pri)', marginBottom: 22, letterSpacing: '-1.5px',
        }}>
          TODO<span style={{ color: 'var(--accent)' }}>UNI</span>
        </h1>

        <p style={{
          fontSize: 'clamp(15px, 2.5vw, 18px)', color: 'var(--text-sec)',
          maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.7,
        }}>
          Crea horarios visuales, calcula cuánto necesitas para pasar y organiza
          tu semestre en cuestión de minutos.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => setPage('schedules')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'var(--accent)', color: '#fff', border: 'none',
              borderRadius: 10, padding: '13px 26px', fontSize: 15, fontWeight: 700,
              cursor: 'pointer', boxShadow: '0 4px 20px color-mix(in srgb, var(--accent) 35%, transparent)',
              fontFamily: 'Outfit, sans-serif', transition: 'background .15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-h)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
          >
            <CalendarIcon size={15} />
            Crear horario
          </button>
          <button
            onClick={() => setPage('calculator')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'var(--bg-card)', color: 'var(--text-pri)',
              border: '1.5px solid var(--border)', borderRadius: 10,
              padding: '13px 26px', fontSize: 15, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
            }}
          >
            <CalculatorIcon size={15} />
            Calculadora
          </button>
        </div>
      </section>

      {/* Divisor */}
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 24px' }}>
        <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />
      </div>

      {/* Features */}
      <section style={{ padding: 'clamp(48px, 7vw, 80px) 24px', maxWidth: 960, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 800,
          fontSize: 'clamp(22px, 4vw, 30px)', color: 'var(--text-pri)',
          marginBottom: 40, letterSpacing: '-0.5px',
        }}>
          Todo lo que necesitas para el semestre
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 1,
          border: '1px solid var(--border)',
          borderRadius: 16,
          overflow: 'hidden',
          background: 'var(--border)',
        }}>
          {features.map(({ Icon, title, desc }, i) => (
            <div key={i} style={{
              background: 'var(--bg-card)',
              padding: '28px 26px',
            }}>
              <div style={{
                width: 40, height: 40,
                background: 'var(--accent-soft)',
                borderRadius: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent)',
                marginBottom: 16,
              }}>
                <Icon size={20} />
              </div>
              <h3 style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-pri)', marginBottom: 8 }}>
                {title}
              </h3>
              <p style={{ fontSize: 13.5, color: 'var(--text-sec)', lineHeight: 1.65 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section style={{
        padding: 'clamp(48px, 7vw, 72px) 24px',
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border)',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 800,
          fontSize: 'clamp(20px, 3.5vw, 28px)', color: 'var(--text-pri)',
          marginBottom: 24, letterSpacing: '-0.5px',
        }}>
          Empieza en menos de un minuto
        </h2>
        <button
          onClick={() => setPage('schedules')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'var(--accent)', color: '#fff', border: 'none',
            borderRadius: 10, padding: '13px 26px', fontSize: 15, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
          }}
        >
          <CalendarIcon size={15} />
          Crear mi horario
        </button>
      </section>

      <footer style={{
        padding: '20px 24px',
        textAlign: 'center',
        color: 'var(--text-mut)',
        fontSize: 12.5,
        borderTop: '1px solid var(--border)',
      }}>
        Datos locales · Sin publicidad · Sin cuentas
      </footer>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SCHEDULES LIST
───────────────────────────────────────────── */
export function SchedulesListPage({ schedules, onSelect, onDelete, onCreate }) {
  const [creating, setCreating] = useState(false)
  const [name, setName]         = useState('')
  const nameRef                 = useRef()

  useEffect(() => { if (creating) nameRef.current?.focus() }, [creating])

  const doCreate = () => {
    if (!name.trim()) return
    onCreate(name.trim())
    setName(''); setCreating(false)
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg-page)',
      padding: '32px 24px', maxWidth: 960, margin: '0 auto',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', marginBottom: 28,
        flexWrap: 'wrap', gap: 12,
      }}>
        <div>
          <h1 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800,
            fontSize: 26, color: 'var(--text-pri)', letterSpacing: '-0.5px',
          }}>
            Mis Horarios
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text-mut)', marginTop: 3 }}>
            {schedules.length} horario{schedules.length !== 1 ? 's' : ''} guardado{schedules.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={() => setCreating(true)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            background: 'var(--accent)', color: '#fff', border: 'none',
            borderRadius: 9, padding: '10px 20px', fontWeight: 700,
            fontSize: 13.5, cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
          }}
        >
          <PlusIcon size={13} /> Nuevo horario
        </button>
      </div>

      {creating && (
        <div className="fade-in" style={{
          background: 'var(--bg-card)', border: '2px solid var(--accent)',
          borderRadius: 14, padding: 20, marginBottom: 20,
        }}>
          <h3 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 700,
            color: 'var(--text-pri)', marginBottom: 5, fontSize: 15,
          }}>
            Nombre del horario
          </h3>
          <p style={{ fontSize: 12.5, color: 'var(--text-mut)', marginBottom: 12 }}>
            Usa un nombre descriptivo, por ejemplo "Semestre 2025-1" o "Pregrado – Cuarto semestre".
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              ref={nameRef}
              placeholder="Ej: Semestre 2025-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && doCreate()}
              style={{
                flex: 1, padding: '10px 12px', borderRadius: 8,
                border: '1.5px solid var(--border)', background: 'var(--bg-page)',
                color: 'var(--text-pri)', fontSize: 14, outline: 'none',
                fontFamily: 'Outfit, sans-serif',
              }}
            />
            <button
              onClick={doCreate}
              style={{
                padding: '10px 18px', borderRadius: 8, border: 'none',
                background: 'var(--accent)', color: '#fff',
                fontWeight: 700, cursor: 'pointer',
                fontFamily: 'Outfit, sans-serif',
              }}
            >
              Crear
            </button>
            <button
              onClick={() => { setCreating(false); setName('') }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 40, padding: '10px', borderRadius: 8,
                border: '1px solid var(--border)', background: 'transparent',
                color: 'var(--text-sec)', cursor: 'pointer',
              }}
            >
              <CloseIcon size={13} />
            </button>
          </div>
        </div>
      )}

      {schedules.length === 0 && !creating ? (
        <div style={{
          textAlign: 'center', padding: '90px 20px',
          color: 'var(--text-mut)',
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: 18,
            background: 'var(--accent-soft)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
            color: 'var(--accent)',
          }}>
            <CalendarIcon size={32} />
          </div>
          <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: 'var(--text-sec)' }}>
            Sin horarios aún
          </p>
          <p style={{ fontSize: 13.5 }}>Crea tu primer horario para comenzar</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 16,
        }}>
          {schedules.map((sch) => {
            const cr = sch.subjects.reduce((a, s) => a + (s.credits || 0), 0)
            return (
              <div
                key={sch.id}
                className="card-hover"
                onClick={() => onSelect(sch.id)}
                style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 14, padding: 22, boxShadow: 'var(--shadow)',
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'flex-start', marginBottom: 13,
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{
                      fontFamily: 'Syne, sans-serif', fontWeight: 700,
                      fontSize: 16, color: 'var(--text-pri)', marginBottom: 4,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {sch.name}
                    </h3>
                    <p style={{ fontSize: 12.5, color: 'var(--text-mut)' }}>
                      {sch.subjects.length} materia{sch.subjects.length !== 1 ? 's' : ''} · {cr} cr.
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (window.confirm(`¿Eliminar "${sch.name}"?`)) onDelete(sch.id)
                    }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: 32, height: 32,
                      background: 'transparent', border: '1px solid transparent',
                      cursor: 'pointer', color: 'var(--text-mut)', borderRadius: 7,
                      flexShrink: 0, transition: 'all .12s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#FEE2E2'; e.currentTarget.style.color = '#DC2626' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-mut)' }}
                  >
                    <TrashIcon size={14} />
                  </button>
                </div>

                {sch.subjects.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 14 }}>
                    {sch.subjects.slice(0, 5).map((s) => {
                      const c = COLORS[s.ci % COLORS.length].l
                      return (
                        <span
                          key={s.id}
                          style={{
                            background: c.bg, color: c.tx,
                            border: `1px solid ${c.bd}`, borderRadius: 20,
                            padding: '2px 9px', fontSize: 11, fontWeight: 600,
                          }}
                        >
                          {s.name.length > 14 ? s.name.slice(0, 14) + '…' : s.name}
                        </span>
                      )
                    })}
                    {sch.subjects.length > 5 && (
                      <span style={{ fontSize: 11, color: 'var(--text-mut)', padding: '2px 6px' }}>
                        +{sch.subjects.length - 5}
                      </span>
                    )}
                  </div>
                )}

                <div style={{
                  fontSize: 12.5, color: 'var(--accent)', fontWeight: 700,
                  display: 'flex', alignItems: 'center', gap: 5,
                }}>
                  Abrir horario
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────
   SCHEDULE DETAIL
───────────────────────────────────────────── */
function useWindowWidth() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  useEffect(() => {
    const handler = () => setW(window.innerWidth)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return w
}

export function ScheduleDetailPage({ schedule, onUpdate, onBack, darkMode, settings }) {
  const [editingName, setEditingName] = useState(false)
  const [nameVal, setNameVal]         = useState(schedule.name)
  const nameInputRef                  = useRef()
  const width                         = useWindowWidth()
  const isMobile                      = width < 760

  useEffect(() => { if (editingName) nameInputRef.current?.focus() }, [editingName])

  const saveName = () => {
    const trimmed = nameVal.trim()
    if (trimmed) onUpdate({ ...schedule, name: trimmed })
    else setNameVal(schedule.name)
    setEditingName(false)
  }

  const addSub  = (s) => onUpdate({ ...schedule, subjects: [...schedule.subjects, s] })
  const delSub  = (id) => onUpdate({ ...schedule, subjects: schedule.subjects.filter((s) => s.id !== id) })
  const totalCr = schedule.subjects.reduce((a, s) => a + (s.credits || 0), 0)

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg-page)',
      padding: '24px 20px', maxWidth: 1200, margin: '0 auto',
    }}>
      {/* ── Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        marginBottom: 24, flexWrap: 'wrap',
      }}>
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 8, padding: '8px 14px', cursor: 'pointer',
            color: 'var(--text-sec)', fontSize: 13.5, flexShrink: 0,
            fontFamily: 'Outfit, sans-serif',
          }}
        >
          <ArrowLeftIcon size={13} /> Volver
        </button>

        {/* Título editable */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
          {editingName ? (
            <div style={{ display: 'flex', gap: 6, flex: 1, minWidth: 0 }}>
              <input
                ref={nameInputRef}
                value={nameVal}
                onChange={(e) => setNameVal(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') saveName(); if (e.key === 'Escape') { setNameVal(schedule.name); setEditingName(false) } }}
                onBlur={saveName}
                style={{
                  flex: 1, padding: '8px 12px', borderRadius: 8, minWidth: 0,
                  border: '2px solid var(--accent)', background: 'var(--bg-card)',
                  color: 'var(--text-pri)', fontSize: 18, fontWeight: 700,
                  fontFamily: 'Syne, sans-serif', outline: 'none',
                }}
              />
              <button
                onMouseDown={(e) => { e.preventDefault(); saveName() }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 38, height: 38, border: 'none',
                  background: 'var(--accent)', color: '#fff',
                  borderRadius: 8, cursor: 'pointer', flexShrink: 0,
                }}
              >
                <CheckIcon size={15} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
              <h1 style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 22,
                color: 'var(--text-pri)', overflow: 'hidden',
                textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                letterSpacing: '-0.5px',
              }}>
                {schedule.name}
              </h1>
              <button
                onClick={() => { setNameVal(schedule.name); setEditingName(true) }}
                title="Renombrar horario"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 30, height: 30, border: '1px solid var(--border)',
                  background: 'transparent', color: 'var(--text-mut)',
                  borderRadius: 7, cursor: 'pointer', flexShrink: 0,
                  transition: 'all .12s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-mut)'; e.currentTarget.style.borderColor = 'var(--border)' }}
              >
                <EditIcon size={12} />
              </button>
            </div>
          )}

          {!editingName && (
            <p style={{ fontSize: 12.5, color: 'var(--text-mut)', whiteSpace: 'nowrap', flexShrink: 0 }}>
              {schedule.subjects.length} materia{schedule.subjects.length !== 1 ? 's' : ''} · {totalCr} cr.
            </p>
          )}
        </div>

        <button
          onClick={() => generatePDF(schedule, settings)}
          disabled={!schedule.subjects.length}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            background: schedule.subjects.length ? 'var(--accent)' : 'var(--border)',
            color: schedule.subjects.length ? '#fff' : 'var(--text-mut)',
            border: 'none', borderRadius: 9, padding: '10px 18px',
            fontWeight: 700, fontSize: 13.5,
            cursor: schedule.subjects.length ? 'pointer' : 'not-allowed',
            flexShrink: 0, fontFamily: 'Outfit, sans-serif',
          }}
        >
          <DownloadIcon size={14} /> Descargar PDF
        </button>
      </div>

      {/* ── Layout: panel + calendario */}
      <div style={{
        display: 'flex', gap: 18, alignItems: 'flex-start',
        flexDirection: isMobile ? 'column' : 'row',
      }}>
        {/* Panel izquierdo */}
        <div style={{
          width: isMobile ? '100%' : 296,
          flexShrink: 0,
          display: 'flex', flexDirection: 'column', gap: 14,
        }}>
          <SubjectForm onAdd={addSub} count={schedule.subjects.length} />

          {schedule.subjects.length > 0 && (
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 14, padding: '16px 14px',
            }}>
              <h3 style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14,
                color: 'var(--text-pri)', marginBottom: 12,
              }}>
                Materias ({schedule.subjects.length})
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {schedule.subjects.map((s) => {
                  const c = colorSet(s.ci, darkMode)
                  return (
                    <div
                      key={s.id}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '8px 10px', borderRadius: 9,
                        background: c.bg, border: `1px solid ${c.bd}`,
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          color: c.tx, fontWeight: 700, fontSize: 12.5,
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>
                          {s.name}
                        </div>
                        <div style={{ color: c.tx, fontSize: 11, opacity: .75, marginTop: 1 }}>
                          {s.days.join(', ')} · {s.start}–{s.end} · {s.credits}cr
                        </div>
                      </div>
                      <button
                        onClick={() => delSub(s.id)}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          width: 24, height: 24,
                          background: 'transparent', border: 'none',
                          cursor: 'pointer', color: c.tx, opacity: .5,
                          flexShrink: 0, borderRadius: 5, transition: 'opacity .12s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '.5')}
                        title="Eliminar materia"
                      >
                        <CloseIcon size={12} />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Calendario */}
        <div style={{
          flex: 1, minWidth: 0,
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 14, padding: '16px 14px', overflow: 'hidden',
        }}>
          <h3 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14,
            color: 'var(--text-pri)', marginBottom: 14,
          }}>
            Vista semanal
          </h3>
          <CalendarGrid subjects={schedule.subjects} darkMode={darkMode} />
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   CALCULATOR
───────────────────────────────────────────── */
const fmtG = (n) => Number(n).toFixed(2)

function computeResult(calc, settings) {
  const { passingGrade: pass, maxGrade: max } = settings
  if (!calc.cuts.length) return { achieved: 0, needed: null, canPass: null, totalW: 0, pendingW: 0 }

  const hasGrade = (c) => c.grade !== '' && c.grade !== null && c.grade !== undefined
  const graded   = calc.cuts.filter(hasGrade)
  const pending  = calc.cuts.filter((c) => !hasGrade(c))
  const totalW   = calc.cuts.reduce((a, c) => a + (Number(c.weight) || 0), 0)
  const pendingW = pending.reduce((a, c) => a + (Number(c.weight) || 0), 0)
  const achieved = graded.reduce((a, c) => a + (Number(c.grade) || 0) * (Number(c.weight) || 0) / 100, 0)

  if (pendingW === 0) return { achieved, needed: null, canPass: achieved >= pass, totalW, pendingW }
  const needed = (pass - achieved) * 100 / pendingW
  return { achieved, needed, canPass: needed <= max, totalW, pendingW }
}

export function CalculatorPage({ calculators, settings, onSave, onDelete }) {
  const [selId,   setSelId] = useState(null)
  const [creating, setCr]  = useState(false)
  const [newName,  setNm]  = useState('')

  const calc = selId ? calculators.find((c) => c.id === selId) : null

  const doCreate = () => {
    if (!newName.trim()) return
    const nc = { id: genId(), name: newName.trim(), cuts: [] }
    onSave(nc); setNm(''); setCr(false); setSelId(nc.id)
  }

  const upCalc = (updated) => onSave(updated)
  const addCut = () => {
    if (!calc) return
    const used = calc.cuts.reduce((a, c) => a + (Number(c.weight) || 0), 0)
    if (used >= 100) return
    upCalc({ ...calc, cuts: [...calc.cuts, {
      id: genId(), name: `Corte ${calc.cuts.length + 1}`,
      weight: Math.min(100 - used, 25), grade: '',
    }]})
  }
  const updCut = (id, field, val) =>
    upCalc({ ...calc, cuts: calc.cuts.map((c) => c.id === id ? { ...c, [field]: val } : c) })
  const delCut = (id) =>
    upCalc({ ...calc, cuts: calc.cuts.filter((c) => c.id !== id) })

  const inp = {
    padding: '9px 10px', borderRadius: 8,
    border: '1.5px solid var(--border)', background: 'var(--bg-page)',
    color: 'var(--text-pri)', fontSize: 13.5, outline: 'none', width: '100%',
    fontFamily: 'Outfit, sans-serif',
  }

  /* ── Vista de una calculadora */
  if (calc) {
    const r = computeResult(calc, settings)
    const statusClr =
      r.needed === null
        ? (r.canPass === null ? 'var(--text-mut)' : r.canPass ? 'var(--success)' : 'var(--danger)')
        : r.needed <= 0   ? 'var(--success)'
        : r.canPass       ? 'var(--warning)'
        : 'var(--danger)'

    const statusLabel =
      r.needed === null
        ? (r.canPass === null ? 'Sin notas' : r.canPass ? 'Aprobaste' : 'No aprobaste')
        : r.needed <= 0 ? 'Ya aprobaste'
        : r.canPass     ? `Necesitas ${fmtG(r.needed)}`
        : 'Imposible aprobar'

    return (
      <div style={{
        minHeight: '100vh', background: 'var(--bg-page)',
        padding: '28px 20px', maxWidth: 660, margin: '0 auto',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center',
          gap: 10, marginBottom: 26, flexWrap: 'wrap',
        }}>
          <button
            onClick={() => setSelId(null)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 8, padding: '8px 14px', cursor: 'pointer',
              color: 'var(--text-sec)', fontSize: 13.5, fontFamily: 'Outfit, sans-serif',
            }}
          >
            <ArrowLeftIcon size={13} /> Volver
          </button>
          <h1 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 22,
            color: 'var(--text-pri)', flex: 1, letterSpacing: '-0.5px',
          }}>
            {calc.name}
          </h1>
          <button
            onClick={() => { if (window.confirm(`¿Eliminar "${calc.name}"?`)) { onDelete(calc.id); setSelId(null) } }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 36, height: 36,
              background: 'transparent', border: '1px solid var(--border)',
              borderRadius: 8, cursor: 'pointer', color: 'var(--text-mut)',
              transition: 'all .12s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#FEE2E2'; e.currentTarget.style.color = '#DC2626'; e.currentTarget.style.borderColor = '#FCA5A5' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-mut)'; e.currentTarget.style.borderColor = 'var(--border)' }}
          >
            <TrashIcon size={14} />
          </button>
        </div>

        {/* Resultado */}
        <div style={{
          background: 'var(--bg-card)', border: `2px solid ${statusClr}`,
          borderRadius: 14, padding: 24, marginBottom: 18,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
          }}>
            <div>
              <p style={{ fontSize: 12.5, color: 'var(--text-mut)', marginBottom: 4 }}>
                Nota acumulada
              </p>
              <p style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 900,
                fontSize: 40, color: 'var(--text-pri)', lineHeight: 1,
              }}>
                {fmtG(r.achieved)}
              </p>
              <p style={{ fontSize: 12, color: 'var(--text-mut)', marginTop: 3 }}>
                de {settings.maxGrade} · mínimo {settings.passingGrade}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{
                display: 'inline-block',
                background: `${statusClr}22`,
                color: statusClr, border: `1.5px solid ${statusClr}55`,
                borderRadius: 8, padding: '8px 16px',
                fontWeight: 700, fontSize: 14,
              }}>
                {statusLabel}
              </span>
              {r.needed !== null && r.needed > 0 && r.canPass && (
                <p style={{ fontSize: 12, color: 'var(--text-mut)', marginTop: 8 }}>
                  en el {fmtG(r.pendingW)}% restante
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Pills de info */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
          {[
            ['Nota mínima', `${settings.passingGrade} / ${settings.maxGrade}`, null],
            ['Peso acumulado', `${r.totalW}%`, r.totalW === 100 ? 'var(--success)' : r.totalW > 0 ? 'var(--warning)' : null],
          ].map(([k, v, clr]) => (
            <div key={k} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 9, padding: '8px 14px', fontSize: 13,
            }}>
              <span style={{ color: 'var(--text-mut)' }}>{k}: </span>
              <strong style={{ color: clr || 'var(--text-pri)' }}>{v}</strong>
            </div>
          ))}
        </div>

        {/* Tabla de cortes */}
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 14, padding: '20px 18px',
        }}>
          <h3 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 700,
            color: 'var(--text-pri)', marginBottom: 16, fontSize: 15,
          }}>
            Cortes de evaluación
          </h3>

          {calc.cuts.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 76px 76px 32px',
                gap: 8, fontSize: 10.5, fontWeight: 700,
                color: 'var(--text-mut)', letterSpacing: '.08em', paddingBottom: 4,
                borderBottom: '1px solid var(--border)',
              }}>
                <span>NOMBRE</span>
                <span style={{ textAlign: 'center' }}>PESO %</span>
                <span style={{ textAlign: 'center' }}>NOTA</span>
                <span />
              </div>
              {calc.cuts.map((cut) => {
                const hg = cut.grade !== '' && cut.grade !== null && cut.grade !== undefined
                const ok = hg && Number(cut.grade) >= settings.passingGrade
                return (
                  <div key={cut.id} style={{
                    display: 'grid', gridTemplateColumns: '1fr 76px 76px 32px',
                    gap: 8, alignItems: 'center',
                  }}>
                    <input
                      value={cut.name}
                      onChange={(e) => updCut(cut.id, 'name', e.target.value)}
                      style={{ ...inp, fontSize: 13 }}
                    />
                    <input
                      type="number" min={0} max={100}
                      value={cut.weight}
                      onChange={(e) => updCut(cut.id, 'weight', e.target.value)}
                      style={{ ...inp, fontSize: 13, textAlign: 'center' }}
                    />
                    <input
                      type="number" min={0} max={settings.maxGrade} step={0.1}
                      placeholder="—"
                      value={cut.grade}
                      onChange={(e) => updCut(cut.id, 'grade', e.target.value)}
                      style={{
                        ...inp, fontSize: 13, textAlign: 'center',
                        background:  hg ? (ok ? '#D6F5E8' : '#FFD6DA') : 'var(--bg-page)',
                        color:       hg ? (ok ? '#0F5C36' : '#7A1525') : 'var(--text-pri)',
                        borderColor: hg ? (ok ? '#8EE5C0' : '#FFA0AA') : 'var(--border)',
                      }}
                    />
                    <button
                      onClick={() => delCut(cut.id)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: 32, height: 32,
                        background: 'transparent', border: 'none',
                        cursor: 'pointer', color: 'var(--text-mut)',
                        borderRadius: 6, transition: 'color .12s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--danger)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-mut)')}
                    >
                      <CloseIcon size={12} />
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          {calc.cuts.length === 0 && (
            <p style={{ color: 'var(--text-mut)', fontSize: 13.5, padding: '14px 0' }}>
              Agrega cortes para calcular tu nota.
            </p>
          )}

          <button
            onClick={addCut}
            style={{
              marginTop: 14, width: '100%', padding: '10px',
              borderRadius: 9, border: '1.5px dashed var(--border)',
              background: 'transparent', color: 'var(--text-sec)',
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 600, fontSize: 13.5, cursor: 'pointer',
            }}
          >
            + Agregar corte
          </button>
        </div>
      </div>
    )
  }

  /* ── Lista de calculadoras */
  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg-page)',
      padding: '32px 20px', maxWidth: 880, margin: '0 auto',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', marginBottom: 28,
        flexWrap: 'wrap', gap: 12,
      }}>
        <div>
          <h1 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 26,
            color: 'var(--text-pri)', letterSpacing: '-0.5px',
          }}>
            Calculadora de Notas
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text-mut)', marginTop: 3 }}>
            Mínimo para aprobar: <strong style={{ color: 'var(--text-sec)' }}>{settings.passingGrade} / {settings.maxGrade}</strong>
          </p>
        </div>
        <button
          onClick={() => setCr(true)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            background: 'var(--accent)', color: '#fff', border: 'none',
            borderRadius: 9, padding: '10px 20px', fontWeight: 700,
            fontSize: 13.5, cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
          }}
        >
          <PlusIcon size={13} /> Nueva materia
        </button>
      </div>

      {creating && (
        <div className="fade-in" style={{
          background: 'var(--bg-card)', border: '2px solid var(--accent)',
          borderRadius: 14, padding: 20, marginBottom: 20,
        }}>
          <h3 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 700,
            color: 'var(--text-pri)', marginBottom: 12, fontSize: 15,
          }}>
            Nueva calculadora
          </h3>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              placeholder="Nombre de la materia"
              value={newName}
              onChange={(e) => setNm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && doCreate()}
              autoFocus
              style={{
                flex: 1, padding: '9px 12px', borderRadius: 8,
                border: '1.5px solid var(--border)', background: 'var(--bg-page)',
                color: 'var(--text-pri)', fontSize: 14, outline: 'none',
                fontFamily: 'Outfit, sans-serif',
              }}
            />
            <button
              onClick={doCreate}
              style={{
                padding: '9px 18px', borderRadius: 8, border: 'none',
                background: 'var(--accent)', color: '#fff',
                fontWeight: 700, cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
              }}
            >
              Crear
            </button>
            <button
              onClick={() => { setCr(false); setNm('') }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 40, borderRadius: 8, border: '1px solid var(--border)',
                background: 'transparent', color: 'var(--text-sec)', cursor: 'pointer',
              }}
            >
              <CloseIcon size={13} />
            </button>
          </div>
        </div>
      )}

      {calculators.length === 0 && !creating ? (
        <div style={{ textAlign: 'center', padding: '90px 20px', color: 'var(--text-mut)' }}>
          <div style={{
            width: 72, height: 72, borderRadius: 18,
            background: 'var(--accent-soft)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
            color: 'var(--accent)',
          }}>
            <CalculatorIcon size={32} />
          </div>
          <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: 'var(--text-sec)' }}>
            Sin calculadoras
          </p>
          <p style={{ fontSize: 13.5 }}>
            Crea una para saber cuánto necesitas en cada materia
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 14,
        }}>
          {calculators.map((c) => {
            const r = computeResult(c, settings)
            const statusClr =
              r.needed === null
                ? (r.canPass === null ? 'var(--text-mut)' : r.canPass ? 'var(--success)' : 'var(--danger)')
                : r.needed <= 0  ? 'var(--success)'
                : r.canPass      ? 'var(--warning)'
                : 'var(--danger)'
            const badge =
              r.needed === null
                ? (r.canPass === null ? 'Sin notas' : r.canPass ? 'Aprobaste' : 'No aprobaste')
                : r.needed <= 0 ? 'Ya aprobaste'
                : r.canPass     ? `Necesitas ${fmtG(r.needed)}`
                : 'Imposible'

            return (
              <div
                key={c.id}
                className="card-hover"
                onClick={() => setSelId(c.id)}
                style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 14, padding: 20, boxShadow: 'var(--shadow)', cursor: 'pointer',
                }}
              >
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'flex-start', marginBottom: 12,
                }}>
                  <h3 style={{
                    fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 16,
                    color: 'var(--text-pri)', flex: 1, marginRight: 8,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {c.name}
                  </h3>
                  <span style={{
                    fontSize: 11, fontWeight: 700, color: statusClr,
                    background: `${statusClr}1A`, padding: '3px 9px',
                    borderRadius: 20, whiteSpace: 'nowrap', flexShrink: 0,
                    border: `1px solid ${statusClr}33`,
                  }}>
                    {badge}
                  </span>
                </div>
                <p style={{ fontSize: 12.5, color: 'var(--text-mut)', marginBottom: 14 }}>
                  {c.cuts.length} corte{c.cuts.length !== 1 ? 's' : ''} · Acumulado: {fmtG(r.achieved)}
                </p>
                <div style={{
                  fontSize: 12.5, color: 'var(--accent)', fontWeight: 700,
                  display: 'flex', alignItems: 'center', gap: 5,
                }}>
                  Ver detalles
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────
   SETTINGS
───────────────────────────────────────────── */
export function SettingsPage({ settings, onSave, darkMode, toggleDark }) {
  const [f, setF]         = useState({ ...settings })
  const [saved, setSaved] = useState(false)

  const save = () => {
    onSave({ ...f, passingGrade: Number(f.passingGrade), maxGrade: Number(f.maxGrade) })
    setSaved(true); setTimeout(() => setSaved(false), 2200)
  }

  const inp = {
    padding: '10px 13px', borderRadius: 9,
    border: '1.5px solid var(--border)', background: 'var(--bg-page)',
    color: 'var(--text-pri)', fontSize: 15, outline: 'none', width: '100%',
    fontFamily: 'Outfit, sans-serif',
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg-page)',
      padding: '32px 20px', maxWidth: 500, margin: '0 auto',
    }}>
      <h1 style={{
        fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 26,
        color: 'var(--text-pri)', marginBottom: 28, letterSpacing: '-0.5px',
      }}>
        Ajustes
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Modo oscuro */}
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 14, padding: 22,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <h3 style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-pri)', marginBottom: 3 }}>
              Modo oscuro
            </h3>
            <p style={{ fontSize: 12.5, color: 'var(--text-mut)' }}>
              Alterna entre modo claro y oscuro
            </p>
          </div>
          <button
            className="toggle-track"
            onClick={toggleDark}
            style={{ background: darkMode ? 'var(--accent)' : 'var(--border)', flexShrink: 0 }}
          >
            <div className="toggle-thumb" style={{ left: darkMode ? 25 : 3 }} />
          </button>
        </div>

        {/* Escala de notas */}
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 14, padding: 22,
        }}>
          <h3 style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-pri)', marginBottom: 4 }}>
            Escala de notas
          </h3>
          <p style={{ fontSize: 12.5, color: 'var(--text-mut)', marginBottom: 18 }}>
            Usada como referencia en la calculadora
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {[['passingGrade', 'MÍNIMO PARA PASAR', 0.1], ['maxGrade', 'NOTA MÁXIMA', 0.5]].map(([k, lbl, step]) => (
              <div key={k}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--text-mut)', marginBottom: 6, letterSpacing: '.07em' }}>
                  {lbl}
                </div>
                <input
                  type="number" step={step} min={0}
                  value={f[k]}
                  onChange={(e) => setF((p) => ({ ...p, [k]: e.target.value }))}
                  style={inp}
                />
              </div>
            ))}
          </div>
          <p style={{ marginTop: 12, fontSize: 12.5, color: 'var(--text-mut)' }}>
            Escala: 0 – {f.maxGrade} · Mínimo: {f.passingGrade}
          </p>
        </div>

        <button
          onClick={save}
          style={{
            padding: '13px', borderRadius: 10, border: 'none',
            background: saved ? 'var(--success)' : 'var(--accent)',
            color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer',
            fontFamily: 'Outfit, sans-serif',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            transition: 'background .25s',
          }}
        >
          {saved ? <><CheckIcon size={15} /> Guardado</> : 'Guardar cambios'}
        </button>

        {/* Zona de peligro */}
        <div style={{
          background: 'var(--bg-card)', border: '1px solid #FFBBBB',
          borderRadius: 14, padding: 20,
        }}>
          <h3 style={{ fontWeight: 700, fontSize: 14, color: '#CC2222', marginBottom: 5 }}>
            Zona de peligro
          </h3>
          <p style={{ fontSize: 12.5, color: 'var(--text-mut)', marginBottom: 14 }}>
            Borra todos tus horarios y calculadoras. No se puede deshacer.
          </p>
          <button
            onClick={() => {
              if (window.confirm('¿Seguro? Se borrarán todos tus datos.')) {
                localStorage.removeItem('todouni'); window.location.reload()
              }
            }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '9px 18px', borderRadius: 9,
              border: '1.5px solid #FF9999', background: 'transparent',
              color: '#CC2222', fontWeight: 600, fontSize: 13.5,
              cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
            }}
          >
            <TrashIcon size={13} /> Borrar todos mis datos
          </button>
        </div>
      </div>
    </div>
  )
}
