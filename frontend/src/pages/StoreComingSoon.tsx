import { Link } from 'react-router-dom';
import './StoreComingSoon.css';

const StoreComingSoon = () => {
    return (
        <div className="store-soon-page">
            <div className="store-soon-card">

                <div className="store-soon-status">
                    <span className="store-soon-dot" />
                    <span className="store-soon-label">In Development</span>
                </div>

                <div className="store-soon-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2" />
                        <path d="M8 21h8M12 17v4" />
                    </svg>
                </div>

                <h1>Store Coming Soon</h1>
                <p>We are building the BKX Labs digital product store. AI models, automation scripts, and templates — launching shortly.</p>

                <hr className="store-soon-sep" />

                <ul className="store-soon-list">
                    <li>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                        </svg>
                        AI models, automation scripts, and digital templates
                    </li>
                    <li>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        Secure payments and instant digital delivery
                    </li>
                    <li>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 6v6l4 2" />
                        </svg>
                        Launching soon — check back in a few days
                    </li>
                </ul>

                <div className="store-soon-actions">
                    <Link to="/" className="store-soon-btn store-soon-btn-primary">Go to Main Site</Link>
                    <a href="mailto:contact@bkxlabs.com" className="store-soon-btn store-soon-btn-outline">Contact Us</a>
                </div>

            </div>
        </div>
    );
};

export default StoreComingSoon;
