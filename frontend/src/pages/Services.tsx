import Hero from '../components/ui/Hero';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import { Link } from 'react-router-dom';
import { Search, Wrench, TrendingUp, Hammer, Headphones, ArrowRight } from 'lucide-react';
import SEO from '../components/ui/SEO';
import './Services.css';

const Services = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": [
            {
                "@type": "Service",
                "name": "Diagnostic Codebase Audit",
                "description": "A forensic review of your existing software, security posture, and architecture to identify exactly what's broken and why."
            },
            {
                "@type": "Service",
                "name": "Triage & Stabilization",
                "description": "Emergency patching of crashes, security holes, and deployment pipelines to restore system stability."
            },
            {
                "@type": "Service",
                "name": "Modernization Retainer",
                "description": "Systematic long-term refactoring and re-engineering using modern stacks without pausing business operations."
            },
            {
                "@type": "Service",
                "name": "Greenfield Development",
                "description": "Net-new application development for clients starting from scratch who want it done right the first time."
            },
            {
                "@type": "Service",
                "name": "Ongoing Engineering Support",
                "description": "Dedicated engineering bandwidth on retainer for product teams that need consistent, reliable development support."
            }
        ]
    };

    return (
        <div>
            <SEO
                title="Software Rescue & Enterprise Development Services"
                description="BKX Labs offers a complete software rescue funnel: Diagnostic Audits, Emergency Triage & Stabilization, and long-term Modernization Retainers. Our expert engineering team ensures your project is stable and scalable."
                keywords="codebase audit, software triage, technical debt removal, project rescue services, emergency stabilization, legacy modernization, hire laravel developers, react engineering, outsource software development pakistan"
                structuredData={structuredData}
            />
            <Hero
                title="Our Services"
                subtitle="We specialize in taking broken, stalled, or over-engineered systems and turning them into stable, scalable products. Every engagement starts with a diagnosis."
            />

            {/* Intro */}
            <Section>
                <Container>
                    <div className="services-intro">
                        <p>
                            Whether your project was abandoned by a previous team, is drowning in technical debt,
                            or simply needs to be built correctly from the start — we have a structured service
                            pathway designed for your exact situation. We don't guess; we follow the evidence.
                        </p>
                    </div>
                </Container>
            </Section>

            {/* Service 1: Diagnostic Audit */}
            <Section className="service-section">
                <Container>
                    <div className="service-block">
                        <div className="service-header">
                            <div className="service-icon-wrapper">
                                <Search size={40} strokeWidth={1.5} />
                            </div>
                            <h2>Phase 1: Diagnostic Codebase Audit</h2>
                        </div>

                        <p className="service-value">
                            Before a single line of code is changed, we need to understand the full picture. Our
                            audit team conducts a forensic review of your codebase, infrastructure, and security
                            posture — producing a written report that tells you exactly what is broken, why, and
                            what it will take to fix it.
                        </p>

                        <div className="service-details-grid">
                            <div className="service-detail">
                                <h4>What We Examine</h4>
                                <ul>
                                    <li>Code quality, structure & architectural patterns</li>
                                    <li>Security vulnerabilities & exposed attack surfaces</li>
                                    <li>Database schema design & query performance</li>
                                    <li>Deployment pipelines & server configuration</li>
                                    <li>Third-party dependency risks & version drift</li>
                                </ul>
                            </div>

                            <div className="service-detail">
                                <h4>Audit Tools & Methods</h4>
                                <div className="tech-tags">
                                    <span>Static Analysis</span>
                                    <span>OWASP Review</span>
                                    <span>Dependency Scanning</span>
                                    <span>Load Testing</span>
                                    <span>DB Query Profiling</span>
                                    <span>CI/CD Inspection</span>
                                    <span>Architecture Mapping</span>
                                    <span>Log Analysis</span>
                                </div>
                            </div>

                            <div className="service-detail">
                                <h4>What You Receive</h4>
                                <ul>
                                    <li>Full written Technical Health Report</li>
                                    <li>Severity-ranked list of issues (Critical / High / Medium)</li>
                                    <li>Remediation roadmap with time estimates</li>
                                    <li>Architecture diagram of current state</li>
                                </ul>
                            </div>

                            <div className="service-detail best-for">
                                <h4>Best For</h4>
                                <p>
                                    Any business that has inherited a codebase, experienced a failed agency transition,
                                    or suspects their technical debt has become a strategic liability. The audit
                                    stands alone — no obligation to proceed further.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Service 2: Triage & Stabilization */}
            <Section className="service-section alt">
                <Container>
                    <div className="service-block">
                        <div className="service-header">
                            <div className="service-icon-wrapper">
                                <Wrench size={40} strokeWidth={1.5} />
                            </div>
                            <h2>Phase 2: Triage &amp; Stabilization</h2>
                        </div>

                        <p className="service-value">
                            We stop the bleeding. Informed by the diagnostic audit, our engineers systematically
                            patch critical crashes, seal security vulnerabilities, and establish the foundational
                            engineering practices — CI/CD, monitoring, proper deployment — that your system
                            should have had from day one.
                        </p>

                        <div className="service-details-grid">
                            <div className="service-detail">
                                <h4>What We Fix</h4>
                                <ul>
                                    <li>Server crashes, memory leaks & fatal errors</li>
                                    <li>Security holes: SQL injection, XSS, auth bypasses</li>
                                    <li>Broken or absent CI/CD deployment pipelines</li>
                                    <li>Data integrity issues & corrupted state</li>
                                    <li>Performance bottlenecks causing timeouts</li>
                                </ul>
                            </div>

                            <div className="service-detail">
                                <h4>Technology Stack</h4>
                                <div className="tech-tags">
                                    <span>Laravel</span>
                                    <span>Node.js</span>
                                    <span>React</span>
                                    <span>PostgreSQL</span>
                                    <span>MySQL</span>
                                    <span>Redis</span>
                                    <span>Docker</span>
                                    <span>GitHub Actions</span>
                                    <span>AWS</span>
                                    <span>Nginx</span>
                                    <span>Laravel Sanctum</span>
                                    <span>Elasticsearch</span>
                                </div>
                            </div>

                            <div className="service-detail">
                                <h4>Our Approach</h4>
                                <p>
                                    Stabilization is performed live — we do not take your existing system offline.
                                    All changes go through a staging environment for validation before production
                                    deployment. You are notified and approve every critical change before it ships.
                                </p>
                            </div>

                            <div className="service-detail best-for">
                                <h4>Best For</h4>
                                <p>
                                    Teams in crisis mode — systems crashing in production, customer data at risk,
                                    or a product that cannot be shipped because it's too unstable. We treat this
                                    as an emergency and scope accordingly.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Service 3: Modernization Retainer */}
            <Section className="service-section">
                <Container>
                    <div className="service-block">
                        <div className="service-header">
                            <div className="service-icon-wrapper">
                                <TrendingUp size={40} strokeWidth={1.5} />
                            </div>
                            <h2>Phase 3: Modernization Retainer</h2>
                        </div>

                        <p className="service-value">
                            Stabilization buys you time. Modernization buys you the future. Our retainer model
                            provides dedicated engineering bandwidth to systematically remove technical debt,
                            refactor critical systems, and build the new features your business needs — all
                            without pausing operations.
                        </p>

                        <div className="service-details-grid">
                            <div className="service-detail">
                                <h4>What We Deliver</h4>
                                <ul>
                                    <li>Systematic legacy-to-modern stack migration</li>
                                    <li>New feature development on clean architecture</li>
                                    <li>Database restructuring & performance tuning</li>
                                    <li>Mobile app development (Flutter / React Native)</li>
                                    <li>API redesign & third-party integrations</li>
                                </ul>
                            </div>

                            <div className="service-detail">
                                <h4>Retainer Stack</h4>
                                <div className="tech-tags">
                                    <span>Laravel</span>
                                    <span>Node.js</span>
                                    <span>React</span>
                                    <span>Next.js</span>
                                    <span>Vue.js</span>
                                    <span>Flutter</span>
                                    <span>TypeScript</span>
                                    <span>AWS</span>
                                    <span>PostgreSQL</span>
                                    <span>Redis</span>
                                    <span>Docker</span>
                                    <span>Kubernetes</span>
                                </div>
                            </div>

                            <div className="service-detail">
                                <h4>Our Approach</h4>
                                <p>
                                    Retainers operate in 2-week sprints with a fixed deliverable scope per sprint.
                                    You receive a weekly update, a working demo at the end of each sprint, and full
                                    transparency into the backlog. Cancel with 30 days' notice — no lock-in.
                                </p>
                            </div>

                            <div className="service-detail best-for">
                                <h4>Best For</h4>
                                <p>
                                    Businesses that have stabilized and are ready to invest in their product's
                                    long-term health. Also ideal for startups that want a senior engineering team
                                    without the overhead of full-time hires.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Service 4: Greenfield Development */}
            <Section className="service-section alt">
                <Container>
                    <div className="service-block">
                        <div className="service-header">
                            <div className="service-icon-wrapper">
                                <Hammer size={40} strokeWidth={1.5} />
                            </div>
                            <h2>Greenfield Development</h2>
                        </div>

                        <p className="service-value">
                            Not everything needs rescuing. If you're starting from scratch, we build it correctly
                            the first time — with the infrastructure, security, and architectural decisions that
                            prevent the problems we spend so much time fixing for other clients.
                        </p>

                        <div className="service-details-grid">
                            <div className="service-detail">
                                <h4>What We Build</h4>
                                <ul>
                                    <li>SaaS products & multi-tenant web applications</li>
                                    <li>Cross-platform mobile apps (iOS & Android)</li>
                                    <li>Internal workflow automation & admin dashboards</li>
                                    <li>Customer-facing portals & self-service platforms</li>
                                    <li>MVP products for investor validation</li>
                                </ul>
                            </div>

                            <div className="service-detail">
                                <h4>Technology Stack</h4>
                                <div className="tech-tags">
                                    <span>React</span>
                                    <span>Next.js</span>
                                    <span>Vue.js</span>
                                    <span>TypeScript</span>
                                    <span>Node.js</span>
                                    <span>Laravel</span>
                                    <span>Python</span>
                                    <span>Flutter</span>
                                    <span>PostgreSQL</span>
                                    <span>Redis</span>
                                    <span>AWS</span>
                                    <span>Docker</span>
                                </div>
                            </div>

                            <div className="service-detail">
                                <h4>Our Approach</h4>
                                <p>
                                    All greenfield projects begin with a documented architecture review. 
                                    We deliver enterprise-grade Minimum Viable Products (MVPs) on fixed-price, 
                                    fixed-timeline contracts. No scope creep, no hourly billing surprises.
                                </p>
                            </div>

                            <div className="service-detail best-for">
                                <h4>Best For</h4>
                                <p>
                                    Startups building their first product, enterprises commissioning internal tools,
                                    and founders who have been burned before and want it done right.
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
                            <h2>Ongoing Engineering Support</h2>
                        </div>

                        <p className="service-value">
                            For product teams that need consistent, reliable engineering bandwidth without the
                            cost of full-time hires. We integrate with your existing processes, attend your
                            standups, and deliver reliably — sprint after sprint.
                        </p>

                        <div className="service-details-grid">
                            <div className="service-detail">
                                <h4>What's Included</h4>
                                <ul>
                                    <li>Dedicated engineering hours per month</li>
                                    <li>Bug triage, fixes & production monitoring</li>
                                    <li>Security patches & dependency updates</li>
                                    <li>Feature enhancements & product iterations</li>
                                    <li>Proactive performance optimization</li>
                                </ul>
                            </div>

                            <div className="service-detail">
                                <h4>Support Models</h4>
                                <div className="tech-tags">
                                    <span>Monthly Retainer</span>
                                    <span>Dedicated Squad</span>
                                    <span>Priority SLA</span>
                                    <span>24/7 Monitoring</span>
                                    <span>Sprint-based</span>
                                </div>
                            </div>

                            <div className="service-detail">
                                <h4>Our Approach</h4>
                                <p>
                                    A dedicated Lead Engineer and PM own your engagement. Weekly health reports,
                                    transparent issue tracking, and regular proactive recommendations — not just
                                    reactive firefighting.
                                </p>
                            </div>

                            <div className="service-detail best-for">
                                <h4>Best For</h4>
                                <p>
                                    Product companies with live applications, funded startups scaling their teams,
                                    and enterprises whose internal teams need specialist augmentation.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Also offer greenfield for Context */}
            <Section>
                <Container>
                    <div className="services-intro">
                        <p>
                            Not sure which service fits your situation? Every engagement starts with a 
                            complimentary 15-minute Rescue Strategy Call. We assess your business situation, 
                            the state of your current team, and recommend the right technical starting point. 
                            No high-pressure sales — just a candid assessment of whether your project can be saved.
                        </p>
                    </div>
                </Container>
            </Section>

            {/* CTA Section */}
            <Section className="services-cta">
                <Container>
                    <div className="cta-content">
                        <h2>Let's Fix What's Broken.</h2>
                        <p>
                            Stop guessing why your application is failing. Book a Strategy Call today to 
                            see if your codebase qualifies for our Diagnostic Audit.
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

export default Services;
