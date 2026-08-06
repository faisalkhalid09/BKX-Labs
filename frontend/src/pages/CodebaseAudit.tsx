import SEO from '../components/ui/SEO';
import Hero from '../components/ui/Hero';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Search, FileText, Shield, AlertTriangle, Layers, Activity } from 'lucide-react';

const CodebaseAudit = () => {
    const faqItems = [
        {
            question: 'What access do you need to perform the audit?',
            answer: 'We require read-only access to your source code repository, your database schema (not production data), and your server/cloud configuration. We do not require production database access, customer data, or any write access to your systems. Everything we request is detailed in the audit agreement before you provide any access. An NDA is executed before any access is granted.'
        },
        {
            question: 'What do I receive at the end of the audit?',
            answer: 'You receive a full written Technical Health Report in PDF and editable formats. The report includes: a severity-ranked list of every issue found (Critical, High, Medium, Low), per-issue remediation effort estimates, an architecture diagram of current state versus recommended state, an executive summary suitable for board or investor review, and a prioritized remediation roadmap. The report is owned by you unconditionally.'
        },
        {
            question: 'What if the audit finds the project cannot be rescued?',
            answer: 'In approximately 15% of our audits, the cost of remediation exceeds the cost of a correctly architected replacement. If this is the case, we tell you directly in the written report. We provide a detailed greenfield architecture specification as part of the audit output, including what a replacement would require in terms of timeline, team composition, and technology choices.'
        },
        {
            question: 'Can you audit a Laravel application? What about React?',
            answer: 'Yes to both. Our audit tooling covers Laravel applications (PHPStan Level 9, Rector, Laravel Telescope, Horizon profiling, OWASP ZAP, k6 load testing) and React/TypeScript frontends (ESLint strict, TypeScript compiler checks, bundle analysis, React DevTools profiling, Core Web Vitals measurement). We also audit full-stack applications and can assess infrastructure configurations for AWS, GCP, and VPS deployments.'
        },
    ];

    const structuredData = [
        {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Codebase Audit Service',
            description: 'Forensic codebase audit for Laravel and React applications. Severity-ranked issue list, remediation roadmap, and written Technical Health Report.',
            provider: { '@type': 'Organization', name: 'BKX Labs', url: 'https://bkxlabs.com' }
        },
        {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map(item => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: { '@type': 'Answer', text: item.answer },
            })),
        },
    ];

    return (
        <div>
            <SEO
                title="Codebase Audit Service | Laravel & React"
                description="Professional codebase audit for Laravel and React applications. Get a forensic review of your architecture and a written Technical Health Report with a remediation roadmap."
                keywords="codebase audit service, code audit service, laravel codebase audit, react codebase audit, software code audit, code review service, technical codebase review, software audit, codebase review, binkhalid labs, bk labs, box labs, bx labs, b labs"
                structuredData={structuredData}
            />

            <Hero
                title="Codebase Audit Service"
                subtitle="A forensic review of your codebase, security posture, and infrastructure. Delivered as a comprehensive written Technical Health Report with severity-ranked issues and a clear remediation roadmap."
                ctaText="Request an Audit"
                ctaLink="/contact"
            />

            {/* What it is */}
            <Section>
                <Container>
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 className="section-heading">What Is a Codebase Audit?</h2>
                        <p className="section-subheading">
                            A codebase audit is a forensic review of a software system — its architecture, security, performance, test coverage, dependency risk, and infrastructure configuration. The goal is not to make random improvements; it is to produce a complete, quantified picture of every problem in the system, ranked by severity, before any remediation decisions are made.
                        </p>
                        <p className="section-subheading" style={{ marginTop: '1rem' }}>
                            A BKX Labs codebase audit uses a combination of automated static analysis tools and manual architectural review. The output is a written Technical Health Report — a boardroom-ready document that tells you exactly what is broken, why it is broken, and the business impact of each issue. The report is yours to keep, regardless of whether you continue with BKX Labs.
                        </p>
                    </div>
                </Container>
            </Section>

            {/* What we audit */}
            <Section className="bg-subtle">
                <Container>
                    <h2 className="text-center section-heading">What Our Codebase Audit Covers</h2>
                    <p className="text-center section-subheading" style={{ marginBottom: '3rem' }}>
                        We evaluate every layer of your application stack to eliminate blind spots.
                    </p>
                    
                    <div className="grid grid-3">
                        <Card>
                            <div className="card-icon-wrapper">
                                <Search size={32} strokeWidth={1.5} />
                            </div>
                            <h3>Static Code Analysis</h3>
                            <p className="card-text">
                                PHPStan Level 9 for Laravel, ESLint strict mode and TypeScript compiler for React. Every type error, unreachable code path, and undefined behavior flagged.
                            </p>
                        </Card>
                        
                        <Card>
                            <div className="card-icon-wrapper">
                                <Shield size={32} strokeWidth={1.5} />
                            </div>
                            <h3>Security Scanning</h3>
                            <p className="card-text">
                                OWASP ZAP security scan covering the OWASP Top 10. SQL injection, XSS, CSRF, authentication logic, exposed secrets, and authorization bypass vectors.
                            </p>
                        </Card>
                        
                        <Card>
                            <div className="card-icon-wrapper">
                                <Layers size={32} strokeWidth={1.5} />
                            </div>
                            <h3>Architecture Review</h3>
                            <p className="card-text">
                                Manual review of architectural decisions: service boundaries, coupling, database schema design, API contract quality, and scalability constraints.
                            </p>
                        </Card>
                        
                        <Card>
                            <div className="card-icon-wrapper">
                                <AlertTriangle size={32} strokeWidth={1.5} />
                            </div>
                            <h3>Dependency Risk</h3>
                            <p className="card-text">
                                Full dependency tree scan for known CVEs, end-of-life versions, abandoned packages, and license compliance issues.
                            </p>
                        </Card>
                        
                        <Card>
                            <div className="card-icon-wrapper">
                                <Activity size={32} strokeWidth={1.5} />
                            </div>
                            <h3>Performance Profiling</h3>
                            <p className="card-text">
                                k6 load testing, Laravel Telescope and database query profiling, N+1 query detection, missing index identification, and bundle size analysis for React.
                            </p>
                        </Card>
                        
                        <Card>
                            <div className="card-icon-wrapper">
                                <FileText size={32} strokeWidth={1.5} />
                            </div>
                            <h3>Test Coverage Analysis</h3>
                            <p className="card-text">
                                Measurement of automated test coverage depth and quality. Identification of high-risk code paths that lack test coverage and represent deployment risk.
                            </p>
                        </Card>
                    </div>
                </Container>
            </Section>

            {/* Deliverable */}
            <Section>
                <Container>
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 className="text-center section-heading">What You Receive</h2>
                        <p className="text-center section-subheading" style={{ marginBottom: '2.5rem' }}>
                            At the conclusion of the audit, you are presented with actionable, structured documentation.
                        </p>
                        
                        <div style={{ display: 'grid', gap: '1.25rem', padding: '2rem', background: 'var(--surface-subtle)', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
                            {[
                                'Full written Technical Health Report (PDF + editable format)',
                                'Severity-ranked issue list: Critical, High, Medium, Low',
                                'Per-issue remediation effort estimates and priority scoring',
                                'Architecture diagram: current state vs. recommended state',
                                'Executive summary suitable for board or investor review',
                                'Prioritized remediation roadmap — what to fix first and why',
                                'Greenfield specification (if a rebuild is recommended instead of rescue)',
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <CheckCircle size={24} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                                    <span style={{ fontSize: '1.05rem', lineHeight: '1.6', color: 'var(--text-dark)', fontWeight: '500' }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </Section>

            {/* FAQ */}
            <Section className="bg-subtle">
                <Container>
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 className="text-center section-heading">Frequently Asked Questions</h2>
                        <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {faqItems.map((item, i) => (
                                <Card key={i}>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>{item.question}</h3>
                                    <p className="card-text">{item.answer}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </Container>
            </Section>

            {/* CTA */}
            <Section style={{ background: 'var(--primary, #2563eb)', textAlign: 'center' }}>
                <Container>
                    <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Ready to audit your codebase?</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '2rem', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        Tell us about your system. We'll verify scope and outline the process on a brief discovery call.
                    </p>
                    <Button variant="secondary" href="/contact">Request an Audit <ArrowRight size={16} style={{ marginLeft: '6px' }} /></Button>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginTop: '1.5rem' }}>
                        Or <Link to="/services" style={{ color: '#fff', textDecoration: 'underline' }}>see all our services</Link> and <Link to="/process" style={{ color: '#fff', textDecoration: 'underline' }}>read our full process</Link>
                    </p>
                </Container>
            </Section>
        </div>
    );
};

export default CodebaseAudit;
