import Hero from '../components/ui/Hero';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import SEO from '../components/ui/SEO';

const privacySections = [
    {
        title: 'Information We Collect',
        body: [
            'BKX Labs collects information you voluntarily provide through forms, including name, email address, phone number, and project details.',
            'We collect standard server logs such as IP address, browser type, timestamps, and pages visited for security and operations.',
            'When you use site tools, tool inputs are processed locally in your browser and are not transmitted to our servers.'
        ]
    },
    {
        title: 'Purpose and Usage',
        body: [
            'We use submitted data to respond to enquiries, manage projects, identify users when needed, process payments, support customer communication, and improve website performance and analytics.',
            'Analytics and ad data are used to understand aggregate traffic, monitor site performance, and support monetization where enabled.'
        ]
    },
    {
        title: 'Third-Party Tools and Sharing',
        body: [
            'Verified third parties include Google Analytics, Google AdSense, Stripe, Safepay, Postmark, Resend, AWS SES, Slack, and Google services used by Socialite.',
            'Data may be shared with these providers only as needed to process payments, send messages, authenticate users, deliver ads, or maintain the service.'
        ]
    },
    {
        title: 'Retention and Security',
        body: [
            'Server log data is retained for a maximum of 30 days.',
            'We use TLS for data transmitted to the server and apply appropriate access and organisational controls. Tool inputs are processed locally and are not stored.'
        ]
    },
    {
        title: 'Cookies and Tracking',
        body: [
            'The site uses analytics cookies, AdSense cookies, and standard session or CSRF-related tokens such as XSRF-TOKEN.',
            'These tools help with login, security, analytics, and advertising. Users can control cookies through browser settings and any available consent controls.'
        ]
    },
    {
        title: 'Your Rights',
        body: [
            'Users may request access, correction, deletion, or portability of personal data by contacting contact@bkxlabs.com.',
            'We will respond within 30 days where applicable.'
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

const privacyNav = privacySections.map((section, index) => ({
    id: `privacy-${index + 1}`,
    label: section.title,
    index: index + 1,
}));

const buildPrivacyDownload = () => {
    const lines = [
        'BKX Labs Privacy Policy',
        'Last updated: July 2026',
        ''
    ];

    privacySections.forEach((section) => {
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

const PrivacyPolicy = () => {
    const handleDownload = () => {
        downloadTextFile('bkx-labs-privacy-policy.txt', buildPrivacyDownload());
    };

    return (
        <div>
            <SEO 
                title="Privacy Policy"
                description="BKX Labs Privacy Policy. Learn about the information we collect, how we use it, and your rights."
            />
            <Hero 
                title="Privacy Policy"
                subtitle="Last updated: July 2026"
            />
            <Section>
                <Container>
                    <div id="privacy-content" className="mx-auto max-w-4xl px-4 py-10 lg:py-14">
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
                                <h2 className="mt-2 text-3xl font-black tracking-tight text-[var(--primary-dark)] sm:text-4xl">Privacy Policy</h2>
                                <p className="mt-3 max-w-3xl text-base leading-relaxed text-[var(--text-gray)]">This policy explains what we collect, why we collect it, how we share it, how long we keep it, and what rights users have. The page uses the same theme as the rest of the site with simple spacing and no heavy card stacking.</p>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-2 print:hidden">
                                {privacyNav.map((item) => (
                                    <a key={item.id} href={`#${item.id}`} className="rounded-full border border-slate-200 px-3.5 py-2 text-sm font-medium text-[var(--text-dark)] transition-colors hover:border-[var(--primary)] hover:bg-slate-50 hover:text-[var(--primary-dark)]">
                                        {item.index}. {item.label}
                                    </a>
                                ))}
                            </div>

                            <div className="mt-8 space-y-10">
                                {privacySections.map((section, index) => (
                                    <section key={section.title} id={privacyNav[index].id} className="scroll-mt-24">
                                        <div className="flex items-center gap-3">
                                            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-black text-white">{privacyNav[index].index}</span>
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

export default PrivacyPolicy;
