import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { toolsBySlug } from '@/lib/tools/registry';
import { glossaryRegistry } from '@/lib/glossary/registry';
import '@/components/tools/tool-ui.css';
import ToolToAgencyCTA from '@/components/tools/ToolToAgencyCTA';

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
  const entry = useMemo(() => glossaryRegistry.find((item) => item.term === term), [term]);
  const tool = entry ? toolsBySlug[entry.targetToolSlug] : null;
  const articleBlocks = useMemo(() => parseMarkdown(entry?.definitionMarkdown ?? ''), [entry?.definitionMarkdown]);
  const introPreview = useMemo(() => {
    const firstParagraph = articleBlocks.find((block) => block.type === 'p' && block.text);
    return firstParagraph?.text ?? '';
  }, [articleBlocks]);

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

      <main className="tool-detail-container">
        <div className="mb-5 flex items-center justify-between gap-4">
            <Link to="/tools" className="tool-detail-back">
              ← Back to Tools
            </Link>
            <span className="rounded-full border border-[#d4d9de] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#4f565c] shadow-sm">
              BKX Technical Glossary
            </span>
        </div>

          {!entry ? (
            <div className="tool-card">
              We could not find this glossary term.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
              <article className="rounded-2xl border border-[#d4d9de] bg-white p-6 shadow-sm md:p-10">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="tu-tag">BKX Technical Glossary</p>
                    <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-[#161a1d] md:text-5xl">
                      {entry.title}
                    </h1>
                  </div>
                  <span className="hidden rounded-full border border-[#d4d9de] bg-[#f5f7fa] px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#4f565c] md:inline-flex">
                    Mapped to {tool?.title ?? 'Tool'}
                  </span>
                </div>

                {introPreview ? (
                  <div className="tu-aeo mb-6 rounded-xl border border-[#d4d9de] bg-[#f5f7fa] px-5 py-4">
                    <p className="text-sm leading-7 text-[#161a1d]">
                      <strong className="text-[#0d2b5e]">In one sentence:</strong> {introPreview}
                    </p>
                  </div>
                ) : null}

                <div className="glossary-prose max-w-none text-[#161a1d]">
                  {articleBlocks.map((block, index) => {
                    if (block.type === 'h1') {
                      return null;
                    }

                    if (block.type === 'h2') {
                      return (
                        <h2
                          key={`h2-${index}`}
                          className="mt-10 mb-4 text-2xl font-bold tracking-tight text-[#0d2b5e]"
                          dangerouslySetInnerHTML={{ __html: renderInline(block.text ?? '') }}
                        />
                      );
                    }

                    if (block.type === 'h3') {
                      return (
                        <h3
                          key={`h3-${index}`}
                          className="mt-8 mb-3 text-xl font-semibold text-[#161a1d]"
                          dangerouslySetInnerHTML={{ __html: renderInline(block.text ?? '') }}
                        />
                      );
                    }

                    if (block.type === 'ul') {
                      return (
                        <ul key={`ul-${index}`} className="mb-6 ml-6 list-disc space-y-2 text-[1.05rem] leading-8 text-[#4f565c]">
                          {block.items?.map((item, itemIndex) => (
                            <li key={`uli-${itemIndex}`} dangerouslySetInnerHTML={{ __html: renderInline(item) }} />
                          ))}
                        </ul>
                      );
                    }

                    if (block.type === 'ol') {
                      return (
                        <ol key={`ol-${index}`} className="mb-6 ml-6 list-decimal space-y-2 text-[1.05rem] leading-8 text-[#4f565c]">
                          {block.items?.map((item, itemIndex) => (
                            <li key={`oli-${itemIndex}`} dangerouslySetInnerHTML={{ __html: renderInline(item) }} />
                          ))}
                        </ol>
                      );
                    }

                    return (
                      <p
                        key={`p-${index}`}
                        className="mb-6 max-w-none text-[1.08rem] leading-8 text-[#4f565c]"
                        dangerouslySetInnerHTML={{ __html: renderInline(block.text ?? '') }}
                      />
                    );
                  })}
                </div>

                <ToolToAgencyCTA />
              </article>

              <aside className="space-y-4 lg:sticky lg:top-[96px] lg:self-start">
                <div className="tool-card">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#4fa3d1]">Mapped Tool</p>
                  <h2 className="mt-2 text-lg font-bold text-[#0d2b5e]">{tool?.title ?? entry.targetToolSlug}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#4f565c]">
                    Apply this concept with the companion calculator and compare your real inputs.
                  </p>
                  <Link
                    to={`/tools/${entry.targetToolSlug}`}
                    className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#d4d9de] bg-[#f5f7fa] px-4 py-2 text-sm font-semibold text-[#0d2b5e] transition-colors hover:border-[#4fa3d1] hover:bg-white"
                  >
                    Open Tool
                    <ArrowRight size={16} />
                  </Link>
                </div>

                <div className="tool-card">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#4fa3d1]">Learn More</p>
                  <h3 className="mt-2 text-lg font-bold text-[#0d2b5e]">Explore the companion tool</h3>
                  <p className="mt-2 text-sm leading-6 text-[#4f565c]">
                    Use the calculator to quantify this concept against your real inputs, then share the result with your team.
                  </p>
                  <Link
                    to={`/tools/${entry.targetToolSlug}`}
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#0d2b5e] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#1a3a75]"
                  >
                    View Tool
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </aside>
            </div>
          )}
      </main>
    </>
  );
}
