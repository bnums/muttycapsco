import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "../style/index.css";
import { callApi, getAllUsers, getAllProducts } from "../axios-services";
import { ProductImage, ProductInfo, ProductCard } from ".";
import { Button} from "react-bootstrap";

const AdminPage = (props) =>{
  const {user} = props
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  
const handleUsers = async () =>{
    try{
  const users = await getAllUsers()
  console.log('this is all the users ', users)
  setUsers(users)
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    handleUsers()
    },[setUsers]);

const handleProducts = async () =>{
  try{
    const products = await getAllProducts()
    console.log('this is all the products ', products)
    setProducts(products)
      }catch(error){
        console.log(error)
      }
    }
      
    useEffect(() => {
      handleProducts()
      },[setProducts]);

return (
    
    <div className="admin-page-backdrop">
      <h1 className="admin-title">Administrator Page</h1>
      <h3 className="users-title">Active Users</h3>
      <div>
      {users.map(user => {
           return (
           <Button className="list-of-users" style={{background: "#557272"}} >
             {user.username}
          </Button>)
        })}
      </div>
      <h3 className="products-title">Products</h3>
        <div className="list-of-products">
        {products?.length ? (
          products.map((item) => <ProductCard key={item.id} {...item} />)
        ) : (
          <p>There is no products</p>
        )}
      </div>
      {/* 
      <Link to="/admin-page/orders">
        <div className="list-of-orders">Orders</div>
      </Link> */}
    </div>   
)
}

export default AdminPage