import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { config } from "../config";
import "./FloatingWhatsApp.css";

const FloatingWhatsApp = () => {
  const pulseVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      transition: { duration: 2, repeat: Infinity },
    },
  };

  return (
    <motion.a
      href={`https://wa.me/${config.whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      variants={pulseVariants}
      animate="pulse"
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
    >
      <FaWhatsapp size={28} />
    </motion.a>
  );
};

export default FloatingWhatsApp;
