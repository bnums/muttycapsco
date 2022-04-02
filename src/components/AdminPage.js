import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "../style/index.css";
import { callApi, getAllUsers, getAllProducts, removeProduct } from "../axios-services";
import { ProductImage, ProductInfo, ProductCard } from ".";
import { Button, Card} from "react-bootstrap";
import cardplaceholder from "../imgs/cardplaceholder.png";
import useUser from "../hooks/useUser";


const AdminPage = ({token}) =>{
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [product, setProduct] = useState({})
  const navigate = useNavigate();
  // const [isAdmin, setIsAdmin] = useState("");
  // const [token, setToken] = useState("");
  // const [user, setUser] = useState("");
  const { productId } = useParams();
  console.log("this is admin", AdminPage)
  const { setUser, setShoppingCart, setUserOrder } = useUser();
  

const handleUsers = async () =>{
    try{
    const users = await callApi({ method: 'get', url: `/users`, token:token });
    setUsers(users);
    console.log('this is all the users ', users)
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    handleUsers()
    },[setUsers, token]);

const handleProducts = async () =>{
  try{
    const products = await callApi({ method: 'get', url: `/products`, token:token })
    console.log('this is all the products ', products)
    setProducts(products)
      }catch(error){
        console.log(error)
      }
    }
    
    useEffect(() => {
      handleProducts()
      },[setProducts, token]);

      const handleDeleteProduct= async (event, productId) => {
        event.preventDefault()
        try {
          
            const deletedProduct = await callApi({ method: 'delete', url: `/products/${productId}`,token:token})
            console.log(deletedProduct)
            setProduct(deletedProduct)
          
        } catch (error) {
          console.error(error);
        }
        // navigate("/admin-page");
      };

return (
    
    <div className="admin-page-backdrop">
      <h1 className="admin-title">Administrator Page</h1>
      <h3 className="users-title">Active Users</h3>
      <div>
      {users.map(user => {
           return (
           <Button className="list-of-users" style={{background: "#557272"}} >
             {user.username}
             <Button className="user-edit-button">Edit</Button>
          </Button>)
        })}
      </div>
      <h3 className="products-title">Products</h3>
        <div className="list-of-products">
          {products.map(product => {
            const { id, productImg, name, price, isAdmin } = product;
          return (
          <Card className="product__card">
            <img
          className="product__card-img"
          src={productImg || cardplaceholder}
          alt="img of dog with yellow beanie"
        />
            <h3 className="product__card-title">{name}</h3>
            <p className="product__card-price">{price}</p>
            <Button  className="edit-product-button"
                      onClick={() => {
                        navigate(`/products/${id}/edit`);
                      }}>Edit</Button>
            <Button  className="delete-product-button"
                      variant="dark"
                      onClick={(event) => {
                        handleDeleteProduct(event, id, isAdmin);
                      }}>
                        Delete
            </Button>        
          </Card>)
          })}
      </div>
      <h3 className="orders-title">Orders</h3>
        <div className="list-of-orders">
          {orders.map(product => {
            const { id, productImg, name, price, isAdmin } = product;
          return (
          <Card className="product__card">
            <img
          className="product__card-img"
          src={productImg || cardplaceholder}
          alt="img of dog with yellow beanie"
        />
            <h3 className="product__card-title">{name}</h3>
            <p className="product__card-price">{price}</p>
            <Button  className="edit-product-button"
                      onClick={() => {
                        navigate(`/products/${id}/edit`);
                      }}>Edit</Button>
            <Button  className="delete-product-button"
                      variant="dark"
                      onClick={(event) => {
                        handleDeleteProduct(event, id, isAdmin);
                      }}>
                        Delete
            </Button>        
          </Card>)
          })}
      </div>
      {/* 
      <Link to="/admin-page/orders">
        <div className="list-of-orders">Orders</div>
      </Link> */}
    </div>   
)
}

export default AdminPage