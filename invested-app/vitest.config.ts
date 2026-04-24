import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@ds': resolve(__dirname, 'src/design-system'),
      '@features': resolve(__dirname, 'src/features'),
      '@shared': resolve(__dirname, 'src/shared'),
      '@services': resolve(__dirname, 'src/services'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['node_modules/', 'src/services/mocks/'],
    },
  },
})
