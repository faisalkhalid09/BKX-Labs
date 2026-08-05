import SEO from '../components/ui/SEO';
import Hero from '../components/ui/Hero';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import { CheckCircle, ArrowRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import './CaseStudy.css';

const CaseStudyDMS = () => {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Enterprise Document Management System Rescue: 100x Faster Search, 94% OCR Accuracy',
        description: 'BKX Labs rescued a 35% complete enterprise DMS stalled for 6 months. Rebuilt the OCR pipeline, implemented Elasticsearch for sub-100ms search, and added Arabic RTL support. Now processes 5,000+ documents daily at 99.9% uptime.',
        datePublished: '2025-06-01',
        dateModified: '2026-08-05',
        author: { '@type': 'Organization', name: 'BKX Labs', url: 'https://bkxlabs.com' },
        publisher: { '@type': 'Organization', name: 'BKX Labs', url: 'https://bkxlabs.com' },
        about: { '@type': 'Thing', name: 'Laravel Elasticsearch Document Management System' },
    };

    return (
        <div>
            <SEO
                title="Enterprise DMS Rescue — 100x Faster Search, 94% OCR | Case Study"
                description="BKX Labs rescued a 35% complete enterprise document management system stalled for 6 months. Delivered sub-100ms Elasticsearch search, 94% OCR accuracy, Arabic RTL support, and 99.9% uptime. Laravel, Elasticsearch, Tesseract."
                keywords="laravel document management system, elasticsearch laravel case study, ocr pipeline development, enterprise dms rescue, laravel elasticsearch performance, stalled project rescue case study"
                ogType="article"
                structuredData={structuredData}
            />

            <Hero
                title="Enterprise DMS Rescue — LocaGed"
                subtitle="Inherited a 35% complete document management system stalled for 6 months. Rebuilt the OCR pipeline, implemented Elasticsearch for 100x faster search, and delivered 99.9% uptime at 5,000+ documents per day."
            />

            {/* Summary stats */}
            <Section style={{ background: 'var(--surface-subtle, #f8fafc)' }}>
                <Container>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
                        {[
                            { value: '100x', label: 'Faster Search' },
                            { value: '94%', label: 'OCR Accuracy' },
                            { value: '5,000+', label: 'Documents/Day' },
                            { value: '99.9%', label: 'Uptime' },
                        ].map((stat, i) => (
                            <div key={i} style={{ padding: '1.5rem', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary, #2563eb)' }}>{stat.value}</div>
                                <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Project details */}
            <Section>
                <Container>
                    <div className="case-study-block">
                        <div className="case-badge">
                            <FileText size={24} />
                            <span>Enterprise Document Management System — Multi-Language</span>
                        </div>

                        <div className="case-grid">
                            <div className="case-section-block">
                                <h2>The Challenge</h2>
                                <p>
                                    The client came to us with a complex DMS project approximately 35% complete
                                    and stalled for over 6 months. The previous team had implemented basic file storage
                                    but failed to deliver the core OCR and search functionality that made the system valuable.
                                </p>
                                <ul>
                                    <li>Non-functional OCR integration with only 65% character recognition accuracy</li>
                                    <li>MySQL full-text search causing 10+ second query times on large document sets</li>
                                    <li>No RTL (Right-to-Left) language support — critical for Arabic-language documents</li>
                                    <li>Memory leaks in document processing background workers causing frequent crashes</li>
                                    <li>Unoptimized file storage consuming excessive disk space with no compression pipeline</li>
                                </ul>
                            </div>

                            <div className="case-section-block">
                                <h2>The Technical Solution</h2>
                                <p>
                                    We re-architected the core document processing pipeline using a Redis queue-based
                                    approach, implemented Elasticsearch with custom Arabic analyzers for sub-second search,
                                    and rebuilt the OCR pipeline with Tesseract optimization and image preprocessing.
                                </p>
                                <ul>
                                    <li><strong>Phase 1:</strong> Codebase audit, architecture redesign, and memory leak resolution</li>
                                    <li><strong>Phase 2:</strong> Elasticsearch implementation with custom Arabic language analyzers</li>
                                    <li><strong>Phase 3:</strong> OCR pipeline rebuild with Tesseract + image preprocessing (deskew, denoise, binarize)</li>
                                    <li><strong>Phase 4:</strong> Redis queue workers for background document processing with Horizon monitoring</li>
                                    <li><strong>Phase 5:</strong> RTL support and multi-language interface with Vue.js</li>
                                    <li><strong>Phase 6:</strong> Performance optimization and k6 load testing under 5,000+ document/day load</li>
                                </ul>
                            </div>

                            <div className="case-section-block">
                                <h2>Results</h2>
                                <p>
                                    Search queries dropped from 10+ seconds to under 100 milliseconds — a 100x improvement —
                                    through Elasticsearch with custom analyzers replacing MySQL full-text search.
                                    OCR accuracy improved from 65% to 94% through image preprocessing pipelines.
                                    The system now processes 5,000+ documents daily at 99.9% uptime.
                                    Arabic RTL support opened the platform to an entirely new market segment.
                                </p>
                            </div>

                            <div className="case-section-block tech-block">
                                <h3>Technology Stack</h3>
                                <div className="tech-tags">
                                    <span>Laravel 10</span><span>Vue.js</span><span>Elasticsearch</span>
                                    <span>Redis</span><span>Tesseract OCR</span><span>PostgreSQL</span>
                                    <span>Docker</span><span>MinIO (S3-compatible)</span>
                                    <span>Laravel Horizon</span><span>Nginx</span>
                                </div>
                            </div>
                        </div>

                        <div className="case-features">
                            <h3>Key Features Delivered</h3>
                            <div className="features-grid">
                                {[
                                    'OCR-powered document indexing with 94% accuracy',
                                    'Sub-100ms full-text search via Elasticsearch',
                                    'Full RTL (Arabic) language support throughout the UI',
                                    'Background document processing with Redis queue workers',
                                    'Document version control and change history',
                                    'Role-based permissions with full audit logging',
                                ].map((feature, i) => (
                                    <div key={i} className="feature-item">
                                        <CheckCircle size={20} />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* CTA */}
            <Section className="case-cta">
                <Container>
                    <div className="cta-content">
                        <h2>Have a Stalled or Broken Project?</h2>
                        <p>
                            We rescue complex software projects that other teams couldn't deliver.
                            Book a strategy call to see if your project qualifies for our Diagnostic Audit.
                        </p>
                        <Link to="/contact" className="btn btn-primary">
                            Book a Rescue Strategy Call <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                        </Link>
                        <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                            Or <Link to="/case-studies/edtech-platform-rescue">see our EdTech platform rescue case study →</Link>
                        </p>
                    </div>
                </Container>
            </Section>
        </div>
    );
};

export default CaseStudyDMS;
