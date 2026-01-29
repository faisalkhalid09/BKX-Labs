import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import Button from '../components/ui/Button';

const NotFound = () => {
    return (
        <Section>
            <Container>
                <div style={{
                    minHeight: '60vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '4rem 1rem'
                }}>
                    <div style={{ maxWidth: '600px' }}>
                        <h1 style={{
                            fontSize: 'clamp(4rem, 10vw, 8rem)',
                            marginBottom: '1rem',
                            background: 'var(--primary-gradient)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            fontWeight: 'bold',
                            lineHeight: 1
                        }}>
                            404
                        </h1>

                        <h2 style={{
                            fontSize: '1.75rem',
                            marginBottom: '1rem',
                            color: 'var(--text-dark)'
                        }}>
                            Page Not Found
                        </h2>

                        <p style={{
                            fontSize: '1.125rem',
                            color: 'var(--text-gray)',
                            marginBottom: '2.5rem',
                            lineHeight: 1.6
                        }}>
                            The page you are looking for doesn't exist or has been moved.
                        </p>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Button variant="primary" href="/">
                                Go Back Home
                            </Button>
                            <Button variant="secondary" href="/contact">
                                Contact Us
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default NotFound;
