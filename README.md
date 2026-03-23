# TODOUNI

Aplicación web para estudiantes universitarios que permite construir horarios semanales visuales y hacer seguimiento de notas por materia. No requiere cuenta ni conexión a internet — todo corre en el navegador.

Construida con React y Vite. Sin backend ni dependencias a servicios externos.

---

## Qué hace

**Constructor de horarios** — Crea un horario semanal agregando materias con sus días, horario de inicio y fin, y número de créditos. A cada materia se le asigna un color automáticamente. El calendario renderiza todos los bloques de forma proporcional en una cuadrícula de lunes a sábado con resolución de 30 minutos.

**Exportar a PDF** — Descarga el horario como un PDF en A4 horizontal. El resultado recorta las horas vacías, muestra cada bloque con su rango horario y créditos, e incluye una leyenda con todas las materias y sus colores al pie de la página.

**Calculadora de notas** — Por cada materia se definen cortes de evaluación (parciales, finales, trabajos) con sus respectivos porcentajes. Al ingresar las notas obtenidas, la calculadora muestra la nota acumulada y el puntaje exacto que se necesita en los cortes pendientes para aprobar.

**Múltiples semestres** — Los horarios y calculadoras se almacenan de forma independiente. Se pueden tener tantos como se necesiten y alternar entre ellos libremente.

**Modo oscuro** — Alternancia completa entre tema claro y oscuro, implementada con CSS custom properties.

**Local-first** — Todos los datos se guardan en `localStorage`. No se envía ninguna información a ningún servidor.

---

## Stack tecnológico

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- [jsPDF 2](https://github.com/parallax/jsPDF) — generación de PDFs en el cliente
- CSS con custom properties — sin framework de UI

---

## Correr localmente

**Requisito:** Node.js 18 o superior.

```bash
git clone https://github.com/TU-USUARIO/todouni.git
cd todouni
npm install
npm run dev
```

Abre `http://localhost:5173` en el navegador.

---

## Build de producción

```bash
npm run build
```

El resultado se escribe en `dist/`. Puede servirse desde cualquier host de archivos estáticos.

---

## Estructura del proyecto

```
src/
├── components/
│   ├── CalendarGrid.jsx   # Calendario semanal con bloques posicionados absolutamente
│   ├── Icons.jsx          # Componentes de iconos SVG inline
│   ├── Navbar.jsx         # Barra de navegación
│   └── SubjectForm.jsx    # Formulario para agregar materias a un horario
├── hooks/
│   └── useAppData.js      # Hook personalizado para lectura y escritura en localStorage
├── pages/
│   └── index.jsx          # Todas las páginas: Landing, Horarios, Calculadora, Ajustes
├── utils/
│   ├── colors.js          # Paleta de colores por materia (variantes claro, oscuro y PDF)
│   ├── constants.js       # Definición de días de la semana y mapeo a Date.getDay()
│   ├── genId.js           # Generador de IDs únicos
│   ├── pdf.js             # Lógica de layout y renderizado del PDF
│   └── time.js            # Utilidades de conversión de horas y generación de slots
├── App.jsx                # Componente raíz y enrutamiento entre páginas
└── index.css              # Estilos globales y variables CSS de tema
```

---

## Licencia

MIT
