import React from "react";
import { useMutation } from "react-query";
import { callApi } from "../axios-services";
import "../style/ProductInfo.css";
const ProductInfo = ({ description, name, price, ...props }) => {
  // const { mutate } = useMutation(callApi, {});

  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjoibnVtbnVtIiwiZW1haWwiOiJudW1udW1AZ21haWwuY29tIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjQ4MjQ1MjMxfQ.1WYb1z3kM_k2V5fca1GH7vrH3vG7CHecWmsv7M9qqlk";
  const handleAddItem = async () => {
    try {
      const createdOrder = await callApi({
        url: "/orders",
        method: "post",
        body: {
          orderTotal: 0,
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        token,
      });
      console.log("Order created", createdOrder);
    } catch (error) {
      console.log("Unable to create order");
    }
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
