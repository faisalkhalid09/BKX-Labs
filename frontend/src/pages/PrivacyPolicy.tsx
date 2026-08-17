import { useState } from 'react';
import Hero from '../components/ui/Hero';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import SEO from '../components/ui/SEO';
import { 
    Shield, Lock, Download, Printer, Database, 
    Server, Globe, CheckCircle, EyeOff, 
    ChevronRight, Mail, HelpCircle, FileCheck
} from 'lucide-react';

interface SubSection {
    subtitle: string;
    points?: string[];
    text?: string;
}

interface PrivacySection {
    id: string;
    num: string;
    title: string;
    icon: any;
    summary: string;
    intro?: string;
    subsections: SubSection[];
}

const privacyData: PrivacySection[] = [
    {
        id: 'information-collected',
        num: '01',
        title: 'Information We Collect',
        icon: Database,
        summary: 'Direct contact info, technical audit submissions, and stateless client-side evaluation across all public tools.',
        subsections: [
            {
                subtitle: '1.1 Information You Provide Directly',
                points: [
                    'Contact Information: Name, business email, company name, website URL, and details provided when submitting contact forms or booking discovery sessions.',
                    'Audit & Technical Submissions: Codebase metadata, repository URLs, architectural descriptions, and technical specifications submitted for diagnostic analysis.',
                    'Billing Information: Invoicing details, VAT/tax IDs, and billing addresses. (Credit card and wire processing are handled by PCI-DSS compliant third-party payment processors; we do not store raw card numbers).'
                ]
            },
            {
                subtitle: '1.2 Information Collected via Online Tools & Assessment Suites',
                points: [
                    'Our public tools (e.g., EU AI Act Classifier, Post-Quantum CBOM Evaluator, SOC 2 Readiness Checkers) operate primarily on client-side or ephemeral, stateless server-side processing.',
                    'Technical payloads, text inputs, or architecture metadata submitted into our free public assessment tools are evaluated in-memory and are NOT logged, stored, or indexed in persistent databases.'
                ]
            },
            {
                subtitle: '1.3 Automated Analytical Information',
                points: [
                    'Standard server logs: IP addresses, browser types, operating systems, referring URLs, and timestamps.',
                    'Cookies and performance telemetry: Minimal session cookies to ensure site functionality and anonymous aggregate traffic analytics.'
                ]
            }
        ]
    },
    {
        id: 'codebase-security',
        num: '02',
        title: 'Codebase Security & Client Data Processing Principles',
        icon: Lock,
        summary: 'Isolated encrypted environments, zero production PII retention, and complete 30-day post-warranty data purging.',
        intro: 'When performing a Forensic Diagnostic Audit or Rescue Protocol, BKX Labs adheres to strict enterprise security standards:',
        subsections: [
            {
                subtitle: '2.1 Codebase Ingestion & Ephemeral Storage',
                points: [
                    'Code repositories are cloned strictly into isolated, encrypted development environments accessible only by assigned senior engineering personnel.',
                    'Multi-Factor Authentication (MFA) and least-privilege role-based access control (RBAC) are strictly enforced across all repository access points.'
                ]
            },
            {
                subtitle: '2.2 Production Data Zero-Retention Policy',
                points: [
                    'BKX Labs does NOT extract, export, or store live production client database records containing consumer Personally Identifiable Information (PII) or Protected Health Information (PHI).',
                    'Clients are instructed to provide synthetic, obfuscated, or sanitized database dumps for local and staging replication.'
                ]
            },
            {
                subtitle: '2.3 Post-Engagement Data Purging',
                points: [
                    'Within thirty (30) days following the conclusion of the 30-Day Defect Warranty period (or upon written request), BKX Labs securely deletes all local development clones, static analysis artifact caches, and staging credential tokens, retaining only formal contractual documentation and invoices for tax compliance.'
                ]
            }
        ]
    },
    {
        id: 'data-usage',
        num: '03',
        title: 'How We Use Your Information',
        icon: EyeOff,
        summary: 'Solely used for technical report generation and project delivery. Zero selling, trading, or marketing monetization.',
        intro: 'We process collected information solely for:',
        subsections: [
            {
                subtitle: '3.1 Operational Processing Purposes',
                points: [
                    'Delivering and executing Diagnostic Audits, Technical Health Reports, and SOW deliverables.',
                    'Communication regarding project milestones, security notices, and administrative invoicing.',
                    'Complying with legal, tax, and regulatory obligations.',
                    'Preventing security incidents, unauthorized access, and malicious activity on our web platforms.'
                ]
            },
            {
                subtitle: '3.2 Commercial Non-Monetization Pledge',
                points: [
                    'We NEVER sell, rent, monetize, or trade client information, codebase analysis findings, or business contact details to third-party data brokers or marketing networks.'
                ]
            }
        ]
    },
    {
        id: 'third-party-processors',
        num: '04',
        title: 'Third-Party Service Providers & Sub-Processors',
        icon: Server,
        summary: 'Vetted, enterprise infrastructure partners under strict confidentiality and encryption agreements.',
        intro: 'We use vetted third-party service providers to support our operations under strict confidentiality and data protection agreements:',
        subsections: [
            {
                subtitle: '4.1 Infrastructure and Tooling Providers',
                points: [
                    'Cloud & Infrastructure Hosting: AWS / DigitalOcean / Vercel (encrypted data storage and compute).',
                    'Project & Repository Management: GitHub / GitLab (version control and staging CI/CD pipelines).',
                    'Communication & Project Tracking: Sentry (error tracking), Slack, and Google Workspace (encrypted enterprise email).',
                    'Payment Processing: Stripe / Wire Banking (PCI-compliant billing).'
                ]
            }
        ]
    },
    {
        id: 'international-compliance',
        num: '05',
        title: 'International Data Transfers & Compliance (GDPR / UK GDPR / CCPA)',
        icon: Globe,
        summary: 'Full support for data subject rights, legal bases of contract performance, and custom DPAs with Standard Contractual Clauses.',
        intro: 'For users and clients in the European Economic Area (EEA), United Kingdom, or California:',
        subsections: [
            {
                subtitle: '5.1 Legal Basis and Data Rights',
                points: [
                    'Legal Basis for Processing: We process data under the performance of a contract (delivering requested audits/rescues), legitimate business interests (site security and communications), or explicit consent.',
                    'Data Subject Rights: You have the right to access, rectify, port, or request the erasure of your personal data held by BKX Labs.',
                    'Data Processing Addendum (DPA): Enterprise clients requiring Standard Contractual Clauses (SCCs) or a tailored DPA can request execution via contact@bkxlabs.com.'
                ]
            }
        ]
    },
    {
        id: 'security-governance',
        num: '06',
        title: 'Security Governance',
        icon: Shield,
        summary: 'TLS 1.3 in-transit, AES-256 at-rest, mandatory authenticator MFA, and Zero-Trust workstation policies.',
        intro: 'BKX Labs implements industry-standard technical and organizational security controls:',
        subsections: [
            {
                subtitle: '6.1 Technical Safeguards',
                points: [
                    'End-to-end encryption in transit (TLS 1.3) and at rest (AES-256).',
                    'Mandatory hardware/authenticator MFA on all corporate infrastructure.',
                    'Zero-trust network access policies for engineering workstations.'
                ]
            }
        ]
    },
    {
        id: 'contact-dpo',
        num: '07',
        title: 'Contact Information',
        icon: Mail,
        summary: 'Dedicated Legal & Security Operations desk for privacy inquiries, DPA requests, and data deletion requests.',
        subsections: [
            {
                subtitle: '7.1 Legal & Security Operations Desk',
                text: 'For inquiries regarding these legal terms, privacy practices, or data deletion requests, contact:',
                points: [
                    'Company: BKX Labs Legal & Security Operations',
                    'Direct Email: contact@bkxlabs.com',
                    'Official Website: https://bkxlabs.com/'
                ]
            }
        ]
    }
];

