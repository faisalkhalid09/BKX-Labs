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
                    <div id="privacy-content" className="mx-auto max-w-6xl px-4 py-8">
                        <div className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm print:hidden">
                            <button type="button" onClick={handleDownload} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800">Download Text</button>
                            <button type="button" onClick={() => window.print()} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50">Print / Save PDF</button>
                            <span className="text-xs font-medium text-slate-500">Compact privacy summary for reading or saving.</span>
                        </div>

                        <div className="grid gap-6 lg:grid-cols-[1fr_250px]">
                            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                                <div className="mb-5 rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:p-5">
                                    <p className="text-[11px] font-black uppercase tracking-[0.24em] text-slate-400">BKX Labs Legal</p>
                                    <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Privacy Policy</h2>
                                    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">This policy explains what we collect, why we collect it, how we share it, how long we keep it, and what rights users have. The visual style stays compact and easy to scan.</p>
                                </div>

                                <div className="space-y-3">
                                    {privacySections.map((section, index) => (
                                        <section key={section.title} id={privacyNav[index].id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:p-5 scroll-mt-24">
                                            <div className="flex items-start gap-3">
                                                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-black text-white">{privacyNav[index].index}</span>
                                                <div className="min-w-0">
                                                    <h3 className="text-sm font-black uppercase tracking-[0.16em] text-slate-900">{section.title}</h3>
                                                    <div className="mt-2 space-y-2 text-sm leading-relaxed text-slate-700">
                                                        {section.body.map((paragraph) => (
                                                            <p key={paragraph}>{paragraph}</p>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    ))}
                                </div>
                            </div>

                            <aside className="lg:sticky lg:top-24 h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-sm print:hidden">
                                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-slate-400">On This Page</p>
                                <div className="mt-4 space-y-2">
                                    {privacyNav.map((item) => (
                                        <a key={item.id} href={`#${item.id}`} className="flex items-center gap-3 rounded-2xl border border-slate-100 px-3 py-2 text-sm text-slate-700 transition-colors hover:border-slate-200 hover:bg-slate-50">
                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] font-black text-slate-700">{item.index}</span>
                                            <span className="line-clamp-2">{item.label}</span>
                                        </a>
                                    ))}
                                </div>
                                <div className="mt-5 rounded-2xl bg-slate-900 p-4 text-white">
                                    <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-300">Quick note</p>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-100">Server logs are retained for 30 days and tool inputs are processed locally in the browser.</p>
                                </div>
                            </aside>
                        </div>
                    </div>
                </Container>
            </Section>
        </div>
    );
};

export default PrivacyPolicy;
