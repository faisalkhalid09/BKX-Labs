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
  '/tools',
  '/tools/eu-ai-act-risk-level-classifier',
  '/tools/post-quantum-cbom-generator',
  '/tools/saas-soc2-readiness-calculator',
  '/tools/cloud-gpu-cost-comparison',
  '/tools/nvidia-blackwell-pue-estimator',
  '/tools/ai-prompt-privacy-auditor',
  '/tools/admt-proportionality-scorer',
  '/tools/nist-fips-203-migration-timeline-planner',
  '/tools/direct-to-chip-liquid-cooling-roi',
  '/tools/agentic-workflow-debugger',
  '/tools/smart-contract-gas-optimizer',
  '/tools/esg-carbon-footprint-tracker',
  '/tools/zk-circuit-validator',
  '/tools/deepfake-detector-probability',
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

      await page.waitForSelector('#root > *', { timeout: 10000 })
        .catch(() => console.warn(`  ⚠ No #root child found for ${route}`))

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
