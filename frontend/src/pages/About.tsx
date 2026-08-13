import { useRef, useEffect, useState } from 'react';
import Container from '../components/layout/Container';
import { Target, Eye, Linkedin, ArrowRight, ShieldCheck, Code2, BookOpen, Award, Lock, Layers, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import './About.css';

/* ── Animated counter hook ── */
function useCounter(target: number, duration = 1800, start = false) {
    const [value, setValue] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime: number | null = null;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [start, target, duration]);
    return value;
}

const STATS = [
    { value: 8, suffix: '+', label: 'Years Engineering' },
    { value: 22, suffix: '+', label: 'Projects Rescued' },
    { value: 70, suffix: '%', label: 'Audit Time Saved' },
    { value: 25, suffix: '', label: 'Team Specialists' },
];

const TIMELINE = [
    { year: '2016', title: 'First Enterprise Build', body: 'Led the architecture of a multi-tenant Laravel SaaS platform serving 40k+ users — the foundation for everything that followed.' },
    { year: '2019', title: 'The First Rescue', body: 'Inherited a collapsed EdTech codebase 3 weeks before launch. Stabilized, refactored, and shipped on time. Rescue methodology was born.' },
    { year: '2021', title: 'Security Specialization', body: 'Added cryptographic auditing, OWASP-aligned penetration testing, and post-quantum migration to the service stack.' },
    { year: '2023', title: 'BKX Labs Founded', body: 'Formalized the rescue agency with a 25-person specialist team, deliberate capacity caps, and a forensic-first engagement model.' },
    { year: '2025', title: 'Compliance Engineering', body: 'Launched EU AI Act Annex III implementation services and SOC 2 Type II API-driven evidence pipelines — the frontier of engineering compliance.' },
];

const PHILOSOPHY = [
    {
        icon: <Target size={28} strokeWidth={1.5} />,
        title: 'Diagnose Before Prescribing',
        body: 'Every failed project we have inherited was the result of someone skipping diagnosis and jumping to a solution already decided on. The Diagnostic Audit is not a formality — it is the most important deliverable in any rescue engagement.',
    },
    {
        icon: <Eye size={28} strokeWidth={1.5} />,
        title: 'Auditability by Default',
        body: 'Every architectural decision is documented. Every production change is logged, reviewed, and approved. We build systems this way not just for compliance — but because an un-auditable codebase cannot be safely maintained.',
    },
    {
        icon: <Lock size={28} strokeWidth={1.5} />,
        title: 'Zero Vendor Lock-In',
        body: 'We do not introduce proprietary tooling that requires BKX Labs to maintain. Every system runs on standard open-source components — fully documented at handover. Your team should be able to take it anywhere.',
    },
];

