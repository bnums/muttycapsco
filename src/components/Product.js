import React from "react";
import "../style/Product.css";
import { ProductReviews, SimilarProducts } from ".";
import { ProductImage, ProductInfo } from ".";
const Product = (props) => {
  return (
    <div className="product-container">
      <div className="product-card-container">
        <ProductImage></ProductImage>
        <ProductInfo {...props}></ProductInfo>
      </div>
      <SimilarProducts></SimilarProducts>
      <ProductReviews></ProductReviews>
    </div>
  );
};

export default Product;
