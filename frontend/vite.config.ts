import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Split vendor chunks for better browser caching
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['lucide-react'],
          'vendor-utils': ['axios', 'react-hook-form'],
        },
      },
    },
    // Minify with terser — strips console.log, comments, dead code
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
      },
    },
    // CSS code splitting
    cssCodeSplit: true,
    // Don't report compressed size (speeds up build)
    reportCompressedSize: false,
    // Raise chunk warning limit
    chunkSizeWarningLimit: 600,
  },
})
