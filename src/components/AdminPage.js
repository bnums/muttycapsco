import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "../style/index.css";
import { callApi, getAllUsers, getAllProducts, removeProduct, getAllOrders, createProduct } from "../axios-services";
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
  const { userId} = useParams();
  console.log("this is admin", AdminPage)
  const { setUser, setShoppingCart, setUserOrder } = useUser();
  const [orderRender, setOrderRender] = useState([])
  const [selectedOrder, setSelectedOrder] = useState('')
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [inventoryQTY, setInventoryQTY] = useState('');
  const [category, setCategory] = useState('');
  const [productImg, setProductImg] = useState('');
  const [price, setPrice] = useState('');
  

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

      // const handleProductSubmit = async (event) => {
      //   try {
      //     event.preventDefault();
      //     const newProducts = await createProduct(name, description, price, inventoryQTY, productImg, category, token);
      //     console.log("newProducts", newProducts);
      //     setProducts([...products, newProducts]);
      //   } catch (error) {
      //     console.error(error);
      //   }
      // };

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
      <Button  className="edit-product-button"
                      onClick={() => {
                        navigate(`/admin-page/users/add`);
                      }}>Add User</Button>
      <div>
      {users.map(user => {
           return (
           <div className="list-of-users" style={{background: "#557272"}} >
             {user.username}
             <Button className="user-edit-button">Edit</Button>
          </div>)
        })}
      </div>
      <h3 className="products-title">Products</h3>
      <Button  className="edit-product-button"
                      onClick={() => {
                        navigate(`/admin-page/users/products`);
                      }}>Add Product</Button>
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
      <div>
      <h3 className="orders-title">Orders</h3>
      <div>
      {orders.map(order => {
           return (
            <div key={order.id}>
            Order # {order.id}
        <div>Made by User With ID {order.userId}</div>
        <div>Placed at {order.createdAt}</div>
        <div>Status: {order.isActive}</div>
          </div>
          )
        })}
      </div>
        
      </div>
   
    </div>   
)
}

export default AdminPage