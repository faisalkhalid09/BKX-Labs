import SEO from '../components/ui/SEO';
import Hero from '../components/ui/Hero';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Code2, Zap, ShieldCheck, Layers, GitBranch, DollarSign } from 'lucide-react';

const HireReactDeveloper = () => {
    const faqItems = [
        {
            question: 'How much does it cost to hire a React developer?',
            answer: 'BKX Labs prices all engagements as fixed-price, not hourly. A Diagnostic Codebase Audit of a React application — the standard starting point — ranges from $3,500 to $8,000. Emergency stabilization engagements typically range from $8,000 to $35,000. Long-term modernization retainers are monthly fixed-fee arrangements scaled to sprint scope and team size. Every cost is agreed in writing before a single line of code is changed.'
        },
        {
            question: 'What React version do you work with?',
            answer: 'We work with all versions of React, with deep expertise in React 18 and React 19 including the new concurrent rendering model, Server Components, use() hook, and Suspense boundaries. When we take over an existing React codebase, our audit identifies version-specific risk — outdated dependencies, deprecated lifecycle methods, or class component patterns that need migration — and includes a prioritized upgrade path in the report.'
        },
        {
            question: 'Can you take over a React project built by another team?',
            answer: 'Yes — project takeover is one of our most common engagements. We begin with read-only access to the repository and no write access until the Diagnostic Audit is complete. The audit maps the full component tree, state management architecture, API integration patterns, performance bottlenecks, and test coverage gaps. We establish a staging environment and CI/CD pipeline before making any production changes.'
        },
        {
            question: 'Do you also handle the backend (API) work, or only React?',
            answer: 'BKX Labs handles full-stack engagements. We build and rescue Laravel APIs that power React frontends, and we handle React codebases backed by other API technologies. Most of our engagements are full-stack because frontend performance problems are often caused by inefficient API design, N+1 query issues, or missing caching layers on the backend. We resolve both sides.'
        },
        {
            question: 'What TypeScript experience does your team have?',
            answer: 'We work in TypeScript strict mode by default on all React engagements. Our audit tooling includes ESLint with TypeScript-specific rules, and we use Zod for runtime validation. If your codebase has untyped JavaScript or loose TypeScript, our modernization retainer includes a phased migration to strict TypeScript with incremental coverage targets per sprint.'
        },
    ];

    const structuredData = [
        {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'React Development Services',
            description: 'Specialist React development agency. We hire React developers for audit, rescue, modernization, and greenfield projects. Fixed-price, international team.',
            provider: { '@type': 'Organization', name: 'BKX Labs', url: 'https://bkxlabs.com' },
            areaServed: ['US', 'GB', 'AU', 'CA', 'EU'],
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
                title="Hire a React Developer | React Development Agency"
                description="Hire specialist React developers from BKX Labs. React 19 codebase audits, emergency rescue, TypeScript migration, performance optimization, and greenfield development. Fixed-price. NDA included."
                keywords="hire react developer, react development company, react developer for hire, react development agency, react engineer, react 19 developer, react codebase audit, react typescript developer"
                structuredData={structuredData}
            />

            <Hero
                title="Hire a React Developer | Specialist Agency"
                subtitle="BKX Labs is a dedicated React development agency. We audit broken React applications, rescue stalled projects, migrate to React 19 and TypeScript strict mode, and build new frontend systems from scratch. Fixed-price. Full IP ownership."
                ctaText="Get a Free Scope Call"
                ctaLink="/contact"
            />

            {/* What we do */}
            <Section>
                <Container>
                    <div style={{ maxWidth: '760px', margin: '0 auto' }}>
                        <h2>What Does a React Development Agency Provide?</h2>
                        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', marginTop: '1rem' }}>
                            When you hire a React developer from BKX Labs, you engage a full engineering team with a lead architect, React specialists, and a project manager — not a single freelancer who disappears when things get complicated. We take on React projects that have accumulated technical debt, performance problems, or incomplete feature sets abandoned by previous teams.
                        </p>
                        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', marginTop: '1rem' }}>
                            Every React engagement starts with a structured audit. We map your component hierarchy, identify unnecessary re-renders and bundle size issues, review your state management strategy (Redux, Zustand, Context, or React Query), inspect your TypeScript coverage and strictness, and evaluate your API integration patterns. You receive a written Technical Health Report within 5 to 10 business days that quantifies every issue and gives you the cost to fix each one.
                        </p>
                    </div>
                </Container>
            </Section>

            {/* Technical expertise */}
            <Section style={{ background: 'var(--surface-subtle, #f8fafc)' }}>
                <Container>
                    <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Our React Technical Expertise</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {[
                            { icon: <Code2 size={28} />, title: 'React 18 & React 19', desc: 'Concurrent rendering, Server Components, Suspense boundaries, use() hook, and the new React compiler model.' },
                            { icon: <ShieldCheck size={28} />, title: 'TypeScript Strict Mode', desc: 'Full TypeScript migration with strict mode enforcement, Zod runtime validation, and ESLint rules for type safety.' },
                            { icon: <Zap size={28} />, title: 'Performance Optimization', desc: 'Bundle analysis, code splitting, lazy loading, React DevTools profiling, and Core Web Vitals improvement.' },
                            { icon: <Layers size={28} />, title: 'State Management', desc: 'Redux Toolkit, Zustand, React Query, Jotai, and Context optimization — whichever fits your architecture.' },
                            { icon: <GitBranch size={28} />, title: 'CI/CD & Testing', desc: 'Vitest, Playwright, React Testing Library, GitHub Actions, and automated Lighthouse audits in the pipeline.' },
                            { icon: <DollarSign size={28} />, title: 'Fixed-Price Engagements', desc: 'No hourly billing. Every phase is quoted at a fixed price agreed in writing before work begins.' },
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
                        <h2>React Engagement Types & Pricing</h2>
                        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {[
                                { title: 'React Codebase Audit', price: '$3,500–$8,000', desc: 'Full forensic audit of your React application: component architecture, TypeScript coverage, bundle size, performance, state management, and API integration patterns.' },
                                { title: 'Emergency Triage & Bug Fixing', price: '$8,000–$35,000', desc: 'Emergency resolution of critical React bugs, performance regressions, and broken deployments. Executed on staging before touching production.' },
                                { title: 'React Modernization Retainer', price: 'Monthly fixed fee', desc: 'Systematic migration from legacy React patterns to React 19, TypeScript strict mode, and modern state management. Delivered in 2-week sprints.' },
                                { title: 'Greenfield React Development', price: 'Scoped per project', desc: 'New React application built with Vite or Next.js, TypeScript strict mode, testing suite, CI/CD pipeline, and full handover documentation.' },
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

            {/* FAQ */}
            <Section style={{ background: 'var(--surface-subtle, #f8fafc)' }}>
                <Container>
                    <div style={{ maxWidth: '760px', margin: '0 auto' }}>
                        <h2>Frequently Asked Questions</h2>
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
                    <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Ready to hire a React developer?</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '1.75rem' }}>Start with a no-obligation scope call. We'll confirm exactly what your React project needs and what it will cost.</p>
                    <Button variant="secondary" href="/contact">Request a Scope Call <ArrowRight size={16} style={{ marginLeft: '6px' }} /></Button>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginTop: '1rem' }}>
                        Also need Laravel? <Link to="/hire-laravel-developer" style={{ color: '#fff', textDecoration: 'underline' }}>See our Laravel services</Link>
                    </p>
                </Container>
            </Section>
        </div>
    );
};

export default HireReactDeveloper;
