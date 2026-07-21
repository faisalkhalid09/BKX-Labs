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
        <div className="bg-[var(--secondary)] min-h-screen relative overflow-hidden">
            {/* Background glowing orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--primary)] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[var(--accent)] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse delay-700"></div>

            <SEO 
                title="Privacy Policy"
                description="BKX Labs Privacy Policy. Learn about the information we collect, how we use it, and your rights."
            />
            <Hero 
                title="Privacy Policy"
                subtitle="Last updated: July 2026"
            />
            <Section className="relative z-10">
                <Container>
                    <div id="privacy-content" className="mx-auto max-w-4xl px-4 py-10 lg:py-14 animate-fade-in">
                        {/* Actions Banner */}
                        <div className="mb-10 flex flex-col gap-4 glass-panel px-6 py-5 sm:flex-row sm:items-center sm:justify-between hover:shadow-[var(--glow)] transition-all duration-500 print:hidden">
                            <div>
                                <p className="text-[12px] font-black uppercase tracking-[0.25em] bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">BKX Labs Legal</p>
                                <p className="mt-1 text-sm font-medium text-[var(--text-gray)]">Read online, print, or download the text version.</p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <button type="button" onClick={handleDownload} className="btn btn-primary px-6 py-2.5 text-sm !rounded-full shadow-lg hover:shadow-[var(--glow)] hover:-translate-y-1 transition-all duration-300">
                                    <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4-4m4 4V4" /></svg>
                                    Download Text
                                </button>
                                <button type="button" onClick={() => window.print()} className="btn btn-secondary px-6 py-2.5 text-sm !rounded-full hover:-translate-y-1 transition-all duration-300">
                                    <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                                    Print / Save PDF
                                </button>
                            </div>
                        </div>

                        {/* Main Content Card */}
                        <div className="glass-panel overflow-hidden border border-white/60 bg-white/60 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500">
                            <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 px-6 py-8 sm:px-10 sm:py-12 border-b border-slate-200/60 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[var(--primary)] to-transparent opacity-5 rounded-bl-full"></div>
                                <div className="relative z-10">
                                    <p className="text-[12px] font-black uppercase tracking-[0.25em] text-[var(--accent)] mb-2">Legal Notice</p>
                                    <h2 className="text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary)] sm:text-5xl mb-4">Privacy Policy</h2>
                                    <p className="max-w-3xl text-[1.05rem] leading-relaxed text-[var(--text-gray)]">This policy explains what we collect, why we collect it, how we share it, how long we keep it, and what rights users have. Our commitment to privacy is built into the core of our platform.</p>
                                </div>
                            </div>

                            <div className="px-6 py-8 sm:px-10">
                                {/* Navigation Pills */}
                                <div className="mb-10 flex flex-wrap gap-3 print:hidden">
                                    {privacyNav.map((item) => (
                                        <a key={item.id} href={`#${item.id}`} className="group relative rounded-full px-4 py-2 text-sm font-semibold text-[var(--text-gray)] bg-slate-100/80 border border-slate-200/50 transition-all duration-300 hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] hover:shadow-md hover:-translate-y-0.5 overflow-hidden">
                                            <span className="relative z-10">
                                                <span className="opacity-70 mr-1.5 group-hover:opacity-100 group-hover:text-cyan-200">{item.index}.</span>
                                                {item.label}
                                            </span>
                                        </a>
                                    ))}
                                </div>

                                {/* Content Sections */}
                                <div className="space-y-12">
                                    {privacySections.map((section, index) => (
                                        <section key={section.title} id={privacyNav[index].id} className="scroll-mt-32 group">
                                            <div className="flex items-start gap-4 sm:gap-6">
                                                <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-lg font-black text-white shadow-md group-hover:shadow-[var(--glow)] group-hover:scale-110 transition-all duration-300 transform-gpu">
                                                    {privacyNav[index].index}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-black tracking-tight text-[var(--primary-dark)] sm:text-2xl mb-4 group-hover:text-[var(--primary)] transition-colors duration-300 border-b border-slate-100 pb-3">
                                                        {section.title}
                                                    </h3>
                                                    <div className="space-y-4 text-[15px] sm:text-base leading-relaxed text-[var(--text-gray)]">
                                                        {section.body.map((paragraph) => (
                                                            <p key={paragraph} className="mb-0">{paragraph}</p>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>
        </div>
    );
};

export default PrivacyPolicy;
