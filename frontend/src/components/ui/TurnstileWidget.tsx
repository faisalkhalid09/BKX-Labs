import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (element: string | HTMLElement, options: any) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

interface TurnstileWidgetProps {
  onSuccess: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
}

const SCRIPT_ID = 'cf-turnstile-script';
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

const TurnstileWidget: React.FC<TurnstileWidgetProps> = ({ onSuccess, onError, onExpire }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [isScriptReady, setIsScriptReady] = useState(() => !!window.turnstile);

  // Keep callbacks stable via refs so effect deps don't change
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);
  const onExpireRef = useRef(onExpire);
  useEffect(() => {
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
    onExpireRef.current = onExpire;
  }, [onSuccess, onError, onExpire]);

  // Step 1: Ensure the Turnstile script is loaded
  useEffect(() => {
    // Already available — nothing to do
    if (window.turnstile) {
      setIsScriptReady(true);
      return;
    }

    const markReady = () => setIsScriptReady(true);
    let pollInterval: ReturnType<typeof setInterval> | null = null;

    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

    if (!script) {
      // Inject the script for the first time
      script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.src = SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      script.addEventListener('load', markReady);
    } else {
      // Script tag already exists but 'load' already fired — poll until window.turnstile appears
      pollInterval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(pollInterval!);
          pollInterval = null;
          markReady();
        }
      }, 50);
    }

    return () => {
      script?.removeEventListener('load', markReady);
      if (pollInterval) clearInterval(pollInterval);
    };
  }, []);

  // Step 2: Render the widget once the API is ready
  useEffect(() => {
    if (!isScriptReady || !containerRef.current || !window.turnstile) return;
    if (widgetIdRef.current) return; // already rendered, don't double-render

    const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
    if (!siteKey) {
      console.warn('[Turnstile] VITE_TURNSTILE_SITE_KEY is not set. Widget will not render.');
      return;
    }

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: (token: string) => onSuccessRef.current(token),
      'error-callback': () => onErrorRef.current?.(),
      'expired-callback': () => onExpireRef.current?.(),
      theme: 'light',
    });

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // Silently ignore if widget was already cleaned up by navigation
        }
        widgetIdRef.current = null;
      }
    };
  }, [isScriptReady]);

  return <div ref={containerRef} className="cf-turnstile-container" style={{ margin: '1rem 0' }} />;
};

export default TurnstileWidget;
