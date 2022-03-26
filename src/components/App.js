import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import { Home, Header, Footer } from "./";
import "../style/App.css";
import Temp from "./Temp";
import Product from "./Product";
import AccountForm from "./AccountForm";
// import { callApi } from "../axios-services";

const App = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // const handleUser = async () => {
  //   const user = await callApi({
  //     url: `/users/me`,
  //     method: "GET",
  //     token,
  //   });
  //   setUser(user);
  // };

  // const handleLogOut = () => {
  //   setToken("");
  //   localStorage.removeItem("token");
  //   navigate("/routines");
  // };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  // useEffect(() => {
  //   if (token) {
  //     handleUser();
  //   }
  // }, [token]);


  return (
    <div className="app_container">
      <Header />
      {!token && <Link to="/account/login">Login</Link>}
      {token && <button onClick={() => {
      setToken('');
      localStorage.removeItem('token');
      navigate('/');
    }}>Log Out</button>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account/:method" element={ <AccountForm user={user} setUser={setUser} setToken={setToken} /> } />
        <Route path="/testpage" element={<Temp />} />
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
