import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { toolsBySlug } from '@/lib/tools/registry';

type GlossaryEntry = {
  term: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  targetToolSlug: string;
  definitionMarkdown: string;
};

function parseMarkdown(markdown: string): Array<{ type: 'h1' | 'h2' | 'h3' | 'p' | 'ul' | 'ol'; text?: string; items?: string[] }> {
  const lines = markdown.split('\n');
  const blocks: Array<{ type: 'h1' | 'h2' | 'h3' | 'p' | 'ul' | 'ol'; text?: string; items?: string[] }> = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) {
      i += 1;
      continue;
    }

    if (line.startsWith('# ')) {
      blocks.push({ type: 'h1', text: line.slice(2).trim() });
      i += 1;
      continue;
    }

    if (line.startsWith('## ')) {
      blocks.push({ type: 'h2', text: line.slice(3).trim() });
      i += 1;
      continue;
    }

    if (line.startsWith('### ')) {
      blocks.push({ type: 'h3', text: line.slice(4).trim() });
      i += 1;
      continue;
    }

    if (line.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().slice(2).trim());
        i += 1;
      }
      blocks.push({ type: 'ul', items });
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, '').trim());
        i += 1;
      }
      blocks.push({ type: 'ol', items });
      continue;
    }

    const paragraphLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith('#') &&
      !lines[i].trim().startsWith('- ') &&
      !/^\d+\.\s/.test(lines[i].trim())
    ) {
      paragraphLines.push(lines[i].trim());
      i += 1;
    }

    blocks.push({ type: 'p', text: paragraphLines.join(' ') });
  }

  return blocks;
}

function renderInline(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code class="rounded bg-slate-100 px-1 py-0.5 text-[0.9em]">$1</code>');
}

export default function GlossaryTermPage() {
  const { term } = useParams<{ term: string }>();
  const [entries, setEntries] = useState<GlossaryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadRegistry = async () => {
      setLoading(true);
      setError(null);
      const registryPaths = ['/data/glossary-registry.json', '/backend/data/glossary-registry.json'];

      try {
        for (const path of registryPaths) {
          const response = await fetch(path, { cache: 'no-store' });
          if (!response.ok) continue;

          const raw = await response.text();
          const looksLikeJson = raw.trim().startsWith('[') || raw.trim().startsWith('{');
          if (!looksLikeJson) continue;

          const data = JSON.parse(raw) as GlossaryEntry[];
          if (mounted) {
            setEntries(data);
            setError(null);
          }
          return;
        }

        if (mounted) {
          setError('Glossary content is temporarily unavailable.');
          setEntries([]);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Unable to load glossary content.');
          setEntries([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadRegistry();
    return () => {
      mounted = false;
    };
  }, []);

  const entry = useMemo(() => entries.find((item) => item.term === term), [entries, term]);
  const tool = entry ? toolsBySlug[entry.targetToolSlug] : null;
  const articleBlocks = useMemo(() => parseMarkdown(entry?.definitionMarkdown ?? ''), [entry?.definitionMarkdown]);

  const canonical = entry
    ? `https://bkxlabs.com/glossary/${entry.term}`
    : 'https://bkxlabs.com/glossary';

  return (
    <>
      <Helmet>
        <title>{entry ? `${entry.seoTitle} | BKX Labs` : 'Technical Glossary | BKX Labs'}</title>
        <meta
          name="description"
          content={entry?.metaDescription ?? 'Technical glossary and implementation guides for AI, security, and infrastructure teams.'}
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={entry ? `${entry.seoTitle} | BKX Labs` : 'Technical Glossary | BKX Labs'} />
        <meta
          property="og:description"
          content={entry?.metaDescription ?? 'Technical glossary and implementation guides for AI, security, and infrastructure teams.'}
        />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="article" />
      </Helmet>

      <main className="bg-gradient-to-b from-slate-50 via-white to-slate-100 px-6 py-12 md:px-10 lg:px-14">
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <div className="mb-6 flex items-center justify-between gap-4">
            <Link to="/tools" className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
              ← Back to Tools
            </Link>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
              BKX Technical Glossary
            </span>
          </div>

          {loading ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-600">
              Loading glossary term...
            </div>
          ) : error ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-8 text-center text-rose-700">
              {error}
            </div>
          ) : !entry ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-8 text-center text-amber-800">
              We could not find this glossary term.
            </div>
          ) : (
            <article className="text-slate-800">
              {articleBlocks.map((block, index) => {
                if (block.type === 'h1') {
                  return (
                    <h1
                      key={`h1-${index}`}
                      className="mb-6 text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl"
                      dangerouslySetInnerHTML={{ __html: renderInline(block.text ?? '') }}
                    />
                  );
                }

                if (block.type === 'h2') {
                  return (
                    <h2
                      key={`h2-${index}`}
                      className="mt-10 mb-4 text-2xl font-bold tracking-tight text-slate-900"
                      dangerouslySetInnerHTML={{ __html: renderInline(block.text ?? '') }}
                    />
                  );
                }

                if (block.type === 'h3') {
                  return (
                    <h3
                      key={`h3-${index}`}
                      className="mt-8 mb-3 text-xl font-semibold text-slate-900"
                      dangerouslySetInnerHTML={{ __html: renderInline(block.text ?? '') }}
                    />
                  );
                }

                if (block.type === 'ul') {
                  return (
                    <ul key={`ul-${index}`} className="mb-6 ml-6 list-disc space-y-2 text-[1.04rem] leading-8 text-slate-700">
                      {block.items?.map((item, itemIndex) => (
                        <li key={`uli-${itemIndex}`} dangerouslySetInnerHTML={{ __html: renderInline(item) }} />
                      ))}
                    </ul>
                  );
                }

                if (block.type === 'ol') {
                  return (
                    <ol key={`ol-${index}`} className="mb-6 ml-6 list-decimal space-y-2 text-[1.04rem] leading-8 text-slate-700">
                      {block.items?.map((item, itemIndex) => (
                        <li key={`oli-${itemIndex}`} dangerouslySetInnerHTML={{ __html: renderInline(item) }} />
                      ))}
                    </ol>
                  );
                }

                return (
                  <p
                    key={`p-${index}`}
                    className="mb-6 text-[1.06rem] leading-8 text-slate-700"
                    dangerouslySetInnerHTML={{ __html: renderInline(block.text ?? '') }}
                  />
                );
              })}

              <section className="mt-12 rounded-2xl border border-sky-300 bg-gradient-to-r from-sky-900 via-blue-900 to-indigo-900 p-6 text-white shadow-lg md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-200">Implementation Bridge</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">Ready to apply this to your codebase?</h2>
                <p className="mt-3 max-w-2xl text-sm text-sky-100 md:text-base">
                  Use our free {tool?.title ?? 'tool'} calculator to turn this concept into an actionable technical assessment for your team.
                </p>
                <div className="mt-5">
                  <Link
                    to={entry.targetToolSlug ? `/tools/${entry.targetToolSlug}` : '/tools'}
                    className="inline-flex items-center gap-2 rounded-lg bg-amber-300 px-5 py-3 text-sm font-bold text-slate-900 transition-colors hover:bg-amber-200"
                  >
                    Use our free {tool?.title ?? 'calculator'} calculator
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </section>
            </article>
          )}
        </div>
      </main>
    </>
  );
}
