import React, { useState, useEffect } from "react";
import cardplaceholder from "../imgs/cardplaceholder.png";
import "../style/ProductCard.css";
import { useNavigate } from "react-router";

const ProductCard = ({ id, productImg, name, price }) => {
  const navigate = useNavigate();

  return (
    <>
      <span
        className="product__card"
        onClick={(e) => {
          e.preventDefault();
          console.log(e);
          navigate(`/products/${id}`);
        }}
      >
        <img
          className="product__card-img"
          src={productImg || cardplaceholder}
          alt="img of dog with yellow beanie"
        />
        <h3 className="product__card-title">{name}</h3>
        {/* <p className="product__card-options">3 Colors</p> */}
        <p className="product__card-price">{price}</p>
      </span>
    </>
  );
};

export default ProductCard;
