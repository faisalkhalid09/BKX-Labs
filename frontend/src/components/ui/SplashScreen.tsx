import { useState, useEffect } from 'react';
import './SplashScreen.css';

interface SplashScreenProps {
    onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
    const [animating, setAnimating] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Start the animation after a brief delay to let the user see the logo
        const startAnimationTimer = setTimeout(() => {
            setAnimating(true);
        }, 800);

        // Fade out the entire splash screen after animation completes
        const fadeOutTimer = setTimeout(() => {
            setFadeOut(true);
        }, 2000);

        // Signal completion and hide splash screen
        const completeTimer = setTimeout(() => {
            onComplete();
        }, 2500);

        return () => {
            clearTimeout(startAnimationTimer);
            clearTimeout(fadeOutTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
            <div className="splash-logo-container">
                {/* Main Logo */}
                <img
                    src="/LOGO.png"
                    alt="BKX Labs"
                    className={`splash-logo ${animating ? 'fading' : ''}`}
                />

                {/* Left Bar - Positioned on the "K" */}
                <img
                    src="/LEFTBAR.png"
                    alt=""
                    className={`splash-bar left-bar ${animating ? 'slide-left' : ''}`}
                />

                {/* Right Bar - Positioned on the "X" */}
                <img
                    src="/RIGHTBAR.png"
                    alt=""
                    className={`splash-bar right-bar ${animating ? 'slide-right' : ''}`}
                />
            </div>
        </div>
    );
};

export default SplashScreen;
