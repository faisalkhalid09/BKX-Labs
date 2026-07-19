import Hero from '../components/ui/Hero';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import SEO from '../components/ui/SEO';

const TermsOfService = () => {
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
                    <div className="max-w-3xl mx-auto px-4 py-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4">Section 1: Acceptance of Terms</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">By accessing or using bkxlabs.com, you agree to be bound by these Terms of Service. If you do not agree, do not use this site.</p>

                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4">Section 2: Use of Tools</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">The tools provided on this site are for informational and estimation purposes only. Outputs are not legal advice, regulatory guidance, or professional compliance certification. Always verify results with a qualified professional before making business or technical decisions.</p>
                        <p className="text-gray-600 mb-6 leading-relaxed">Tool calculations run entirely in your browser. BKX Labs does not store, log, or transmit any input data you enter into any tool on this site.</p>

                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4">Section 3: Intellectual Property</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">All content on this site, including tool logic, written content, and design, is the property of BKX Labs. You may not reproduce, distribute, or create derivative works without written permission.</p>

                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4">Section 4: Disclaimer of Warranties</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">This site and its tools are provided on an "as is" basis without warranties of any kind, express or implied. BKX Labs does not warrant that the site will be error-free or that outputs will be accurate for your specific use case.</p>

                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4">Section 5: Limitation of Liability</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">BKX Labs shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this site or its tools. Your sole remedy for dissatisfaction is to stop using the site.</p>

                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4">Section 6: External Links</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">This site may contain links to third-party websites. BKX Labs has no control over and accepts no responsibility for the content of those sites.</p>

                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4">Section 7: Governing Law</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">These terms are governed by the laws of Pakistan. Any disputes shall be resolved in the courts of Lahore, Pakistan.</p>

                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4">Section 8: Contact</h2>
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

export default TermsOfService;
