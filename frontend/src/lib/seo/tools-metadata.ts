import { toolsBySlug } from '@/lib/tools/registry';

/**
 * Per-slug overrides for title and meta description.
 * Used for pages ranking on page 1 but generating near-zero clicks
 * (action-oriented rewrites to improve CTR from search snippets).
 */
const TOOL_META_OVERRIDES: Record<string, { title: string; description: string }> = {
  'deepfake-detector-probability': {
    title: 'Deepfake Probability Scorer — Free Tool | BKX Labs',
    description:
      'Score any media file for AI-generation probability in seconds. Weighted artifact indicators — codec, cadence, A/V desync, facial anomalies. No forensics lab required.',
  },
  'agentic-workflow-debugger': {
    title: 'Agentic AI Workflow Debugger — Free Tool | BKX Labs',
    description:
      'Detect infinite loops, dead nodes, and missing guards in your agent graph before deployment. Free static analysis — no signup, no install required.',
  },
};

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
 * Generate comprehensive SEO metadata for a specific tool.
 * FAQPage JSON-LD is built dynamically from each tool's faqs array so that
 * the schema questions are always identical to what the user sees on the page.
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

  // Apply per-slug CTR overrides when present, otherwise use generic template
  const override = TOOL_META_OVERRIDES[slug];
  const pageTitle = override?.title ?? `${tool.title} | Free Tool - BKX Labs`;
  const pageDescription = override?.description ?? tool.description;

  // Base SoftwareApplication schema
  const softwareSchema: Record<string, unknown> = {
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

  // Dynamic FAQPage schema — built from the same faqs array that FAQSection renders.
  // Google requires exact parity between schema questions and visible page content.
  let schema: unknown = softwareSchema;

  if (tool.faqs && tool.faqs.length > 0) {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: tool.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };

    schema = [softwareSchema, faqSchema];
  }

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: extractKeywords(tool.title, tool.description),
    canonical: toolUrl,
    og: {
      title: override?.title ?? tool.title,
      description: pageDescription,
      url: toolUrl,
      type: 'website',
      site_name: 'BKX Labs Utility Tools',
    },
    twitter: {
      card: 'summary_large_image',
      title: override?.title ?? tool.title,
      description: pageDescription,
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
    description:
      'Fast-loading, search-ready tools for technical decisions. EU AI Act classifier, Post-Quantum CBOM analyzer, SOC 2 readiness calculator, cloud GPU cost comparison, and more.',
    keywords:
      'compliance tools, security tools, AI classification, cryptography testing, SOC 2 calculator, compliance framework, post-quantum crypto',
    canonical: 'https://bkxlabs.com/tools',
  };
}
