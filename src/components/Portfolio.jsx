import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";
import "./Portfolio.css";

// Dynamic import for all portfolio images
const imageModules = import.meta.glob("../assets/portifolio/*.{png,jpg,jpeg,svg}", { eager: true });
const allPortfolioImages = Object.values(imageModules).map((mod) => mod.default);

const Portfolio = () => {
  const { t } = useLanguage();
  // Display only first 4 for the homepage section
  const displayImages = allPortfolioImages.slice(0, 4);

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
          {displayImages.map((img, index) => {
            // Categorize images based on their filename/index
            const getCategory = (path) => {
              const filename = path.split('/').pop();
              const num = parseInt(filename.match(/\d+/)?.[0] || "0");
              
              if ([3, 21, 23, 24, 25, 29, 30, 35, 40].includes(num)) return t("catBusinessCard");
              if ([1, 2, 4, 13, 14, 15, 16, 17, 19, 22, 28, 33, 34, 36, 37, 38, 39].includes(num)) return t("catFlyer");
              if ([10, 12, 18, 32].includes(num)) return t("catBanner");
              if ([20, 8, 20].includes(num)) return t("catOutdoor");
              if ([5, 31].includes(num)) return t("catStationary");
              if ([9, 26, 27].includes(num)) return t("catSignage");
              if ([11].includes(num)) return t("catLogo");
              return t("catBranding");
            };

            const category = getCategory(img);

            return (
              <motion.div
                key={index}
                className="portfolio-card"
                variants={itemVariants}
              >
                <div className="portfolio-card-img">
                  <img src={img} alt={`${category} ${index + 1}`} loading="lazy" />
                  <div className="portfolio-card-overlay">
                    <span className="portfolio-category-label">{category}</span>
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
