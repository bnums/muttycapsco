import React from "react";
import "../style/HomeBanner.css";
const HomeBanner = () => {
  return (
    <div className="homeBanner__container">
      <div className="homeBanner__container-content">
        <h2 className="homeBanner__container-title">Welcome to MuttyCapsCo!</h2>
        <p className="homeBanner__container-subtitle">
          We have never been more ready for the outdoors
        </p>
        <button className="homeBanner__container-button">Shop</button>
      </div>
      <div className="homeBanner__container-links">
        <p className="homeBanner__container-link">About Us</p>
        <p className="homeBanner__container-link">Contact Us</p>
      </div>
    </div>
  );
};

export default HomeBanner;
