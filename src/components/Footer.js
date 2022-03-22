import React from "react";
import "../style/Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-col1">
        <h2 className="footer-title">Join The Adventure</h2>
        <p className="footer-content">
          Recieve updates on exclusive offers and events as they come!
        </p>
      </div>
      <div className="footer-col2">
        <h2 className="footer-title">Get Help</h2>
        <p className="footer-content">Order Status</p>
        <p className="footer-content">Delivery</p>
        <p className="footer-content">Returns</p>
        <p className="footer-content">Payment Options</p>
        <p className="footer-content">Contact Us</p>
      </div>
      <div className="footer-col3">
        <h2 className="footer-title">About Us</h2>
        <p className="footer-content">News</p>
        <p className="footer-content">Blog</p>
        <p className="footer-content">Privacy Policy</p>
        <p className="footer-content">Terms of Service</p>
      </div>
      <div className="footer-links"></div>
    </div>
  );
};

export default Footer;
