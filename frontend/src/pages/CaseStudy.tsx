import { useState, useRef } from 'react';
import Hero from '../components/ui/Hero';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import { X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import './CaseStudy.css';

const SOLAR_SYSTEMS = [
    {
        title: 'Web Development',
        rings: [
            { size: 170, duration: 25, dir: 'normal', counterDir: 'reverse', items: ['React 18', 'Laravel 11', 'Node.js'] },
            { size: 270, duration: 35, dir: 'reverse', counterDir: 'normal', items: ['Vue.js 3', 'TypeScript', 'Next.js', 'PHP 8.3'] },
            { size: 370, duration: 45, dir: 'normal', counterDir: 'reverse', items: ['Python', 'Livewire', 'Inertia.js', 'TailwindCSS'] }
        ]
    },
    {
        title: 'App Development',
        rings: [
            { size: 170, duration: 25, dir: 'reverse', counterDir: 'normal', items: ['Flutter', 'React Native'] },
            { size: 270, duration: 35, dir: 'normal', counterDir: 'reverse', items: ['Swift', 'Kotlin', 'Dart'] },
            { size: 370, duration: 45, dir: 'reverse', counterDir: 'normal', items: ['Firebase', 'SQLite', 'Realm', 'CoreData'] }
        ]
    },
    {
        title: 'Infrastructure & Data',
        rings: [
            { size: 170, duration: 25, dir: 'normal', counterDir: 'reverse', items: ['AWS', 'Docker', 'PostgreSQL'] },
            { size: 270, duration: 35, dir: 'reverse', counterDir: 'normal', items: ['MySQL 8', 'Redis', 'Nginx', 'GitHub Actions'] },
            { size: 370, duration: 45, dir: 'normal', counterDir: 'reverse', items: ['Elasticsearch', 'Stripe', 'Twilio', 'SendGrid'] }
        ]
    }
];

const CATEGORIES = ['All', 'Rescue & Audit', 'Greenfield', 'Integrations & APIs'];

interface Project {
    id: number;
    num: string;
    name: string;
    category: string;
    industry: string;
    region: string;
    year: string;
    challenge: string;
    solution: string;
    outcome: string[];
    stack: string;
}

const projects: Project[] = [
    {
        id: 1, num: '001', name: 'Class Moalimy', category: 'Rescue & Audit',
        industry: 'EdTech Platform', region: 'Saudi Arabia', year: '2025',
        challenge: 'Inherited a 20% complete codebase abandoned by a prior team. Exposed AWS credentials, no role-based access control, a missing authentication flow, and an unnormalized database schema throughout.',
        solution: 'Phase-gated audit and recovery. Rotated all credentials on day one, rebuilt RBAC with four roles, restructured the database schema, and delivered the remaining 80% of the platform in production-grade Laravel and React.',
        outcome: ['100% of the project delivered on schedule', '40% reduction in AWS infrastructure cost', 'Average response time under 200ms', 'Zero security incidents post-launch'],
        stack: 'Laravel 10 / React / TypeScript / MySQL / AWS S3 / CloudFront / Redis / Docker / GitHub Actions',
    },
    {
        id: 2, num: '002', name: 'LocaGed', category: 'Rescue & Audit',
        industry: 'Document Management', region: 'Multi-language', year: '2025',
        challenge: '35% complete enterprise DMS stalled for over 6 months. Non-functional OCR integration, MySQL-based search producing 10-second query times, no RTL language support, and memory leaks in document processing workers.',
        solution: 'Rebuilt the document processing pipeline on Redis queues, migrated search to Elasticsearch with custom Arabic analyzers, and rebuilt the OCR pipeline using Tesseract with image preprocessing stages.',
        outcome: ['Search 100x faster — from 10 seconds to under 100ms', 'OCR accuracy from 65% to 94%', '5,000+ documents processed daily', '99.9% uptime since launch'],
        stack: 'Laravel 10 / Vue.js / Elasticsearch / Redis / Tesseract OCR / PostgreSQL / MinIO / Laravel Horizon / Nginx',
    },
    {
        id: 3, num: '003', name: 'PulseHR', category: 'Rescue & Audit',
        industry: 'HR SaaS', region: 'Europe', year: '2025',
        challenge: '60% complete HR management SaaS with a broken payroll calculation engine and no audit trail. The CI/CD pipeline was non-functional, blocking all production deployments for three months.',
        solution: 'Fixed the payroll engine with comprehensive PestPHP test coverage on all calculation paths, rebuilt the CI/CD pipeline from scratch, implemented an immutable audit log, and completed all remaining features.',
        outcome: ['Zero payroll calculation errors since go-live', 'Full CI/CD pipeline with automated rollback', 'Audit trail on 100% of write operations', 'Delivered to production in three weeks'],
        stack: 'Laravel 11 / React / MySQL / GitHub Actions / PestPHP / Sentry',
    },
    {
        id: 4, num: '004', name: 'BuildTrack Pro', category: 'Rescue & Audit',
        industry: 'Construction SaaS', region: 'UAE', year: '2025',
        challenge: 'Construction project management system with multiple critical security vulnerabilities: SQL injection endpoints, unauthenticated API routes, and plaintext credential storage in the database.',
        solution: 'Full security audit using PHPStan Level 9 and OWASP ZAP, sealed all injection vulnerabilities, migrated to bcrypt credential storage, and added API authentication middleware across all routes.',
        outcome: ['All OWASP Top 10 vulnerabilities resolved', 'API authentication on 100% of routes', 'Security report delivered to client board', 'Zero incidents in 12 months post-rescue'],
        stack: 'Laravel 9 / jQuery / MySQL / Docker / OWASP ZAP / PHPStan',
    },
    {
        id: 5, num: '005', name: 'MedVault', category: 'Rescue & Audit',
        industry: 'Healthcare Records', region: 'UK', year: '2025',
        challenge: 'Healthcare records platform storing patient health information without encryption, no access logging, broken session management, and a missing patient consent tracking system required for GDPR compliance.',
        solution: 'Implemented field-level encryption for all PHI using AWS KMS, rebuilt session management with proper expiry, added a full consent management module, and established access logs for every record read.',
        outcome: ['Full GDPR compliance achieved', 'Field-level encryption on all patient data', 'Consent tracking on 100% of records', 'Access audit log retained for 7 years'],
        stack: 'Laravel 10 / React / PostgreSQL / Redis / AWS KMS / Docker',
    },
    {
        id: 6, num: '006', name: 'ClearLedger', category: 'Rescue & Audit',
        industry: 'FinTech Accounting', region: 'Singapore', year: '2026',
        challenge: 'Accounting SaaS with double-entry ledger inconsistencies caused by a race condition in concurrent transaction processing. Financial reports produced incorrect balances under load.',
        solution: 'Identified the race condition through k6 load testing, implemented database-level locking and idempotency keys on all financial transactions, and rebuilt the reporting engine on a read replica.',
        outcome: ['Zero ledger inconsistencies under full concurrent load', 'Idempotency on 100% of transactions', 'Report generation time down 85%', 'Passed external financial audit'],
        stack: 'Laravel 11 / Vue.js / PostgreSQL / Redis / k6 / Laravel Horizon',
    },
    {
        id: 7, num: '007', name: 'LexCore', category: 'Rescue & Audit',
        industry: 'Legal Workflow', region: 'Canada', year: '2026',
        challenge: 'Legal document management platform with severe N+1 query problems causing page loads exceeding 30 seconds. The system was unusable in production for firms managing more than 500 documents.',
        solution: 'Profiled all queries with Laravel Telescope, eliminated N+1 patterns through eager loading, introduced a Redis caching layer on all hot reads, and optimized all missing database indexes.',
        outcome: ['Average page load under 400ms', 'Query count reduced by 93%', 'Supports 50,000+ documents without degradation', 'Zero performance complaints post-rescue'],
        stack: 'Laravel 10 / React / MySQL / Redis / Laravel Telescope / GitHub Actions',
    },
    {
        id: 8, num: '008', name: 'FleetOps', category: 'Rescue & Audit',
        industry: 'Logistics', region: 'Pakistan', year: '2026',
        challenge: 'Fleet management platform with a synchronous job processing architecture causing HTTP timeouts during vehicle tracking updates. Queue workers were crashing silently with no monitoring in place.',
        solution: 'Migrated all heavy operations to Laravel Horizon queues, added Sentry monitoring with automatic worker restart on crash, and implemented retry logic with exponential backoff on all queued jobs.',
        outcome: ['Zero HTTP timeouts on tracking endpoints', 'Worker crash rate reduced to zero', '10,000+ vehicles tracked in real time', 'Job failure rate under 0.01%'],
        stack: 'Laravel 10 / Vue.js / MySQL / Redis / Laravel Horizon / Sentry / Docker',
    },
    {
        id: 9, num: '009', name: 'StoreBridge', category: 'Rescue & Audit',
        industry: 'E-commerce Integration', region: 'Germany', year: '2026',
        challenge: 'E-commerce sync layer connecting Shopify, WooCommerce, and a custom ERP. The abandoned codebase had partial implementations of all three connectors with no shared abstraction and no error handling.',
        solution: 'Designed a unified connector interface, completed all three integrations with circuit breaker patterns and retry queues, and implemented a reconciliation job to catch missed sync events.',
        outcome: ['Three connectors live in production', 'Order sync latency under 5 seconds', 'Reconciliation catches 100% of missed events', 'Zero data loss incidents since launch'],
        stack: 'Laravel 11 / React / MySQL / Redis / Shopify API / WooCommerce API / GitHub Actions',
    },
    {
        id: 10, num: '010', name: 'NomadDesk', category: 'Rescue & Audit',
        industry: 'Remote Work SaaS', region: 'Netherlands', year: '2026',
        challenge: 'Remote workspace booking platform with a broken multi-tenant authentication system. Tenant data was leaking across sessions, creating an active GDPR-critical security incident risk.',
        solution: 'Immediate isolation of tenant data via database-level row policies, rebuilt authentication with proper tenant scoping, and added automated tests asserting tenant isolation on all data access paths.',
        outcome: ['Tenant isolation verified on 100% of data access paths', 'Zero cross-tenant data leaks', 'Rebuilt auth system passed third-party penetration test', 'Emergency rescue completed in 48 hours'],
        stack: 'Laravel 10 / React / PostgreSQL / Redis / PestPHP / Docker',
    },
    {
        id: 11, num: '011', name: 'PortalGov', category: 'Rescue & Audit',
        industry: 'Government Portal', region: 'Middle East', year: '2025',
        challenge: 'Citizen-facing government portal that failed a security audit from the national cybersecurity authority. Sixteen critical and high-severity findings required resolution before the public go-live date.',
        solution: 'Systematic remediation of all 16 findings within a fixed government timeline, including XSS sanitization, CSRF protection, broken object-level authorization fixes, and rate limiting on public endpoints.',
        outcome: ['All 16 critical and high findings resolved', 'Passed national cybersecurity authority audit on second review', 'On-time public go-live met', '50,000+ citizens registered in first month'],
        stack: 'Laravel 10 / React / MySQL / Nginx / OWASP ZAP / PHPStan / Docker',
    },
    {
        id: 12, num: '012', name: 'AcadeLink', category: 'Rescue & Audit',
        industry: 'University LMS', region: 'Africa', year: '2026',
        challenge: 'University learning management system 45% complete after 14 months of development. The gradebook engine had fundamental design flaws making weighted grade calculations impossible to implement correctly.',
        solution: 'Rewrote the gradebook as a standalone, fully tested calculation engine supporting weighted categories, curves, and extra credit. Completed the remaining 55% of the platform over 8 two-week sprints.',
        outcome: ['100% of the platform delivered on schedule', 'Gradebook supports 12 grading models', '3,000+ students active at launch', 'Zero calculation errors reported in first full semester'],
        stack: 'Laravel 11 / React / TypeScript / MySQL / Redis / PestPHP / AWS S3',
    },
    {
        id: 13, num: '013', name: 'Rezgo Booking', category: 'Greenfield',
        industry: 'Tourism and Activities', region: 'North America', year: '2026',
        challenge: 'Tour operator needed a custom booking engine integrating real-time availability from 12 distinct activity providers. No off-the-shelf solution could handle the provider-specific availability rules engine.',
        solution: 'Built a provider-agnostic booking engine with a rule-based availability resolver, real-time inventory reservation with pessimistic locking, and a multi-currency checkout powered by Stripe Payment Intents.',
        outcome: ['12 providers integrated at launch', 'Booking confirmation under 800ms', '99.95% availability SLA met', '35% revenue increase in first quarter post-launch'],
        stack: 'Laravel 11 / React / TypeScript / MySQL / Redis / Stripe / PestPHP / GitHub Actions',
    },
    {
        id: 14, num: '014', name: 'InvoiceFlow', category: 'Greenfield',
        industry: 'Invoicing SaaS', region: 'Global', year: '2026',
        challenge: 'Sole trader and small business invoicing tool needed to handle recurring billing, multi-currency, PDF generation, and tax rule calculation across 40 tax jurisdictions from the first day of launch.',
        solution: 'Built on Laravel with a tax rule engine reading from a configurable JSON schema per jurisdiction, Gotenberg for PDF generation, Stripe Billing for recurring invoices, and a React frontend.',
        outcome: ['40 tax jurisdictions supported at launch', '100% automated recurring billing', 'PDF generation under 800ms', '2,000 invoices sent in first month'],
        stack: 'Laravel 11 / React / TypeScript / PostgreSQL / Stripe Billing / Gotenberg / Docker',
    },
    {
        id: 15, num: '015', name: 'GrainWatch', category: 'Greenfield',
        industry: 'AgriTech IoT', region: 'South Asia', year: '2026',
        challenge: 'Agricultural cooperative needed real-time monitoring of grain storage conditions across 200 silos. Sensor data arriving at 15-second intervals needed to be visualized, alerted on, and stored efficiently at scale.',
        solution: 'Built a time-series ingestion pipeline processing 200 sensors at 4 readings per minute, with a WebSocket push layer for real-time dashboard updates and configurable alert thresholds per silo.',
        outcome: ['200 silos monitored in real time', 'Alert latency under 3 seconds', '18 months of historical data retained', 'Three spoilage incidents prevented in first season'],
        stack: 'Laravel 11 / React / TimescaleDB / Redis / WebSockets / Docker / MQTT',
    },
    {
        id: 16, num: '016', name: 'EventHQ', category: 'Greenfield',
        industry: 'Event Management', region: 'UK', year: '2026',
        challenge: 'Event organizer needed a white-label ticketing platform that could handle flash sales with concurrent seat reservation without overselling or double-booking under high demand.',
        solution: 'Implemented seat reservation with Redis atomic operations and a 10-minute hold period, Stripe Payment Intents for concurrent checkout safety, and a QR code admission scanning system.',
        outcome: ['Zero overselling incidents across 40+ events', 'Handles 500 concurrent checkouts', 'QR admission scanning under 200ms', '10,000+ tickets sold in first three months'],
        stack: 'Laravel 11 / React / MySQL / Redis / Stripe / GitHub Actions / PestPHP',
    },
    {
        id: 17, num: '017', name: 'ShiftSync', category: 'Greenfield',
        industry: 'Hospitality SaaS', region: 'Australia', year: '2025',
        challenge: 'Hospitality group needed staff scheduling software handling complex availability rules, award rate calculations, and shift swap approvals across 12 venues simultaneously.',
        solution: 'Built a constraint-based schedule builder with availability conflict detection, an award rate calculator for 8 employment categories, and a real-time shift swap approval workflow via Pusher.',
        outcome: ['12 venues live at launch', 'Award rate accuracy verified by external payroll auditor', 'Scheduling time reduced by 70%', '400+ staff active on the platform'],
        stack: 'Laravel 11 / React / TypeScript / MySQL / Redis / Pusher / Docker',
    },
    {
        id: 18, num: '018', name: 'PayBridge', category: 'Integrations & APIs',
        industry: 'Payment Unification', region: 'Global', year: '2026',
        challenge: 'Enterprise retailer had four separate payment gateways with no unified transaction record, no automated reconciliation, and no central refund management — all handled manually.',
        solution: 'Built a payment unification layer with a single transaction model abstracted over all four gateways, automated daily reconciliation against gateway statements, and a unified refund API.',
        outcome: ['Four gateways unified under one API', 'Daily reconciliation fully automated', 'Refund processing time reduced 85%', 'Single transaction record for all payment methods'],
        stack: 'Laravel 11 / React / PostgreSQL / Stripe API / PayPal API / Adyen API / GitHub Actions',
    },
    {
        id: 19, num: '019', name: 'DataPipe', category: 'Integrations & APIs',
        industry: 'Data Integration', region: 'Europe', year: '2025',
        challenge: 'Manufacturing company had six legacy systems built across 15 years with no shared data model. Manual CSV exports were the only integration method, consuming 40+ hours of staff time per week.',
        solution: 'Built a bidirectional ETL pipeline with a canonical data model, field-level transformation mappings per system, change-data-capture from the ERP, and a full reconciliation audit trail.',
        outcome: ['Six systems integrated without code changes to any legacy system', 'Data latency under 60 seconds', 'Zero manual CSV exports since go-live', '100% audit trail on all data flows'],
        stack: 'Laravel 11 / PostgreSQL / Redis / Laravel Horizon / Docker / REST APIs / SFTP',
    },
    {
        id: 20, num: '020', name: 'NotifyNet', category: 'Integrations & APIs',
        industry: 'Notification Service', region: 'Global', year: '2026',
        challenge: 'SaaS company had notification logic scattered across six microservices, each with its own provider integration, leading to duplicate sends, missing deliveries, and no central delivery reporting.',
        solution: 'Extracted all notification logic into a dedicated microservice with provider abstraction over SendGrid, Twilio, and Firebase, idempotency on all sends, and a delivery status webhook aggregator.',
        outcome: ['100% of notifications routed through one service', 'Zero duplicate sends since launch', 'Delivery tracking on 100% of notifications', 'Provider failover in under 2 seconds'],
        stack: 'Laravel 11 / MySQL / Redis / SendGrid / Twilio / Firebase / Docker / GitHub Actions',
    },
    {
        id: 21, num: '021', name: 'AuthProxy', category: 'Integrations & APIs',
        industry: 'Enterprise SSO', region: 'Germany', year: '2026',
        challenge: 'Enterprise client had 11 internal tools each with a separate user database and login system. Password sprawl and the absence of central deprovisioning was a documented security and compliance risk.',
        solution: 'Implemented an OIDC-compliant SSO middleware layer, migrated all 11 tools to delegate authentication, and built a central user lifecycle API for provisioning and instant deprovisioning.',
        outcome: ['11 tools unified under single sign-on', 'Deprovisioning propagates in under 30 seconds', 'Passed ISO 27001 access control audit', 'User management time reduced by 90%'],
        stack: 'Laravel 11 / React / PostgreSQL / Redis / OIDC / LDAP / Docker / GitHub Actions',
    },
    {
        id: 22, num: '022', name: 'SyncCore', category: 'Integrations & APIs',
        industry: 'ERP Synchronization', region: 'UAE', year: '2026',
        challenge: 'Retail chain running three ERP systems across regions had inventory desync causing overselling, ghost stock, and manual correction cycles consuming 40+ hours per week across three teams.',
        solution: 'Built a real-time inventory synchronization layer with conflict resolution rules, a master-of-record hierarchy per product category, and automated daily variance reporting with alerting.',
        outcome: ['Inventory accuracy above 99.8%', 'Overselling incidents eliminated completely', '40 hours per week of manual correction removed', 'Real-time sync maintained across all three ERPs'],
        stack: 'Laravel 11 / PostgreSQL / Redis / Laravel Horizon / REST APIs / GitHub Actions',
    },
];

const WAVE_WORDS = ['50+ Projects', 'Rescue and Audit', 'Greenfield Builds', 'API Integrations', '100% Under NDA'];

const CaseStudy = () => {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Case Studies - BKX Labs Success Stories',
        description: 'Real projects showing how BKX Labs rescues stalled software projects and delivers enterprise-grade solutions.',
        hasPart: projects.map(p => ({
            '@type': 'Article',
            headline: `${p.name} - ${p.industry}`,
            description: p.challenge.slice(0, 120),
            author: { '@type': 'Organization', name: 'BKX Labs' },
        })),
    };

    const [activeFilter, setActiveFilter] = useState('All');
    const [activeProjectId, setActiveProjectId] = useState<number | null>(null);
    const drawerRef = useRef<HTMLDivElement>(null);
    const waveRef = useRef<HTMLDivElement>(null);
    const inkRef = useRef<HTMLDivElement>(null);

    const filteredProjects = activeFilter === 'All'
        ? projects
        : projects.filter(p => p.category === activeFilter);

    const activeProject = projects.find(p => p.id === activeProjectId) ?? null;

    const handleTileClick = (id: number) => {
        if (activeProjectId === id) {
            setActiveProjectId(null);
        } else {
            setActiveProjectId(id);
            setTimeout(() => {
                drawerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 80);
        }
    };

    const handleFilterChange = (filter: string) => {
        setActiveFilter(filter);
        setActiveProjectId(null);
    };

    /* Dynamic Element 1: Typographic wave — cursor X drives vertical offset per word */
    const handleWaveMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const words = waveRef.current?.querySelectorAll<HTMLSpanElement>('.cs-wave-word');
        if (!words) return;
        words.forEach((word) => {
            const rect = word.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const dist = Math.abs(e.clientX - cx);
            const lift = Math.max(0, (1 - dist / 200)) * 14;
            word.style.transform = `translateY(-${lift.toFixed(1)}px)`;
        });
    };

    const handleWaveLeave = () => {
        const words = waveRef.current?.querySelectorAll<HTMLSpanElement>('.cs-wave-word');
        words?.forEach(w => { w.style.transform = 'translateY(0px)'; });
    };

    /* Dynamic Element 2: Ink blot — cursor repositions a faint navy radial glow */
    const handleInkMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!inkRef.current) return;
        const rect = inkRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
        const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
        inkRef.current.style.setProperty('--ix', `${x}%`);
        inkRef.current.style.setProperty('--iy', `${y}%`);
    };

    return (
        <div>
            <SEO
                title="Software Rescue Portfolio | Real Project Recovery Results"
                description="22 completed projects. Forensic audits, emergency rescues, greenfield builds, and API integrations. All under mutual NDA. See scope and outcomes."
                keywords="software rescue portfolio, codebase recovery results, laravel project rescue, edtech platform recovery, enterprise software portfolio, bkx labs case studies"
                ogType="article"
                structuredData={structuredData}
            />

            {/* Hero — unchanged */}
            <Hero
                title="Success Stories"
                subtitle="Real projects. Complex challenges. Proven results."
            />

            {/* Wave header — Dynamic Element 1 */}
            <Section className="cs-wave-section">
                <Container>
                    <div
                        className="cs-wave-container"
                        ref={waveRef}
                        onMouseMove={handleWaveMove}
                        onMouseLeave={handleWaveLeave}
                    >
                        <span className="cs-label">The Portfolio</span>
                        <div className="cs-wave" aria-label="Portfolio overview">
                            {WAVE_WORDS.map((word, i) => (
                                <span key={i} className="cs-wave-word">
                                    {word}
                                    {i < WAVE_WORDS.length - 1 && (
                                        <span className="cs-wave-sep" aria-hidden="true"> · </span>
                                    )}
                                </span>
                            ))}
                        </div>
                        <p className="cs-wave-sub">
                            Every project listed is under a mutual NDA. Scope and outcomes are shared with
                            client permission. Client names and identifying details are withheld.
                        </p>
                    </div>
                </Container>
            </Section>

            {/* Filter + Grid + Drawer */}
            <div className="cs-catalogue-outer">
                <Container>
                    {/* Filter bar */}
                    <div className="cs-filter-bar" role="tablist" aria-label="Filter projects by category">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                role="tab"
                                aria-selected={activeFilter === cat}
                                className={`cs-filter-btn${activeFilter === cat ? ' active' : ''}`}
                                onClick={() => handleFilterChange(cat)}
                            >
                                {cat}
                                <span className="cs-filter-count">
                                    {cat === 'All' ? projects.length : projects.filter(p => p.category === cat).length}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Tile grid */}
                    <div className="cs-grid" role="list">
                        {filteredProjects.map(project => (
                            <div
                                key={project.id}
                                role="listitem"
                                className={`cs-tile${activeProjectId === project.id ? ' active' : ''}`}
                                onClick={() => handleTileClick(project.id)}
                                tabIndex={0}
                                aria-expanded={activeProjectId === project.id}
                                onKeyDown={e => e.key === 'Enter' && handleTileClick(project.id)}
                            >
                                <div className="cs-tile-top">
                                    <span className="cs-tile-num">{project.num}</span>
                                    <span className="cs-tile-nda">NDA</span>
                                </div>
                                <div className="cs-tile-name">
                                    <h3>{project.name}</h3>
                                </div>
                                <div className="cs-tile-bottom">
                                    <span className="cs-tile-industry">{project.industry}</span>
                                    <span className="cs-tile-year">{project.year}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Expandable drawer */}
                    {activeProject && (
                        <div className="cs-drawer" ref={drawerRef} key={activeProjectId}>
                            <div className="cs-drawer-header">
                                <div>
                                    <h2 className="cs-drawer-title">{activeProject.name}</h2>
                                    <span className="cs-drawer-meta">
                                        {activeProject.industry} · {activeProject.region} · {activeProject.year}
                                    </span>
                                </div>
                                <button
                                    className="cs-drawer-close"
                                    onClick={() => setActiveProjectId(null)}
                                    aria-label="Close project detail"
                                >
                                    Close <X size={13} strokeWidth={1.5} />
                                </button>
                            </div>

                            <p className="cs-drawer-nda">
                                This project is under a mutual NDA. The following reflects scope, approach,
                                and outcome only. Client identity and specific system details are withheld.
                            </p>

                            <div className="cs-drawer-cols">
                                <div className="cs-drawer-col">
                                    <span className="cs-label">The Challenge</span>
                                    <p className="cs-drawer-body">{activeProject.challenge}</p>
                                </div>
                                <div className="cs-drawer-col">
                                    <span className="cs-label">The Solution</span>
                                    <p className="cs-drawer-body">{activeProject.solution}</p>
                                </div>
                                <div className="cs-drawer-col">
                                    <span className="cs-label">Outcomes</span>
                                    <ul className="cs-drawer-outcomes">
                                        {activeProject.outcome.map((o, i) => (
                                            <li key={i}>{o}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="cs-drawer-stack">
                                <span className="cs-label">Technology Stack</span>
                                <p className="cs-stack-text">{activeProject.stack}</p>
                            </div>
                        </div>
                    )}
                </Container>
            </div>

            {/* Ink blot stats — Dynamic Element 2 */}
            <div
                className="cs-ink-section"
                ref={inkRef}
                onMouseMove={handleInkMove}
                style={{ '--ix': '50%', '--iy': '50%' } as React.CSSProperties}
            >
                <Container>
                    <div className="cs-stats-grid">
                        <div className="cs-stat">
                            <span className="cs-stat-value">50+</span>
                            <span className="cs-stat-label">Projects completed</span>
                        </div>
                        <div className="cs-stat-rule" aria-hidden="true" />
                        <div className="cs-stat">
                            <span className="cs-stat-value">100%</span>
                            <span className="cs-stat-label">Under mutual NDA</span>
                        </div>
                        <div className="cs-stat-rule" aria-hidden="true" />
                        <div className="cs-stat">
                            <span className="cs-stat-value">6</span>
                            <span className="cs-stat-label">Countries served</span>
                        </div>
                        <div className="cs-stat-rule" aria-hidden="true" />
                        <div className="cs-stat">
                            <span className="cs-stat-value">Zero</span>
                            <span className="cs-stat-label">Projects abandoned post-rescue</span>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Tech Stack - Solar System Architecture */}
            <section className="cs-techstack-section">
                <Container>
                    <div className="cs-techstack-header">
                        <span className="cs-label">Technology Stack</span>
                        <h2 className="cs-techstack-title">Tools we use across every engagement</h2>
                        <p className="cs-techstack-sub">
                            From legacy rescue to greenfield builds, every technology we use is chosen
                            for reliability, maintainability, and long-term cost of ownership — not trend.
                        </p>
                    </div>
                    
                    <div className="cs-solar-grid">
                        {SOLAR_SYSTEMS.map(sys => (
                            <div key={sys.title} className="cs-solar-group">
                                <h4 className="cs-solar-title">{sys.title}</h4>
                                <div className="cs-solar-system">
                                    <div className="cs-solar-sun">
                                        <img src="/logo-header.png" alt="BKX Labs Center" />
                                    </div>
                                    {sys.rings.map((ring, ringIndex) => (
                                        <div 
                                            key={ringIndex} 
                                            className="cs-solar-orbit"
                                            style={{ 
                                                '--size': `${ring.size}px`, 
                                                '--duration': `${ring.duration}s`, 
                                                '--dir': ring.dir 
                                            } as React.CSSProperties}
                                        >
                                            {ring.items.map((tech, techIndex) => {
                                                const angle = (360 / ring.items.length) * techIndex;
                                                return (
                                                    <div 
                                                        key={tech} 
                                                        className="cs-solar-planet-positioner"
                                                        style={{ 
                                                            '--angle': `${angle}deg`,
                                                            '--size': `${ring.size}px`
                                                        } as React.CSSProperties}
                                                    >
                                                        <div 
                                                            className="cs-solar-planet-counter-rotator"
                                                            style={{ 
                                                                '--duration': `${ring.duration}s`, 
                                                                '--counter-dir': ring.counterDir 
                                                            } as React.CSSProperties}
                                                        >
                                                            {tech}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* CTA */}
            <Section className="cs-cta-section">
                <Container>
                    <div className="cs-cta-inner">
                        <h2 className="cs-cta-title">Your project could be next.</h2>
                        <p className="cs-cta-body">
                            Whether your codebase is stalled, broken, or needs to be built from scratch,
                            we begin every engagement with a written Diagnostic Audit — and you own it
                            regardless of what comes next.
                        </p>
                        <div className="cs-cta-actions">
                            <Link to="/contact" className="btn btn-primary cs-cta-btn">
                                Book a Strategy Call <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                            </Link>
                            <Link to="/services" className="cs-cta-link">View our services</Link>
                        </div>
                    </div>
                </Container>
            </Section>
        </div>
    );
};

export default CaseStudy;
