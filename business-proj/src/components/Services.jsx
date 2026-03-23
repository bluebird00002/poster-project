import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link as ScrollLink } from "react-scroll";
import * as Icons from "react-icons/md";
import { services } from "../data/services";
import { colors } from "../theme";
import "./Services.css";

const Services = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const getIconComponent = (iconName) => {
    return Icons[iconName] || Icons.MdDesignServices;
  };

  return (
    <section id="services" className="services">
      <div className="services-container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Our Services
            <span className="title-underline" />
          </h2>
          <p className="section-subtitle">
            Comprehensive printing and branding solutions tailored to your business needs
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {services.map((service, index) => {
            const IconComponent = getIconComponent(service.icon);
            return (
              <motion.div
                key={service.id}
                className="service-card"
                variants={cardVariants}
                whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(249, 115, 22, 0.2)" }}
              >
                <motion.div
                  className="service-icon"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <IconComponent size={40} />
                </motion.div>
                <h3 className="service-name">{service.name}</h3>
                <p className="service-description">{service.description}</p>
                <p className="service-price">{service.price}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="services-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <ScrollLink
            to="contact"
            smooth={true}
            duration={500}
            onClick={() => window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#contact`)}
          >
            <motion.button
              className="cta-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Place an Order
            </motion.button>
          </ScrollLink>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
