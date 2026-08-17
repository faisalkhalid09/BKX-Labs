import { useState } from 'react';
import Hero from '../components/ui/Hero';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import SEO from '../components/ui/SEO';
import { 
    FileText, ShieldCheck, Download, Printer, Layers, 
    DollarSign, Code, CheckCircle, AlertTriangle, 
    Lock, Scale, ChevronRight, Mail, HelpCircle
} from 'lucide-react';

interface SubSection {
    subtitle: string;
    points?: string[];
    text?: string;
}

interface TermSection {
    id: string;
    num: string;
    title: string;
    icon: any;
    summary: string;
    intro?: string;
    subsections: SubSection[];
}

const termsData: TermSection[] = [
    {
        id: 'engagement-structure',
        num: '01',
        title: 'Structure of Engagements',
        icon: Layers,
        summary: 'Two-phase delivery framework separating forensic diagnostic audits from engineering implementation.',
        intro: 'BKX Labs delivers engineering services through a structured, two-phase engagement framework designed to guarantee transparency and cost predictability:',
        subsections: [
            {
                subtitle: '1.1 Phase 1: Forensic Diagnostic Audit',
                points: [
                    'Diagnostic Audits are fixed-scope, standalone assessments of the Client\'s codebase, architecture, infrastructure, and security posture.',
                    'Payment: 100% upfront payment is required prior to project kickoff and repository ingestion.',
                    'Deliverable: A comprehensive, written Technical Health Report detailing prioritized vulnerabilities, architectural bottlenecks, and itemized remediation estimates.',
                    'Ownership: The Client owns the delivered Technical Health Report outright and incurs no obligation to retain BKX Labs for implementation or remediation.'
                ]
            },
            {
                subtitle: '1.2 Phase 2: Rescue Protocol & Engineering Implementation',
                points: [
                    'Implementation, triage, refactoring, and modernization work are governed strictly by a mutually executed Statement of Work ("SOW") and Master Services Agreement ("MSA").',
                    'Estimates published on the website or marketing materials are non-binding; the formal scope, timeline, milestones, and deliverables are exclusively defined within the executed SOW.'
                ]
            }
        ]
    },
    {
        id: 'fees-payments',
        num: '02',
        title: 'Fees, Invoicing, and Milestone Payments',
        icon: DollarSign,
        summary: 'Phase-gated milestone schedule with verified staging criteria and strict non-refundability upon phase kickoff.',
        subsections: [
            {
                subtitle: '2.1 Phase-Gated Rescue Payment Structure',
                text: 'Unless explicitly altered in a signed SOW, all Rescue Protocol engagements follow a milestone-gated payment schedule:',
                points: [
                    'Milestone 1 (30% Upfront Commitment): Invoiced upon SOW execution prior to team deployment, repository staging setup, and initial triage.',
                    'Milestone 2 (35% Staging Verification): Invoiced upon deployment to an isolated staging environment and successful validation against SOW acceptance criteria and automated test suites.',
                    'Milestone 3 (35% Final Deployment & Handover): Invoiced upon production promotion, final sign-off, and initiation of the 30-Day Defect Warranty.'
                ]
            },
            {
                subtitle: '2.2 Payment Terms & Non-Refundability',
                points: [
                    'Invoices are due upon receipt or within the net terms specified in the SOW.',
                    'Milestone payments represent dedicated engineering resource allocation and completed forensic/development phases; milestone payments are non-refundable once the associated milestone phase has commenced.'
                ]
            }
        ]
    },
    {
        id: 'source-ip',
        num: '03',
        title: 'Source Code Access, Staging, & Intellectual Property (IP)',
        icon: Code,
        summary: 'Isolated staging safety, continuous repository visibility, and complete custom IP assignment upon invoice settlement.',
        subsections: [
            {
                subtitle: '3.1 Staging Environment & Continuous Visibility',
                points: [
                    'BKX Labs performs all triage, refactoring, and development on isolated staging branches or dedicated staging environments. Production environments are never modified directly without explicit Client sign-off.',
                    'The Client is granted continuous read access to the designated development/staging repository branches throughout the project lifecycle to ensure full transparency.'
                ]
            },
            {
                subtitle: '3.2 Intellectual Property Assignment',
                points: [
                    'Background IP: BKX Labs retains all right, title, and interest in its pre-existing proprietary tools, scripts, automated testing harnesses, and generic utility libraries. BKX Labs grants the Client a perpetual, non-exclusive, royalty-free license to use any Background IP embedded in the deliverables.',
                    'Custom Deliverables: Upon full settlement of all milestone invoices outlined in the SOW, BKX Labs assigns to the Client all right, title, and interest (including worldwide intellectual property and copyright) in the custom code, architecture runbooks, and documentation authored specifically for the Client under that SOW.'
                ]
            }
        ]
    },
    {
        id: 'acceptance-criteria',
        num: '04',
        title: 'Acceptance Criteria and Project Handover',
        icon: CheckCircle,
        summary: 'Objective acceptance testing against automated test suites and a five-day formal review window.',
        subsections: [
            {
                subtitle: '4.1 Objective Acceptance Testing',
                points: [
                    'Each SOW must contain objective, measurable acceptance criteria (e.g., passing unit/integration suites, specific response-time latency under simulated load, error-free staging build pipelines).',
                    'Upon notification of milestone completion, the Client has five (5) business days ("Review Period") to verify the deliverables against the SOW acceptance criteria.'
                ]
            },
            {
                subtitle: '4.2 Deemed Acceptance',
                points: [
                    'If the Client does not submit a written rejection specifying non-conformities within the Review Period, or promotes the delivered code to a live production environment, the milestone is deemed accepted.'
                ]
            }
        ]
    },
    {
        id: 'defect-warranty',
        num: '05',
        title: '30-Day Code Defect Warranty & Support Boundaries',
        icon: ShieldCheck,
        summary: 'Comprehensive 30-day warranty on direct regressions with explicit demarcation of billable out-of-scope requests.',
        subsections: [
            {
                subtitle: '5.1 Scope of the 30-Day Defect Warranty',
                text: 'BKX Labs provides a thirty (30) calendar day warranty starting immediately upon execution of the Final Handover Sign-off or production deployment. This warranty covers the following at no additional cost:',
                points: [
                    'Direct regressions introduced exclusively into files or modules created or modified by BKX Labs under the SOW.',
                    'Failure of modified code to satisfy the explicit, written acceptance criteria defined in the SOW.'
                ]
            },
            {
                subtitle: '5.2 Exclusions & Billable Support Demarcation',
                text: 'The following items are strictly excluded from warranty coverage and will be billed at BKX Labs\' standard engineering hourly rates:',
                points: [
                    'Pre-existing legacy defects located in untouched or out-of-scope modules.',
                    'Infrastructure, hosting, network, or third-party service failures (e.g., AWS downtime, third-party API breaking changes, DNS misconfigurations).',
                    'Any defect or regression resulting from code modifications made by the Client\'s internal team, third-party contractors, or external automated systems after handover. Any unauthorized modification to remediated code immediately voids the warranty for that specific module.',
                    'New feature requests, scope changes, performance optimizations beyond SOW thresholds, or major framework version upgrades.'
                ]
            }
        ]
    },
    {
        id: 'client-responsibilities',
        num: '06',
        title: 'Client Responsibilities & Safe Access',
        icon: AlertTriangle,
        summary: 'Requirements for sanitized staging credentials, zero raw PII/PHI transmission, and client backup obligations.',
        subsections: [
            {
                subtitle: '6.1 Provisioning of Access',
                points: [
                    'The Client is solely responsible for providing isolated staging credentials, code repository access, API sandbox keys, and sanitized test data.',
                    'The Client must NOT provide raw, un-sanitized Personally Identifiable Information (PII), protected health data (PHI), or live production payment credentials unless explicitly agreed under a signed Data Processing Addendum (DPA).'
                ]
            },
            {
                subtitle: '6.2 Backups and Recovery',
                points: [
                    'While BKX Labs implements safety branches and staging pipelines, the Client maintains the ultimate obligation to maintain independent, restorable backups of its production databases, source code, and infrastructure prior to any deployment.'
                ]
            }
        ]
    },
    {
        id: 'liability-limits',
        num: '07',
        title: 'Warranties, Disclaimers, and Limitation of Liability',
        icon: Scale,
        summary: 'Standard AS IS tool disclaimers and aggregate liability capped at fees paid in preceding 3 months.',
        subsections: [
            {
                subtitle: '7.1 Express Warranty Disclaimer',
                points: [
                    'Except as expressly provided in these Terms or an executed SOW, services and tools are provided "AS IS." BKX Labs disclaims all other warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement.'
                ]
            },
            {
                subtitle: '7.2 Aggregate Liability Cap',
                points: [
                    'To the maximum extent permitted by applicable law, in no event shall BKX Labs, its directors, employees, or contractors be liable for any indirect, incidental, special, consequential, or punitive damages (including loss of profits, data, revenue, or business interruption).',
                    'The total aggregate liability of BKX Labs arising out of or related to any engagement shall not exceed the total fees actually paid by the Client to BKX Labs under the specific SOW or Invoice giving rise to the claim during the three (3) months preceding the incident.'
                ]
            }
        ]
    },
    {
        id: 'confidentiality-nda',
        num: '08',
        title: 'Confidentiality & Mutual NDA',
        icon: Lock,
        summary: 'Strict confidentiality obligations protecting client codebases, trade secrets, and business logic.',
        subsections: [
            {
                subtitle: '8.1 Protection of Confidential Information',
                points: [
                    'Both parties agree to hold all proprietary codebases, trade secrets, architectural schematics, financial terms, and business logic in strict confidence, applying at least the degree of care used to protect their own confidential data (and no less than reasonable care).'
                ]
            },
            {
                subtitle: '8.2 Permitted Disclosures',
                points: [
                    'Confidential information may be disclosed only to employees, vetted contractors, and legal/financial advisors who need to know such information for the execution of the SOW and who are bound by confidentiality obligations at least as restrictive as these Terms.'
                ]
            }
        ]
    },
    {
        id: 'termination',
        num: '09',
        title: 'Termination',
        icon: FileText,
        summary: '14-day notice for convenience and 10-day cure window for material breach.',
        subsections: [
            {
                subtitle: '9.1 Termination for Convenience',
                points: [
                    'Either party may terminate an SOW upon fourteen (14) days\' prior written notice. Upon termination, the Client shall immediately pay BKX Labs for all work performed and milestone progress achieved up to the effective date of termination.'
                ]
            },
            {
                subtitle: '9.2 Termination for Cause',
                points: [
                    'Either party may terminate immediately if the other party breaches a material provision of these Terms or the SOW and fails to cure such breach within ten (10) business days of receiving written notice.'
                ]
            }
        ]
    },
    {
        id: 'governing-law',
        num: '10',
        title: 'Governing Law & Dispute Resolution',
        icon: Scale,
        summary: 'Executive mediation followed by binding commercial arbitration under governing jurisdiction.',
        subsections: [
            {
                subtitle: '10.1 Applicable Law & Arbitration',
                points: [
                    'These Terms and any related agreements shall be governed by and construed in accordance with the laws of the jurisdiction specified in your signed SOW (or, in the absence of a specific clause, the laws of Delaware, USA, or the operating jurisdiction of BKX Labs), without regard to conflict of law principles.',
                    'Any dispute arising under these Terms shall be resolved first via good-faith executive mediation, and if unresolved, through binding arbitration under standard commercial arbitration rules.'
                ]
            }
        ]
    }
];

