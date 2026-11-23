import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/viajes-miguel-cabrillana-PFY2202/' : '/',
  plugins: [react()],
}))
