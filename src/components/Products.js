import React from "react";
import Product from "./Product";

const Products = (props) => {
  return (
    <div>
      <h2>Products page</h2>
      <div className="products-container">
        <Product name={"Testing"} price={100}></Product>
      </div>
    </div>
  );
};

export default Products;
