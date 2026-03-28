import Hero from '../components/ui/Hero';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import { Target, Users, Eye, Linkedin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import './About.css';

const About = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "About BKX Labs",
        "description": "Learn about BKX Labs mission, leadership, and transparent approach to enterprise software development.",
        "mainEntity": {
            "@type": "Person",
            "name": "Faisal Khalid",
            "jobTitle": "Founder & Lead Architect",
            "url": "https://www.linkedin.com/in/faisal-khalid1622/",
            "worksFor": {
                "@type": "Organization",
                "name": "BKX Labs"
            }
        }
    };

    return (
        <div>
            <SEO
                title="About Us - BKX Labs Leadership & Mission"
                description="Meet the team behind BKX Labs. Founded by Faisal Khalid, we eliminate the 'black box' of software development through transparency, enterprise-grade engineering, and proven project rescue expertise."
                keywords="BKX Labs, Faisal Khalid, software development company, transparent development, project management, enterprise software team"
                structuredData={structuredData}
            />
            <Hero
                title="About Us"
                subtitle="The specialized engineering team businesses call when their software is failing and they need it fixed."
            />

            {/* Section 1: The Mission */}
            <Section>
                <Container>
                    <div className="mission-section">
                        <div className="mission-icon">
                            <Target size={48} strokeWidth={1.5} />
                        </div>
                        <h2>Our Mission</h2>
                        <p className="mission-text">
                            BKX Labs was built to solve one of the most common — and most costly — problems in the software industry:
                            projects that stall, agencies that disappear, and codebases that become liabilities instead of assets.
                            Our mission is to be the team that businesses can call when everything else has failed.
                        </p>
                        <p className="mission-text">
                            We combine forensic-level technical auditing with pragmatic, production-focused engineering.
                            We don't rebuild for the sake of rebuilding — we stabilize what can be saved, replace what can't,
                            and modernize everything systematically so your business never has to be in this position again.
                        </p>
                    </div>
                </Container>
            </Section>

            {/* Section 2: The Leadership */}
            <Section className="leadership-section">
                <Container>
                    <h2 className="section-title">Leadership</h2>
                    <div className="founder-container">
                        <div className="founder-image">
                            <img
                                src="/me.jpeg"
                                alt="Faisal Khalid - Founder and Lead Architect at BKX Labs, enterprise software development expert specializing in project rescue and scalable systems"
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
                                    marginBottom: '1rem',
                                    color: '#0077b5',
                                    fontWeight: 500,
                                    textDecoration: 'none'
                                }}
                            >
                                <Linkedin size={20} />
                                <span>Connect on LinkedIn</span>
                            </a>
                            <p className="founder-description">
                                Combining deep software engineering expertise with a ruthless focus on business ROI,
                                Faisal built BKX Labs to rescue founders from technical debt and vendor lock-in.
                                His background spans scalable systems architecture and leading cross-functional
                                crisis-management teams.
                            </p>
                            <p className="founder-description">
                                Every project at BKX Labs is personally overseen to ensure it meets our rigorous
                                standards for quality, communication, and on-time delivery. Faisal believes
                                that great software is built through partnership, not just transactions.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Section 3: The Team */}
            <Section>
                <Container>
                    <div className="team-section">
                        <div className="team-icon">
                            <Users size={48} strokeWidth={1.5} />
                        </div>
                        <h2>Our Team</h2>
                        <p className="team-highlight">
                            A 25-person team of specialists in software rescue, infrastructure engineering, and
                            full-stack development — hand-picked for their technical depth and crisis-management experience.
                        </p>
                        <div className="team-details">
                            <p>
                                Our team consists of Lead Engineers who specialize in inheriting broken codebases,
                                Security Specialists who audit and patch vulnerabilities, DevOps Engineers who establish
                                proper CI/CD pipelines, and Project Managers who translate technical reality into
                                clear business communication.
                            </p>
                            <p>
                                Every team member has been personally evaluated for both technical skill and
                                the ability to work calmly under pressure. Rescue work is high-stakes — the team
                                we put on your project has done this before.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Section 4: Our Philosophy */}
            <Section className="philosophy-section">
                <Container>
                    <div className="philosophy-content">
                        <div className="philosophy-icon">
                            <Eye size={48} strokeWidth={1.5} />
                        </div>
                        <h2>Our Philosophy</h2>
                        <p className="philosophy-tagline">Diagnose Before You Prescribe</p>
                        <p className="philosophy-text">
                            Every failed software project we've ever seen was the result of someone skipping
                            the diagnosis and jumping straight to the solution. We never do that. Every engagement
                            begins with understanding the problem completely before proposing how to solve it.
                        </p>
                        <p className="philosophy-text">
                            This means you never get a one-size-fits-all approach. You get a plan built
                            specifically for your codebase, your constraints, and your business goals —
                            with full transparency every step of the way.
                        </p>
                    </div>
                </Container>
            </Section>

            {/* Final CTA */}
            <Section className="about-cta">
                <Container>
                    <div className="cta-content" style={{ textAlign: 'center' }}>
                        <h2>Ready to stop firefighting and start shipping?</h2>
                        <p style={{ marginBottom: '2rem', fontSize: '18px', color: 'var(--text-gray)' }}>
                            Book a Rescue Strategy Call to see if your codebase qualifies for our Diagnostic Audit.
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
