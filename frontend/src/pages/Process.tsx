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
        "name": "BKX Labs Software Rescue Protocol: 5 Phases from Diagnosis to Handover",
        "description": "The auditable 5-phase process BKX Labs uses to take over a failing software system, stabilize it, modernize it, and hand it back to the client's team with full documentation and operational self-sufficiency.",
        "tool": [
            { "@type": "HowToTool", "name": "PHPStan Level 9" },
            { "@type": "HowToTool", "name": "OWASP ZAP" },
            { "@type": "HowToTool", "name": "Rector" },
            { "@type": "HowToTool", "name": "k6 Load Testing" },
            { "@type": "HowToTool", "name": "PestPHP 3" },
            { "@type": "HowToTool", "name": "Sentry" },
            { "@type": "HowToTool", "name": "Laravel Horizon" },
            { "@type": "HowToTool", "name": "GitHub Actions" }
        ],
        "step": [
            {
                "@type": "HowToStep",
                "position": 1,
                "name": "Diagnostic Codebase Audit",
                "text": "A forensic review of the entire codebase, infrastructure, and security posture using PHPStan Level 9, OWASP ZAP, Rector, and k6 load testing. Every issue is classified by severity and mapped to a remediation effort estimate. The output is a written Technical Health Report delivered within 5 to 10 business days, owned by the client regardless of whether the engagement continues."
            },
            {
                "@type": "HowToStep",
                "position": 2,
                "name": "Triage and Emergency Stabilization",
                "text": "Immediate intervention on Critical and High severity findings identified in the audit. All triage work is executed on an isolated staging branch using a reproducible CI/CD pipeline — never directly in production. Critical security vulnerabilities are sealed within 72 hours. Sentry error tracking and Laravel Horizon queue monitoring are established to give the client real-time production visibility for the first time."
            },
            {
                "@type": "HowToStep",
                "position": 3,
                "name": "Systematic Modernization",
                "text": "Iterative architectural evolution delivered in 2-week sprints with a fixed, pre-agreed deliverable scope per sprint. Legacy patterns are migrated to Laravel 12 service-layer architecture and React 19 with TypeScript strict mode. PestPHP 3 test suites are established before any high-risk refactoring is attempted, creating a regression safety net that makes the migration provably safe rather than optimistically safe."
            },
            {
                "@type": "HowToStep",
                "position": 4,
                "name": "Weekly Communication and Transparency",
                "text": "Structured weekly async written updates covering what shipped in the past week, what is in progress, what is blocked, and any proactive recommendations from the engineering team. The dedicated Project Manager is available for synchronous calls at any point. No update is ever 'the team is working on it' — every status report names the specific task, the engineer responsible, and the expected completion date."
            },
            {
                "@type": "HowToStep",
                "position": 5,
                "name": "Handover and Long-term Self-Sufficiency",
                "text": "Final handover includes complete source code, architecture decision records, database schema documentation, deployment runbooks, and a 60-day post-handover support period at no additional charge. The engagement is not considered complete until the client's internal team can operate the system independently without requiring BKX Labs involvement for routine tasks."
            }
        ]
    };

    return (
        <div>
            <SEO
                title="The Rescue Protocol | Auditable 5-Phase Software Recovery Process"
                description="BKX Labs uses a forensic, phase-gated rescue methodology: Diagnostic Audit, Triage, Modernization, Weekly Transparency, and Full Handover. PHPStan, OWASP ZAP, PestPHP 3. Fixed-price, zero-downtime. Written report before any code changes."
                keywords="software rescue protocol, project recovery process, laravel codebase audit process, react modernization approach, technical debt remediation steps, how to rescue a failing project, software rescue methodology, enterprise code handover process"
                structuredData={structuredData}
            />
            <Hero
                title="The Rescue Protocol"
                subtitle="A structured, auditable, phase-gated process for taking over failing software, stabilizing it, and bringing it to production — with complete written transparency at every stage."
            />

            {/* PM Introduction */}
            <Section>
                <Container>
                    <div className="pm-intro">
                        <div className="pm-icon">
                            <UserCheck size={48} strokeWidth={1.5} />
                        </div>
                        <h2>Every Rescue Has a Named Lead</h2>
                        <p>
                            From the moment you engage BKX Labs, you are assigned a <strong>dedicated Lead Engineer</strong> and
                            a <strong>dedicated Project Manager</strong>. The Lead Engineer owns every technical decision
                            and is accountable for the quality of the diagnostic report, triage interventions, and
                            modernization architecture. The PM owns your communication — meeting cadence, status
                            reports, change requests, and escalations. You always know exactly who to call,
                            and you always get a straight answer. Neither role rotates mid-engagement.
                        </p>
                    </div>
                </Container>
            </Section>

            {/* Step 1: Diagnostic Audit */}
            <Section className="workflow-section">
                <Container>
                    <div className="workflow-step">
                        <div className="step-header">
                            <div className="step-number">1</div>
                            <div className="step-icon"><Search size={32} /></div>
                            <h2>The Diagnostic Audit</h2>
                        </div>
                        <p className="step-description">
                            We do not write a single line of remediation code until we understand the full scope
                            of the problem. Our forensic audit team spends 5 to 10 business days on read-only
                            access to your codebase, production logs, database schema, and infrastructure —
                            using a combination of automated static analysis and manual architectural review.
                            The output is a written Technical Health Report: every issue classified by severity
                            (Critical / High / Medium / Low), with an individual effort and cost estimate for
                            each remediation item. This report belongs to you, unconditionally, regardless of
                            whether you choose to continue with BKX Labs. It is a standalone deliverable,
                            not a sales document.
                        </p>
                        <div className="step-details">
                            <div className="detail-column">
                                <h4>Audit Tooling & Methods</h4>
                                <ul>
                                    <li>PHPStan Level 9 static analysis (zero tolerance for type errors)</li>
                                    <li>OWASP ZAP security surface mapping and vulnerability classification</li>
                                    <li>Rector dependency analysis and upgrade path assessment</li>
                                    <li>k6 load testing under realistic traffic profiles</li>
                                    <li>Database query profiling and index coverage analysis</li>
                                    <li>ESLint strict + TypeScript compiler diagnostics on frontend</li>
                                    <li>Dependency vulnerability scanning (CVE database cross-reference)</li>
                                    <li>CI/CD pipeline completeness and rollback capability review</li>
                                </ul>
                            </div>
                            <div className="detail-column deliverables">
                                <h4>What You Receive</h4>
                                <ul>
                                    <li>Written Technical Health Report (PDF + source format)</li>
                                    <li>Severity-ranked issue list with per-item remediation cost estimates</li>
                                    <li>Architecture diagram: current state vs. recommended state</li>
                                    <li>Security vulnerability list with OWASP category classification</li>
                                    <li>Database performance report with slow-query breakdown</li>
                                    <li>Fixed-price stabilization quote based on actual findings</li>
                                    <li>Executive summary suitable for investor or board review</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Step 2: Triage */}
            <Section className="workflow-section alt">
                <Container>
                    <div className="workflow-step">
                        <div className="step-header">
                            <div className="step-number">2</div>
                            <div className="step-icon"><Settings size={32} /></div>
                            <h2>Triage & Emergency Stabilization</h2>
                        </div>
                        <p className="step-description">
                            Informed by the audit report's severity rankings, our engineers immediately address the
                            critical failure points — crashes, active security vulnerabilities, broken deployment
                            pipelines, and data integrity risks — without taking your system offline at any point.
                            All triage work is executed on a dedicated staging branch with a reproducible Docker
                            and GitHub Actions pipeline that may not have existed before we arrived. Critical
                            security vulnerabilities (SQL injection, broken authentication, SSRF, exposed credentials)
                            are sealed within the first 72 hours of triage engagement. Every change is committed,
                            reviewed, tested in staging, and requires your explicit written approval before
                            promotion to production. A Sentry error-tracking integration and Laravel Horizon
                            queue monitoring dashboard are established so you have real-time production visibility
                            — in many cases, for the first time in the project's history.
                        </p>
                        <div className="step-details">
                            <div className="detail-column">
                                <h4>What We Address</h4>
                                <ul>
                                    <li>Production crashes and unhandled fatal exceptions</li>
                                    <li>SQL injection, XSS, and CSRF vulnerabilities</li>
                                    <li>Broken authentication and authorization logic</li>
                                    <li>Missing or non-functional CI/CD deployment pipelines</li>
                                    <li>N+1 query patterns causing database timeout cascades</li>
                                    <li>Environment configuration leakage and credential exposure</li>
                                    <li>Missing rate limiting and input sanitization on public endpoints</li>
                                </ul>
                            </div>
                            <div className="detail-column deliverables">
                                <h4>What You Receive</h4>
                                <ul>
                                    <li>Stabilized production environment — no active crashes</li>
                                    <li>Functional CI/CD pipeline with automated rollback capability</li>
                                    <li>Critical security vulnerabilities patched and verified</li>
                                    <li>Sentry error monitoring dashboard with alert thresholds</li>
                                    <li>Laravel Horizon queue visibility dashboard</li>
                                    <li>Signed off staging → production change log for each intervention</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Step 3: Modernization */}
            <Section className="workflow-section">
                <Container>
                    <div className="workflow-step">
                        <div className="step-header">
                            <div className="step-number">3</div>
                            <div className="step-icon"><Code size={32} /></div>
                            <h2>Systematic Modernization</h2>
                        </div>
                        <p className="step-description">
                            With production stability restored, development proceeds in clearly defined 2-week sprints.
                            Each sprint has a fixed, collaboratively agreed scope — committed in writing before
                            any code is written — and ends with a working demo you can test against agreed
                            acceptance criteria. Technical debt is not removed all at once; it is sequenced
                            by risk and business impact. PestPHP 3 test suites are established before any
                            high-risk refactoring is attempted, creating a regression safety net that makes
                            the architectural evolution provably safe rather than optimistically safe.
                            Legacy patterns are migrated to Laravel 12 service-layer architecture, React 19
                            with TypeScript 5 strict mode, and Tailwind CSS 4 — component by component,
                            sprint by sprint, with zero-downtime throughout.
                        </p>
                        <div className="step-details">
                            <div className="detail-column">
                                <h4>What We Deliver Per Sprint</h4>
                                <ul>
                                    <li>Fixed, pre-agreed scope committed before sprint start</li>
                                    <li>Laravel 12 architecture migration (one subsystem per sprint)</li>
                                    <li>TypeScript 5 strict mode adoption on the frontend layer</li>
                                    <li>PestPHP 3 test coverage for every refactored module</li>
                                    <li>Database migration scripting with verified rollback paths</li>
                                    <li>API versioning and backward-compatible endpoint redesign</li>
                                    <li>Sprint-end working demo with acceptance sign-off</li>
                                </ul>
                            </div>
                            <div className="detail-column deliverables">
                                <h4>What You Receive</h4>
                                <ul>
                                    <li>Working demo on staging at end of every 2-week sprint</li>
                                    <li>Automated test suite growing with every sprint delivery</li>
                                    <li>Technical documentation updated in real time</li>
                                    <li>Backlog with full visibility: tasks, owners, status</li>
                                    <li>Architecture Decision Records for every major choice</li>
                                    <li>Access to shared project workspace (Linear / GitHub / Notion)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Step 4: Communication */}
            <Section className="workflow-section alt">
                <Container>
                    <div className="workflow-step">
                        <div className="step-header">
                            <div className="step-number">4</div>
                            <div className="step-icon"><MessageSquare size={32} /></div>
                            <h2>Structured Weekly Transparency</h2>
                        </div>
                        <p className="step-description">
                            Your dedicated Project Manager delivers a structured written status report every
                            Monday morning. It covers what shipped last week (with links to the merged pull
                            requests or staging demo), what is in progress this week (with the engineer
                            assigned and expected completion), what is blocked (with the specific blocker
                            named and the mitigation in place), and any proactive recommendations from the
                            engineering team based on what they observed during the week. You are never told
                            "the team is working on it." Every status item names a person, a task,
                            and a date. Synchronous calls are available on request at any time —
                            but most clients find the async written format gives them more information
                            with less time cost.
                        </p>
                        <div className="step-details">
                            <div className="detail-column">
                                <h4>Communication Format</h4>
                                <ul>
                                    <li>Weekly async written health report (delivered Monday)</li>
                                    <li>Mid-sprint check-in (Wednesday, async written)</li>
                                    <li>Sprint planning session (start of each 2-week cycle)</li>
                                    <li>Sprint review and demo (end of each 2-week cycle)</li>
                                    <li>On-demand sync calls available with 4-hour notice</li>
                                    <li>P1 incident response available with 1-hour response SLA</li>
                                </ul>
                            </div>
                            <div className="detail-column deliverables">
                                <h4>What You Receive</h4>
                                <ul>
                                    <li>Weekly Progress Report (what shipped / in progress / blocked)</li>
                                    <li>Proactive risk and recommendation section in every report</li>
                                    <li>Sprint plan document before each sprint begins</li>
                                    <li>Recorded demo video at sprint end (on request)</li>
                                    <li>Updated task board with real-time status visibility</li>
                                    <li>Escalation path with named contacts at every level</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Step 5: Handover */}
            <Section className="workflow-section">
                <Container>
                    <div className="workflow-step">
                        <div className="step-header">
                            <div className="step-number">5</div>
                            <div className="step-icon"><Rocket size={32} /></div>
                            <h2>Handover & Long-Term Self-Sufficiency</h2>
                        </div>
                        <p className="step-description">
                            The definition of "done" at BKX Labs is not deployment — it is operational
                            self-sufficiency. The handover phase begins two sprints before the final
                            delivery date and is structured to ensure your internal team can take
                            full ownership of the system without requiring our continued involvement.
                            This includes a dedicated knowledge transfer session, a full architecture
                            walkthrough, onboarding documentation for any new engineers who join your team,
                            and deployment runbooks for every environment. A 60-day post-handover support
                            period is included at no additional charge: during this period, any production
                            issues that arise from our work are resolved by us at priority. The engagement
                            closes when you tell us you're confident — not when we decide we're done.
                        </p>
                        <div className="step-details">
                            <div className="detail-column">
                                <h4>Handover Activities</h4>
                                <ul>
                                    <li>Architecture walkthrough session with your lead engineer</li>
                                    <li>Deployment runbook review and live demonstration</li>
                                    <li>On-call handover: monitoring alerts and escalation paths</li>
                                    <li>Codebase orientation session for incoming team members</li>
                                    <li>Final QA and user acceptance testing cycle</li>
                                    <li>60-day post-handover bug fix support at no added cost</li>
                                </ul>
                            </div>
                            <div className="detail-column deliverables">
                                <h4>What You Receive</h4>
                                <ul>
                                    <li>Complete source code with full commit history</li>
                                    <li>Architecture Decision Records for every major choice made</li>
                                    <li>Database schema documentation and migration history</li>
                                    <li>Deployment runbooks for all environments (dev / staging / prod)</li>
                                    <li>Engineer onboarding guide for your team's future hires</li>
                                    <li>60-day post-delivery support included in contract</li>
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
                        <h2>Quality Assurance at Every Phase</h2>
                        <p>
                            Testing is not a phase that happens at the end — it is a constraint applied at
                            every step. No remediation code ships without a corresponding automated test.
                            No high-risk refactor is attempted without a regression safety net already
                            in place. Every production deployment is validated in staging first, with an
                            automated rollback trigger if the health check fails after deployment.
                        </p>
                        <div className="qa-points">
                            <div className="qa-point">
                                <h4>Automated Testing</h4>
                                <p>PestPHP 3 unit and feature tests with CI enforcement. No merge without green tests. Coverage tracked sprint-over-sprint.</p>
                            </div>
                            <div className="qa-point">
                                <h4>Security Review</h4>
                                <p>OWASP ZAP scanning on every staging deployment. Dependency vulnerability alerts integrated into CI pipeline.</p>
                            </div>
                            <div className="qa-point">
                                <h4>Performance Validation</h4>
                                <p>k6 load testing before and after each major architectural change to verify no regression in response time or throughput.</p>
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
                        <h2>Fixed-Price Milestone Payments</h2>
                        <p className="payment-intro">
                            Every phase of a BKX Labs engagement is quoted on a fixed-price basis before work begins.
                            No hourly billing, no scope creep surprises, no invoice you weren't expecting.
                            Your finance team always has a defined commitment before we touch anything.
                        </p>
                        <div className="payment-milestones">
                            <div className="milestone">
                                <div className="milestone-percent">1</div>
                                <h4>Diagnostic Audit</h4>
                                <p>100% paid upfront. Fixed price. Delivers a written Technical Health Report regardless of whether the engagement continues.</p>
                            </div>
                            <div className="milestone">
                                <div className="milestone-percent">2</div>
                                <h4>Triage & Stabilization</h4>
                                <p>Fixed-price based on Critical and High severity findings from the audit. Quoted before sprint 1 begins.</p>
                            </div>
                            <div className="milestone">
                                <div className="milestone-percent">3</div>
                                <h4>Modernization Retainer</h4>
                                <p>Fixed monthly fee. Sprint scope agreed before each cycle. Cancel with 30 days' notice — no exit penalties.</p>
                            </div>
                        </div>
                        <p className="payment-note">
                            <em>All contracts include a mutual NDA and full IP assignment clause. You own everything we build.</em>
                        </p>
                    </div>
                </Container>
            </Section>
        </div>
    );
};

export default Process;
