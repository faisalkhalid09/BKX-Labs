import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { ToolsLayoutWrapper } from './components/layout/ToolsLayout';
import Home from './pages/Home';
import Services from './pages/Services';
import Process from './pages/Process';
import CaseStudy from './pages/CaseStudy';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import PdfViewer from './pages/PdfViewer';
import RezgoDemo from './pages/RezgoDemo';
import ToolsIndex from './pages/ToolsIndex';
import ToolDetail from './pages/ToolDetail';
import GlossaryTermPage from './pages/glossary/[term]';

import ScrollToTop from './components/ui/ScrollToTop';
import { trackPageView } from './api/analytics';

import AppointmentSuccess from './pages/AppointmentSuccess';
import BookingPage from './pages/BookingPage';

function App() {
  const location = useLocation();
  const isToolsPage = location.pathname.startsWith('/tools');

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  if (isToolsPage) {
    return (
      <>
        <ScrollToTop />
        <ToolsLayoutWrapper>
          <Routes>
            <Route path="/tools" element={<ToolsIndex />} />
            <Route path="/tools/:slug" element={<ToolDetail />} />
          </Routes>
        </ToolsLayoutWrapper>
      </>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/process" element={<Process />} />
          <Route path="/case-study" element={<CaseStudy />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PdfViewer />} />
          <Route path="/TOS" element={<PdfViewer />} />
          <Route path="/dev-rezgo" element={<RezgoDemo />} />
          <Route path="/appointment-success" element={<AppointmentSuccess />} />
          <Route path="/schedule" element={<BookingPage />} />
          <Route path="/glossary/:term" element={<GlossaryTermPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;


