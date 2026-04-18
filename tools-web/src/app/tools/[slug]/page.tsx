import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EuAiActClassifier } from "@/components/tools/eu-ai-act-classifier";
import { PostQuantumCBOMGenerator } from "@/components/tools/pq-cbom-generator";
import { SaaSSoc2Calculator } from "@/components/tools/soc2-calculator";
import { CloudGpuCostComparison } from "@/components/tools/cloud-gpu-cost-comparison";
import { NvidiaBlackwellEstimator } from "@/components/tools/nvidia-blackwell-estimator";
import { AiPromptPrivacyAuditor } from "@/components/tools/ai-prompt-privacy-auditor";
import { AdmtProportionalityScorer } from "@/components/tools/admt-proportionality-scorer";
import { NistFips203Planner } from "@/components/tools/nist-fips-203-planner";
import { DirectCoolingROITool } from "@/components/tools/direct-cooling-roi";
import { toolsBySlug } from "@/lib/tools/registry";

type ToolPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = toolsBySlug[slug];

  if (!tool) {
    return {
      title: "Tool Not Found",
    };
  }

  return {
    title: tool.title,
    description: tool.description,
    alternates: {
      canonical: `/tools/${tool.slug}`,
    },
    openGraph: {
      title: tool.title,
      description: tool.description,
      url: `https://bkxlabs.com/tools/${tool.slug}`,
      siteName: "BKX Tools",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tool.title,
      description: tool.description,
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = toolsBySlug[slug];

  if (!tool) {
    notFound();
  }

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.title,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: tool.description,
    url: `https://bkxlabs.com/tools/${tool.slug}`,
    provider: {
      "@type": "Organization",
      name: "BKX Labs",
      url: "https://bkxlabs.com",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="tool-shell">
        <aside className="ad-sidebar" aria-label="Left sidebar ad reserved slot">
          <div className="ad-slot sidebar">Sidebar Sticky Ad Placeholder</div>
        </aside>

        <section className="tool-main">
          <div className="aeo-direct-answer" aria-label="Direct Answer">
            <h2>Direct Answer</h2>
            <p>
              {tool.directAnswer.sentence1} {tool.directAnswer.sentence2}
            </p>
          </div>

          {slug === "eu-ai-act-risk-level-classifier" && <EuAiActClassifier />}
          {slug === "post-quantum-cbom-generator" && <PostQuantumCBOMGenerator />}
          {slug === "saas-soc2-readiness-calculator" && <SaaSSoc2Calculator />}
          {slug === "cloud-gpu-cost-comparison" && <CloudGpuCostComparison />}
          {slug === "nvidia-blackwell-pue-estimator" && <NvidiaBlackwellEstimator />}
          {slug === "ai-prompt-privacy-auditor" && <AiPromptPrivacyAuditor />}
          {slug === "admt-proportionality-scorer" && <AdmtProportionalityScorer />}
          {slug === "nist-fips-203-migration-timeline-planner" && <NistFips203Planner />}
          {slug === "direct-to-chip-liquid-cooling-roi" && <DirectCoolingROITool />}

          <section className="faq-area" aria-label="Commonly Asked Questions">
            <h3 className="text-lg font-semibold">Commonly Asked Questions</h3>
            <dl>
              {tool.faqs.map((item) => (
                <div key={item.question}>
                  <dt>{item.question}</dt>
                  <dd>{item.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        </section>

        <aside className="ad-sidebar" aria-label="Right sidebar ad reserved slot">
          <div className="ad-slot sidebar">Sidebar Sticky Ad Placeholder</div>
        </aside>
      </section>
    </>
  );
}
