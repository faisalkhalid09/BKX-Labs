import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isContactMenuOpen, setIsContactMenuOpen] = useState(false);
    const [isLogoHovered, setIsLogoHovered] = useState(false);
    const [isMobileState, setIsMobileState] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);
    const contactMenuRef = useRef<HTMLLIElement | null>(null);
    const closeTimerRef = useRef<number | null>(null);
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => setIsMobileState(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    // Derive store URL from environment variable or API URL
    const storeUrl = import.meta.env.VITE_STORE_URL || (import.meta.env.VITE_API_URL || '').replace('/api', '') + '/store';

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
        setIsContactMenuOpen(false);

        if (closeTimerRef.current) {
            window.clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
        }
    }, [location]);

    const clearCloseTimer = () => {
        if (closeTimerRef.current) {
            window.clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
        }
    };

    const openContactMenu = () => {
        clearCloseTimer();
        setIsContactMenuOpen(true);
    };

    const scheduleCloseContactMenu = () => {
        clearCloseTimer();
        closeTimerRef.current = window.setTimeout(() => {
            setIsContactMenuOpen(false);
            closeTimerRef.current = null;
        }, 260);
    };

    // Close desktop contact dropdown when clicking elsewhere.
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!contactMenuRef.current) return;
            if (!contactMenuRef.current.contains(event.target as Node)) {
                setIsContactMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        return () => {
            if (closeTimerRef.current) {
                window.clearTimeout(closeTimerRef.current);
            }
        };
    }, []);

    // Handle scroll for glass effect with hysteresis to prevent shaking
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            // Use wide hysteresis gap to prevent any shaking
            if (scrollY > 80) {
                setIsScrolled(true);
            } else if (scrollY < 40) {
                setIsScrolled(false);
            }
            // Between 40-80px, maintain current state to prevent shaking
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                <div className="container">
                    <div className="navbar-content">
                        <Link to="/" className="logo" onMouseEnter={() => setIsLogoHovered(true)} onMouseLeave={() => setIsLogoHovered(false)}>
                            <div className={`logo-flip-container ${isLogoHovered && !isMobileState ? 'flipped' : ''}`}>
                                <img
                                    src="/brand-logo.png?v=2"
                                    alt="BKX Labs - Enterprise Software Development Company"
                                    className="logo-front"
                                    width="500"
                                    height="117"
                                />
                                {!isMobileState && (
                                    <img
                                        src="/logo-header.png?v=2"
                                        alt="BKX Labs"
                                        className="logo-back"
                                        width="500"
                                        height="500"
                                    />
                                )}
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        {!location.pathname.startsWith('/restricted-portal') && (
                            <ul className="nav-links desktop-only">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/services">Services</Link></li>
                                <li><Link to="/process">Process</Link></li>
                                <li><Link to="/case-study">Case Study</Link></li>
                                <li><Link to="/about">About</Link></li>
                                <li>
                                    <a
                                        href={storeUrl}
                                        className="nav-store-badge"
                                    >
                                        Store
                                    </a>
                                </li>
                                <li
                                    ref={contactMenuRef}
                                    className="contact-dropdown"
                                    onMouseEnter={openContactMenu}
                                    onMouseLeave={scheduleCloseContactMenu}
                                >
                                    <button
                                        type="button"
                                        className="nav-cta nav-contact-trigger"
                                        aria-expanded={isContactMenuOpen}
                                        aria-haspopup="true"
                                        onClick={() => {
                                            clearCloseTimer();
                                            setIsContactMenuOpen((prev) => !prev);
                                        }}
                                    >
                                        Contact Us
                                    </button>

                                    <div className={`contact-dropdown-menu ${isContactMenuOpen ? 'open' : ''}`}>
                                        <Link to="/schedule" className="contact-dropdown-option">Schedule a Call</Link>
                                        <Link to="/contact" className="contact-dropdown-option secondary">Contact Us</Link>
                                    </div>
                                </li>
                            </ul>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            className="hamburger"
                            onClick={() => setIsOpen(true)}
                            aria-label="Open menu"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation Drawer */}
            <div className={`mobile-menu ${isOpen ? 'active' : ''}`} inert={!isOpen ? true : undefined}>
                <div className="container">

                    {/* ── Drawer header bar with gradient + logo + close ── */}
                    <div className="mobile-menu-header">
                        <Link to="/" className="logo" onClick={() => setIsOpen(false)}>
                            <img
                                src="/brand-logo.png?v=2"
                                alt="BKX Labs"
                                className="logo-img"
                                width="500"
                                height="117"
                            />
                        </Link>
                        <button
                            className="hamburger close-btn"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close menu"
                            style={{ color: '#1e293b' }}
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* ── Nav links ── */}
                    <ul className="mobile-nav-links">
                        {!location.pathname.startsWith('/restricted-portal') && (
                            <>
                                <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
                                <li><Link to="/services" onClick={() => setIsOpen(false)}>Services</Link></li>
                                <li><Link to="/process" onClick={() => setIsOpen(false)}>Process</Link></li>
                                <li><Link to="/case-study" onClick={() => setIsOpen(false)}>Case Study</Link></li>
                                <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
                                <li>
                                    <a href={storeUrl} className="nav-store-badge mobile" onClick={() => setIsOpen(false)}>
                                        Store
                                    </a>
                                </li>

                                {/* Divider */}
                                <hr className="mobile-divider" />

                                {/* CTA Buttons pinned to bottom */}
                                <li className="mobile-cta-group">
                                    <Link to="/schedule" className="btn btn-secondary" onClick={() => setIsOpen(false)}>Schedule a Call</Link>
                                    <Link to="/contact" className="btn btn-primary" onClick={() => setIsOpen(false)}>Contact Us</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Navbar;
