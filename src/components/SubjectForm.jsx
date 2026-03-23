import React, { useState } from 'react'
import { DAYS } from '../utils/constants'
import { COLORS } from '../utils/colors'
import { t2m } from '../utils/time'
import { genId } from '../utils/genId'
import { PlusIcon } from './Icons'

const EMPTY = { name: '', days: [], start: '07:00', end: '09:00', credits: 3 }

export default function SubjectForm({ onAdd, count }) {
  const [f,   setF]   = useState(EMPTY)
  const [err, setErr] = useState('')

  const toggle = (d) =>
    setF((p) => ({
      ...p,
      days: p.days.includes(d) ? p.days.filter((x) => x !== d) : [...p.days, d],
    }))

  const submit = () => {
    if (!f.name.trim())             return setErr('Escribe el nombre de la materia')
    if (!f.days.length)             return setErr('Selecciona al menos un día')
    if (t2m(f.start) >= t2m(f.end)) return setErr('La hora de fin debe ser mayor a la de inicio')
    setErr('')
    onAdd({
      ...f,
      id:      genId(),
      ci:      count % COLORS.length,
      name:    f.name.trim(),
      credits: Number(f.credits) || 0,
    })
    setF(EMPTY)
  }

  const inp = {
    width: '100%', padding: '9px 11px', borderRadius: 8,
    border: '1.5px solid var(--border)', background: 'var(--bg-page)',
    color: 'var(--text-pri)', fontSize: 13.5, outline: 'none',
    fontFamily: 'Outfit, sans-serif',
  }

  const previewColor = COLORS[count % COLORS.length].l

  return (
    <div style={{
      background: 'var(--bg-card)',
      border:     '1px solid var(--border)',
      borderRadius: 14,
      padding: 18,
    }}>
      <h3 style={{
        fontFamily: 'Syne, sans-serif',
        fontWeight: 700,
        fontSize: 14,
        color: 'var(--text-pri)',
        marginBottom: 15,
        display: 'flex',
        alignItems: 'center',
        gap: 7,
      }}>
        <span style={{ color: 'var(--accent)', display: 'flex' }}>
          <PlusIcon size={14} />
        </span>
        Agregar materia
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        <input
          placeholder="Nombre (ej: Cálculo I)"
          value={f.name}
          onChange={(e) => setF((p) => ({ ...p, name: e.target.value }))}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          style={inp}
        />

        <div>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--text-mut)',
            marginBottom: 6, letterSpacing: '0.08em' }}>DÍAS</div>
          <div style={{ display: 'flex', gap: 4 }}>
            {DAYS.map((d) => {
              const active = f.days.includes(d)
              return (
                <button
                  key={d}
                  onClick={() => toggle(d)}
                  style={{
                    flex: 1, padding: '7px 0', borderRadius: 7, cursor: 'pointer',
                    border: '1.5px solid',
                    borderColor:  active ? 'var(--accent)'    : 'var(--border)',
                    background:   active ? 'var(--accent)'    : 'var(--bg-page)',
                    color:        active ? '#fff'             : 'var(--text-sec)',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 700, fontSize: 12, transition: 'all .12s',
                  }}
                >
                  {d}
                </button>
              )
            })}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 76px', gap: 8 }}>
          {[['start', 'INICIO'], ['end', 'FIN']].map(([k, lbl]) => (
            <div key={k}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--text-mut)',
                marginBottom: 5, letterSpacing: '0.08em' }}>{lbl}</div>
              <input
                type="time"
                value={f[k]}
                onChange={(e) => setF((p) => ({ ...p, [k]: e.target.value }))}
                style={inp}
              />
            </div>
          ))}
          <div>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--text-mut)',
              marginBottom: 5, letterSpacing: '0.08em' }}>CRED.</div>
            <input
              type="number" min={0} max={20}
              value={f.credits}
              onChange={(e) => setF((p) => ({ ...p, credits: e.target.value }))}
              style={{ ...inp, textAlign: 'center' }}
            />
          </div>
        </div>

        {f.name && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              background:   previewColor.bg,
              border:       `1.5px solid ${previewColor.bd}`,
              borderRadius: 20,
              padding:      '3px 11px',
              fontSize:     11.5,
              fontWeight:   600,
              color:        previewColor.tx,
            }}>
              {f.name}
            </span>
            <span style={{ fontSize: 11, color: 'var(--text-mut)' }}>vista previa</span>
          </div>
        )}

        {err && (
          <p style={{ fontSize: 12.5, color: 'var(--danger)', fontWeight: 500 }}>{err}</p>
        )}

        <button
          onClick={submit}
          style={{
            padding: '10px', borderRadius: 9, border: 'none',
            background: 'var(--accent)', color: '#fff',
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 700, fontSize: 13.5, cursor: 'pointer',
            transition: 'background .15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-h)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
        >
          Agregar
        </button>
      </div>
    </div>
  )
}
