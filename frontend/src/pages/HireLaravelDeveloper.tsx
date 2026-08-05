import SEO from '../components/ui/SEO';
import Hero from '../components/ui/Hero';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Code2, GitBranch, ShieldCheck, Layers, Clock, DollarSign } from 'lucide-react';

const HireLaravelDeveloper = () => {
    const faqItems = [
        {
            question: 'How much does it cost to hire a Laravel developer?',
            answer: 'At BKX Labs, all engagements are fixed-price rather than hourly. A Diagnostic Codebase Audit — the standard starting point — is $3,500 to $8,000 depending on system size. Emergency Triage engagements typically range from $8,000 to $35,000. Long-term Modernization Retainers are monthly fixed-fee arrangements scaled to scope. We do not bill by the hour; every phase has a defined cost agreed in writing before any code is changed.'
        },
        {
            question: 'What is the difference between a Laravel freelancer and a Laravel development agency?',
            answer: 'A freelancer is a single engineer with a single point of failure. If they are unavailable, sick, or leave mid-project, your work stops. A Laravel development agency like BKX Labs provides a team — lead architect, specialists, and a project manager — with documented processes, code review, CI/CD pipelines, and handover documentation. You also receive legal IP assignment and NDA coverage that freelancers typically cannot offer.'
        },
        {
            question: 'Do you work on existing Laravel projects or only new builds?',
            answer: 'The majority of our Laravel work is on existing projects — taking over stalled codebases, auditing applications built by previous teams, resolving performance and security issues, and migrating legacy apps to Laravel 12. We also build greenfield Laravel applications from scratch when clients need a new system built correctly from the start.'
        },
        {
            question: 'How quickly can a Laravel developer start on our project?',
            answer: 'We can begin a Diagnostic Codebase Audit within 5 business days of contract signature and NDA execution. We require read-only access to your repository and environment logs to start. No write access is granted until the diagnostic phase is complete. Emergency triage engagements for production-down situations can begin faster with appropriate prioritization.'
        },
        {
            question: 'Do you sign NDAs and assign IP ownership to the client?',
            answer: 'Yes, unconditionally. Every BKX Labs engagement is governed by a mutual NDA executed before any code or system access is provided. Our standard contract includes full Intellectual Property assignment clauses. All code, documentation, and deliverables produced during the engagement are owned exclusively by the client upon final payment.'
        },
    ];

    const structuredData = [
        {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Laravel Development Services',
            description: 'Specialist Laravel development agency. We hire Laravel developers for audit, rescue, modernization, and greenfield projects. Fixed-price, international team.',
            provider: { '@type': 'Organization', name: 'BKX Labs', url: 'https://bkxlabs.com' },
            areaServed: ['US', 'GB', 'AU', 'CA', 'EU'],
            hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Laravel Development Services',
                itemListElement: [
                    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Laravel Codebase Audit' } },
                    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Laravel Project Rescue' } },
                    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Laravel Modernization Retainer' } },
                    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Greenfield Laravel Development' } },
                ],
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
                title="Hire a Laravel Developer | Laravel Development Agency"
                description="Hire specialist Laravel developers from BKX Labs. Fixed-price Laravel codebase audits ($3,500–$8,000), emergency rescue, modernization retainers, and greenfield builds. NDA + full IP ownership."
                keywords="hire laravel developer, laravel development company, laravel developer for hire, laravel development agency, laravel engineer, laravel 12 developer, laravel project rescue, laravel codebase audit"
                structuredData={structuredData}
            />

            <Hero
                title="Hire a Laravel Developer | Specialist Agency"
                subtitle="BKX Labs is a dedicated Laravel development agency. We audit broken Laravel applications, rescue stalled projects, modernize legacy systems to Laravel 12, and build new applications from scratch. Fixed-price. Full IP ownership. NDA included."
                ctaText="Get a Free Scope Call"
                ctaLink="/contact"
            />

            {/* What we do */}
            <Section>
                <Container>
                    <div style={{ maxWidth: '760px', margin: '0 auto' }}>
                        <h2>What Does a Laravel Development Agency Actually Do?</h2>
                        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', marginTop: '1rem' }}>
                            When you hire a Laravel developer from BKX Labs, you're not getting a single freelancer — you're engaging a structured engineering team with a defined process, documented methodology, and legal protections built in. We handle Laravel projects that other agencies and freelancers have struggled with: legacy codebases, performance bottlenecks, security vulnerabilities, failed migrations, and incomplete builds handed over by departed teams.
                        </p>
                        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', marginTop: '1rem' }}>
                            Every Laravel engagement starts with a Diagnostic Codebase Audit. We read-only access your repository, run PHPStan Level 9 static analysis, conduct OWASP ZAP security scanning, profile your database queries and Eloquent relationships, inspect your deployment pipeline, and map your architecture against Laravel best practices. The output is a written Technical Health Report — delivered in 5 to 10 business days — that tells you exactly what is broken, why, and what fixing it will cost.
                        </p>
                    </div>
                </Container>
            </Section>

            {/* Laravel expertise */}
            <Section style={{ background: 'var(--surface-subtle, #f8fafc)' }}>
                <Container>
                    <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Our Laravel Technical Expertise</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {[
                            { icon: <Code2 size={28} />, title: 'Laravel 12 Architecture', desc: 'Service-layer patterns, repository pattern, domain-driven design, and clean architecture for enterprise-scale Laravel applications.' },
                            { icon: <ShieldCheck size={28} />, title: 'Security & OWASP Compliance', desc: 'Full OWASP Top 10 audit, SQL injection prevention, CSRF protection, authentication hardening, and Laravel Sanctum / Passport setup.' },
                            { icon: <GitBranch size={28} />, title: 'CI/CD & Deployment', desc: 'GitHub Actions pipelines, automated testing with PestPHP 3, zero-downtime deployment, and Laravel Horizon queue management.' },
                            { icon: <Layers size={28} />, title: 'Performance Optimization', desc: 'Eloquent query optimization, database indexing, Redis caching, Laravel Telescope profiling, and k6 load testing.' },
                            { icon: <Clock size={28} />, title: 'Legacy Migration to Laravel 12', desc: 'Systematic migration from Laravel 5–10 to Laravel 12 using Rector, with test coverage established before any breaking changes.' },
                            { icon: <DollarSign size={28} />, title: 'Fixed-Price Engagements', desc: 'Every phase is quoted as a fixed price — no hourly billing, no surprise invoices. Your finance team has a defined commitment before work begins.' },
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

            {/* Engagement types */}
            <Section>
                <Container>
                    <div style={{ maxWidth: '760px', margin: '0 auto' }}>
                        <h2>Laravel Engagement Types & Pricing</h2>
                        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {[
                                { title: 'Diagnostic Codebase Audit', price: '$3,500–$8,000', desc: 'Read-only forensic audit of your Laravel application. Delivered in 5–10 business days. Written Technical Health Report owned by you regardless of whether you continue.' },
                                { title: 'Emergency Triage & Stabilization', price: '$8,000–$35,000', desc: 'Emergency patching of production crashes, security vulnerabilities, and broken CI/CD. Executed on isolated staging, never directly in production.' },
                                { title: 'Modernization Retainer', price: 'Monthly fixed fee', desc: 'Systematic long-term refactoring from legacy Laravel to Laravel 12 service-layer architecture, delivered in 2-week sprints with fixed deliverable scope.' },
                                { title: 'Greenfield Laravel Development', price: 'Scoped per project', desc: 'New Laravel application built with enterprise-grade architecture decisions. API design, database schema, CI/CD, and full handover documentation included.' },
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: '1rem', padding: '1.25rem', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
                                    <CheckCircle size={22} style={{ color: '#16a34a', flexShrink: 0, marginTop: '2px' }} />
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.25rem' }}>
                                            <strong>{item.title}</strong>
                                            <span style={{ color: 'var(--primary, #2563eb)', fontWeight: '600', fontSize: '0.9rem' }}>{item.price}</span>
                                        </div>
                                        <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.35rem', lineHeight: '1.6' }}>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </Section>

            {/* How it works */}
            <Section style={{ background: 'var(--surface-subtle, #f8fafc)' }}>
                <Container>
                    <div style={{ maxWidth: '760px', margin: '0 auto' }}>
                        <h2>How to Hire a Laravel Developer from BKX Labs</h2>
                        <ol style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', paddingLeft: '0', listStyle: 'none' }}>
                            {[
                                { step: '1', title: 'Submit your project details', desc: 'Fill in the contact form with your current situation, tech stack, and what you need resolved. No NDA required at this stage.' },
                                { step: '2', title: 'Scope call (30 minutes)', desc: 'A lead engineer reviews your situation and confirms whether an audit or direct engagement is the right first step.' },
                                { step: '3', title: 'NDA + audit agreement signed', desc: 'Mutual NDA executed. Audit agreement signed with fixed scope, price, and delivery timeline confirmed in writing.' },
                                { step: '4', title: 'Read-only access granted', desc: 'You provide repository access, environment logs, and any relevant documentation. No write access until audit is complete.' },
                                { step: '5', title: 'Technical Health Report delivered', desc: 'Full written report delivered in 5–10 business days. The report is yours outright. Next steps are your decision.' },
                            ].map((item, i) => (
                                <li key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <span style={{ background: 'var(--primary, #2563eb)', color: '#fff', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.85rem', flexShrink: 0 }}>{item.step}</span>
                                    <div>
                                        <strong>{item.title}</strong>
                                        <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.2rem', lineHeight: '1.6' }}>{item.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </Container>
            </Section>

            {/* FAQ */}
            <Section>
                <Container>
                    <div style={{ maxWidth: '760px', margin: '0 auto' }}>
                        <h2>Frequently Asked Questions</h2>
                        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {faqItems.map((item, i) => (
                                <div key={i} style={{ padding: '1.25rem', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
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
                    <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Ready to hire a Laravel developer?</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '1.75rem' }}>Start with a no-obligation scope call. We'll tell you exactly what your project needs and what it will cost.</p>
                    <Button variant="secondary" href="/contact">Request a Scope Call <ArrowRight size={16} style={{ marginLeft: '6px' }} /></Button>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginTop: '1rem' }}>
                        Or <Link to="/services" style={{ color: '#fff', textDecoration: 'underline' }}>view all services</Link> and <Link to="/process" style={{ color: '#fff', textDecoration: 'underline' }}>see our process</Link>
                    </p>
                </Container>
            </Section>
        </div>
    );
};

export default HireLaravelDeveloper;
