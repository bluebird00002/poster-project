import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { colors } from "../theme";
import { useLanguage } from "../i18n/LanguageContext";
import heroImage from "../assets/herobackground.png";
import heroImage2 from "../assets/ric raphix 3d.png";
import "./Hero.css";

const Hero = () => {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Image entrance animation variants
  const imageVariants = {
    hidden: {
      opacity: 0,
      x: isMobile ? 0 : 200,
      scale: 0.5,
      rotate: isMobile ? 0 : -45
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2
      }
    }
  };

  const singleImageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotate: -15
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section id="home" className="hero">
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
        {/* Left Image - ric raphix 3d.png */}
        <motion.div
          className="hero-image-container hero-image-left"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="hero-image-wrapper"
            animate={{
              y: [0, -10, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img
              src={heroImage2}
              alt="Ric Raphix 3D"
              className="hero-image"
            />
          </motion.div>
        </motion.div>

        {/* Main Content - Center */}
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Heading - Two Lines No Wrap */}
          <motion.h1 className="hero-title" variants={itemVariants}>
            <span className="hero-title-line1">{t("heroTitleStart")}</span>
            <span className="hero-title-line2">{t("heroTitleAccent")}</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p className="hero-subtitle" variants={itemVariants}>
            {t("heroSubtitle")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div className="hero-buttons" variants={itemVariants}>
            <Link to="/works">
              <motion.button
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("heroCta")}
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Image - herobackground.png */}
        <motion.div
          className="hero-image-container hero-image-right"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="hero-image-wrapper"
            animate={{
              y: [0, -10, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            <img
              src={heroImage}
              alt="Hero Background"
              className="hero-image"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
