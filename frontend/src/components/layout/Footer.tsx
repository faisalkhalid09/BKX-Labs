import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <div style={{
                            backgroundColor: 'white',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            display: 'inline-block',
                            marginBottom: '1rem'
                        }}>
                            <img
                                src="/brand-logo.png"
                                alt="BKX Labs Logo - Specialized Software Rescue & Engineering"
                                style={{ height: '45px', display: 'block' }}
                            />
                        </div>
                        <p className="footer-tagline">
                            Specialized software rescue & engineering. We fix what's broken.
                        </p>
                    </div>

                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul className="footer-links">
                            <li><Link to="/services">Services</Link></li>
                            <li><Link to="/process">Process</Link></li>
                            <li><Link to="/case-study">Case Study</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                            <li><Link to="/tos">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Specialized Services</h4>
                        <ul className="footer-links">
                            <li><Link to="/hire-laravel-developer">Hire Laravel Developer</Link></li>
                            <li><Link to="/hire-react-developer">Hire React Developer</Link></li>
                            <li><Link to="/codebase-audit">Codebase Audit</Link></li>
                            <li><Link to="/technical-debt-remediation">Technical Debt</Link></li>
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
