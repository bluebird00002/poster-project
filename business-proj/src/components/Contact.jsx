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
import "./Contact.css";

const Contact = () => {
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
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-description">
              Have a project in mind? We'd love to hear from you and help bring your vision to life.
            </p>

            <div className="info-items">
              <motion.a
                href={`tel:${config.phone}`}
                className="info-item"
                whileHover={{ x: 10 }}
              >
                <HiPhone className="info-icon" />
                <div>
                  <p className="info-label">Phone</p>
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
                  <p className="info-label">Email</p>
                  <p className="info-text">{config.email}</p>
                </div>
              </motion.a>

              <motion.div className="info-item" whileHover={{ x: 10 }}>
                <HiLocationMarker className="info-icon" />
                <div>
                  <p className="info-label">Location</p>
                  <p className="info-text">{config.location}</p>
                </div>
              </motion.div>

              <motion.div className="info-item" whileHover={{ x: 10 }}>
                <HiClock className="info-icon" />
                <div>
                  <p className="info-label">Working Hours</p>
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
              <FaWhatsapp /> Chat on WhatsApp
            </motion.a>

            {/* Social Links */}
            <div className="social-links">
              <motion.a
                href={config.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ y: -5, color: colors.accentBlue }}
              >
                <FaFacebook size={24} />
              </motion.a>
              <motion.a
                href={config.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ y: -5, color: colors.accentBlue }}
              >
                <FaInstagram size={24} />
              </motion.a>
              <motion.a
                href={config.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ y: -5, color: colors.accentBlue }}
              >
                <FaTiktok size={24} />
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
