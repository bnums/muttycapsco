import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Header, Footer } from "./";
import "../style/App.css";
import ReviewsForm from "./ReviewsForm";

const App = () => {
  return (
    <div className="app_container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/review-form/:productId" element={<ReviewsForm />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
