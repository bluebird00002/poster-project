import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { colors } from "../theme";
import { useLanguage } from "../i18n/LanguageContext";
import logoImg from "../assets/BussinessLogo.png";
import "./Hero.css";

const Hero = () => {
  const { t } = useLanguage();
  // Floating orb animation variants
  const orbVariants = {
    float: {
      y: [0, -20, 0],
      x: [0, 10, 0],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
    },
  };

  // Text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="home" className="hero">
      {/* Hero now uses the global site watermark from App.jsx; local hero watermark removed to avoid duplication. */}
      {/* Animated Background Orbs */}
      <motion.div
        className="orb orb-orange"
        variants={orbVariants}
        animate="float"
        style={{
          background: `radial-gradient(circle, ${colors.accentOrange}40 0%, transparent 70%)`,
        }}
      />
      <motion.div
        className="orb orb-blue"
        variants={orbVariants}
        animate="float"
        transition={{ delay: 1 }}
        style={{
          background: `radial-gradient(circle, ${colors.accentBlue}40 0%, transparent 70%)`,
        }}
      />

      <div className="hero-container">
        {/* Main Content */}
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >


          {/* Main Heading */}
          <motion.h1 className="hero-title" variants={itemVariants}>
            {t("heroTitleStart")}{" "}
            <span style={{ color: colors.accentOrange }}>{t("heroTitleAccent")}</span> {t("heroTitleEnd")}
          </motion.h1>

          {/* Subtext */}
          <motion.p className="hero-subtitle" variants={itemVariants}>
            {t("heroSubtitle")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div className="hero-buttons" variants={itemVariants}>
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/portfolio">
                {t("heroCta")}
              </Link>
            </motion.button>

          </motion.div>
        </motion.div>

        {/* Stats Section */}
        { /* Removed stats chips to simplify hero layout */ }
      </div>
    </section>
  );
};

export default Hero;
