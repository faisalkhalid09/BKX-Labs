import Hero from '../components/ui/Hero';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import { Target, Users, Eye, Linkedin } from 'lucide-react';
import './About.css';

const About = () => {
    return (
        <div>
            <Hero
                title="About Us"
                subtitle="Building enterprise-grade software through transparency and trust"
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
                            We started BKX Labs to eliminate the "black box" of software development. Our mission is to
                            provide international clients with enterprise-grade software through a transparent,
                            roadmap-driven process that respects your budget and timeline.
                        </p>
                        <p className="mission-text">
                            Too many businesses have been burned by agencies that overpromise and underdeliver.
                            We believe you deserve complete visibility into every phase of your project — from
                            the first line of code to final deployment.
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
                            <img src="/me.jpeg" alt="Faisal Khalid - Founder & Lead Architect" />
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
                                With deep roots in complex computer science principles and software engineering,
                                Faisal built BKX Labs to give clients more control and visibility than traditional
                                agencies ever offer. His background spans enterprise architecture, scalable
                                systems design, and leading cross-functional development teams.
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
                            A curated collective of 20+ specialists, hand-picked for their technical
                            excellence and communication skills.
                        </p>
                        <div className="team-details">
                            <p>
                                Our virtual team consists of specialized Frontend and Backend Developers,
                                UI/UX Designers, and dedicated Project Managers — each vetted for their
                                expertise and ability to work seamlessly across time zones.
                            </p>
                            <p>
                                While our team operates virtually, every member follows a rigorous internal
                                quality standard personally vetted by our founder. This ensures consistent
                                delivery, clear communication, and enterprise-level code quality on every project.
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
                        <p className="philosophy-tagline">Visibility over Guesses</p>
                        <p className="philosophy-text">
                            We believe you should never be left wondering about the status of your project.
                            Our transparency-first approach means you get regular updates, documented
                            milestones, and complete access to project progress at every stage.
                        </p>
                        <p className="philosophy-text">
                            No surprises. No hidden costs. Just clear communication and reliable delivery —
                            exactly what you'd expect from a true technology partner.
                        </p>
                    </div>
                </Container>
            </Section>
        </div>
    );
};

export default About;
