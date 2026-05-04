import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";
import "./Portfolio.css";

// Dynamic import for all portfolio images (excluding videos)
const imageModules = import.meta.glob("../assets/portifolio/*.{png,jpg,jpeg,svg}", { eager: true });
const allPortfolioImages = Object.values(imageModules).map((mod) => mod.default);

// Import videos separately
import eafVideo from "../assets/portifolio/EAFmp4.mp4";
import shakinaVideo from "../assets/portifolio/shakina.mp4";

const Portfolio = () => {
  const { t } = useLanguage();

  // Create diagonal layout: video 1, image 2, image 3, video 4
  // Ensure images exist before adding them
  const displayItems = [
    { type: "video", src: eafVideo, title: "Indoor wall sign" },
  ];

  // Add image 1 if it exists
  if (allPortfolioImages.length > 0 && allPortfolioImages[0]) {
    displayItems.push({ type: "image", src: allPortfolioImages[0], title: "Corporate Branding" });
  }

  // Add image 2 if it exists
  if (allPortfolioImages.length > 1 && allPortfolioImages[1]) {
    displayItems.push({ type: "image", src: allPortfolioImages[1], title: "Corporate Branding" });
  }

  // Add video 4
  displayItems.push({ type: "video", src: shakinaVideo, title: "Indoor wall sign" });

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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="portfolio" className="portfolio">
      <div className="portfolio-container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">{t("workTag")}</span>
          <h2 className="section-title">
            {t("portfolioTitle")}
            <span className="title-underline" />
          </h2>
          <p className="section-subtitle">{t("portfolioSubtitle")}</p>
        </motion.div>

        {/* Portfolio Display - Clean Grid */}
        <motion.div
          className="portfolio-clean-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {displayItems.filter(item => item.src).map((item, index) => {
            const isVideo = item.type === "video";

            return (
              <motion.div
                key={index}
                className={`portfolio-card ${isVideo ? 'portfolio-card-video' : ''}`}
                variants={itemVariants}
              >
                <div className="portfolio-card-img">
                  {isVideo ? (
                    <video
                      src={item.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="portfolio-video"
                    />
                  ) : (
                    <img src={item.src} alt={`${item.title}`} loading="lazy" />
                  )}
                  <div className="portfolio-card-overlay">
                    <span className="portfolio-category-label">{item.title}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* See All Button */}
        <motion.div 
          className="portfolio-footer" 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/works">
            <motion.button 
              className="view-all-btn" 
              whileHover={{ scale: 1.05, backgroundColor: "#f97316" }} 
              whileTap={{ scale: 0.95 }}
            >
              {t("portfolioCta")}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
