import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Header, Footer } from "./";
import "../style/App.css";
import { Products, Product } from ".";

const App = () => {
  return (
    <div className="app_container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<Product />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
