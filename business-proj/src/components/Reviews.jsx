import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiStar, FiUser, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { reviews } from "../data/reviews";
import { useLanguage } from "../i18n/LanguageContext";
import "./Reviews.stunning.css";

const Reviews = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [step, setStep] = useState(0);

  // Review writing/auth UI removed per requirement.
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const [cardsPerStep, setCardsPerStep] = useState(2);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setCardsPerStep(4);
      else if (window.innerWidth >= 768) setCardsPerStep(2);
      else setCardsPerStep(1); // Mobile: 1 card per animation step
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const totalSteps = Math.max(1, Math.ceil(reviews.length / cardsPerStep));

  const getVisibleReviews = (stepIndex) => {
    const start = (stepIndex * cardsPerStep) % reviews.length;
    return Array.from({ length: cardsPerStep }, (_, i) => {
      return reviews[(start + i) % reviews.length];
    });
  };

  const visibleReviews = getVisibleReviews(step);

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

  const cardVariants = {
    initial: (direction) => ({
      opacity: 0,
      x: 140 * direction,
      y: 18,
      scale: 0.98,
      filter: "blur(10px)",
    }),
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.65, ease: [0.2, 0.8, 0.2, 1] },
    },
    exit: (direction) => ({
      opacity: 0,
      x: -140 * direction,
      y: -14,
      scale: 0.98,
      filter: "blur(10px)",
      transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
    }),
    hover: {
      y: -10,
      scale: 1.02,
      boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
      transition: { duration: 0.25 },
    },
  };

  useEffect(() => {
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mql) return;

    const onChange = () => setReduceMotion(!!mql.matches);
    onChange();

    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else mql.addListener(onChange);

    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, []);

  useEffect(() => {
    if (!inView || isPaused || reduceMotion || totalSteps <= 1) return;

    const id = window.setInterval(() => {
      setDirection(1);
      setStep((s) => (s + 1) % totalSteps);
    }, 5200);

    return () => window.clearInterval(id);
  }, [inView, isPaused, reduceMotion, totalSteps]);

  const goPrev = () => {
    if (totalSteps <= 1) return;
    setDirection(-1);
    setIsPaused(true);
    setStep((s) => (s - 1 + totalSteps) % totalSteps);
    window.setTimeout(() => setIsPaused(false), 5000);
  };

  const goNext = () => {
    if (totalSteps <= 1) return;
    setDirection(1);
    setIsPaused(true);
    setStep((s) => (s + 1) % totalSteps);
    window.setTimeout(() => setIsPaused(false), 5000);
  };

  return (
    <section id="reviews" className="reviews">
      <div className="reviews-container">
        {/* Header */}
        <motion.div 
          className="section-header"
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2 className="section-title">{t("reviewsTitle")}</motion.h2>
          <motion.p className="section-subtitle">
            {t("reviewsSubtitle")}
          </motion.p>
        </motion.div>

        {/* Step Animation (2 cards per step) */}
        <div className="reviews-step-container">
          <div
            className="reviews-step-viewport"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="reviews-step-row" aria-live="polite">
              {/* `wait` prevents temporary layout shift by ensuring exit completes before enter */}
              <AnimatePresence mode="wait" initial={false}>
                {visibleReviews.map((review) => (
                  <motion.div
                    key={`${step}-${review.id}`}
                    className="review-card"
                    custom={direction}
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    whileHover="hover"
                  >
                    <div className="review-header">
                      <div className="review-avatar">
                        <FiUser />
                      </div>
                      <div className="review-meta">
                        <h4 className="client-name">{review.client}</h4>
                        <div className="review-rating">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              className={
                                i < review.rating ? "star-filled" : "star-empty"
                              }
                              size={16}
                            />
                          ))}
                        </div>
                        <span className="client-business">{review.business}</span>
                      </div>
                    </div>

                    <div className="review-content">
                      <p className="review-text">"{review.text}"</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="reviews-step-controls" aria-hidden="false">
            <button
              type="button"
              className="reviews-step-btn"
              onClick={goPrev}
              aria-label={t("reviewsPrev")}
              disabled={totalSteps <= 1}
            >
              <FiChevronLeft />
            </button>
            <div className="reviews-step-counter" aria-hidden="true">
              {step + 1}/{totalSteps}
            </div>
            <button
              type="button"
              className="reviews-step-btn"
              onClick={goNext}
              aria-label={t("reviewsNext")}
              disabled={totalSteps <= 1}
            >
              <FiChevronRight />
            </button>
          </div>

          <div className="reviews-step-dots" aria-hidden="true">
            {Array.from({ length: totalSteps }, (_, i) => (
              <span
                key={i}
                className={i === step ? "dot dot-active" : "dot"}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Reviews;
