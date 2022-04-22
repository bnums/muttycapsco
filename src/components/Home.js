import React from "react";
import HomeBanner from "./HomeBanner";
import TemplateProductCard from "./TemplateProductCard";
import "../style/Home.css";

const Home = () => {
  return (
    <div className="homepage">
      <HomeBanner />
      <section className="homepage-products">
        <div className="homepage-products-container max-width">
          <h1 className="homepage-title">Shop Headwear</h1>
          <div className="homepage-products-gallery">
            <TemplateProductCard />
            <TemplateProductCard />
            <TemplateProductCard />
            <TemplateProductCard />
            <TemplateProductCard />
            <TemplateProductCard />
            <TemplateProductCard />
            <TemplateProductCard />
          </div>
          <button className="see-more-button">See More</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
