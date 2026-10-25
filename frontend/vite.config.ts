import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isSSR = mode === 'ssr'

  return {
    plugins: [react()],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    // Strip console.log/debugger from production builds (esbuild is built-in, no extra package)
    esbuild: isSSR ? {} : {
      drop: ['console', 'debugger'],
    },

    build: isSSR
      ? {
          // SSR bundle for the ssg-render.mjs script
          ssr: true,
          rollupOptions: {
            input: './src/entry-server.tsx',
            output: {
              format: 'cjs',
              entryFileNames: 'entry-server.cjs',
            },
          },
          outDir: 'dist/server',
          minify: false,
        }
      : {
          // Use esbuild minifier (default in Vite 7, faster than terser, no extra install)
          minify: 'esbuild',
          // CSS code splitting
          cssCodeSplit: true,
          // Don't compute compressed sizes during build (speeds up build output)
          reportCompressedSize: false,
          // Raise chunk warning limit
          chunkSizeWarningLimit: 500,
          rollupOptions: {
            output: {
              // Split vendor libs and heavy components into separate cached chunks
              manualChunks(id) {
                const normalizedId = id.replace(/\\/g, '/')

                // Vendor chunk splitting
                if (normalizedId.includes('/node_modules/')) {
                  if (
                    normalizedId.includes('/react/') ||
                    normalizedId.includes('/react-dom/') ||
                    normalizedId.includes('/react-router/') ||
                    normalizedId.includes('/react-router-dom/') ||
                    normalizedId.includes('/react-helmet-async/') ||
                    normalizedId.includes('/react-hook-form/')
                  ) {
                    return 'vendor-react'
                  }
                  if (
                    normalizedId.includes('/lucide-react/') ||
                    normalizedId.includes('/framer-motion/') ||
                    normalizedId.includes('/recharts/')
                  ) {
                    return 'vendor-ui'
                  }
                  if (normalizedId.includes('/axios/')) {
                    return 'vendor-utils'
                  }
                  return undefined
                }

                // Tools, calculators & glossary chunk (shared registry & calculators)
                if (
                  normalizedId.includes('/src/components/tools/') ||
                  normalizedId.includes('/src/components/Blackwell') ||
                  normalizedId.includes('/src/components/CloudGPU') ||
                  normalizedId.includes('/src/pages/ToolDetail') ||
                  normalizedId.includes('/src/pages/ToolsIndex') ||
                  normalizedId.includes('/src/lib/tools/') ||
                  normalizedId.includes('/src/pages/glossary/') ||
                  normalizedId.includes('/src/lib/glossary/')
                ) {
                  return 'chunk-tools'
                }

                // Heavy content pages (Services, CaseStudy, About, Process)
                if (
                  normalizedId.includes('/src/pages/Services') ||
                  normalizedId.includes('/src/pages/CaseStudy') ||
                  normalizedId.includes('/src/pages/About') ||
                  normalizedId.includes('/src/pages/Process')
                ) {
                  return 'chunk-pages-content'
                }

                // Dedicated service landing pages & booking
                if (
                  normalizedId.includes('/src/pages/HireLaravelDeveloper') ||
                  normalizedId.includes('/src/pages/HireReactDeveloper') ||
                  normalizedId.includes('/src/pages/TechnicalDebtRemediation') ||
                  normalizedId.includes('/src/pages/CodebaseAudit') ||
                  normalizedId.includes('/src/pages/BookingPage') ||
                  normalizedId.includes('/src/pages/AppointmentSuccess')
                ) {
                  return 'chunk-pages-services'
                }

                // Blog pages
                if (
                  normalizedId.includes('/src/pages/Blog') ||
                  normalizedId.includes('/src/pages/BlogPost')
                ) {
                  return 'chunk-blog'
                }

                // Legal pages
                if (
                  normalizedId.includes('/src/pages/PrivacyPolicy') ||
                  normalizedId.includes('/src/pages/TermsOfService') ||
                  normalizedId.includes('/src/pages/RezgoDemo')
                ) {
                  return 'chunk-pages-legal'
                }
              },
            },
          },
        },
  }
})

