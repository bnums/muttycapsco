import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "../style/index.css";
import { callApi } from "../axios-services";
import { ProductImage, ProductInfo, ProductCard } from ".";
import { Button, Card, Navbar, Container, Nav} from "react-bootstrap";
import cardplaceholder from "../imgs/cardplaceholder.png";
import useUser from "../hooks/useUser";
import "../style/AdminPage.css";


const AdminPage = ({token}) =>{

return (
  <div className="admin-background" bg="light" variant="light">
  <div>
    <h3 >Administrator Page</h3>
    <div className="nav-items">
      <div className="users-image" ></div>
     <Link to="/admin-page/users">Users</Link>
     <div className="products-image" ></div>
     <Link to="/admin-page/products">Products</Link>
     <div className="orders-image" ></div>
     <Link to="/admin-page/orders">Orders</Link>
    </div>
  </div>
</div>
)
}

export default AdminPage