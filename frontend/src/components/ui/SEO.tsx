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
    const baseUrl = 'https://bkxlabs.com';
    const fullUrl = canonical || `${baseUrl}${location.pathname}`;
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
        if (structuredData) {
            let scriptTag = document.querySelector('script[type="application/ld+json"]');
            if (!scriptTag) {
                scriptTag = document.createElement('script');
                scriptTag.setAttribute('type', 'application/ld+json');
                document.head.appendChild(scriptTag);
            }
            scriptTag.textContent = JSON.stringify(structuredData);
        }
    }, [title, description, keywords, ogImage, ogType, fullUrl, fullTitle, structuredData]);

    return null; // This component doesn't render anything
};

export default SEO;
