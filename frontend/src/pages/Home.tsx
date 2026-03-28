import Hero from '../components/ui/Hero';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SEO from '../components/ui/SEO';
import {
    AlertTriangle,
    Search,
    Wrench,
    TrendingUp,
    CheckCircle,
    FileText,
    UserCheck,
    Clock,
    Layers,
} from 'lucide-react';
import './Home.css';

const Home = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Home - BKX Labs",
        "description": "BKX Labs specializes in rescuing stalled and failing software projects. We take over broken codebases, stabilize infrastructure, and deliver to production.",
        "url": "https://bkxlabs.com/",
        "mainEntity": {
            "@type": "Organization",
            "name": "BKX Labs"
        }
    };

    return (
        <div>
            <SEO
                title="Software Rescue Specialists | Stalled Project Recovery"
                description="BKX Labs rescues stalled and failing software projects. Our specialized engineering team takes over broken codebases, stops the bleeding, and gets you to production. Request a Technical Health Check today."
                keywords="software rescue, stalled project recovery, failed codebase takeover, technical debt removal, project rescue team, Laravel, React, Node.js, Flutter, enterprise software"
                structuredData={structuredData}
            />
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

            {/* The 3-Phase Rescue Funnel */}
            <Section className="rescue-section">
                <Container>
                    <h2 className="text-center section-heading">The Rescue Protocol</h2>
                    <p className="text-center section-subheading">
                        We don't guess. We follow a battle-tested three-phase process that turns failing software
                        into production-ready systems.
                    </p>
                    <div className="rescue-phases">
                        <div className="rescue-phase">
                            <div className="phase-number">01</div>
                            <div className="phase-icon"><Search size={36} strokeWidth={1.5} /></div>
                            <h3>The Diagnostic Audit</h3>
                            <p>
                                A forensic deep-dive into your codebase, infrastructure, and architecture. We identify
                                exactly what is broken, why it's broken, and what it will take to fix it — before a
                                single line of code is changed. You receive a full written report.
                            </p>
                            <ul className="phase-items">
                                <li>Full codebase security & quality audit</li>
                                <li>Architecture bottleneck analysis</li>
                                <li>Infrastructure & deployment review</li>
                                <li>Written Health Report with findings</li>
                            </ul>
                        </div>

                        <div className="rescue-phase">
                            <div className="phase-number">02</div>
                            <div className="phase-icon"><Wrench size={36} strokeWidth={1.5} /></div>
                            <h3>Triage &amp; Stabilization</h3>
                            <p>
                                We stop the bleeding first. Critical server crashes get patched, security holes get
                                sealed, and proper CI/CD pipelines get established so your team regains confidence
                                that deployments won't bring the system down.
                            </p>
                            <ul className="phase-items">
                                <li>Emergency crash & security patching</li>
                                <li>CI/CD pipeline establishment</li>
                                <li>Database integrity & backup systems</li>
                                <li>Performance baseline restoration</li>
                            </ul>
                        </div>

                        <div className="rescue-phase">
                            <div className="phase-number">03</div>
                            <div className="phase-icon"><TrendingUp size={36} strokeWidth={1.5} /></div>
                            <h3>Modernization Retainer</h3>
                            <p>
                                A long-term, systematic refactoring plan using modern stacks — Laravel, Node.js, React,
                                Flutter — that removes technical debt without pausing business operations. Your product
                                evolves while staying live.
                            </p>
                            <ul className="phase-items">
                                <li>Systematic legacy code modernization</li>
                                <li>Performance & scalability upgrades</li>
                                <li>Zero-downtime migration strategy</li>
                                <li>New feature development on clean foundation</li>
                            </ul>
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
                            engagement with concrete, documented commitments.
                        </p>
                        <div className="guarantee-points">
                            <div className="g-point">
                                <CheckCircle size={24} />
                                <div>
                                    <h4>Written Diagnostic Report</h4>
                                    <p>Before we start any work, you receive a complete written health report. No surprises about what needs to be fixed or why.</p>
                                </div>
                            </div>
                            <div className="g-point">
                                <CheckCircle size={24} />
                                <div>
                                    <h4>Zero-Pause Stabilization</h4>
                                    <p>Triage and stabilization are performed without taking your existing system offline. Business continuity is non-negotiable.</p>
                                </div>
                            </div>
                            <div className="g-point">
                                <CheckCircle size={24} />
                                <div>
                                    <h4>60-Day Post-Handover Support</h4>
                                    <p>We stay engaged for 60 days post-delivery to monitor stability, handle edge cases, and ensure the transition is seamless.</p>
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
                        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '18px', marginBottom: '2rem', maxWidth: '550px', margin: '0 auto 2rem auto' }}>
                            Every rescue starts with a free Technical Health Check. You'll walk away with clarity on
                            the state of your system — no strings attached.
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
