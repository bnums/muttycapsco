import React from "react";
import "../style/Home.css";

const Home = () => {
  return (
    <div className="homepage">
      <div className="homepage__container">
        <div className="homepage__container-content">
          <h2 className="homepage__container-title">Title text here</h2>
          <p className="homepage__container-subtitle">Catchy phrase here</p>
          <button className="homepage__container-button">Shop</button>
          <div className="homepage__container-links">
            <a className="homepage__container-link">Hot 1</a>
            <a className="homepage__container-link">Hot 2</a>
            <a className="homepage__container-link">About Us</a>
            <a className="homepage__container-link">Contact Us</a>
          </div>
        </div>
      </div>
      <div className="homepage__product__cards__container">
        <h1>This is my home landing page</h1>
        <div>Placeholder Card</div>
        <div>Placeholder Card</div>
        <div>Placeholder Card</div>
        <div>Placeholder Card</div>
        <div>Placeholder Card</div>
      </div>
    </div>
  );
};

export default Home;
