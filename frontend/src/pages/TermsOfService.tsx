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
            const yOffset = -120;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-white min-h-screen">
            <SEO 
                title="Terms of Service | BKX Labs"
                description="BKX Labs Terms of Service. Review our engagement structures, milestone payment terms, IP assignment policies, and 30-Day Code Defect Warranty."
            />
            
            {/* Clean Header */}
            <header className="pt-32 pb-16 bg-slate-50 border-b border-slate-200">
                <Container>
                    <div className="max-w-5xl mx-auto px-4 sm:px-6">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                            Terms of Service
                        </h1>
                        <p className="text-slate-500 font-medium text-sm sm:text-base mb-6 flex flex-wrap gap-x-4 gap-y-2">
                            <span>Effective Date: August 17, 2026</span>
                            <span className="hidden sm:inline">•</span>
                            <span>Last Updated: August 17, 2026</span>
                        </p>
                        <div className="flex flex-wrap gap-4 print:hidden">
                            <button 
                                onClick={handleDownload}
                                className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 px-4 py-2 rounded-lg"
                            >
                                <Download size={16} />
                                Download Plaintext
                            </button>
                            <button 
                                onClick={() => window.print()}
                                className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-slate-900 transition-colors bg-slate-200/50 px-4 py-2 rounded-lg"
                            >
                                <Printer size={16} />
                                Print PDF
                            </button>
                        </div>
                    </div>
                </Container>
            </header>

            {/* Main Content */}
            <Section className="py-16">
                <Container>
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
                        
                        {/* Sticky Sidebar */}
                        <aside className="hidden lg:block lg:w-64 shrink-0 lg:sticky lg:top-32 print:hidden">
                            <nav className="border-l-2 border-slate-200 flex flex-col">
                                {termsData.map(sec => (
                                    <button
                                        key={sec.id}
                                        onClick={() => scrollToSection(sec.id)}
                                        className={`text-left pl-4 py-2.5 text-sm font-semibold transition-all ${
                                            activeSection === sec.id 
                                            ? 'text-blue-600 border-l-2 border-blue-600 -ml-[2px]' 
                                            : 'text-slate-500 hover:text-slate-800'
                                }`}
                                    >
                                        {sec.title}
                                    </button>
                                ))}
                            </nav>
                            <div className="mt-8 pt-6 border-t border-slate-200">
                                <a 
                                    href="mailto:contact@bkxlabs.com" 
                                    className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
                                >
                                    <Mail size={16} />
                                    <span>Questions? Email Us</span>
                                </a>
                            </div>
                        </aside>

                        {/* Document Body */}
                        <main className="flex-1 max-w-3xl w-full">
                            <div className="text-slate-800">
                                <p className="text-base sm:text-lg leading-relaxed mb-6 font-medium">
                                    Welcome to <strong>BKX Labs</strong> ("Company," "we," "us," or "our"). These Terms of Service ("Terms") govern your access to and use of our website (bkxlabs.com), online compliance assessment tools, technical audits, legacy software rescue, and engineering services.
                                </p>
                                <p className="text-base sm:text-lg leading-relaxed mb-12 font-medium">
                                    By accessing our website, purchasing an audit, or executing a Statement of Work ("SOW"), you ("Client," "you") agree to be bound by these Terms and any incorporated Master Services Agreement ("MSA").
                                </p>

                                {termsData.map(sec => (
                                    <section key={sec.id} id={sec.id} className="scroll-mt-32 mb-16">
                                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 tracking-tight">
                                            {sec.num}. {sec.title}
                                        </h2>
                                        
                                        {sec.intro && (
                                            <p className="text-base leading-relaxed text-slate-700 mb-6">
                                                {sec.intro}
                                            </p>
                                        )}

                                        <div className="space-y-8">
                                            {sec.subsections.map((sub, idx) => (
                                                <div key={idx}>
                                                    <h3 className="text-lg font-bold text-slate-900 mb-3">
                                                        {sub.subtitle}
                                                    </h3>
                                                    {sub.text && (
                                                        <p className="text-base leading-relaxed text-slate-700 mb-4">
                                                            {sub.text}
                                                        </p>
                                                    )}
                                                    {sub.points && (
                                                        <ul className="list-disc pl-5 space-y-2 text-slate-700 marker:text-slate-400">
                                                            {sub.points.map((p, pIdx) => (
                                                                <li key={pIdx} className="leading-relaxed pl-1">
                                                                    {p}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                ))}
                            </div>
                        </main>
                    </div>
                </Container>
            </Section>
        </div>
    );
};

export default TermsOfService;
