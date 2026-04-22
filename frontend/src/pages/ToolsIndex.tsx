import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { toolsRegistry } from '@/lib/tools/registry';
import { generateToolsIndexMetadata } from '@/lib/seo/tools-metadata';

export default function ToolsIndex() {
  const metadata = generateToolsIndexMetadata();

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <link rel="canonical" href={metadata.canonical} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:url" content={metadata.canonical} />
        <meta property="og:type" content="website" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Utility Tools Suite",
            "description": metadata.description,
            "url": metadata.canonical,
            "publisher": {
              "@type": "Organization",
              "name": "BKX Labs",
              "url": "https://bkxlabs.com"
            }
          })}
        </script>
      </Helmet>

      <main className="tools-container">
        <section className="tools-title-section">
          <h1>Utility Tool Suite</h1>
          <p>
            Search-ready, fast-loading tools designed for technical decisions that need immediate answers.
            Free compliance, security, and infrastructure utilities.
          </p>
        </section>

        <div className="tools-grid">
          {toolsRegistry.map((tool: any) => (
            <article
              key={tool.slug}
              className="tools-card"
            >
              <h2>{tool.title}</h2>
              <p>{tool.valueProposition}</p>
              <Link
                to={`/tools/${tool.slug}`}
                className="tools-card-button"
              >
                Open Tool →
              </Link>
            </article>
          ))}
        </div>

        <section style={{ marginTop: '2rem', textAlign: 'center', color: '#4f565c' }}>
          <p style={{ fontSize: '0.95rem' }}>
            All tools are free, require no installation, and load instantly.
          </p>
        </section>
      </main>
    </>
  );
}
