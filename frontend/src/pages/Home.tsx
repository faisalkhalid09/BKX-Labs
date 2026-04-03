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
                title="Software Project Rescue Agency | Stalled App Recovery & Audit"
                description="BKX Labs is the engineering team you call when your software is failing. We rescue stalled Laravel apps, audit enterprise React codebases, and fix technical debt nightmares. 25-person specialist team."
                keywords="software project rescue agency, stalled laravel app recovery, technical debt refactoring, enterprise react codebase audit, rescue failing web applications, project takeover specialists"
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

            {/* Internal Linking Navigation Block — signals importance of key pages to Google */}
            <Section className="internal-nav-section">
                <Container>
                    <h2 className="text-center section-heading">Everything You Need to Know</h2>
                    <p className="text-center section-subheading">
                        Explore how we work, what we offer, and who we are — before you commit to a single conversation.
                    </p>
                    <div className="internal-nav-grid">
                        <a href="/services" className="internal-nav-card" aria-label="View our software rescue services">
                            <span className="internal-nav-icon">🛠</span>
                            <h3>Our Services</h3>
                            <p>Diagnostic audits, emergency triage, modernization retainers, and greenfield development — structured for your situation.</p>
                            <span className="internal-nav-link">View Services →</span>
                        </a>
                        <a href="/process" className="internal-nav-card" aria-label="Learn about our rescue process">
                            <span className="internal-nav-icon">🔬</span>
                            <h3>The Rescue Protocol</h3>
                            <p>Our 5-step, auditable process for taking over a failing project and bringing it to production with full transparency.</p>
                            <span className="internal-nav-link">Explore Process →</span>
                        </a>
                        <a href="/about" className="internal-nav-card" aria-label="About BKX Labs team and mission">
                            <span className="internal-nav-icon">👥</span>
                            <h3>About Us</h3>
                            <p>A 25-person team of specialists hand-picked for their ability to stabilize and rescue high-stakes software systems.</p>
                            <span className="internal-nav-link">Meet the Team →</span>
                        </a>
                        <a href="/contact" className="internal-nav-card" aria-label="Contact BKX Labs to start your rescue">
                            <span className="internal-nav-icon">📋</span>
                            <h3>Start Your Rescue</h3>
                            <p>Every engagement starts with a Technical Health Check. Tell us about your situation — no obligation, just clarity.</p>
                            <span className="internal-nav-link">Get In Touch →</span>
                        </a>
                    </div>
                </Container>
            </Section>

            {/* The 3-Phase Rescue Funnel (Overhauled UI) */}
            <Section className="protocol-section">
                <Container>
                    <div className="protocol-grid">
                        <div className="protocol-sticky">
                            <span className="accent-label">Methodology</span>
                            <h2>The Rescue Protocol</h2>
                            <p>
                                We don't believe in "rewriting from scratch." We employ a systematic, low-risk approach to stabilizing and evolving mission-critical software.
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
                                        A forensic deep-dive into your codebase, infrastructure, and architecture. We identify exactly what is broken, why it's broken, and what it will take to fix it — before a single line of code is changed.
                                    </p>
                                </div>
                            </div>
                            
                            {/* Step 2 */}
                            <div className="protocol-step">
                                <div className="step-number">02</div>
                                <div className="step-content">
                                    <h3>Triage</h3>
                                    <p>
                                        Immediate intervention on critical failure points. We implement stability patterns, automated testing, and CI/CD pipelines to stop the bleeding and restore confidence.
                                    </p>
                                </div>
                            </div>
                            
                            {/* Step 3 */}
                            <div className="protocol-step">
                                <div className="step-number">03</div>
                                <div className="step-content">
                                    <h3>Modernization</h3>
                                    <p>
                                        Iterative architectural evolution. We transition your system to modern, scalable patterns without downtime or feature freezes, ensuring a future-proof foundation.
                                    </p>
                                </div>
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
                            Every rescue starts with a Technical Health Check. You'll walk away with clarity on
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
