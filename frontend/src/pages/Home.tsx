import { useEffect, useRef } from 'react';
import Hero from '../components/ui/Hero';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SEO from '../components/ui/SEO';
import { useParticleLogo } from '../hooks/useParticleLogo';
import {
    AlertTriangle,
    Clock,
    Layers,
    ServerCrash,
    GitBranch,
    Code2,
    Search,
    UserCheck,
    FileText,
    TrendingUp,
    CheckCircle,
    ArrowRight,
} from 'lucide-react';
import './Home.css';

const Home = () => {
    const { canvasRef, handleMouseEnter, handleMouseLeave } = useParticleLogo();
    const revealRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        revealRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('hm-revealed');
                        revealRef.current?.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );
        document.querySelectorAll('.hm-reveal').forEach((el) => {
            revealRef.current?.observe(el);
        });
        return () => revealRef.current?.disconnect();
    }, []);

    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": ["Organization", "ProfessionalService"],
                "@id": "https://bkxlabs.com/#organization",
                "name": "BKX Labs",
                "url": "https://bkxlabs.com/",
                "description": "BKX Labs is a specialized software rescue agency.",
                "areaServed": "Worldwide",
                "contactPoint": { "@type": "ContactPoint", "contactType": "customer service", "url": "https://bkxlabs.com/contact" }
            },
            {
                "@type": "WebPage",
                "@id": "https://bkxlabs.com/#webpage",
                "url": "https://bkxlabs.com/",
                "name": "BKX Labs Software Rescue Agency | Laravel & React Project Recovery",
                "isPartOf": { "@id": "https://bkxlabs.com/#organization" }
            }
        ]
    };

    return (
        <div>
            <SEO
                title="Software Development Agency | Laravel & React Engineering"
                description="BKX Labs is a specialist software development agency for Laravel and React projects."
                keywords="software development agency, laravel development company, react development agency, codebase audit, technical debt remediation"
                structuredData={structuredData}
            />

            <Hero
                title="Software Development Agency Laravel & React Engineering"
                subtitle="Don't let bad code kill your business. BKX Labs rescues stalled Laravel and React applications, eliminates technical debt, and delivers what other agencies couldn't. Fixed-price audits."
                ctaText="Book a Discovery Call"
                ctaLink="/contact"
            />

            <Section className="problem-section">
                <Container>
                    <h2 className="text-center section-heading">Sound Familiar?</h2>
                    <p className="text-center section-subheading">
                        You're not alone. Most businesses that come to us have experienced at least one of these situations.
                    </p>
                    <div className="grid grid-3">
                        <Card>
                            <div className="card-icon-wrapper"><AlertTriangle size={40} strokeWidth={1.5} /></div>
                            <h3>Agency Left You Stranded</h3>
                            <p className="card-text">Your original developer or agency disappeared, delivered incomplete work, or left behind a codebase so fragile that adding a single feature breaks everything else.</p>
                        </Card>
                        <Card>
                            <div className="card-icon-wrapper"><Clock size={40} strokeWidth={1.5} /></div>
                            <h3>Months Behind Schedule</h3>
                            <p className="card-text">A launch that was "three weeks away" six months ago. Deadlines keep slipping because the underlying architecture was never built to scale.</p>
                        </Card>
                        <Card>
                            <div className="card-icon-wrapper"><Layers size={40} strokeWidth={1.5} /></div>
                            <h3>Crushing Technical Debt</h3>
                            <p className="card-text">Years of shortcuts and band-aid fixes have made your codebase a liability. Your team is spending more time firefighting than building.</p>
                        </Card>
                    </div>
                </Container>
            </Section>

            <section className="hm-fail-section">
                <Container>
                    <div className="hm-fail-label hm-reveal">
                        <span className="hm-eyebrow">Root Cause Analysis</span>
                        <h2 className="hm-section-title">Why Enterprise Software Projects Fail</h2>
                        <p className="hm-section-sub">From rescuing a 20%-complete EdTech platform with exposed AWS credentials to rebuilding a stalled enterprise DMS with 10-second query times, we have identified three systemic failure modes.</p>
                    </div>
                    <div className="hm-fail-grid">
                        <div className="hm-fail-item hm-reveal" style={{ transitionDelay: '0ms' }}>
                            <div className="hm-fail-num">01</div>
                            <div className="hm-fail-icon"><ServerCrash size={26} strokeWidth={1.5} /></div>
                            <h3 className="hm-fail-title">Misaligned Team Composition</h3>
                            <p className="hm-fail-body">The most common failure pattern is deploying a generalist team on a specialist problem. A Laravel security vulnerability requires a completely different diagnostic lens than a "senior PHP developer" brings.</p>
                            <ul className="hm-fail-symptoms">
                                <li>Repeated patches that don't resolve root authentication flaws</li>
                                <li>Performance "fixes" that shift bottlenecks rather than eliminate them</li>
                                <li>Architectural decisions made reactively from no system-wide view</li>
                            </ul>
                        </div>
                        <div className="hm-fail-item hm-reveal" style={{ transitionDelay: '120ms' }}>
                            <div className="hm-fail-num">02</div>
                            <div className="hm-fail-icon"><GitBranch size={26} strokeWidth={1.5} /></div>
                            <h3 className="hm-fail-title">Absent Architecture Governance</h3>
                            <p className="hm-fail-body">Software systems without defined architectural constraints degrade deterministically. Each developer adds their own patterns, bypasses conventions, and introduces coupling that future developers must work around.</p>
                            <ul className="hm-fail-symptoms">
                                <li>No enforced coding standards: PHPStan, ESLint absent or ignored</li>
                                <li>Business logic scattered across controllers, models, frontend</li>
                                <li>Zero automated test coverage, making safe refactoring impossible</li>
                            </ul>
                        </div>
                        <div className="hm-fail-item hm-reveal" style={{ transitionDelay: '240ms' }}>
                            <div className="hm-fail-num">03</div>
                            <div className="hm-fail-icon"><Code2 size={26} strokeWidth={1.5} /></div>
                            <h3 className="hm-fail-title">Uncontrolled Scope Accumulation</h3>
                            <p className="hm-fail-body">Feature requests added without architectural review create technical debt at a compounding rate. Each shortcut taken under delivery pressure costs three to five times more to remediate later.</p>
                            <ul className="hm-fail-symptoms">
                                <li>Sprint velocity declining month-over-month despite consistent headcount</li>
                                <li>Bug count increasing relative to features shipped</li>
                                <li>Engineers describing large portions of the codebase as "untouchable"</li>
                            </ul>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="hm-protocol-section">
                <Container>
                    <div className="hm-protocol-grid">
                        <div className="hm-protocol-sticky">
                            <span className="hm-eyebrow">Methodology</span>
                            <h2 className="hm-protocol-heading">The Rescue Protocol</h2>
                            <p className="hm-protocol-desc">We don't believe in "rewriting from scratch." We employ a systematic, low-risk approach to stabilizing and evolving mission-critical software, with full auditability at every phase gate.</p>
                            <a href="/process" className="hm-protocol-link">Explore our Process <ArrowRight size={16} /></a>
                        </div>
                        <div className="hm-protocol-steps">
                            <div className="hm-step hm-reveal">
                                <div className="hm-step-num">01</div>
                                <div className="hm-step-body">
                                    <h3>Forensic Diagnostic Audit</h3>
                                    <p>A fixed-price paid engagement starting at $1,500. Our engineers conduct a forensic deep-dive into your codebase using PHPStan Level 9, ESLint strict, OWASP ZAP, and live query profiling. The output is a written Technical Health Report — every issue ranked by severity with remediation cost estimates. You own this report regardless of whether you continue with BKX Labs.</p>
                                </div>
                            </div>
                            <div className="hm-step hm-reveal" style={{ transitionDelay: '80ms' }}>
                                <div className="hm-step-num">02</div>
                                <div className="hm-step-body">
                                    <h3>Triage</h3>
                                    <p>Immediate, high-precision intervention on critical failure points. All triage work is performed on a staging branch — never directly in production. Critical security vulnerabilities are sealed within the first 72 hours. Every change requires your explicit approval before touching the live environment.</p>
                                </div>
                            </div>
                            <div className="hm-step hm-reveal" style={{ transitionDelay: '160ms' }}>
                                <div className="hm-step-num">03</div>
                                <div className="hm-step-body">
                                    <h3>Modernization</h3>
                                    <p>Iterative architectural evolution delivered via 2-week sprints with fixed, transparent deliverable scope. We migrate legacy patterns to Laravel 12 service-layer architecture, React 19 with TypeScript strict mode, and PestPHP 3 test suites. Done means your internal team can take full ownership without our continued involvement.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="hm-trust-section">
                <Container>
                    <div className="hm-trust-header hm-reveal">
                        <span className="hm-eyebrow">Why BKX Labs</span>
                        <h2 className="hm-section-title">What sets us apart</h2>
                    </div>
                    <div className="hm-trust-list">
                        <div className="hm-trust-item hm-reveal">
                            <div className="hm-trust-left">
                                <span className="hm-trust-num">01</span>
                                <div className="hm-trust-icon"><Search size={22} strokeWidth={1.5} /></div>
                            </div>
                            <div className="hm-trust-right">
                                <h3>We Diagnose Before We Code</h3>
                                <p>Most developers start writing code immediately. We spend the first phase understanding the full depth of the problem so the solution is correct, not just fast.</p>
                            </div>
                        </div>
                        <div className="hm-trust-divider" />
                        <div className="hm-trust-item hm-reveal" style={{ transitionDelay: '80ms' }}>
                            <div className="hm-trust-left">
                                <span className="hm-trust-num">02</span>
                                <div className="hm-trust-icon"><UserCheck size={22} strokeWidth={1.5} /></div>
                            </div>
                            <div className="hm-trust-right">
                                <h3>Dedicated Lead and PM</h3>
                                <p>You get a dedicated Project Manager and a Lead Engineer as your two points of contact. Executive-level communication, zero "I'll check with the team" runarounds.</p>
                            </div>
                        </div>
                        <div className="hm-trust-divider" />
                        <div className="hm-trust-item hm-reveal" style={{ transitionDelay: '160ms' }}>
                            <div className="hm-trust-left">
                                <span className="hm-trust-num">03</span>
                                <div className="hm-trust-icon"><FileText size={22} strokeWidth={1.5} /></div>
                            </div>
                            <div className="hm-trust-right">
                                <h3>You Own Everything</h3>
                                <p>Full source code, complete SRS documentation, architecture diagrams, and deployment guides. No vendor lock-in; you can take our work to any team in the future.</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="hm-particle-section">
                <Container>
                    <div className="hm-particle-header hm-reveal">
                        <span className="hm-eyebrow hm-eyebrow--light">Engineered with Precision</span>
                        <h2 className="hm-particle-title">Every dot has a destination.</h2>
                        <p className="hm-particle-sub">Hover the canvas to see our systems come together.</p>
                    </div>
                    <div className="hm-canvas-wrap" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <canvas ref={canvasRef} className="hm-canvas" />
                        <div className="hm-canvas-hint">hover to assemble</div>
                    </div>
                    <div className="hm-particle-cta hm-reveal">
                        <a href="/contact" className="hm-particle-btn">
                            Start the Rescue Protocol <ArrowRight size={18} />
                        </a>
                    </div>
                </Container>
            </section>

            <section className="hm-commit-section">
                <Container>
                    <div className="hm-commit-header hm-reveal">
                        <span className="hm-eyebrow">Our Rescue Commitments</span>
                        <h2 className="hm-section-title">We back every engagement.</h2>
                    </div>
                    <div className="hm-commit-list">
                        <details className="hm-commit-item hm-reveal">
                            <summary className="hm-commit-summary">
                                <div className="hm-commit-icon"><CheckCircle size={20} strokeWidth={1.5} /></div>
                                <span>Written Diagnostic Report</span>
                                <div className="hm-commit-arrow"><TrendingUp size={16} /></div>
                            </summary>
                            <div className="hm-commit-body">Before we start any work, you receive a complete written health report detailing every critical, high, and medium severity issue with individual remediation cost and time estimates. This document is yours regardless of whether you proceed with us.</div>
                        </details>
                        <div className="hm-commit-divider" />
                        <details className="hm-commit-item hm-reveal" style={{ transitionDelay: '80ms' }}>
                            <summary className="hm-commit-summary">
                                <div className="hm-commit-icon"><CheckCircle size={20} strokeWidth={1.5} /></div>
                                <span>Zero-Pause Stabilization</span>
                                <div className="hm-commit-arrow"><TrendingUp size={16} /></div>
                            </summary>
                            <div className="hm-commit-body">Triage and stabilization are performed without taking your existing system offline. All changes are validated in a staging environment and require your explicit approval before being promoted to production.</div>
                        </details>
                        <div className="hm-commit-divider" />
                        <details className="hm-commit-item hm-reveal" style={{ transitionDelay: '160ms' }}>
                            <summary className="hm-commit-summary">
                                <div className="hm-commit-icon"><CheckCircle size={20} strokeWidth={1.5} /></div>
                                <span>30-Day Code Defect Warranty</span>
                                <div className="hm-commit-arrow"><TrendingUp size={16} /></div>
                            </summary>
                            <div className="hm-commit-body">We provide a 30-day Code Defect Warranty following handover. Any defect in our delivered code is remediated at zero additional cost, ensuring strict accountability without acting as an open-ended IT helpdesk.</div>
                        </details>
                    </div>
                </Container>
            </section>

            <section className="hm-cta-section">
                <Container>
                    <div className="hm-cta-block hm-reveal">
                        <h2 className="hm-cta-title">Your software is fixable. Let's prove it.</h2>
                        <p className="hm-cta-body">Every rescue starts with a free discovery call. We assess your situation, determine if we can help, and scope a paid Diagnostic Audit that gives you a complete, written engineering blueprint you own outright.</p>
                        <Button variant="primary" href="/contact">Book a Discovery Call</Button>
                    </div>
                </Container>
            </section>
        </div>
    );
};

export default Home;
