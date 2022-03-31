import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import { Home, Header, Footer } from "./";
import "../style/App.css";
//import Temp from "./Temp";
import Cart from "./Cart";
import AccountForm from "./AccountForm";
import { Products, Product, AdminPage, AdminEdit, AdminEditForm } from ".";
import { callApi} from "../axios-services";

const App = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [products, setProducts] = useState({});
  const [product, setProduct] = useState({});
  const [isAdmin, setIsAdmin] = useState("");

  const navigate = useNavigate();

  const handleUser = async () => {
    const user = await callApi({
      url: `/users/me`,
      method: "GET",
      token,
    });
    setUser(user);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    if (token) {
      handleUser();
    }
  }, [token]);

  return (
    <div className="app_container">
      <Header className="header"/>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/testpage" element={<Temp />} /> */}
        <Route path="/shopping-cart" element={<Cart />} />
        <Route
          path="/product"
          element={<Product name={"Testing"} price={100} />}
        />
        <Route path="/account/:method" element={ <AccountForm user={user} setUser={setUser} setToken={setToken} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/> } />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<Product />} />
        <Route path="/admin-page" element={<AdminPage token={token} user={user} product={product} setProduct={setProduct} products={products} setProducts={setProducts}/>} />
        <Route path="/products/:productId/edit" element={<AdminEdit token={token} user={user} product={product} setProduct={setProduct} products={products} setProducts={setProducts}/>}/>
      </Routes>
      <Footer className="footer"/>
    </div>
  );
};

export default App;
