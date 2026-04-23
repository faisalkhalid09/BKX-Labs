import { Link } from 'react-router-dom';
import './ToolsLayout.css';

export function ToolsHeader() {
  const storeUrl = import.meta.env.VITE_STORE_URL || (import.meta.env.VITE_API_URL || '').replace('/api', '') + '/store';

  return (
    <header className="tools-header">
      <div className="tools-header-inner">
        {/* Left Nav */}
        <div className="tools-header-side left">
          <Link to="/" className="tools-header-link">Home</Link>
          <Link to="/contact" className="tools-header-link">Contact Us</Link>
        </div>

        {/* Center Logo */}
        <div className="tools-header-logo">
          <Link to="/tools" className="tools-logo-anchor">
            <img 
              src="/favicon-32x32.png" 
              alt="BKX Labs Logo" 
              className="tools-favicon-img" 
            />
          </Link>
        </div>

        {/* Right Nav */}
        <div className="tools-header-side right">
          <Link to="/tools" className="tools-header-link">All Tools</Link>
          <a href={storeUrl} className="tools-header-link">Store</a>
        </div>
      </div>
    </header>
  );
}

export function ToolsFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="tools-footer">
      <div className="tools-footer-content">
        <div className="tools-footer-section">
          <h3>About These Tools</h3>
          <p>Fast-loading, search-ready utilities for technical decision-making. Each tool is built for speed and accuracy.</p>
        </div>

        <div className="tools-footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/tools">All Tools</Link></li>
            <li><a href="https://bkxlabs.com">BKX Labs Main Site</a></li>
            <li><a href="https://bkxlabs.com/contact">Contact</a></li>
          </ul>
        </div>

        <div className="tools-footer-section">
          <h3>Resources</h3>
          <ul>
            <li><a href="https://bkxlabs.com/privacy-policy">Privacy Policy</a></li>
            <li><a href="https://bkxlabs.com/tos">Terms of Service</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
      </div>

      <div className="tools-footer-bottom">
        <p>&copy; {currentYear} BKX Labs. All rights reserved.</p>
        <p className="tools-footer-tagline">Compliance • Security • Infrastructure Tools</p>
      </div>
    </footer>
  );
}

export function ToolsLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="tools-layout">
      <ToolsHeader />
      <main className="tools-main">
        {children}
      </main>
      <ToolsFooter />
    </div>
  );
}
