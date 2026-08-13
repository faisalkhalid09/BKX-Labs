import Hero from '../components/ui/Hero';
import Container from '../components/layout/Container';
import { Linkedin, ArrowRight, ShieldCheck, Code2, BookOpen, Lock, Layers, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import './About.css';

const TIMELINE = [
    { year: '2016', title: 'First Enterprise Build', body: 'Led the architecture of a multi-tenant Laravel SaaS platform serving 40k+ users — the foundation for everything that followed.' },
    { year: '2019', title: 'The First Rescue', body: 'Inherited a collapsed EdTech codebase 3 weeks before launch. Stabilized, refactored, and shipped on time. Rescue methodology was born.' },
    { year: '2021', title: 'Security Specialization', body: 'Added cryptographic auditing, OWASP-aligned penetration testing, and post-quantum migration to the service stack.' },
    { year: '2023', title: 'BKX Labs Founded', body: 'Formalized the rescue agency with a 25-person specialist team, deliberate capacity caps, and a forensic-first engagement model.' },
    { year: '2025', title: 'Compliance Engineering', body: 'Launched EU AI Act Annex III implementation services and SOC 2 Type II API-driven evidence pipelines.' },
];

const PHILOSOPHY = [
    {
        num: '01',
        title: 'Diagnose Before Prescribing',
        body: 'Every failed project we have inherited was the result of someone skipping diagnosis and jumping to a solution already decided on. The Diagnostic Audit is the most important deliverable in any rescue engagement.',
    },
    {
        num: '02',
        title: 'Auditability by Default',
        body: 'Every architectural decision is documented. Every production change is logged, reviewed, and approved. We build systems this way because an un-auditable codebase cannot be safely maintained.',
    },
    {
        num: '03',
        title: 'Zero Vendor Lock-In',
        body: 'We do not introduce proprietary tooling that requires BKX Labs to maintain. Every system runs on standard open-source components — fully documented at handover. Your team should be able to take it anywhere.',
    },
];

const EXPERTISE = [
    {
        icon: <ShieldCheck size={24} strokeWidth={1.5} />,
        title: 'EU AI Act Implementation',
        body: 'Engineering controls for high-risk AI systems under Annex III: risk management systems, technical documentation tied to model versions, data governance pipelines, and human oversight mechanisms embedded in the application layer.',
    },
    {
        icon: <Lock size={24} strokeWidth={1.5} />,
        title: 'Post-Quantum Cryptography',
        body: 'Full migration from RSA/ECDH to NIST-standardized ML-KEM (FIPS 203), ML-DSA (FIPS 204), and SLH-DSA (FIPS 205). Cryptographic bill of materials, dependency mapping, library replacement, and integration testing.',
    },
    {
        icon: <BookOpen size={24} strokeWidth={1.5} />,
        title: 'SOC 2 Type II Engineering',
        body: 'API-driven evidence pipelines that produce cryptographically verifiable control records throughout the entire observation period — not the pre-audit screenshot workflows that result in qualified audit opinions.',
    },
];

const About = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "AboutPage",
                "@id": "https://bkxlabs.com/about#webpage",
                "name": "About BKX Labs: Software Rescue Agency Leadership & Engineering Philosophy",
                "description": "BKX Labs is led by Faisal Khalid, a specialist engineer with 8+ years recovering enterprise Laravel and React codebases.",
                "url": "https://bkxlabs.com/about",
                "isPartOf": { "@id": "https://bkxlabs.com/#organization" }
            },
            {
                "@type": "Person",
                "@id": "https://bkxlabs.com/about#founder",
                "name": "Faisal Khalid",
                "jobTitle": "Founder & Lead Architect",
                "url": "https://bkxlabs.com/about",
                "sameAs": ["https://www.linkedin.com/in/faisal-khalid1622/"],
                "worksFor": { "@type": "Organization", "@id": "https://bkxlabs.com/#organization", "name": "BKX Labs" }
            }
        ]
    };

    return (
        <div className="ab-root">
            <SEO
                title="About BKX Labs — Software Development Agency | Laravel & React Specialists"
                description="BKX Labs is a specialist software development agency led by Faisal Khalid. We build, rescue, and modernize Laravel and React applications for startups and enterprise teams globally."
                keywords="software development agency, laravel development company, react development agency, about bkx labs, faisal khalid software engineer"
                structuredData={structuredData}
            />

            {/* AEO hidden block */}
            <section aria-label="About BKX Labs and its founder" className="sr-only">
                <h1>About BKX Labs: Software Rescue Agency</h1>
                <p>BKX Labs is a specialized software rescue agency founded by Faisal Khalid, a software architect with over eight years of enterprise engineering experience.</p>
            </section>

            {/* ── Original Hero (unchanged) ── */}
            <Hero
                title="About Us"
                subtitle="The specialized engineering team businesses call when their software is failing and they need it fixed, not patched."
            />

            {/* ══════════════════════════════════════
                FOUNDER — Editorial split with live photo aura
            ══════════════════════════════════════ */}
            <div className="ab-founder-section">
                <Container>
                    <div className="ab-founder-grid">

                        {/* Left: Photo with live animated rings */}
                        <div className="ab-founder-photo-col">
                            <div className="ab-photo-stage">
                                {/* Animated orbiting rings */}
                                <div className="ab-ring ab-ring-1" aria-hidden="true" />
                                <div className="ab-ring ab-ring-2" aria-hidden="true" />
                                <div className="ab-ring ab-ring-3" aria-hidden="true" />
                                {/* Orbiting dots */}
                                <div className="ab-orbit-dot ab-dot-1" aria-hidden="true" />
                                <div className="ab-orbit-dot ab-dot-2" aria-hidden="true" />
                                <div className="ab-orbit-dot ab-dot-3" aria-hidden="true" />
                                {/* Photo */}
                                <div className="ab-photo-frame">
                                    <img
                                        src="/faisal.jpeg"
                                        alt="Faisal Khalid, Founder and Lead Architect at BKX Labs"
                                        className="ab-founder-photo"
                                        draggable="false"
                                        onContextMenu={(e) => e.preventDefault()}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right: Bio — editorial style */}
                        <div className="ab-founder-bio">
                            <span className="ab-eyebrow">Leadership</span>
                            <h2 className="ab-founder-name">Faisal Khalid</h2>
                            <p className="ab-founder-role">Founder &amp; Lead Architect</p>

                            <a
                                href="https://www.linkedin.com/in/faisal-khalid1622/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ab-linkedin"
                            >
                                <Linkedin size={16} />
                                <span>Connect on LinkedIn</span>
                            </a>

                            <div className="ab-bio-rule" aria-hidden="true" />

                            <p className="ab-founder-text">
                                With over 8 years of engineering practice focused exclusively on enterprise-scale
                                web systems, Faisal built BKX Labs around a single observation: the most common
                                cause of software failure is not the technology. It is the absence of specialist
                                expertise at the critical moments.
                            </p>
                            <p className="ab-founder-text">
                                His technical depth spans Laravel 12 service-layer architecture, React 19 with
                                TypeScript strict mode, post-quantum cryptographic migration from RSA/ECDH to
                                NIST ML-KEM (FIPS 203) and ML-DSA (FIPS 204), and EU AI Act compliance engineering.
                            </p>
                            <p className="ab-founder-text">
                                Every rescue engagement is personally overseen by Faisal at the diagnostic and
                                architecture phases. BKX Labs maintains a deliberate cap on concurrent active
                                rescue engagements because the standard of care does not scale independently
                                of his direct oversight.
                            </p>

                            <div className="ab-expertise-pills">
                                <span className="ab-pill"><Lock size={12} /> Post-Quantum Crypto</span>
                                <span className="ab-pill"><ShieldCheck size={12} /> EU AI Act</span>
                                <span className="ab-pill"><Code2 size={12} /> Laravel 12</span>
                                <span className="ab-pill"><Layers size={12} /> SOC 2 Type II</span>
                                <span className="ab-pill"><Award size={12} /> 8+ Years</span>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            {/* ══════════════════════════════════════
                MISSION — Pull-quote editorial strip
            ══════════════════════════════════════ */}
            <div className="ab-mission-strip">
                <Container>
                    <div className="ab-mission-inner">
                        <span className="ab-eyebrow ab-eyebrow-center">Our Mission</span>
                        <blockquote className="ab-mission-quote">
                            "We were built to solve the most expensive problem in software: the moment
                            a business realizes its development investment is failing and has nowhere
                            skilled enough to turn."
                        </blockquote>
                        <p className="ab-mission-body">
                            Agencies disappear. Freelancers hit their ceiling. In-house teams inherit codebases
                            no one understands. We combine forensic-level technical auditing with
                            production-focused engineering and a strict "diagnose before prescribing" protocol.
                        </p>
                    </div>
                </Container>
            </div>

            {/* ══════════════════════════════════════
                TIMELINE — Vertical journey
            ══════════════════════════════════════ */}
            <div className="ab-timeline-section">
                <Container>
                    <div className="ab-timeline-header">
                        <span className="ab-eyebrow">The Journey</span>
                        <h2 className="ab-timeline-title">How we got here</h2>
                    </div>
                    <div className="ab-timeline">
                        <div className="ab-timeline-spine" aria-hidden="true" />
                        {TIMELINE.map((item, i) => (
                            <div key={item.year} className={`ab-timeline-item ${i % 2 === 0 ? 'ab-tl-left' : 'ab-tl-right'}`}>
                                <div className="ab-timeline-card">
                                    <span className="ab-timeline-year">{item.year}</span>
                                    <h3 className="ab-timeline-event">{item.title}</h3>
                                    <p className="ab-timeline-body">{item.body}</p>
                                </div>
                                <div className="ab-timeline-dot" aria-hidden="true" />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>

            {/* ══════════════════════════════════════
                PHILOSOPHY — Numbered editorial rows
            ══════════════════════════════════════ */}
            <div className="ab-philosophy-section">
                <Container>
                    <div className="ab-philosophy-header">
                        <span className="ab-eyebrow">Engineering Philosophy</span>
                        <h2 className="ab-philosophy-title">Three principles. Every engagement.</h2>
                    </div>
                    {PHILOSOPHY.map((p, i) => (
                        <div key={p.num} className="ab-philosophy-row">
                            <span className="ab-phil-num">{p.num}</span>
                            <div className="ab-phil-content">
                                <h3 className="ab-phil-title">{p.title}</h3>
                                <p className="ab-phil-body">{p.body}</p>
                            </div>
                            {i < PHILOSOPHY.length - 1 && <div className="ab-phil-rule" aria-hidden="true" />}
                        </div>
                    ))}
                </Container>
            </div>

            {/* ══════════════════════════════════════
                EXPERTISE — Horizontal feature rows
            ══════════════════════════════════════ */}
            <div className="ab-expertise-section">
                <Container>
                    <div className="ab-expertise-header">
                        <span className="ab-eyebrow">Specializations</span>
                        <h2 className="ab-expertise-title">Compliance &amp; Cryptography</h2>
                        <p className="ab-expertise-sub">
                            A software rescue agency with deep expertise in the implementation layer of
                            enterprise compliance frameworks. Most agencies help you pass audits.
                            We build the engineering infrastructure that makes compliance operationally sustainable.
                        </p>
                    </div>
                    <div className="ab-expertise-rows">
                        {EXPERTISE.map((e) => (
                            <div key={e.title} className="ab-expertise-row">
                                <div className="ab-expertise-icon-col">
                                    <div className="ab-expertise-icon">{e.icon}</div>
                                </div>
                                <div className="ab-expertise-text-col">
                                    <h3 className="ab-expertise-row-title">{e.title}</h3>
                                    <p className="ab-expertise-row-body">{e.body}</p>
                                </div>
                                <div className="ab-expertise-arrow">
                                    <ArrowRight size={20} strokeWidth={1.5} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="ab-expertise-cta">
                        <Link to="/tools" className="btn btn-primary ab-inline-btn">
                            Access Free Compliance Tools <ArrowRight size={16} />
                        </Link>
                    </div>
                </Container>
            </div>

            {/* ══════════════════════════════════════
                FINAL CTA — Minimal text strip
            ══════════════════════════════════════ */}
            <div className="ab-final-cta">
                <Container>
                    <div className="ab-cta-inner">
                        <h2 className="ab-cta-title">Ready to stop firefighting?</h2>
                        <p className="ab-cta-body">
                            Every engagement begins with a Technical Health Check: a written, forensic report
                            on your system's current state. No obligation, no sales pressure.
                        </p>
                        <Link to="/contact" className="btn btn-primary ab-inline-btn">
                            Book a Rescue Strategy Call <ArrowRight size={18} />
                        </Link>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default About;