const buildPrivacyDownload = () => {
    const lines = [
        'BKX LABS PRIVACY POLICY',
        'Effective Date: August 17, 2026',
        'Last Updated: August 17, 2026',
        '',
        'BKX Labs ("Company," "we," "our") values the privacy and security of our clients, website visitors, and users. This Privacy Policy describes how we collect, process, store, and protect your information when you visit bkxlabs.com, utilize our online compliance assessment tools, or engage us for codebase rescue and auditing services.',
        '',
        '--------------------------------------------------------------------------------',
        ''
    ];

    privacyData.forEach((section) => {
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
    lines.push('BKX Labs Legal & Security Operations');
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

const PrivacyPolicy = () => {
    const [activeSection, setActiveSection] = useState<string>(privacyData[0].id);

    const handleDownload = () => {
        downloadTextFile('bkx-labs-privacy-policy.txt', buildPrivacyDownload());
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
                title="Privacy Policy | BKX Labs"
                description="BKX Labs Privacy Policy. Learn about our codebase isolation, ephemeral storage, zero production PII retention, and international compliance standards."
            />

            <Hero 
                title="Privacy Policy | BKX Labs"
                subtitle="Rigorous codebase protection standards, zero production PII retention, and stateless tool architecture."
            />

            <Section className="relative z-10 pt-4 pb-20">
                <Container>
                    <div className="mx-auto max-w-6xl px-4 sm:px-6">
                        
                        {/* Meta & Document Control Card */}
                        <div className="glass-panel p-6 sm:p-8 mb-10 border border-slate-200/70 shadow-lg rounded-2xl bg-white/80 backdrop-blur-md">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                                            Data Protection Standards
                                        </span>
                                        <span className="text-xs text-slate-500 font-medium">
                                            GDPR &amp; SOC 2 Aligned
                                        </span>
                                    </div>
                                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                                        Privacy Policy: Client Data Safeguards
                                    </h1>
                                    <p className="text-sm text-slate-600 mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                                        <span><strong>Effective Date:</strong> August 17, 2026</span>
                                        <span>•</span>
                                        <span><strong>Last Updated:</strong> August 17, 2026</span>
                                        <span>•</span>
                                        <span><strong>Direct Contact:</strong> contact@bkxlabs.com</span>
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
                                <p className="mb-0">
                                    <strong>BKX Labs</strong> ("Company," "we," "our") values the privacy and security of our clients, website visitors, and users. This Privacy Policy describes how we collect, process, store, and protect your information when you visit <a href="https://bkxlabs.com" className="text-blue-600 underline font-medium">bkxlabs.com</a>, utilize our online compliance assessment tools, or engage us for codebase rescue and auditing services.
                                </p>
                            </div>
                        </div>

                        {/* Main Grid: Sticky Sidebar + Content Sections */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            
                            {/* Sticky Navigation Sidebar */}
                            <aside className="lg:col-span-4 lg:sticky lg:top-28 print:hidden">
                                <div className="glass-panel p-5 rounded-2xl border border-slate-200/70 shadow-md bg-white/90">
                                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200">
                                        <FileCheck size={18} className="text-emerald-600" />
                                        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                                            Privacy Navigation
                                        </h2>
                                    </div>
                                    <nav className="space-y-1.5 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                                        {privacyData.map((sec) => {
                                            const isSelected = activeSection === sec.id;
                                            return (
                                                <button
                                                    key={sec.id}
                                                    onClick={() => scrollToSection(sec.id)}
                                                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all duration-200 ${
                                                        isSelected 
                                                            ? 'bg-emerald-700 text-white shadow-sm' 
                                                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                                    }`}
                                                >
                                                    <span className="flex items-center gap-2.5 truncate">
                                                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                                                            isSelected ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-200 text-slate-600'
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
                                            className="flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-emerald-700 transition-colors"
                                        >
                                            <Mail size={14} />
                                            <span>Privacy Desk: contact@bkxlabs.com</span>
                                        </a>
                                    </div>
                                </div>
                            </aside>

                            {/* Privacy Detail Content */}
                            <main className="lg:col-span-8 space-y-8">
                                {privacyData.map((sec) => {
                                    const IconComponent = sec.icon;
                                    return (
                                        <article 
                                            key={sec.id} 
                                            id={sec.id} 
                                            className="scroll-mt-28 glass-panel p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-md bg-white hover:shadow-lg transition-all duration-300"
                                        >
                                            {/* Section Header */}
                                            <div className="flex items-start gap-4 mb-6">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-black text-lg shadow-md shrink-0">
                                                    <IconComponent size={22} strokeWidth={2} />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
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
                                                            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
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
                                                                        <span className="text-emerald-600 font-bold shrink-0 mt-0.5">▪</span>
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

                                {/* Bottom Compliance & DPA Requests Card */}
                                <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/60 to-teal-50/40 shadow-sm">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
                                            <CheckCircle size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900 mb-1">
                                                Enterprise Data Processing Addendums (DPAs)
                                            </h3>
                                            <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                                For enterprise engagements subject to GDPR, UK GDPR, or CCPA, custom Data Processing Addendums containing EU Standard Contractual Clauses (SCCs) and specialized security exhibits are available on request.
                                            </p>
                                            <a 
                                                href="mailto:contact@bkxlabs.com" 
                                                className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-900 transition-colors"
                                            >
                                                <Mail size={16} />
                                                <span>Request DPA or Data Deletion: contact@bkxlabs.com</span>
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

export default PrivacyPolicy;
