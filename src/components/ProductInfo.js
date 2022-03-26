import React from "react";
import { useMutation } from "react-query";
import { callApi } from "../axios-services";
import "../style/ProductInfo.css";
const ProductInfo = ({ description, name, price, ...props }) => {
  const { mutate } = useMutation(callApi, {
    onSuccess: () => {
      console.log("Item Successfully Added!");
    },
  });
  const handleAddItem = async () => {
    try {
    } catch (error) {}
  };
  return (
    <div className="product-info-container">
      <h3 className="product-name">{name}</h3>
      {/* <p className="product__card-options">3 Colors</p> */}
      <p className="product-price">${price}</p>
      <p className="product-description">{description}</p>
      <button onClick={handleAddItem} className="product-btn active-btn">
        Add to cart
      </button>
      <div className="product-btn secondary-btn"> Favorite </div>
    </div>
  );
};

export default ProductInfo;
