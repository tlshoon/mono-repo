// apps/app1/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@common': path.resolve(__dirname, '../../packages/common/src'),
      "@common/components": path.resolve(__dirname, '../../packages/common/src/components'),
      "@common/utils": path.resolve(__dirname, '../../packages/common/src/utils'),
    }
  }
})