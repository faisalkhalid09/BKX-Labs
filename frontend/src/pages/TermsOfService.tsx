import Hero from '../components/ui/Hero';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import SEO from '../components/ui/SEO';

const termsSections = [
    {
        title: 'Acceptance of Terms and Service Description',
        body: [
            'By accessing or using bkxlabs.com, you agree to be bound by these Terms. If you do not agree, do not use the site.',
            'BKX Labs provides software rescue, codebase audits, recovery, modernization, and related development work under written agreement. We also provide digital software products where applicable.'
        ]
    },
    {
        title: 'User Guidelines and Acceptable Use',
        body: [
            'Users must not use the platform for illegal activity, spam, fraud, reverse engineering, redistribution, account sharing, unauthorized scraping, or claiming BKX Labs work as their own.',
            'Uploaded or user-generated content must not violate laws, rights, or security requirements.'
        ]
    },
    {
        title: 'Account Termination',
        body: [
            'BKX Labs may suspend or terminate access at its discretion for abuse, piracy, policy violations, non-payment, or security risk, with or without notice where permitted.'
        ]
    },
    {
        title: 'Intellectual Property',
        body: [
            'BKX Labs owns the platform code, branding, written content, and reusable software unless a separate written agreement says otherwise.',
            'Client-provided assets remain the client property. Custom audit, recovery, and development work should be governed by a written engagement agreement that clearly defines what transfers to the client and what remains BKX Labs property.'
        ]
    },
    {
        title: 'Payment Terms',
        body: [
            'Services are fixed-price or otherwise agreed in writing. For digital products, the site supports final sale, no refund, and limited download windows where applicable.'
        ]
    },
    {
        title: 'Limitation of Liability and Disclaimers',
        body: [
            'The site and services are provided as is, without guarantees of uptime, completeness, merchantability, or fitness for a particular purpose.',
            'BKX Labs is not liable for indirect, incidental, or consequential damages to the fullest extent allowed by law.'
        ]
    },
    {
        title: 'Governing Law',
        body: [
            'These terms are governed by the laws of Pakistan. Disputes are resolved in the courts of Lahore, Pakistan.'
        ]
    },
    {
        title: 'Contact',
        body: [
            'BKX Labs',
            'contact@bkxlabs.com'
        ]
    }
];

const buildTermsDownload = () => {
    const lines = [
        'BKX Labs Terms of Service',
        'Last updated: July 2026',
        ''
    ];

    termsSections.forEach((section) => {
        lines.push(section.title.toUpperCase());
        section.body.forEach((paragraph) => lines.push(paragraph));
        lines.push('');
    });

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
    const handleDownload = () => {
        downloadTextFile('bkx-labs-terms-of-service.txt', buildTermsDownload());
    };

    return (
        <div>
            <SEO 
                title="Terms of Service"
                description="BKX Labs Terms of Service. Read our rules, tool usage guidelines, and governing law."
            />
            <Hero 
                title="Terms of Service"
                subtitle="Last updated: July 2026"
                ctaText="Download Terms"
                ctaLink="#"
            />
            <Section>
                <Container>
                    <div className="mx-auto max-w-4xl px-4 py-8">
                        <div className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm print:hidden">
                            <button
                                type="button"
                                onClick={handleDownload}
                                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                            >
                                Download Text
                            </button>
                            <button
                                type="button"
                                onClick={() => window.print()}
                                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
                            >
                                Print / Save PDF
                            </button>
                            <span className="text-xs font-medium text-slate-500">Compact legal summary for reading or saving.</span>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                            <div className="mb-6 border-b border-slate-100 pb-5">
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">BKX Labs Legal</p>
                                <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900">Terms of Service</h2>
                                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">These terms cover website use, software rescue services, digital products, ownership, payment, and legal limits. Read carefully before using the site or engaging BKX Labs.</p>
                            </div>

                            <div className="space-y-4">
                                {termsSections.map((section) => (
                                    <section key={section.title} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:p-5">
                                        <h3 className="text-sm font-black uppercase tracking-[0.18em] text-slate-900">{section.title}</h3>
                                        <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
                                            {section.body.map((paragraph) => (
                                                <p key={paragraph}>{paragraph}</p>
                                            ))}
                                        </div>
                                    </section>
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>
        </div>
    );
};

export default TermsOfService;
