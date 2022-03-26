import React from "react";
import cardplaceholder from "../imgs/cardplaceholder.png";
import "../style/ProductImage.css";

const ProductImage = ({ productImg }) => {
  return (
    <div className="product-img-container">
      <img
        className="product__card-img"
        src={productImg || cardplaceholder}
        alt="img of dog with yellow beanie"
      />
    </div>
  );
};

export default ProductImage;
