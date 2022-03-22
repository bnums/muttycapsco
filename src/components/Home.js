import React from "react";
import HomeBanner from "./HomeBanner";
import ProductCard from "./ProductCard";
import "../style/Home.css";

const Home = () => {
  return (
    <div className="homepage">
      <HomeBanner />
      <div className="homepage__products__container">
        <h1 className="homepage__products-title">Shop Hats</h1>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default Home;
