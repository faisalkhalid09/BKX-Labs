import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Hero from '../components/ui/Hero';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import Button from '../components/ui/Button';
import { Mail } from 'lucide-react';
import SEO from '../components/ui/SEO';
import './Contact.css';
import apiService from '../api/apiService';

interface ContactFormData {
    name: string;
    email: string;
    message: string;
    agreeToTerms: boolean;
}

const Contact = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            await apiService.submitContact(data);
            setSubmitStatus('success');
            reset();
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact BKX Labs",
        "description": "Get in touch with BKX Labs to book your Rescue Strategy Call. We specialize in taking over stalled or failing software projects.",
        "mainEntity": {
            "@type": "Organization",
            "name": "BKX Labs",
            "email": "contact@bkxlabs.com"
        }
    };

    return (
        <div>
            <SEO
                title="Start Your Software Rescue | Book a Diagnostic Audit"
                description="Stop the bleeding. Get a forensic audit of your failing codebase and a fixed-price recovery roadmap. Book your Rescue Strategy Call today."
                keywords="hire rescue agency, book codebase audit, recover stalled project, emergency software help, software triage call"
                structuredData={structuredData}
            />
            <Hero
                title="Contact Us"
                subtitle="Let's diagnose your system and get your project back on track."
            />

            <Section>
                <Container>
                    <div className="contact-container">
                        {/* Contact Info */}
                        <div className="contact-info">
                            <h3>Get in Touch</h3>
                            <p className="contact-text">
                                Share a brief overview of your project and we'll get back to you within 24 hours.
                            </p>

                            <div className="contact-email">
                                <Mail size={24} />
                                <div>
                                    <h4>Email</h4>
                                    <a href="mailto:contact@bkxlabs.com">contact@bkxlabs.com</a>
                                </div>
                            </div>

                            <div className="urgent-callout">
                                <h4>Need Priority Engineering Support?</h4>
                                <p>
                                    If your project needs immediate technical intervention, book a strategy call and we will assess risk, blockers, and next steps quickly.
                                </p>
                                <Link to="/schedule" className="urgent-callout-btn">Schedule a Priority Call</Link>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="contact-form-wrapper">
                            <h3>Send us a message</h3>

                            <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
                                <div className="form-group">
                                    <label htmlFor="name">Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        {...register('name', { required: 'Name is required' })}
                                        className={errors.name ? 'error' : ''}
                                    />
                                    {errors.name && <span className="error-message">{errors.name.message}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Invalid email address'
                                            }
                                        })}
                                        className={errors.email ? 'error' : ''}
                                    />
                                    {errors.email && <span className="error-message">{errors.email.message}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">How can we help? (e.g., stalled project, tech debt, rescue mission) *</label>
                                    <textarea
                                        id="message"
                                        rows={6}
                                        {...register('message', { required: 'Please describe your situation' })}
                                        className={errors.message ? 'error' : ''}
                                    />
                                    {errors.message && <span className="error-message">{errors.message.message}</span>}
                                </div>

                                <div className="form-group checkbox-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            {...register('agreeToTerms', { required: 'You must agree to the Terms and Privacy Policy' })}
                                        />
                                        <span>
                                            By checking this you agree on BKX-Labs <a href="/TOS" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>Term of Service</a> and <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>Privacy Policy</a>
                                        </span>
                                    </label>
                                    {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms.message}</span>}
                                </div>

                                <Button type="submit" variant="primary" disabled={isSubmitting}>
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </Button>

                                {submitStatus === 'success' && (
                                    <div className="success-message">
                                        Thank you! We'll get back to you within 24 hours.
                                    </div>
                                )}

                                {submitStatus === 'error' && (
                                    <div className="error-message-box">
                                        Something went wrong. Please try again or email us directly.
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </Container>
            </Section>
        </div>
    );
};

export default Contact;
