import React from "react";
import cardplaceholder from "../imgs/cardplaceholder.png";
import "../style/ProductImage.css";
import "../style/SimilarProducts.css";

const SimilarProducts = ({ similarProducts }) => {
  const mockData = [
    {
      id: "test1",
      imgURL: cardplaceholder,
      descrioption: "img of dog with yellow beanie 1",
    },
    {
      id: "test3",
      imgURL: cardplaceholder,
      descrioption: "img of dog with yellow beanie 2",
    },
    {
      id: "test2",
      imgURL: cardplaceholder,
      descrioption: "img of dog with yellow beanie 3",
    },
  ];
  return (
    <div>
      <h3> You Might Also Like</h3>
      <div className="similar-products-container">
        {mockData?.map((item) => (
          <div className="product-img-container">
            <img
              className="product__card-img"
              src={item.imgURL}
              alt={item.descrioption}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
