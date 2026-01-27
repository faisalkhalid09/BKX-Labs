import Hero from '../components/ui/Hero';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import { Link } from 'react-router-dom';
import { Monitor, Smartphone, Zap, Palette, Headphones, ArrowRight } from 'lucide-react';
import './Services.css';

const Services = () => {
    return (
        <div>
            <Hero
                title="Our Services"
                subtitle="Enterprise-grade software solutions delivered through a transparent, phase-wise process with documented milestones"
            />

            {/* Intro */}
            <Section>
                <Container>
                    <div className="services-intro">
                        <p>
                            We combine technical excellence with structured project management to deliver
                            software that scales. Every engagement follows our proven roadmap methodology -
                            complete with documentation, staging environments, and regular demos.
                        </p>
                    </div>
                </Container>
            </Section>

            {/* Service 1: Web Applications */}
            <Section className="service-section">
                <Container>
                    <div className="service-block">
                        <div className="service-header">
                            <div className="service-icon-wrapper">
                                <Monitor size={40} strokeWidth={1.5} />
                            </div>
                            <h2>Web Applications</h2>
                        </div>

                        <p className="service-value">
                            Custom web applications that automate manual workflows, centralize data, and give
                            your team the tools they need to work smarter. From internal dashboards to
                            customer-facing platforms, we engineer solutions that scale with your business.
                        </p>

                        <div className="service-details-grid">
                            <div className="service-detail">
                                <h4>What We Build</h4>
                                <ul>
                                    <li>Admin dashboards & analytics platforms</li>
                                    <li>Customer portals & self-service systems</li>
                                    <li>Internal workflow automation tools</li>
                                    <li>SaaS products & multi-tenant applications</li>
                                    <li>API integrations & third-party connectors</li>
                                </ul>
                            </div>

                            <div className="service-detail">
                                <h4>Technology Stack</h4>
                                <div className="tech-tags">
                                    <span>React</span>
                                    <span>Next.js</span>
                                    <span>Vue.js</span>
                                    <span>Angular</span>
                                    <span>TypeScript</span>
                                    <span>Node.js</span>
                                    <span>Express.js</span>
                                    <span>Laravel</span>
                                    <span>PHP</span>
                                    <span>Python</span>
                                    <span>Django</span>
                                    <span>FastAPI</span>
                                    <span>Ruby on Rails</span>
                                    <span>ASP.NET Core</span>
                                    <span>Java Spring Boot</span>
                                    <span>PostgreSQL</span>
                                    <span>MySQL</span>
                                    <span>MongoDB</span>
                                    <span>Redis</span>
                                    <span>AWS</span>
                                    <span>Google Cloud</span>
                                    <span>Azure</span>
                                    <span>Docker</span>
                                    <span>Kubernetes</span>
                                </div>
                            </div>

                            <div className="service-detail">
                                <h4>Our Approach</h4>
                                <p>
                                    Every web application follows our phase-wise delivery model. You receive
                                    documented requirements, access to a staging environment for preview,
                                    and weekly progress demos before final deployment.
                                </p>
                            </div>

                            <div className="service-detail best-for">
                                <h4>Best For</h4>
                                <p>
                                    Growing businesses looking to digitize operations, SaaS founders building
                                    their first product, and enterprises needing custom internal tools.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Service 2: Mobile Development */}
            <Section className="service-section alt">
                <Container>
                    <div className="service-block">
                        <div className="service-header">
                            <div className="service-icon-wrapper">
                                <Smartphone size={40} strokeWidth={1.5} />
                            </div>
                            <h2>Mobile Development</h2>
                        </div>

                        <p className="service-value">
                            Native-quality mobile applications that deliver seamless user experiences across
                            devices. We build API-driven, performance-optimized apps that integrate smoothly
                            with your existing systems and scale to millions of users.
                        </p>

                        <div className="service-details-grid">
                            <div className="service-detail">
                                <h4>What We Build</h4>
                                <ul>
                                    <li>Cross-platform apps (iOS & Android)</li>
                                    <li>Native Android applications</li>
                                    <li>Consumer-facing mobile products</li>
                                    <li>Enterprise mobile solutions</li>
                                    <li>Real-time & offline-capable apps</li>
                                </ul>
                            </div>

                            <div className="service-detail">
                                <h4>Technology Stack</h4>
                                <div className="tech-tags">
                                    <span>Flutter</span>
                                    <span>Dart</span>
                                    <span>React Native</span>
                                    <span>Kotlin</span>
                                    <span>Java</span>
                                    <span>Swift</span>
                                    <span>Objective-C</span>
                                    <span>Expo</span>
                                    <span>Firebase</span>
                                    <span>SQLite</span>
                                    <span>Realm</span>
                                    <span>REST APIs</span>
                                    <span>GraphQL</span>
                                    <span>WebSockets</span>
                                    <span>Push Notifications</span>
                                    <span>App Store Connect</span>
                                    <span>Google Play Console</span>
                                </div>
                            </div>

                            <div className="service-detail">
                                <h4>Our Approach</h4>
                                <p>
                                    Mobile projects include wireframes before development, beta builds for
                                    testing, and full Play Store / App Store submission support. Every
                                    milestone includes a working build you can install and test.
                                </p>
                            </div>

                            <div className="service-detail best-for">
                                <h4>Best For</h4>
                                <p>
                                    Startups launching their first mobile product, businesses extending
                                    web platforms to mobile, and companies needing field-service apps.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Service 3: MVP Development */}
            <Section className="service-section">
                <Container>
                    <div className="service-block">
                        <div className="service-header">
                            <div className="service-icon-wrapper">
                                <Zap size={40} strokeWidth={1.5} />
                            </div>
                            <h2>MVP Development</h2>
                        </div>

                        <p className="service-value">
                            Transform your idea into a functional product - fast. We specialize in building
                            Minimum Viable Products that are lean enough to validate your concept, yet
                            robust enough to scale when you're ready.
                        </p>

                        <div className="service-details-grid">
                            <div className="service-detail">
                                <h4>What We Build</h4>
                                <ul>
                                    <li>Investor-ready product demos</li>
                                    <li>Market validation prototypes</li>
                                    <li>Core feature implementations</li>
                                    <li>Scalable architecture foundations</li>
                                    <li>User feedback collection systems</li>
                                </ul>
                            </div>

                            <div className="service-detail">
                                <h4>Technology Stack</h4>
                                <div className="tech-tags">
                                    <span>React</span>
                                    <span>Next.js</span>
                                    <span>Vue.js</span>
                                    <span>Node.js</span>
                                    <span>Express.js</span>
                                    <span>Laravel</span>
                                    <span>Python</span>
                                    <span>Django</span>
                                    <span>Firebase</span>
                                    <span>Supabase</span>
                                    <span>PostgreSQL</span>
                                    <span>MongoDB</span>
                                    <span>Vercel</span>
                                    <span>Netlify</span>
                                    <span>Railway</span>
                                    <span>Stripe</span>
                                    <span>PayPal</span>
                                    <span>Twilio</span>
                                    <span>SendGrid</span>
                                </div>
                            </div>

                            <div className="service-detail">
                                <h4>Our Approach</h4>
                                <p>
                                    MVP projects follow an accelerated timeline with weekly deliverables.
                                    We focus on core features first, document everything for future
                                    development, and build with scale in mind — not throwaway code.
                                </p>
                            </div>

                            <div className="service-detail best-for">
                                <h4>Best For</h4>
                                <p>
                                    Early-stage startups preparing for investor pitches, entrepreneurs
                                    validating market demand, and innovators testing new product concepts.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Service 4: UI/UX Design */}
            <Section className="service-section alt">
                <Container>
                    <div className="service-block">
                        <div className="service-header">
                            <div className="service-icon-wrapper">
                                <Palette size={40} strokeWidth={1.5} />
                            </div>
                            <h2>UI/UX Design</h2>
                        </div>

                        <p className="service-value">
                            User-centered design that converts visitors into customers. We create interfaces
                            that are intuitive, visually compelling, and optimized for the actions that
                            matter most to your business.
                        </p>

                        <div className="service-details-grid">
                            <div className="service-detail">
                                <h4>What We Deliver</h4>
                                <ul>
                                    <li>User research & persona development</li>
                                    <li>Information architecture</li>
                                    <li>Wireframes & interactive prototypes</li>
                                    <li>High-fidelity UI designs</li>
                                    <li>Design systems & component libraries</li>
                                </ul>
                            </div>

                            <div className="service-detail">
                                <h4>Tools & Methods</h4>
                                <div className="tech-tags">
                                    <span>Figma</span>
                                    <span>Adobe XD</span>
                                    <span>Sketch</span>
                                    <span>Adobe Photoshop</span>
                                    <span>Adobe Illustrator</span>
                                    <span>InVision</span>
                                    <span>Zeplin</span>
                                    <span>Principle</span>
                                    <span>Framer</span>
                                    <span>Prototyping</span>
                                    <span>Wireframing</span>
                                    <span>User Testing</span>
                                    <span>A/B Testing</span>
                                    <span>Design Systems</span>
                                    <span>Responsive Design</span>
                                    <span>Accessibility (WCAG)</span>
                                </div>
                            </div>

                            <div className="service-detail">
                                <h4>Our Approach</h4>
                                <p>
                                    Design is delivered in phases: research → wireframes → visual design →
                                    prototype. Each phase includes client review and sign-off before
                                    proceeding, ensuring alignment every step of the way.
                                </p>
                            </div>

                            <div className="service-detail best-for">
                                <h4>Best For</h4>
                                <p>
                                    Businesses redesigning existing products, startups needing investor-ready
                                    mockups, and teams seeking a cohesive design language across platforms.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Service 5: Ongoing Support */}
            <Section className="service-section">
                <Container>
                    <div className="service-block">
                        <div className="service-header">
                            <div className="service-icon-wrapper">
                                <Headphones size={40} strokeWidth={1.5} />
                            </div>
                            <h2>Ongoing Support & Maintenance</h2>
                        </div>

                        <p className="service-value">
                            Your software is an asset that needs care. Our maintenance packages ensure
                            your applications stay secure, performant, and aligned with evolving business
                            needs - without the overhead of a full-time engineering team.
                        </p>

                        <div className="service-details-grid">
                            <div className="service-detail">
                                <h4>What's Included</h4>
                                <ul>
                                    <li>Bug fixes & issue resolution</li>
                                    <li>Security patches & updates</li>
                                    <li>Performance monitoring & optimization</li>
                                    <li>Feature enhancements & iterations</li>
                                    <li>Database maintenance & backups</li>
                                </ul>
                            </div>

                            <div className="service-detail">
                                <h4>Support Models</h4>
                                <div className="tech-tags">
                                    <span>Monthly Retainer</span>
                                    <span>Hourly Packages</span>
                                    <span>Priority Response</span>
                                    <span>24/7 Monitoring</span>
                                    <span>Dedicated Team</span>
                                </div>
                            </div>

                            <div className="service-detail">
                                <h4>Our Approach</h4>
                                <p>
                                    Support engagements include a dedicated point of contact, documented
                                    issue tracking, and regular health reports. We proactively identify
                                    issues before they impact your users.
                                </p>
                            </div>

                            <div className="service-detail best-for">
                                <h4>Best For</h4>
                                <p>
                                    Businesses with live applications needing ongoing care, companies without
                                    in-house dev teams, and products requiring regular feature updates.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* CTA Section */}
            <Section className="services-cta">
                <Container>
                    <div className="cta-content">
                        <h2>Ready to Build Something Great?</h2>
                        <p>
                            Every project starts with a free discovery call. Let's discuss your
                            requirements and create a roadmap tailored to your goals.
                        </p>
                        <Link to="/contact" className="btn btn-primary">
                            Book a Discovery Call <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                        </Link>
                    </div>
                </Container>
            </Section>
        </div>
    );
};

export default Services;
