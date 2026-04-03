const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/**
 * Track a page view using sendBeacon (fire-and-forget, zero impact on page load).
 * sendBeacon is queued by the browser and sent when idle — it never blocks rendering.
 */
export const trackPageView = (page: string): void => {
    try {
        const simplePage = page === '/' ? 'home' : page.replace(/^\//, '').split('/')[0];
        const url = `${API_URL}/website/track`;
        const data = JSON.stringify({ page: simplePage });

        // sendBeacon: zero-blocking, survives page navigation, no response needed
        if (navigator.sendBeacon) {
            const blob = new Blob([data], { type: 'application/json' });
            navigator.sendBeacon(url, blob);
        } else {
            // Fallback: fire-and-forget fetch — no await, no blocking
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: data,
                keepalive: true,  // Survives page unload
            }).catch(() => {}); // Silently swallow errors
        }
    } catch {
        // Analytics must never affect user experience
    }
};
