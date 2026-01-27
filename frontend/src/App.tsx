import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Process from './pages/Process';
import CaseStudy from './pages/CaseStudy';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import RestrictedLogin from './pages/Restricted/Login';
import RestrictedDashboard from './pages/Restricted/Dashboard';
import PdfViewer from './pages/PdfViewer';

import ScrollToTop from './components/ui/ScrollToTop';

function App() {
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
          <Route path="/restricted-portal" element={<RestrictedLogin />} />
          <Route path="/restricted-portal/dashboard" element={<RestrictedDashboard />} />
          <Route path="/:type" element={<PdfViewer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;


