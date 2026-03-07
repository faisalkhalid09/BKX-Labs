import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

// Store URL: derived from VITE_API_URL so it works on any server automatically
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const STORE_URL = import.meta.env.VITE_STORE_URL || API_BASE.replace('/api', '/store');

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const isRestricted = location.pathname.startsWith('/restricted-portal');

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-content">

                    {/* Logo */}
                    <Link to="/" onClick={() => setIsOpen(false)}>
                        <img
                            src="/brand-logo.png"
                            alt="BKX Labs"
                            className="logo-img"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    {!isRestricted && (
                        <ul className="nav-links desktop-only">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/services">Services</Link></li>
                            <li><Link to="/process">Process</Link></li>
                            <li><Link to="/case-study">Case Study</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li>
                                <a
                                    href={STORE_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="nav-store-badge"
                                >
                                    Store
                                    <span className="nav-store-arrow">↗</span>
                                </a>
                            </li>
                            <li><Link to="/contact" className="nav-cta">Contact</Link></li>
                        </ul>
                    )}

                    {/* Hamburger */}
                    <button
                        className="hamburger"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
                <div className="container">
                    <ul className="mobile-nav-links">
                        {!isRestricted && (
                            <>
                                <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
                                <li><Link to="/services" onClick={() => setIsOpen(false)}>Services</Link></li>
                                <li><Link to="/process" onClick={() => setIsOpen(false)}>Process</Link></li>
                                <li><Link to="/case-study" onClick={() => setIsOpen(false)}>Case Study</Link></li>
                                <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
                                <li>
                                    <a
                                        href={STORE_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="nav-store-badge mobile"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Store ↗
                                    </a>
                                </li>
                                <li>
                                    <Link
                                        to="/contact"
                                        className="btn"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
