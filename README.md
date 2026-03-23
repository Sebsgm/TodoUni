# 🎓 TODOUNI

App universitaria para crear horarios visuales y calcular notas.  
Construida con **React + Vite**. Sin backend, sin login. Todo se guarda en `localStorage`.

---

## 📁 Estructura del proyecto

```
todouni/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── CalendarGrid.jsx   ← Vista estilo Google Calendar (franjas de 30 min)
│   │   ├── Navbar.jsx
│   │   └── SubjectForm.jsx    ← Formulario para agregar materias
│   ├── hooks/
│   │   └── useAppData.js      ← Hook personalizado para localStorage
│   ├── pages/
│   │   └── index.jsx          ← Landing, Horarios, Calculadora, Ajustes
│   ├── utils/
│   │   ├── colors.js          ← Paleta de colores pastel por materia
│   │   ├── constants.js       ← Días L,M,X,J,V,S
│   │   ├── genId.js           ← Generador de IDs únicos
│   │   ├── pdf.js             ← Exportación a PDF (jsPDF)
│   │   └── time.js            ← Conversión de horas y generación de slots
│   ├── App.jsx                ← Componente raíz + lógica de navegación
│   ├── index.css              ← Variables CSS (modo claro/oscuro) + estilos globales
│   └── main.jsx               ← Punto de entrada React
├── index.html
├── vite.config.js
├── package.json
└── .gitignore
```

---

## 🚀 Cómo arrancar el proyecto

### Requisitos previos
- [Node.js](https://nodejs.org/) versión **18 o superior**
- Un terminal (CMD, PowerShell, Terminal de macOS, etc.)

### Pasos

```bash
# 1. Entra a la carpeta del proyecto
cd todouni

# 2. Instala las dependencias (solo la primera vez)
npm install

# 3. Arranca el servidor de desarrollo
npm run dev
```

Luego abre tu navegador en **http://localhost:5173** y listo. 🎉

> Para detener el servidor: presiona `Ctrl + C` en la terminal.

---

## 🏗️ Generar versión de producción (build)

```bash
npm run build
```

Esto crea una carpeta `dist/` con los archivos optimizados listos para subir a un servidor.

---

## 🐙 Cómo subir a GitHub y publicar con GitHub Pages

### Paso 1 — Crear el repositorio en GitHub

1. Ve a [github.com](https://github.com) → **New repository**
2. Nombre del repo: `todouni` *(debe coincidir con `base` en `vite.config.js`)*
3. Déjalo **público** si quieres que sea visible como proyecto personal
4. NO marques "Initialize with README" (ya tienes uno)
5. Clic en **Create repository**

### Paso 2 — Conectar tu carpeta local con GitHub

```bash
# Dentro de la carpeta todouni/:

git init
git add .
git commit -m "🎓 Initial commit — TODOUNI"

# Reemplaza TU-USUARIO con tu nombre de usuario de GitHub
git remote add origin https://github.com/TU-USUARIO/todouni.git
git branch -M main
git push -u origin main
```

### Paso 3 — Instalar el plugin para desplegar en GitHub Pages

```bash
npm install --save-dev gh-pages
```

Luego agrega estos scripts en `package.json`:

```json
"scripts": {
  "dev":      "vite",
  "build":    "vite build",
  "preview":  "vite preview",
  "predeploy": "npm run build",
  "deploy":   "gh-pages -d dist"
}
```

### Paso 4 — Publicar

```bash
npm run deploy
```

Esto:
1. Hace el build automáticamente
2. Sube la carpeta `dist/` a la rama `gh-pages` de tu repositorio

### Paso 5 — Activar GitHub Pages

1. Ve a tu repositorio en GitHub → **Settings** → **Pages**
2. En *Branch*, selecciona `gh-pages` → carpeta `/ (root)`
3. Clic en **Save**

En unos minutos tu app estará disponible en:
```
https://TU-USUARIO.github.io/todouni/
```

---

## 🔄 Actualizar la app en producción

Cada vez que hagas cambios y quieras publicarlos:

```bash
# 1. Guarda tus cambios en Git
git add .
git commit -m "descripción de los cambios"
git push

# 2. Despliega la nueva versión
npm run deploy
```

---

## ✨ Funcionalidades

| Función | Descripción |
|---|---|
| 📅 Horarios | Crea múltiples horarios (uno por semestre) |
| 🌈 Vista calendario | Bloques de color por materia, franjas de 30 min, L–S |
| 📄 PDF | Exporta el horario recortando horas vacías |
| 🧮 Calculadora | Cortes configurables, calcula cuánto necesitas para pasar |
| 🌙 Modo oscuro | Toggle claro/oscuro con CSS variables |
| 💾 localStorage | Sin servidor, sin cuenta |

---

## 🛠️ Tecnologías

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- [jsPDF](https://github.com/parallax/jsPDF) — generación de PDFs
- CSS Variables (sin framework de UI externo)

---

*Hecho con 💜 para estudiantes universitarios*
