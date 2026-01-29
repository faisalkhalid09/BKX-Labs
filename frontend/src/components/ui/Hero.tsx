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

interface GridPoint {
    x: number;
    y: number;
    offsetX: number;
    offsetY: number;
    opacity: number;
    lastInteraction: number;
}

const Hero = ({ title, subtitle, ctaText, ctaLink, children }: HeroProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const heroDiv = heroRef.current;
        if (!canvas || !heroDiv) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Mouse tracking - store both client and canvas-relative positions
        let mouseX = -1000;
        let mouseY = -1000;
        let lastClientX = -1000;
        let lastClientY = -1000;

        const updateMousePosition = () => {
            const rect = canvas.getBoundingClientRect();
            mouseX = lastClientX - rect.left;
            mouseY = lastClientY - rect.top;
        };

        const handleMouseMove = (e: MouseEvent) => {
            lastClientX = e.clientX;
            lastClientY = e.clientY;
            updateMousePosition();
        };

        const handleMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
            lastClientX = -1000;
            lastClientY = -1000;
        };

        // Update mouse position on scroll
        const handleScroll = () => {
            if (lastClientX !== -1000 && lastClientY !== -1000) {
                updateMousePosition();
            }
        };

        heroDiv.addEventListener('mousemove', handleMouseMove);
        heroDiv.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('scroll', handleScroll);

        // Grid settings
        const gridSize = 50;
        const interactionRadius = 150;
        const maxDisplacement = 30;
        const trailDuration = 3000; // Effect lasts exactly 1 second

        // Store grid points with their state
        const gridPoints: Map<string, GridPoint> = new Map();

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const currentTime = Date.now();

            // Draw grid with smooth ripple/wave effect
            for (let x = 0; x < canvas.width; x += gridSize) {
                for (let y = 0; y < canvas.height; y += gridSize) {
                    const key = `${x},${y}`;
                    const dx = mouseX - x;
                    const dy = mouseY - y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    let point = gridPoints.get(key);
                    if (!point) {
                        point = { x, y, offsetX: 0, offsetY: 0, opacity: 0.12, lastInteraction: 0 };
                        gridPoints.set(key, point);
                    }

                    // Create smooth wave/ripple effect
                    if (distance < interactionRadius) {
                        const normalizedDistance = distance / interactionRadius;

                        // Create ripple waves using sine function
                        const waveFrequency = 3;
                        const wave = Math.sin(normalizedDistance * Math.PI * waveFrequency);

                        // Smooth falloff from center
                        const falloff = Math.pow(1 - normalizedDistance, 2);
                        const strength = wave * falloff;

                        // Calculate perpendicular displacement for flowing effect
                        const angle = Math.atan2(dy, dx);
                        point.offsetX = Math.cos(angle) * strength * maxDisplacement;
                        point.offsetY = Math.sin(angle) * strength * maxDisplacement;

                        point.opacity = 0.12 + Math.abs(strength) * 0.25;
                        point.lastInteraction = currentTime;
                    } else {
                        // Apply trailing effect - fade back to original position
                        const timeSinceInteraction = currentTime - point.lastInteraction;
                        if (timeSinceInteraction < trailDuration) {
                            const fadeProgress = timeSinceInteraction / trailDuration;
                            const easeOut = 1 - Math.pow(1 - fadeProgress, 3);
                            point.offsetX *= (1 - easeOut);
                            point.offsetY *= (1 - easeOut);
                            point.opacity = 0.12 + (point.opacity - 0.12) * (1 - easeOut);
                        } else {
                            point.offsetX = 0;
                            point.offsetY = 0;
                            point.opacity = 0.12;
                        }
                    }

                    // Apply fade based on position (fade at bottom)
                    const fadeStart = canvas.height * 0.6;
                    let finalOpacity = point.opacity;
                    if (y > fadeStart) {
                        const fadeProgress = (y - fadeStart) / (canvas.height - fadeStart);
                        finalOpacity *= (1 - fadeProgress);
                    }

                    ctx.strokeStyle = `rgba(30, 58, 138, ${finalOpacity})`;
                    ctx.lineWidth = 1;

                    // Vertical line
                    ctx.beginPath();
                    ctx.moveTo(x + point.offsetX, y + point.offsetY);
                    ctx.lineTo(x + point.offsetX, y + gridSize + point.offsetY);
                    ctx.stroke();

                    // Horizontal line
                    ctx.beginPath();
                    ctx.moveTo(x + point.offsetX, y + point.offsetY);
                    ctx.lineTo(x + gridSize + point.offsetX, y + point.offsetY);
                    ctx.stroke();
                }
            }

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            heroDiv.removeEventListener('mousemove', handleMouseMove);
            heroDiv.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="hero" ref={heroRef}>
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
