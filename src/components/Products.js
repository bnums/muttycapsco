import React from "react";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { callApi } from "../axios-services";
import "../style/Products.css";

const Products = ({ productSearchStr, setProductSearchStr }) => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const data = await callApi({ url: `/products` });
    if (!productSearchStr) {
      setProducts(data);
    } else {
      const filteredData = getFilteredData(data, productSearchStr);
      setProducts(filteredData);
    }
  };

  const getFilteredData = (data = [], searchStr = "") => {
    const search = searchStr.trim().toLowerCase();
    return data.filter((item) => {
      const { name = "", category = "" } = item;
      const combinedStr = `${name?.toLowerCase()} ${category?.toLowerCase()}`;
      return combinedStr.includes(search);
    });
  };

  useEffect(() => {
    getProducts();
  }, [productSearchStr]);

  return (
    <div>
      <div className="products-container container">
        <div className="row mt-1">
          {productSearchStr ? (
            <div className="d-flex align-items-center">
              <span className="mr-3">
                <strong>Search By: </strong>
              </span>
              <span
                className="btn btn-light mx-2 d-flex align-items-center"
                onClick={(e) => {
                  e.preventDefault();
                  setProductSearchStr("");
                }}
              >
                {productSearchStr}
                <span className="badge badge-light">x</span>
              </span>
            </div>
          ) : (
            ""
          )}
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
