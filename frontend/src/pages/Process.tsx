import Hero from '../components/ui/Hero';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import { Search, Settings, Code, MessageSquare, Rocket, Shield, CreditCard, UserCheck } from 'lucide-react';
import SEO from '../components/ui/SEO';
import './Process.css';

const Process = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "BKX Labs Software Development Process",
        "description": "Our transparent 5-step development workflow with milestone-based payments",
        "step": [
            {
                "@type": "HowToStep",
                "name": "Discovery & Scope",
                "text": "In-depth requirements discussion and project planning"
            },
            {
                "@type": "HowToStep",
                "name": "Project Setup",
                "text": "Team assembly and infrastructure setup"
            },
            {
                "@type": "HowToStep",
                "name": "Phase-wise Execution",
                "text": "Development in 2-4 week sprints with regular demos"
            },
            {
                "@type": "HowToStep",
                "name": "Weekly Updates",
                "text": "Structured weekly communication and progress reports"
            },
            {
                "@type": "HowToStep",
                "name": "Delivery & Review",
                "text": "Final QA, deployment, and 30-day post-launch support"
            }
        ]
    };

    return (
        <div>
            <SEO
                title="The Rescue Protocol | Our Software Development Process"
                description="Explore BKX Labs' transparent 5-step development workflow: Diagnostic Audit, Triage, and Modernization. Our milestone-based process ensures complete visibility into your project rescue."
                keywords="software development process, project rescue protocol, agile engineering pakistan, transparent development workflow, milestone payments, technical audit process"
                structuredData={structuredData}
            />
            <Hero
                title="The Rescue Protocol"
                subtitle="A structured, auditable process for taking over failing software, stabilizing it, and bringing it to production — with complete visibility at every step."
            />

            {/* PM Introduction */}
            <Section>
                <Container>
                    <div className="pm-intro">
                        <div className="pm-icon">
                            <UserCheck size={48} strokeWidth={1.5} />
                        </div>
                        <h2>Every Rescue Has a Lead</h2>
                        <p>
                            The moment you engage BKX Labs, you are assigned a dedicated Lead Engineer and a
                            <strong> dedicated Project Manager</strong>. The Engineer owns the technical decisions.
                            The PM owns your communication. You always know who to call, and you always get a
                            straight answer — not "I'll check with the team."
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
                            <h2>The Diagnostic Audit</h2>
                        </div>
                        <p className="step-description">
                            We do not write a single line of remediation code until we understand the full scope.
                            Our forensic audit maps the codebase, security posture, and architecture before anything changes.
                        </p>
                        <div className="step-details">
                            <div className="detail-column">
                                <h4>What Happens</h4>
                                <ul>
                                    <li>Deep-dive codebase inspection</li>
                                    <li>Infrastructure & security scanning</li>
                                    <li>SQL Query & Performance profiling</li>
                                    <li>Dependency & licensing review</li>
                                </ul>
                            </div>
                            <div className="detail-column deliverables">
                                <h4>What You Get</h4>
                                <ul>
                                    <li>Numerical Code Health Score</li>
                                    <li>Security Vulnerability List</li>
                                    <li>Architecture Refactoring Roadmap</li>
                                    <li>Infrastructure Audit Report</li>
                                    <li>Fixed-price stabilization quote</li>
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
                            <h2>Triage &amp; Emergency Stabilization</h2>
                        </div>
                        <p className="step-description">
                            Informed by the audit findings, the team immediately addresses critical failures:
                            crashes, security holes, and deployment risks. The goal is to stop active damage
                            and restore operational confidence — without taking your system offline.
                        </p>
                        <div className="step-details">
                            <div className="detail-column">
                                <h4>What Happens</h4>
                                <ul>
                                    <li>Emergency patching of fatal errors</li>
                                    <li>Closing open security holes</li>
                                    <li>Fixing broken deployment pipelines</li>
                                    <li>Establishing system monitoring</li>
                                    <li>Zero-downtime recovery path</li>
                                </ul>
                            </div>
                            <div className="detail-column deliverables">
                                <h4>What You Get</h4>
                                <ul>
                                    <li>Production Server Stabilized</li>
                                    <li>CI/CD Pipelines Fixed & Functional</li>
                                    <li>Critical Crash Bugs Patched</li>
                                    <li>Monitoring Dashboard Access</li>
                                    <li>Verified Data Recovery Report</li>
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
                            <h2>Systematic Modernization</h2>
                        </div>
                        <p className="step-description">
                            With stability restored, development proceeds in clearly defined 2-week sprints.
                            Each sprint has a fixed scope, defined deliverables, and ends with a working demo
                            you can test. Technical debt is removed systematically — not all at once.
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
                            exactly where your project stands - no surprises, no guesswork.
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
                            <h2>Handover & Long-term Retainer</h2>
                        </div>
                        <p className="step-description">
                            final handover includes comprehensive testing, documentation, and deployment
                            support. We don't disappear after launch - we're here for the long haul.
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
                            You only pay as we deliver - ensuring accountability at every stage.
                        </p>
                        <div className="payment-milestones">
                            <div className="milestone">
                                <div className="milestone-percent">1</div>
                                <h4>Diagnostic Audit</h4>
                                <p>100% paid upfront before the codebase review begins.</p>
                            </div>
                            <div className="milestone">
                                <div className="milestone-percent">2</div>
                                <h4>Stabilization</h4>
                                <p>Fixed-price milestone to stop the bleeding and patch risks.</p>
                            </div>
                            <div className="milestone">
                                <div className="milestone-percent">3</div>
                                <h4>Modernization</h4>
                                <p>Flat monthly fee for ongoing refactoring and features.</p>
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
