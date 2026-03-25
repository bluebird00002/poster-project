import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { HiMenu, HiX, HiTranslate } from "react-icons/hi";
import { colors } from "../theme";
import { config } from "../config";
import { useLanguage } from "../i18n/LanguageContext";
import logoImg from "../assets/BussinessLogo.png";
import "./Navbar.css";

const Navbar = () => {
  const { language, toggleLanguage, t } = useLanguage();
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
  const scrollSectionIds = ["home", "about", "services", "contact"];
  const sectionIds = ["home", "about", "services", "works", "contact"];
  const [activeSection, setActiveSection] = useState(() => {
    const hash = window.location.hash.slice(1);
    return sectionIds.includes(hash) ? hash : "home";
  });

  const navItems = [
    { label: t("navHome"), to: "home" },
    { label: t("navAbout"), to: "about" },
    { label: t("navServices"), to: "services" },
    { label: t("navProducts"), to: "products", routeTo: "/portfolio" },
    { label: t("navWorks"), to: "works", routeTo: "/works" },
    { label: t("navContact"), to: "contact" },
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
    if (
      scrollSyncReady.current &&
      isHomePage &&
      activeSection &&
      scrollSectionIds.includes(activeSection) &&
      window.location.hash !== `#${activeSection}`
    ) {
      updateHash(activeSection);
    }
  }, [isHomePage, activeSection]);

  // Handle section visibility to update active nav item
  useEffect(() => {
    const handleSetActive = (section) => {
      setActiveSection(section);
    };

    const normalizeSectionId = (id) => {
      // The landing "portfolio" preview section now represents "works".
      if (id === "portfolio") return "works";
      return id;
    };

    // Observer for sections
    const sections = ["home", "about", "services", "portfolio", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handleSetActive(normalizeSectionId(entry.target.id));
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
              {isHomePage && scrollSectionIds.includes(item.to) ? (
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
              ) : item.routeTo ? (
                <Link
                  to={item.routeTo}
                  className={`nav-link ${
                    location.pathname === item.routeTo ||
                    (isHomePage && item.to === "works" && activeSection === "works")
                      ? "active"
                      : ""
                  }`}
                >
                  {item.label}
                  {location.pathname === item.routeTo ||
                  (isHomePage && item.to === "works" && activeSection === "works") ? (
                    <motion.div className="active-indicator" layoutId="activeIndicator" />
                  ) : null}
                </Link>
              ) : (
                <Link
                  to={`/#${item.to}`}
                  className="nav-link"
                >
                  {item.label}
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        <div className="navbar-controls">
          <motion.button
            type="button"
            className="language-toggle"
            onClick={toggleLanguage}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            aria-label={t("language")}
            title={language === "en" ? t("switchToSw") : t("switchToEn")}
          >
            <HiTranslate size={18} />
            <span>{language === "en" ? "SW" : "EN"}</span>
          </motion.button>

          {/* Hamburger Menu */}
          <motion.button
            className="hamburger"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </motion.button>
        </div>
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
              isHomePage && scrollSectionIds.includes(item.to) ? (
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
              ) : item.routeTo ? (
                <Link
                  key={item.to}
                  to={item.routeTo}
                  className={`mobile-nav-link ${
                    location.pathname === item.routeTo ||
                    (isHomePage && item.to === "works" && activeSection === "works")
                      ? "active"
                      : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.to}
                  to={`/#${item.to}`}
                  className="mobile-nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
