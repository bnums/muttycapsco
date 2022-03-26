import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Header, Footer } from "./";
import "../style/App.css";
<<<<<<< HEAD
import ReviewsForm from "./ReviewsForm";
=======
import Temp from "./Temp";
import Product from "./Product";
>>>>>>> edb245bd411495d9963c7e654b28f5c13139e928

const App = () => {
  return (
    <div className="app_container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
<<<<<<< HEAD
        <Route path="/review-form/:productId" element={<ReviewsForm />} />
=======
        <Route path="/testpage" element={<Temp />} />
        <Route
          path="/product"
          element={<Product name={"Testing"} price={100} />}
        />
>>>>>>> edb245bd411495d9963c7e654b28f5c13139e928
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