const buildTermsDownload = () => {
    const lines = [
        'BKX LABS TERMS OF SERVICE',
        'Effective Date: August 17, 2026',
        'Last Updated: August 17, 2026',
        '',
        'Welcome to BKX Labs ("Company," "we," "us," or "our"). These Terms of Service ("Terms") govern your access to and use of our website (bkxlabs.com), online compliance assessment tools, technical audits, legacy software rescue, and engineering services.',
        '',
        'By accessing our website, purchasing an audit, or executing a Statement of Work ("SOW"), you ("Client," "you") agree to be bound by these Terms and any incorporated Master Services Agreement ("MSA").',
        '',
        '--------------------------------------------------------------------------------',
        ''
    ];

    termsData.forEach((section) => {
        lines.push(`SECTION ${section.num}: ${section.title.toUpperCase()}`);
        lines.push(`Summary: ${section.summary}`);
        lines.push('');
        if (section.intro) {
            lines.push(section.intro);
            lines.push('');
        }
        section.subsections.forEach((sub) => {
            lines.push(sub.subtitle);
            if (sub.text) {
                lines.push(sub.text);
            }
            if (sub.points) {
                sub.points.forEach((p) => lines.push(`  - ${p}`));
            }
            lines.push('');
        });
        lines.push('--------------------------------------------------------------------------------');
        lines.push('');
    });

    lines.push('CONTACT INFORMATION');
    lines.push('BKX Labs Legal Operations');
    lines.push('Email: contact@bkxlabs.com');
    lines.push('Website: https://bkxlabs.com/');

    return lines.join('\n');
};

