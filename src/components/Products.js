import React from "react";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { callApi } from "../axios-services";
import { useNavigate } from "react-router";
import useUser from "../hooks/useUser";
import "../style/Products.css";

const Products = (props) => {
  const navigate = useNavigate();
  const { shoppingCart } = useUser();
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
      <div className="products-container container">
        <div className="row">
          {products?.length ? (
            products.map((item) => <ProductCard key={item.id} {...item} />)
          ) : (
            <p>There are no products</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
