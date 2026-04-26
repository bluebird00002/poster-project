import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import { useLanguage } from "../i18n/LanguageContext";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import "./OurWorksPage.css";

// Dynamic import for all portfolio images
const imageModules = import.meta.glob("../assets/portifolio/*.{png,jpg,jpeg,svg}", { eager: true });
const rawImages = Object.values(imageModules).map((mod) => mod.default);

// Swap Project 17 (index 16) with the last image (index 17)
const allPortfolioImages = [...rawImages];
if (allPortfolioImages.length >= 18) {
  const temp = allPortfolioImages[16];
  allPortfolioImages[16] = allPortfolioImages[allPortfolioImages.length - 1];
  allPortfolioImages[allPortfolioImages.length - 1] = temp;
}

const ITEMS_PER_PAGE = 9;

const OurWorksPage = () => {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pages
  const totalPages = Math.ceil(allPortfolioImages.length / ITEMS_PER_PAGE);
  const currentImages = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return allPortfolioImages.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Navbar />
      <section className="works-page">
        <div className="works-container">
          <motion.div
            className="works-hero"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="works-title">{t("worksTitle")}</h1>
            <p className="works-subtitle">{t("worksSubtitle")}</p>
            <div className="title-accent" />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              className="works-staggered-layout"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {currentImages.map((img, index) => {
                const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
                
                // Categorize images based on their filename/index
                const getCategory = (path) => {
                  const filename = path.split('/').pop();
                  const num = parseInt(filename.match(/\d+/)?.[0] || "0");
                  
                  if ([3, 21, 23, 24, 25, 29, 30, 35, 40].includes(num)) return t("catBusinessCard");
                  if ([1, 2, 4, 13, 14, 15, 16, 17, 19, 22, 28, 33, 34, 36, 37, 38, 39].includes(num)) return t("catFlyer");
                  if ([10, 12, 18, 32].includes(num)) return t("catBanner");
                  if ([20, 8].includes(num)) return t("catOutdoor");
                  if ([5, 31].includes(num)) return t("catStationary");
                  if ([9, 26, 27].includes(num)) return t("catSignage");
                  if ([11].includes(num)) return t("catLogo");
                  return t("catBranding");
                };

                const category = getCategory(img);

                // Create different animation sets
                const animations = [
                  { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } },
                  { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } },
                  { hidden: { opacity: 0, y: 50, scale: 0.9 }, visible: { opacity: 1, y: 0, scale: 1 } },
                  { hidden: { opacity: 0, rotate: -5, scale: 0.8 }, visible: { opacity: 1, rotate: 0, scale: 1 } }
                ];
                const anim = animations[globalIndex % animations.length];

                return (
                  <motion.div
                    key={globalIndex}
                    className="stagger-item"
                    initial={anim.hidden}
                    whileInView={anim.visible}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 0.8, 
                      delay: (index % 3) * 0.15,
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                  >
                    <div className="stagger-img-wrapper">
                      <img src={img} alt={`${category} ${globalIndex + 1}`} loading="lazy" />
                      <div className="stagger-overlay">
                        <div className="stagger-line" />
                        <span className="stagger-label">{category}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                className="pagination-btn"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                aria-label="Previous page"
              >
                <HiArrowLeft size={20} />
              </button>

              <div className="pagination-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    className={`pagination-num ${currentPage === num ? "active" : ""}`}
                    onClick={() => handlePageChange(num)}
                  >
                    {num}
                  </button>
                ))}
              </div>

              <button 
                className="pagination-btn"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                aria-label="Next page"
              >
                <HiArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
};

export default OurWorksPage;

