import { useRef, useCallback, useEffect } from "react";

// Pre-sampled points tracing the BKX hexagon mark outline - normalized 0-1
const LOGO_POINTS_NORMALIZED: [number, number][] = [
    [0.50, 0.08], [0.58, 0.12], [0.65, 0.17], [0.71, 0.23], [0.75, 0.30],
    [0.77, 0.38], [0.77, 0.46], [0.75, 0.54], [0.71, 0.61], [0.65, 0.67],
    [0.58, 0.72], [0.50, 0.76], [0.42, 0.72], [0.35, 0.67], [0.29, 0.61],
    [0.25, 0.54], [0.23, 0.46], [0.23, 0.38], [0.25, 0.30], [0.29, 0.23],
    [0.35, 0.17], [0.42, 0.12],
    [0.33, 0.28], [0.33, 0.34], [0.33, 0.40], [0.33, 0.46], [0.33, 0.52], [0.33, 0.58],
    [0.36, 0.28], [0.39, 0.28], [0.42, 0.29], [0.44, 0.31], [0.44, 0.33], [0.44, 0.36],
    [0.42, 0.38], [0.39, 0.39], [0.36, 0.39],
    [0.36, 0.41], [0.40, 0.41], [0.43, 0.42], [0.45, 0.45], [0.45, 0.48],
    [0.43, 0.51], [0.40, 0.52], [0.36, 0.52],
    [0.49, 0.28], [0.49, 0.34], [0.49, 0.40], [0.49, 0.46], [0.49, 0.52], [0.49, 0.58],
    [0.51, 0.40], [0.54, 0.36], [0.57, 0.32], [0.60, 0.28],
    [0.51, 0.43], [0.54, 0.48], [0.57, 0.53], [0.60, 0.58],
    [0.64, 0.28], [0.66, 0.31], [0.68, 0.34], [0.67, 0.42],
    [0.67, 0.43],
    [0.73, 0.28], [0.71, 0.31], [0.69, 0.34],
    [0.64, 0.58], [0.66, 0.54], [0.68, 0.50],
    [0.73, 0.58], [0.71, 0.55], [0.69, 0.51],
];

// Extra ambient dots (no logo target, just atmosphere)
const AMBIENT_COUNT = 200;

interface Particle {
    x: number;
    y: number;
    tx: number;
    ty: number;
    ox: number;
    oy: number;
    vx: number;
    vy: number;
    size: number;
    alpha: number;
    isLogo: boolean;
}

let _animFrameId = 0;

export function useParticleLogo() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const hoveredRef = useRef(false);
    const startedRef = useRef(false);

    const buildParticles = useCallback((w: number, h: number) => {
        const particles: Particle[] = [];

        // Logo-forming dots
        LOGO_POINTS_NORMALIZED.forEach(([nx, ny]) => {
            const ox = Math.random() * w;
            const oy = Math.random() * h;
            particles.push({
                x: ox, y: oy,
                tx: nx * w, ty: ny * h,
                ox, oy,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 1.5 + 1.8,
                alpha: Math.random() * 0.35 + 0.25,
                isLogo: true,
            });
        });

        // Ambient dots
        for (let i = 0; i < AMBIENT_COUNT; i++) {
            const ox = Math.random() * w;
            const oy = Math.random() * h;
            particles.push({
                x: ox, y: oy,
                tx: ox, ty: oy,
                ox, oy,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 1 + 0.8,
                alpha: Math.random() * 0.18 + 0.08,
                isLogo: false,
            });
        }

        particlesRef.current = particles;
    }, []);

    const tick = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const w = canvas.width;
        const h = canvas.height;

        ctx.clearRect(0, 0, w, h);

        const hovered = hoveredRef.current;

        particlesRef.current.forEach((p) => {
            if (p.isLogo) {
                if (hovered) {
                    const dx = p.tx - p.x;
                    const dy = p.ty - p.y;
                    p.vx += dx * 0.09;
                    p.vy += dy * 0.09;
                } else {
                    const dx = p.ox - p.x;
                    const dy = p.oy - p.y;
                    p.vx += dx * 0.005 + (Math.random() - 0.5) * 0.06;
                    p.vy += dy * 0.005 + (Math.random() - 0.5) * 0.06;
                }
                p.vx *= 0.80;
                p.vy *= 0.80;
            } else {
                // Ambient drift
                p.vx += (Math.random() - 0.5) * 0.04;
                p.vy += (Math.random() - 0.5) * 0.04;
                p.vx *= 0.96;
                p.vy *= 0.96;
                // Wrap edges
                if (p.x < 0) p.x = w;
                if (p.x > w) p.x = 0;
                if (p.y < 0) p.y = h;
                if (p.y > h) p.y = 0;
            }

            p.x += p.vx;
            p.y += p.vy;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            const color = p.isLogo && hovered
                ? `rgba(6, 182, 212, ${Math.min(p.alpha + 0.45, 0.95)})`
                : p.isLogo
                    ? `rgba(30, 58, 138, ${p.alpha})`
                    : `rgba(100, 116, 139, ${p.alpha})`;
            ctx.fillStyle = color;
            ctx.fill();
        });

        _animFrameId = requestAnimationFrame(tick);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || startedRef.current) return;
        startedRef.current = true;

        const setup = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            buildParticles(canvas.width, canvas.height);
        };

        setup();
        tick();

        const ro = new ResizeObserver(setup);
        ro.observe(canvas);

        return () => {
            ro.disconnect();
            cancelAnimationFrame(_animFrameId);
        };
    }, [buildParticles, tick]);

    const handleMouseEnter = useCallback(() => { hoveredRef.current = true; }, []);
    const handleMouseLeave = useCallback(() => { hoveredRef.current = false; }, []);

    return { canvasRef, handleMouseEnter, handleMouseLeave };
}
