import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/**
 * Track a page view on the main website.
 * @param page The name or path of the page being visited.
 */
export const trackPageView = async (page: string) => {
    try {
        // Sanitize page name (remove leading slash, etc.)
        const simplePage = page === '/' ? 'home' : page.replace(/^\//, '').split('/')[0];
        
        await axios.post(`${API_URL}/website/track`, {
            page: simplePage
        });
    } catch (error) {
        // Silently fail as analytics should not break the user experience
        console.error('Analytics tracking failed:', error);
    }
};
