import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUpDefault, { CountUp as CountUpNamed } from "react-countup";
import { colors } from "../theme";
import "./About.css";
import placeholderImg from "../assets/placeholder-image.jpg";

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const stats = [
    { number: 500, suffix: "+", label: "Happy Clients" },
    { number: 5, suffix: "+", label: "Years Experience" },
    { number: 20, suffix: "+", label: "Services Offered" },
    { number: 100, suffix: "%", label: "Satisfaction" },
  ];

  // resolve CountUp to a callable component when available
  let CountUpComp = null;
  if (typeof CountUpDefault === "function") CountUpComp = CountUpDefault;
  else if (typeof CountUpNamed === "function") CountUpComp = CountUpNamed;

  return (
    <section id="about" className="about" ref={ref}>
      <div className="about-container">
        <motion.div
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Left Column - Image */}
          <motion.div className="about-image" variants={itemVariants}>
            <div className="image-placeholder">
              <img src={placeholderImg} alt="About Us" />
            </div>
            
          </motion.div>

          {/* Right Column - Text */}
          <motion.div className="about-text" variants={itemVariants}>
            <span className="section-label">About Us</span>
            <h2 className="section-title">Your Creative Partner in Print & Branding</h2>

            <p className="section-description">
              Since 2019, RicRaphix Studio has been helping businesses in Tanzania tell their
              stories through exceptional printing and branding solutions. We combine creativity,
              quality, and professionalism to deliver results that exceed expectations.
            </p>

            <p className="section-description">
              Our team of experienced designers and print specialists work closely with each client
              to understand their unique needs and bring their vision to life with precision and
              passion.
            </p>

            
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
