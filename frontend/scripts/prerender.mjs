import puppeteer from 'puppeteer'
import { preview } from 'vite'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DIST = path.join(ROOT, 'dist')

const ROUTES = [
  '/',
  '/services',
  '/about',
  '/process',
  '/case-study',
  '/contact',
  '/privacy-policy',
  '/tos',
  '/hire-laravel-developer',
  '/hire-react-developer',
  '/technical-debt-remediation',
  '/codebase-audit',
  '/tools',
  '/tools/post-quantum-cbom-generator',
  '/tools/nvidia-blackwell-pue-estimator',
  '/tools/ai-prompt-privacy-auditor',
  '/tools/admt-proportionality-scorer',
  '/tools/nist-fips-203-migration-timeline-planner',
  '/tools/direct-to-chip-liquid-cooling-roi',
  '/tools/esg-carbon-footprint-tracker',
  '/tools/zk-circuit-validator',
  '/tools/crypto-agility-maturity-model',
  '/glossary/post-quantum-cbom',
  '/glossary/soc2-type-2-compliance',
  '/glossary/eu-ai-act-annex-iii',
  '/glossary/data-center-pue',
  '/glossary/gpu-cloud-egress-fees',
]

async function prerender() {
  console.log('Starting prerender server...')
  const server = await preview({
    root: ROOT,
    preview: { port: 3033, strictPort: true },
  })

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  console.log(`Prerendering ${ROUTES.length} routes...`)

  for (const route of ROUTES) {
    try {
      const page = await browser.newPage()
      await page.goto(`http://localhost:3033${route}`, {
        waitUntil: 'networkidle2',
        timeout: 30000,
      })

      // Wait until React + react-helmet-async have injected the real <title>
      // (not just the generic loading-state 'BKX Labs' fallback)
      await page.waitForFunction(
        () => {
          const t = document.title;
          return t && t !== 'BKX Labs' && t.length > 10;
        },
        { timeout: 12000 }
      ).catch(() => console.warn(`  ⚠ Title not updated for ${route} — check SEO component`))

      // Extra buffer so all JSON-LD <script> tags written by Helmet are captured
      await new Promise(r => setTimeout(r, 1000))

      const html = await page.content()

      const routePath = route === '/' ? '' : route
      const dir = path.join(DIST, routePath)
      await fs.mkdir(dir, { recursive: true })
      await fs.writeFile(path.join(dir, 'index.html'), html)

      console.log(`  ✓ ${route}`)
      await page.close()
    } catch (err) {
      console.error(`  ✗ Failed: ${route}`, err.message)
    }
  }

  await browser.close()
  server.httpServer.close()
  console.log('Prerendering complete.')
}

prerender().catch(err => {
  console.error('Prerender script failed:', err)
  process.exit(1)
})
