import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

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
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="navbar-content">
                    <Link to="/" className="logo">
                        <img src="/brand-logo.png" alt="BKX Labs" className="logo-img" />
                    </Link>

                    {/* Desktop Navigation */}
                    {!location.pathname.startsWith('/restricted-portal') && (
                        <ul className="nav-links desktop-only">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/services">Services</Link></li>
                            <li><Link to="/process">Process</Link></li>
                            <li><Link to="/case-study">Case Study</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/contact" className="nav-cta">Contact</Link></li>
                        </ul>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        className="hamburger"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Content */}
            <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
                <div className="container">
                    <ul className="mobile-nav-links">
                        {!location.pathname.startsWith('/restricted-portal') && (
                            <>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/services">Services</Link></li>
                                <li><Link to="/process">Process</Link></li>
                                <li><Link to="/case-study">Case Study</Link></li>
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/contact" className="btn btn-primary w-full">Contact Us</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
