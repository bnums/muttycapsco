import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Header, Footer } from "./";
import "../style/App.css";
import Temp from "./Temp";
import Cart from "./Cart";

const App = () => {
  return (
    <div className="app_container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/testpage" element={<Temp />} />
        <Route path="/shoppingcart" element={<Cart />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
