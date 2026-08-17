import { useState, useEffect } from 'react';
import Hero from '../components/ui/Hero';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import { Link } from 'react-router-dom';
import { Search, Wrench, TrendingUp, Hammer, Headphones, ArrowRight, ChevronDown } from 'lucide-react';
import SEO from '../components/ui/SEO';
import './Services.css';

const Services = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [hoveredStep, setHoveredStep] = useState<number>(-1);

    // Scroll-triggered number fill-wipe
    useEffect(() => {
        const rows = document.querySelectorAll<HTMLElement>('.svc-row');
        const obs: IntersectionObserver[] = [];
        rows.forEach((row) => {
            const io = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        row.classList.add('is-visible');
                        io.unobserve(row);
                    }
                },
                { threshold: 0.22 }
            );
            io.observe(row);
            obs.push(io);
        });
        return () => obs.forEach((io) => io.disconnect());
    }, []);

    // Cursor-parallax on number — direct DOM write, zero re-renders
    const handleRowMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const dx = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
        const dy = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
        e.currentTarget.style.setProperty('--nx', `${dx.toFixed(1)}px`);
        e.currentTarget.style.setProperty('--ny', `${dy.toFixed(1)}px`);
    };
    const handleRowMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.setProperty('--nx', '0px');
        e.currentTarget.style.setProperty('--ny', '0px');
    };


    const faqItems = [
        {
            question: "How much does a codebase rescue cost?",
            answer: "A BKX Labs Diagnostic Codebase Audit, the mandatory first step for all rescue engagements, is scoped as a fixed-price deliverable typically ranging from $3,500 to $8,000 depending on the size and complexity of the system under review. The audit produces a written Technical Health Report and a severity-ranked remediation roadmap with per-item cost estimates. Triage and Stabilization engagements, scoped from the audit findings, typically range from $8,000 to $35,000. Long-term Modernization Retainers are structured as monthly fixed-fee arrangements scaled to team size and sprint scope. We do not bill hourly. Every phase of work is quoted on a fixed-price basis so your finance and legal teams have a defined commitment before a single line of code is written."
        },
        {
            question: "How do you take over an existing Laravel project?",
            answer: "Our project takeover protocol follows a strict zero-disruption sequence. We begin with read-only access to your repository, database schema, and production environment logs, and require no write access until the diagnostic phase is fully complete. During diagnosis, we use PHPStan Level 9, Rector analysis, OWASP ZAP security scanning, and Laravel Telescope profiling to build a complete picture of the system's current state. We establish a reproducible local development environment and a staging branch before any intervention. The first production change we make is always the deployment pipeline itself, establishing GitHub Actions CI/CD, automated test runs, and rollback capabilities. This ensures that every subsequent change we make to production is reversible if needed. Typically, initial production stabilization occurs within the first two weeks of engagement."
        },
        {
            question: "Do you sign NDAs and take code ownership via contract?",
            answer: "Yes, unconditionally. Every BKX Labs engagement is governed by a mutual NDA executed before any code or system access is provided. Our standard contract includes full Intellectual Property assignment clauses confirming that all code, documentation, architecture diagrams, and deliverables produced during the engagement are owned exclusively by the client upon final payment. We do not retain residual licensing rights, we do not use your codebase for training data or portfolio examples without explicit written consent, and we do not introduce proprietary dependencies that would create vendor lock-in with BKX Labs specifically. Our legal templates are reviewed by enterprise procurement teams regularly and we can address custom contractual requirements with appropriate notice."
        },
        {
            question: "What happens if you determine the project cannot be rescued?",
            answer: "This is the most important question we answer during the Diagnostic phase. If the forensic audit reveals that the cost of remediation exceeds the cost of a properly architected replacement, and this does occur in approximately 15% of audits, we will tell you directly in the written report. The Diagnostic Audit is designed specifically to produce this verdict before you commit to a larger remediation budget. In these cases, we provide a detailed greenfield architecture specification as part of the report, outlining what a correctly built replacement would require in terms of timeline, team composition, and technology choices. You can take that specification to any engineering team, including ours. The audit fee is not contingent on a recommendation to continue with BKX Labs."
        }
    ];

    const structuredData = [
        {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "BKX Labs Software Rescue Services",
            "description": "Enterprise-grade software rescue services covering diagnostic audit, triage and stabilization, modernization retainer, greenfield development, and ongoing engineering support.",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "item": {
                        "@type": "Service",
                        "name": "Diagnostic Codebase Audit",
                        "description": "A forensic review of your existing codebase, security posture, infrastructure, and architecture using PHPStan, OWASP ZAP, and dependency vulnerability scanning to produce a severity-ranked remediation roadmap.",
                        "provider": { "@type": "Organization", "name": "BKX Labs" }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "item": {
                        "@type": "Service",
                        "name": "Triage & Stabilization",
                        "description": "Emergency patching of production crashes, security vulnerabilities, and broken CI/CD pipelines on Laravel 12 and React 19 codebases, without taking your system offline.",
                        "provider": { "@type": "Organization", "name": "BKX Labs" }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "item": {
                        "@type": "Service",
                        "name": "Modernization Retainer",
                        "description": "Systematic legacy-to-modern stack migration using Laravel 12, React 19, Tailwind CSS 4, and TypeScript 5 delivered via 2-week sprints without interrupting business operations.",
                        "provider": { "@type": "Organization", "name": "BKX Labs" }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 4,
                    "item": {
                        "@type": "Service",
                        "name": "Greenfield Development",
                        "description": "Net-new application development for clients starting from scratch, built with enterprise-grade architecture decisions that prevent the technical debt patterns BKX Labs routinely rescues.",
                        "provider": { "@type": "Organization", "name": "BKX Labs" }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 5,
                    "item": {
                        "@type": "Service",
                        "name": "Ongoing Engineering Support",
                        "description": "Dedicated engineering bandwidth on retainer for product teams that need consistent, reliable development support with a priority SLA and dedicated Lead Engineer.",
                        "provider": { "@type": "Organization", "name": "BKX Labs" }
                    }
                }
            ]
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems.map(item => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.answer
                }
            }))
        }
    ];

    return (
        <div>
            <SEO
                title="Codebase Audit & Software Development Services"
                description="Laravel and React software development services: diagnostic codebase audit, emergency triage, legacy software modernization, and custom development. Fixed-price engagements. Written report before any code changes."
                keywords="codebase audit service, laravel development services, react development services, technical debt remediation, legacy software modernization, software code review, laravel codebase audit, react codebase audit, code review service, codebase modernization, scaling react apps, laravel performance tuning, react native development, enterprise application development, binkhalid labs, bk labs, box labs, bx labs, b labs"
                structuredData={structuredData}
            />

            {/* Hero — untouched */}
            <Hero
                title="Our Services"
                subtitle="We specialize in taking broken, stalled, and over-engineered systems and turning them into stable, scalable products. Every engagement is fixed-price and begins with a forensic diagnosis, never with assumptions."
            />

            {/* Intro */}
            <Section className="svc-intro-section">
                <Container>
                    <div className="svc-intro-grid">
                        <div className="svc-intro-left">
                            <span className="svc-label">How We Work</span>
                            <p className="svc-intro-subtext">Every engagement is a discrete, fixed-price phase with defined inputs, deliverables, and acceptance criteria.</p>
                        </div>
                        <div className="svc-intro-right">
                            <p className="svc-intro-body">
                                Whether your project was abandoned by a previous team, is drowning in technical debt,
                                or simply needs to be built correctly from the start, we have a structured service
                                pathway designed for your exact situation. Each service is a discrete, fixed-price
                                engagement with defined inputs, deliverables, and acceptance criteria. No hourly
                                billing surprises, no scope ambiguity, no lock-in beyond the current phase.
                            </p>
                            <div className="svc-quicklinks">
                                <Link to="/codebase-audit" className="btn btn-secondary">Codebase Audits</Link>
                                <Link to="/technical-debt-remediation" className="btn btn-secondary">Technical Debt Remediation</Link>
                                <Link to="/hire-laravel-developer" className="btn btn-secondary">Hire Laravel Developers</Link>
                                <Link to="/hire-react-developer" className="btn btn-secondary">Hire React Developers</Link>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Process Flow */}
                    {(() => {
                        const steps = [
                            { num: '01', icon: <Search size={26} strokeWidth={1.5} />, label: 'Diagnostic Audit', desc: 'Forensic codebase review' },
                            { num: '02', icon: <Wrench size={26} strokeWidth={1.5} />, label: 'Triage & Stabilization', desc: 'Critical failure patching' },
                            { num: '03', icon: <TrendingUp size={26} strokeWidth={1.5} />, label: 'Modernization', desc: 'Systematic stack evolution' },
                            { num: '04', icon: <Headphones size={26} strokeWidth={1.5} />, label: 'Ongoing Support', desc: 'Sustained engineering reliability' },
                        ];
                        return (
                            <div className="svc-flow-wrap" onMouseLeave={() => setHoveredStep(-1)}>
                                {steps.map((step, i) => (
                                    <div key={i} className="svc-flow-row">
                                        <div
                                            className={`svc-flow-step${hoveredStep >= i ? ' active' : ''}`}
                                            onMouseEnter={() => setHoveredStep(i)}
                                        >
                                            <div className="svc-flow-icon-ring">
                                                {step.icon}
                                            </div>
                                            <span className="svc-flow-num">{step.num}</span>
                                            <span className="svc-flow-label">{step.label}</span>
                                            <span className="svc-flow-desc">{step.desc}</span>
                                        </div>
                                        {i < steps.length - 1 && (
                                            <div className={`svc-flow-arrow${hoveredStep > i ? ' active' : ''}`}>
                                                <svg width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                    <line x1="0" y1="8" x2="32" y2="8" strokeWidth="1.5" className="svc-arrow-line" />
                                                    <polyline points="26,2 36,8 26,14" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="svc-arrow-head" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        );
                    })()}
                </Container>
            </Section>

            {/* ── Service Sections ── */}
            <Section className="svc-list-section">
                <Container>

                    {/* Phase 1: Diagnostic Codebase Audit */}
                    <div className="svc-row" onMouseMove={handleRowMouseMove} onMouseLeave={handleRowMouseLeave}>
                        <div className="svc-row-left">
                            <div className="svc-number-wrap">
                                <div className="svc-num-layers">
                                    <span className="svc-number svc-number-base">01</span>
                                    <span className="svc-number svc-number-fill" aria-hidden="true">01</span>
                                </div>
                                <div className="svc-title-group">
                                    <div className="svc-icon">
                                        <Search size={22} strokeWidth={1.5} />
                                    </div>
                                    <h2 className="svc-title">Phase 1: Diagnostic Codebase Audit</h2>
                                </div>
                            </div>
                            <p className="svc-body">
                                Before a single line of code is changed, we need to understand the full picture.
                                This is a fixed-price, paid engagement starting at $1,500. You are paying for an
                                objective engineering blueprint, not a sales pitch. Our audit team conducts a forensic
                                review of your codebase, infrastructure, and security posture using automated static
                                analysis, manual architectural review, and live performance profiling under realistic
                                load conditions. The output is a written Technical Health Report: a boardroom-ready
                                document that tells you exactly what is broken, why it's broken, the blast radius
                                of each issue, and what a realistic remediation will cost. This report is yours
                                outright, regardless of whether you continue with BKX Labs.
                            </p>
                            <blockquote className="svc-insight">
                                This engagement converts your largest technical liability into a quantified risk
                                register, allowing your CFO and board to evaluate remediation cost versus inaction
                                with precision rather than conjecture.
                            </blockquote>
                        </div>
                        <div className="svc-row-right">
                            <div className="svc-detail-block">
                                <h4 className="svc-detail-label">What We Examine</h4>
                                <ul className="svc-detail-list">
                                    <li>Code quality, structure &amp; architectural pattern compliance</li>
                                    <li>Security vulnerabilities &amp; exposed attack surfaces (OWASP Top 10)</li>
                                    <li>Database schema design, indexing strategy &amp; query performance</li>
                                    <li>Deployment pipelines, CI/CD configuration &amp; server hardening</li>
                                    <li>Third-party dependency risks, version drift &amp; EOL exposure</li>
                                    <li>Authentication &amp; authorization logic correctness</li>
                                    <li>Automated test coverage depth and reliability</li>
                                </ul>
                            </div>
                            <div className="svc-detail-block">
                                <h4 className="svc-detail-label">Audit Tooling</h4>
                                <div className="svc-tech-tags">
                                    <span>PHPStan Level 9</span>
                                    <span>OWASP ZAP</span>
                                    <span>Rector</span>
                                    <span>ESLint Strict</span>
                                    <span>Load Testing (k6)</span>
                                    <span>DB Query Profiling</span>
                                    <span>Telescope Profiling</span>
                                    <span>Architecture Mapping</span>
                                </div>
                            </div>
                            <div className="svc-detail-block">
                                <h4 className="svc-detail-label">What You Receive</h4>
                                <ul className="svc-detail-list">
                                    <li>Full written Technical Health Report (PDF + source)</li>
                                    <li>Severity-ranked issue list (Critical / High / Medium / Low)</li>
                                    <li>Per-issue remediation effort and cost estimate</li>
                                    <li>Architecture diagram: current state vs. recommended state</li>
                                    <li>Executive summary suitable for board or investor review</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <hr className="svc-divider" />

                    {/* Phase 2: Triage & Stabilization */}
                    <div className="svc-row" onMouseMove={handleRowMouseMove} onMouseLeave={handleRowMouseLeave}>
                        <div className="svc-row-left">
                            <div className="svc-number-wrap">
                                <div className="svc-num-layers">
                                    <span className="svc-number svc-number-base">02</span>
                                    <span className="svc-number svc-number-fill" aria-hidden="true">02</span>
                                </div>
                                <div className="svc-title-group">
                                    <div className="svc-icon">
                                        <Wrench size={22} strokeWidth={1.5} />
                                    </div>
                                    <h2 className="svc-title">Phase 2: Triage &amp; Stabilization</h2>
                                </div>
                            </div>
                            <p className="svc-body">
                                We stop the bleeding. Informed by the diagnostic audit's findings, our engineers
                                systematically patch critical production failures, seal active security vulnerabilities,
                                and establish the foundational engineering practices, such as reproducible CI/CD pipelines,
                                production observability, and automated deployment rollbacks, that your system
                                should have had from the first sprint. All triage work is executed on a staging
                                branch and requires your explicit sign-off before promotion to the live environment.
                                Your system must be more stable at the end of every week than it was at the beginning.
                            </p>
                            <blockquote className="svc-insight">
                                For every week a production system operates in an unstable state, the cost of
                                remediation compounds through customer churn, support overhead, and the opportunity
                                cost of features that cannot be shipped.
                            </blockquote>
                        </div>
                        <div className="svc-row-right">
                            <div className="svc-detail-block">
                                <h4 className="svc-detail-label">What We Fix</h4>
                                <ul className="svc-detail-list">
                                    <li>Server crashes, memory leaks &amp; unhandled fatal exceptions</li>
                                    <li>Security holes: SQL injection, XSS, auth bypasses, SSRF</li>
                                    <li>Broken or absent CI/CD deployment pipelines</li>
                                    <li>Data integrity issues &amp; corrupted application state</li>
                                    <li>N+1 query patterns causing database timeout cascades</li>
                                    <li>Missing rate limiting, CSRF protection &amp; input sanitization</li>
                                    <li>Environment configuration leakage &amp; credential exposure</li>
                                </ul>
                            </div>
                            <div className="svc-detail-block">
                                <h4 className="svc-detail-label">Technology Stack</h4>
                                <div className="svc-tech-tags">
                                    <span>Laravel 12</span>
                                    <span>React 19</span>
                                    <span>Node.js</span>
                                    <span>PostgreSQL</span>
                                    <span>MySQL 8</span>
                                    <span>Redis 7</span>
                                    <span>Docker</span>
                                    <span>GitHub Actions</span>
                                    <span>Sentry</span>
                                    <span>Laravel Horizon</span>
                                    <span>Nginx</span>
                                </div>
                            </div>
                            <div className="svc-detail-block">
                                <h4 className="svc-detail-label">Our Approach</h4>
                                <p className="svc-detail-body">
                                    Stabilization is performed live; we do not take your existing system offline at
                                    any point. All changes go through a staging environment for validation and are
                                    covered by automated integration tests before production deployment. You explicitly
                                    approve every critical change before it ships. A production observability stack
                                    (Sentry, uptime monitoring, Laravel Horizon) is established on day one.
                                </p>
                            </div>
                        </div>
                    </div>

                    <hr className="svc-divider" />

                    {/* Phase 3: Modernization Retainer */}
                    <div className="svc-row" onMouseMove={handleRowMouseMove} onMouseLeave={handleRowMouseLeave}>
                        <div className="svc-row-left">
                            <div className="svc-number-wrap">
                                <div className="svc-num-layers">
                                    <span className="svc-number svc-number-base">03</span>
                                    <span className="svc-number svc-number-fill" aria-hidden="true">03</span>
                                </div>
                                <div className="svc-title-group">
                                    <div className="svc-icon">
                                        <TrendingUp size={22} strokeWidth={1.5} />
                                    </div>
                                    <h2 className="svc-title">Phase 3: Modernization Retainer</h2>
                                </div>
                            </div>
                            <p className="svc-body">
                                Stabilization buys you time. Modernization buys you the future. Our retainer model
                                provides dedicated engineering bandwidth with a fixed team size, fixed sprint scope,
                                and fixed monthly cost to systematically remove technical debt, refactor critical
                                subsystems, and build the new features your business requires, all without pausing
                                operations. We operate in 2-week sprints with a committed deliverable scope per
                                sprint, a working demo at sprint end, and full transparency into the backlog.
                                You can cancel with 30 days' notice. No lock-in clauses, no exit penalties.
                            </p>
                            <blockquote className="svc-insight">
                                A senior full-stack engineer with relevant rescue experience costs $150,000 to
                                $220,000 annually in the US market. Our retainer delivers a team of three to five
                                specialists at a fraction of that cost, with no onboarding curve or equity dilution.
                            </blockquote>
                        </div>
                        <div className="svc-row-right">
                            <div className="svc-detail-block">
                                <h4 className="svc-detail-label">What We Deliver</h4>
                                <ul className="svc-detail-list">
                                    <li>Systematic legacy-to-modern stack migration (Laravel 12, React 19)</li>
                                    <li>TypeScript 5 strict mode adoption across frontend codebases</li>
                                    <li>PestPHP 3 test suite establishment prior to high-risk refactors</li>
                                    <li>New feature development on clean, domain-isolated architecture</li>
                                    <li>Database restructuring, migration scripting &amp; performance tuning</li>
                                    <li>Mobile app development (Flutter / React Native)</li>
                                    <li>API redesign, versioning &amp; third-party integration rewrites</li>
                                </ul>
                            </div>
                            <div className="svc-detail-block">
                                <h4 className="svc-detail-label">Retainer Stack</h4>
                                <div className="svc-tech-tags">
                                    <span>Laravel 12</span>
                                    <span>React 19</span>
                                    <span>Next.js 15</span>
                                    <span>Vue.js 3</span>
                                    <span>TypeScript 5</span>
                                    <span>PestPHP 3</span>
                                    <span>Flutter</span>
                                    <span>AWS</span>
                                    <span>PostgreSQL</span>
                                    <span>Kubernetes</span>
                                </div>
                            </div>
                            <div className="svc-detail-block">
                                <h4 className="svc-detail-label">Our Approach</h4>
                                <p className="svc-detail-body">
                                    Retainers operate in 2-week sprints with a fixed deliverable scope agreed
                                    collaboratively before each sprint begins. You receive a written sprint plan,
                                    a mid-sprint status update, and a working demo at sprint end. The backlog
                                    is managed in a shared project management workspace with full visibility
                                    into every task, its status, and the engineer responsible.
                                </p>
                            </div>
                        </div>
                    </div>

                    <hr className="svc-divider" />

                    {/* Greenfield Development */}
                    <div className="svc-row" onMouseMove={handleRowMouseMove} onMouseLeave={handleRowMouseLeave}>
                        <div className="svc-row-left">
                            <div className="svc-number-wrap">
                                <div className="svc-num-layers">
                                    <span className="svc-number svc-number-base">04</span>
                                    <span className="svc-number svc-number-fill" aria-hidden="true">04</span>
                                </div>
                                <div className="svc-title-group">
                                    <div className="svc-icon">
                                        <Hammer size={22} strokeWidth={1.5} />
                                    </div>
                                    <h2 className="svc-title">Greenfield Development</h2>
                                </div>
                            </div>
                            <p className="svc-body">
                                Not everything needs rescuing. If you're starting from scratch, we build it correctly
                                the first time, with the infrastructure governance, security controls, automated
                                testing discipline, and architectural decision records that prevent the exact problems
                                we spend so much time fixing for other clients. All greenfield projects begin with a
                                documented Architecture Decision Record and a written system design specification
                                before a line of code is written. Fixed-price, fixed-timeline. Zero scope-creep clauses.
                            </p>
                            <blockquote className="svc-insight">
                                The cost of building software correctly on the first attempt is approximately
                                one-third the cost of rescuing software that was built incorrectly. Every
                                anti-pattern we've seen becomes a guardrail we enforce from your project's first commit.
                            </blockquote>
                        </div>
                        <div className="svc-row-right">
                            <div className="svc-detail-block">
                                <h4 className="svc-detail-label">What We Build</h4>
                                <ul className="svc-detail-list">
                                    <li>SaaS products &amp; multi-tenant web applications</li>
                                    <li>Cross-platform mobile apps (iOS &amp; Android via Flutter)</li>
                                    <li>Internal workflow automation &amp; admin dashboards</li>
                                    <li>Customer-facing portals &amp; self-service platforms</li>
                                    <li>MVP products for investor validation with production-grade architecture</li>
                                    <li>Compliance-ready applications for regulated industries</li>
                                    <li>AI-integrated products with EU AI Act conformity documentation</li>
                                </ul>
                            </div>
                            <div className="svc-detail-block">
                                <h4 className="svc-detail-label">Technology Stack</h4>
                                <div className="svc-tech-tags">
                                    <span>React 19</span>
                                    <span>Next.js 15</span>
                                    <span>TypeScript 5</span>
                                    <span>Vue.js 3</span>
                                    <span>Laravel 12</span>
                                    <span>Node.js</span>
                                    <span>Python 3.12</span>
                                    <span>Flutter</span>
                                    <span>PostgreSQL</span>
                                    <span>AWS</span>
                                    <span>Docker</span>
                                </div>
                            </div>
                            <div className="svc-detail-block">
                                <h4 className="svc-detail-label">Our Approach</h4>
                                <p className="svc-detail-body">
                                    All greenfield projects begin with a documented Architecture Decision Record
                                    reviewed and approved by your team before development begins. We establish
                                    automated CI/CD, test-driven development practices, and production observability
                                    on day one. Deliverables are defined in contract. Fixed price, fixed timeline.
                                    Change requests follow a formal written process with clear cost and timeline
                                    implications.
                                </p>
                            </div>
                        </div>
                    </div>

                    <hr className="svc-divider" />

                    {/* Ongoing Engineering Support */}
                    <div className="svc-row" onMouseMove={handleRowMouseMove} onMouseLeave={handleRowMouseLeave}>
                        <div className="svc-row-left">
                            <div className="svc-number-wrap">
                                <div className="svc-num-layers">
                                    <span className="svc-number svc-number-base">05</span>
                                    <span className="svc-number svc-number-fill" aria-hidden="true">05</span>
                                </div>
                                <div className="svc-title-group">
                                    <div className="svc-icon">
                                        <Headphones size={22} strokeWidth={1.5} />
                                    </div>
                                    <h2 className="svc-title">Ongoing Engineering Support</h2>
                                </div>
                            </div>
                            <p className="svc-body">
                                For product companies with live applications that need consistent, reliable engineering
                                bandwidth without the cost or overhead of full-time hiring. We integrate with your
                                existing processes, attend your standups, work inside your issue tracker, and
                                deliver predictably, sprint after sprint. A dedicated Lead Engineer and Project
                                Manager own your engagement end-to-end. You get the reliability of an internal
                                team with the specialist depth of an external one.
                            </p>
                            <blockquote className="svc-insight">
                                Product companies that outsource ongoing engineering to a dedicated, accountable
                                partner consistently report higher sprint velocity, lower production incident rates,
                                and faster time-to-market than equivalent internal teams.
                            </blockquote>
                        </div>
                        <div className="svc-row-right">
                            <div className="svc-detail-block">
                                <h4 className="svc-detail-label">What's Included</h4>
                                <ul className="svc-detail-list">
                                    <li>Dedicated engineering hours per month (defined in contract)</li>
                                    <li>Bug triage, root-cause analysis &amp; production fixes</li>
                                    <li>Security patches &amp; dependency version management</li>
                                    <li>Feature enhancements &amp; product iteration sprints</li>
                                    <li>Proactive performance optimization &amp; capacity planning</li>
                                    <li>Weekly written health reports &amp; sprint retrospectives</li>
                                    <li>Business-day response for Priority 1 production incidents</li>
                                </ul>
                            </div>
                            <div className="svc-detail-block">
                                <h4 className="svc-detail-label">Support Models</h4>
                                <div className="svc-tech-tags">
                                    <span>Monthly Retainer</span>
                                    <span>Dedicated Squad</span>
                                    <span>Priority 1 SLA (Working Days)</span>
                                    <span>Business-Day Monitoring</span>
                                    <span>Sprint-Based</span>
                                    <span>Staff Augmentation</span>
                                    <span>Team Extension</span>
                                </div>
                            </div>
                            <div className="svc-detail-block">
                                <h4 className="svc-detail-label">Our Approach</h4>
                                <p className="svc-detail-body">
                                    A dedicated Lead Engineer and PM own your engagement with no rotation. We operate
                                    inside your chosen project management tooling (Linear, Jira, Notion, GitHub Issues)
                                    and communication channels. Weekly async written health reports cover what shipped,
                                    what is in progress, what is blocked, and any proactive recommendations. We do
                                    not wait for you to notice a problem; we report emerging risks before they become
                                    production incidents.
                                </p>
                            </div>
                        </div>
                    </div>

                </Container>
            </Section>

            {/* FAQ Accordion */}
            <Section className="svc-faq-section">
                <Container>
                    <div className="svc-faq-header">
                        <span className="svc-label">Pricing &amp; Process</span>
                        <h2 className="svc-faq-title">The Questions Every Enterprise Buyer Asks</h2>
                        <p className="svc-faq-subtitle">
                            High-stakes technical decisions require complete information. These are the questions
                            that matter most to CFOs, CTOs, and procurement teams. We answer them without deflection.
                        </p>
                    </div>
                    <div className="svc-faq-list">
                        {faqItems.map((item, index) => (
                            <div
                                key={index}
                                className={`svc-faq-item${openFaq === index ? ' open' : ''}`}
                            >
                                <button
                                    className="svc-faq-q"
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    aria-expanded={openFaq === index}
                                >
                                    <span>{item.question}</span>
                                    <ChevronDown size={20} className="svc-faq-chevron" aria-hidden="true" />
                                </button>
                                <div className="svc-faq-a">
                                    <p>{item.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Strategy Call nudge */}
            <Section className="svc-nudge-section">
                <Container>
                    <p className="svc-nudge-text">
                        Not sure which service fits your situation? Every engagement starts with a complimentary
                        15-minute Rescue Strategy Call. We assess your business situation, the state of your
                        current team, and recommend the correct technical starting point with full transparency.
                        No high-pressure sales process, just a candid, expert assessment of whether your
                        project can be rescued, and at what cost.
                    </p>
                </Container>
            </Section>

            {/* CTA Section */}
            <Section className="svc-cta-section">
                <Container>
                    <div className="svc-cta-inner">
                        <h2 className="svc-cta-title">Let's Fix What's Broken.</h2>
                        <p className="svc-cta-body">
                            Stop guessing why your application is failing. Book a Strategy Call today to
                            assess whether your codebase qualifies for our Diagnostic Audit, and walk away
                            with a written answer to the question "is this fixable, and what will it cost?"
                        </p>
                        <div className="svc-cta-actions">
                            <Link to="/contact" className="btn btn-primary">
                                Book a Rescue Strategy Call <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                            </Link>
                            <Link to="/process" className="svc-cta-secondary-link">
                                See how our process works
                            </Link>
                        </div>
                    </div>
                </Container>
            </Section>
        </div>
    );
};

export default Services;
