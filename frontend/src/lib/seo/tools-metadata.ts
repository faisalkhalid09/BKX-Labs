import { toolsBySlug } from '@/lib/tools/registry';

/**
 * Generate SEO metadata for a specific tool
 */
export function generateToolMetadata(slug: string) {
  const tool = toolsBySlug[slug];

  if (!tool) {
    return {
      title: 'Tool Not Found',
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

  return {
    title: tool.title,
    description: tool.description,
    canonical: `https://bkxlabs.com/tools/${tool.slug}`,
    og: {
      title: tool.title,
      description: tool.description,
      url: `https://bkxlabs.com/tools/${tool.slug}`,
      type: 'website',
      site_name: 'BKX Labs',
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.title,
      description: tool.description,
      creator: '@bkxlabs',
    },
    schema: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: tool.title,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description: tool.description,
      url: `https://bkxlabs.com/tools/${tool.slug}`,
      provider: {
        '@type': 'Organization',
        name: 'BKX Labs',
        url: 'https://bkxlabs.com',
      },
    },
  };
}
