import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import {
  MdDesignServices,
  MdPrint,
  MdBrandingWatermark,
  MdBusiness,
  MdPhotoFilter,
  MdLocalPrintshop,
} from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { useLanguage } from "../i18n/LanguageContext";
import "./Services.css";

const servicesData = [
  {
    id: "graphic-design",
    icon: MdDesignServices,
    accentColor: "#f97316",
    gradientFrom: "rgba(249, 115, 22, 0.15)",
    gradientTo: "rgba(249, 115, 22, 0.03)",
    title: "Graphic Design",
    tagline: "Creative visuals that tell your story",
    items: [
      "Logo design & brand identity",
      "Business cards, flyers & brochures",
      "Posters, banners & signage",
      "Social media graphics & ads",
      "Packaging & label design",
      "Company profiles and marketing materials",
    ],
  },
  {
    id: "printing",
    icon: MdPrint,
    accentColor: "#1d6fe8",
    gradientFrom: "rgba(29, 111, 232, 0.15)",
    gradientTo: "rgba(29, 111, 232, 0.03)",
    title: "Printing Services",
    tagline: "High-quality prints for every need",
    items: [
      "Digital & offset printing",
      "Large format printing (banners, roll-ups, posters)",
      "Business stationery (cards, letterheads, envelopes)",
      "Flyers, brochures, stickers",
      "Branded merchandise (T-shirts, Caps, Mugs)",
      "Packaging prints",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

const Services = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="services" className="services">
      {/* Background decorative orbs */}
      <div className="services-orb services-orb-left" />
      <div className="services-orb services-orb-right" />

      <div className="services-container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">What We Do</span>
          <h2 className="section-title">
            Our Services
            <span className="title-underline" />
          </h2>
          <p className="section-subtitle">
            From concept to print — we bring your brand to life with precision,
            creativity, and quality.
          </p>
        </motion.div>

        {/* Services Cards */}
        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {servicesData.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                className="service-card"
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                style={{
                  "--accent": service.accentColor,
                  "--grad-from": service.gradientFrom,
                  "--grad-to": service.gradientTo,
                }}
              >
                {/* Top accent line */}
                <div className="card-accent-line" />

                {/* Icon & Title */}
                <div className="card-header">
                  <motion.div
                    className="service-icon"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon size={36} />
                  </motion.div>
                  <div>
                    <h3 className="service-name">{service.title}</h3>
                    <p className="service-tagline">{service.tagline}</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="card-divider" />

                {/* Items List */}
                <motion.ul
                  className="service-items"
                  variants={containerVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                >
                  {service.items.map((item, i) => (
                    <motion.li
                      key={i}
                      className="service-item"
                      variants={itemVariants}
                    >
                      <FaCheckCircle className="item-check" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="services-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Link to="/works">
            <motion.button
              className="cta-button"
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

export default Services;
