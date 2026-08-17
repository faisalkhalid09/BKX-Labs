import { useState } from 'react';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import SEO from '../components/ui/SEO';
import { 
    Shield, Lock, Download, Printer, Database, 
    Server, Globe, EyeOff, Mail
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
            const yOffset = -120;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-white min-h-screen">
            <SEO 
                title="Privacy Policy | BKX Labs"
                description="BKX Labs Privacy Policy. Learn about our codebase isolation, ephemeral storage, zero production PII retention, and international compliance standards."
            />
            
            {/* Clean Header */}
            <header className="pt-32 pb-16 bg-slate-50 border-b border-slate-200">
                <Container>
                    <div className="max-w-5xl mx-auto px-4 sm:px-6">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                            Privacy Policy
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
                                {privacyData.map(sec => (
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
                                <p className="text-base sm:text-lg leading-relaxed mb-12 font-medium">
                                    <strong>BKX Labs</strong> ("Company," "we," "our") values the privacy and security of our clients, website visitors, and users. This Privacy Policy describes how we collect, process, store, and protect your information when you visit bkxlabs.com, utilize our online compliance assessment tools, or engage us for codebase rescue and auditing services.
                                </p>

                                {privacyData.map(sec => (
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

export default PrivacyPolicy;
