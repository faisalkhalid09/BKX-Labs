import React, { useEffect, useRef, useState } from 'react';

// Declare turnstile property on window for TypeScript
declare global {
  interface Window {
    turnstile?: {
      render: (element: string | HTMLElement, options: any) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onloadTurnstileCallback?: () => void;
  }
}

interface TurnstileWidgetProps {
  onSuccess: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
}

const TurnstileWidget: React.FC<TurnstileWidgetProps> = ({
  onSuccess,
  onError,
  onExpire,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // Load the script dynamically
  useEffect(() => {
    if (window.turnstile) {
      setIsScriptLoaded(true);
      return;
    }

    const scriptId = 'cf-turnstile-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    const handleLoad = () => {
      setIsScriptLoaded(true);
    };

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      // Use explicit render instead of implicit onload callback
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    script.addEventListener('load', handleLoad);

    return () => {
      if (script) {
        script.removeEventListener('load', handleLoad);
      }
    };
  }, []);

  // Render the widget once script is loaded
  useEffect(() => {
    if (!isScriptLoaded || !containerRef.current || !window.turnstile) return;

    const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
    
    if (!siteKey) {
        console.warn('VITE_TURNSTILE_SITE_KEY is not set.');
        return;
    }

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: (token: string) => {
        onSuccess(token);
      },
      'error-callback': () => {
        if (onError) onError();
      },
      'expired-callback': () => {
        if (onExpire) onExpire();
      },
      theme: 'light', // or 'dark', 'auto'
    });

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [isScriptLoaded, onSuccess, onError, onExpire]);

  return <div ref={containerRef} className="cf-turnstile-container" style={{ margin: '1rem 0' }} />;
};

export default TurnstileWidget;
