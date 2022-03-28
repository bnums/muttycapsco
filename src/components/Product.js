import React from "react";
import "../style/Product.css";
import { ProductReviews, SimilarProducts } from ".";
import { ProductImage, ProductInfo } from ".";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { callApi } from "../axios-services";

const Product = ({ token }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [reviews, setReviews] = useState([]);

  const getProductByProductId = async () => {
    const data = await callApi({ url: `/products/${productId}` });
    setProduct(data);
  };

  const getReviewsByProductId = async () => {
    const data = await callApi({ url: `/reviews/${productId}` });
    setReviews(data);
  };

  useEffect(() => {
    getProductByProductId();
    getReviewsByProductId();
  }, [productId]);
  return (
    <div className="product-container">
      <div className="product-detail-container">
        <ProductImage {...product}></ProductImage>
        <ProductInfo {...product} token={token}></ProductInfo>
      </div>
      <div className="similar-products-wrapper">
        <SimilarProducts
          category={product?.category}
          currentProductId={product?.id}
        ></SimilarProducts>
      </div>
      <div className="reviews-wrapper">
        <ProductReviews reviews={reviews}></ProductReviews>
      </div>
    </div>
  );
};

export default Product;
