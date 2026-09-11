/**
 * scripts/ssg-render.mjs
 *
 * Zero-cost Static Site Generation (SSG) script.
 *
 * ─── How It Works ───────────────────────────────────────────────────────────
 * 1. Reads the compiled SSR bundle: dist/server/entry-server.cjs
 * 2. Reads the base dist/index.html (the Vite client build output)
 * 3. For each route, calls ReactDOM.renderToString() via the SSR bundle
 * 4. Injects the resulting HTML + Helmet head tags into the template
 * 5. Writes the final HTML to dist/[route]/index.html
 *
 * ─── Why No Puppeteer ───────────────────────────────────────────────────────
 * Puppeteer launches a real Chrome browser (~500MB RAM) and is forbidden on
 * this 4GB server. This script uses Node.js + React's built-in server renderer
 * (~50MB RAM peak). Zero external dependencies beyond what's already installed.
 *
 * ─── Dynamic Blog ───────────────────────────────────────────────────────────
 * The script fetches all published blog slugs from the Laravel API at build
 * time. Every blog post gets its own pre-rendered HTML file.
 * ────────────────────────────────────────────────────────────────────────────
 */

import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DIST = path.join(ROOT, 'dist')
const SSR_BUNDLE = path.join(DIST, 'server', 'entry-server.cjs')
const API_URL = process.env.VITE_API_URL || 'https://bkxlabs.com/api'

// ── Static Routes to Pre-render ──────────────────────────────────────────────
const STATIC_ROUTES = [
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
  '/blog',
  '/schedule',
  // Tools hub
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
  // Glossary pages
  '/glossary/post-quantum-cbom',
  '/glossary/soc2-type-2-compliance',
  '/glossary/eu-ai-act-annex-iii',
  '/glossary/data-center-pue',
  '/glossary/gpu-cloud-egress-fees',
]

// ── Fetch blog slugs from Laravel API ────────────────────────────────────────
async function fetchBlogRoutes() {
  console.log(`  → Fetching blog posts from ${API_URL}/posts ...`)
  try {
    const res = await fetch(`${API_URL}/posts`, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(15000),
    })
    if (!res.ok) {
      console.warn(`  ⚠ Could not fetch posts (HTTP ${res.status}). Skipping blog pre-render.`)
      return []
    }
    const json = await res.json()
    const posts = json?.data ?? []
    const routes = posts.map((p) => `/blog/${p.slug}`)
    console.log(`  → Found ${routes.length} blog posts to pre-render.`)
    return routes
  } catch (err) {
    console.warn(`  ⚠ API request failed: ${err.message}. Skipping blog pre-render.`)
    return []
  }
}

// ── Fetch a single blog post for server data injection ───────────────────────
async function fetchPost(slug) {
  try {
    const [postRes, postsRes] = await Promise.all([
      fetch(`${API_URL}/posts/${slug}`, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(10000) }),
      fetch(`${API_URL}/posts`, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(10000) }),
    ])
    const postJson = postRes.ok ? await postRes.json() : null
    const postsJson = postsRes.ok ? await postsRes.json() : null

    const post = postJson?.data ?? null
    const latestPosts = postsJson?.data
      ? postsJson.data.filter((p) => p.slug !== slug).slice(0, 4)
      : []

    return { post, latestPosts }
  } catch {
    return { post: null, latestPosts: [] }
  }
}

// ── Inject rendered HTML into the index.html template ────────────────────────
function injectIntoTemplate(template, appHtml, helmet) {
  let html = template

  // Replace <div id="root"></div> with the pre-rendered content
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  )

  // Inject Helmet-managed head tags
  if (helmet) {
    // Title
    if (helmet.title?.toString()) {
      html = html.replace(/<title>.*?<\/title>/i, helmet.title.toString())
    }
    // Meta tags
    if (helmet.meta?.toString()) {
      html = html.replace('</head>', `${helmet.meta.toString()}\n</head>`)
    }
    // Link tags (canonical, etc.)
    if (helmet.link?.toString()) {
      html = html.replace('</head>', `${helmet.link.toString()}\n</head>`)
    }
    // Script tags (JSON-LD structured data)
    if (helmet.script?.toString()) {
      html = html.replace('</head>', `${helmet.script.toString()}\n</head>`)
    }
  }

  return html
}

// ── Write an HTML file to the dist directory ─────────────────────────────────
async function writeHtmlFile(route, html) {
  const routePath = route === '/' ? '' : route
  const dir = path.join(DIST, routePath)
  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(path.join(dir, 'index.html'), html, 'utf-8')
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n╔══════════════════════════════════════════════╗')
  console.log('║   BKX Labs SSG Renderer (No Puppeteer)       ║')
  console.log('╚══════════════════════════════════════════════╝\n')

  // 1. Verify the SSR bundle exists
  try {
    await fs.access(SSR_BUNDLE)
  } catch {
    console.error(`✗ SSR bundle not found at: ${SSR_BUNDLE}`)
    console.error('  Run `npm run build:ssr` first to generate it.')
    process.exit(1)
  }

  // 2. Load the SSR bundle and the HTML template
  const require = createRequire(import.meta.url)
  const { render } = require(SSR_BUNDLE)
  const template = await fs.readFile(path.join(DIST, 'index.html'), 'utf-8')

  // 3. Fetch dynamic blog routes
  const blogRoutes = await fetchBlogRoutes()
  const allRoutes = [...STATIC_ROUTES, ...blogRoutes]

  console.log(`\nPre-rendering ${allRoutes.length} total routes...\n`)

  let successCount = 0
  let failCount = 0

  for (const route of allRoutes) {
    try {
      let serverData

      // For blog post pages, inject fetched data to avoid a loading flash
      if (route.startsWith('/blog/') && route !== '/blog/') {
        const slug = route.replace('/blog/', '')
        const { post, latestPosts } = await fetchPost(slug)
        if (post) {
          serverData = { post, latestPosts }
        }
      }

      const { html: appHtml, helmetContext } = render(route, serverData)
      const fullHtml = injectIntoTemplate(template, appHtml, helmetContext)
      await writeHtmlFile(route, fullHtml)

      const dataNote = serverData?.post ? ' [with data]' : ''
      console.log(`  ✓ ${route}${dataNote}`)
      successCount++
    } catch (err) {
      console.error(`  ✗ Failed: ${route} — ${err.message}`)
      failCount++
    }
  }

  console.log(`\n────────────────────────────────────────────────`)
  console.log(`  ✓ ${successCount} routes pre-rendered successfully`)
  if (failCount > 0) {
    console.log(`  ✗ ${failCount} routes failed (they will fall back to SPA)`)
  }
  console.log(`────────────────────────────────────────────────\n`)
}

main().catch((err) => {
  console.error('SSG renderer crashed:', err)
  process.exit(1)
})
