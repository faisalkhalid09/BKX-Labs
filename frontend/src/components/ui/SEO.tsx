import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    ogImage?: string;
    ogType?: 'website' | 'article';
    canonical?: string;
    structuredData?: object | object[];
}

const SEO = ({
    title,
    description,
    keywords,
    ogImage = 'https://bkxlabs.com/brand-logo.png',
    ogType = 'website',
    canonical,
    structuredData,
}: SEOProps) => {
    const location = useLocation();

    const baseUrl = import.meta.env.VITE_APP_URL || 'https://bkxlabs.com';
    const fullUrl = canonical || `${baseUrl}${location.pathname || '/'}`;
    const fullTitle = `${title} | BKX Labs`;

    // Breadcrumb schema — generated from the current path
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbSchema = pathSegments.length > 0
        ? {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
                ...pathSegments.map((segment, index) => ({
                    '@type': 'ListItem',
                    position: index + 2,
                    name: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
                    item: `${baseUrl}/${pathSegments.slice(0, index + 1).join('/')}`,
                })),
            ],
        }
        : null;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:type" content={ogType} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:site_name" content="BKX Labs" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* Page-specific structured data */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}

            {/* Breadcrumb structured data */}
            {breadcrumbSchema && (
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbSchema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;

