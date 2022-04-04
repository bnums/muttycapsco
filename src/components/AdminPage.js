import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "../style/AdminPage.css";


const AdminPage = ({token}) =>{

return (
  <div className="admin-background" bg="light" variant="light">
  <div>
    <h3 id="admin-title" className="text-title text-center"
    >Administrator Page</h3>
    <div className="nav-items">
    <div className="users-items">
    <Link to="/admin-page/users"><img className="users-image"/></Link>
     <Link id="users-title" className="text-title" to="/admin-page/users">Users</Link>
     </div>
     <div className="products-items">
     <Link to="/admin-page/products"><div className="products-image"></div></Link>
     <Link id="products-title" className="text-title" to="/admin-page/products">Products</Link>
     </div>
     <div className="orders-items">
     <Link to="/admin-page/orders"><div className="orders-image"></div></Link>
     <Link id="orders-title" className="text-title" to="/admin-page/orders">Orders</Link>
    </div>
    </div>
  </div>
</div>
)
}

export default AdminPage