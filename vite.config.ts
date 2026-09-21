import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base: './'` keeps every asset path relative, so la build funciona tanto en la raíz
// de un dominio como dentro de un subdirectorio (por ejemplo GitHub Pages:
// https://usuario.github.io/Las-flores-de-nosotros/). No hace falta tocar nada al desplegar.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'es2020',
    assetsInlineLimit: 4096,
  },
})
