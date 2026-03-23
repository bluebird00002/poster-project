import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { portfolio } from "../data/portfolio";
import { useLanguage } from "../i18n/LanguageContext";
import "./Portfolio.css";

const Portfolio = () => {
  const { t } = useLanguage();
  const portfolioItems = portfolio.slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section id="portfolio" className="portfolio">
      <div className="portfolio-container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            {t("portfolioTitle")}
            <span className="title-underline" />
          </h2>
          <p className="section-subtitle">{t("portfolioSubtitle")}</p>
        </motion.div>

        {/* Portfolio Grid - Static 4 items */}
        <motion.div
          className="portfolio-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="portfolio-item"
              variants={itemVariants}
            >
              <div className="portfolio-image">
                <img src={item.image} alt={item.title} />
                <div className="portfolio-overlay">
                  <span className="portfolio-category">{item.category}</span>
                  <p className="portfolio-title">{item.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View Products Button */}
        <motion.div 
          className="portfolio-see-more" 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.5 }}
        >
          <Link to="/portfolio">
            <motion.button 
              className="see-more-btn" 
              whileHover={{ scale: 1.05 }} 
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
