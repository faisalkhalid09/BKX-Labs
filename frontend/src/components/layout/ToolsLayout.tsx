import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ToolsLayout.css';

export function ToolsHeader() {
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Don't trigger if jumping/bouncing (iOS) or at the very top
      if (currentScrollY < 0) return;
      if (currentScrollY < 50) {
        setIsHidden(false);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Hide if scrolling down, show if scrolling up (even a little)
      if (currentScrollY > lastScrollY.current) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`tools-header ${isHidden ? 'hidden' : ''}`}>
      <div className="tools-header-content">
        <div className="tools-logo">
          <Link to="/tools" className="tools-logo-link">
            <svg width="32" height="32" viewBox="0 0 32 32" className="tools-logo-icon">
              <path d="M16 4L6 10v12l10 6 10-6V10l-10-6z" fill="currentColor" opacity="0.8"/>
              <path d="M16 10l5 3v6l-5 3-5-3v-6l5-3" fill="currentColor"/>
            </svg>
            <span className="tools-logo-text">Utility Tools</span>
          </Link>
        </div>

        <nav className="tools-nav">
          <Link to="/tools" className="tools-nav-link">All Tools</Link>
          <a href="https://bkxlabs.com" className="tools-nav-link tools-nav-external">Back to Main</a>
        </nav>
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
