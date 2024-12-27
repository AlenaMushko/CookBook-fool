import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: process.env.VITE_BUILD_PATH || '../client',
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://app:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
})
