import React from "react";
import "../style/ProductInfo.css";
const ProductInfo = ({ description, name, price, ...props }) => {
  return (
    <div className="product-info-container">
      <h3 className="product-name">{name}</h3>
      {/* <p className="product__card-options">3 Colors</p> */}
      <p className="product-price">${price}</p>
      <p className="product-description">{description}</p>
      <div className="product-btn active-btn"> Add to cart</div>
      <div className="product-btn secondary-btn"> Favorite </div>
    </div>
  );
};

export default ProductInfo;
