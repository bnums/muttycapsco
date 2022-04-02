import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  Home,
  Header,
  Footer,
  // Products,
  // Product,
  // AccountForm,
  UserProfile,
  // Cart,
} from "./";
import "../style/App.css";
import Cart from "./Cart";
import AccountForm from "./AccountForm";
import { Products, Product, AdminPage, AdminEdit, AdminEditForm, AdminAddUser,  AdminAddProduct} from ".";
import { callApi} from "../axios-services";
import useUser from "../hooks/useUser";
import CheckoutDev from "./CheckoutDev";

const App = () => {
  const [token, setToken] = useState("");
  // const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [activities, setActivities] = useState([]);
  
  const { user, product, setUser, setShoppingCart, setUserOrder, setIsAdmin, setProduct } = useUser();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
    if (localStorage.getItem("product")) {
      setProduct(JSON.parse(localStorage.getItem("product")));
    }
    if (localStorage.getItem("isAdmin")) {
      setIsAdmin(JSON.parse(localStorage.getItem("isAdmin")));
    }
    if (localStorage.getItem("shoppingCart")) {
      setShoppingCart(JSON.parse(localStorage.getItem("shoppingCart")));
    } else {
      setShoppingCart([]);
    }

    if (localStorage.getItem("userOrder")) {
      setUserOrder(JSON.parse(localStorage.getItem("userOrder")));
    }
  }, []);

  return (

    <>
      <div className="app_container">
        <Header className="header" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account/:method" element={<AccountForm />} />
          <Route path="/:username/profile/:userId" element={<UserProfile />} />
          <Route path="/shopping-cart" element={<Cart />} />
          {/* <Route path="/shopping-cart" element={<CheckoutDev />} /> */}
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<Product />} />
          <Route path="/admin-page/users/add" element={<AdminAddUser />} />
          <Route path="/admin-page/products/add" element={<AdminAddProduct/>} />
          <Route path="/admin-page" element={<AdminPage /*token={token} user={user} product={product} setProduct={setProduct} products={products} setProducts={setProducts}*//>} />
        <Route path="/products/:productId/edit" element={<AdminEditForm token={token} user={user} product={product} setProduct={setProduct} products={products} setProducts={setProducts}/>}/>
        </Routes>
      </div>
      <Footer className="footer" />
    </>
  );
};

export default App;
