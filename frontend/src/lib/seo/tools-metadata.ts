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
    applicationCategory: slug === 'eu-ai-act-risk-level-classifier' || slug === 'saas-soc2-readiness-calculator'
      ? 'BusinessApplication'
      : slug === 'post-quantum-cbom-generator'
        ? 'SecurityApplication'
        : 'DeveloperApplication',
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

  // Add FAQPage schema if the tool has FAQs
  if (tool.faqs && tool.faqs.length > 0) {
    schema = [
      schema,
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: tool.faqs.map((faq: any) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ];
  }

  // Add AI Act specific metadata
  if (slug === 'eu-ai-act-risk-level-classifier') {
    const mainSchema = Array.isArray(schema) ? schema[0] : schema;
    mainSchema.applicationSubCategory = ['ComplianceTool', 'RiskAssessmentTool'];
    mainSchema.targetAudience = {
      '@type': 'Audience',
      audienceType: ['CISOs', 'Compliance Officers', 'Product Managers', 'Developers', 'Legal Teams'],
    };
    mainSchema.releaseDate = '2025-01-15';
    mainSchema.inLanguage = 'en-US';
    mainSchema.featureList = [
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
