import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import { Home, Header, Footer } from "./";
import "../style/App.css";
import AccountForm from "./AccountForm";
import { Products, Product } from ".";


const App = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  return (
    <div className="app_container">
      <Header className="header"/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account/:method" element={ <AccountForm user={user} setUser={setUser} setToken={setToken} /> } />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<Product />} />
      </Routes>
      <Footer className="footer"/>
    </div>
  );
};

export default App;
