import { Link } from 'react-router-dom';
import { Mail, Facebook, Instagram, Linkedin } from 'lucide-react';
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
                        <h3>Quick Links</h3>
                        <ul className="footer-links">
                            <li><Link to="/services">Services</Link></li>
                            <li><Link to="/process">Process</Link></li>
                            <li><Link to="/blog">Blog</Link></li>
                            <li><Link to="/case-study">Case Study</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                            <li><Link to="/tos">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3>Specialized Services</h3>
                        <ul className="footer-links">
                            <li><Link to="/hire-laravel-developer">Hire Laravel Developer</Link></li>
                            <li><Link to="/hire-react-developer">Hire React Developer</Link></li>
                            <li><Link to="/codebase-audit">Codebase Audit</Link></li>
                            <li><Link to="/technical-debt-remediation">Technical Debt</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3>Contact</h3>
                        <div className="footer-contact">
                            <Mail size={18} />
                            <a href="mailto:contact@bkxlabs.com">contact@bkxlabs.com</a>
                        </div>
                        <div className="footer-socials">
                            <a href="https://www.facebook.com/profile.php?id=61592933933712" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <Facebook size={20} />
                            </a>
                            <a href="https://www.instagram.com/bkxlabs/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <Instagram size={20} />
                            </a>
                            <a href="https://linkedin.com/company/binkhalid-labs" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <Linkedin size={20} />
                            </a>
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
