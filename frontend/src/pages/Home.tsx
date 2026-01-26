import Hero from '../components/ui/Hero';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import Card from '../components/ui/Card';
import ServiceCard from '../components/ui/ServiceCard';
import ProcessStep from '../components/ui/ProcessStep';
import Button from '../components/ui/Button';
import {
    Rocket,
    Server,
    Hammer,
    UserCheck,
    Database,
    ShieldCheck,
    FileText,
    CheckCircle,
    Monitor,
    Smartphone,
    Zap,
    Palette,
    Headphones,
    Layers,
    Code
} from 'lucide-react';
import './Home.css';

const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <Hero
                title="Engineering Enterprise-Grade Software. Recovering Stalled Projects."
                subtitle="We don't just write code — we architect secure, scalable systems for businesses that demand production-ready results."
                ctaText="Book a Technical Consultation"
                ctaLink="/contact"
            />

            {/* Section 1: The BKX Advantage */}
            <Section className="advantage-section">
                <Container>
                    <h2 className="text-center section-heading">The BKX Advantage</h2>
                    <p className="text-center section-subheading">
                        Bridging the gap between standard development and premium engineering.
                    </p>
                    <div className="grid grid-3">
                        <Card>
                            <div className="card-icon-wrapper">
                                <Server size={40} strokeWidth={1.5} />
                            </div>
                            <h3>Infrastructure-First Engineering</h3>
                            <p className="card-text">
                                We don't just write code; we architect secure, scalable AWS-backed systems.
                                Our solutions are built to handle high concurrency and long-term data growth from day one.
                            </p>
                        </Card>

                        <Card>
                            <div className="card-icon-wrapper">
                                <Hammer size={40} strokeWidth={1.5} />
                            </div>
                            <h3>The "Fixer" Specialty</h3>
                            <p className="card-text">
                                We specialize in inheriting, auditing, and completing complex codebases that other teams couldn't finish.
                                From 20% partial builds to full production deployment, we deliver where others stall.
                            </p>
                        </Card>

                        <Card>
                            <div className="card-icon-wrapper">
                                <UserCheck size={40} strokeWidth={1.5} />
                            </div>
                            <h3>Dedicated PM Oversight</h3>
                            <p className="card-text">
                                Every project is assigned a Lead Project Manager who ensures the roadmap is followed perfectly.
                                You get a single point of accountability and executive-level communication.
                            </p>
                        </Card>
                    </div>
                </Container>
            </Section>

            {/* Section 2: Technical Depth */}
            <Section className="tech-section">
                <Container>
                    <div className="tech-block">
                        <h2 className="text-center section-heading">Technical Depth</h2>
                        <p className="text-center section-subheading">
                            We utilize enterprise-grade technologies to ensure your product is built for high-concurrency and long-term stability.
                        </p>

                        <div className="tech-grid">
                            <div className="tech-item">
                                <div className="tech-icon"><Code size={24} /></div>
                                <span>Laravel</span>
                            </div>
                            <div className="tech-item">
                                <div className="tech-icon"><Database size={24} /></div>
                                <span>Node.js</span>
                            </div>
                            <div className="tech-item">
                                <div className="tech-icon"><Monitor size={24} /></div>
                                <span>React</span>
                            </div>
                            <div className="tech-item">
                                <div className="tech-icon"><Server size={24} /></div>
                                <span>AWS S3</span>
                            </div>
                            <div className="tech-item">
                                <div className="tech-icon"><Zap size={24} /></div>
                                <span>Redis</span>
                            </div>
                            <div className="tech-item">
                                <div className="tech-icon"><Layers size={24} /></div>
                                <span>Elasticsearch</span>
                            </div>
                            <div className="tech-item">
                                <div className="tech-icon"><Database size={24} /></div>
                                <span>MySQL</span>
                            </div>
                            <div className="tech-item">
                                <div className="tech-icon"><ShieldCheck size={24} /></div>
                                <span>Docker</span>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Services Snapshot (Preserved for Navigation) */}
            <Section>
                <Container>
                    <h2 className="text-center section-heading">Core Capabilities</h2>
                    <div className="grid grid-3">
                        <ServiceCard
                            icon={Monitor}
                            title="Web Applications"
                            description="Scalable dashboards & internal tools"
                        />
                        <ServiceCard
                            icon={Smartphone}
                            title="Mobile Development"
                            description="Native performance, cross-platform reach"
                        />
                        <ServiceCard
                            icon={Zap}
                            title="MVP Development"
                            description="Rapid validation for investors"
                        />
                    </div>
                    <div className="text-center" style={{ marginTop: '2rem' }}>
                        <Button variant="secondary" href="/services">View All Services</Button>
                    </div>
                </Container>
            </Section>

            {/* Section 3: The BKX Guarantee */}
            <Section className="guarantee-section">
                <Container>
                    <div className="guarantee-block">
                        <div className="guarantee-header">
                            <ShieldCheck size={48} strokeWidth={1.5} className="guarantee-icon" />
                            <h2>The BKX Guarantee</h2>
                        </div>
                        <p className="guarantee-intro">
                            Confidence in delivery is our currency. We back every engagement with tangible commitments
                            that ensure your ROI is protected.
                        </p>
                        <div className="guarantee-points">
                            <div className="g-point">
                                <CheckCircle size={24} />
                                <div>
                                    <h4>30-Day Stability Support</h4>
                                    <p>Comprehensive post-launch bug fixing and monitoring included with every delivery.</p>
                                </div>
                            </div>
                            <div className="g-point">
                                <FileText size={24} />
                                <div>
                                    <h4>Full Technical Handover</h4>
                                    <p>You receive complete source code, SRS documentation, and technical manuals. No vendor lock-in.</p>
                                </div>
                            </div>
                            <div className="g-point">
                                <UserCheck size={24} />
                                <div>
                                    <h4>QA-Certified Releases</h4>
                                    <p>Every release passes through our rigorous automated and manual QA pipelines before reaching production.</p>
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
                        <h2 style={{ marginBottom: '1rem', color: 'white' }}>
                            Ready to stabilize and scale your software?
                        </h2>
                        <Button variant="primary" href="/contact">
                            Book a Technical Consultation
                        </Button>
                    </div>
                </Container>
            </Section>
        </div>
    );
};

export default Home;
