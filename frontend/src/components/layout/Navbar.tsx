import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-content">
                    <Link to="/" className="logo">
                        <img src="/LOGO.png" alt="BKX Labs" style={{ height: '40px' }} />
                    </Link>

                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/process">Process</Link></li>
                        <li><Link to="/case-study">Case Study</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact" className="nav-cta">Contact</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
