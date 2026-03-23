import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";
import { FaInstagram, FaTiktok, FaFacebook } from "react-icons/fa";
import { colors } from "../theme";
import { config } from "../config";
import logoImg from "../assets/BussinessLogo.png";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const updateHash = (section) => {
    const url = `${window.location.pathname}${window.location.search}#${section}`;
    window.history.replaceState(null, "", url);
  };

  const quickLinks = [
    { label: "Home", to: "home", type: "scroll" },
    { label: "About", to: "about", type: "scroll" },
    { label: "Services", to: "services", type: "scroll" },
    // Navigate to the products page, not the `#portfolio` preview section.
    { label: "Products", to: "/portfolio", type: "route" },
    { label: "Contact", to: "contact", type: "scroll" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <footer className="footer">
      <motion.div
        className="footer-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Left Column */}
        <motion.div className="footer-column" variants={itemVariants}>
          <Link to="/" className="footer-logo-wrap">
            <img src={logoImg} alt={config.businessName} className="footer-logo-img" />
            <h3 className="footer-logo">
              <span style={{ color: colors.ricBlue }}>Ric</span><span style={{ color: colors.accentOrange }}>Raphix</span>
            </h3>
          </Link>
          <p className="footer-tagline">{config.tagline}</p>
          <div className="footer-socials">
            <motion.a
              href={config.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, color: colors.accentBlue }}
            >
              <FaFacebook size={22} />
            </motion.a>
            <motion.a
              href={config.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, color: colors.accentBlue }}
            >
              <FaInstagram size={22} />
            </motion.a>
            <motion.a
              href={config.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, color: colors.accentBlue }}
            >
              <FaTiktok size={22} />
            </motion.a>
          </div>
        </motion.div>

        {/* Center Column - Quick Links */}
        <motion.div className="footer-column" variants={itemVariants}>
          <h4 className="footer-title">Quick Links</h4>
          <nav className="footer-links">
            {quickLinks.map((link) => (
              link.type === "route" ? (
                <Link key={link.to} to={link.to} className="footer-link">
                  {link.label}
                </Link>
              ) : (
                isHomePage ? (
                  <ScrollLink
                    key={link.to}
                    to={link.to}
                    smooth={true}
                    duration={500}
                    className="footer-link"
                    onClick={() => updateHash(link.to)}
                  >
                    {link.label}
                  </ScrollLink>
                ) : (
                  <Link key={link.to} to={`/#${link.to}`} className="footer-link">
                    {link.label}
                  </Link>
                )
              )
            ))}
          </nav>
        </motion.div>

        {/* Right Column - Contact */}
        <motion.div className="footer-column" variants={itemVariants}>
          <h4 className="footer-title">Contact</h4>
          <div className="footer-contact">
            <a href={`tel:${config.phone}`} className="footer-contact-item">
              <HiPhone size={18} />
              <span>{config.phone}</span>
            </a>
            <a href={`mailto:${config.email}`} className="footer-contact-item">
              <HiMail size={18} />
              <span>{config.email}</span>
            </a>
            <div className="footer-contact-item">
              <HiLocationMarker size={18} />
              <span>{config.location}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Footer Bottom */}
      <motion.div
        className="footer-bottom"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="footer-divider" />
        <p className="footer-copyright">
          &copy; {currentYear} {config.businessName}. All rights reserved.
        </p>
        <p className="footer-credit">
          Built with passion for African businesses
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
