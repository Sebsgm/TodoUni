import { jsPDF } from 'jspdf'
import { t2m, clamp } from './time.js'
import { COLORS } from './colors.js'

export function generatePDF(schedule, settings) {
  if (!schedule.subjects.length) {
    alert('Agrega materias antes de descargar el PDF.')
    return
  }

  const doc  = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
  const subs = schedule.subjects

  const allMins = subs.flatMap((s) => [t2m(s.start), t2m(s.end)])
  const minHour = Math.floor(Math.min(...allMins) / 60)
  const maxHour = Math.ceil(Math.max(...subs.map((s) => t2m(s.end))) / 60)
  const totalH  = maxHour - minHour

  if (totalH <= 0) { alert('Rango de horas inválido.'); return }

  const PW = 297, PH = 210, MG = 12
  const TITLE_H  = 18
  const HEADER_H = 9
  const LEGEND_H = 16          // reserva para la leyenda inferior
  const FOOTER_H = 7           // pie de página
  const TCOL     = 22

  const CGRID_W  = PW - 2 * MG - TCOL
  const DCOL     = CGRID_W / 6
  // La altura disponible para la rejilla ya descuenta leyenda y pie
  const AVAIL_H  = PH - 2 * MG - TITLE_H - HEADER_H - LEGEND_H - FOOTER_H
  const HOUR_H   = AVAIL_H / totalH
  const HALF_H   = HOUR_H / 2
  const GTOP     = MG + TITLE_H + HEADER_H
  const GLEFT    = MG + TCOL
  const GRID_BOT = GTOP + totalH * HOUR_H   // y final de la rejilla

  // ── Fondo general
  doc.setFillColor(248, 245, 255)
  doc.rect(0, 0, PW, PH, 'F')

  // ── Barra de título
  doc.setFillColor(109, 40, 217)
  doc.roundedRect(MG, MG, PW - 2 * MG, TITLE_H - 2, 3, 3, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  const title = schedule.name ? schedule.name.toUpperCase() : 'HORARIO'
  doc.text('TODOUNI  ·  ' + title, MG + 7, MG + TITLE_H / 2 + 3.5)
  const totalCr = subs.reduce((a, s) => a + (Number(s.credits) || 0), 0)
  doc.setFontSize(7.5)
  doc.setFont('helvetica', 'normal')
  doc.text(
    `${subs.length} materia${subs.length !== 1 ? 's' : ''}  ·  ${totalCr} crédito${totalCr !== 1 ? 's' : ''}`,
    PW - MG - 5, MG + TITLE_H / 2 + 3.5, { align: 'right' }
  )

  // ── Encabezados de días
  const DAYS     = ['L', 'M', 'X', 'J', 'V', 'S']
  const DAY_FULL = { L: 'Lunes', M: 'Martes', X: 'Miércoles', J: 'Jueves', V: 'Viernes', S: 'Sábado' }

  DAYS.forEach((day, i) => {
    const x = GLEFT + i * DCOL
    doc.setFillColor(232, 222, 255)
    doc.rect(x, MG + TITLE_H, DCOL, HEADER_H, 'F')
    doc.setTextColor(70, 20, 140)
    doc.setFontSize(7)
    doc.setFont('helvetica', 'bold')
    doc.text(DAY_FULL[day], x + DCOL / 2, MG + TITLE_H + HEADER_H / 2 + 2.5, { align: 'center' })
  })

  // ── Fondo blanco de la rejilla
  doc.setFillColor(255, 255, 255)
  doc.rect(GLEFT, GTOP, CGRID_W, totalH * HOUR_H, 'F')

  // ── Líneas de hora y etiquetas
  for (let h = minHour; h <= maxHour; h++) {
    const y = GTOP + (h - minHour) * HOUR_H
    doc.setDrawColor(210, 195, 245)
    doc.setLineWidth(0.35)
    doc.line(GLEFT, y, GLEFT + CGRID_W, y)
    doc.setTextColor(110, 90, 160)
    doc.setFontSize(6)
    doc.setFont('helvetica', 'bold')
    doc.text(`${String(h).padStart(2, '0')}:00`, MG + TCOL - 3, y + 2, { align: 'right' })
    if (h < maxHour) {
      doc.setDrawColor(235, 228, 252)
      doc.setLineWidth(0.15)
      doc.line(GLEFT, y + HALF_H, GLEFT + CGRID_W, y + HALF_H)
      doc.setTextColor(175, 158, 215)
      doc.setFontSize(5)
      doc.setFont('helvetica', 'normal')
      doc.text(`${String(h).padStart(2, '0')}:30`, MG + TCOL - 3, y + HALF_H + 1.6, { align: 'right' })
    }
  }

  // ── Separadores verticales de columnas
  for (let i = 0; i <= 6; i++) {
    const x = GLEFT + i * DCOL
    doc.setDrawColor(200, 185, 240)
    doc.setLineWidth(0.4)
    doc.line(x, GTOP, x, GTOP + totalH * HOUR_H)
  }

  // ── Bloques de materias  (con créditos)
  subs.forEach((sub) => {
    const pc = COLORS[sub.ci % COLORS.length].pdf
    const sm = t2m(sub.start)
    const em = t2m(sub.end)

    sub.days.forEach((day) => {
      const di = DAYS.indexOf(day)
      if (di < 0) return

      const x  = GLEFT + di * DCOL + 1
      const y  = GTOP + ((sm - minHour * 60) / 60) * HOUR_H
      const bH = ((em - sm) / 60) * HOUR_H
      const bW = DCOL - 2

      // Fondo del bloque
      doc.setFillColor(...pc.bg)
      doc.rect(x, y, bW, bH, 'F')

      // Barra lateral de acento
      doc.setFillColor(...pc.tx)
      doc.rect(x, y, 3, bH, 'F')

      // Nombre de la materia
      const nameFontSize = 6.5
      doc.setFontSize(nameFontSize)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(...pc.tx)

      // Calcular cuántas líneas caben para el nombre
      // Reservamos espacio para horario (5.5 pt ≈ 2.3mm) y créditos (5pt ≈ 2mm) si hay altura suficiente
      const reserveBottom = bH > 10 ? 5 : 0
      const lineH         = nameFontSize * 0.36 + 1.2   // aprox mm por línea
      const maxLines      = Math.max(1, Math.floor((bH - 3.5 - reserveBottom) / lineH))
      const lines         = doc.splitTextToSize(sub.name, bW - 6)
      doc.text(lines.slice(0, maxLines), x + 4.5, y + 3.8)

      // Horario
      if (bH > 10) {
        doc.setFontSize(5.5)
        doc.setFont('helvetica', 'normal')
        const lighter = pc.tx.map((c) => Math.min(255, c + 60))
        doc.setTextColor(...lighter)
        doc.text(`${sub.start} – ${sub.end}`, x + 4.5, y + bH - 4.2)
      }

      // Créditos  ← nueva línea
      if (bH > 10 && (sub.credits || 0) > 0) {
        doc.setFontSize(5)
        doc.setFont('helvetica', 'bold')
        const lighter2 = pc.tx.map((c) => Math.min(255, c + 45))
        doc.setTextColor(...lighter2)
        doc.text(`${sub.credits} cr.`, x + 4.5, y + bH - 1.5)
      }
    })
  })

  // ────────────────────────────────────────────
  // LEYENDA DE MATERIAS
  // ────────────────────────────────────────────
  const LEGEND_TOP = GRID_BOT + 3
  const LEGEND_W   = PW - 2 * MG

  // Fondo de leyenda
  doc.setFillColor(245, 240, 255)
  doc.roundedRect(MG, LEGEND_TOP, LEGEND_W, LEGEND_H - 2, 2, 2, 'F')

  // Título de la leyenda
  doc.setFontSize(5.5)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(100, 70, 160)
  doc.text('MATERIAS', MG + 4, LEGEND_TOP + 4.5)

  // Chips de materias
  const chipH    = 7
  const chipGap  = 4
  const maxChipW = 54
  const startX   = MG + 26   // después del label "MATERIAS"
  let curX       = startX
  const chipY    = LEGEND_TOP + (LEGEND_H - 2 - chipH) / 2

  subs.forEach((sub) => {
    const pc    = COLORS[sub.ci % COLORS.length].pdf
    const label = sub.name + (sub.credits ? `  ·  ${sub.credits} cr.` : '')

    // Calcular ancho del chip
    doc.setFontSize(6)
    doc.setFont('helvetica', 'bold')
    const textW  = doc.getTextWidth(label)
    const chipW  = Math.min(maxChipW, textW + 10)

    // Si no cabe, no lo dibujamos (evita overflow)
    if (curX + chipW > PW - MG - 4) return

    // Fondo del chip
    doc.setFillColor(...pc.bg)
    doc.roundedRect(curX, chipY, chipW, chipH, 1.5, 1.5, 'F')

    // Borde lateral de color
    doc.setFillColor(...pc.tx)
    doc.roundedRect(curX, chipY, 2.5, chipH, 1, 1, 'F')

    // Texto
    doc.setTextColor(...pc.tx)
    doc.setFontSize(5.8)
    doc.setFont('helvetica', 'bold')
    // Truncar si es muy largo
    const maxLabelW = chipW - 6
    const truncated = doc.splitTextToSize(label, maxLabelW)[0] || label
    doc.text(truncated, curX + 4.5, chipY + chipH / 2 + 2)

    curX += chipW + chipGap
  })

  // ── Marco exterior
  doc.setDrawColor(109, 40, 217)
  doc.setLineWidth(0.7)
  doc.rect(MG, MG, PW - 2 * MG, PH - 2 * MG)

  // ── Pie de página
  doc.setTextColor(175, 155, 215)
  doc.setFontSize(5)
  doc.setFont('helvetica', 'normal')
  doc.text('Generado con TODOUNI', PW / 2, PH - MG + 3, { align: 'center' })

  const filename = (schedule.name || 'horario').replace(/[^a-zA-Z0-9_\-\s]/g, '').trim() || 'horario'
  doc.save(`${filename}.pdf`)
}
