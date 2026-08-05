import SEO from '../components/ui/SEO';
import Hero from '../components/ui/Hero';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Search, FileText, Shield, AlertTriangle } from 'lucide-react';

const CodebaseAudit = () => {
    const faqItems = [
        {
            question: 'How much does a codebase audit cost?',
            answer: 'A BKX Labs Diagnostic Codebase Audit is scoped as a fixed-price deliverable ranging from $3,500 to $8,000 depending on the size and complexity of the system. Smaller applications (under 50,000 lines of code, single service) fall toward the lower end. Large multi-service systems, systems with external integrations, or applications with complex infrastructure (microservices, multi-region deployments) fall toward the higher end. Every audit is quoted with a fixed price agreed in writing before access is granted.'
        },
        {
            question: 'How long does a codebase audit take?',
            answer: 'Our standard Diagnostic Codebase Audit is delivered in 5 to 10 business days from the date of read-only access being granted. This timeline covers automated static analysis (PHPStan Level 9, ESLint strict, Rector), manual architectural review, security scanning (OWASP ZAP), database query profiling, dependency vulnerability scanning, and the written Technical Health Report with severity rankings and per-issue cost estimates. Expedited delivery is available for production emergencies.'
        },
        {
            question: 'What access do you need to perform the audit?',
            answer: 'We require read-only access to your source code repository, your database schema (not production data), and your server/cloud configuration. We do not require production database access, customer data, or any write access to your systems. Everything we request is detailed in the audit agreement before you provide any access. An NDA is executed before any access is granted.'
        },
        {
            question: 'What do I receive at the end of the audit?',
            answer: 'You receive a full written Technical Health Report in PDF and editable formats. The report includes: a severity-ranked list of every issue found (Critical, High, Medium, Low), per-issue remediation effort estimate and cost, an architecture diagram of current state versus recommended state, an executive summary suitable for board or investor review, and a prioritized remediation roadmap. The report is owned by you unconditionally — you can take it to any engineering team.'
        },
        {
            question: 'What if the audit finds the project cannot be rescued?',
            answer: 'In approximately 15% of our audits, the cost of remediation exceeds the cost of a correctly architected replacement. If this is the case, we tell you directly in the written report. We provide a detailed greenfield architecture specification as part of the audit output, including what a replacement would require in terms of timeline, team composition, and technology choices. The audit fee is not contingent on a recommendation to continue with BKX Labs.'
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
            description: 'Forensic codebase audit for Laravel and React applications. Severity-ranked issue list, per-item cost estimates, and written Technical Health Report. Fixed-price, 5–10 business days.',
            provider: { '@type': 'Organization', name: 'BKX Labs', url: 'https://bkxlabs.com' },
            offers: {
                '@type': 'Offer',
                priceRange: '$3500-$8000',
                priceCurrency: 'USD',
            },
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
                title="Codebase Audit Service — Laravel & React | From $3,500"
                description="Professional codebase audit for Laravel and React applications. Fixed-price ($3,500–$8,000). Delivered in 5–10 business days. Written Technical Health Report with severity-ranked issues and per-item cost estimates."
                keywords="codebase audit service, code audit service, laravel codebase audit, react codebase audit, software code audit, code review service, technical codebase review, software audit, codebase review cost"
                structuredData={structuredData}
            />

            <Hero
                title="Codebase Audit Service — Laravel & React"
                subtitle="A forensic review of your codebase, security posture, and infrastructure. Delivered in 5–10 business days as a written Technical Health Report with severity-ranked issues and per-item cost estimates. Fixed-price from $3,500."
                ctaText="Request an Audit"
                ctaLink="/contact"
            />

            {/* What it is */}
            <Section>
                <Container>
                    <div style={{ maxWidth: '760px', margin: '0 auto' }}>
                        <h2>What Is a Codebase Audit?</h2>
                        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', marginTop: '1rem' }}>
                            A codebase audit is a forensic review of a software system — its architecture, security, performance, test coverage, dependency risk, and infrastructure configuration. The goal is not to make random improvements; it is to produce a complete, quantified picture of every problem in the system, ranked by severity, before any remediation decisions are made.
                        </p>
                        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', marginTop: '1rem' }}>
                            A BKX Labs codebase audit uses a combination of automated static analysis tools and manual architectural review. The output is a written Technical Health Report — a boardroom-ready document that tells you exactly what is broken, why it is broken, the business impact of each issue, and what fixing each one will cost. The report is yours to keep, regardless of whether you continue with BKX Labs.
                        </p>
                    </div>
                </Container>
            </Section>

            {/* What we audit */}
            <Section style={{ background: 'var(--surface-subtle, #f8fafc)' }}>
                <Container>
                    <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>What Our Codebase Audit Covers</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {[
                            { icon: <Search size={28} />, title: 'Static Code Analysis', desc: 'PHPStan Level 9 for Laravel, ESLint strict mode and TypeScript compiler for React. Every type error, unreachable code path, and undefined behavior flagged.' },
                            { icon: <Shield size={28} />, title: 'Security Scanning', desc: 'OWASP ZAP security scan covering the OWASP Top 10. SQL injection, XSS, CSRF, authentication logic, exposed secrets, and authorization bypass vectors.' },
                            { icon: <AlertTriangle size={28} />, title: 'Architecture Review', desc: 'Manual review of architectural decisions: service boundaries, coupling, database schema design, API contract quality, and scalability constraints.' },
                            { icon: <FileText size={28} />, title: 'Dependency Risk', desc: 'Full dependency tree scan for known CVEs, end-of-life versions, abandoned packages, and license compliance issues.' },
                            { icon: <Search size={28} />, title: 'Performance Profiling', desc: 'k6 load testing, Laravel Telescope and database query profiling, N+1 query detection, missing index identification, and bundle size analysis for React.' },
                            { icon: <CheckCircle size={28} />, title: 'Test Coverage Analysis', desc: 'Measurement of automated test coverage depth and quality. Identification of high-risk code paths that lack test coverage and represent deployment risk.' },
                        ].map((item, i) => (
                            <div key={i} style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                <div style={{ color: 'var(--primary, #2563eb)', marginBottom: '0.75rem' }}>{item.icon}</div>
                                <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>{item.title}</h3>
                                <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.6' }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Deliverable */}
            <Section>
                <Container>
                    <div style={{ maxWidth: '760px', margin: '0 auto' }}>
                        <h2>What You Receive</h2>
                        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                'Full written Technical Health Report (PDF + editable format)',
                                'Severity-ranked issue list: Critical, High, Medium, Low',
                                'Per-issue remediation effort estimate and cost',
                                'Architecture diagram: current state vs. recommended state',
                                'Executive summary suitable for board or investor review',
                                'Prioritized remediation roadmap — what to fix first and why',
                                'Greenfield specification (if rewrite is recommended instead of rescue)',
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                    <CheckCircle size={20} style={{ color: '#16a34a', flexShrink: 0, marginTop: '2px' }} />
                                    <span style={{ lineHeight: '1.6' }}>{item}</span>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#eff6ff', borderRadius: '12px', borderLeft: '4px solid var(--primary, #2563eb)' }}>
                            <strong>Pricing: $3,500–$8,000 fixed-price</strong>
                            <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.5rem', lineHeight: '1.6' }}>
                                Quoted based on codebase size and complexity. Every audit is fixed-price — agreed in writing before access is granted. No hourly billing. No surprise invoices. Delivered in 5–10 business days.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* FAQ */}
            <Section style={{ background: 'var(--surface-subtle, #f8fafc)' }}>
                <Container>
                    <div style={{ maxWidth: '760px', margin: '0 auto' }}>
                        <h2>Frequently Asked Questions About Codebase Audits</h2>
                        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {faqItems.map((item, i) => (
                                <div key={i} style={{ background: '#fff', padding: '1.25rem', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
                                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>{item.question}</h3>
                                    <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.7' }}>{item.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </Section>

            {/* CTA */}
            <Section style={{ background: 'var(--primary, #2563eb)', textAlign: 'center' }}>
                <Container>
                    <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Ready for a codebase audit?</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '1.75rem' }}>Tell us about your system. We'll confirm scope, price, and timeline on a 30-minute call.</p>
                    <Button variant="secondary" href="/contact">Request an Audit <ArrowRight size={16} style={{ marginLeft: '6px' }} /></Button>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginTop: '1rem' }}>
                        Or <Link to="/services" style={{ color: '#fff', textDecoration: 'underline' }}>see all our services</Link> and <Link to="/process" style={{ color: '#fff', textDecoration: 'underline' }}>read our full process</Link>
                    </p>
                </Container>
            </Section>
        </div>
    );
};

export default CodebaseAudit;
