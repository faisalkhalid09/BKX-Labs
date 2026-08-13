import { useEffect, useState } from 'react';
import Hero from '../components/ui/Hero';
import Container from '../components/layout/Container';
import { Linkedin, ArrowRight, ShieldCheck, BookOpen, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import './About.css';

/* ── Accurate BKX Labs timeline (founded 2025) ── */
const TIMELINE = [
    { year: '2020', title: 'Where It Began', body: 'Started building production-grade web systems for startups and small businesses, handling everything from architecture to deployment solo.' },
    { year: '2021', title: 'First Enterprise Contract', body: 'Signed first enterprise engagement — a multi-tenant platform with 40k+ users. Delivered on time, under scope, and without a single regression.' },
    { year: '2022', title: 'The First Rescue', body: 'Inherited a collapsing EdTech product three weeks before its investor demo. Stabilized and shipped. The rescue playbook was written here.' },
    { year: '2023', title: 'The Team Forms', body: 'Began bringing in trusted specialists — engineers who shared the same "diagnose before you touch" philosophy. Every hire was personal and deliberate.' },
    { year: '2024', title: 'Security and Compliance Practice', body: 'Formalized our security auditing, cryptographic migration, and compliance engineering practice across active client engagements.' },
    { year: '2025', title: 'BKX Labs Is Founded', body: 'BKX Labs officially launched as a specialist agency — with a defined service model, a proven team, and an uncompromising standard of care.' },
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
        body: 'Every architectural decision is documented. Every production change is logged, reviewed, and approved before it ships. We build systems this way because an un-auditable codebase cannot be safely maintained.',
    },
    {
        num: '03',
        title: 'Zero Vendor Lock-In',
        body: 'We do not introduce proprietary tooling that requires BKX Labs to maintain. Every system runs on standard, widely-supported components — fully documented at handover. Your team should be able to take it anywhere.',
    },
];

const EXPERTISE = [
    {
        icon: <ShieldCheck size={22} strokeWidth={1.5} />,
        title: 'Compliance Engineering',
        body: 'We build the actual engineering controls that compliance frameworks require — not the documentation layer over them. Audit-ready pipelines, continuous monitoring, and verifiable evidence that holds up under scrutiny.',
    },
    {
        icon: <Lock size={22} strokeWidth={1.5} />,
        title: 'Security Architecture',
        body: 'From cryptographic implementation to access control design, we treat security as an engineering problem — not a checkbox. We identify vulnerabilities at the architectural level and fix them at the root.',
    },
    {
        icon: <BookOpen size={22} strokeWidth={1.5} />,
        title: 'Software Rescue',
        body: 'We specialize in taking over failing projects other teams couldn\'t finish, stabilizing them without destroying what works, and delivering software the business can actually run with.',
    },
];

/* ── Scroll-reveal hook for timeline items ── */
function useScrollReveal(selector: string) {
    useEffect(() => {
        const els = document.querySelectorAll<HTMLElement>(selector);
        if (!els.length) return;
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('ab-tl-visible');
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );
        els.forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, [selector]);
}

