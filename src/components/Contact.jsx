import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  HiPhone,
  HiMail,
  HiLocationMarker,
  HiClock,
} from "react-icons/hi";
import { FaWhatsapp, FaInstagram, FaTiktok, FaFacebook } from "react-icons/fa";
import { config } from "../config";
import { colors } from "../theme";
import { useLanguage } from "../i18n/LanguageContext";
import "./Contact.css";

const Contact = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <motion.div
          className="contact-content"
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Left Column - Contact Info */}
          <motion.div className="contact-info" variants={itemVariants}>
            <h2 className="section-title">{t("contactTitle")}</h2>
            <p className="section-description">
              {t("contactSubtitle")}
            </p>

            <div className="info-items">
              <motion.a
                href={`tel:${config.phone.split('/')[0].replace(/[^\d+]/g, '')}`}
                className="info-item"
                whileHover={{ x: 10 }}
              >
                <HiPhone className="info-icon" />
                <div>
                  <p className="info-label">{t("contactPhone")}</p>
                  <p className="info-text">{config.phone}</p>
                </div>
              </motion.a>

              <motion.a
                href={`mailto:${config.email}`}
                className="info-item"
                whileHover={{ x: 10 }}
              >
                <HiMail className="info-icon" />
                <div>
                  <p className="info-label">{t("contactEmail")}</p>
                  <p className="info-text">{config.email}</p>
                </div>
              </motion.a>

              <motion.div className="info-item" whileHover={{ x: 10 }}>
                <HiLocationMarker className="info-icon" />
                <div>
                  <p className="info-label">{t("contactLocation")}</p>
                  <p className="info-text">{config.location}</p>
                </div>
              </motion.div>

              <motion.div className="info-item" whileHover={{ x: 10 }}>
                <HiClock className="info-icon" />
                <div>
                  <p className="info-label">{t("contactHours")}</p>
                  <p className="info-text">{config.workingHours}</p>
                </div>
              </motion.div>
            </div>

            {/* WhatsApp Button */}
            <motion.a
              href={`https://wa.me/${config.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaWhatsapp /> {t("chatOnWhatsApp")}
            </motion.a>

            {/* Social Links */}
            <div className="social-links">
              <motion.a
                href={config.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ y: -5, color: colors.accentBlue }}
              >
                <FaInstagram size={24} />
                <span>@{config.social.instagramHandle}</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Form removed: keep info + socials only */}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
