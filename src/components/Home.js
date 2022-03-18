import React from "react";
import { HomeBanner } from "./HomeBanner";
import "../style/Home.css";

const Home = () => {
  return (
    <div className="homepage">
      <HomeBanner />
      <div className="homepage__product__container">
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
