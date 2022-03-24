import React from "react";
import ProductCard from "./ProductCard";
import "../style/Product.css";
import { ProductReviews, SimilarProducts } from ".";

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
