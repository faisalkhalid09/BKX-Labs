import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

const NotFound = () => {
    return (
        <Section className="not-found-section">
            <Container>
                <div style={{
                    minHeight: '60vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '2rem 0'
                }}>
                    <div style={{
                        maxWidth: '600px',
                        width: '100%',
                        padding: '3rem 2rem',
                        background: 'white',
                        borderRadius: '16px',
                        boxShadow: 'var(--shadow-lg)',
                        border: '1px solid var(--border-light)'
                    }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '80px',
                            height: '80px',
                            background: 'rgba(239, 68, 68, 0.1)',
                            borderRadius: '50%',
                            color: '#ef4444',
                            marginBottom: '1.5rem'
                        }}>
                            <AlertTriangle size={40} />
                        </div>

                        <h1 style={{
                            fontSize: 'clamp(2rem, 5vw, 3rem)',
                            marginBottom: '0.5rem',
                            background: 'var(--primary-gradient)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            404
                        </h1>

                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
                            Page Not Found
                        </h2>

                        <p style={{ color: 'var(--text-gray)', marginBottom: '2rem' }}>
                            The page you are looking for doesn't exist or has been moved.
                            Let's get you back on track.
                        </p>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/" className="btn btn-primary">
                                <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} /> Go Home
                            </Link>
                            <Link to="/contact" className="btn btn-secondary">
                                Contact Support
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default NotFound;
