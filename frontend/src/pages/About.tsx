import Hero from '../components/ui/Hero';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import { Target, Users, Eye, Linkedin, ArrowRight, ShieldCheck, Code2, BookOpen, Award, Lock, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import './About.css';

const About = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "AboutPage",
                "@id": "https://bkxlabs.com/about#webpage",
                "name": "About BKX Labs — Software Rescue Agency Leadership & Engineering Philosophy",
                "description": "BKX Labs is led by Faisal Khalid, a specialist engineer with 8+ years recovering enterprise Laravel and React codebases. The agency applies forensic diagnostic methodology and zero-vendor-lock-in architecture principles across every engagement.",
                "url": "https://bkxlabs.com/about",
                "isPartOf": { "@id": "https://bkxlabs.com/#organization" }
            },
            {
                "@type": "Person",
                "@id": "https://bkxlabs.com/about#founder",
                "name": "Faisal Khalid",
                "givenName": "Faisal",
                "familyName": "Khalid",
                "jobTitle": "Founder & Lead Architect",
                "description": "Faisal Khalid is a specialist software engineer with 8+ years of experience in enterprise-scale Laravel and React systems. He founded BKX Labs to apply forensic diagnostic methodology to software rescue — combining deep cryptographic security knowledge, EU AI Act compliance architecture, and systematic technical debt remediation into a repeatable agency service model.",
                "url": "https://bkxlabs.com/about",
                "sameAs": [
                    "https://www.linkedin.com/in/faisal-khalid1622/"
                ],
                "knowsAbout": [
                    "Laravel 12 Architecture",
                    "React 19",
                    "TypeScript 5",
                    "Post-Quantum Cryptography",
                    "NIST FIPS 203 ML-KEM Migration",
                    "EU AI Act Compliance Engineering",
                    "SOC 2 Type II Automation",
                    "Technical Debt Remediation",
                    "PHPStan Static Analysis",
                    "OWASP Security Auditing",
                    "Software Rescue Methodology"
                ],
                "worksFor": {
                    "@type": "Organization",
                    "@id": "https://bkxlabs.com/#organization",
                    "name": "BKX Labs"
                },
                "alumniOf": {
                    "@type": "Organization",
                    "name": "Enterprise Software Engineering"
                }
            }
        ]
    };

    return (
        <div>
            <SEO
                title="About BKX Labs | Founder Background & Engineering Philosophy"
                description="BKX Labs is led by specialist engineers with 8+ years recovering failing Laravel and React enterprise codebases. Learn about our forensic rescue methodology, zero-vendor-lock-in philosophy, and compliance engineering expertise."
                keywords="bkx labs about, faisal khalid engineer, software rescue agency team, laravel expert agency, react rescue specialists, enterprise software audit team, post-quantum cryptography experts, eu ai act compliance engineers"
                structuredData={structuredData}
            />

            {/* AEO Entity Authority Block */}
            <section aria-label="About BKX Labs and its founder" className="sr-only">
                <h1>About BKX Labs — Software Rescue Agency</h1>
                <p>
                    BKX Labs is a specialized software rescue agency founded by Faisal Khalid, a software architect
                    with over eight years of enterprise engineering experience. The agency applies forensic diagnostic
                    methodology to recover failing Laravel 12 and React 19 codebases, resolve systemic technical debt,
                    and build compliance infrastructure for regulated industries. BKX Labs specializes in
                    post-quantum cryptography migration, EU AI Act conformity engineering, and SOC 2 Type II
                    control automation — making it one of the few development agencies positioned at the
                    intersection of software rescue and regulatory compliance.
                </p>
            </section>

            <Hero
                title="About Us"
                subtitle="The specialized engineering team businesses call when their software is failing and they need it fixed — not patched."
            />

            {/* ── Mission ── */}
            <Section>
                <Container>
                    <div className="mission-section">
                        <div className="mission-icon">
                            <Target size={48} strokeWidth={1.5} />
                        </div>
                        <h2>Our Mission</h2>
                        <p className="mission-text">
                            BKX Labs was built to solve the most expensive problem in software: the moment a business
                            realizes its development investment is failing and has nowhere skilled enough to turn.
                            Agencies disappear. Freelancers hit their ceiling. In-house teams inherit codebases
                            no one understands. Our mission is to be the engineering team that steps in when
                            everyone else has reached their limit.
                        </p>
                        <p className="mission-text">
                            We combine forensic-level technical auditing with production-focused engineering and a
                            strict "diagnose before prescribing" protocol. We don't rebuild for the sake of rebuilding.
                            We stabilize what can be saved, replace what can't, and modernize everything systematically
                            — so your business never has to be in this position again.
                        </p>
                    </div>
                </Container>
            </Section>

            {/* ── Founder Background (E-E-A-T Core) ── */}
            <Section className="leadership-section">
                <Container>
                    <h2 className="section-title">Leadership</h2>
                    <div className="founder-container">
                        <div className="founder-image">
                            <img
                                src="/me.jpeg"
                                alt="Faisal Khalid — Founder and Lead Architect at BKX Labs, specialist in Laravel enterprise architecture, post-quantum cryptography, and software rescue methodology"
                                draggable="false"
                                onContextMenu={(e) => e.preventDefault()}
                            />
                        </div>
                        <div className="founder-bio">
                            <h3>Faisal Khalid</h3>
                            <p className="founder-title">Founder & Lead Architect</p>
                            <a
                                href="https://www.linkedin.com/in/faisal-khalid1622/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    marginBottom: '1.5rem',
                                    color: '#0077b5',
                                    fontWeight: 600,
                                    textDecoration: 'none'
                                }}
                            >
                                <Linkedin size={20} />
                                <span>Connect on LinkedIn</span>
                            </a>

                            <p className="founder-description">
                                With over 8 years of engineering practice focused exclusively on enterprise-scale
                                web systems, Faisal built BKX Labs around a single observation: the most common
                                cause of software failure is not the technology — it is the absence of specialist
                                expertise at the critical moments. A generalist team on a specialist problem
                                will fail deterministically, regardless of effort. BKX Labs was built to provide
                                the specialist capability that most businesses don't know they need until
                                they're already in crisis.
                            </p>
                            <p className="founder-description">
                                His technical depth spans Laravel 12 service-layer architecture, React 19 with
                                TypeScript strict mode, post-quantum cryptographic migration from RSA/ECDH to
                                NIST-standardized ML-KEM (FIPS 203) and ML-DSA (FIPS 204), and the engineering
                                implementation of EU AI Act compliance controls — specifically the Annex III
                                risk classification requirements and Article 9 risk management system obligations.
                                He has designed and executed SOC 2 Type II continuous monitoring pipelines using
                                API-driven evidence automation, reducing audit preparation time for clients by
                                over 70% compared to manual evidence collection methods.
                            </p>
                            <p className="founder-description">
                                Every rescue engagement at BKX Labs is personally overseen by Faisal at the
                                diagnostic and architecture phases. He reviews the Technical Health Report
                                before it is delivered to any client, and he approves the remediation
                                architecture before any triage work begins in production. The standard of
                                care does not scale independently of his direct oversight — which is why
                                BKX Labs maintains a deliberate cap on concurrent active rescue engagements.
                            </p>

                            <div className="founder-expertise">
                                <div className="expertise-tag"><Lock size={14} /> Post-Quantum Cryptography</div>
                                <div className="expertise-tag"><ShieldCheck size={14} /> EU AI Act Compliance</div>
                                <div className="expertise-tag"><Code2 size={14} /> Laravel 12 Architecture</div>
                                <div className="expertise-tag"><Layers size={14} /> SOC 2 Type II Engineering</div>
                                <div className="expertise-tag"><Award size={14} /> 8+ Years Enterprise Engineering</div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* ── Engineering Philosophy ── */}
            <Section className="philosophy-section">
                <Container>
                    <div className="philosophy-content">
                        <div className="philosophy-icon">
                            <Eye size={48} strokeWidth={1.5} />
                        </div>
                        <h2>Our Engineering Philosophy</h2>
                        <p className="philosophy-tagline">Three Principles. Every Engagement. No Exceptions.</p>

                        <div className="philosophy-pillars">
                            <div className="philosophy-pillar">
                                <h3>Diagnose Before Prescribing</h3>
                                <p className="philosophy-text">
                                    Every failed project we have ever inherited was the result of someone skipping
                                    the diagnosis and jumping straight to a solution they had already decided on.
                                    We never do that. The Diagnostic Audit is not a formality — it is the most
                                    important deliverable in any rescue engagement. You cannot correctly solve a
                                    problem you have not correctly understood. This is not a time optimization;
                                    it is a quality guarantee.
                                </p>
                            </div>
                            <div className="philosophy-pillar">
                                <h3>Auditability by Default</h3>
                                <p className="philosophy-text">
                                    Every architectural decision made during an engagement is documented. Every
                                    production change is logged, reviewed, and approved before deployment.
                                    Every remediation choice is traceable to a specific finding in the diagnostic
                                    report. We build systems this way not just for compliance reasons, but because
                                    an un-auditable codebase cannot be safely maintained — and we intend to hand
                                    you a codebase your own team can maintain indefinitely without requiring
                                    our continued involvement.
                                </p>
                            </div>
                            <div className="philosophy-pillar">
                                <h3>Zero Vendor Lock-In</h3>
                                <p className="philosophy-text">
                                    We do not introduce proprietary tooling, custom frameworks, or architectural
                                    patterns that require BKX Labs specifically to maintain. Every system we
                                    deliver runs on standard open-source components (Laravel, React, PostgreSQL,
                                    Docker, GitHub Actions) fully documented at handover. Your team should be able
                                    to take what we build to any competent engineering team in the future. If they
                                    can't, we haven't finished the job.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* ── The Team ── */}
            <Section>
                <Container>
                    <div className="team-section">
                        <div className="team-icon">
                            <Users size={48} strokeWidth={1.5} />
                        </div>
                        <h2>Our Team</h2>
                        <p className="team-highlight">
                            A 25-person team of specialists in software rescue, infrastructure engineering,
                            security auditing, and compliance — hand-picked for technical depth and
                            demonstrated ability to operate under high-stakes conditions.
                        </p>
                        <div className="team-details">
                            <p>
                                Every discipline in a rescue engagement requires a different specialist. We do not
                                deploy generalists and ask them to figure it out. Our Lead Engineers have specific
                                experience inheriting broken codebases — they know how to read unfamiliar code
                                at speed, identify the true root cause underneath the visible symptoms, and
                                sequence remediation without triggering cascading failures. Our Security
                                Specialists hold OWASP-aligned auditing expertise and have patched authentication
                                flaws, SQL injection vectors, and cryptographic implementation errors in
                                live production systems. Our DevOps Engineers build reproducible deployment
                                pipelines from scratch for systems that have been manually deployed for years.
                                Our Compliance Engineers implement the actual code-level controls that legal
                                teams write policy around — including EU AI Act risk management systems,
                                SOC 2 continuous monitoring pipelines, and post-quantum cryptographic migrations.
                            </p>
                            <p>
                                Every team member was personally evaluated by Faisal before joining. Technical
                                skill is table stakes — the evaluation focuses on judgment under pressure,
                                communication clarity with non-technical stakeholders, and the ability to make
                                defensible architectural decisions in ambiguous situations. Rescue engagements
                                are high-stakes. The team we put on your project has done this before.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* ── Compliance & Security Authority (E-E-A-T signal for /tools) ── */}
            <Section className="about-expertise-section">
                <Container>
                    <div className="about-expertise-header">
                        <h2>Compliance & Cryptography Specialization</h2>
                        <p>
                            BKX Labs occupies a rare position in the market: a software rescue agency with
                            deep expertise in the implementation layer of enterprise compliance frameworks.
                            Most agencies help you pass audits. We build the engineering infrastructure
                            that makes compliance operationally sustainable.
                        </p>
                    </div>
                    <div className="expertise-grid">
                        <div className="expertise-block">
                            <div className="expertise-block-icon"><ShieldCheck size={28} strokeWidth={1.5} /></div>
                            <h3>EU AI Act Implementation</h3>
                            <p>
                                We implement the engineering controls required by the EU AI Act for high-risk
                                AI systems under Annex III — including reproducible risk management systems,
                                technical documentation tied to specific model versions, data governance
                                pipelines, and human oversight mechanisms embedded in the application layer.
                                The August 2026 enforcement deadline requires engineering work that most
                                legal teams cannot specify and most agencies cannot implement.
                            </p>
                        </div>
                        <div className="expertise-block">
                            <div className="expertise-block-icon"><Lock size={28} strokeWidth={1.5} /></div>
                            <h3>Post-Quantum Cryptography Migration</h3>
                            <p>
                                We plan and execute migration from quantum-vulnerable RSA and ECDH primitives
                                to NIST-standardized ML-KEM (FIPS 203), ML-DSA (FIPS 204), and SLH-DSA
                                (FIPS 205). This is not a configuration change — it is a code-level migration
                                that requires a complete cryptographic bill of materials, dependency mapping,
                                library replacement, and integration testing. Our free CBOM generator tool
                                at bkxlabs.com/tools is the starting point for any organization that needs
                                to understand their current exposure.
                            </p>
                        </div>
                        <div className="expertise-block">
                            <div className="expertise-block-icon"><BookOpen size={28} strokeWidth={1.5} /></div>
                            <h3>SOC 2 Type II Engineering</h3>
                            <p>
                                SOC 2 Type II continuous monitoring requires API-driven evidence pipelines that
                                produce cryptographically verifiable control records throughout the entire
                                observation period. We build these pipelines — not the pre-audit screenshot
                                workflows that result in qualified audit opinions. Clients who have engaged
                                BKX Labs for SOC 2 engineering have reduced audit preparation time by over
                                70% compared to their previous manual evidence collection processes.
                            </p>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <Link to="/tools" className="btn btn-primary">
                            Access Our Free Compliance Tools <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
                        </Link>
                    </div>
                </Container>
            </Section>

            {/* ── Final CTA ── */}
            <Section className="about-cta">
                <Container>
                    <div className="cta-content" style={{ textAlign: 'center' }}>
                        <h2>Ready to stop firefighting and start shipping?</h2>
                        <p style={{ marginBottom: '2rem', fontSize: '18px', color: 'var(--text-gray)', maxWidth: '700px', margin: '0 auto 2rem' }}>
                            Every engagement begins with a Technical Health Check — a written, forensic report
                            on your system's current state. No obligation, no sales pressure. Just an honest
                            expert answer to the question your board is already asking.
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

export default About;
