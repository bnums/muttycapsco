import React from "react";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { callApi } from "../axios-services";
import { useNavigate } from "react-router";
import "../style/Products.css";

const Products = (props) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const data = await callApi({ url: `/products` });
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <h2>Products page</h2>
      <div className="products-container">
        {products?.length ? (
          products.map((item) => <ProductCard key={item.id} {...item} />)
        ) : (
          <p>There is no products</p>
        )}
      </div>
    </div>
  );
};

export default Products;
