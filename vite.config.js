import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/functions': {
        target: 'https://your-project.supabase.co',
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true // Remove console.log em produção
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  define: {
    'process.env': {}
  }
})
