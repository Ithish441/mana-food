import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import './index.css';
import './App.css';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: false,
      touchInertiaMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on navigate
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isHomeAtTop = location.pathname === '/' && !isScrolled;

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''} ${isHomeAtTop ? 'nav-light' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="logo">MANA FOOD</Link>
        <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
        </button>
        <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>Our Story</Link>
          <Link to="/menu" className={location.pathname === '/menu' ? 'active' : ''}>Menu</Link>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Visit Us</Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <h2>MANA FOOD</h2>
          <p>Elevated Dining in a Modern Setting.</p>
        </div>
        <div className="footer-links">
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/about">Our Story</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/contact">Visit Us</Link>
        </div>
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Janapriya Apartment, back gate, Ambience Fort, Radha Krishna Nagar, Hyderguda, Hyderabad, Telangana 500048.</p>
          <p>+91 7207667827</p>
          <p>manafood@gmail.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MANA FOOD. All rights reserved.</p>
        <p className="footer-credit">
          Project By{' '}
          <a
            href="https://wa.me/917207667827"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-credit-link"
          >
            ITHISH JONNES
          </a>
        </p>
      </div>
    </footer>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div className="app">
      <SmoothScroll />
      <CustomCursor />
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
