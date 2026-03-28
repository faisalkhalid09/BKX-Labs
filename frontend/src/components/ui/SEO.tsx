import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    ogImage?: string;
    ogType?: 'website' | 'article';
    canonical?: string;
    structuredData?: object;
}

const SEO = ({
    title,
    description,
    keywords = 'software development, web applications, mobile apps, MVP development, UI/UX design, Laravel, React, enterprise software',
    ogImage = 'https://bkxlabs.com/brand-logo.png',
    ogType = 'website',
    canonical,
    structuredData
}: SEOProps) => {
    const location = useLocation();
    
    // Use VITE_APP_URL if defined, fallback to production domain
    const baseUrl = import.meta.env.VITE_APP_URL || 'https://bkxlabs.com';
    const fullUrl = canonical || `${baseUrl}${location.pathname.replace(/\/$/, '') || '/'}`;
    const fullTitle = `${title} | BKX Labs`;

    useEffect(() => {
        // Update document title
        document.title = fullTitle;

        // Update or create meta tags
        const updateMetaTag = (name: string, content: string, isProperty = false) => {
            const attribute = isProperty ? 'property' : 'name';
            let element = document.querySelector(`meta[${attribute}="${name}"]`);

            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attribute, name);
                document.head.appendChild(element);
            }

            element.setAttribute('content', content);
        };

        // Standard meta tags
        updateMetaTag('description', description);
        updateMetaTag('keywords', keywords);

        // Open Graph tags
        updateMetaTag('og:title', fullTitle, true);
        updateMetaTag('og:description', description, true);
        updateMetaTag('og:url', fullUrl, true);
        updateMetaTag('og:type', ogType, true);
        updateMetaTag('og:image', ogImage, true);
        updateMetaTag('og:site_name', 'BKX Labs', true);

        // Twitter Card tags
        updateMetaTag('twitter:card', 'summary_large_image');
        updateMetaTag('twitter:title', fullTitle);
        updateMetaTag('twitter:description', description);
        updateMetaTag('twitter:image', ogImage);

        // Canonical URL
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute('href', fullUrl);

        // Structured Data (JSON-LD)
        // We handle multiple potential script tags and ensure our page-specific one is unique
        if (structuredData) {
            const scriptId = 'json-ld-page-specific';
            let scriptTag = document.getElementById(scriptId);
            if (!scriptTag) {
                scriptTag = document.createElement('script');
                scriptTag.id = scriptId;
                scriptTag.setAttribute('type', 'application/ld+json');
                document.head.appendChild(scriptTag);
            }
            scriptTag.textContent = JSON.stringify(structuredData);
        }

        // Add Breadcrumb Schema
        const pathSegments = location.pathname.split('/').filter(Boolean);
        if (pathSegments.length > 0) {
            const breadcrumbId = 'json-ld-breadcrumb';
            let breadcrumbScript = document.getElementById(breadcrumbId);
            if (!breadcrumbScript) {
                breadcrumbScript = document.createElement('script');
                breadcrumbScript.id = breadcrumbId;
                breadcrumbScript.setAttribute('type', 'application/ld+json');
                document.head.appendChild(breadcrumbScript);
            }

            const breadcrumbData = {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": baseUrl
                    },
                    ...pathSegments.map((segment, index) => ({
                        "@type": "ListItem",
                        "position": index + 2,
                        "name": segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
                        "item": `${baseUrl}/${pathSegments.slice(0, index + 1).join('/')}`
                    }))
                ]
            };
            breadcrumbScript.textContent = JSON.stringify(breadcrumbData);
        }
    }, [location.pathname, fullUrl, fullTitle, description, keywords, ogImage, ogType, structuredData, baseUrl]);

    return null; // This component doesn't render anything
};

export default SEO;
