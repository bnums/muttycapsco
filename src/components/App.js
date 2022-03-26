import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Header, Footer } from "./";
import "../style/App.css";
import Product from "./Product";

const App = () => {
  return (
    <div className="app_container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/product"
          element={<Product name={"Testing"} price={100} />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
