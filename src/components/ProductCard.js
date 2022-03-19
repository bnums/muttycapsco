import React from "react";
import cardplaceholder from "../imgs/cardplaceholder.png";
import "../style/ProductCard.css";

const ProductCard = () => {
  return (
    <>
      <span className="product__card">
        <img
          className="product__card-img"
          src={cardplaceholder}
          alt="img of dog with yellow beanie"
        />
        <h3 className="product__card-title">Mustard Beanie</h3>
        <p className="product__card-options">3 Colors</p>
        <p className="product__card-price">$10</p>
      </span>
    </>
  );
};

export default ProductCard;
