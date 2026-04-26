import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";
import "./Reviews.stunning.css";

// Import all customer logos from the assets/customers folder dynamically
const customerLogos = Object.values(
  import.meta.glob('../assets/customers/*.{png,jpg,jpeg,svg,webp}', { eager: true, import: 'default' })
);

const Reviews = () => {
  const { t } = useLanguage();

  // If no logos are found, gracefully return null or a placeholder
  if (!customerLogos || customerLogos.length === 0) {
    return null; 
  }

  return (
    <section id="reviews" className="customers-section">
      <div className="customers-container">
        {/* Header */}
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">OUR ESTEEMED CUSTOMERS</h2>
          <div className="title-underline"></div>
        </motion.div>

        {/* Marquee Animation */}
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {customerLogos.map((logo, index) => (
              <div key={`set1-${index}`} className="customer-logo-box">
                <img src={logo} alt={`Customer logo ${index}`} className="customer-logo" loading="lazy" />
              </div>
            ))}
          </div>
          <div className="marquee-track" aria-hidden="true">
            {customerLogos.map((logo, index) => (
              <div key={`set2-${index}`} className="customer-logo-box">
                <img src={logo} alt={`Customer logo ${index}`} className="customer-logo" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
