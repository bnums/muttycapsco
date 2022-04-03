import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "../style/index.css";
import { callApi } from "../axios-services";
import { ProductImage, ProductInfo, ProductCard } from ".";
import { Button, Card, Navbar, Container, Nav} from "react-bootstrap";
import cardplaceholder from "../imgs/cardplaceholder.png";
import useUser from "../hooks/useUser";
import "../style/AdminOrders.css";


const AdminOrders = ({token}) =>{
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [product, setProduct] = useState({})
  const navigate = useNavigate();
  const { userId} = useParams();
  const { user, setUser, setShoppingCart, setUserOrder } = useUser();

  const handleOrders = async () =>{
    try{
      const orders = await callApi({ method: 'get', url: `/orders`, token:token })
      setOrders(orders)
      console.log('this is all the orders ', orders)
        }catch(error){
          console.log(error)
        }
      }

      useEffect(() => {
        handleOrders()
        },[setOrders, token]);

return(
    <div className="orders-backdrop">
      <h3 className="orders-title">Orders</h3>
      <div>
      {orders.map(order => {
           return (
            <div key={order.id}>
            Order #: {order.id}
        <div>User {order.userId}</div>
        <div>Placed at {order.createdAt}</div>
        <div>Active: {order.isActive}</div>
          </div>
          )
        })}
      </div>
           
    </div>   
)
}

export default AdminOrders