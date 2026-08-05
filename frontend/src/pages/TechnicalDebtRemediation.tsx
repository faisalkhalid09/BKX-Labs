import SEO from '../components/ui/SEO';
import Hero from '../components/ui/Hero';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, AlertTriangle, TrendingUp, Clock, DollarSign } from 'lucide-react';

const TechnicalDebtRemediation = () => {
    const faqItems = [
        {
            question: 'What is technical debt and why does it compound?',
            answer: 'Technical debt is the accumulated cost of shortcuts, poor architectural decisions, and deferred code quality work in a software system. It compounds because each new feature built on a weak foundation requires more workarounds, each workaround makes the next task harder, and eventually the cost of any change exceeds the cost of the feature itself. Research from McKinsey Digital estimates that technical debt accounts for 20–40% of the value of a typical technology estate, and that companies spend 10–20% of their IT budget servicing debt that blocks new development.'
        },
        {
            question: 'How much does technical debt remediation cost?',
            answer: 'The cost depends on the severity and age of the debt. At BKX Labs, we start with a Diagnostic Codebase Audit ($3,500–$8,000) that produces a severity-ranked list of every technical debt item with a per-item remediation cost estimate. Emergency triage of critical issues typically ranges from $8,000 to $35,000. Systematic long-term remediation is structured as a monthly fixed-fee retainer. The audit is the prerequisite — you cannot accurately price remediation without first understanding what you are dealing with.'
        },
        {
            question: 'How do you prioritize which technical debt to fix first?',
            answer: 'We classify every issue by severity (Critical, High, Medium, Low) and by business impact (security risk, performance impact, developer velocity loss, deployment risk). Critical issues — security vulnerabilities, production stability risks, data integrity problems — are addressed first regardless of remediation cost. High severity issues that block team velocity or create compounding risk come second. We do not refactor low-priority code while high-severity issues remain open.'
        },
        {
            question: 'What is the difference between refactoring and a full rewrite?',
            answer: 'Refactoring incrementally improves an existing codebase without changing its external behavior — restructuring code, reducing coupling, improving test coverage, eliminating duplication. A full rewrite discards the existing code and builds a replacement. Refactoring is lower risk and preserves accumulated business logic. Rewrites are sometimes necessary when the existing architecture is so structurally broken that refactoring costs more than rebuilding. In approximately 15% of our audits, we find that remediation costs exceed rewrite costs, and we say so directly in the written report.'
        },
        {
            question: 'How long does technical debt remediation take?',
            answer: 'It depends entirely on the severity and volume of the debt. Critical security vulnerabilities can be sealed within 72 hours of engagement. A systematic modernization of a mid-size Laravel or React application typically takes 3–9 months of sprint-based remediation work, with visible improvements to deployment stability and developer velocity appearing within the first 4–6 weeks. We deliver in 2-week sprint increments so you see measurable progress at every step.'
        },
    ];

    const structuredData = [
        {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Technical Debt Remediation Service',
            description: 'Specialist technical debt remediation for Laravel and React codebases. Forensic audit, severity ranking, and systematic sprint-based remediation. Fixed-price.',
            provider: { '@type': 'Organization', name: 'BKX Labs', url: 'https://bkxlabs.com' },
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
                title="Technical Debt Remediation Service — Fix Code Debt"
                description="Specialist technical debt remediation for Laravel and React applications. Forensic codebase audit, severity-ranked issue list, and systematic sprint-based remediation. Fixed-price engagements. Written report before any code changes."
                keywords="technical debt remediation, fix technical debt, technical debt consulting, code refactoring service, code debt remediation, legacy code modernization, reduce technical debt, software code debt"
                structuredData={structuredData}
            />

            <Hero
                title="Technical Debt Remediation — Fix Your Codebase"
                subtitle="BKX Labs provides specialist technical debt remediation for Laravel and React applications. We audit your codebase, quantify every debt item by severity and business impact, and systematically eliminate it through sprint-based fixed-price work."
                ctaText="Get a Codebase Audit"
                ctaLink="/codebase-audit"
            />

            {/* What is technical debt */}
            <Section>
                <Container>
                    <div style={{ maxWidth: '760px', margin: '0 auto' }}>
                        <h2>What Is Technical Debt and Why It Compounds</h2>
                        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', marginTop: '1rem' }}>
                            Technical debt is the accumulated cost of shortcuts, poor architectural decisions, and deferred quality work in a software system. It compounds because each new feature built on a weak foundation requires more workarounds. Each workaround makes the next task harder. Eventually the cost of any change exceeds the cost of the feature itself — and your development team spends more time firefighting than shipping.
                        </p>
                        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', marginTop: '1rem' }}>
                            McKinsey Digital estimates technical debt accounts for 20–40% of the value of a typical technology estate. Most engineering teams spend 10–20% of their sprint capacity on debt interest — work that generates no new business value. The longer it compounds, the more expensive it becomes to address.
                        </p>
                    </div>
                </Container>
            </Section>

            {/* Warning signs */}
            <Section style={{ background: 'var(--surface-subtle, #f8fafc)' }}>
                <Container>
                    <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Signs Your Codebase Has Serious Technical Debt</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {[
                            { icon: <AlertTriangle size={28} />, title: 'Every change breaks something else', desc: 'Tight coupling between components means a fix in one area causes failures in two others. Deployments require rollbacks.' },
                            { icon: <Clock size={28} />, title: 'Features take 3× longer than estimated', desc: 'Engineers spend most of their time understanding existing code instead of writing new features. Estimates are consistently wrong.' },
                            { icon: <TrendingUp size={28} />, title: 'Performance degrades under normal load', desc: 'N+1 database query problems, missing indexes, no caching strategy, memory leaks from event listener accumulation.' },
                            { icon: <AlertTriangle size={28} />, title: 'Security vulnerabilities accumulate', desc: 'Outdated dependencies, SQL injection exposure, missing input validation, hardcoded credentials in version-controlled config files.' },
                            { icon: <DollarSign size={28} />, title: 'Infrastructure costs are unexplained', desc: 'No query profiling means database servers are working 10× harder than necessary. Cloud bills grow without corresponding feature growth.' },
                            { icon: <Clock size={28} />, title: 'New engineers take months to onboard', desc: 'No documentation, inconsistent patterns, undocumented business logic embedded in procedural code rather than service classes.' },
                        ].map((item, i) => (
                            <div key={i} style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                <div style={{ color: '#dc2626', marginBottom: '0.75rem' }}>{item.icon}</div>
                                <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>{item.title}</h3>
                                <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.6' }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Our approach */}
            <Section>
                <Container>
                    <div style={{ maxWidth: '760px', margin: '0 auto' }}>
                        <h2>Our Technical Debt Remediation Approach</h2>
                        <p style={{ marginTop: '1rem', lineHeight: '1.8', color: '#64748b' }}>
                            We do not start refactoring without understanding the full scope of the problem. Every engagement begins with a forensic Diagnostic Codebase Audit that produces a severity-ranked inventory of every technical debt item in your system, along with per-item remediation cost estimates. This audit is the prerequisite for all remediation work — you cannot accurately budget debt payoff without first knowing exactly what you owe.
                        </p>
                        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                { step: '1', title: 'Forensic Audit ($3,500–$8,000)', desc: 'PHPStan Level 9 static analysis, OWASP ZAP security scan, query profiling, architecture mapping, and dependency vulnerability scan. Written report in 5–10 business days.' },
                                { step: '2', title: 'Priority Classification', desc: 'Every issue classified as Critical, High, Medium, or Low based on security risk, performance impact, and developer velocity cost. Critical items never wait.' },
                                { step: '3', title: 'Sprint-Based Remediation', desc: '2-week fixed-price sprints with a defined, pre-agreed deliverable scope. You see measurable progress at every sprint review.' },
                                { step: '4', title: 'Regression Coverage First', desc: 'Before any high-risk refactoring, we establish PestPHP 3 test suites that catch regressions. Refactoring without tests is optimization with no safety net.' },
                                { step: '5', title: 'Handover Documentation', desc: 'Every sprint closes with updated architecture decision records and updated documentation so your internal team understands every change made.' },
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1.1rem', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
                                    <span style={{ background: 'var(--primary, #2563eb)', color: '#fff', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.85rem', flexShrink: 0 }}>{item.step}</span>
                                    <div>
                                        <strong>{item.title}</strong>
                                        <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.2rem', lineHeight: '1.6' }}>{item.desc}</p>
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

            {/* Internal links + CTA */}
            <Section style={{ background: 'var(--primary, #2563eb)', textAlign: 'center' }}>
                <Container>
                    <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Ready to fix your technical debt?</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '1.75rem' }}>The first step is always a Diagnostic Audit. We tell you exactly what you owe and what it will cost to fix it.</p>
                    <Button variant="secondary" href="/codebase-audit">Learn About Our Codebase Audit <ArrowRight size={16} style={{ marginLeft: '6px' }} /></Button>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginTop: '1rem' }}>
                        Or <Link to="/contact" style={{ color: '#fff', textDecoration: 'underline' }}>contact us directly</Link> to discuss your situation
                    </p>
                </Container>
            </Section>
        </div>
    );
};

export default TechnicalDebtRemediation;
