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
                    <h1>{title}</h1>
                    <p className="hero-subtitle">{subtitle}</p>
                    {ctaText && ctaLink && (
                        <Button variant="primary" href={ctaLink}>
                            {ctaText}
                        </Button>
                    )}
                    {children}
                </div>
            </Container>
        </div>
    );
};

export default Hero;
