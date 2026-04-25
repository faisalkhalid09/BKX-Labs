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
        {/* Back link */}
        <Link to="/tools" className="tool-detail-back">← Back to All Tools</Link>

        {!entry ? (
          <div className="tool-card" style={{ padding: '2rem', textAlign: 'center' }}>
            <h2 style={{ color: '#0d2b5e', marginBottom: '0.5rem' }}>Term Not Found</h2>
            <p style={{ color: '#4f565c' }}>We could not find this glossary term.</p>
          </div>
        ) : (
          <>
            {/* Glossary Header */}
            <div className="tool-detail-header" style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4fa3d1', backgroundColor: '#f5f7fa', padding: '0.375rem 0.75rem', borderRadius: '9999px' }}>
                  Glossary
                </span>
                {tool && (
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4f565c', backgroundColor: '#e8ecf1', padding: '0.375rem 0.75rem', borderRadius: '9999px' }}>
                    Mapped to {tool.title}
                  </span>
                )}
              </div>
              <h1 style={{ fontSize: 'clamp(1.875rem, 5vw, 3rem)', fontWeight: 800, color: '#161a1d', marginBottom: '0.5rem', lineHeight: 1.2 }}>
                {entry.title}
              </h1>
              <p style={{ fontSize: '1rem', color: '#4f565c', lineHeight: 1.6, maxWidth: '90ch' }}>
                {entry.metaDescription}
              </p>
            </div>

            {/* Two-column layout: main content + sidebar */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
              {/* Main Content */}
              <div>
                {/* Quick Summary Card */}
                {introPreview ? (
                  <div className="tool-card" style={{ marginBottom: '1.5rem', backgroundColor: '#f5f7fa', borderLeft: '4px solid #4fa3d1' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4fa3d1', marginBottom: '0.5rem' }}>
                      Quick Summary
                    </p>
                    <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#161a1d', margin: 0 }}>
                      {introPreview}
                    </p>
                  </div>
                ) : null}

                {/* Main Article Content */}
                <div className="tool-card" style={{ border: '0', background: 'transparent', boxShadow: 'none', padding: 0 }}>
                  {articleBlocks.map((block, index) => {
                    if (block.type === 'h1') {
                      return null;
                    }

                    if (block.type === 'h2') {
                      return (
                        <h2
                          key={`h2-${index}`}
                          style={{ marginTop: '1.75rem', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 700, color: '#0d2b5e', lineHeight: 1.3 }}
                          dangerouslySetInnerHTML={{ __html: renderInline(block.text ?? '') }}
                        />
                      );
                    }

                    if (block.type === 'h3') {
                      return (
                        <h3
                          key={`h3-${index}`}
                          style={{ marginTop: '1.25rem', marginBottom: '0.75rem', fontSize: '1.125rem', fontWeight: 600, color: '#161a1d', lineHeight: 1.4 }}
                          dangerouslySetInnerHTML={{ __html: renderInline(block.text ?? '') }}
                        />
                      );
                    }

                    if (block.type === 'ul') {
                      return (
                        <ul key={`ul-${index}`} style={{ marginBottom: '1.5rem', marginLeft: '1.5rem', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {block.items?.map((item, itemIndex) => (
                            <li key={`uli-${itemIndex}`} style={{ fontSize: '1rem', lineHeight: 1.6, color: '#4f565c' }} dangerouslySetInnerHTML={{ __html: renderInline(item) }} />
                          ))}
                        </ul>
                      );
                    }

                    if (block.type === 'ol') {
                      return (
                        <ol key={`ol-${index}`} style={{ marginBottom: '1.5rem', marginLeft: '1.5rem', listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {block.items?.map((item, itemIndex) => (
                            <li key={`oli-${itemIndex}`} style={{ fontSize: '1rem', lineHeight: 1.6, color: '#4f565c' }} dangerouslySetInnerHTML={{ __html: renderInline(item) }} />
                          ))}
                        </ol>
                      );
                    }

                    return (
                      <p
                        key={`p-${index}`}
                        style={{ marginBottom: '1rem', fontSize: '1rem', lineHeight: 1.7, color: '#4f565c' }}
                        dangerouslySetInnerHTML={{ __html: renderInline(block.text ?? '') }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Sidebar */}
              <aside className="xl:sticky xl:top-24 xl:self-start" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="tool-card">
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4fa3d1', marginBottom: '0.75rem' }}>
                    📊 companion tool
                  </p>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0d2b5e', marginBottom: '0.5rem' }}>
                    {tool?.title ?? 'Related Tool'}
                  </h3>
                  <p style={{ fontSize: '0.925rem', lineHeight: 1.6, color: '#4f565c', marginBottom: '1rem' }}>
                    Use the interactive calculator to apply this concept with your own inputs.
                  </p>
                  <Link
                    to={`/tools/${entry.targetToolSlug}`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', backgroundColor: '#0d2b5e', color: 'white', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.925rem', transition: 'all 0.2s', border: '1px solid #0d2b5e' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#1a3a75';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#0d2b5e';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Open Calculator
                    <ArrowRight size={16} />
                  </Link>
                </div>

                <div className="tool-card" style={{ backgroundColor: '#f5f7fa', borderTop: '2px solid #4fa3d1' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4fa3d1', marginBottom: '0.75rem' }}>
                    🚀 next step
                  </p>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0d2b5e', marginBottom: '0.5rem' }}>
                    Implementation
                  </h3>
                  <p style={{ fontSize: '0.925rem', lineHeight: 1.6, color: '#4f565c', marginBottom: '0' }}>
                    Ready to apply this? Try the calculator to see how it works in practice.
                  </p>
                </div>
              </aside>
            </div>

            {/* Keep this at the end so article can fully expand first */}
            <div style={{ marginTop: '1.5rem' }}>
              <ToolToAgencyCTA />
            </div>
          </>
        )}
      </main>
    </>
  );
}
