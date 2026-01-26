import Hero from '../components/ui/Hero';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import { Search, Settings, Code, MessageSquare, Rocket, Shield, CreditCard, UserCheck } from 'lucide-react';
import './Process.css';

const Process = () => {
    return (
        <div>
            <Hero
                title="Our Workflow"
                subtitle="A transparent, roadmap-driven development process designed for international clients who demand visibility and reliability"
            />

            {/* PM Introduction */}
            <Section>
                <Container>
                    <div className="pm-intro">
                        <div className="pm-icon">
                            <UserCheck size={48} strokeWidth={1.5} />
                        </div>
                        <h2>Your Dedicated Project Manager</h2>
                        <p>
                            From day one, you'll be assigned a dedicated Project Manager who serves as your
                            <strong> single point of contact</strong>. They coordinate with our development team,
                            provide regular updates, and ensure your project stays on track. No chasing multiple
                            people — just one professional who knows your project inside and out.
                        </p>
                    </div>
                </Container>
            </Section>

            {/* Step 1: Discovery & Scope */}
            <Section className="workflow-section">
                <Container>
                    <div className="workflow-step">
                        <div className="step-header">
                            <div className="step-number">1</div>
                            <div className="step-icon"><Search size={32} /></div>
                            <h2>Discovery & Scope</h2>
                        </div>
                        <p className="step-description">
                            We start by deeply understanding your business goals, target users, and technical
                            requirements. This phase ensures we're aligned before a single line of code is written.
                        </p>
                        <div className="step-details">
                            <div className="detail-column">
                                <h4>What Happens</h4>
                                <ul>
                                    <li>In-depth requirements discussion via video call</li>
                                    <li>Feature breakdown and prioritization</li>
                                    <li>Timeline and budget estimation</li>
                                    <li>Technology stack recommendations</li>
                                </ul>
                            </div>
                            <div className="detail-column deliverables">
                                <h4>What You Get</h4>
                                <ul>
                                    <li>Software Requirements Specification (SRS) Document</li>
                                    <li>Project Scope Document</li>
                                    <li>Initial Wireframes / UI Mockups</li>
                                    <li>Detailed Project Timeline</li>
                                    <li>Fixed-price or Milestone-based Quote</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Step 2: Project Setup */}
            <Section className="workflow-section alt">
                <Container>
                    <div className="workflow-step">
                        <div className="step-header">
                            <div className="step-number">2</div>
                            <div className="step-icon"><Settings size={32} /></div>
                            <h2>Project Setup</h2>
                        </div>
                        <p className="step-description">
                            Once scope is approved, we assemble your dedicated team and establish the
                            infrastructure for seamless collaboration and progress tracking.
                        </p>
                        <div className="step-details">
                            <div className="detail-column">
                                <h4>What Happens</h4>
                                <ul>
                                    <li>Dedicated Project Manager assigned</li>
                                    <li>Specialized development team assembled</li>
                                    <li>Project phases and milestones defined</li>
                                    <li>Communication channels established</li>
                                    <li>Development environment setup</li>
                                </ul>
                            </div>
                            <div className="detail-column deliverables">
                                <h4>What You Get</h4>
                                <ul>
                                    <li>Team Introduction & Contact Details</li>
                                    <li>Project Roadmap with Phase Breakdown</li>
                                    <li>Access to Project Management Dashboard</li>
                                    <li>Communication Schedule (Weekly Calls)</li>
                                    <li>Git Repository Access (Optional)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Step 3: Phase-wise Execution */}
            <Section className="workflow-section">
                <Container>
                    <div className="workflow-step">
                        <div className="step-header">
                            <div className="step-number">3</div>
                            <div className="step-icon"><Code size={32} /></div>
                            <h2>Phase-wise Execution</h2>
                        </div>
                        <p className="step-description">
                            Development proceeds in clearly defined phases, each with specific outcomes,
                            timelines, and deliverables. You see progress at every step — no black boxes.
                        </p>
                        <div className="step-details">
                            <div className="detail-column">
                                <h4>What Happens</h4>
                                <ul>
                                    <li>Development in 2-4 week sprints</li>
                                    <li>Each phase has defined deliverables</li>
                                    <li>Continuous integration & testing</li>
                                    <li>Regular demos of completed features</li>
                                    <li>Documentation updated in real-time</li>
                                </ul>
                            </div>
                            <div className="detail-column deliverables">
                                <h4>What You Get</h4>
                                <ul>
                                    <li>Working Demo at End of Each Phase</li>
                                    <li>Video Walkthrough of New Features</li>
                                    <li>Updated Technical Documentation</li>
                                    <li>Progress Report with Screenshots</li>
                                    <li>Access to Staging Environment</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Step 4: Weekly Updates */}
            <Section className="workflow-section alt">
                <Container>
                    <div className="workflow-step">
                        <div className="step-header">
                            <div className="step-number">4</div>
                            <div className="step-icon"><MessageSquare size={32} /></div>
                            <h2>Weekly Updates</h2>
                        </div>
                        <p className="step-description">
                            Your Project Manager provides structured weekly updates so you always know
                            exactly where your project stands — no surprises, no guesswork.
                        </p>
                        <div className="step-details">
                            <div className="detail-column">
                                <h4>What Happens</h4>
                                <ul>
                                    <li>Weekly video call with your PM</li>
                                    <li>Review of completed tasks</li>
                                    <li>Discussion of blockers or changes</li>
                                    <li>Preview of upcoming work</li>
                                    <li>Feedback incorporation</li>
                                </ul>
                            </div>
                            <div className="detail-column deliverables">
                                <h4>What You Get</h4>
                                <ul>
                                    <li>Weekly Progress Summary Email</li>
                                    <li>Recorded Video Demo (on request)</li>
                                    <li>Updated Task Board / Timeline</li>
                                    <li>Upcoming Week's Objectives</li>
                                    <li>Risk/Blocker Report (if any)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Step 5: Delivery & Review */}
            <Section className="workflow-section">
                <Container>
                    <div className="workflow-step">
                        <div className="step-header">
                            <div className="step-number">5</div>
                            <div className="step-icon"><Rocket size={32} /></div>
                            <h2>Delivery & Review</h2>
                        </div>
                        <p className="step-description">
                            Final handover includes comprehensive testing, documentation, and deployment
                            support. We don't disappear after launch — we're here for the long haul.
                        </p>
                        <div className="step-details">
                            <div className="detail-column">
                                <h4>What Happens</h4>
                                <ul>
                                    <li>Final QA testing and bug fixes</li>
                                    <li>Client acceptance testing (UAT)</li>
                                    <li>Production deployment support</li>
                                    <li>Knowledge transfer & training</li>
                                    <li>Post-launch support period</li>
                                </ul>
                            </div>
                            <div className="detail-column deliverables">
                                <h4>What You Get</h4>
                                <ul>
                                    <li>Complete Source Code & Assets</li>
                                    <li>Technical Documentation</li>
                                    <li>User Guide / Admin Manual</li>
                                    <li>Deployment Guide</li>
                                    <li>30-Day Post-Launch Support</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* QA & Testing */}
            <Section className="qa-section">
                <Container>
                    <div className="qa-content">
                        <div className="qa-icon">
                            <Shield size={48} strokeWidth={1.5} />
                        </div>
                        <h2>Quality Assurance & Testing</h2>
                        <p>
                            Every feature goes through rigorous testing before it reaches you. Our QA process
                            includes unit testing, integration testing, and user acceptance testing to ensure
                            your software is stable, secure, and ready for production.
                        </p>
                        <div className="qa-points">
                            <div className="qa-point">
                                <h4>Automated Testing</h4>
                                <p>Continuous integration with automated test suites</p>
                            </div>
                            <div className="qa-point">
                                <h4>Manual QA</h4>
                                <p>Human testing for UX, edge cases, and real-world scenarios</p>
                            </div>
                            <div className="qa-point">
                                <h4>Security Review</h4>
                                <p>Code security audits and vulnerability scanning</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Payment Milestones */}
            <Section className="payment-section">
                <Container>
                    <div className="payment-content">
                        <div className="payment-icon">
                            <CreditCard size={48} strokeWidth={1.5} />
                        </div>
                        <h2>Payment Milestones</h2>
                        <p className="payment-intro">
                            Our milestone-based payment structure aligns your investment with project progress.
                            You only pay as we deliver — ensuring accountability at every stage.
                        </p>
                        <div className="payment-milestones">
                            <div className="milestone">
                                <div className="milestone-percent">20%</div>
                                <h4>Initial Deposit</h4>
                                <p>Upon project kickoff and scope approval</p>
                            </div>
                            <div className="milestone">
                                <div className="milestone-percent">30%</div>
                                <h4>Mid-Project</h4>
                                <p>After completion of core development phases</p>
                            </div>
                            <div className="milestone">
                                <div className="milestone-percent">30%</div>
                                <h4>Pre-Delivery</h4>
                                <p>Upon successful UAT and final review</p>
                            </div>
                            <div className="milestone">
                                <div className="milestone-percent">20%</div>
                                <h4>Final Release</h4>
                                <p>After production deployment and handover</p>
                            </div>
                        </div>
                        <p className="payment-note">
                            <em>Payment terms are flexible and can be customized based on project size and requirements.</em>
                        </p>
                    </div>
                </Container>
            </Section>
        </div>
    );
};

export default Process;
