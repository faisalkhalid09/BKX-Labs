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

const termsNav = termsSections.map((section, index) => ({
    id: `terms-${index + 1}`,
    label: section.title,
    index: index + 1,
}));

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
            />
            <Section>
                <Container>
                    <div id="terms-content" className="mx-auto max-w-4xl px-4 py-10 lg:py-14">
                        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm print:hidden sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--primary)]">BKX Labs Legal</p>
                                <p className="mt-1 text-sm text-[var(--text-gray)]">Read online, print, or download the text version.</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <button type="button" onClick={handleDownload} className="rounded-full bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800">Download Text</button>
                                <button type="button" onClick={() => window.print()} className="rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50">Print / Save PDF</button>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white px-5 py-8 shadow-sm sm:px-8 sm:py-10">
                            <div className="border-b border-slate-100 pb-6">
                                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--primary)]">Legal Notice</p>
                                <h2 className="mt-2 text-3xl font-black tracking-tight text-[var(--primary-dark)] sm:text-4xl">Terms of Service</h2>
                                <p className="mt-3 max-w-3xl text-base leading-relaxed text-[var(--text-gray)]">These terms cover website use, software rescue services, digital products, ownership, payment, and legal limits. The page is intentionally simple and readable, like a standard legal policy page on a major website.</p>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-2 print:hidden">
                                {termsNav.map((item) => (
                                    <a key={item.id} href={`#${item.id}`} className="rounded-full border border-slate-200 px-3.5 py-2 text-sm font-medium text-[var(--text-dark)] transition-colors hover:border-[var(--primary)] hover:bg-slate-50 hover:text-[var(--primary-dark)]">
                                        {item.index}. {item.label}
                                    </a>
                                ))}
                            </div>

                            <div className="mt-8 space-y-10">
                                {termsSections.map((section, index) => (
                                    <section key={section.title} id={termsNav[index].id} className="scroll-mt-24">
                                        <div className="flex items-center gap-3">
                                            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-black text-white">{termsNav[index].index}</span>
                                            <h3 className="text-lg font-black tracking-tight text-[var(--primary-dark)] sm:text-xl">{section.title}</h3>
                                        </div>
                                        <div className="mt-4 space-y-4 pl-12 sm:pl-14 text-sm leading-7 text-[var(--text-gray)] sm:text-[15px]">
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
