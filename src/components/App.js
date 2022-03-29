import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import { Home, Header, Footer } from "./";
import "../style/App.css";
//import Temp from "./Temp";
import Cart from "./Cart";
import AccountForm from "./AccountForm";
import { Products, Product, AdminPage } from ".";


const App = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  return (
    <div className="app_container">
      <Header className="header"/>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/testpage" element={<Temp />} /> */}
        <Route path="/shoppingcart" element={<Cart />} />
        <Route
          path="/product"
          element={<Product name={"Testing"} price={100} />}
        />
        <Route path="/account/:method" element={ <AccountForm user={user} setUser={setUser} setToken={setToken} /> } />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<Product />} />
        <Route path="/admin-page" element={<AdminPage />} />
      </Routes>
      <Footer className="footer"/>
    </div>
  );
};

export default App;
