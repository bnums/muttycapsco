import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "../style/index.css";
import { callApi } from "../axios-services";
import { ProductImage, ProductInfo, ProductCard } from ".";
import { Button, Card, Navbar, Container, Nav} from "react-bootstrap";
import cardplaceholder from "../imgs/cardplaceholder.png";
import useUser from "../hooks/useUser";


const AdminPage = ({token}) =>{

return (
  <div className="navbar" bg="light" variant="light">
  <div>
    <h3 >Administrator Page</h3>
    <div className="nav-items">
     <Link to="/admin-page/users">Users</Link>
     <Link to="/admin-page/products">Products</Link>
     <Link to="/admin-page/orders">Orders</Link>
    </div>
  </div>
</div>
)
}

export default AdminPage