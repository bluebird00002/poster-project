import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { HiMenu, HiX } from "react-icons/hi";
import { colors } from "../theme";
import { config } from "../config";
import logoImg from "../assets/BussinessLogo.png";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  const sectionIds = ["home", "about", "services", "portfolio", "contact"];
  const [activeSection, setActiveSection] = useState(() => {
    const hash = window.location.hash.slice(1);
    return sectionIds.includes(hash) ? hash : "home";
  });

  const navItems = [
    { label: "Home", to: "home" },
    { label: "About", to: "about" },
    { label: "Services", to: "services" },
    { label: "Products", to: "portfolio" },
    { label: "Contact", to: "contact" },
  ];

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const updateHash = (section) => {
    const url = `${window.location.pathname}${window.location.search}#${section}`;
    window.history.replaceState(null, "", url);
  };

  const scrollSyncReady = useRef(false);
  useEffect(() => {
    const t = setTimeout(() => { scrollSyncReady.current = true; }, 400);
    return () => clearTimeout(t);
  }, []);

  // Sync URL hash when active section changes from scroll (after initial load)
  useEffect(() => {
    if (scrollSyncReady.current && isHomePage && activeSection && window.location.hash !== `#${activeSection}`) {
      updateHash(activeSection);
    }
  }, [isHomePage, activeSection]);

  // Handle section visibility to update active nav item
  useEffect(() => {
    const handleSetActive = (section) => {
      setActiveSection(section);
    };

    // Observer for sections
    const sections = ["home", "about", "services", "portfolio", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handleSetActive(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      className={`navbar ${scrolled ? "scrolled" : ""}`}
      style={{
        background: scrolled ? colors.backgroundSecondary : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
      }}
    >
      <div className="navbar-container">
        {/* Logo */}
        <motion.div
          className="navbar-logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isHomePage ? (
            <ScrollLink to="home" smooth={true} duration={500} className="navbar-logo-link" onClick={() => updateHash("home")}>
              <img src={logoImg} alt={config.businessName} className="navbar-logo-img" />
              <span className="navbar-logo-text"><span style={{ color: colors.ricBlue }}>Ric</span><span style={{ color: colors.accentOrange }}>Raphix</span></span>
            </ScrollLink>
          ) : (
            <Link to="/" className="navbar-logo-link">
              <img src={logoImg} alt={config.businessName} className="navbar-logo-img" />
              <span className="navbar-logo-text"><span style={{ color: colors.ricBlue }}>Ric</span><span style={{ color: colors.accentOrange }}>Raphix</span></span>
            </Link>
          )}
        </motion.div>

        {/* Desktop Navigation */}
        <div className="navbar-menu desktop-menu">
          {navItems.map((item, index) => (
            <motion.div key={item.to} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.1 }}>
              {isHomePage && item.to !== "portfolio" ? (
                <ScrollLink
                  to={item.to}
                  smooth={true}
                  duration={500}
                  className={`nav-link ${activeSection === item.to ? "active" : ""}`}
                  onClick={() => updateHash(item.to)}
                >
                  {item.label}
                  {activeSection === item.to && (
                    <motion.div className="active-indicator" layoutId="activeIndicator" />
                  )}
                </ScrollLink>
              ) : item.to === "portfolio" ? (
                <Link to="/portfolio" className={`nav-link ${!isHomePage ? "active" : ""}`}>
                  {item.label}
                  {!isHomePage && (
                    <motion.div className="active-indicator" layoutId="activeIndicator" />
                  )}
                </Link>
              ) : (
                <Link
                  to={item.to === "portfolio" ? "/portfolio" : `/#${item.to}`}
                  className={`nav-link ${item.to === "portfolio" ? "active" : ""}`}
                >
                  {item.label}
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="navbar-auth">
          <motion.button
            className="navbar-auth-btn navbar-signin"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button>
          <motion.button
            className="navbar-auth-btn navbar-signup"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </motion.button>
        </div>

        {/* Hamburger Menu */}
        <motion.button
          className="hamburger"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item) =>
              isHomePage && item.to !== "portfolio" ? (
                <ScrollLink
                  key={item.to}
                  to={item.to}
                  smooth={true}
                  duration={500}
                  className={`mobile-nav-link ${activeSection === item.to ? "active" : ""}`}
                  onClick={() => { updateHash(item.to); setIsOpen(false); }}
                >
                  {item.label}
                </ScrollLink>
              ) : item.to === "portfolio" ? (
                <Link
                  key={item.to}
                  to="/portfolio"
                  className={`mobile-nav-link ${!isHomePage ? "active" : ""}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.to}
                  to={item.to === "portfolio" ? "/portfolio" : `/#${item.to}`}
                  className={`mobile-nav-link ${item.to === "portfolio" ? "active" : ""}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="mobile-auth">
              <button className="mobile-auth-btn mobile-signin" onClick={() => setIsOpen(false)}>
                Sign In
              </button>
              <button className="mobile-auth-btn mobile-signup" onClick={() => setIsOpen(false)}>
                Sign Up
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
