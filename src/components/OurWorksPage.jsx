import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import { works, workCategories } from "../data/works";
import { config } from "../config";
import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import "./OurWorksPage.css";

const OurWorksPage = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const requestWorkOrder = (work) => {
    const workTitle = language === "sw" ? work.titleSw : work.titleEn;
    const message = `${t("helloBusiness", { name: config.businessName })}\n\n${t("interestInWork")}\n• ${workTitle}\n\n${t(
      "shareAvailability"
    )}`;
    const url = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Navbar />
      <section className="works-page">
        <div className="works-container">
          <motion.div
            className="works-hero"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="section-title">{t("worksTitle")}</h1>
            <p className="section-subtitle">{t("worksSubtitle")}</p>
          </motion.div>

          <div className="category-bar">
            {workCategories.map((category) => (
              <button
                key={category}
                type="button"
                className={`category-btn ${activeCategory === category ? "active" : ""}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <motion.div
            className="works-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
          >
            {works
              .filter((work) => activeCategory === "All" || work.category === activeCategory)
              .map((work) => {
              const title = language === "sw" ? work.titleSw : work.titleEn;
              return (
                <motion.div
                  key={work.id}
                  className="work-card"
                  whileHover={{ y: -6 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="work-media">
                    <img src={work.image} alt={title} loading="lazy" />
                    <div className="work-media-gradient" />
                  </div>

                  <div className="work-body">
                    <div className="work-title">{title}</div>
                    <button
                      type="button"
                      className="work-order-btn"
                      onClick={() => requestWorkOrder(work)}
                    >
                      {t("placeOrder")}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
};

export default OurWorksPage;

