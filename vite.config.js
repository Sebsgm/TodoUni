import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Cambia 'todouni' por el nombre exacto de tu repositorio en GitHub
  base: '/todouni/',
})
