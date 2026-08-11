import { useState, useEffect, useRef } from 'react';
import Hero from '../components/ui/Hero';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import {
    Search, Settings, Code, MessageSquare, Rocket,
    Shield, Zap, BarChart3, UserCheck, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import './Process.css';

const phases = [
    {
        num: '01',
        label: 'Diagnostic Audit',
        Icon: Search,
        tagline: '5-10 business days. Fixed price. Yours unconditionally.',
        text: 'We spend 5 to 10 business days on read-only access. No code changes until we understand the full picture. You receive a written Technical Health Report with every issue ranked by severity and cost. It is yours regardless of whether the engagement continues.',
        deliverables: [
            'Written Technical Health Report (PDF + source)',
            'Severity-ranked issue list with per-item cost estimates',
            'Architecture diagram: current vs. recommended state',
            'Security vulnerability list with OWASP classification',
            'Executive summary for investor or board review',
        ],
    },
    {
        num: '02',
        label: 'Triage & Stabilization',
        Icon: Settings,
        tagline: 'Critical vulnerabilities sealed within 72 hours.',
        text: 'Informed by audit findings, we seal critical vulnerabilities within 72 hours without taking your system offline. All triage runs through a dedicated staging branch. Every change requires your written approval before it reaches production.',
        deliverables: [
            'Stabilized production with no active crashes',
            'Functional CI/CD pipeline with rollback capability',
            'Critical security vulnerabilities patched and verified',
            'Sentry error monitoring with alert thresholds configured',
            'Signed change log for every staging to production promotion',
        ],
    },
    {
        num: '03',
        label: 'Modernization',
        Icon: Code,
        tagline: 'Fixed 2-week sprints. Committed scope. Working demo at end.',
        text: 'Development runs in fixed 2-week sprints with a committed scope agreed before any code is written. PestPHP test suites are established before high-risk refactors, making the architectural evolution provably safe rather than optimistically safe.',
        deliverables: [
            'Working staging demo at the end of every sprint',
            'Automated test suite growing with each delivery',
            'Architecture Decision Records for every major choice',
            'Full backlog visibility with task owners and status',
            'Zero-downtime deployment throughout the entire process',
        ],
    },
    {
        num: '04',
        label: 'Transparency',
        Icon: MessageSquare,
        tagline: 'Written Monday reports. Names, tasks, and dates.',
        text: 'Your PM delivers a written status report every Monday: what shipped, what is in progress, what is blocked with names and dates, not vague summaries. Sync calls are available on demand. You are never told the team is working on it.',
        deliverables: [
            'Weekly Progress Report (shipped / in progress / blocked)',
            'Proactive risk section in every weekly report',
            'Sprint plan document before each sprint begins',
            'Escalation path with named contacts at every level',
            'Priority 1 incident response with a 1-hour SLA',
        ],
    },
    {
        num: '05',
        label: 'Handover',
        Icon: Rocket,
        tagline: 'Done means self-sufficiency, not just deployment.',
        text: 'Done means operational self-sufficiency, not just deployment. Your team receives full source code, architecture records, deployment runbooks, and a 60-day post-handover support period at no additional charge. We close when you confirm you are confident.',
        deliverables: [
            'Complete source code with full commit history',
            'Architecture Decision Records for every major decision',
            'Deployment runbooks for dev, staging, and production',
            'Engineer onboarding guide for future team hires',
            '60-day post-delivery support included in contract',
        ],
    },
];

const Process = () => {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'BKX Labs Software Rescue Protocol: 5 Phases from Diagnosis to Handover',
        description: 'The auditable 5-phase process BKX Labs uses to take over a failing software system, stabilize it, modernize it, and hand it back with full documentation.',
        step: phases.map((p, i) => ({
            '@type': 'HowToStep',
            position: i + 1,
            name: p.label,
            text: p.text,
        })),
    };

    const [activePhase, setActivePhase] = useState(0);
    const [displayed, setDisplayed] = useState('');
    const [typingDone, setTypingDone] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const delayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (delayRef.current) clearTimeout(delayRef.current);
        setDisplayed('');
        setTypingDone(false);

        const fullText = phases[activePhase].text;
        let idx = 0;

        delayRef.current = setTimeout(() => {
            intervalRef.current = setInterval(() => {
                idx++;
                setDisplayed(fullText.slice(0, idx));
                if (idx >= fullText.length) {
                    clearInterval(intervalRef.current!);
                    setTypingDone(true);
                }
            }, 18);
        }, 180);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (delayRef.current) clearTimeout(delayRef.current);
        };
    }, [activePhase]);

    const trackFill = phases.length > 1 ? (activePhase / (phases.length - 1)) * 100 : 0;

    return (
        <div>
            <SEO
                title="How We Rescue Failing Software Projects - Our Process"
                description="Our software rescue process: forensic codebase audit in 5-10 days, emergency triage in 72 hours, then fixed-price weekly sprints to full handover. No surprise costs."
                keywords="how to rescue a software project, software rescue process, codebase audit timeline, laravel rescue process, react project recovery, bkx labs process"
                structuredData={structuredData}
            />

            <Hero
                title="The Rescue Protocol"
                subtitle="A structured, auditable, phase-gated process for taking over failing software, stabilizing it, and bringing it to production with complete written transparency at every stage."
            />

            {/* Named Lead Bar */}
            <Section className="proc-lead-section">
                <Container>
                    <div className="proc-lead-bar">
                        <div className="proc-lead-left">
                            <span className="proc-label">Your Dedicated Team</span>
                            <div className="proc-lead-roles">
                                <div className="proc-lead-role">
                                    <UserCheck size={16} strokeWidth={1.5} />
                                    <span>Lead Engineer</span>
                                </div>
                                <div className="proc-lead-role">
                                    <MessageSquare size={16} strokeWidth={1.5} />
                                    <span>Project Manager</span>
                                </div>
                            </div>
                        </div>
                        <div className="proc-lead-divider" aria-hidden="true" />
                        <p className="proc-lead-statement">
                            From day one, you are assigned a named Lead Engineer and a named Project Manager.
                            Neither role rotates mid-engagement. You always know exactly who to call and you always
                            get a straight answer.
                        </p>
                    </div>
                </Container>
            </Section>

            {/* Phase Bubbles + Typewriter */}
            <Section className="proc-phases-section">
                <Container>
                    <div className="proc-phases-header">
                        <span className="proc-label">The Protocol</span>
                        <p className="proc-phases-hint">Select a phase to see how we operate.</p>
                    </div>

                    <div className="proc-bubbles-outer">
                        <div className="proc-track-line">
                            <div className="proc-track-fill" style={{ width: `${trackFill}%` }} />
                        </div>
                        <div className="proc-bubbles">
                            {phases.map((phase, i) => {
                                const PhaseIcon = phase.Icon;
                                const isActive = activePhase === i;
                                const isDone = i < activePhase;
                                return (
                                    <div
                                        key={i}
                                        className={`proc-bubble-wrap${isActive ? ' active' : ''}${isDone ? ' done' : ''}`}
                                        onClick={() => setActivePhase(i)}
                                    >
                                        <button
                                            className={`proc-bubble${isActive ? ' active' : ''}${isDone ? ' done' : ''}`}
                                            aria-label={`Phase ${phase.num}: ${phase.label}`}
                                            aria-pressed={isActive}
                                        >
                                            <PhaseIcon size={22} strokeWidth={1.5} />
                                        </button>
                                        <span className="proc-bubble-num">{phase.num}</span>
                                        <span className="proc-bubble-label">{phase.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="proc-panel">
                        <div className="proc-panel-header">
                            <span className="proc-panel-num">{phases[activePhase].num}</span>
                            <div className="proc-panel-meta">
                                <h2 className="proc-panel-title">{phases[activePhase].label}</h2>
                                <span className="proc-panel-tagline">{phases[activePhase].tagline}</span>
                            </div>
                        </div>

                        <div className="proc-typewriter-area">
                            <p className="proc-typewriter-text">
                                {displayed}
                                <span className="proc-cursor" aria-hidden="true">|</span>
                            </p>
                        </div>

                        <ul className={`proc-deliverables${typingDone ? ' visible' : ''}`}>
                            {phases[activePhase].deliverables.map((item, i) => (
                                <li
                                    key={`${activePhase}-${i}`}
                                    style={{ '--delay': `${i * 90}ms` } as React.CSSProperties}
                                >
                                    <span className="proc-del-dot" aria-hidden="true" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Container>
            </Section>

            {/* QA - Three Pillars */}
            <Section className="proc-qa-section">
                <Container>
                    <div className="proc-qa-top">
                        <span className="proc-label">Quality Standard</span>
                        <h2 className="proc-qa-title">Testing is a constraint, not a phase.</h2>
                        <p className="proc-qa-sub">
                            No remediation code ships without a corresponding automated test. No high-risk
                            refactor is attempted without a regression safety net already in place.
                        </p>
                    </div>
                    <div className="proc-qa-pillars">
                        <div className="proc-qa-pillar">
                            <div className="proc-qa-icon-wrap">
                                <Shield size={24} strokeWidth={1.5} />
                            </div>
                            <h3 className="proc-qa-pillar-title">Automated Testing</h3>
                            <p className="proc-qa-pillar-body">
                                PestPHP 3 unit and feature tests with CI enforcement. No merge without
                                green tests. Coverage tracked sprint-over-sprint.
                            </p>
                        </div>
                        <div className="proc-qa-sep" aria-hidden="true" />
                        <div className="proc-qa-pillar">
                            <div className="proc-qa-icon-wrap">
                                <Zap size={24} strokeWidth={1.5} />
                            </div>
                            <h3 className="proc-qa-pillar-title">Security Review</h3>
                            <p className="proc-qa-pillar-body">
                                OWASP ZAP scanning on every staging deployment. Dependency vulnerability
                                alerts integrated directly into the CI pipeline.
                            </p>
                        </div>
                        <div className="proc-qa-sep" aria-hidden="true" />
                        <div className="proc-qa-pillar">
                            <div className="proc-qa-icon-wrap">
                                <BarChart3 size={24} strokeWidth={1.5} />
                            </div>
                            <h3 className="proc-qa-pillar-title">Performance Validation</h3>
                            <p className="proc-qa-pillar-body">
                                k6 load testing before and after each major architectural change to
                                verify no regression in response time or throughput.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Payment Milestones */}
            <Section className="proc-payment-section">
                <Container>
                    <div className="proc-payment-top">
                        <span className="proc-label">Pricing Model</span>
                        <h2 className="proc-payment-title">Fixed price. No hourly billing. Ever.</h2>
                        <p className="proc-payment-intro">
                            Every phase is quoted on a fixed-price basis before work begins. Your finance
                            team always has a defined commitment before we touch a single line of code.
                        </p>
                    </div>
                    <div className="proc-milestones">
                        <div className="proc-milestone">
                            <span className="proc-milestone-num">01</span>
                            <h4 className="proc-milestone-title">Diagnostic Audit</h4>
                            <p className="proc-milestone-body">
                                100% paid upfront. Fixed price. Delivers a written Technical Health Report
                                regardless of whether the engagement continues.
                            </p>
                        </div>
                        <div className="proc-milestone-arrow" aria-hidden="true">&#x2192;</div>
                        <div className="proc-milestone">
                            <span className="proc-milestone-num">02</span>
                            <h4 className="proc-milestone-title">Triage &amp; Stabilization</h4>
                            <p className="proc-milestone-body">
                                Fixed-price based on Critical and High severity findings from the audit.
                                Quoted before sprint 1 begins. No surprises.
                            </p>
                        </div>
                        <div className="proc-milestone-arrow" aria-hidden="true">&#x2192;</div>
                        <div className="proc-milestone">
                            <span className="proc-milestone-num">03</span>
                            <h4 className="proc-milestone-title">Modernization Retainer</h4>
                            <p className="proc-milestone-body">
                                Fixed monthly fee. Sprint scope agreed before each cycle. Cancel with
                                30 days notice. No exit penalties, no lock-in.
                            </p>
                        </div>
                    </div>
                    <p className="proc-payment-note">
                        All contracts include a mutual NDA and full IP assignment. You own everything we build.
                    </p>
                </Container>
            </Section>

            {/* CTA */}
            <Section className="proc-cta-section">
                <Container>
                    <div className="proc-cta-inner">
                        <h2 className="proc-cta-title">Ready to start the audit?</h2>
                        <p className="proc-cta-body">
                            Every rescue begins with a Diagnostic Audit. Book a 15-minute Strategy Call and
                            we will tell you candidly whether your codebase qualifies and what it will cost.
                        </p>
                        <div className="proc-cta-actions">
                            <Link to="/contact" className="btn btn-primary proc-cta-btn">
                                Book a Strategy Call <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                            </Link>
                            <Link to="/services" className="proc-cta-secondary-link">
                                See all services
                            </Link>
                        </div>
                    </div>
                </Container>
            </Section>
        </div>
    );
};

export default Process;
