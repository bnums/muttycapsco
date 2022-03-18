import React from "react";
import "../style/HomeBanner.css";
export const HomeBanner = () => {
  return (
    <div className="homeBanner__container">
      <div className="homeBanner__container-content">
        <h2 className="homeBanner__container-title">Title text here</h2>
        <p className="homeBanner__container-subtitle">Catchy phrase here</p>
        <button className="homeBanner__container-button">Shop</button>
      </div>
      <div className="homeBanner__container-links">
        <p className="homeBanner__container-link">Hot 1</p>
        <p className="homeBanner__container-link">Hot 2</p>
        <p className="homeBanner__container-link">About Us</p>
        <p className="homeBanner__container-link">Contact Us</p>
      </div>
    </div>
  );
};
