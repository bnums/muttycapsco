import React from "react";
import "../style/ProductInfo.css";
const ProductInfo = (props) => {
  return (
    <div className="product-info-container">
      <h3 className="product__card-title">{props.name || "Mustard Beanie"}</h3>
      <p className="product__card-options">3 Colors</p>
      <p className="product__card-price">${props.price || 10}</p>
    </div>
  );
};

export default ProductInfo;
