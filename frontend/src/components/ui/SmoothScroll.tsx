import { useEffect, useRef } from 'react';

const SmoothScroll = () => {
  const animationRef = useRef<number | null>(null);
  const targetY = useRef(window.scrollY);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine) and (hover: hover) and (min-width: 1024px)');

    if (!mediaQuery.matches) {
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      
      const scrollAmount = event.deltaY * 0.5;
      targetY.current = Math.max(0, Math.min(targetY.current + scrollAmount, document.documentElement.scrollHeight - window.innerHeight));
    };

    const animate = () => {
      const currentY = window.scrollY;
      const diff = targetY.current - currentY;
      
      if (Math.abs(diff) > 0.1) {
        window.scrollBy(0, diff * 0.1);
        animationRef.current = window.requestAnimationFrame(animate);
      } else if (Math.abs(diff) > 0) {
        window.scrollBy(0, diff);
      }
    };

    const tick = () => {
      animate();
      animationRef.current = window.requestAnimationFrame(tick);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    animationRef.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (animationRef.current !== null) {
        window.cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return null;
};

export default SmoothScroll;
