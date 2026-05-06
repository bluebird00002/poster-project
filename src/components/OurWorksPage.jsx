import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import { useLanguage } from "../i18n/LanguageContext";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import "./OurWorksPage.css";

// Import placeholder for broken images
import placeholderImg from "../assets/placeholder-image.jpg";

// Dynamic import for all portfolio images
const imageModules = import.meta.glob("../assets/portifolio/*.{png,jpg,jpeg,svg}", { eager: true });
const rawImages = Object.values(imageModules)
  .map((mod) => mod.default)
  .filter((path) => path && typeof path === 'string');

// Dynamic import for all portfolio videos except EAF and shakina
const videoModules = import.meta.glob("../assets/portifolio/*.{mp4,webm}", { eager: true });
const allVideos = Object.values(videoModules)
  .map((mod) => mod.default)
  .filter((path) => path && typeof path === 'string' && !path.includes("EAFmp4") && !path.includes("shakina"));

// Combine images and videos for Our Works page (excluding EAF and shakina)
let allPortfolioItems = [...allVideos, ...rawImages];

// Shuffle function to mix videos and images
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Shuffle the combined array
const allPortfolioImages = shuffleArray(allPortfolioItems);

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
              {currentImages.filter(item => item && typeof item === 'string').map((item, index) => {
                const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;

                // Determine category based on filename
                const getCategory = (path) => {
                  const lowerPath = path.toLowerCase();
                  if (lowerPath.includes('dynace')) {
                    return 'Cap & Tshirts embroidery';
                  }
                  if (lowerPath.includes('aqm36ks86p86hqs2u') || lowerPath.includes('secure')) {
                    return 'Indoor wall sign';
                  }
                  if (lowerPath.includes('legalbase') || lowerPath.includes('city solar lights') || lowerPath.includes('citylights') || lowerPath.includes('shikanimg') || lowerPath.includes('mspot') || lowerPath.includes('elegance')) {
                    return '3D luminous sign';
                  }
                  if (lowerPath.includes('bottles') || lowerPath.includes('eafoods')) {
                    return 'Bottle branding';
                  }
                  if (lowerPath.includes('business') || lowerPath.includes('cards')) {
                    return 'Business cards';
                  }
                  if (lowerPath.includes('notebook')) {
                    return 'Notebooks';
                  }
                  if (lowerPath.includes('umbrellabrand')) {
                    return 'Umbrella';
                  }
                  if (lowerPath.includes('eafbag')) {
                    return 'Bags';
                  }
                  if (lowerPath.includes('goldenbanana') || lowerPath.includes('potatoking')) {
                    return 'Food Branding';
                  }
                  if (lowerPath.includes('handbag')) {
                    return 'Promotional Bags';
                  }
                  if (lowerPath.includes('eafstaff')) {
                    return 'Staff Uniforms';
                  }
                  if (lowerPath.includes('badges')) {
                    return 'Corporate Badges';
                  }
                  if (lowerPath.includes('onja') || lowerPath.includes('wakala')) {
                    return 'Promotional Materials';
                  }
                  if (lowerPath.includes('aqm36ks86p86hqs2u') || lowerPath.includes('secure')) {
                    return 'Indoor wall sign';
                  }
                  if (lowerPath.includes('aqnmvty') || lowerPath.includes('minpromo') || lowerPath.includes('promotional')) {
                    return 'Min Promotional booth';
                  }
                  return t("catBranding");
                };

                const category = getCategory(item);

                // Check if item is a video
                const isVideo = typeof item === 'string' && item.match(/\.(mp4|webm)$/i);

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
                    className={`stagger-item ${isVideo ? 'stagger-item-video' : ''}`}
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
                      {isVideo ? (
                        <video
                          src={item}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="stagger-video"
                        />
                      ) : (
                        <img
                          src={item}
                          alt={`${category}`}
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = placeholderImg;
                            e.target.onerror = null;
                          }}
                        />
                      )}
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

