import React from "react";
import cardplaceholder from "../imgs/yello-beanie.png";
import "../style/ProductImage.css";

const ProductImage = ({ productImg }) => {
  return (
    <div className="product-img-container col">
      <img
        className="product__card-img"
        src={productImg || cardplaceholder}
        alt="img of dog with yellow beanie"
      />
    </div>
  );
};

export default ProductImage;
