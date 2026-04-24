import { useMemo, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { EuAiActClassifier } from '@/components/tools/eu-ai-act-classifier';
import { PostQuantumCBOMGenerator } from '@/components/tools/pq-cbom-generator';
import { SaaSSoc2Calculator } from '@/components/tools/soc2-calculator';
import { CloudGpuCostComparison } from '@/components/tools/cloud-gpu-cost-comparison';
import { NvidiaBlackwellEstimator } from '@/components/tools/nvidia-blackwell-estimator';
import { AiPromptPrivacyAuditor } from '@/components/tools/ai-prompt-privacy-auditor';
import { AdmtProportionalityScorer } from '@/components/tools/admt-proportionality-scorer';
import { NistFips203MigrationTimeline } from '@/components/tools/nist-fips-203-migration-timeline';
import { DirectToChipLiquidCoolingRoi } from '@/components/tools/direct-to-chip-liquid-cooling-roi';
import { AgenticWorkflowDebugger } from '@/components/tools/agentic-workflow-debugger';
import { GasOptimizer } from '@/components/tools/smart-contract-gas-optimizer';
import { CarbonFootprintTracker } from '@/components/tools/esg-carbon-footprint';
import { ZkCircuitValidator } from '@/components/tools/zk-proof-validator';
import { DeepfakeDetector } from '@/components/tools/deepfake-detector';
import { CryptoAgilityMaturitModel } from '@/components/tools/crypto-agility-maturity';
import { toolsBySlug } from '@/lib/tools/registry';
import { FAQSection } from '@/components/tools/faq-section';
import { DirectAnswerBlock } from '@/components/tools/direct-answer-block';
import { generateToolMetadata } from '@/lib/seo/tools-metadata';
import ToolToAgencyCTA from '@/components/tools/ToolToAgencyCTA';
import '@/components/tools/tool-ui.css';

const ADSENSE_CLIENT = 'ca-pub-8538157876247266';
const ADSENSE_TOP_SLOT = import.meta.env.VITE_ADSENSE_TOOLS_TOP_SLOT ?? '';
const ADSENSE_SIDEBAR_SLOT = import.meta.env.VITE_ADSENSE_TOOLS_SIDEBAR_SLOT ?? '';
const hasTopAdSlot = /^\d+$/.test(ADSENSE_TOP_SLOT);
const hasSidebarAdSlot = /^\d+$/.test(ADSENSE_SIDEBAR_SLOT);

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

// Component map for dynamic rendering
const componentMap: Record<string, React.ComponentType<any>> = {
  'eu-ai-act-risk-level-classifier': EuAiActClassifier,
  'post-quantum-cbom-generator': PostQuantumCBOMGenerator,
  'saas-soc2-readiness-calculator': SaaSSoc2Calculator,
  'cloud-gpu-cost-comparison': CloudGpuCostComparison,
  'nvidia-blackwell-pue-estimator': NvidiaBlackwellEstimator,
  'ai-prompt-privacy-auditor': AiPromptPrivacyAuditor,
  'admt-proportionality-scorer': AdmtProportionalityScorer,
  'nist-fips-203-migration-timeline-planner': NistFips203MigrationTimeline,
  'direct-to-chip-liquid-cooling-roi': DirectToChipLiquidCoolingRoi,
  'agentic-workflow-debugger': AgenticWorkflowDebugger,
  'smart-contract-gas-optimizer': GasOptimizer,
  'esg-carbon-footprint-tracker': CarbonFootprintTracker,
  'zk-circuit-validator': ZkCircuitValidator,
  'deepfake-detector-probability': DeepfakeDetector,
  'crypto-agility-maturity-model': CryptoAgilityMaturitModel,
};

type GlossaryRegistryItem = {
  term: string;
  title: string;
  targetToolSlug: string;
};

function getRelatedGlossaryConcepts(currentToolSlug: string, entries: GlossaryRegistryItem[]): GlossaryRegistryItem[] {
  return entries.filter((entry) => entry.targetToolSlug === currentToolSlug);
}

export default function ToolDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [relatedConcepts, setRelatedConcepts] = useState<GlossaryRegistryItem[]>([]);

  const tool = useMemo(() => {
    return slug ? toolsBySlug[slug] : null;
  }, [slug]);

  const metadata = useMemo(() => {
    return slug ? generateToolMetadata(slug) : null;
  }, [slug]);

  const pageTitle = useMemo(() => {
    if (tool?.title) return `${tool.title} | BKX Labs`;
    if (metadata?.title) return metadata.title;
    return 'BKX Labs Tools';
  }, [tool, metadata]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  useEffect(() => {
    let active = true;

    const loadRelatedConcepts = async () => {
      if (!slug) {
        if (active) setRelatedConcepts([]);
        return;
      }

      const registryPaths = ['/data/glossary-registry.json', '/backend/data/glossary-registry.json'];

      try {
        for (const path of registryPaths) {
          const response = await fetch(path, { cache: 'no-store' });
          if (!response.ok) continue;

          const raw = await response.text();
          const looksLikeJson = raw.trim().startsWith('[') || raw.trim().startsWith('{');
          if (!looksLikeJson) continue;

          const glossaryEntries = JSON.parse(raw) as GlossaryRegistryItem[];
          if (active) {
            setRelatedConcepts(getRelatedGlossaryConcepts(slug, glossaryEntries));
          }
          return;
        }

        if (active) setRelatedConcepts([]);
      } catch {
        if (active) setRelatedConcepts([]);
      }
    };

    loadRelatedConcepts();

    return () => {
      active = false;
    };
  }, [slug]);

  useEffect(() => {
    if (!hasTopAdSlot && !hasSidebarAdSlot) return;

    // Request ad fill only for configured slots to avoid invalid ad requests.
    const initAds = () => {
      try {
        if (hasTopAdSlot) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
        if (hasSidebarAdSlot) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch {
        // Ignore duplicate init and blocked-ad runtime errors.
      }
    };

    const timer = window.setTimeout(initAds, 0);
    return () => window.clearTimeout(timer);
  }, [slug]);

  if (!tool) {
    return (
      <>
        <Helmet>
          <title>Tool Not Found - BKX Labs</title>
          <meta name="description" content="The tool you're looking for doesn't exist." />
        </Helmet>
        <div className="min-h-screen bg-[#f5f7fa] p-6 md:p-8">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-2xl font-semibold text-[#161a1d]">Tool Not Found</h1>
            <p className="mt-2 text-[#4f565c]">The tool you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/tools')}
              className="mt-4 inline-block rounded-lg bg-[#0d2b5e] px-4 py-2 text-white font-semibold hover:bg-[#1a3a75]"
            >
              Back to Tools
            </button>
          </div>
        </div>
      </>
    );
  }

  const Component = componentMap[tool.slug];

  if (!Component) {
    return (
      <div className="min-h-screen bg-[#f5f7fa] p-6 md:p-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-2xl font-semibold text-[#161a1d]">Component Not Found</h1>
          <p className="mt-2 text-[#4f565c]">The component for this tool is not yet available.</p>
          <button
            onClick={() => navigate('/tools')}
            className="mt-4 inline-block rounded-lg bg-[#0d2b5e] px-4 py-2 text-white font-semibold hover:bg-[#1a3a75]"
          >
            Back to Tools
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metadata?.description} />
        <link rel="canonical" href={metadata?.canonical} />

        {/* Open Graph */}
        <meta property="og:title" content={metadata?.og.title} />
        <meta property="og:description" content={metadata?.og.description} />
        <meta property="og:url" content={metadata?.og.url} />
        <meta property="og:type" content={metadata?.og.type} />
        <meta property="og:site_name" content={metadata?.og.site_name} />

        {/* Twitter */}
        <meta name="twitter:card" content={metadata?.twitter.card} />
        <meta name="twitter:title" content={metadata?.twitter.title} />
        <meta name="twitter:description" content={metadata?.twitter.description} />

        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify(metadata?.schema)}
        </script>
      </Helmet>

      <main className="tool-detail-container">
        {/* Back link */}
        <a href="/tools" className="tool-detail-back">← Back to All Tools</a>

        {/* Tool page header */}
        <div className="tool-detail-header">
          <h1>{tool.title}</h1>
          <p className="tool-detail-description">{tool.description}</p>
        </div>

        {/* ── CLS-SAFE TOP BANNER AD (728×90) ─────────── */}
        {/* Space is reserved before ad loads → zero layout shift  */}
        <div className="tool-ad-banner-wrap">
          {hasTopAdSlot ? (
            <ins
              className="adsbygoogle tool-ad-banner"
              style={{ display: 'block' }}
              data-ad-client={ADSENSE_CLIENT}
              data-ad-slot={ADSENSE_TOP_SLOT}
              data-ad-format="horizontal"
              data-full-width-responsive="false"
            />
          ) : null}
        </div>

        {/* ── TWO-COLUMN LAYOUT: tool content + sidebar ── */}
        <div className="tool-layout-grid">

          {/* ── Main column ── */}
          <div className="tool-main-col">
            <div className="tool-card">
              {/* Direct Answer Block — sr-only, crawler-readable */}
              {tool.directAnswer && (
                <div className="sr-only" role="note" aria-label={`Direct answer: ${tool.title}`}>
                  <DirectAnswerBlock directAnswer={tool.directAnswer} />
                </div>
              )}

              {/* Tool Component */}
              <Component />
            </div>

            {/* FAQs */}
            {tool.faqs && tool.faqs.length > 0 && (
              <div className="tool-card" style={{ marginTop: '1rem' }}>
                <h2 className="text-xl font-semibold text-[#0d2b5e]" style={{ marginBottom: '1rem' }}>
                  Frequently Asked Questions
                </h2>
                <FAQSection faqs={tool.faqs} />
              </div>
            )}

            {relatedConcepts.length > 0 && (
              <div className="tool-card" style={{ marginTop: '1rem' }}>
                <h2 className="text-lg font-semibold text-[#0d2b5e]" style={{ marginBottom: '0.6rem' }}>
                  Related Concepts
                </h2>
                <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                  {relatedConcepts.map((concept) => (
                    <li key={concept.term} style={{ marginBottom: '0.35rem' }}>
                      <Link
                        to={`/glossary/${concept.term}`}
                        style={{ color: '#105da8', textDecoration: 'none', fontWeight: 500 }}
                      >
                        Learn more: {concept.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Revenue Loop CTA */}
            <ToolToAgencyCTA />
          </div>

          {/* ── Sidebar: CLS-SAFE 300×600 ad ── */}
          <aside className="tool-sidebar-col">
            <div className="tool-ad-sidebar-wrap">
              {hasSidebarAdSlot ? (
                <ins
                  className="adsbygoogle tool-ad-sidebar"
                  style={{ display: 'block' }}
                  data-ad-client={ADSENSE_CLIENT}
                  data-ad-slot={ADSENSE_SIDEBAR_SLOT}
                  data-ad-format="vertical"
                  data-full-width-responsive="false"
                />
              ) : null}
            </div>
          </aside>

        </div>
      </main>
    </>
  );
}
