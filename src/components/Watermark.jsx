import React from "react";
import "./Watermark.css";
import logoImg from "../assets/BussinessLogo.png";

const Watermark = ({ src = logoImg, alt = "business logo watermark" }) => {
  return (
    <div className="site-watermark" aria-hidden>
      <img src={src} alt={alt} />
    </div>
  );
};

export default Watermark;
