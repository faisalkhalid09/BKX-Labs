import { toolsBySlug } from '@/lib/tools/registry';

/**
 * Extract keywords from title and description for SEO
 */
function extractKeywords(title: string, description: string): string {
  const words = [
    ...title.toLowerCase().split(/\s+/),
    ...description.toLowerCase().split(/\s+/).slice(0, 15),
  ].filter(w => w.length > 4 && !['that', 'with', 'from', 'tool'].includes(w));
  
  return [...new Set(words)].slice(0, 12).join(', ');
}

/**
 * Generate comprehensive SEO metadata for a specific tool
 */
export function generateToolMetadata(slug: string) {
  const tool = toolsBySlug[slug];

  if (!tool) {
    return {
      title: 'Tool Not Found - BKX Labs',
      description: 'The tool you are looking for does not exist.',
      canonical: `https://bkxlabs.com/tools`,
      og: {
        title: 'Tool Not Found',
        description: 'The tool you are looking for does not exist.',
        url: `https://bkxlabs.com/tools`,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Tool Not Found',
        description: 'The tool you are looking for does not exist.',
      },
    };
  }

  const toolUrl = `https://bkxlabs.com/tools/${tool.slug}`;

  // Enhanced schema for EU AI Act classifier
  let schema: any = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.title,
    description: tool.description,
    url: toolUrl,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    creator: {
      '@type': 'Organization',
      name: 'BKX Labs',
      url: 'https://bkxlabs.com',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  // Add FAQPage schema if this is the EU AI Act classifier
  if (slug === 'eu-ai-act-risk-level-classifier') {
    schema = [
      schema,
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What changed in the EU AI Act 2.0 (2024/1689) vs. earlier drafts?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The 2024 consolidated text (Regulation 2024/1689) brings binding enforcement effective August 2025 (limited rules), with full High-Risk/Prohibited implementation by August 2026. Key changes: Annex III expanded to clarify biometric systems, social media recommendation algorithms, and real-time identification in gov spaces; Article 6 conformity assessment now distinguishes notified-body vs. in-house technical file pathways; NASS registration made mandatory; transition periods for pre-existing High-Risk systems; and Article 49 exemptions for law enforcement national security.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do all AI systems need EU AI Act compliance assessment?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Only systems that: (1) carry Unacceptable or High risk per Annex III, or (2) have transparency triggers (emotion recognition, deepfakes). General-purpose LLMs and minimal-risk systems benefit from transparency but have no binding compliance burden. However, if your system serves an EU user, data subject, or entity, compliance is required regardless of where your company is based.',
            },
          },
          {
            '@type': 'Question',
            name: 'What\'s the penalty for deploying a prohibited practice after 2026?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Administrative fines up to €20 million or 4% of annual global turnover (whichever is higher) for Unacceptable-risk violations (Article 5). High-Risk non-compliance carries fines up to €15 million or 3% of global turnover. Progressive enforcement: EU AI Office began monitoring July 2024, with escalating penalties from 2026 onward.',
            },
          },
          {
            '@type': 'Question',
            name: 'How long does EU AI Act compliance typically take?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'For High-Risk systems: 6–18 months (assessment, risk management plan, technical documentation, human-in-the-loop design, testing, NASS registration, CE mark). Smaller organizations or simpler use cases: 3–6 months. Limited-risk transparency: 1–3 months (disclosure templates, privacy notices). This classifier gives estimated effort per requirement.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I use this classifier\'s output as legal evidence?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'This tool is a fast screening framework, not a legal opinion. Your output is an internal engineering artifact. For regulatory evidence, pair this assessment with documented legal review, a formal privacy impact assessment (DPIA), ISO 42001 AI governance documentation, and compliance records signed by your Data Protection Officer or Legal team. If audited, provide this tool\'s output plus your remediation steps as supporting material.',
            },
          },
        ],
      },
    ];

    // Add AI Act specific metadata
    schema[0].applicationSubCategory = ['ComplianceTool', 'RiskAssessmentTool'];
    schema[0].targetAudience = {
      '@type': 'Audience',
      audienceType: ['CISOs', 'Compliance Officers', 'Product Managers', 'Developers', 'Legal Teams'],
    };
    schema[0].releaseDate = '2025-01-15';
    schema[0].inLanguage = 'en-US';
    schema[0].featureList = [
      'Full Annex III compliance mapping',
      'Article 5 prohibited practice detection',
      'Regulatory reference generation',
      'Compliance requirement checklist',
      'Audit documentation templates',
      'Real-time risk visualization',
    ];
  }

  return {
    title: `${tool.title} | Free Tool - BKX Labs`,
    description: tool.description,
    keywords: extractKeywords(tool.title, tool.description),
    canonical: toolUrl,
    og: {
      title: tool.title,
      description: tool.description,
      url: toolUrl,
      type: 'website',
      site_name: 'BKX Labs Utility Tools',
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.title,
      description: tool.description,
      creator: '@bkxlabs',
    },
    schema,
  };
}

/**
 * Generate SEO metadata for the tools index page
 */
export function generateToolsIndexMetadata() {
  return {
    title: 'Free Utility Tools Suite - BKX Labs',
    description: 'Fast-loading, search-ready tools for technical decisions. EU AI Act classifier, Post-Quantum CBOM analyzer, SOC 2 readiness calculator, cloud GPU cost comparison, and more.',
    keywords: 'compliance tools, security tools, AI classification, cryptography testing, SOC 2 calculator, compliance framework, post-quantum crypto',
    canonical: 'https://bkxlabs.com/tools',
  };
}
