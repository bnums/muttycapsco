import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "../style/index.css";
import { callApi, getAllUsers, getAllProducts, removeProduct } from "../axios-services";
import { ProductImage, ProductInfo, ProductCard } from ".";
import { Button, Card} from "react-bootstrap";
import cardplaceholder from "../imgs/cardplaceholder.png";
import AdminEditForm from "./AdminEditForm";


const AdminEdit = ({
  token,
  users,
  setUsers,
  products,
  setProducts,
//   isAdmin,
}) => {
  const params = useParams();
  const { productId} = params;
  console.log("editProductId", productId);
  return (
    <>
      <AdminEditForm
        token={token}
        products={products}
        setProducts={setProducts}
        users={users}
        setUsers={setUsers}
        productId={productId}
        // isAdmin={isAdmin}
      />
    </>
  );
};
export default AdminEdit;