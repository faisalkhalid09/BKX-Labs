/**
 * entry-server.tsx
 *
 * Used ONLY by the SSG build script (scripts/ssg-render.mjs).
 * Never loaded in the browser.
 *
 * Exports a `render()` function that takes a URL + optional server data
 * and returns a fully rendered HTML string using ReactDOM/server.
 */

import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

export interface ServerData {
  post?: {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    body: string;
    meta_title: string;
    meta_description: string;
    cover_image: string | null;
    reading_time_mins: number | null;
    published_at: string;
  };
  latestPosts?: Array<{
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    cover_image: string | null;
    reading_time_mins: number | null;
    published_at: string;
  }>;
}

// react-helmet-async fills this context object during renderToString
type HelmetContext = Record<string, unknown>;

export function render(url: string, serverData?: ServerData): { html: string; helmetContext: HelmetContext } {
  const helmetContext: HelmetContext = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App serverData={serverData} />
      </StaticRouter>
    </HelmetProvider>
  );

  return {
    html,
    helmetContext: (helmetContext as { helmet: HelmetContext }).helmet ?? {},
  };
}