const EXPERTISE = [
    {
        icon: <ShieldCheck size={32} strokeWidth={1.5} />,
        title: 'EU AI Act Implementation',
        body: 'Engineering controls for high-risk AI systems under Annex III: risk management systems, technical documentation tied to model versions, data governance pipelines, and human oversight mechanisms embedded in the application layer.',
    },
    {
        icon: <Lock size={32} strokeWidth={1.5} />,
        title: 'Post-Quantum Cryptography',
        body: 'Full migration from RSA/ECDH to NIST-standardized ML-KEM (FIPS 203), ML-DSA (FIPS 204), and SLH-DSA (FIPS 205). Cryptographic bill of materials, dependency mapping, library replacement, and integration testing.',
    },
    {
        icon: <BookOpen size={32} strokeWidth={1.5} />,
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

    /* ── Stats counter intersection observer ── */
    const statsRef = useRef<HTMLDivElement>(null);
    const [statsVisible, setStatsVisible] = useState(false);
    useEffect(() => {
        const el = statsRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    /* ── Cursor glow on hero ── */
    const heroRef = useRef<HTMLDivElement>(null);
    const handleHeroMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = heroRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        el.style.setProperty('--my', `${e.clientY - rect.top}px`);
    };

    /* Individual counters */
    const c0 = useCounter(STATS[0].value, 1600, statsVisible);
    const c1 = useCounter(STATS[1].value, 1800, statsVisible);
    const c2 = useCounter(STATS[2].value, 2000, statsVisible);
    const c3 = useCounter(STATS[3].value, 1400, statsVisible);
    const counts = [c0, c1, c2, c3];

    return (
        <div className="ab-root">
            <SEO
                title="About BKX Labs — Software Development Agency | Laravel & React Specialists"
                description="BKX Labs is a specialist software development agency led by Faisal Khalid. We build, rescue, and modernize Laravel and React applications for startups and enterprise teams globally."
                keywords="software development agency, laravel development company, react development agency, about bkx labs, faisal khalid software engineer"
                structuredData={structuredData}
            />

            {/* ── AEO hidden block ── */}
            <section aria-label="About BKX Labs and its founder" className="sr-only">
                <h1>About BKX Labs: Software Rescue Agency</h1>
                <p>BKX Labs is a specialized software rescue agency founded by Faisal Khalid, a software architect with over eight years of enterprise engineering experience.</p>
            </section>

            {/* ══════════════════════════════════════
                HERO — Cursor-glow + grid backdrop
            ══════════════════════════════════════ */}
            <div className="ab-hero" ref={heroRef} onMouseMove={handleHeroMouse}>
                <div className="ab-hero-glow" />
                <div className="ab-hero-grid" aria-hidden="true" />
                <Container>
                    <div className="ab-hero-inner">
                        <span className="ab-hero-label">The Agency</span>
                        <h1 className="ab-hero-title">
                            We fix software<br />
                            <span className="ab-hero-accent">when it's failing.</span>
                        </h1>
                        <p className="ab-hero-sub">
                            The specialized engineering team businesses call when their software is in crisis
                            and they need it fixed — not patched, not excused, and not handed back half-built.
                        </p>
                        <div className="ab-hero-actions">
                            <Link to="/contact" className="btn btn-primary ab-btn-hero">
                                Book a Strategy Call <ArrowRight size={16} />
                            </Link>
                            <Link to="/case-study" className="ab-hero-link">
                                See our work
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>

            {/* ══════════════════════════════════════
                STATS — Animated counters
            ══════════════════════════════════════ */}
            <div className="ab-stats-bar" ref={statsRef}>
                <Container>
                    <div className="ab-stats-grid">
                        {STATS.map((s, i) => (
                            <div key={s.label} className="ab-stat">
                                <span className="ab-stat-value">
                                    {counts[i]}{s.suffix}
                                </span>
                                <span className="ab-stat-label">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>

            {/* ══════════════════════════════════════
                FOUNDER — Full-width split layout
            ══════════════════════════════════════ */}
            <div className="ab-founder-section">
                <Container>
                    <div className="ab-founder-grid">
                        {/* Photo column */}
                        <div className="ab-founder-photo-col">
                            <div className="ab-founder-photo-wrap">
                                <img
                                    src="/faisal.jpeg"
                                    alt="Faisal Khalid, Founder and Lead Architect at BKX Labs"
                                    className="ab-founder-photo"
                                    draggable="false"
                                    onContextMenu={(e) => e.preventDefault()}
                                />
                                <div className="ab-founder-photo-ring" aria-hidden="true" />
                                {/* Floating badge */}
                                <div className="ab-founder-badge">
                                    <Award size={16} />
                                    <span>8+ Years Enterprise</span>
                                </div>
                            </div>
                        </div>

                        {/* Bio column */}
                        <div className="ab-founder-bio">
                            <span className="ab-section-label">Leadership</span>
                            <h2 className="ab-founder-name">Faisal Khalid</h2>
                            <p className="ab-founder-role">Founder &amp; Lead Architect</p>

                            <a
                                href="https://www.linkedin.com/in/faisal-khalid1622/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ab-linkedin"
                            >
                                <Linkedin size={18} />
                                <span>Connect on LinkedIn</span>
                            </a>

                            <p className="ab-founder-text">
                                With over 8 years of engineering practice focused exclusively on enterprise-scale
                                web systems, Faisal built BKX Labs around a single observation: the most common
                                cause of software failure is not the technology — it is the absence of specialist
                                expertise at the critical moments. A generalist team on a specialist problem
                                will fail deterministically, regardless of effort.
                            </p>
                            <p className="ab-founder-text">
                                His technical depth spans Laravel 12 service-layer architecture, React 19 with
                                TypeScript strict mode, post-quantum cryptographic migration from RSA/ECDH to
                                NIST ML-KEM (FIPS 203) and ML-DSA (FIPS 204), and the engineering
                                implementation of EU AI Act compliance controls.
                            </p>
                            <p className="ab-founder-text">
                                Every rescue engagement is personally overseen by Faisal at the diagnostic and
                                architecture phases. The standard of care does not scale independently of his
                                direct oversight — which is why BKX Labs maintains a deliberate cap on
                                concurrent active rescue engagements.
                            </p>

                            <div className="ab-founder-tags">
                                <span className="ab-tag"><Lock size={13} /> Post-Quantum Crypto</span>
                                <span className="ab-tag"><ShieldCheck size={13} /> EU AI Act</span>
                                <span className="ab-tag"><Code2 size={13} /> Laravel 12</span>
                                <span className="ab-tag"><Layers size={13} /> SOC 2 Type II</span>
                                <span className="ab-tag"><Award size={13} /> 8+ Years</span>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            {/* ══════════════════════════════════════
                TIMELINE — Vertical journey
            ══════════════════════════════════════ */}
            <div className="ab-timeline-section">
                <Container>
                    <div className="ab-timeline-header">
                        <span className="ab-section-label">The Journey</span>
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
                PHILOSOPHY — 3-column cards on dark bg
            ══════════════════════════════════════ */}
            <div className="ab-philosophy-section">
                <Container>
                    <div className="ab-philosophy-header">
                        <span className="ab-section-label ab-label-light">Engineering Philosophy</span>
                        <h2 className="ab-philosophy-title">Three principles.<br />Every engagement.</h2>
                    </div>
                    <div className="ab-philosophy-grid">
                        {PHILOSOPHY.map((p) => (
                            <div key={p.title} className="ab-philosophy-card">
                                <div className="ab-philosophy-icon">{p.icon}</div>
                                <h3 className="ab-philosophy-card-title">{p.title}</h3>
                                <p className="ab-philosophy-card-body">{p.body}</p>
                                <CheckCircle2 size={16} className="ab-philosophy-check" />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>

            {/* ══════════════════════════════════════
                EXPERTISE — Feature cards
            ══════════════════════════════════════ */}
            <div className="ab-expertise-section">
                <Container>
                    <div className="ab-expertise-header">
                        <span className="ab-section-label">Specializations</span>
                        <h2 className="ab-expertise-title">Compliance &amp; Cryptography</h2>
                        <p className="ab-expertise-sub">
                            BKX Labs occupies a rare position: a software rescue agency with deep expertise
                            in the implementation layer of enterprise compliance frameworks.
                        </p>
                    </div>
                    <div className="ab-expertise-grid">
                        {EXPERTISE.map((e) => (
                            <div key={e.title} className="ab-expertise-card">
                                <div className="ab-expertise-icon">{e.icon}</div>
                                <h3 className="ab-expertise-card-title">{e.title}</h3>
                                <p className="ab-expertise-card-body">{e.body}</p>
                            </div>
                        ))}
                    </div>
                    <div className="ab-expertise-cta">
                        <Link to="/tools" className="btn btn-primary">
                            Access Free Compliance Tools <ArrowRight size={16} />
                        </Link>
                    </div>
                </Container>
            </div>

            {/* ══════════════════════════════════════
                FINAL CTA — Gradient strip
            ══════════════════════════════════════ */}
            <div className="ab-final-cta">
                <Container>
                    <div className="ab-cta-inner">
                        <h2 className="ab-cta-title">Ready to stop firefighting?</h2>
                        <p className="ab-cta-body">
                            Every engagement begins with a Technical Health Check: a written, forensic report
                            on your system's current state. No obligation, no sales pressure. Just an honest
                            expert answer to the question your board is already asking.
                        </p>
                        <Link to="/contact" className="btn ab-cta-btn">
                            Book a Rescue Strategy Call <ArrowRight size={18} />
                        </Link>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default About;
