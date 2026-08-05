import { useEffect, useRef } from 'react';
import './MouseFollower.css';

const DESKTOP_QUERY = '(pointer: fine) and (hover: hover) and (min-width: 1024px)';

const MouseFollower = () => {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const ringPositionRef = useRef({ x: 0, y: 0 });
  const dotPositionRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);
  const visibleRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_QUERY);

    const updateVisibility = () => {
      const shouldShow = mediaQuery.matches;
      visibleRef.current = shouldShow;
      document.body.classList.toggle('main-site-cursor-active', shouldShow);

      if (ringRef.current && dotRef.current) {
        ringRef.current.style.opacity = shouldShow ? '1' : '0';
        dotRef.current.style.opacity = shouldShow ? '1' : '0';
      }
    };

    const moveTo = (x: number, y: number) => {
      targetRef.current = { x, y };

      if (!visibleRef.current) {
        ringPositionRef.current = { x, y };
        dotPositionRef.current = { x, y };
        return;
      }

      if (ringRef.current && dotRef.current) {
        ringRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      moveTo(event.clientX, event.clientY);
    };

    const handlePointerEnter = (event: PointerEvent) => {
      moveTo(event.clientX, event.clientY);
      updateVisibility();
    };

    const handlePointerLeave = () => {
      visibleRef.current = false;
      document.body.classList.remove('main-site-cursor-active');

      if (ringRef.current && dotRef.current) {
        ringRef.current.style.opacity = '0';
        dotRef.current.style.opacity = '0';
      }
    };

    const handleWindowBlur = () => {
      handlePointerLeave();
    };

    const tick = () => {
      const { x: targetX, y: targetY } = targetRef.current;
      const ringPosition = ringPositionRef.current;
      const dotPosition = dotPositionRef.current;

      ringPosition.x += (targetX - ringPosition.x) * 0.12;
      ringPosition.y += (targetY - ringPosition.y) * 0.12;
      dotPosition.x += (targetX - dotPosition.x) * 0.35;
      dotPosition.y += (targetY - dotPosition.y) * 0.35;

      if (ringRef.current && dotRef.current && visibleRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPosition.x}px, ${ringPosition.y}px, 0) translate(-50%, -50%)`;
        dotRef.current.style.transform = `translate3d(${dotPosition.x}px, ${dotPosition.y}px, 0) translate(-50%, -50%)`;
      }

      frameRef.current = window.requestAnimationFrame(tick);
    };

    updateVisibility();

    if (mediaQuery.matches) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      window.addEventListener('pointerenter', handlePointerEnter, { passive: true });
      window.addEventListener('pointerleave', handlePointerLeave);
      window.addEventListener('blur', handleWindowBlur);
      frameRef.current = window.requestAnimationFrame(tick);
    }

    const handleMediaChange = () => {
      updateVisibility();

      if (mediaQuery.matches) {
        window.addEventListener('pointermove', handlePointerMove, { passive: true });
        window.addEventListener('pointerenter', handlePointerEnter, { passive: true });
        window.addEventListener('pointerleave', handlePointerLeave);
        window.addEventListener('blur', handleWindowBlur);

        if (frameRef.current === null) {
          frameRef.current = window.requestAnimationFrame(tick);
        }
      } else {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerenter', handlePointerEnter);
        window.removeEventListener('pointerleave', handlePointerLeave);
        window.removeEventListener('blur', handleWindowBlur);

        if (frameRef.current !== null) {
          window.cancelAnimationFrame(frameRef.current);
          frameRef.current = null;
        }
      }
    };

    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerenter', handlePointerEnter);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('blur', handleWindowBlur);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }

      document.body.classList.remove('main-site-cursor-active');
    };
  }, []);

  return (
    <div className="mouse-follower" aria-hidden="true">
      <div ref={ringRef} className="mouse-follower-ring" />
      <div ref={dotRef} className="mouse-follower-dot" />
    </div>
  );
};

export default MouseFollower;