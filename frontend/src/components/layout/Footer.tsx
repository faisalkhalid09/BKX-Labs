import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <img src="/brand-logo.png" alt="BKX Labs" style={{ height: '32px', marginBottom: '1rem' }} />
                        <p className="footer-tagline">
                            Reliable software products, delivered phase by phase
                        </p>
                    </div>

                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul className="footer-links">
                            <li><Link to="/services">Services</Link></li>
                            <li><Link to="/process">Process</Link></li>
                            <li><Link to="/case-study">Case Study</Link></li>
                            <li><Link to="/about">About</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Contact</h4>
                        <div className="footer-contact">
                            <Mail size={18} />
                            <a href="mailto:contact@bkxlabs.com">contact@bkxlabs.com</a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} BKX Labs. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
