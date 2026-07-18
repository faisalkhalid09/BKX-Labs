import Hero from '../components/ui/Hero';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import SEO from '../components/ui/SEO';

const PrivacyPolicy = () => {
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
                    <div className="max-w-3xl mx-auto px-4 py-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4">Section 1 — Information We Collect</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">BKX Labs collects information you voluntarily provide through the contact form on this site, including your name, email address, and project details. When you use the tools on this site, no input data is transmitted to our servers — all tool calculations run entirely in your browser.</p>
                        <p className="text-gray-600 mb-6 leading-relaxed">We also collect standard server logs including IP addresses, browser type, and pages visited for operational and security purposes.</p>

                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4">Section 2 — How We Use Your Information</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">Contact form submissions are used solely to respond to your enquiry and assess whether we can assist with your project. We do not sell, rent, or share your personal information with third parties for marketing.</p>
                        <p className="text-gray-600 mb-6 leading-relaxed">Server log data is used to maintain site security and diagnose technical issues. It is retained for a maximum of 30 days.</p>

                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4">Section 3 — Cookies and Analytics</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">This site uses analytics tools to understand aggregate traffic patterns. No personally identifiable information is included in analytics data. We may display Google AdSense advertisements, which use cookies to serve ads based on prior visits to this and other websites. You can opt out of personalised advertising by visiting Google's Ads Settings.</p>

                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4">Section 4 — Data Security</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">We implement appropriate technical and organisational measures to protect the information we hold. All data transmitted to our servers uses TLS encryption. Tool inputs are processed locally in your browser and never transmitted or stored.</p>

                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4">Section 5 — Your Rights</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">You have the right to request access to, correction of, or deletion of any personal information we hold about you. To exercise these rights, contact us at contact@bkxlabs.com. We will respond within 30 days.</p>

                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4">Section 6 — Changes to This Policy</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">We may update this Privacy Policy from time to time. The date at the top of this page reflects the most recent revision. Continued use of this site after changes are posted constitutes acceptance.</p>

                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4">Section 7 — Contact</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            BKX Labs<br />
                            <a href="mailto:contact@bkxlabs.com" className="text-blue-600 hover:underline">contact@bkxlabs.com</a>
                        </p>
                    </div>
                </Container>
            </Section>
        </div>
    );
};

export default PrivacyPolicy;
