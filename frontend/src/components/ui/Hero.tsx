import type { ReactNode } from 'react';
import Container from '../layout/Container';
import Button from './Button';
import './Hero.css';

interface HeroProps {
    title: string;
    subtitle: string;
    ctaText?: string;
    ctaLink?: string;
    children?: ReactNode;
}

const Hero = ({ title, subtitle, ctaText, ctaLink, children }: HeroProps) => {
    return (
        <div className="hero">
            <Container>
                <div className="hero-content">
                    <h1 className="animate-fade-in">{title}</h1>
                    <p className="hero-subtitle animate-fade-in delay-100">{subtitle}</p>
                    {ctaText && ctaLink && (
                        <div className="animate-fade-in delay-200">
                            <Button variant="primary" href={ctaLink}>
                                {ctaText}
                            </Button>
                        </div>
                    )}
                    {children}
                </div>
            </Container>
        </div>
    );
};

export default Hero;
