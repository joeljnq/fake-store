import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { configDefaults } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test:{
    environment: 'happy-dom'
  },
  base: '/',
  server: {},
  build: {
    outDir: 'dist',
  }
})
