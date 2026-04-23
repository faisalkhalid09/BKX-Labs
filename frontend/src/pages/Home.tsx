import Hero from '../components/ui/Hero';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SEO from '../components/ui/SEO';
import {
    AlertTriangle,
    Search,
    TrendingUp,
    CheckCircle,
    FileText,
    UserCheck,
    Clock,
    Layers,
    Wrench,
    FlaskConical,
    Users2,
    ClipboardList,
    ShieldCheck,
    Lock,
    Cpu,
    GitBranch,
    Code2,
    ServerCrash,
} from 'lucide-react';
import './Home.css';

const Home = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": ["Organization", "ProfessionalService"],
                "@id": "https://bkxlabs.com/#organization",
                "name": "BKX Labs",
                "alternateName": "BKX Labs Software Rescue Agency",
                "url": "https://bkxlabs.com/",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://bkxlabs.com/brand-logo.png",
                    "width": 400,
                    "height": 120
                },
                "description": "BKX Labs is a specialized software rescue agency that recovers failing Laravel and React projects, resolves enterprise-grade technical debt, and provides compliance infrastructure for regulated industries. The agency operates a deterministic, phase-gated rescue methodology across Diagnostic, Triage, and Modernization phases, serving funded startups and enterprise teams globally.",
                "areaServed": "Worldwide",
                "priceRange": "$$$$",
                "serviceType": [
                    "Software Rescue Agency",
                    "Codebase Audit",
                    "Technical Debt Remediation",
                    "Laravel Project Recovery",
                    "React Codebase Stabilization",
                    "Compliance Engineering",
                    "Post-Quantum Cryptography Readiness",
                    "EU AI Act Compliance",
                    "SOC 2 Gap Analysis"
                ],
                "knowsAbout": [
                    "Laravel 12",
                    "React 19",
                    "TypeScript 5",
                    "Post-Quantum Cryptography",
                    "EU AI Act Compliance",
                    "SOC 2 Type II",
                    "Technical Debt Remediation",
                    "Software Architecture"
                ],
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Software Rescue Services",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Diagnostic Codebase Audit",
                                "description": "A forensic review of your existing codebase, security posture, and infrastructure to produce a severity-ranked remediation roadmap."
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Triage and Stabilization",
                                "description": "Emergency patching of production crashes, security vulnerabilities, and broken CI/CD pipelines — without taking your system offline."
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Modernization Retainer",
                                "description": "Systematic long-term refactoring from legacy architecture to modern scalable patterns using Laravel 12, React 19, and TypeScript 5."
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Compliance Infrastructure Engineering",
                                "description": "Implementation of enterprise compliance tooling for EU AI Act, SOC 2 Type II, and Post-Quantum Cryptography readiness."
                            }
                        }
                    ]
                },
                "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": "customer service",
                    "url": "https://bkxlabs.com/contact",
                    "availableLanguage": "English"
                },
                "sameAs": [
                    "https://linkedin.com/company/bkxlabs",
                    "https://github.com/bkxlabs"
                ]
            },
            {
                "@type": "WebPage",
                "@id": "https://bkxlabs.com/#webpage",
                "url": "https://bkxlabs.com/",
                "name": "BKX Labs — Software Rescue Agency | Laravel & React Project Recovery",
                "description": "BKX Labs is a specialized software rescue agency that recovers failing Laravel and React projects, resolves technical debt, and provides enterprise-grade compliance infrastructure.",
                "isPartOf": { "@id": "https://bkxlabs.com/#organization" },
                "breadcrumb": {
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bkxlabs.com/" }
                    ]
                }
            }
        ]
    };

    return (
        <div>
            <SEO
                title="Software Project Rescue Agency | Stalled App Recovery & Audit"
                description="BKX Labs is the engineering team you call when your software is failing. We rescue stalled Laravel apps, audit enterprise React codebases, and fix technical debt nightmares. Specialized rescue methodology, 25-person specialist team."
                keywords="software project rescue agency, stalled laravel app recovery, technical debt refactoring, enterprise react codebase audit, rescue failing web applications, project takeover specialists, laravel 12 rescue, react 19 codebase audit, compliance engineering agency"
                structuredData={structuredData}
            />

            {/* AEO Direct Answer Block — visually hidden, crawler and screen-reader readable */}
            <section
                aria-label="What is BKX Labs?"
                className="sr-only"
            >
                <h1>BKX Labs: Specialized Software Rescue Agency</h1>
                <p>
                    BKX Labs is a specialized software rescue agency that recovers failing Laravel and React projects,
                    resolves enterprise-grade technical debt, and provides compliance infrastructure for regulated
                    industries. The agency operates a deterministic, phase-gated rescue methodology — Diagnostic,
                    Triage, and Modernization — serving funded startups and enterprise product teams globally.
                    BKX Labs engineers hold deep expertise in Laravel 12, React 19, TypeScript, post-quantum
                    cryptography, EU AI Act compliance, and SOC 2 Type II audit preparation. Every engagement begins
                    with a written Technical Health Report before a single line of production code is modified.
                </p>
                <p>
                    The agency provides five core service lines: Diagnostic Codebase Audit, Triage and Stabilization,
                    Modernization Retainer, Greenfield Development, and Compliance Infrastructure Engineering.
                    BKX Labs also operates a free public compliance tool suite at bkxlabs.com/tools, covering
                    EU AI Act risk classification, Post-Quantum CBOM generation, SOC 2 readiness scoring,
                    cloud GPU cost comparison, and thirteen additional regulatory and infrastructure calculators.
                </p>
            </section>

            {/* Hero Section */}
            <Hero
                title="Don't Let Bad Code Kill Your Business."
                subtitle="Startups and enterprises lose millions on failed agency transitions and accumulated technical debt. Our specialized engineering team takes over broken codebases, stabilizes your infrastructure, and delivers what others couldn't."
                ctaText="Request a Technical Health Check"
                ctaLink="/contact"
            />

            {/* The Problem Statement */}
            <Section className="problem-section">
                <Container>
                    <h2 className="text-center section-heading">Sound Familiar?</h2>
                    <p className="text-center section-subheading">
                        You're not alone. Most businesses that come to us have experienced at least one of these situations.
                    </p>
                    <div className="grid grid-3">
                        <Card>
                            <div className="card-icon-wrapper">
                                <AlertTriangle size={40} strokeWidth={1.5} />
                            </div>
                            <h3>Agency Left You Stranded</h3>
                            <p className="card-text">
                                Your original developer or agency disappeared, delivered incomplete work, or left behind
                                a codebase so fragile that adding a single feature breaks everything else.
                            </p>
                        </Card>

                        <Card>
                            <div className="card-icon-wrapper">
                                <Clock size={40} strokeWidth={1.5} />
                            </div>
                            <h3>Months Behind Schedule</h3>
                            <p className="card-text">
                                A launch that was "three weeks away" six months ago. Deadlines keep slipping because
                                the underlying architecture was never built to scale, and every fix creates two new bugs.
                            </p>
                        </Card>

                        <Card>
                            <div className="card-icon-wrapper">
                                <Layers size={40} strokeWidth={1.5} />
                            </div>
                            <h3>Crushing Technical Debt</h3>
                            <p className="card-text">
                                Years of shortcuts and band-aid fixes have made your codebase a liability. Your team
                                is spending more time firefighting than building the features your business needs.
                            </p>
                        </Card>
                    </div>
                </Container>
            </Section>

            {/* ── NEW: Why Software Projects Fail ── */}
            <Section className="why-fail-section">
                <Container>
                    <div className="why-fail-header">
                        <span className="accent-label">Root Cause Analysis</span>
                        <h2>Why Enterprise Software Projects Fail</h2>
                        <p>
                            After recovering over forty high-stakes codebases, we've identified three systemic failure
                            modes that account for the overwhelming majority of stalled, broken, and abandoned projects.
                            Understanding the root cause — not just the symptoms — is what separates a lasting rescue
                            from a temporary patch.
                        </p>
                    </div>

                    <div className="why-fail-grid">
                        <div className="why-fail-item">
                            <div className="why-fail-item-icon">
                                <ServerCrash size={28} strokeWidth={1.5} />
                            </div>
                            <h3>Misaligned Team Composition</h3>
                            <p>
                                The most common failure pattern is deploying a generalist team on a specialist problem.
                                A Laravel security vulnerability is not a "senior PHP developer" problem — it is a
                                security engineering problem that requires a completely different diagnostic lens.
                                When the team's capability ceiling is lower than the problem's complexity floor,
                                failure is structurally guaranteed regardless of effort.
                            </p>
                            <ul className="why-fail-symptoms">
                                <li>Repeated security patches that don't resolve the root authentication flaw</li>
                                <li>Performance "fixes" that shift bottlenecks rather than eliminate them</li>
                                <li>Architectural decisions made reactively rather than from a system-wide view</li>
                            </ul>
                        </div>

                        <div className="why-fail-item">
                            <div className="why-fail-item-icon">
                                <GitBranch size={28} strokeWidth={1.5} />
                            </div>
                            <h3>Absent Architecture Governance</h3>
                            <p>
                                Software systems without defined architectural constraints degrade deterministically.
                                Each developer who touches the codebase adds their own patterns, bypasses established
                                conventions, and introduces coupling that future developers must work around.
                                Within 18 months of initial release, most unstructured codebases have accumulated
                                enough hidden dependencies that a change in any one module can cause failures in
                                completely unrelated subsystems.
                            </p>
                            <ul className="why-fail-symptoms">
                                <li>No enforced coding standards — PHPStan, ESLint, or equivalent are absent or ignored</li>
                                <li>Business logic scattered across controllers, models, and frontend components</li>
                                <li>Zero automated test coverage, making safe refactoring impossible</li>
                            </ul>
                        </div>

                        <div className="why-fail-item">
                            <div className="why-fail-item-icon">
                                <Code2 size={28} strokeWidth={1.5} />
                            </div>
                            <h3>Uncontrolled Scope Accumulation</h3>
                            <p>
                                Feature requests added without corresponding architectural review create technical debt
                                at a compounding rate. Each shortcut taken under delivery pressure costs three to five
                                times more to remediate later. By the time teams recognize the codebase as unmanageable,
                                the remediation cost has frequently exceeded the original development budget —
                                yet the business still cannot ship the features that drove the original investment.
                            </p>
                            <ul className="why-fail-symptoms">
                                <li>Sprint velocity declining month-over-month despite consistent team headcount</li>
                                <li>Bug count increasing relative to features shipped</li>
                                <li>Engineers describing large portions of the codebase as "untouchable"</li>
                            </ul>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Internal Linking Navigation Block — signals importance of key pages to Google */}
            <Section className="internal-nav-section">
                <Container>
                    <h2 className="text-center section-heading">Everything You Need to Know</h2>
                    <p className="text-center section-subheading">
                        Explore how we work, what we offer, and who we are — before you commit to a single conversation.
                    </p>
                    <div className="internal-nav-grid">
                        <a href="/services" className="internal-nav-card" aria-label="View our software rescue services">
                            <span className="internal-nav-icon"><Wrench size={28} strokeWidth={1.5} /></span>
                            <h3>Our Services</h3>
                            <p>Diagnostic audits, emergency triage, modernization retainers, and greenfield development — structured for your situation.</p>
                            <span className="internal-nav-link">View Services →</span>
                        </a>
                        <a href="/process" className="internal-nav-card" aria-label="Learn about our rescue process">
                            <span className="internal-nav-icon"><FlaskConical size={28} strokeWidth={1.5} /></span>
                            <h3>The Rescue Protocol</h3>
                            <p>Our 5-step, auditable process for taking over a failing project and bringing it to production with full transparency.</p>
                            <span className="internal-nav-link">Explore Process →</span>
                        </a>
                        <a href="/about" className="internal-nav-card" aria-label="About BKX Labs team and mission">
                            <span className="internal-nav-icon"><Users2 size={28} strokeWidth={1.5} /></span>
                            <h3>About Us</h3>
                            <p>A 25-person team of specialists hand-picked for their ability to stabilize and rescue high-stakes software systems.</p>
                            <span className="internal-nav-link">Meet the Team →</span>
                        </a>
                        <a href="/contact" className="internal-nav-card" aria-label="Contact BKX Labs to start your rescue">
                            <span className="internal-nav-icon"><ClipboardList size={28} strokeWidth={1.5} /></span>
                            <h3>Start Your Rescue</h3>
                            <p>Every engagement starts with a Technical Health Check. Tell us about your situation — no obligation, just clarity.</p>
                            <span className="internal-nav-link">Get In Touch →</span>
                        </a>
                    </div>
                </Container>
            </Section>

            {/* The 3-Phase Rescue Funnel — expanded methodology copy */}
            <Section className="protocol-section">
                <Container>
                    <div className="protocol-grid">
                        <div className="protocol-sticky">
                            <span className="accent-label">Methodology</span>
                            <h2>The Rescue Protocol</h2>
                            <p>
                                We don't believe in "rewriting from scratch." We employ a systematic,
                                low-risk approach to stabilizing and evolving mission-critical software —
                                with full auditability at every phase gate.
                            </p>
                            <a href="/process" className="protocol-explore-btn">
                                Explore our Process
                                <div className="arrow-icon">
                                    <TrendingUp size={16} />
                                </div>
                            </a>
                        </div>

                        <div className="protocol-steps">
                            {/* Step 1 */}
                            <div className="protocol-step">
                                <div className="step-number">01</div>
                                <div className="step-content">
                                    <h3>Diagnostic</h3>
                                    <p>
                                        A forensic deep-dive into your codebase, infrastructure, and architecture.
                                        Our engineers use static analysis tooling (PHPStan Level 9, ESLint strict,
                                        OWASP ZAP for security surface mapping), dependency vulnerability scanning,
                                        and live query profiling against your database under realistic load profiles.
                                        The output is a written Technical Health Report: every issue ranked by severity
                                        (Critical / High / Medium / Low), with a time-and-cost estimate for each
                                        remediation item. You own this report outright. No obligation to continue.
                                    </p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="protocol-step">
                                <div className="step-number">02</div>
                                <div className="step-content">
                                    <h3>Triage</h3>
                                    <p>
                                        Immediate, high-precision intervention on critical failure points.
                                        All triage work is performed on a staging branch — never directly in production —
                                        using a reproducible deployment pipeline (GitHub Actions / Docker / Nginx)
                                        that may not have existed before we arrived. Critical security vulnerabilities
                                        (SQL injection, broken authentication, unvalidated redirect chains) are sealed
                                        within the first 72 hours. A Sentry error-tracking integration and Laravel
                                        Horizon queue monitoring dashboard are established so you have real-time
                                        production visibility for the first time. Every change is reviewed, logged,
                                        and approved by your team before it touches the live environment.
                                    </p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="protocol-step">
                                <div className="step-number">03</div>
                                <div className="step-content">
                                    <h3>Modernization</h3>
                                    <p>
                                        Iterative architectural evolution delivered via 2-week sprints with a fixed,
                                        transparent deliverable scope per sprint. We migrate legacy patterns to
                                        Laravel 12 service-layer architecture, React 19 with TypeScript strict mode,
                                        and PestPHP 3 test suites that establish a regression safety net before
                                        any high-risk refactor is attempted. Database restructuring, API versioning,
                                        and third-party integration rewrites are sequenced to maintain zero-downtime
                                        throughout. The definition of "done" for modernization is that your internal
                                        team can take full ownership without requiring our continued involvement —
                                        supported by the architecture documentation, onboarding guides, and
                                        runbooks we deliver at handover.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* ── NEW: Compliance & Security Engineering Section ── */}
            <Section className="compliance-section">
                <Container>
                    <div className="compliance-header">
                        <span className="accent-label">Compliance Infrastructure</span>
                        <h2>Engineering for Regulated Industries</h2>
                        <p>
                            Technical debt is not just a development problem — it is a compliance risk. Regulated
                            industries face an accelerating intersection of software quality requirements and
                            legal enforcement timelines. BKX Labs provides the compliance engineering layer
                            that most development agencies are not equipped to deliver.
                        </p>
                    </div>

                    <div className="compliance-grid">
                        <div className="compliance-editorial">
                            <h3>Why Compliance Requires Engineering Expertise</h3>
                            <p>
                                The EU AI Act's August 2026 enforcement deadline for high-risk AI systems is not a
                                legal problem — it is a software architecture problem. Demonstrating conformity
                                requires reproducible risk management systems, technical documentation tied to
                                specific code versions, and human oversight mechanisms built into the application
                                itself. Lawyers draft the policy; engineers implement the controls.
                            </p>
                            <p>
                                Similarly, SOC 2 Type II continuous monitoring is not achieved by collecting
                                screenshots before an audit — it requires automated, API-driven evidence pipelines
                                that produce cryptographically verifiable control records throughout the entire
                                observation period. Organizations that attempt SOC 2 without engineering-grade
                                automation routinely receive qualified (failed) audit opinions.
                            </p>
                            <p>
                                Post-Quantum Cryptography migration from RSA and ECDH to NIST-standardized
                                ML-KEM (FIPS 203) and ML-DSA (FIPS 204) is a code-level migration task. The
                                "Harvest Now, Decrypt Later" threat is already active — adversaries are capturing
                                your encrypted traffic today. The migration window is not 2030; it is now.
                            </p>
                            <p>
                                Our compliance engineering team builds the controls, not just the checklists.
                                Use our free tooling suite to assess your current posture, then engage us to
                                implement the remediation.
                            </p>
                        </div>

                        <div className="compliance-tools">
                            <h3>Free Compliance Assessment Tools</h3>
                            <div className="compliance-tool-cards">
                                <a
                                    href="/tools/eu-ai-act-risk-level-classifier"
                                    className="compliance-tool-card"
                                    aria-label="EU AI Act Risk Level Classifier tool"
                                >
                                    <div className="compliance-tool-icon">
                                        <ShieldCheck size={24} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h4>EU AI Act Risk Classifier</h4>
                                        <p>Classify your AI system under Annex III with full Article 5 prohibited practice detection and compliance checklist generation.</p>
                                        <span className="compliance-tool-link">Run Assessment →</span>
                                    </div>
                                </a>

                                <a
                                    href="/tools/saas-soc2-readiness-calculator"
                                    className="compliance-tool-card"
                                    aria-label="SOC 2 Readiness Calculator tool"
                                >
                                    <div className="compliance-tool-icon">
                                        <FileText size={24} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h4>SOC 2 Readiness Calculator</h4>
                                        <p>Gap-analysis scoring across all Trust Services Criteria. Identify your highest-risk control failures before the auditor does.</p>
                                        <span className="compliance-tool-link">Calculate Readiness →</span>
                                    </div>
                                </a>

                                <a
                                    href="/tools/post-quantum-cbom-generator"
                                    className="compliance-tool-card"
                                    aria-label="Post-Quantum CBOM Generator tool"
                                >
                                    <div className="compliance-tool-icon">
                                        <Lock size={24} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h4>Post-Quantum CBOM Generator</h4>
                                        <p>Scan your dependency list for quantum-vulnerable cryptographic libraries and receive a NIST FIPS 203/204/205 migration roadmap.</p>
                                        <span className="compliance-tool-link">Scan Dependencies →</span>
                                    </div>
                                </a>

                                <a
                                    href="/tools"
                                    className="compliance-tool-card compliance-tool-card--all"
                                    aria-label="View all 14 compliance and security tools"
                                >
                                    <div className="compliance-tool-icon">
                                        <Cpu size={24} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h4>View All 14 Tools</h4>
                                        <p>The full BKX Labs compliance and infrastructure tool suite — free, deterministic, and aligned to 2026 regulatory timelines.</p>
                                        <span className="compliance-tool-link">Browse Tools →</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Proof / Advantage */}
            <Section>
                <Container>
                    <h2 className="text-center section-heading">Why Teams Trust BKX Labs</h2>
                    <p className="text-center section-subheading">
                        We've been brought in after three failed agencies, six-month launch delays, and full
                        production outages. Here's what sets us apart.
                    </p>
                    <div className="grid grid-3">
                        <Card>
                            <div className="card-icon-wrapper">
                                <Search size={40} strokeWidth={1.5} />
                            </div>
                            <h3>We Diagnose Before We Code</h3>
                            <p className="card-text">
                                Most developers start writing code immediately. We spend the first phase understanding
                                the full depth of the problem so the solution is correct, not just fast.
                            </p>
                        </Card>

                        <Card>
                            <div className="card-icon-wrapper">
                                <UserCheck size={40} strokeWidth={1.5} />
                            </div>
                            <h3>Dedicated Lead & PM</h3>
                            <p className="card-text">
                                You get a dedicated Project Manager and a Lead Engineer as your two points of contact.
                                Executive-level communication, zero "I'll check with the team" runarounds.
                            </p>
                        </Card>

                        <Card>
                            <div className="card-icon-wrapper">
                                <FileText size={40} strokeWidth={1.5} />
                            </div>
                            <h3>You Own Everything</h3>
                            <p className="card-text">
                                Full source code, complete SRS documentation, architecture diagrams, and deployment
                                guides. No vendor lock-in — you can take our work to any team in the future.
                            </p>
                        </Card>
                    </div>
                </Container>
            </Section>

            {/* The BKX Commitments */}
            <Section className="guarantee-section">
                <Container>
                    <div className="guarantee-block">
                        <div className="guarantee-header">
                            <CheckCircle size={48} strokeWidth={1.5} className="guarantee-icon" />
                            <h2>Our Rescue Commitments</h2>
                        </div>
                        <p className="guarantee-intro">
                            Taking over someone else's failure is a serious responsibility. We back every rescue
                            engagement with concrete, documented commitments — not verbal assurances.
                        </p>
                        <div className="guarantee-points">
                            <div className="g-point">
                                <CheckCircle size={24} />
                                <div>
                                    <h4>Written Diagnostic Report</h4>
                                    <p>Before we start any work, you receive a complete written health report detailing every critical, high, and medium severity issue with individual remediation cost and time estimates. No surprises about what needs to be fixed or why. This document is yours regardless of whether you proceed.</p>
                                </div>
                            </div>
                            <div className="g-point">
                                <CheckCircle size={24} />
                                <div>
                                    <h4>Zero-Pause Stabilization</h4>
                                    <p>Triage and stabilization are performed without taking your existing system offline. All changes are validated in a staging environment and require your explicit approval before being promoted to production. Business continuity is not a selling point — it is a non-negotiable constraint on how we operate.</p>
                                </div>
                            </div>
                            <div className="g-point">
                                <CheckCircle size={24} />
                                <div>
                                    <h4>60-Day Post-Handover Support</h4>
                                    <p>We stay engaged for 60 days post-delivery at no additional charge to monitor production stability, address any edge cases that surface under real-world load, and ensure your internal team has full operational ownership. The engagement is not complete until your team is self-sufficient.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Final CTA */}
            <Section className="cta-section">
                <Container>
                    <div className="cta-block">
                        <h2>
                            Your software is fixable. Let's prove it.
                        </h2>
                        <p>
                            Every rescue starts with a Technical Health Check. You'll walk away with a written
                            assessment of your system's critical risk surface — no strings attached, no sales call.
                            Just an honest answer to the question your board is already asking.
                        </p>
                        <Button variant="primary" href="/contact">
                            Talk to a Turnaround Architect
                        </Button>
                    </div>
                </Container>
            </Section>
        </div>
    );
};

export default Home;
