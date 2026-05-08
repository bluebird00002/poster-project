import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "../i18n/LanguageContext";
import { FiEye, FiTarget, FiAward, FiCheckCircle } from "react-icons/fi";
import portfolioImg from "../assets/portfolio.png";
import "./About.css";

const About = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const missionItems = [
    t("aboutMission1"),
    t("aboutMission2"),
    t("aboutMission3")
  ];

  const coreValues = [
    { title: t("aboutVal1Title"), icon: <FiAward />, desc: t("aboutVal1Desc") },
    { title: t("aboutVal2Title"), icon: <FiAward />, desc: t("aboutVal2Desc") },
    { title: t("aboutVal3Title"), icon: <FiAward />, desc: t("aboutVal3Desc") },
    { title: t("aboutVal4Title"), icon: <FiAward />, desc: t("aboutVal4Desc") },
    { title: t("aboutVal5Title"), icon: <FiAward />, desc: t("aboutVal5Desc") },
  ];

  return (
    <section id="about" className="about-section" ref={ref}>
      {/* Background Decor */}
      <div className="about-bg-glow about-bg-glow-1"></div>
      <div className="about-bg-glow about-bg-glow-2"></div>

      <div className="about-container">
        <motion.div
          className="about-content-wrapper"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Top Row: Intro & Illustration */}
          <div className="about-top-grid">
            <motion.div className="about-text-content" variants={itemVariants}>
              <div className="about-tag">
                <span className="tag-line"></span>
                <span className="tag-text">{t("aboutLabel")}</span>
              </div>
              <h2 className="about-title">
                {t("aboutCrafting").split(" ").slice(0, -1).join(" ")} <span className="text-gradient">{t("aboutCrafting").split(" ").slice(-1)}</span>
              </h2>
              <div className="about-description">
                <p className="description-lead">{t("aboutTitle")}</p>
                <p>{t("aboutP1")}</p>
                <p>{t("aboutP2")}</p>
              </div>
              
              <div className="about-stats">
                <div className="stat-item">
                  <span className="stat-num">500+</span>
                  <span className="stat-label">{t("aboutProjects")}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">100%</span>
                  <span className="stat-label">{t("aboutQuality")}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">{t("aboutSupport")}</span>
                  <span className="stat-label">{t("aboutSupportLabel")}</span>
                </div>
              </div>
            </motion.div>

            <motion.div className="about-illustration-wrap" variants={itemVariants}>
              <div className="illustration-backdrop"></div>
              <img 
                src={portfolioImg} 
                alt={t("aboutImageAlt")} 
                className="about-main-img"
              />
              <div className="floating-badge badge-1">
                <FiCheckCircle className="badge-icon" />
                <span>{t("aboutPremium")}</span>
              </div>
            </motion.div>
          </div>

          {/* Bottom Row: Vision & Mission Cards */}
          <div className="about-cards-row">
            {/* Vision Card */}
            <motion.div className="premium-card glass-morphism" variants={cardVariants} whileHover={{ y: -10 }}>
              <div className="card-top">
                <div className="card-icon-box icon-vision">
                  <FiEye />
                </div>
                <h3 className="card-heading">{t("aboutVisionTitle")}</h3>
              </div>
              <p className="card-body-text">
                {t("aboutVisionText")}
              </p>
              <div className="card-footer-glow"></div>
            </motion.div>

            {/* Mission Card */}
            <motion.div className="premium-card glass-morphism" variants={cardVariants} whileHover={{ y: -10 }}>
              <div className="card-top">
                <div className="card-icon-box icon-mission">
                  <FiTarget />
                </div>
                <h3 className="card-heading">{t("aboutMissionTitle")}</h3>
              </div>
              <ul className="mission-list">
                {missionItems.map((item, idx) => (
                  <li key={idx}>
                    <FiCheckCircle className="list-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="card-footer-glow"></div>
            </motion.div>

            {/* Values Card */}
            <motion.div className="premium-card glass-morphism" variants={cardVariants} whileHover={{ y: -10 }}>
              <div className="card-top">
                <div className="card-icon-box icon-values">
                  <FiAward />
                </div>
                <h3 className="card-heading">{t("aboutValuesTitle")}</h3>
              </div>
              <div className="values-scroll-container">
                <div className="values-stack marquee-vertical">
                  {/* Duplicate items for seamless loop */}
                  {[...coreValues, ...coreValues].map((val, idx) => (
                    <div key={idx} className="value-mini-card">
                      <span className="val-title">{val.title}</span>
                      <span className="val-desc">{val.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-footer-glow"></div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
