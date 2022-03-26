import React from "react";
import { ProductCard } from ".";
import cardplaceholder from "../imgs/cardplaceholder.png";
import "../style/ProductImage.css";
import "../style/SimilarProducts.css";
import { useState, useEffect } from "react";
import { callApi } from "../axios-services";

const SimilarProducts = ({ category, currentProductId }) => {
  const [similarProducts, setSimilarProducts] = useState([]);

  const getProductsByCategory = async () => {
    const data = await callApi({
      url: `/products/category`,
      body: { category: category, productId: currentProductId },
      method: "post",
    });
    setSimilarProducts(data);
  };

  useEffect(() => {
    if (category) {
      getProductsByCategory();
    }
  }, [category, currentProductId]);

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
    <>
      <h3> You Might Also Like</h3>
      <div className="similar-products-container">
        {similarProducts?.map((item) => (
          <ProductCard {...item} key={item.id} />
        ))}
      </div>
    </>
  );
};

export default SimilarProducts;
