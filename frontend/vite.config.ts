import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Strip console.log/debugger from production builds (esbuild is built-in, no extra package)
  esbuild: {
    drop: ['console', 'debugger'],
  },

  build: {
    // Use esbuild minifier (default in Vite 7, faster than terser, no extra install)
    minify: 'esbuild',
    // CSS code splitting
    cssCodeSplit: true,
    // Don't compute compressed sizes during build (speeds up build output)
    reportCompressedSize: false,
    // Raise chunk warning limit
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Split vendor libs into separate cached chunks
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['lucide-react'],
          'vendor-utils': ['axios', 'react-hook-form'],
        },
      },
    },
  },
})
