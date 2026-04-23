import Hero from '../components/ui/Hero';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import { Link } from 'react-router-dom';
import { Search, Wrench, TrendingUp, Hammer, Headphones, ArrowRight, HelpCircle } from 'lucide-react';
import SEO from '../components/ui/SEO';
import './Services.css';

const Services = () => {
    const faqItems = [
        {
            question: "How much does a codebase rescue cost?",
            answer: "A BKX Labs Diagnostic Codebase Audit — the mandatory first step for all rescue engagements — is scoped as a fixed-price deliverable typically ranging from $3,500 to $8,000 depending on the size and complexity of the system under review. The audit produces a written Technical Health Report and a severity-ranked remediation roadmap with per-item cost estimates. Triage and Stabilization engagements, scoped from the audit findings, typically range from $8,000 to $35,000. Long-term Modernization Retainers are structured as monthly fixed-fee arrangements scaled to team size and sprint scope. We do not bill hourly — every phase of work is quoted on a fixed-price basis so your finance and legal teams have a defined commitment before a single line of code is written."
        },
        {
            question: "How do you take over an existing Laravel project?",
            answer: "Our project takeover protocol follows a strict zero-disruption sequence. We begin with read-only access to your repository, database schema, and production environment logs — no write access until the diagnostic phase is fully complete. During diagnosis, we use PHPStan Level 9, Rector analysis, OWASP ZAP security scanning, and Laravel Telescope profiling to build a complete picture of the system's current state. We establish a reproducible local development environment and a staging branch before any intervention. The first production change we make is always the deployment pipeline itself — establishing GitHub Actions CI/CD, automated test runs, and rollback capabilities. This ensures that every subsequent change we make to production is reversible if needed. Typically, initial production stabilization occurs within the first two weeks of engagement."
        },
        {
            question: "Do you sign NDAs and take code ownership via contract?",
            answer: "Yes, unconditionally. Every BKX Labs engagement is governed by a mutual NDA executed before any code or system access is provided. Our standard contract includes full Intellectual Property assignment clauses confirming that all code, documentation, architecture diagrams, and deliverables produced during the engagement are owned exclusively by the client upon final payment. We do not retain residual licensing rights, we do not use your codebase for training data or portfolio examples without explicit written consent, and we do not introduce proprietary dependencies that would create vendor lock-in with BKX Labs specifically. Our legal templates are reviewed by enterprise procurement teams regularly and we can address custom contractual requirements with appropriate notice."
        },
        {
            question: "What happens if you determine the project cannot be rescued?",
            answer: "This is the most important question we answer during the Diagnostic phase. If the forensic audit reveals that the cost of remediation exceeds the cost of a properly architected replacement — and this does occur in approximately 15% of audits — we will tell you directly in the written report. The Diagnostic Audit is designed specifically to produce this verdict before you commit to a larger remediation budget. In these cases, we provide a detailed greenfield architecture specification as part of the report, outlining what a correctly built replacement would require in terms of timeline, team composition, and technology choices. You can take that specification to any engineering team — including ours. The audit fee is not contingent on a recommendation to continue with BKX Labs."
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
                        "description": "Emergency patching of production crashes, security vulnerabilities, and broken CI/CD pipelines on Laravel 12 and React 19 codebases — without taking your system offline.",
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
                        "description": "Net-new application development for clients starting from scratch — built with enterprise-grade architecture decisions that prevent the technical debt patterns BKX Labs routinely rescues.",
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
                title="Software Recovery & Technical Debt Refactoring Services"
                description="Enterprise-grade recovery for failing web applications. Forensic codebase audits, emergency triage on Laravel 12 and React 19 codebases, and long-term modernization retainers. Fixed-price engagements. Written diagnostic report before any code is changed."
                keywords="stalled project recovery, rescue failing software, technical debt services, enterprise code audit, hire rescue engineers, laravel 12 recovery, react 19 audit, codebase takeover, software project rescue cost, how to rescue a failing laravel project"
                structuredData={structuredData}
            />
            <Hero
                title="Our Services"
                subtitle="We specialize in taking broken, stalled, and over-engineered systems and turning them into stable, scalable products. Every engagement is fixed-price and begins with a forensic diagnosis — never with assumptions."
            />

            {/* Intro */}
            <Section>
                <Container>
                    <div className="services-intro">
                        <p>
                            Whether your project was abandoned by a previous team, is drowning in technical debt,
                            or simply needs to be built correctly from the start — we have a structured service
                            pathway designed for your exact situation. We don't guess; we follow the evidence.
                            Each service below is a discrete, fixed-price engagement with defined inputs,
                            deliverables, and acceptance criteria. There are no hourly billing surprises,
                            no scope ambiguity, and no lock-in beyond the current phase.
                        </p>
                    </div>
                </Container>
            </Section>

            {/* Service 1: Diagnostic Audit */}
            <Section className="service-section">
                <Container>
                    <div className="service-block">
                        <div className="service-header">
                            <div className="service-icon-wrapper">
                                <Search size={40} strokeWidth={1.5} />
                            </div>
                            <h2>Phase 1: Diagnostic Codebase Audit</h2>
                        </div>

                        <p className="service-value">
                            Before a single line of code is changed, we need to understand the full picture.
                            Our audit team conducts a forensic review of your codebase, infrastructure, and
                            security posture using a combination of automated static analysis, manual
                            architectural review, and live performance profiling under realistic load conditions.
                            The output is a written Technical Health Report — a boardroom-ready document that
                            tells you exactly what is broken, why it's broken, the blast radius of each issue,
                            and what a realistic remediation will cost. This report is yours outright.
                            No obligation to continue with BKX Labs.
                        </p>

                        <div className="service-details-grid">
                            <div className="service-detail">
                                <h4>What We Examine</h4>
                                <ul>
                                    <li>Code quality, structure & architectural pattern compliance</li>
                                    <li>Security vulnerabilities & exposed attack surfaces (OWASP Top 10)</li>
                                    <li>Database schema design, indexing strategy & query performance</li>
                                    <li>Deployment pipelines, CI/CD configuration & server hardening</li>
                                    <li>Third-party dependency risks, version drift & EOL exposure</li>
                                    <li>Authentication & authorization logic correctness</li>
                                    <li>Automated test coverage depth and reliability</li>
                                </ul>
                            </div>

                            <div className="service-detail">
                                <h4>Audit Tooling & Methods</h4>
                                <div className="tech-tags">
                                    <span>PHPStan Level 9</span>
                                    <span>OWASP ZAP</span>
                                    <span>Rector</span>
                                    <span>ESLint Strict</span>
                                    <span>Dependency Scanning</span>
                                    <span>Load Testing (k6)</span>
                                    <span>DB Query Profiling</span>
                                    <span>CI/CD Inspection</span>
                                    <span>Architecture Mapping</span>
                                    <span>Log Analysis</span>
                                    <span>Telescope Profiling</span>
                                </div>
                            </div>

                            <div className="service-detail">
                                <h4>What You Receive</h4>
                                <ul>
                                    <li>Full written Technical Health Report (PDF + source)</li>
                                    <li>Severity-ranked issue list (Critical / High / Medium / Low)</li>
                                    <li>Per-issue remediation effort and cost estimate</li>
                                    <li>Architecture diagram: current state vs. recommended state</li>
                                    <li>Executive summary suitable for board or investor review</li>
                                </ul>
                            </div>

                            <div className="service-detail best-for">
                                <h4>Business Value</h4>
                                <p>
                                    This engagement converts your largest technical liability into a
                                    quantified risk register, allowing your CFO and board to evaluate
                                    remediation cost versus the cost of inaction with precision rather
                                    than conjecture. Most clients recoup the audit fee in the first
                                    sprint of remediation by avoiding the missteps that incorrect
                                    diagnosis would have caused.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Service 2: Triage & Stabilization */}
            <Section className="service-section alt">
                <Container>
                    <div className="service-block">
                        <div className="service-header">
                            <div className="service-icon-wrapper">
                                <Wrench size={40} strokeWidth={1.5} />
                            </div>
                            <h2>Phase 2: Triage & Stabilization</h2>
                        </div>

                        <p className="service-value">
                            We stop the bleeding. Informed by the diagnostic audit's findings, our engineers
                            systematically patch critical production failures, seal active security vulnerabilities,
                            and establish the foundational engineering practices — reproducible CI/CD pipelines,
                            production observability, and automated deployment rollbacks — that your system
                            should have had from the first sprint. All triage work is executed on a staging
                            branch and requires your explicit sign-off before promotion to the live environment.
                            We do not introduce risk to recover from risk. The guiding constraint is:
                            your system must be more stable at the end of every week than it was at the beginning.
                        </p>

                        <div className="service-details-grid">
                            <div className="service-detail">
                                <h4>What We Fix</h4>
                                <ul>
                                    <li>Server crashes, memory leaks & unhandled fatal exceptions</li>
                                    <li>Security holes: SQL injection, XSS, auth bypasses, SSRF</li>
                                    <li>Broken or absent CI/CD deployment pipelines</li>
                                    <li>Data integrity issues & corrupted application state</li>
                                    <li>N+1 query patterns causing database timeout cascades</li>
                                    <li>Missing rate limiting, CSRF protection & input sanitization</li>
                                    <li>Environment configuration leakage & credential exposure</li>
                                </ul>
                            </div>

                            <div className="service-detail">
                                <h4>Technology Stack</h4>
                                <div className="tech-tags">
                                    <span>Laravel 12</span>
                                    <span>React 19</span>
                                    <span>Node.js</span>
                                    <span>PostgreSQL</span>
                                    <span>MySQL 8</span>
                                    <span>Redis 7</span>
                                    <span>Docker</span>
                                    <span>GitHub Actions</span>
                                    <span>AWS / DigitalOcean</span>
                                    <span>Nginx</span>
                                    <span>Laravel Sanctum</span>
                                    <span>Sentry</span>
                                    <span>Laravel Horizon</span>
                                </div>
                            </div>

                            <div className="service-detail">
                                <h4>Our Approach</h4>
                                <p>
                                    Stabilization is performed live — we do not take your existing system offline
                                    at any point during the triage phase. All changes go through a staging environment
                                    for validation and are covered by automated integration tests before production
                                    deployment. You are notified, given a detailed change summary, and explicitly
                                    approve every critical change before it ships. A production observability stack
                                    (Sentry error tracking, uptime monitoring, Laravel Horizon queue dashboard)
                                    is established so you have real-time system visibility throughout the engagement.
                                </p>
                            </div>

                            <div className="service-detail best-for">
                                <h4>Business Value</h4>
                                <p>
                                    For every week a production system operates in an unstable state, the cost
                                    of remediation compounds — through customer churn, support overhead, and
                                    the opportunity cost of features that cannot be shipped. Triage converts
                                    an adversarial relationship with your codebase into a defensible baseline,
                                    re-opening the development velocity that accumulated technical debt
                                    has been silently destroying.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Service 3: Modernization Retainer */}
            <Section className="service-section">
                <Container>
                    <div className="service-block">
                        <div className="service-header">
                            <div className="service-icon-wrapper">
                                <TrendingUp size={40} strokeWidth={1.5} />
                            </div>
                            <h2>Phase 3: Modernization Retainer</h2>
                        </div>

                        <p className="service-value">
                            Stabilization buys you time. Modernization buys you the future. Our retainer model
                            provides dedicated engineering bandwidth — a fixed team size, fixed sprint scope,
                            fixed monthly cost — to systematically remove technical debt, refactor critical
                            subsystems, and build the new features your business requires, all without pausing
                            operations. We operate in 2-week sprints with a committed deliverable scope per sprint,
                            a working demo at sprint end, and full transparency into the backlog. Every sprint
                            plan is collaboratively defined with your product stakeholders before work begins.
                            You can cancel with 30 days' notice — no lock-in clauses, no exit penalties.
                        </p>

                        <div className="service-details-grid">
                            <div className="service-detail">
                                <h4>What We Deliver</h4>
                                <ul>
                                    <li>Systematic legacy-to-modern stack migration (Laravel 12, React 19)</li>
                                    <li>TypeScript 5 strict mode adoption across frontend codebases</li>
                                    <li>PestPHP 3 test suite establishment prior to high-risk refactors</li>
                                    <li>New feature development on clean, domain-isolated architecture</li>
                                    <li>Database restructuring, migration scripting & performance tuning</li>
                                    <li>Mobile app development (Flutter / React Native)</li>
                                    <li>API redesign, versioning & third-party integration rewrites</li>
                                </ul>
                            </div>

                            <div className="service-detail">
                                <h4>Retainer Stack</h4>
                                <div className="tech-tags">
                                    <span>Laravel 12</span>
                                    <span>React 19</span>
                                    <span>Next.js 15</span>
                                    <span>Vue.js 3</span>
                                    <span>TypeScript 5</span>
                                    <span>Tailwind CSS 4</span>
                                    <span>PestPHP 3</span>
                                    <span>Node.js</span>
                                    <span>Flutter</span>
                                    <span>AWS</span>
                                    <span>PostgreSQL</span>
                                    <span>Redis 7</span>
                                    <span>Docker</span>
                                    <span>Kubernetes</span>
                                </div>
                            </div>

                            <div className="service-detail">
                                <h4>Our Approach</h4>
                                <p>
                                    Retainers operate in 2-week sprints with a fixed deliverable scope agreed
                                    collaboratively before each sprint begins. You receive a written sprint plan,
                                    a mid-sprint status update, and a working demo or pull request review at
                                    sprint end. The backlog is managed in a shared project management workspace
                                    with full visibility into every task, its status, and the engineer responsible.
                                    Weekly async written updates summarize progress, blockers, and the sprint ahead.
                                    There are no surprise billing events.
                                </p>
                            </div>

                            <div className="service-detail best-for">
                                <h4>Business Value</h4>
                                <p>
                                    A senior full-stack engineer with relevant rescue experience costs $150,000
                                    to $220,000 annually in the US market — before benefits, recruitment overhead,
                                    and the ramp time required to become productive on a complex legacy codebase.
                                    Our retainer model delivers a team of three to five specialists at a fraction
                                    of that cost, with no onboarding curve, management overhead, or equity dilution.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Service 4: Greenfield Development */}
            <Section className="service-section alt">
                <Container>
                    <div className="service-block">
                        <div className="service-header">
                            <div className="service-icon-wrapper">
                                <Hammer size={40} strokeWidth={1.5} />
                            </div>
                            <h2>Greenfield Development</h2>
                        </div>

                        <p className="service-value">
                            Not everything needs rescuing. If you're starting from scratch, we build it correctly
                            the first time — with the infrastructure governance, security controls, automated
                            testing discipline, and architectural decision records that prevent the exact problems
                            we spend so much time fixing for other clients. All greenfield projects begin with a
                            documented Architecture Decision Record (ADR) and a written system design specification
                            before a line of code is written. We deliver enterprise-grade MVPs on fixed-price,
                            fixed-timeline contracts with zero scope-creep clauses and no hourly billing surprises.
                        </p>

                        <div className="service-details-grid">
                            <div className="service-detail">
                                <h4>What We Build</h4>
                                <ul>
                                    <li>SaaS products & multi-tenant web applications</li>
                                    <li>Cross-platform mobile apps (iOS & Android via Flutter)</li>
                                    <li>Internal workflow automation & admin dashboards</li>
                                    <li>Customer-facing portals & self-service platforms</li>
                                    <li>MVP products for investor validation with production-grade architecture</li>
                                    <li>Compliance-ready applications for regulated industries</li>
                                    <li>AI-integrated products with EU AI Act conformity documentation</li>
                                </ul>
                            </div>

                            <div className="service-detail">
                                <h4>Technology Stack</h4>
                                <div className="tech-tags">
                                    <span>React 19</span>
                                    <span>Next.js 15</span>
                                    <span>TypeScript 5</span>
                                    <span>Tailwind CSS 4</span>
                                    <span>Vue.js 3</span>
                                    <span>Laravel 12</span>
                                    <span>Node.js</span>
                                    <span>Python 3.12</span>
                                    <span>Flutter</span>
                                    <span>PostgreSQL</span>
                                    <span>Redis 7</span>
                                    <span>AWS</span>
                                    <span>Docker</span>
                                    <span>PestPHP 3</span>
                                </div>
                            </div>

                            <div className="service-detail">
                                <h4>Our Approach</h4>
                                <p>
                                    All greenfield projects begin with a documented Architecture Decision Record
                                    and a written system design specification reviewed and approved by your team
                                    before development begins. We establish automated CI/CD, test-driven
                                    development practices, and production observability on day one — not as
                                    an afterthought. Deliverables are defined in contract. Fixed price, fixed
                                    timeline. No scope creep by default — change requests follow a formal
                                    written process with clear cost and timeline implications.
                                </p>
                            </div>

                            <div className="service-detail best-for">
                                <h4>Business Value</h4>
                                <p>
                                    The cost of building software correctly on the first attempt is approximately
                                    one-third the cost of rescuing software that was built incorrectly. Our
                                    greenfield clients benefit from the institutional knowledge we've accumulated
                                    rescuing over forty failed projects — every architectural anti-pattern we've
                                    seen becomes a guardrail we enforce from your project's first commit.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Service 5: Ongoing Support */}
            <Section className="service-section">
                <Container>
                    <div className="service-block">
                        <div className="service-header">
                            <div className="service-icon-wrapper">
                                <Headphones size={40} strokeWidth={1.5} />
                            </div>
                            <h2>Ongoing Engineering Support</h2>
                        </div>

                        <p className="service-value">
                            For product companies with live applications that need consistent, reliable engineering
                            bandwidth without the cost or overhead of full-time hiring. We integrate with your
                            existing processes, attend your standups, work inside your issue tracker, and
                            deliver predictably — sprint after sprint. A dedicated Lead Engineer and Project
                            Manager own your engagement end-to-end. You get the reliability of an internal
                            team with the specialist depth of an external one — and none of the management
                            overhead, recruiting cost, or equity dilution.
                        </p>

                        <div className="service-details-grid">
                            <div className="service-detail">
                                <h4>What's Included</h4>
                                <ul>
                                    <li>Dedicated engineering hours per month (defined in contract)</li>
                                    <li>Bug triage, root-cause analysis & production fixes</li>
                                    <li>Security patches & dependency version management</li>
                                    <li>Feature enhancements & product iteration sprints</li>
                                    <li>Proactive performance optimization & capacity planning</li>
                                    <li>Weekly written health reports & sprint retrospectives</li>
                                    <li>On-call response for Priority 1 production incidents</li>
                                </ul>
                            </div>

                            <div className="service-detail">
                                <h4>Support Models</h4>
                                <div className="tech-tags">
                                    <span>Monthly Retainer</span>
                                    <span>Dedicated Squad</span>
                                    <span>Priority 1 SLA</span>
                                    <span>24/7 Monitoring</span>
                                    <span>Sprint-Based</span>
                                    <span>Staff Augmentation</span>
                                    <span>Team Extension</span>
                                </div>
                            </div>

                            <div className="service-detail">
                                <h4>Our Approach</h4>
                                <p>
                                    A dedicated Lead Engineer and PM own your engagement with no rotation.
                                    We operate inside your chosen project management tooling (Linear, Jira,
                                    Notion, GitHub Issues) and communication channels. Weekly async written
                                    health reports cover what shipped, what is in progress, what is blocked,
                                    and any proactive recommendations from the engineering team. We do not
                                    wait for you to notice a problem — we report emerging risks before
                                    they become production incidents.
                                </p>
                            </div>

                            <div className="service-detail best-for">
                                <h4>Business Value</h4>
                                <p>
                                    Product companies that outsource ongoing engineering to a dedicated,
                                    accountable partner consistently report higher sprint velocity, lower
                                    production incident rates, and faster time-to-market for new features
                                    than equivalent internal teams — primarily because our engineers bring
                                    accumulated operational experience from dozens of prior engagements
                                    that an internal hire would take years to develop.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* ── NEW: Pricing FAQ Section (FAQPage schema target) ── */}
            <Section className="pricing-faq-section">
                <Container>
                    <div className="pricing-faq-header">
                        <HelpCircle size={36} strokeWidth={1.5} className="pricing-faq-icon" />
                        <span className="accent-label">Pricing & Process — Answered Directly</span>
                        <h2>The Questions Every Enterprise Buyer Asks</h2>
                        <p>
                            High-stakes technical decisions require complete information. These are the questions
                            that matter most to CFOs, CTOs, and procurement teams evaluating a rescue engagement.
                            We answer them without deflection.
                        </p>
                    </div>

                    <div className="pricing-faq-grid">
                        {faqItems.map((item, index) => (
                            <div className="faq-item" key={index}>
                                <h4>{item.question}</h4>
                                <p>{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Strategy Call closer */}
            <Section>
                <Container>
                    <div className="services-intro">
                        <p>
                            Not sure which service fits your situation? Every engagement starts with a complimentary
                            15-minute Rescue Strategy Call. We assess your business situation, the state of your
                            current team, and recommend the correct technical starting point with full transparency.
                            No high-pressure sales process — just a candid, expert assessment of whether your
                            project can be rescued, and at what cost.
                        </p>
                    </div>
                </Container>
            </Section>

            {/* CTA Section */}
            <Section className="services-cta">
                <Container>
                    <div className="cta-content">
                        <h2>Let's Fix What's Broken.</h2>
                        <p>
                            Stop guessing why your application is failing. Book a Strategy Call today to
                            assess whether your codebase qualifies for our Diagnostic Audit — and walk away
                            with a written answer to the question "is this fixable, and what will it cost?"
                        </p>
                        <Link to="/contact" className="btn btn-primary">
                            Book a Rescue Strategy Call <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                        </Link>
                    </div>
                </Container>
            </Section>
        </div>
    );
};

export default Services;
