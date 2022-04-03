import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "../style/index.css";
import { callApi } from "../axios-services";
import { ProductImage, ProductInfo, ProductCard } from ".";
import { Button, Card} from "react-bootstrap";
import cardplaceholder from "../imgs/cardplaceholder.png";
import useUser from "../hooks/useUser";


const AdminPage = ({token}) =>{
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [product, setProduct] = useState([])
  const navigate = useNavigate();
  // const { userId} = useParams();
  console.log("this is admin", AdminPage)
  const { user, setUser, setShoppingCart, setUserOrder } = useUser();

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
        navigate("/admin-page");
      };

      const handleDeleteUser= async (event, userId) => {
        event.preventDefault()
        try {
          
            const deletedUser = await callApi({ method: 'delete', url: `/users/${userId}`,token:token})
            console.log(deletedUser)
            setUser(deletedUser)
          
        } catch (error) {
          console.error(error);
        }
        navigate("/admin-page");
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
        const { userId, isAdmin } = user;
           return (
            <div key={user.id}>
           <div className="list-of-users" style={{background: "#557272"}} >
             {user.username}
             <Button className="user-edit-button">Edit</Button>
             <Button  className="delete-user-button"
                      variant="dark"
                      onClick={(event) => {
                        handleDeleteUser(event, userId, isAdmin);
                      }}>
                        Delete
            </Button>  
          </div>
          </div>
          )
        })}
      </div>
      <h3 className="products-title">Products</h3>
      <Button  className="edit-product-button"
                      onClick={() => {
                        navigate(`/admin-page/products/add`);
                      }}>Add Product</Button>
        <div className="list-of-products">
          {products.map(product => {
            const { id, productImg, name, price, isAdmin } = product;
          return (
            <div key={product.id}>
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
                    id="submit-button" type="submit" onClick={(e)=>{e.preventDefault(); navigate(`/admin-page`);
                    handleDeleteProduct()}}>Submit
                      {/* onClick={(event) => {
                        handleDeleteProduct(event, id, isAdmin);
                      }}> */}
                        Delete
            </Button>        
          </Card>
          </div>
          )
          })}
      </div>
      <div>
      <h3 className="orders-title">Orders</h3>
      <div>
      {orders.map(order => {
           return (
            <div key={order.id}>
            Order #: {order.id}
        <div>User ID: With ID {order.userId}</div>
        <div>Placed at {order.createdAt}</div>
        <div>Active: {order.isActive}</div>
          </div>
          )
        })}
      </div>
        
      </div>
   
    </div>   
)
}

export default AdminPage