const About = () => {
    /* ── Cursor-following pill on photo ── */
    const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });

    const handlePhotoMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true });
    };

    const handlePhotoLeave = () => setCursor(prev => ({ ...prev, visible: false }));

    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "AboutPage",
                "@id": "https://bkxlabs.com/about#webpage",
                "name": "About BKX Labs: Software Rescue Agency Leadership & Engineering Philosophy",
                "description": "BKX Labs is led by Faisal Khalid, a specialist engineer focused on enterprise software rescue and compliance engineering.",
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

    useScrollReveal('.ab-timeline-item');

    return (
        <div className="ab-root">
            <SEO
                title="About BKX Labs — Software Development Agency | Laravel & React Specialists"
                description="BKX Labs is a specialist software development agency led by Faisal Khalid. We build, rescue, and modernize web applications for startups and enterprise teams globally."
                keywords="software development agency, about bkx labs, faisal khalid software engineer, software rescue agency"
                structuredData={structuredData}
            />

            <section aria-label="About BKX Labs and its founder" className="sr-only">
                <h1>About BKX Labs: Software Rescue Agency</h1>
                <p>BKX Labs is a specialized software rescue agency founded by Faisal Khalid in 2025.</p>
            </section>

            {/* Original Hero — unchanged */}
            <Hero
                title="About Us"
                subtitle="The specialized engineering team businesses call when their software is failing and they need it fixed, not patched."
            />

            {/* ════════════════════════════════════════
                FOUNDER
            ════════════════════════════════════════ */}
            <div className="ab-founder-section">
                <Container>
                    <div className="ab-founder-grid">

                        {/* Photo with cursor-following pill + professional badge */}
                        <div className="ab-founder-photo-col">
                            <div
                                className="ab-photo-frame"
                                onMouseMove={handlePhotoMove}
                                onMouseLeave={handlePhotoLeave}
                            >
                                <img
                                    src="/faisal.jpeg"
                                    alt="Faisal Khalid, Founder and Lead Architect at BKX Labs"
                                    className="ab-founder-photo"
                                    draggable="false"
                                    onContextMenu={(e) => e.preventDefault()}
                                />
                                {/* Cursor-following pill — only appears under the pointer */}
                                <div
                                    className={`ab-cursor-pill${cursor.visible ? ' ab-cursor-pill--on' : ''}`}
                                    style={{ left: cursor.x, top: cursor.y }}
                                    aria-hidden="true"
                                >
                                    Faisal Khalid
                                </div>
                                {/* Professional nameplate badge at bottom */}
                                <div className="ab-photo-badge" aria-hidden="true">
                                    <span className="ab-photo-badge-role">Founder &amp; Lead Architect</span>
                                    <span className="ab-photo-badge-org">BKX Labs · Est. 2025</span>
                                </div>
                            </div>
                        </div>

                        {/* Bio */}
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
                                Faisal has spent 5+ years building, breaking, and rescuing enterprise web
                                systems. He founded BKX Labs after one too many clients came to him with the
                                same problem: a product that had grown past the point where anyone on the team
                                fully understood it, and a business that depended on it completely.
                            </p>
                            <p className="ab-founder-text">
                                His approach is straightforward: understand the system before touching it,
                                fix the root cause rather than the symptom, and hand it back in a state that
                                any competent engineering team can maintain independently. No hero complexity,
                                no dependency on BKX Labs continuing to be involved.
                            </p>
                            <p className="ab-founder-text">
                                Every rescue engagement at BKX Labs is personally reviewed by Faisal at the
                                diagnostic and architecture stages. The quality of work is not something we
                                delegate to process alone — it comes from direct technical oversight at the
                                decisions that matter most.
                            </p>
                        </div>
                    </div>
                </Container>
            </div>

            {/* ════════════════════════════════════════
                MISSION — pull-quote strip
            ════════════════════════════════════════ */}
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

            {/* ════════════════════════════════════════
                TIMELINE — scroll-reveal
            ════════════════════════════════════════ */}
            <div className="ab-timeline-section">
                <Container>
                    <div className="ab-timeline-header">
                        <span className="ab-eyebrow">The Journey</span>
                        <h2 className="ab-timeline-title">How we got here</h2>
                    </div>
                    <div className="ab-timeline">
                        <div className="ab-timeline-spine" aria-hidden="true" />
                        {TIMELINE.map((item, i) => (
                            <div
                                key={item.year}
                                className={`ab-timeline-item ${i % 2 === 0 ? 'ab-tl-left' : 'ab-tl-right'}`}
                            >
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

            {/* ════════════════════════════════════════
                PHILOSOPHY — numbered full-width rows
            ════════════════════════════════════════ */}
            <div className="ab-philosophy-section">
                <Container>
                    <div className="ab-philosophy-header">
                        <span className="ab-eyebrow">Engineering Philosophy</span>
                        <h2 className="ab-philosophy-title">Three principles. Every engagement.</h2>
                    </div>
                    {PHILOSOPHY.map((p) => (
                        <div key={p.num} className="ab-philosophy-row">
                            <span className="ab-phil-num">{p.num}</span>
                            <h3 className="ab-phil-title">{p.title}</h3>
                            <p className="ab-phil-body">{p.body}</p>
                        </div>
                    ))}
                </Container>
            </div>

            {/* ════════════════════════════════════════
                EXPERTISE — horizontal rows
            ════════════════════════════════════════ */}
            <div className="ab-expertise-section">
                <Container>
                    <div className="ab-expertise-header">
                        <span className="ab-eyebrow">What We Do</span>
                        <h2 className="ab-expertise-title">Where we operate</h2>
                        <p className="ab-expertise-sub">
                            Three distinct practice areas, each built on the same forensic-first philosophy.
                            Every engagement falls into at least one of them.
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

            {/* ════════════════════════════════════════
                FINAL CTA
            ════════════════════════════════════════ */}
            <div className="ab-final-cta">
                <Container>
                    <div className="ab-cta-inner">
                        <h2 className="ab-cta-title">Ready to stop firefighting?</h2>
                        <p className="ab-cta-body">
                            Every engagement begins with a Technical Health Check: a written, forensic report
                            on your system's current state. No obligation, no sales pressure.
                        </p>
                        <Link to="/contact" className="btn ab-inline-btn ab-cta-btn">
                            Book a Rescue Strategy Call <ArrowRight size={18} />
                        </Link>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default About;
