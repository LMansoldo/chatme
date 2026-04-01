import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { apiMiddlewarePlugin } from './src/plugins/apiMiddleware'

export default defineConfig({
  plugins: [react(), apiMiddlewarePlugin()],
})
