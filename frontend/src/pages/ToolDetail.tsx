import { useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { EuAiActClassifier } from '@/components/tools/eu-ai-act-classifier';
import { PostQuantumCBOMGenerator } from '@/components/tools/pq-cbom-generator';
import { SaaSSoc2Calculator } from '@/components/tools/soc2-calculator';
import { CloudGpuCostComparison } from '@/components/tools/cloud-gpu-cost-comparison';
import { NvidiaBlackwellEstimator } from '@/components/tools/nvidia-blackwell-estimator';
import { AiPromptPrivacyAuditor } from '@/components/tools/ai-prompt-privacy-auditor';
import { AdmtProportionalityScorer } from '@/components/tools/admt-proportionality-scorer';
import { NistFips203Planner } from '@/components/tools/nist-fips-203-planner';
import { DirectCoolingROITool } from '@/components/tools/direct-cooling-roi';
import { AgentWorkflowDebugger } from '@/components/tools/agent-workflow-debugger';
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

// Component map for dynamic rendering
const componentMap: Record<string, React.ComponentType<any>> = {
  'eu-ai-act-risk-level-classifier': EuAiActClassifier,
  'post-quantum-cbom-generator': PostQuantumCBOMGenerator,
  'saas-soc2-readiness-calculator': SaaSSoc2Calculator,
  'cloud-gpu-cost-comparison': CloudGpuCostComparison,
  'nvidia-blackwell-pue-estimator': NvidiaBlackwellEstimator,
  'ai-prompt-privacy-auditor': AiPromptPrivacyAuditor,
  'admt-proportionality-scorer': AdmtProportionalityScorer,
  'nist-fips-203-migration-planner': NistFips203Planner,
  'direct-to-chip-liquid-cooling-roi': DirectCoolingROITool,
  'agentic-workflow-debugger': AgentWorkflowDebugger,
  'smart-contract-gas-optimizer': GasOptimizer,
  'esg-carbon-footprint-tracker': CarbonFootprintTracker,
  'zero-knowledge-proof-validator': ZkCircuitValidator,
  'deepfake-detector': DeepfakeDetector,
  'crypto-agility-maturity-model': CryptoAgilityMaturitModel,
};

export default function ToolDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const tool = useMemo(() => {
    return slug ? toolsBySlug[slug] : null;
  }, [slug]);

  const metadata = useMemo(() => {
    return slug ? generateToolMetadata(slug) : null;
  }, [slug]);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [slug]);

  if (!tool) {
    return (
      <>
        <Helmet>
          <title>Tool Not Found - BKX Labs</title>
          <meta name="description" content="The tool you're looking for doesn't exist." />
        </Helmet>
        <div className="min-h-screen bg-[#f8f8f6] p-6 md:p-8">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-2xl font-semibold text-[#161a1d]">Tool Not Found</h1>
            <p className="mt-2 text-[#4f565c]">The tool you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/tools')}
              className="mt-4 inline-block rounded-lg bg-[#105da8] px-4 py-2 text-white font-semibold hover:bg-[#0d4a87]"
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
      <div className="min-h-screen bg-[#f8f8f6] p-6 md:p-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-2xl font-semibold text-[#161a1d]">Component Not Found</h1>
          <p className="mt-2 text-[#4f565c]">The component for this tool is not yet available.</p>
          <button
            onClick={() => navigate('/tools')}
            className="mt-4 inline-block rounded-lg bg-[#105da8] px-4 py-2 text-white font-semibold hover:bg-[#0d4a87]"
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
        <title>{metadata?.title} - BKX Labs</title>
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
        {/* Back button */}
        <a
          href="/tools"
          className="tool-detail-back"
        >
          ← Back to All Tools
        </a>

          {/* Tool page container */}
          <div className="tool-detail-header">
            <h1>{tool.title}</h1>
            <p className="tool-detail-description">{tool.description}</p>
          </div>

          <div className="tool-card">
            {/* Direct Answer Block — screen-reader accessible, indexable by crawlers (sr-only, NOT display:none) */}
            {tool.directAnswer && (
              <div className="sr-only" role="note" aria-label={`Direct answer: ${tool.title}`}>
                <DirectAnswerBlock directAnswer={tool.directAnswer} />
              </div>
            )}

            {/* Tool Component */}
            <div className="mt-8 border-t border-[#d4d9de] pt-8">
              <Component />
            </div>

            {/* FAQs */}
            {tool.faqs && tool.faqs.length > 0 && (
              <div className="mt-12 border-t border-[#d4d9de] pt-12">
                <h2 className="text-2xl font-semibold text-[#161a1d]">Frequently Asked Questions</h2>
                <FAQSection faqs={tool.faqs} />
              </div>
            )}

            {/* Revenue Loop — CTA linking every tool page back to agency services */}
            <ToolToAgencyCTA />
          </div>
      </main>
    </>
  );
}
