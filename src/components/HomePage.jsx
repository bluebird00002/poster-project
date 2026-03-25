import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Portfolio from './Portfolio';
import Reviews from './Reviews';
import Contact from './Contact';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';

const HomePage = () => {
  const { hash } = useLocation();

  // Scroll to section when navigating from another page with hash (e.g. /#about)
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const timeoutId = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [hash]);

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Reviews />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
};

export default HomePage;