const downloadTextFile = (fileName: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
};

const TermsOfService = () => {
    const [activeSection, setActiveSection] = useState<string>(termsData[0].id);

    const handleDownload = () => {
        downloadTextFile('bkx-labs-terms-of-service.txt', buildTermsDownload());
    };

    const scrollToSection = (id: string) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -100;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-[var(--secondary)] min-h-screen relative overflow-hidden">
            {/* Background ambient accents */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--primary)] rounded-full mix-blend-multiply filter blur-[140px] opacity-15 pointer-events-none"></div>
            <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[var(--accent)] rounded-full mix-blend-multiply filter blur-[140px] opacity-15 pointer-events-none"></div>

            <SEO 
                title="Terms of Service | BKX Labs"
                description="BKX Labs Terms of Service. Review our engagement structures, milestone payment terms, IP assignment policies, and 30-Day Code Defect Warranty."
            />
            
            <Hero 
                title="Terms of Service | BKX Labs"
                subtitle="Clear, deterministic legal frameworks governing software rescue, diagnostic audits, IP transfer, and engineering warranties."
            />

            <Section className="relative z-10 pt-4 pb-20">
                <Container>
                    <div className="mx-auto max-w-6xl px-4 sm:px-6">
                        
                        {/* Meta & Document Control Card */}
                        <div className="glass-panel p-6 sm:p-8 mb-10 border border-slate-200/70 shadow-lg rounded-2xl bg-white/80 backdrop-blur-md">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/60">
                                            Enterprise Legal Terms
                                        </span>
                                        <span className="text-xs text-slate-500 font-medium">
                                            Standard Agreement v2.6
                                        </span>
                                    </div>
                                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                                        Terms of Service: Operational Framework
                                    </h1>
                                    <p className="text-sm text-slate-600 mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                                        <span><strong>Effective Date:</strong> August 17, 2026</span>
                                        <span>•</span>
                                        <span><strong>Last Updated:</strong> August 17, 2026</span>
                                        <span>•</span>
                                        <span><strong>Official Inquiries:</strong> contact@bkxlabs.com</span>
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-3 print:hidden">
                                    <button 
                                        type="button" 
                                        onClick={handleDownload} 
                                        className="btn btn-primary px-5 py-2.5 text-sm !rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                                    >
                                        <Download size={16} />
                                        <span>Download Plaintext</span>
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={() => window.print()} 
                                        className="btn btn-secondary px-5 py-2.5 text-sm !rounded-xl transition-all duration-300 flex items-center gap-2"
                                    >
                                        <Printer size={16} />
                                        <span>Print / PDF</span>
                                    </button>
                                </div>
                            </div>

                            <hr className="my-6 border-slate-200" />

                            <div className="text-sm sm:text-base text-slate-700 leading-relaxed bg-slate-50/70 p-4 sm:p-5 rounded-xl border border-slate-200/50">
                                <p className="mb-2">
                                    Welcome to <strong>BKX Labs</strong> ("Company," "we," "us," or "our"). These Terms of Service ("Terms") govern your access to and use of our website (<a href="https://bkxlabs.com" className="text-blue-600 underline font-medium">bkxlabs.com</a>), online compliance assessment tools, technical audits, legacy software rescue, and engineering services.
                                </p>
                                <p className="mb-0">
                                    By accessing our website, purchasing an audit, or executing a Statement of Work ("SOW"), you ("Client," "you") agree to be bound by these Terms and any incorporated Master Services Agreement ("MSA").
                                </p>
                            </div>
                        </div>

                        {/* Main Grid: Sticky Sidebar + Content Sections */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            
                            {/* Sticky Navigation Sidebar */}
                            <aside className="lg:col-span-4 lg:sticky lg:top-28 print:hidden">
                                <div className="glass-panel p-5 rounded-2xl border border-slate-200/70 shadow-md bg-white/90">
                                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200">
                                        <FileText size={18} className="text-blue-600" />
                                        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                                            Table of Contents
                                        </h2>
                                    </div>
                                    <nav className="space-y-1.5 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                                        {termsData.map((sec) => {
                                            const isSelected = activeSection === sec.id;
                                            return (
                                                <button
                                                    key={sec.id}
                                                    onClick={() => scrollToSection(sec.id)}
                                                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all duration-200 ${
                                                        isSelected 
                                                            ? 'bg-blue-600 text-white shadow-sm' 
                                                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                                    }`}
                                                >
                                                    <span className="flex items-center gap-2.5 truncate">
                                                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                                                            isSelected ? 'bg-blue-700 text-blue-100' : 'bg-slate-200 text-slate-600'
                                                        }`}>
                                                            {sec.num}
                                                        </span>
                                                        <span className="truncate">{sec.title}</span>
                                                    </span>
                                                    <ChevronRight size={14} className={isSelected ? 'opacity-100' : 'opacity-40'} />
                                                </button>
                                            );
                                        })}
                                    </nav>
                                    <div className="mt-6 pt-4 border-t border-slate-200">
                                        <a 
                                            href="mailto:contact@bkxlabs.com" 
                                            className="flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-blue-600 transition-colors"
                                        >
                                            <Mail size={14} />
                                            <span>Questions? contact@bkxlabs.com</span>
                                        </a>
                                    </div>
                                </div>
                            </aside>

                            {/* Terms Detail Content */}
                            <main className="lg:col-span-8 space-y-8">
                                {termsData.map((sec) => {
                                    const IconComponent = sec.icon;
                                    return (
                                        <article 
                                            key={sec.id} 
                                            id={sec.id} 
                                            className="scroll-mt-28 glass-panel p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-md bg-white hover:shadow-lg transition-all duration-300"
                                        >
                                            {/* Section Header */}
                                            <div className="flex items-start gap-4 mb-6">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-black text-lg shadow-md shrink-0">
                                                    <IconComponent size={22} strokeWidth={2} />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                                                            SECTION {sec.num}
                                                        </span>
                                                    </div>
                                                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                                                        {sec.title}
                                                    </h2>
                                                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                                        {sec.summary}
                                                    </p>
                                                </div>
                                            </div>

                                            {sec.intro && (
                                                <p className="text-sm sm:text-base text-slate-700 font-medium mb-5 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-200/60">
                                                    {sec.intro}
                                                </p>
                                            )}

                                            {/* Subsections */}
                                            <div className="space-y-6">
                                                {sec.subsections.map((sub, idx) => (
                                                    <div 
                                                        key={idx} 
                                                        className="p-4 sm:p-5 rounded-xl bg-slate-50/50 border border-slate-200/60 hover:bg-slate-50 transition-colors"
                                                    >
                                                        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                                                            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                                                            {sub.subtitle}
                                                        </h3>

                                                        {sub.text && (
                                                            <p className="text-sm text-slate-700 mb-3 leading-relaxed">
                                                                {sub.text}
                                                            </p>
                                                        )}

                                                        {sub.points && (
                                                            <ul className="space-y-2.5">
                                                                {sub.points.map((point, pIdx) => (
                                                                    <li key={pIdx} className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                                                                        <span className="text-blue-600 font-bold shrink-0 mt-0.5">▪</span>
                                                                        <span>{point}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </article>
                                    );
                                })}

                                {/* Bottom Contact & Legal Inquiries Card */}
                                <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 shadow-sm">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                                            <HelpCircle size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900 mb-1">
                                                Need a Tailored Master Services Agreement (MSA)?
                                            </h3>
                                            <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                                For funded startups and enterprise clients requiring custom terms, specific IP addendums, or custom SLA frameworks, please reach out to our legal operations desk.
                                            </p>
                                            <a 
                                                href="mailto:contact@bkxlabs.com" 
                                                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
                                            >
                                                <Mail size={16} />
                                                <span>Contact Legal Operations: contact@bkxlabs.com</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                            </main>
                        </div>
                    </div>
                </Container>
            </Section>
        </div>
    );
};

export default TermsOfService;
