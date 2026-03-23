/** "HH:MM" → minutos totales */
export const t2m = (t) => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

/** minutos totales → "HH:MM" */
export const m2t = (m) =>
  `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`

export const clamp = (v, mn, mx) => Math.min(mx, Math.max(mn, v))

/** Genera todas las franjas de 30 min entre startH y endH (horas enteras) */
export const buildSlots = (startH, endH) => {
  const slots = []
  for (let h = startH; h < endH; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`)
    slots.push(`${String(h).padStart(2, '0')}:30`)
  }
  slots.push(`${String(endH).padStart(2, '0')}:00`)
  return slots
}
