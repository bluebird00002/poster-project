import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "../i18n/LanguageContext";
import "./About.css";

// SVG Icons as components
const VisionIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const MissionIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const ValuesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const About = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const missionItems = [
    "To create powerful design solutions that communicate clearly and attractively.",
    "To provide reliable, high-quality printing at competitive prices.",
    "To build long-term partnerships through consistency, creativity, and excellent service."
  ];

  const coreValues = [
    { title: "Creativity", desc: "Fresh ideas, bold concepts, and unique visual identity." },
    { title: "Quality", desc: "Precision in design and excellence in print production." },
    { title: "Professionalism", desc: "Timely delivery and consistent service." },
    { title: "Innovation", desc: "Modern approaches, tools, and techniques." },
    { title: "Customer Focus", desc: "Your brand goals guide our process." }
  ];

  return (
    <section id="about" className="about" ref={ref}>
      <div className="about-container">
        <motion.div
          className="about-wrapper"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Header Section */}
          <motion.div className="about-header" variants={itemVariants}>
            <span className="about-label">{t("aboutLabel")}</span>
            <h2 className="about-main-title">Who We Are</h2>
            <div className="title-underline"></div>
          </motion.div>

          {/* Intro Text */}
          <motion.div className="about-intro" variants={itemVariants}>
            <p className="about-intro-text">{t("aboutTitle")}</p>
            <p className="about-intro-text">{t("aboutP1")}</p>
            <p className="about-intro-text">{t("aboutP2")}</p>
          </motion.div>

          {/* Cards Grid - Vision, Mission, Values */}
          <div className="about-cards-grid">
            {/* Vision Card */}
            <motion.div className="about-card vision-card" variants={cardVariants}>
              <div className="card-icon vision-icon">
                <VisionIcon />
              </div>
              <h3 className="card-title">Vision</h3>
              <p className="card-text">
                To become a top creative and printing agency known for innovation, quality, and exceptional customer experience.
              </p>
            </motion.div>

            {/* Mission Card */}
            <motion.div className="about-card mission-card" variants={cardVariants}>
              <div className="card-icon mission-icon">
                <MissionIcon />
              </div>
              <h3 className="card-title">Mission</h3>
              <ul className="card-list">
                {missionItems.map((item, index) => (
                  <li key={index} className="card-list-item">
                    <span className="check-icon"><CheckIcon /></span>
                    <span className="list-text">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Core Values Card */}
            <motion.div className="about-card values-card" variants={cardVariants}>
              <div className="card-icon values-icon">
                <ValuesIcon />
              </div>
              <h3 className="card-title">Core Values</h3>
              <div className="values-grid">
                {coreValues.map((value, index) => (
                  <div key={index} className="value-item">
                    <span className="value-bullet">{value.title}</span>
                    <span className="value-desc">{value.desc}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
