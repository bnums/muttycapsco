import React, { useState, useEffect } from "react";
import cardplaceholder from "../imgs/cardplaceholder.png";
import "../style/ProductCard.css";
import { useNavigate } from "react-router";
import RatingStar from "./Ratingstar";
const ProductCard = ({ id, productImg, name, rating, price }) => {
  const navigate = useNavigate();

  return (
    <>
      <span
        className="product__card col-4 d-flex justify-content-center"
        onClick={(e) => {
          e.preventDefault();
          navigate(`/products/${id}`);
        }}
      >
        <img
          className="product__card-img"
          src={productImg || cardplaceholder}
          alt="img of dog with yellow beanie"
        />
        <h3 className="product__card-title">{name}</h3>
        <p>
          {" "}
          <RatingStar rating={rating} />
        </p>
        <p className="product__card-price">{price}</p>
      </span>
    </>
  );
};

export default ProductCard;
