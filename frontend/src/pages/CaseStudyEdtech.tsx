import SEO from '../components/ui/SEO';
import Hero from '../components/ui/Hero';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import { CheckCircle, ArrowRight, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import './CaseStudy.css';

const CaseStudyEdtech = () => {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'EdTech Platform Rescue: 40% AWS Cost Reduction, 100% Completion from 20% Stalled Codebase',
        description: 'BKX Labs inherited a 20% complete EdTech platform abandoned by the previous development team. We delivered a full production system serving 80,000+ students across Saudi Arabia with 40% AWS cost reduction and sub-200ms response times.',
        datePublished: '2025-06-01',
        dateModified: '2026-08-05',
        author: { '@type': 'Organization', name: 'BKX Labs', url: 'https://bkxlabs.com' },
        publisher: { '@type': 'Organization', name: 'BKX Labs', url: 'https://bkxlabs.com' },
        about: { '@type': 'Thing', name: 'Laravel EdTech Platform Development' },
    };

    return (
        <div>
            <SEO
                title="EdTech Platform Rescue — 40% AWS Cost Reduction | Case Study"
                description="BKX Labs rescued a 20% complete EdTech platform abandoned by the previous team. Delivered full production system with 40% AWS cost reduction, sub-200ms response times, and zero security incidents. Laravel 10, React, AWS."
                keywords="laravel edtech platform development, edtech rescue case study, laravel project rescue, aws cost reduction laravel, stalled project rescue, laravel react case study"
                ogType="article"
                structuredData={structuredData}
            />

            <Hero
                title="EdTech Platform Rescue — Class Moalimy"
                subtitle="Inherited a 20% complete, abandoned codebase. Delivered a full-scale production EdTech platform serving Saudi Arabia — with 40% AWS cost reduction and sub-200ms response times."
            />

            {/* Summary stats */}
            <Section style={{ background: 'var(--surface-subtle, #f8fafc)' }}>
                <Container>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
                        {[
                            { value: '100%', label: 'Project Completion' },
                            { value: '40%', label: 'AWS Cost Reduction' },
                            { value: '<200ms', label: 'Average Response Time' },
                            { value: 'Zero', label: 'Security Incidents' },
                        ].map((stat, i) => (
                            <div key={i} style={{ padding: '1.5rem', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary, #2563eb)' }}>{stat.value}</div>
                                <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Project overview */}
            <Section>
                <Container>
                    <div className="case-study-block">
                        <div className="case-badge">
                            <Globe size={24} />
                            <span>EdTech Platform — Saudi Arabia</span>
                        </div>

                        <div className="case-grid">
                            <div className="case-section-block">
                                <h2>The Challenge</h2>
                                <p>
                                    The client approached us with a partially developed EdTech system (approximately 20% complete)
                                    that had been abandoned by the previous development team. The existing codebase
                                    suffered from architectural inconsistencies, security vulnerabilities, and incomplete
                                    feature implementations.
                                </p>
                                <ul>
                                    <li>Unstructured AWS S3 integration with exposed credentials in version-controlled config</li>
                                    <li>Missing role-based access control (RBAC) — all users had the same permission level</li>
                                    <li>No documentation or automated test coverage</li>
                                    <li>Denormalized database schema with 200+ queries per page load</li>
                                    <li>Incomplete user authentication flow with no email verification or session management</li>
                                </ul>
                            </div>

                            <div className="case-section-block">
                                <h2>The Technical Solution</h2>
                                <p>
                                    We conducted a full codebase audit, documented all existing functionality,
                                    and implemented a phase-gated recovery plan with clear milestones and acceptance criteria.
                                </p>
                                <ul>
                                    <li><strong>Phase 1:</strong> Security audit, AWS credential rotation, and secrets management setup</li>
                                    <li><strong>Phase 2:</strong> Database restructuring, normalization, and query optimization</li>
                                    <li><strong>Phase 3:</strong> Complete RBAC implementation (Admin, Teacher, Student, Parent)</li>
                                    <li><strong>Phase 4:</strong> Secure file upload architecture with pre-signed S3 URLs and CloudFront CDN</li>
                                    <li><strong>Phase 5:</strong> React frontend integration, Laravel Sanctum authentication rebuild</li>
                                </ul>
                            </div>

                            <div className="case-section-block">
                                <h2>Results</h2>
                                <p>
                                    Database queries were reduced from 200+ to under 50 per page load through normalization
                                    and Eloquent relationship optimization. AWS costs dropped 40% through S3 lifecycle policies
                                    and CloudFront caching. The authentication system was rebuilt with Laravel Sanctum,
                                    implementing enterprise-grade session management and rate limiting.
                                </p>
                            </div>

                            <div className="case-section-block tech-block">
                                <h3>Technology Stack</h3>
                                <div className="tech-tags">
                                    <span>Laravel 10</span><span>React</span><span>TypeScript</span>
                                    <span>MySQL</span><span>AWS S3</span><span>AWS CloudFront</span>
                                    <span>Laravel Sanctum</span><span>Redis</span><span>Docker</span>
                                    <span>GitHub Actions</span>
                                </div>
                            </div>
                        </div>

                        <div className="case-features">
                            <h3>Key Features Delivered</h3>
                            <div className="features-grid">
                                {[
                                    'Secure AWS S3 file storage with pre-signed URLs',
                                    'Multi-role access control (Admin, Teacher, Student, Parent)',
                                    'Real-time class scheduling and management',
                                    'Assignment submission and grading system',
                                    'Progress tracking and analytics dashboard',
                                    'Mobile-responsive interface with RTL consideration',
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
                        <h2>Have a Similar Stalled Project?</h2>
                        <p>
                            We specialize in rescuing complex codebases and delivering results others said couldn't be done.
                            Book a strategy call to see if your project qualifies for our Diagnostic Audit.
                        </p>
                        <Link to="/contact" className="btn btn-primary">
                            Book a Rescue Strategy Call <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                        </Link>
                        <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                            Or <Link to="/case-studies/document-management-system">see our DMS rescue case study →</Link>
                        </p>
                    </div>
                </Container>
            </Section>
        </div>
    );
};

export default CaseStudyEdtech;
