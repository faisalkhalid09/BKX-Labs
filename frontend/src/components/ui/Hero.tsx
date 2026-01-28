import { useEffect, useRef } from 'react';
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
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Mouse tracking
        let mouseX = -1000;
        let mouseY = -1000;
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };
        const handleMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
        };
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        // Grid settings
        const gridSize = 50;
        const interactionRadius = 120;
        const maxDisplacement = 20;

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw grid with mouse interaction
            for (let x = 0; x < canvas.width; x += gridSize) {
                for (let y = 0; y < canvas.height; y += gridSize) {
                    const dx = mouseX - x;
                    const dy = mouseY - y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    let offsetX = 0;
                    let offsetY = 0;
                    let opacity = 0.12;

                    if (distance < interactionRadius) {
                        const force = (interactionRadius - distance) / interactionRadius;
                        offsetX = (dx / distance) * force * maxDisplacement;
                        offsetY = (dy / distance) * force * maxDisplacement;
                        opacity = 0.12 + force * 0.3;
                    }

                    // Apply fade based on position (fade at bottom)
                    const fadeStart = canvas.height * 0.6;
                    if (y > fadeStart) {
                        const fadeProgress = (y - fadeStart) / (canvas.height - fadeStart);
                        opacity *= (1 - fadeProgress);
                    }

                    ctx.strokeStyle = `rgba(30, 58, 138, ${opacity})`;
                    ctx.lineWidth = 1;

                    // Vertical line
                    ctx.beginPath();
                    ctx.moveTo(x + offsetX, y + offsetY);
                    ctx.lineTo(x + offsetX, y + gridSize + offsetY);
                    ctx.stroke();

                    // Horizontal line
                    ctx.beginPath();
                    ctx.moveTo(x + offsetX, y + offsetY);
                    ctx.lineTo(x + gridSize + offsetX, y + offsetY);
                    ctx.stroke();
                }
            }

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div className="hero">
            <canvas ref={canvasRef} className="hero-canvas" />
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
