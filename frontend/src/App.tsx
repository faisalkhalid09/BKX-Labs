import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import MouseFollower from './components/ui/MouseFollower';
import { ToolsLayoutWrapper } from './components/layout/ToolsLayout';
import Home from './pages/Home';
import Services from './pages/Services';
import Process from './pages/Process';
import CaseStudy from './pages/CaseStudy';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import RezgoDemo from './pages/RezgoDemo';
import ToolsIndex from './pages/ToolsIndex';
import ToolDetail from './pages/ToolDetail';
import GlossaryTermPage from './pages/glossary/[term]';
import HireLaravelDeveloper from './pages/HireLaravelDeveloper';
import HireReactDeveloper from './pages/HireReactDeveloper';
import TechnicalDebtRemediation from './pages/TechnicalDebtRemediation';
import CodebaseAudit from './pages/CodebaseAudit';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

import ScrollToTop from './components/ui/ScrollToTop';
import { trackPageView } from './api/analytics';

import AppointmentSuccess from './pages/AppointmentSuccess';
import BookingPage from './pages/BookingPage';

function App() {
  const location = useLocation();
  const isToolsShellPage = location.pathname.startsWith('/tools') || location.pathname.startsWith('/glossary');

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  if (isToolsShellPage) {
    return (
      <>
        <ScrollToTop />
        <ToolsLayoutWrapper>
          <Routes>
            <Route path="/tools" element={<ToolsIndex />} />
            <Route path="/tools/:slug" element={<ToolDetail />} />
            <Route path="/glossary/:term" element={<GlossaryTermPage />} />
          </Routes>
        </ToolsLayoutWrapper>
      </>
    );
  }

  return (
    <>
      <ScrollToTop />
      <MouseFollower />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/process" element={<Process />} />
          <Route path="/case-study" element={<CaseStudy />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/tos" element={<TermsOfService />} />
          <Route path="/hire-laravel-developer" element={<HireLaravelDeveloper />} />
          <Route path="/hire-react-developer" element={<HireReactDeveloper />} />
          <Route path="/technical-debt-remediation" element={<TechnicalDebtRemediation />} />
          <Route path="/codebase-audit" element={<CodebaseAudit />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/dev-rezgo" element={<RezgoDemo />} />
          <Route path="/appointment-success" element={<AppointmentSuccess />} />
          <Route path="/schedule" element={<BookingPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;


